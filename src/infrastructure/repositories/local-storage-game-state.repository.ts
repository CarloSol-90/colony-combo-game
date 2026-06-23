import { createInitialGameState, type GameState } from '@/domain/game/game-state'
import type { GameStateStorePort } from '@/application/persistence/game-state-store.port'
import { LocalStorageAdapter } from '@/infrastructure/storage/local-storage-adapter'

const GAME_STATE_KEY = 'game-state'

export class LocalStorageGameStateRepository implements GameStateStorePort {
  private readonly storage: LocalStorageAdapter

  constructor(storage = new LocalStorageAdapter()) {
    this.storage = storage
  }

  async load(): Promise<GameState | null> {
    const raw = this.storage.read(GAME_STATE_KEY)

    if (!raw) {
      return null
    }

    try {
      return JSON.parse(raw) as GameState
    } catch {
      return createInitialGameState()
    }
  }

  async save(state: GameState): Promise<void> {
    this.storage.write(GAME_STATE_KEY, JSON.stringify(state))
  }

  async clear(): Promise<void> {
    this.storage.remove(GAME_STATE_KEY)
  }
}