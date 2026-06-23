export interface AppSettings {
  locale: 'es' | 'en'
  soundEnabled: boolean
}

export interface SettingsStorePort {
  load(): Promise<AppSettings | null>
  save(settings: AppSettings): Promise<void>
  clear(): Promise<void>
}