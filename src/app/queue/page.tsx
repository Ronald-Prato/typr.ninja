'use client'

import { UserData } from '@/types/user'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import styles from './Queue.module.css'
import { Button } from '@/components'

export default function QueuePage(props: { params: { userData: UserData } }) {
  const [showComponent, setShowComponent] = useState(false)
  const router = useRouter()

  const user = props.params.userData

  useEffect(() => {
    if (!user) router.replace('/login')
    setShowComponent(true)
  }, [user])

  return (
    showComponent && (
      <div className={styles.queueMainContainer}>
        <img alt="user" src={user.profilePic} />
        <h2>{user.nickname}</h2>

        <section className={styles.barContainer}>
          <div className={styles.levelBar}>
            <p className={styles.levelCurrent}>{user.elo}</p>
            <div
              className={styles.levelBarCompleted}
              style={{
                width: `${(user.points * 100) / 500}%`,
              }}
            ></div>
            <p className={styles.levelXp}>
              {user.points} / {500}
            </p>
          </div>
        </section>

        <Button type="primary" onClick={() => {}}>
          Find match
        </Button>
      </div>
    )
  )
}
