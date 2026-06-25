import { describe, expect, it } from 'vitest'
import { buyCard } from '@/domain/game/buy-card'
import { createInitialGameState, HUMAN_PLAYER_ID, INITIAL_SCRAP } from '@/domain/game/game-state'

describe('buyCard', () => {
  it('buys a visible card from the market where the radio is located', () => {
    const state = createInitialGameState({
      shelterDeckCardIds: ['shelter-1', 'shelter-2', 'shelter-3', 'shelter-4'],
      wastelandDeckCardIds: ['wasteland-1', 'wasteland-2', 'wasteland-3'],
    })

    const result = buyCard(state, {
      id: 'shelter-1',
      cost: 5,
    })

    expect(result.success).toBe(true)

    if (!result.success) {
      return
    }

    expect(result.state.players.find((player) => player.id === HUMAN_PLAYER_ID)?.scrap).toBe(
      INITIAL_SCRAP - 5,
    )
    expect(result.state.pendingPlacementCardId).toBe('shelter-1')
    expect(result.state.markets.shelter.visibleCardIds).toEqual(['shelter-2', 'shelter-3'])
    expect(result.state.markets.wasteland.visibleCardIds).toEqual([
      'wasteland-1',
      'wasteland-2',
      'wasteland-3',
    ])
  })

  it('rejects a card that is not visible in the current market', () => {
    const state = createInitialGameState({
      shelterDeckCardIds: ['shelter-1', 'shelter-2', 'shelter-3'],
      wastelandDeckCardIds: ['wasteland-1', 'wasteland-2', 'wasteland-3'],
    })

    expect(
      buyCard(state, {
        id: 'wasteland-1',
        cost: 3,
      }),
    ).toEqual({
      success: false,
      error: 'card_not_available_in_current_market',
    })
  })

  it('rejects a card when the active player does not have enough scrap', () => {
    const state = createInitialGameState({
      shelterDeckCardIds: ['shelter-1', 'shelter-2', 'shelter-3'],
    })

    expect(
      buyCard(state, {
        id: 'shelter-1',
        cost: INITIAL_SCRAP + 1,
      }),
    ).toEqual({
      success: false,
      error: 'not_enough_scrap',
    })
  })

  it('rejects buying when the active player cannot be found', () => {
    const state = {
      ...createInitialGameState({
        shelterDeckCardIds: ['shelter-1', 'shelter-2', 'shelter-3'],
      }),
      activePlayerId: 'missing-player',
    }

    expect(
      buyCard(state, {
        id: 'shelter-1',
        cost: 3,
      }),
    ).toEqual({
      success: false,
      error: 'active_player_not_found',
    })
  })
})
