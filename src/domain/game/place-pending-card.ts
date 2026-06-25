import { canPlaceCardAt } from '@/domain/colony/colony-placement'
import type { ColonyPosition } from '@/domain/colony/colony-position'
import type { GameState } from './game-state'

export type PlacePendingCardError =
  | 'no_pending_card'
  | 'active_player_not_found'
  | 'invalid_colony_position'

export type PlacePendingCardResult =
  | {
      success: true
      state: GameState
    }
  | {
      success: false
      error: PlacePendingCardError
    }

export const placePendingCard = (
  state: GameState,
  position: ColonyPosition,
): PlacePendingCardResult => {
  if (!state.pendingPlacementCardId) {
    return {
      success: false,
      error: 'no_pending_card',
    }
  }

  const pendingPlacementCardId = state.pendingPlacementCardId

  const activePlayer = state.players.find((player) => player.id === state.activePlayerId)

  if (!activePlayer) {
    return {
      success: false,
      error: 'active_player_not_found',
    }
  }

  if (!canPlaceCardAt(activePlayer.colony, position)) {
    return {
      success: false,
      error: 'invalid_colony_position',
    }
  }

  return {
    success: true,
    state: {
      ...state,
      pendingPlacementCardId: null,
      players: state.players.map((player) =>
        player.id === state.activePlayerId
          ? {
              ...player,
              colony: [
                ...player.colony,
                {
                  cardId: pendingPlacementCardId,
                  position,
                  isFaceDown: false,
                },
              ],
            }
          : player,
      ),
    },
  }
}
