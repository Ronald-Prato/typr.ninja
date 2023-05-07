export function useLocalStorage() {
  function saveInLocalStorage<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  function getFromLocalStorage<T>(key: string): T | null {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
    return null
  }

  return { saveInLocalStorage, getFromLocalStorage }
}
