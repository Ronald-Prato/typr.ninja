import styles from './Spinner.module.css'

export const Spinner = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader} />
    </div>
  )
}

