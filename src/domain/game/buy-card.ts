import type { CardDefinition } from '@/domain/card/card-definition'
import type { GameState } from './game-state'

export type BuyCardError =
  | 'active_player_not_found'
  | 'card_not_available_in_current_market'
  | 'not_enough_capital'

export type BuyCardResult =
  | {
      success: true
      state: GameState
    }
  | {
      success: false
      error: BuyCardError
    }

export const buyCard = (state: GameState, card: Pick<CardDefinition, 'id' | 'cost'>): BuyCardResult => {
  const currentMarket = state.markets[state.radioPosition]

  if (!currentMarket.visibleCardIds.includes(card.id)) {
    return {
      success: false,
      error: 'card_not_available_in_current_market',
    }
  }

  const activePlayer = state.players.find((player) => player.id === state.activePlayerId)

  if (!activePlayer) {
    return {
      success: false,
      error: 'active_player_not_found',
    }
  }

  if (activePlayer.capital < card.cost) {
    return {
      success: false,
      error: 'not_enough_capital',
    }
  }

  return {
    success: true,
    state: {
      ...state,
      players: state.players.map((player) =>
        player.id === state.activePlayerId
          ? {
              ...player,
              capital: player.capital - card.cost,
            }
          : player,
      ),
      markets: {
        ...state.markets,
        [state.radioPosition]: {
          ...currentMarket,
          visibleCardIds: currentMarket.visibleCardIds.filter((cardId) => cardId !== card.id),
        },
      },
    },
  }
}
