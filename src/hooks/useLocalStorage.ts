export function useLocalStorage() {
  function saveInLocalStorage<T>(key: string, value: T) {
    console.log('SETTING UP LOCAL STORAGE', key, value)
    if (typeof window === 'undefined') return null
    localStorage.setItem(key, JSON.stringify(value))
    console.log('SAVED IN LOCAL STORAGE')
  }

  function getFromLocalStorage<T>(key: string): T | null {
    if (typeof window === 'undefined') return null

    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
    return null
  }

  function removeFromLocalStorage(key: string) {
    if (typeof window === 'undefined') return null
    localStorage.removeItem(key)
  }

  return { saveInLocalStorage, getFromLocalStorage, removeFromLocalStorage }
}
