import { FC } from 'react'
import { ButtonMainContainer } from './styles'
import { ButtonProps } from './contracts'

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  type = 'primary',
}) => (
  <ButtonMainContainer onClick={onClick} disabled={disabled} buttonType={type}>
    {children}
  </ButtonMainContainer>
)
