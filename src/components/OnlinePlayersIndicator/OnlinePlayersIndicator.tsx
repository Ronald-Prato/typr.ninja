'use client'

import { useContext } from "react"

import styles from "./OnlinePlayersIndicator.module.css"

import SocketContext from "@/sockets.context"

export const OnlinePlayersIndicator = () => {
  const { playersAmount } = useContext(SocketContext)

  return (
    <div className={styles.indicatorContainer}>
      <div className={styles.ledBox}>
        <div className={styles.led}></div>
      </div>
      <span><b>{playersAmount}</b> players online</span>
    </div>
  )
}
