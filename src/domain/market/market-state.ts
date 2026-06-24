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
