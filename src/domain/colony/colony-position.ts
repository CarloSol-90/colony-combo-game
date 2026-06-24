export type ColonyCoordinate = 0 | 1 | 2

export interface ColonyPosition {
  row: ColonyCoordinate
  column: ColonyCoordinate
}

interface RawColonyPosition {
  row: number
  column: number
}

export const isInsideColonyGrid = (position: RawColonyPosition): position is ColonyPosition =>
  position.row >= 0 && position.row <= 2 && position.column >= 0 && position.column <= 2

export const areOrthogonallyAdjacent = (first: ColonyPosition, second: ColonyPosition): boolean => {
  const rowDistance = Math.abs(first.row - second.row)
  const columnDistance = Math.abs(first.column - second.column)

  return rowDistance + columnDistance === 1
}
