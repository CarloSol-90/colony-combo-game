export class LocalStorageAdapter {
  private readonly storageKeyPrefix: string

  constructor(storageKeyPrefix = 'colony-combo') {
    this.storageKeyPrefix = storageKeyPrefix
  }

  private resolveKey(key: string): string {
    return `${this.storageKeyPrefix}:${key}`
  }

  read(key: string): string | null {
    if (typeof window === 'undefined') {
      return null
    }

    return window.localStorage.getItem(this.resolveKey(key))
  }

  write(key: string, value: string): void {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(this.resolveKey(key), value)
  }

  remove(key: string): void {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.removeItem(this.resolveKey(key))
  }
}