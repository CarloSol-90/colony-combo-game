import { describe, expect, it } from 'vitest'
import { createInitialGameState } from '@/domain/game/game-state'

describe('createInitialGameState', () => {
  it('creates the initial game state', () => {
    expect(createInitialGameState()).toEqual({
      phase: 'setup',
      turn: 1,
    })
  })
})