import { createInitialPlayerState, type PlayerState } from '@/domain/player/player-state'
export { INITIAL_BATTERIES, INITIAL_CAPITAL } from './game-resources'

export type GamePhase = 'setup' | 'turn' | 'finished'

export type RadioPosition = 'refugio' | 'yermo'

export const HUMAN_PLAYER_ID = 'player-1'

export interface GameState {
  phase: GamePhase
  turn: number
  radioPosition: RadioPosition
  activePlayerId: string
  players: PlayerState[]
}

export const createInitialGameState = (): GameState => ({
  phase: 'setup',
  turn: 1,
  radioPosition: 'refugio',
  activePlayerId: HUMAN_PLAYER_ID,
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
})
