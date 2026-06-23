import type { GameStateStorePort } from '@/application/persistence/game-state-store.port'
import { createInitialGameState, type GameState } from '@/domain/game/game-state'

export class LoadGameStateUseCase {
  private readonly gameStateStore: GameStateStorePort

  constructor(gameStateStore: GameStateStorePort) {
    this.gameStateStore = gameStateStore
  }

  async execute(): Promise<GameState> {
    const savedState = await this.gameStateStore.load()

    return savedState ?? createInitialGameState()
  }
}
