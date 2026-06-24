import { describe, expect, it } from 'vitest'
import {
  createInitialGameState,
  HUMAN_PLAYER_ID,
  INITIAL_BATTERIES,
  INITIAL_CAPITAL,
} from '@/domain/game/game-state'

describe('createInitialGameState', () => {
  it('creates the initial game state', () => {
    expect(createInitialGameState()).toEqual({
      phase: 'setup',
      turn: 1,
      radioPosition: 'shelter',
      activePlayerId: HUMAN_PLAYER_ID,
      players: [
        {
          id: HUMAN_PLAYER_ID,
          name: 'Player',
          kind: 'human',
          capital: INITIAL_CAPITAL,
          batteries: INITIAL_BATTERIES,
          colony: [],
        },
        {
          id: 'rival-1',
          name: 'Rival 1',
          kind: 'ai',
          capital: INITIAL_CAPITAL,
          batteries: INITIAL_BATTERIES,
          colony: [],
        },
        {
          id: 'rival-2',
          name: 'Rival 2',
          kind: 'ai',
          capital: INITIAL_CAPITAL,
          batteries: INITIAL_BATTERIES,
          colony: [],
        },
        {
          id: 'rival-3',
          name: 'Rival 3',
          kind: 'ai',
          capital: INITIAL_CAPITAL,
          batteries: INITIAL_BATTERIES,
          colony: [],
        },
      ],
      markets: {
        shelter: {
          group: 'shelter',
          visibleCardIds: [],
          deckCardIds: [],
        },
        wasteland: {
          group: 'wasteland',
          visibleCardIds: [],
          deckCardIds: [],
        },
      },
    })
  })

  it('creates initial markets from deck card ids', () => {
    expect(
      createInitialGameState({
        shelterDeckCardIds: ['shelter-1', 'shelter-2', 'shelter-3', 'shelter-4'],
        wastelandDeckCardIds: ['wasteland-1', 'wasteland-2', 'wasteland-3', 'wasteland-4'],
      }),
    ).toMatchObject({
      markets: {
        shelter: {
          group: 'shelter',
          visibleCardIds: ['shelter-1', 'shelter-2', 'shelter-3'],
          deckCardIds: ['shelter-4'],
        },
        wasteland: {
          group: 'wasteland',
          visibleCardIds: ['wasteland-1', 'wasteland-2', 'wasteland-3'],
          deckCardIds: ['wasteland-4'],
        },
      },
    })
  })
})
