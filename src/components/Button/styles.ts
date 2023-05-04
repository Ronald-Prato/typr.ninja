import styled, { css } from 'styled-components'

const getFontColor = (buttonType: 'primary' | 'secondary') => {
  if (buttonType === 'primary')
    return css`
      ${({ theme }) => theme.palette.darkLight}
    `
  if (buttonType === 'secondary')
    return css`
      ${({ theme }) => theme.palette.white}
    `
}

const getBackgroundColor = (
  buttonType: 'primary' | 'secondary',
  disabled: boolean
) => {
  if (disabled)
    return css`
      background-color: ${({ theme }) => theme.palette.gray};
      cursor: not-allowed;
    `
  if (buttonType === 'primary')
    return css`
      background-color: ${({ theme }) => theme.palette.primary};
    `
  if (buttonType === 'secondary')
    return css`
      background-color: ${({ theme }) => theme.palette.secondary};
    `
}

const getShadowColor = (buttonType: 'primary' | 'secondary') => {
  if (buttonType === 'primary') {
    return css`
      ${({ theme }) => theme.palette.primaryDark}
    `
  }
  if (buttonType === 'secondary') {
    return css`
      ${({ theme }) => theme.palette.secondaryDark}
    `
  }
}

export const ButtonMainContainer = styled.button<{
  buttonType: 'primary' | 'secondary'
  disabled?: boolean
}>`
  cursor: pointer;
  ${({ buttonType, disabled }) => getBackgroundColor(buttonType, !!disabled)};
  border: none;
  font-size: 1.125rem;
  font-weight: bold;
  padding: 12px 25px;
  border-radius: 10px;
  text-transform: uppercase;
  transition: all 0.1s;
  box-shadow: 0 6px 0 ${({ buttonType }) => getShadowColor(buttonType)};
  margin-bottom: 8px;
  display: inline-block;
  color: ${({ buttonType }) => getFontColor(buttonType)};

  &:active {
    ${({ disabled, theme }) =>
      !disabled &&
      `transform: translateY(2px); box-shadow: 0 4px 0 ${theme.palette.grayDark}`}
  }
`
