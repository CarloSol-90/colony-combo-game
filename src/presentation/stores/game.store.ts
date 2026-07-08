import { defineStore } from 'pinia'
import { LoadCardsUseCase } from '@/application/cards'
import { LoadGameStateUseCase, SaveGameStateUseCase } from '@/application/game'
import { LoadLocaleUseCase } from '@/application/settings'
import type { ColonyPosition } from '@/domain/colony/colony-position'
import type { CardDefinition } from '@/domain/card/card-definition'
import { buyCard } from '@/domain/game/buy-card'
import type { GameState } from '@/domain/game/game-state'
import { placeFaceDownCard } from '@/domain/game/place-face-down-card'
import { placePendingCard } from '@/domain/game/place-pending-card'
import { JsonCardCatalogRepository } from '@/infrastructure/repositories/json-card-catalog.repository'
import { LocalStorageGameStateRepository } from '@/infrastructure/repositories/local-storage-game-state.repository'
import { LocalStorageSettingsRepository } from '@/infrastructure/repositories/local-storage-settings.repository'

const cardCatalogRepository = new JsonCardCatalogRepository()
const gameStateRepository = new LocalStorageGameStateRepository()
const settingsRepository = new LocalStorageSettingsRepository()

const loadCardsUseCase = new LoadCardsUseCase(cardCatalogRepository)
const loadGameStateUseCase = new LoadGameStateUseCase(gameStateRepository)
const loadLocaleUseCase = new LoadLocaleUseCase(settingsRepository)
const saveGameStateUseCase = new SaveGameStateUseCase(gameStateRepository)

interface GameStoreState {
  gameState: GameState | null
  cards: CardDefinition[]
  shelterCards: CardDefinition[]
  wastelandCards: CardDefinition[]
  locale: 'es' | 'en'
  isLoading: boolean
  error: string | null
}

export const useGameStore = defineStore('game', {
  state: (): GameStoreState => ({
    gameState: null,
    cards: [],
    shelterCards: [],
    wastelandCards: [],
    locale: 'es',
    isLoading: false,
    error: null,
  }),

  actions: {
    async initializeGame() {
      this.isLoading = true
      this.error = null

      try {
        const [gameState, cards, shelterCards, wastelandCards, locale] = await Promise.all([
          loadGameStateUseCase.execute(),
          loadCardsUseCase.execute(),
          loadCardsUseCase.execute('shelter'),
          loadCardsUseCase.execute('wasteland'),
          loadLocaleUseCase.execute(),
        ])

        this.gameState = gameState
        this.cards = cards
        this.shelterCards = shelterCards
        this.wastelandCards = wastelandCards
        this.locale = locale
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Unknown game initialization error'
      } finally {
        this.isLoading = false
      }
    },

    async saveCurrentGame() {
      if (!this.gameState) {
        return
      }

      await saveGameStateUseCase.execute(this.gameState)
    },

    async buyVisibleCard(cardId: string) {
      if (!this.gameState) {
        this.error = 'game_state_not_loaded'
        return
      }

      const card = this.cards.find((currentCard) => currentCard.id === cardId)

      if (!card) {
        this.error = 'card_not_found'
        return
      }

      const result = buyCard(this.gameState, card)

      if (!result.success) {
        this.error = result.error
        return
      }

      this.error = null
      this.gameState = result.state
      await this.saveCurrentGame()
    },

    async placePendingCardAt(position: ColonyPosition) {
      if (!this.gameState) {
        this.error = 'game_state_not_loaded'
        return
      }

      const result = placePendingCard(this.gameState, position)

      if (!result.success) {
        this.error = result.error
        return
      }

      this.error = null
      this.gameState = result.state
      await this.saveCurrentGame()
    },

    async placeFaceDownCardAt(position: ColonyPosition) {
      if (!this.gameState) {
        this.error = 'game_state_not_loaded'
        return
      }

      const result = placeFaceDownCard({
        state: this.gameState,
        position,
        source: this.gameState.radioPosition,
      })

      if (!result.success) {
        this.error = result.error
        return
      }

      this.error = null
      this.gameState = result.state
      await this.saveCurrentGame()
    },
  },
})
