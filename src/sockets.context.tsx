import React, { createContext, useEffect, useState } from 'react'
import { useSockets } from './hooks/useSockets'
import { useSocketIO } from './hooks/useSocketIO'
import {
  CompleteGameDataProps,
  GameDataProps,
  SocketStateProps,
} from './types/game'
import { UserData } from './types/user'

type QueueProps = {
  
  putPlayerInQueue: () => void
  removePlayerFromQueue: () => void
  gameOver: (uid: string, roomId: string) => void
}

type ComposedSocketContextProps = CompleteGameDataProps & QueueProps

const SocketContext = createContext<ComposedSocketContextProps>(
  {} as ComposedSocketContextProps
)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { socket } = useSocketIO()
  const [state, setState] = useState<SocketStateProps>({
    socketId: '',
    roomId: '',
  })

  const [gameData, setGameData] = useState<GameDataProps>({
    chars: [],
    sentence: '',
    singleWords: [],
    startIntervalCeil: -1,
    startIntervalFloor: -1,
  })

  const [playersAmount, setPlayersAmount] = useState(0)
  const [playersInfo, setPlayersInfo] = useState<UserData[]>([])
  
  const setThePlayersAmount = (amount: number) => setPlayersAmount(amount)


  const setSocketId = (socketId: string) => {
    setState((prev) => ({ ...prev, socketId }))
  }

  const setNewGameData = (newGameData: GameDataProps) => {
    setGameData(newGameData)
  }

  const setRoomId = (newRoomId: string) => {
    setState((prev) => ({ ...prev, roomId: newRoomId }))
  }

  const setThePlayersInfo = (newPlayersInfo: UserData[]) => setPlayersInfo(newPlayersInfo)

  const completeGameData: CompleteGameDataProps = {
    gameState: state,
    gameData,
    playersInfo,
    playersAmount,
    setRoomId,
    setSocketId,
    setNewGameData,
    setThePlayersInfo,
    setThePlayersAmount,
  }

  const { emitters } = useSockets({ socket, stateData: completeGameData })
  const { putPlayerInQueue, removePlayerFromQueue, gameOver } = emitters
  

  return (
    <SocketContext.Provider
      value={{
        ...completeGameData,
        gameOver,
        putPlayerInQueue,
        removePlayerFromQueue,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContext
