'use client'

import { FC, useEffect, useRef, useState } from 'react'

import styles from './SingleWord.module.css'
import { SingleWordGameStageProps } from './contracts'

export const SingleWordStage: FC<SingleWordGameStageProps> = () => {
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const words = ['This', 'is', 'a', 'test', 'word', 'list']
  const [currentWord, setCurrentWord] = useState('')
  const [hastyped, setHasTyped] = useState(false)

  useEffect(() => {
    inputRef.current?.focus()

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [currentWord])

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentWord === words[index]) {
        setIndex((prev) => (prev < words.length - 1 ? prev + 1 : 0))
        setCurrentWord('')
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentWord(e.target.value.trim())
  }

  const getLetterClass = (letter: string, i: number) => {
    if (!currentWord[i]) {
      return styles.defaultLetter
    }

    if (letter === currentWord[i]) {
      return styles.correctLetter
    }

    return styles.wrongLetter
  }

  return (
    <label className={styles.label} htmlFor="main-input-trigger">
      <main className={styles.mainContainer}>
        <ul className={styles.wordMap}>
          {words[index].split('').map((letter, i) => (
            <span
              className={`${getLetterClass(letter, i)} ${
                styles.slideUpAnimation
              }`}
            >
              {letter}
            </span>
          ))}
        </ul>

        <p className={styles.wordsCounter}>
          {index + 1} / {words.length}
        </p>

        <input
          maxLength={words[index].length}
          className={styles.mainInput}
          onChange={handleInputChange}
          value={currentWord}
          id="main-input-trigger"
          name="main-input-trigger"
          type="text"
          ref={inputRef}
        />

        {!hastyped && (
          <p className={styles.gameplayMessage}>
            Type the words in your screen and press <b>Enter</b>
          </p>
        )}
      </main>
    </label>
  )
}
