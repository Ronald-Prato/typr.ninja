'use client'

import 'animate.css'
import { FC, useEffect, useRef, useState } from 'react'

import styles from './SingleStage.module.css'
import { SingleWordGameStageProps } from './contracts'

export const SingleWordStage: FC<SingleWordGameStageProps> = ({
  words,
  chars,
  onFinish,
}) => {
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [currentWord, setCurrentWord] = useState('')
  const [goToNextRound, setGoToNextRound] = useState(false)
  const [currentContent, setCurrentContent] = useState(words)

  useEffect(() => {
    inputRef.current?.focus()

    document.addEventListener('keydown', handleKeyPress)

    if (goToNextRound) {
      setTimeout(() => {
        index === currentContent.length - 1 &&
          currentContent === chars &&
          onFinish()

        setGoToNextRound(false)
      }, 1000)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [currentWord, goToNextRound])

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return
    if (currentWord !== currentContent[index]) return

    if (index === currentContent.length - 1) {
      setGoToNextRound(true)
      setCurrentContent(chars)
    }

    setIndex((prev) =>
      prev < currentContent.length - 1
        ? prev + 1
        : currentContent !== chars
        ? 0
        : prev && prev
    )
    setCurrentWord('')
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

  if (goToNextRound) {
    return (
      <section
        className={`${styles.nextRoundContainer} animate__animated animate__fadeInUp animate__fast`}
      >
        <h2>Next Round</h2>
      </section>
    )
  }

  return (
    <label className={styles.label} htmlFor="main-input-trigger">
      <main className={styles.mainContainer}>
        <ul className={styles.wordMap}>
          {currentContent[index].split('').map((letter, i) => (
            <span
              key={i}
              className={`${getLetterClass(letter, i)} ${
                styles.slideUpAnimation
              }`}
            >
              {letter}
            </span>
          ))}
        </ul>

        <p className={styles.wordsCounter}>
          {index + 1} / {currentContent.length}
        </p>

        <input
          maxLength={currentContent[index].length}
          className={styles.mainInput}
          onChange={handleInputChange}
          value={currentWord}
          id="main-input-trigger"
          name="main-input-trigger"
          type="text"
          ref={inputRef}
        />

        <p className={styles.gameplayMessage}>
          Type the words in your screen and press <b>Enter</b>
        </p>
      </main>
    </label>
  )
}
