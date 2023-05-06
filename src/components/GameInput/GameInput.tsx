import { FC } from 'react'
import styles from './GameInput.module.css'
import { GameInputProps } from './contracts'

export const GameInput: FC<GameInputProps> = ({
  onChange,
  disabled,
  placeholder,
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.mainInput}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
