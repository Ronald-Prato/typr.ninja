export type GameDataProps = {
  chars: string[]
  sentence: string
  singleWords: string[]
  startIntervalCeil: number
  startIntervalFloor: number
}

export type SocketStateProps = {
  socketId: string
  roomId: string
}

export interface CompleteGameDataProps {
  gameData: GameDataProps
  gameState: SocketStateProps
  setRoomId: (socketId: string) => void
  setSocketId: (roomId: string) => void
  setNewGameData: (newGameData: GameDataProps) => void
}
