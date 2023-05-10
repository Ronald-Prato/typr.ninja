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

const getShadowColor = (
  buttonType: 'primary' | 'secondary',
  disabled: boolean
) => {
  if (disabled) {
    return css`
      ${({ theme }) => theme.palette.grayDark}
    `
  }
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
  width?: number
  height?: number
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
  box-shadow: 0 6px 0
    ${({ buttonType, disabled }) => getShadowColor(buttonType, !!disabled)};
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ buttonType }) => getFontColor(buttonType)};
  min-width: ${({ width }) => width || 100}px;
  min-height: ${({ height }) => height || 40}px;

  &:active {
    ${({ disabled, theme }) =>
      !disabled &&
      `transform: translateY(2px); box-shadow: 0 4px 0 ${theme.palette.grayDark}`}
  }

  & .loader {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;
  }
  .loader::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 3px solid var(--dark);
    animation: prixClipFix 2s linear infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes prixClipFix {
    0% {
      clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
    }
    25% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
    }
    50% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
    }
    75% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
    }
    100% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
    }
  }
`
