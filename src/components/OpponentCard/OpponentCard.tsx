import { FC } from "react"
import Image from "next/image"

import styles from "./OpponentCard.module.css"
import { OpponentCardProps } from "./contracts"

export const OpponentCard: FC<OpponentCardProps> = ({opponent}) => {
  return (
    <div className={styles.opponentContainer}>
      <h2>Opponent</h2>
      
      <Image
        width={70}
        height={70}
        alt="Opponent"
        placeholder="blur"
        src={opponent.profilePic}
        blurDataURL={opponent.profilePic}
      />

      <section>
        <span>{opponent.elo}</span>
        <h3>{opponent.nickname}</h3>
      </section>
    </div>
  )
}
