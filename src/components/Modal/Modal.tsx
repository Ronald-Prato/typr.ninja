'use client'
import React, { useContext } from 'react'

import Win from './Win'
import styles from './Modal.module.css'
import ModalContext from '@/modal.context'

export const Modal = () => {
  const { show } = useContext(ModalContext)

  return show ? (
    <div className={`${styles.modal} ${!show && 'closed'}`}>
      <div className={`${styles.modalContent} ${styles.slideRight}`}>
        <div className={styles.container}>
          <Win />
        </div>
      </div>
    </div>
  ) : null
}
