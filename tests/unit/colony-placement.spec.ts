import { describe, expect, it } from 'vitest'
import type { PlacedColonyCard } from '@/domain/colony/colony-card'
import { canPlaceCardAt, isPositionOccupied, MAX_COLONY_CARDS } from '@/domain/colony/colony-placement'

const placedCard = (
  cardId: string,
  row: 0 | 1 | 2,
  column: 0 | 1 | 2,
): PlacedColonyCard => ({
  cardId,
  position: { row, column },
  isFaceDown: false,
})

describe('isPositionOccupied', () => {
  it('detects occupied positions', () => {
    const placedCards = [placedCard('card-1', 1, 1)]

    expect(isPositionOccupied(placedCards, { row: 1, column: 1 })).toBe(true)
    expect(isPositionOccupied(placedCards, { row: 0, column: 0 })).toBe(false)
  })
})

describe('canPlaceCardAt', () => {
  it('allows the first card in any valid position', () => {
    expect(canPlaceCardAt([], { row: 0, column: 0 })).toBe(true)
    expect(canPlaceCardAt([], { row: 2, column: 2 })).toBe(true)
  })

  it('rejects occupied positions', () => {
    const placedCards = [placedCard('card-1', 1, 1)]

    expect(canPlaceCardAt(placedCards, { row: 1, column: 1 })).toBe(false)
  })

  it('allows positions connected orthogonally to an existing card', () => {
    const placedCards = [placedCard('card-1', 1, 1)]

    expect(canPlaceCardAt(placedCards, { row: 0, column: 1 })).toBe(true)
    expect(canPlaceCardAt(placedCards, { row: 1, column: 2 })).toBe(true)
  })

  it('rejects positions connected only diagonally', () => {
    const placedCards = [placedCard('card-1', 1, 1)]

    expect(canPlaceCardAt(placedCards, { row: 0, column: 0 })).toBe(false)
  })

  it('rejects placement when the colony is full', () => {
    const placedCards: PlacedColonyCard[] = [
      placedCard('card-1', 0, 0),
      placedCard('card-2', 0, 1),
      placedCard('card-3', 0, 2),
      placedCard('card-4', 1, 0),
      placedCard('card-5', 1, 1),
      placedCard('card-6', 1, 2),
      placedCard('card-7', 2, 0),
      placedCard('card-8', 2, 1),
      placedCard('card-9', 2, 2),
    ]

    expect(placedCards).toHaveLength(MAX_COLONY_CARDS)
    expect(canPlaceCardAt(placedCards, { row: 1, column: 1 })).toBe(false)
  })
})
