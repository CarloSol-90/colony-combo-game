import { describe, expect, it } from 'vitest'
import { createInitialMarketState, INITIAL_VISIBLE_MARKET_CARDS } from '@/domain/market/market-state'

describe('createInitialMarketState', () => {
  it('creates a market with the first cards visible and the rest in the deck', () => {
    const market = createInitialMarketState({
      group: 'refugio',
      deckCardIds: ['card-1', 'card-2', 'card-3', 'card-4'],
    })

    expect(market).toEqual({
      group: 'refugio',
      visibleCardIds: ['card-1', 'card-2', 'card-3'],
      deckCardIds: ['card-4'],
    })
    expect(market.visibleCardIds).toHaveLength(INITIAL_VISIBLE_MARKET_CARDS)
  })

  it('keeps all available cards visible when the deck has fewer than the market size', () => {
    expect(
      createInitialMarketState({
        group: 'yermo',
        deckCardIds: ['card-1', 'card-2'],
      }),
    ).toEqual({
      group: 'yermo',
      visibleCardIds: ['card-1', 'card-2'],
      deckCardIds: [],
    })
  })
})
