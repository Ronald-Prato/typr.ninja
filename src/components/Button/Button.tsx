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
}) => (
  <ButtonMainContainer
    onClick={() => !loading && onClick()}
    disabled={disabled}
    buttonType={type}
    width={width}
    height={height}
  >
    {loading ? <span className="loader" /> : children}
  </ButtonMainContainer>
)
