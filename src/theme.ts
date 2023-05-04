export interface ThemeInterface {
  palette: {
    primary: string
    primaryDark: string
    secondary: string
    secondaryDark: string
    danger: string
    gray: string
    grayDark: string
    dark: string
    darkLight: string
    white: string
  }
}

export const defaultTheme: ThemeInterface = {
  palette: {
    primary: '#f2b238',
    primaryDark: '#cd8d16',
    secondary: '#30c4be',
    secondaryDark: '#128c89',
    danger: '#f06262',
    gray: '#a8bec9',
    grayDark: '#7a8991',
    dark: '#192a33',
    darkLight: '#1f3640',
    white: '#fff',
  },
}
