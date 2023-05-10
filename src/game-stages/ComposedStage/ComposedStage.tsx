'use client'

import 'animate.css'
import { useRouter } from 'next/navigation'
import { FC, useContext, useEffect, useRef, useState } from 'react'

import styles from './ComposedStage.module.css'
import { ComposedGameStageProps } from './contracts'

import ModalContext from '@/modal.context'

export const ComposedStage: FC<ComposedGameStageProps> = ({
  sentence,
  onFinish,
}) => {
  const router = useRouter()
  const { winner } = useContext(ModalContext)
  const inputRef = useRef<HTMLInputElement>(null)
  const [currentText, setCurrentText] = useState('')
  const spacesPositions = sentence
    .split('')
    .map((letter, index) => {
      return !letter.trim().length ? index : 0
    })
    .filter(Boolean)

  useEffect(() => {
    if (winner) {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [winner])

  useEffect(() => {
    inputRef.current?.focus()

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [sentence, currentText])

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return

    const sentenceWithoutSpaces = sentence.replace(/\s/g, '')
    const currentTextWithoutSpaces = currentText
      .split('')
      .filter((_, i) => !spacesPositions.includes(i))
      .join('')

    if (currentTextWithoutSpaces === sentenceWithoutSpaces) {
      onFinish()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(e.target.value)
  }

  const getLetterClass = (letter: string, i: number) => {
    if (!currentText[i]) {
      return styles.defaultLetter
    }

    if (letter === currentText[i]) {
      return styles.correctLetter
    }

    return styles.wrongLetter
  }

  return (
    <label className={styles.label} htmlFor="main-input-trigger">
      <main className={styles.mainContainer}>
        <ul className={styles.wordMap}>
          {sentence.split('').map((letter, i) => (
            <span
              key={i}
              className={`${getLetterClass(letter, i)} ${
                styles.slideUpAnimation
              }`}
            >
              {!letter.trim().length ? (
                <div className={styles.spacer} />
              ) : (
                <span>{letter}</span>
              )}
            </span>
          ))}
        </ul>

        <input
          maxLength={sentence.length}
          className={styles.mainInput}
          onChange={handleInputChange}
          value={currentText}
          id="main-input-trigger"
          name="main-input-trigger"
          type="text"
          ref={inputRef}
        />

        <p className={styles.gameplayMessage}>
          Type the text as soon as posible and type <b>Enter</b>
        </p>
      </main>
    </label>
  )
}
