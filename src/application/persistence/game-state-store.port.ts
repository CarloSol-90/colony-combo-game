import type { GameState } from '@/domain/game/game-state'

export interface GameStateStorePort {
  load(): Promise<GameState | null>
  save(state: GameState): Promise<void>
  clear(): Promise<void>
}