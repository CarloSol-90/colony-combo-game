import type { ColonyPosition } from './colony-position'

export interface PlacedColonyCard {
  cardId: string
  position: ColonyPosition
  isFaceDown: boolean
}
