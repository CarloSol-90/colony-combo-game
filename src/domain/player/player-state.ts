import type { PlacedColonyCard } from '@/domain/colony/colony-card'
import { INITIAL_BATTERIES, INITIAL_SCRAP } from '@/domain/game/game-resources'

export type PlayerKind = 'human' | 'ai'

export interface PlayerState {
  id: string
  name: string
  kind: PlayerKind
  scrap: number
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
  scrap: INITIAL_SCRAP,
  batteries: INITIAL_BATTERIES,
  colony: [],
})
