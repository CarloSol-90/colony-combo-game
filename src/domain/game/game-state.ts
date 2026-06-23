export type GamePhase = 'setup' | 'turn' | 'finished'

export interface GameState {
  phase: GamePhase
  turn: number
}

export const createInitialGameState = (): GameState => ({
  phase: 'setup',
  turn: 1,
})