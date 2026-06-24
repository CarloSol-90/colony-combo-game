import type { PlacedColonyCard } from './colony-card'
import { areOrthogonallyAdjacent, type ColonyPosition } from './colony-position'

export const MAX_COLONY_CARDS = 9

export const isPositionOccupied = (
  placedCards: PlacedColonyCard[],
  position: ColonyPosition,
): boolean =>
  placedCards.some(
    (placedCard) =>
      placedCard.position.row === position.row && placedCard.position.column === position.column,
  )

export const canPlaceCardAt = (
  placedCards: PlacedColonyCard[],
  position: ColonyPosition,
): boolean => {
  if (placedCards.length >= MAX_COLONY_CARDS) {
    return false
  }

  if (isPositionOccupied(placedCards, position)) {
    return false
  }

  if (placedCards.length === 0) {
    return true
  }

  return placedCards.some((placedCard) => areOrthogonallyAdjacent(placedCard.position, position))
}
