'use client'

import styles from './page.module.css'
import { Button } from '@/components'

export default function Home() {
  return (
    <main className={styles.main}>
      <Button onClick={() => {}} type="primary">
        <span>find match</span>
      </Button>
    </main>
  )
}
