import { CompleteGameDataProps, GameDataProps } from '@/types/game'
import { UserData } from '@/types/user'
import { Socket } from 'socket.io-client'

export const gameHasStartedSocket = (
  socket: Socket,
  stateData: CompleteGameDataProps,
  gameStartedCallback: (roomId: string, intervals: number[]) => void
) => {
  const { setNewGameData, setThePlayersInfo } = stateData

  return socket.on(
    'game-started',
    (data: { gameData: GameDataProps; roomId: string, players: UserData[] }) => {
      setNewGameData(data.gameData)
      setThePlayersInfo(data.players)

      // Intervals are used to schedule the game start. The game start is scheduled to happen at the same time for both players.
      gameStartedCallback(data.roomId, [
        data.gameData.startIntervalFloor,
        data.gameData.startIntervalCeil,
      ])


    }
  )
}
