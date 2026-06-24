import { describe, expect, it } from 'vitest'
import { INITIAL_BATTERIES, INITIAL_CAPITAL } from '@/domain/game/game-state'
import { createInitialPlayerState } from '@/domain/player/player-state'

describe('createInitialPlayerState', () => {
  it('creates a human player with initial resources and an empty colony', () => {
    expect(
      createInitialPlayerState({
        id: 'player-1',
        name: 'Player',
        kind: 'human',
      }),
    ).toEqual({
      id: 'player-1',
      name: 'Player',
      kind: 'human',
      capital: INITIAL_CAPITAL,
      batteries: INITIAL_BATTERIES,
      colony: [],
    })
  })

  it('creates an AI player with initial resources and an empty colony', () => {
    expect(
      createInitialPlayerState({
        id: 'rival-1',
        name: 'Rival 1',
        kind: 'ai',
      }),
    ).toMatchObject({
      id: 'rival-1',
      name: 'Rival 1',
      kind: 'ai',
      capital: INITIAL_CAPITAL,
      batteries: INITIAL_BATTERIES,
      colony: [],
    })
  })
})
