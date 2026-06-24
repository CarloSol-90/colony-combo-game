import { describe, expect, it } from 'vitest'
import { areOrthogonallyAdjacent, isInsideColonyGrid } from '@/domain/colony/colony-position'

describe('isInsideColonyGrid', () => {
  it('accepts positions inside the 3x3 colony grid', () => {
    expect(isInsideColonyGrid({ row: 0, column: 0 })).toBe(true)
    expect(isInsideColonyGrid({ row: 2, column: 2 })).toBe(true)
    expect(isInsideColonyGrid({ row: 1, column: 1 })).toBe(true)
  })

  it('rejects positions outside the 3x3 colony grid', () => {
    expect(isInsideColonyGrid({ row: -1, column: 0 })).toBe(false)
    expect(isInsideColonyGrid({ row: 0, column: -1 })).toBe(false)
    expect(isInsideColonyGrid({ row: 3, column: 0 })).toBe(false)
    expect(isInsideColonyGrid({ row: 0, column: 3 })).toBe(false)
  })
})

describe('areOrthogonallyAdjacent', () => {
  it('accepts positions that touch vertically or horizontally', () => {
    expect(areOrthogonallyAdjacent({ row: 1, column: 1 }, { row: 0, column: 1 })).toBe(true)
    expect(areOrthogonallyAdjacent({ row: 1, column: 1 }, { row: 2, column: 1 })).toBe(true)
    expect(areOrthogonallyAdjacent({ row: 1, column: 1 }, { row: 1, column: 0 })).toBe(true)
    expect(areOrthogonallyAdjacent({ row: 1, column: 1 }, { row: 1, column: 2 })).toBe(true)
  })

  it('rejects diagonal, equal, or distant positions', () => {
    expect(areOrthogonallyAdjacent({ row: 1, column: 1 }, { row: 0, column: 0 })).toBe(false)
    expect(areOrthogonallyAdjacent({ row: 1, column: 1 }, { row: 1, column: 1 })).toBe(false)
    expect(areOrthogonallyAdjacent({ row: 0, column: 0 }, { row: 0, column: 2 })).toBe(false)
  })
})
