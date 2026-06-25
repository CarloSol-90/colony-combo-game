import { describe, expect, it } from 'vitest'
import { placePendingCard } from '@/domain/game/place-pending-card'
import { createInitialGameState, HUMAN_PLAYER_ID } from '@/domain/game/game-state'

describe('placePendingCard', () => {
  it('places the pending card in the active player colony', () => {
    const state = {
      ...createInitialGameState(),
      pendingPlacementCardId: 'shelter-1',
    }

    const result = placePendingCard(state, { row: 1, column: 1 })

    expect(result.success).toBe(true)

    if (!result.success) {
      return
    }

    expect(result.state.pendingPlacementCardId).toBeNull()
    expect(result.state.players.find((player) => player.id === HUMAN_PLAYER_ID)?.colony).toEqual([
      {
        cardId: 'shelter-1',
        position: { row: 1, column: 1 },
        isFaceDown: false,
      },
    ])
  })

  it('rejects placement when there is no pending card', () => {
    expect(placePendingCard(createInitialGameState(), { row: 1, column: 1 })).toEqual({
      success: false,
      error: 'no_pending_card',
    })
  })

  it('rejects placement when the active player cannot be found', () => {
    const state = {
      ...createInitialGameState(),
      activePlayerId: 'missing-player',
      pendingPlacementCardId: 'shelter-1',
    }

    expect(placePendingCard(state, { row: 1, column: 1 })).toEqual({
      success: false,
      error: 'active_player_not_found',
    })
  })

  it('rejects placement in an invalid colony position', () => {
    const initialState = createInitialGameState()
    const state = {
      ...initialState,
      pendingPlacementCardId: 'shelter-2',
      players: initialState.players.map((player) =>
        player.id === HUMAN_PLAYER_ID
          ? {
              ...player,
              colony: [
                {
                  cardId: 'shelter-1',
                  position: { row: 1 as const, column: 1 as const },
                  isFaceDown: false,
                },
              ],
            }
          : player,
      ),
    }

    expect(placePendingCard(state, { row: 0, column: 0 })).toEqual({
      success: false,
      error: 'invalid_colony_position',
    })
  })
})
