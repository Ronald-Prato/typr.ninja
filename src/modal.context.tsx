import React, { createContext, useState } from 'react'

type ModalProps = {
  show: boolean
  winner: string
  pointsEarned: Record<string, string>
  showModal: () => void
  hideModal: () => void
  setTheWinner: (winnerId: string) => void
  setPointsEarned: (points: Record<string, string>) => void
}

const ModalContext = createContext<ModalProps>({} as ModalProps)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false)
  const [winner, setWinner] = useState('')
  const [pointsEarned, setPointsEarned] = useState<Record<string, string>>({})

  const showModal = () => setShow(true)
  const hideModal = () => setShow(false)

  const setTheWinner = (winnerId: string) => {
    console.log('Setting winner', winnerId)
    if (!winnerId) return

    setWinner(winnerId)
    setShow(true)
  }

  const completeModalData: ModalProps = {
    show,
    winner,
    pointsEarned,
    showModal,
    hideModal,
    setTheWinner,
    setPointsEarned,
  }

  return (
    <ModalContext.Provider value={completeModalData}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext
