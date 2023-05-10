import React, { createContext, useState } from 'react'

type ModalProps = {
  show: boolean
  winner: string
  pointsEarned: Record<string, string>
  showModal: () => void
  hideModal: () => void
  setTheWinner: (winnerId: string, reset?: boolean) => void
  setPointsEarned: (points: Record<string, string>) => void
}

const ModalContext = createContext<ModalProps>({} as ModalProps)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false)
  const [winner, setWinner] = useState('')

  const [pointsEarned, setPointsEarned] = useState<Record<string, string>>({})

  const showModal = () => setShow(true)
  const hideModal = () => setShow(false)

  const setTheWinner = (winnerId: string, reset?: boolean) => {
    if (reset) {
      setWinner('')
      return
    }

    if (!winnerId) return

    console.log('%c WINNER ', 'color: #00e600', winnerId)
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
