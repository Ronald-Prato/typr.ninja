"use client";

import "./globals.css";
import { Provider as StoreProvider } from "react-redux";

import { store } from "@/store";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "@/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <StoreProvider store={store}>
        <html lang="en">
          <body>{children}</body>
        </html>
      </StoreProvider>
    </ThemeProvider>
  );
}
