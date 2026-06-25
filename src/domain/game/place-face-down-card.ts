import { canPlaceCardAt } from '@/domain/colony/colony-placement'
import type { ColonyPosition } from '@/domain/colony/colony-position'
import {
  FACE_DOWN_CARD_BATTERY_REWARD,
  FACE_DOWN_CARD_SCRAP_REWARD,
} from './game-resources'
import type { GameState, RadioPosition } from './game-state'

export type PlaceFaceDownCardError = 'active_player_not_found' | 'invalid_colony_position'

export type PlaceFaceDownCardResult =
  | {
      success: true
      state: GameState
    }
  | {
      success: false
      error: PlaceFaceDownCardError
    }

interface PlaceFaceDownCardParams {
  state: GameState
  position: ColonyPosition
  source: RadioPosition
}

export const placeFaceDownCard = ({
  state,
  position,
  source,
}: PlaceFaceDownCardParams): PlaceFaceDownCardResult => {
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
              scrap: player.scrap + FACE_DOWN_CARD_SCRAP_REWARD,
              batteries: player.batteries + FACE_DOWN_CARD_BATTERY_REWARD,
              colony: [
                ...player.colony,
                {
                  cardId: `${source}-face-down`,
                  position,
                  isFaceDown: true,
                },
              ],
            }
          : player,
      ),
    },
  }
}
