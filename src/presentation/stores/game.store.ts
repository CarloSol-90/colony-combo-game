import { defineStore } from 'pinia'
import { LoadCardsUseCase } from '@/application/cards'
import { LoadGameStateUseCase, SaveGameStateUseCase } from '@/application/game'
import { LoadLocaleUseCase } from '@/application/settings'
import type { CardDefinition } from '@/domain/card/card-definition'
import type { GameState } from '@/domain/game/game-state'
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
  refugioCards: CardDefinition[]
  yermoCards: CardDefinition[]
  locale: 'es' | 'en'
  isLoading: boolean
  error: string | null
}

export const useGameStore = defineStore('game', {
  state: (): GameStoreState => ({
    gameState: null,
    cards: [],
    refugioCards: [],
    yermoCards: [],
    locale: 'es',
    isLoading: false,
    error: null,
  }),

  actions: {
    async initializeGame() {
      this.isLoading = true
      this.error = null

      try {
        const [gameState, cards, refugioCards, yermoCards, locale] = await Promise.all([
          loadGameStateUseCase.execute(),
          loadCardsUseCase.execute(),
          loadCardsUseCase.execute('refugio'),
          loadCardsUseCase.execute('yermo'),
          loadLocaleUseCase.execute(),
        ])

        this.gameState = gameState
        this.cards = cards
        this.refugioCards = refugioCards
        this.yermoCards = yermoCards
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
  },
})
