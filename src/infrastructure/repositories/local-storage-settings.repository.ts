import type { AppSettings, SettingsStorePort } from '@/application/persistence/settings-store.port'
import { LocalStorageAdapter } from '@/infrastructure/storage/local-storage-adapter'

const SETTINGS_KEY = 'app-settings'

const defaultSettings: AppSettings = {
  locale: 'es',
  soundEnabled: true,
}

export class LocalStorageSettingsRepository implements SettingsStorePort {
  private readonly storage: LocalStorageAdapter

  constructor(storage = new LocalStorageAdapter()) {
    this.storage = storage
  }

  async load(): Promise<AppSettings | null> {
    const raw = this.storage.read(SETTINGS_KEY)

    if (!raw) {
      return defaultSettings
    }

    try {
      return JSON.parse(raw) as AppSettings
    } catch {
      return defaultSettings
    }
  }

  async save(settings: AppSettings): Promise<void> {
    this.storage.write(SETTINGS_KEY, JSON.stringify(settings))
  }

  async clear(): Promise<void> {
    this.storage.remove(SETTINGS_KEY)
  }
}