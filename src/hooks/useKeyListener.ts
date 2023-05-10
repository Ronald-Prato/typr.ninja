import { useEffect } from 'react'

type KeyActionMap = Record<string, () => void>

export const useKeyListener = (keyCallbackMap: KeyActionMap) => {
  const handleKeyPress = (e: KeyboardEvent) => {
    keyCallbackMap[e.key] && keyCallbackMap[e.key]()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])
}
