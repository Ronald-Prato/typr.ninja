'use client'

import './globals.css'
import { Provider as StoreProvider } from 'react-redux'

import { store } from '@/store'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/theme'
import { SocketProvider } from '@/sockets.context'
import { ModalProvider } from '@/modal.context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <StoreProvider store={store}>
        <ModalProvider>
          <SocketProvider>
            <html lang="en">
              {/* <div className="phoneBlocker">
            <p>You need a keyboard to play this game</p>
          </div> */}
              <body>{children}</body>
            </html>
          </SocketProvider>
        </ModalProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}
