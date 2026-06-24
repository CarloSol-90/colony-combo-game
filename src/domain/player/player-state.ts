import type { PlacedColonyCard } from '@/domain/colony/colony-card'
import { INITIAL_BATTERIES, INITIAL_CAPITAL } from '@/domain/game/game-state'

export type PlayerKind = 'human' | 'ai'

export interface PlayerState {
  id: string
  name: string
  kind: PlayerKind
  capital: number
  batteries: number
  colony: PlacedColonyCard[]
}

interface CreateInitialPlayerStateParams {
  id: string
  name: string
  kind: PlayerKind
}

export const createInitialPlayerState = ({
  id,
  name,
  kind,
}: CreateInitialPlayerStateParams): PlayerState => ({
  id,
  name,
  kind,
  capital: INITIAL_CAPITAL,
  batteries: INITIAL_BATTERIES,
  colony: [],
})
