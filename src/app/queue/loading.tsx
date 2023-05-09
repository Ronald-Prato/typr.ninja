import { Spinner } from '@/components'
import styles from './QueuePage.module.css'

export default function Loading() {
  return (
    <div className={styles.queueLoadingMainContainer}>
      <Spinner />
    </div>
  )
}
