import { createInitialPlayerState, type PlayerState } from '@/domain/player/player-state'
import { createInitialMarketState, type MarketState } from '@/domain/market/market-state'
export { INITIAL_BATTERIES, INITIAL_SCRAP } from './game-resources'

export type GamePhase = 'setup' | 'turn' | 'finished'

export type RadioPosition = 'shelter' | 'wasteland'

export const HUMAN_PLAYER_ID = 'player-1'

export interface GameState {
  phase: GamePhase
  turn: number
  radioPosition: RadioPosition
  activePlayerId: string
  players: PlayerState[]
  markets: Record<RadioPosition, MarketState>
  pendingPlacementCardId: string | null
}

interface CreateInitialGameStateParams {
  shelterDeckCardIds?: string[]
  wastelandDeckCardIds?: string[]
}

export const createInitialGameState = ({
  shelterDeckCardIds = [],
  wastelandDeckCardIds = [],
}: CreateInitialGameStateParams = {}): GameState => ({
  phase: 'setup',
  turn: 1,
  radioPosition: 'shelter',
  activePlayerId: HUMAN_PLAYER_ID,
  pendingPlacementCardId: null,
  players: [
    createInitialPlayerState({
      id: HUMAN_PLAYER_ID,
      name: 'Player',
      kind: 'human',
    }),
    createInitialPlayerState({
      id: 'rival-1',
      name: 'Rival 1',
      kind: 'ai',
    }),
    createInitialPlayerState({
      id: 'rival-2',
      name: 'Rival 2',
      kind: 'ai',
    }),
    createInitialPlayerState({
      id: 'rival-3',
      name: 'Rival 3',
      kind: 'ai',
    }),
  ],
  markets: {
    shelter: createInitialMarketState({
      group: 'shelter',
      deckCardIds: shelterDeckCardIds,
    }),
    wasteland: createInitialMarketState({
      group: 'wasteland',
      deckCardIds: wastelandDeckCardIds,
    }),
  },
})
