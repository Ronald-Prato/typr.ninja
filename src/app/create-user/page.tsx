'use client'

import 'animate.css'
import { v4 as uuidv4 } from 'uuid'
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styles from './CreateUser.module.css'

import { useSessionValidation } from '../../hooks/useSessionValidation'
import { useRouter } from 'next/navigation'
import { RootState, useAppSelector } from '@/store'
import { Button, Spinner } from '@/components'
import { CLIENT_API_URL } from '@/constants'

function SelectUser() {
  const router = useRouter()
  const { isLoading: isLoadingUser } = useSessionValidation()

  const user = useAppSelector((state: RootState) => state.user)

  const [url, setUrl] = useState('')
  const [nickname, setNickname] = useState('')
  const [isUpdatingUser, setIsUpdatingUser] = useState(false)

  useEffect(() => {
    if (!user) return
    user.nickname && setNickname(user.nickname)

    if (user.profilePic) {
      setUrl(user.profilePic)
      return
    }
    setUrl(`https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg`)
  }, [user])

  const handleChangeAvatar = () => {
    setUrl(`https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg`)
  }

  const handleStart = async () => {
    setIsUpdatingUser(true)
    const updated = await fetch(`${CLIENT_API_URL}/api/update-user`, {
      method: 'PUT',
      body: JSON.stringify({
        uid: user.uid,
        data: { nickname, profilePic: url },
      }),
    })

    if (updated) {
      setIsUpdatingUser(false)
      router.push('/queue')
    }
  }

  const isStartDisabled = () => {
    return nickname.length < 3 || isUpdatingUser
  }

  if (isLoadingUser) {
    return <Spinner />
  }

  return (
    <div className={styles.selectUser}>
      <div
        className={`${styles.selectUserContainer} animate__animated animate__fadeInUp animate__fast`}
      >
        <div className={styles.form}>
          <div className={styles.avatarContainer}>
            <img className={styles.avatar} alt="avatar" src={url} />
            <div className={styles.btnAvtArea}>
              <Button type="secondary" onClick={handleChangeAvatar}>
                Change Avatar
              </Button>
            </div>
          </div>
          <div>
            <input
              type="text"
              value={nickname}
              pattern="^[a-zA-Z0-9]+$"
              className={styles.formInput}
              placeholder="Username"
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className={styles.startBtnContainer}>
            <Button
              disabled={isStartDisabled()}
              onClick={handleStart}
              type="primary"
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectUser
