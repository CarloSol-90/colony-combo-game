export type GamePhase = 'setup' | 'turn' | 'finished'

export type RadioPosition = 'refugio' | 'yermo'

export const INITIAL_CAPITAL = 15
export const INITIAL_BATTERIES = 2

export interface GameState {
  phase: GamePhase
  turn: number
  capital: number
  batteries: number
  radioPosition: RadioPosition
}

export const createInitialGameState = (): GameState => ({
  phase: 'setup',
  turn: 1,
  capital: INITIAL_CAPITAL,
  batteries: INITIAL_BATTERIES,
  radioPosition: 'refugio',
})
