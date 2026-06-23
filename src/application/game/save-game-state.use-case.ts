import type { GameStateStorePort } from '@/application/persistence/game-state-store.port'
import type { GameState } from '@/domain/game/game-state'

export class SaveGameStateUseCase {
  private readonly gameStateStore: GameStateStorePort

  constructor(gameStateStore: GameStateStorePort) {
    this.gameStateStore = gameStateStore
  }

  async execute(state: GameState): Promise<void> {
    await this.gameStateStore.save(state)
  }
}
