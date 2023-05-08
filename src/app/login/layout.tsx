import styles from './Login.module.css'

export const metadata = {
  title: 'Login | Typr Ninja',
  description: 'Join the best typing competition community.',
  keywords: 'typr, ninja, racing, game, typing, speed, fast, fun, multiplayer',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
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
