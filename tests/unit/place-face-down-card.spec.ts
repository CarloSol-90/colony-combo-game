import { describe, expect, it } from 'vitest'
import {
  FACE_DOWN_CARD_BATTERY_REWARD,
  FACE_DOWN_CARD_SCRAP_REWARD,
  INITIAL_BATTERIES,
  INITIAL_SCRAP,
} from '@/domain/game/game-resources'
import { placeFaceDownCard } from '@/domain/game/place-face-down-card'
import { createInitialGameState, HUMAN_PLAYER_ID } from '@/domain/game/game-state'

describe('placeFaceDownCard', () => {
  it('places a face-down card and grants scrap and batteries', () => {
    const result = placeFaceDownCard({
      state: createInitialGameState(),
      position: { row: 1, column: 1 },
      source: 'shelter',
    })

    expect(result.success).toBe(true)

    if (!result.success) {
      return
    }

    const activePlayer = result.state.players.find((player) => player.id === HUMAN_PLAYER_ID)

    expect(activePlayer?.scrap).toBe(INITIAL_SCRAP + FACE_DOWN_CARD_SCRAP_REWARD)
    expect(activePlayer?.batteries).toBe(INITIAL_BATTERIES + FACE_DOWN_CARD_BATTERY_REWARD)
    expect(activePlayer?.colony).toEqual([
      {
        cardId: 'shelter-face-down',
        position: { row: 1, column: 1 },
        isFaceDown: true,
      },
    ])
    expect(result.state.pendingPlacementCardId).toBeNull()
  })

  it('uses the selected source for the face-down card back', () => {
    const result = placeFaceDownCard({
      state: createInitialGameState(),
      position: { row: 0, column: 0 },
      source: 'wasteland',
    })

    expect(result.success).toBe(true)

    if (!result.success) {
      return
    }

    expect(result.state.players.find((player) => player.id === HUMAN_PLAYER_ID)?.colony[0]).toEqual({
      cardId: 'wasteland-face-down',
      position: { row: 0, column: 0 },
      isFaceDown: true,
    })
  })

  it('rejects placement when the active player cannot be found', () => {
    const result = placeFaceDownCard({
      state: {
        ...createInitialGameState(),
        activePlayerId: 'missing-player',
      },
      position: { row: 1, column: 1 },
      source: 'shelter',
    })

    expect(result).toEqual({
      success: false,
      error: 'active_player_not_found',
    })
  })

  it('rejects placement in an invalid colony position', () => {
    const initialState = createInitialGameState()
    const state = {
      ...initialState,
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

    expect(
      placeFaceDownCard({
        state,
        position: { row: 0, column: 0 },
        source: 'shelter',
      }),
    ).toEqual({
      success: false,
      error: 'invalid_colony_position',
    })
  })
})
