import styles from './Login.module.css'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={styles.loginMainContainer}>{children}</div>
}
