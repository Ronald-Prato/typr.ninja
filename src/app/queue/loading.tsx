import { Spinner } from '@/components'
import styles from './Queue.module.css'

export default function Loading() {
  return (
    <div className={styles.queueLoadingMainContainer}>
      <Spinner />
    </div>
  )
}
