import { describe, expect, it } from 'vitest'
import {
  createInitialMarketState,
  INITIAL_VISIBLE_MARKET_CARDS,
  refillMarket,
} from '@/domain/market/market-state'

describe('createInitialMarketState', () => {
  it('creates a market with the first cards visible and the rest in the deck', () => {
    const market = createInitialMarketState({
      group: 'shelter',
      deckCardIds: ['card-1', 'card-2', 'card-3', 'card-4'],
    })

    expect(market).toEqual({
      group: 'shelter',
      visibleCardIds: ['card-1', 'card-2', 'card-3'],
      deckCardIds: ['card-4'],
    })
    expect(market.visibleCardIds).toHaveLength(INITIAL_VISIBLE_MARKET_CARDS)
  })

  it('keeps all available cards visible when the deck has fewer than the market size', () => {
    expect(
      createInitialMarketState({
        group: 'wasteland',
        deckCardIds: ['card-1', 'card-2'],
      }),
    ).toEqual({
      group: 'wasteland',
      visibleCardIds: ['card-1', 'card-2'],
      deckCardIds: [],
    })
  })
})

describe('refillMarket', () => {
  it('moves cards from the deck to visible cards until the market is full', () => {
    expect(
      refillMarket({
        group: 'shelter',
        visibleCardIds: ['card-1', 'card-2'],
        deckCardIds: ['card-3', 'card-4'],
      }),
    ).toEqual({
      group: 'shelter',
      visibleCardIds: ['card-1', 'card-2', 'card-3'],
      deckCardIds: ['card-4'],
    })
  })

  it('keeps a full market unchanged', () => {
    const market = {
      group: 'wasteland' as const,
      visibleCardIds: ['card-1', 'card-2', 'card-3'],
      deckCardIds: ['card-4'],
    }

    expect(refillMarket(market)).toBe(market)
  })

  it('allows a market to remain partially filled when the deck is empty', () => {
    expect(
      refillMarket({
        group: 'shelter',
        visibleCardIds: ['card-1'],
        deckCardIds: [],
      }),
    ).toEqual({
      group: 'shelter',
      visibleCardIds: ['card-1'],
      deckCardIds: [],
    })
  })
})
