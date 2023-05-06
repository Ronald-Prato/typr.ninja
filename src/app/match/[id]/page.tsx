'use client'

import { GameInput } from '@/components'
import styles from './page.module.css'
import { SingleWordStage } from '@/game-stages'

export default function MatchPage({ params }: { params: { id: string } }) {
  return (
    <div className={styles.mainContainer}>
      <SingleWordStage onFinish={() => {}} />
    </div>
  )
}
