'use client'

import './globals.css'
import { Provider as StoreProvider } from 'react-redux'

import { store } from '@/store'
import { defaultTheme } from '@/theme'
import { ModalProvider } from '@/modal.context'
import { ThemeProvider } from 'styled-components'
import { SocketProvider } from '@/sockets.context'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <StoreProvider store={store}>
        <SocketProvider>
          <ModalProvider>{children}</ModalProvider>
        </SocketProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}
