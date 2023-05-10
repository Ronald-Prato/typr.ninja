'use client'

import { FC } from 'react'
import { ButtonMainContainer } from './styles'
import { ButtonProps } from './contracts'

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  loading,
  type = 'primary',
  width,
  height,
  keyIndicator,
}) => {
  const keyMap = {
    enter: 'Enter',
    esc: 'Esc',
  }

  return (
    <ButtonMainContainer
      onClick={() => !loading && onClick()}
      disabled={disabled}
      buttonType={type}
      width={width}
      height={height}
    >
      {loading ? <span className="loader" /> : children}
      {keyIndicator && (
        <span className="key-indicator">{keyMap[keyIndicator]}</span>
      )}
    </ButtonMainContainer>
  )
}
