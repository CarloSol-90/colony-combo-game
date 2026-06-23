import { defineStore } from 'pinia'
import type { CardDefinition } from '@/domain/card/card-definition'
import type { GameState } from '@/domain/game/game-state'

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
      // aquí irá la carga inicial
    },
  },
})