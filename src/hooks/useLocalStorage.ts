export function useLocalStorage() {
  function saveInLocalStorage<T>(key: string, value: T) {
    if (typeof window === 'undefined') return null
    localStorage.setItem(key, JSON.stringify(value))
  }

  function getFromLocalStorage<T>(key: string): T | null {
    if (typeof window === 'undefined') return null

    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
    return null
  }

  return { saveInLocalStorage, getFromLocalStorage }
}
