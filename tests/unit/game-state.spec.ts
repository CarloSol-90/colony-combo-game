import { describe, expect, it } from 'vitest'
import { createInitialGameState, INITIAL_BATTERIES, INITIAL_CAPITAL } from '@/domain/game/game-state'

describe('createInitialGameState', () => {
  it('creates the initial game state', () => {
    expect(createInitialGameState()).toEqual({
      phase: 'setup',
      turn: 1,
      capital: INITIAL_CAPITAL,
      batteries: INITIAL_BATTERIES,
      radioPosition: 'refugio',
    })
  })
})
