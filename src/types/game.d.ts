import { UserData } from './user'

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
  ping: number
  playersAmount: number
  gameData: GameDataProps
  playersInfo: UserDatap[]
  gameState: SocketStateProps
  setPingTime: (ping: number) => void
  setRoomId: (socketId: string) => void
  setSocketId: (roomId: string) => void
  setNewGameData: (newGameData: GameDataProps) => void
  setThePlayersAmount: (playersAmount: number) => void
  setThePlayersInfo: (playersInfo: UserData[]) => void
}
