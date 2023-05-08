import styles from './Login.module.css'

export const metadata = {
  title: 'Login | Typr Ninja',
  description: 'Join the best typing competition community.',
  keywords: 'typr, ninja, racing, game, typing, speed, fast, fun, multiplayer',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={styles.loginMainContainer}>{children}</div>
}
