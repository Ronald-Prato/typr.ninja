'use client'

import { UserData } from '@/types/user'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import styles from './Queue.module.css'
import { Button } from '@/components'
import SocketContext from '@/sockets.context'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useAuth } from '@/hooks/useAuth'

export default function QueuePage(props: { params: { userData: UserData } }) {
  const { logout } = useAuth()
  const { putPlayerInQueue, removePlayerFromQueue } = useContext(SocketContext)
  const [inQueue, setInQueue] = useState(false)
  const { saveInLocalStorage } = useLocalStorage()

  const [showComponent, setShowComponent] = useState(false)
  const router = useRouter()

  const user = props.params.userData

  useEffect(() => {
    if (!user) router.replace('/login')

    setShowComponent(true)
    saveInLocalStorage<UserData>('userData', user)
  }, [user])

  const getInQueue = () => {
    putPlayerInQueue()
    setInQueue(true)
  }

  const getOffQueue = () => {
    removePlayerFromQueue()
    setInQueue(false)
  }

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

        <Button
          type={inQueue ? 'secondary' : 'primary'}
          onClick={() => (inQueue ? getOffQueue() : getInQueue())}
        >
          {inQueue ? 'Leave Queue' : 'Find Match'}
        </Button>

        <div className={styles.signOut}>
          <Button type="primary" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </div>
    )
  )
}
