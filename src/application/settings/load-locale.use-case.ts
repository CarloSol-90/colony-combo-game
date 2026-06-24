import type { AppSettings, SettingsStorePort } from '@/application/persistence/settings-store.port'

export class LoadLocaleUseCase {
  private readonly settingsStore: SettingsStorePort

  constructor(settingsStore: SettingsStorePort) {
    this.settingsStore = settingsStore
  }

  async execute(): Promise<AppSettings['locale']> {
    const settings = await this.settingsStore.load()

    return settings?.locale ?? 'en'
  }
}
