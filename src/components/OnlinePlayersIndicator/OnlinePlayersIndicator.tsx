'use client'

import { useContext } from 'react'

import styles from './OnlinePlayersIndicator.module.css'

import SocketContext from '@/sockets.context'

export const OnlinePlayersIndicator = () => {
  const { playersAmount, ping } = useContext(SocketContext)

  const getPingColorIndicator = () => {
    if (ping <= 10) return 'var(--secondary)'
    if (ping > 10 && ping <= 20) return 'var(--primary)'
    if (ping > 20) return 'var(--danger)'
  }

  return (
    <div className={styles.indicatorContainer}>
      <div className={styles.ledBox}>
        <div className={styles.led}></div>
      </div>
      <span>
        <b>{playersAmount}</b> players online
      </span>
      <br />
      <p style={{ color: getPingColorIndicator() }}>{ping} ms</p>
    </div>
  )
}
