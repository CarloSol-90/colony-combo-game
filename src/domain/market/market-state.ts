import type { CardGroup } from '@/domain/card/card-definition'

export const INITIAL_VISIBLE_MARKET_CARDS = 3

export interface MarketState {
  group: CardGroup
  deckCardIds: string[]
  visibleCardIds: string[]
}

interface CreateInitialMarketStateParams {
  group: CardGroup
  deckCardIds: string[]
}

export const createInitialMarketState = ({
  group,
  deckCardIds,
}: CreateInitialMarketStateParams): MarketState => ({
  group,
  visibleCardIds: deckCardIds.slice(0, INITIAL_VISIBLE_MARKET_CARDS),
  deckCardIds: deckCardIds.slice(INITIAL_VISIBLE_MARKET_CARDS),
})

export const refillMarket = (market: MarketState): MarketState => {
  const missingVisibleCards = INITIAL_VISIBLE_MARKET_CARDS - market.visibleCardIds.length

  if (missingVisibleCards <= 0) {
    return market
  }

  const cardsToReveal = market.deckCardIds.slice(0, missingVisibleCards)

  return {
    ...market,
    visibleCardIds: [...market.visibleCardIds, ...cardsToReveal],
    deckCardIds: market.deckCardIds.slice(cardsToReveal.length),
  }
}
