import { CompleteGameDataProps, GameDataProps } from '@/types/game'
import { Socket } from 'socket.io-client'

export const gameHasStartedSocket = (
  socket: Socket,
  stateData: CompleteGameDataProps,
  gameStartedCallback: (roomId: string, intervals: number[]) => void
) => {
  const { setNewGameData } = stateData

  return socket.on(
    'game-started',
    (data: { gameData: GameDataProps; roomId: string }) => {
      setNewGameData(data.gameData)

      // Intervals are used to schedule the game start. The game start is scheduled to happen at the same time for both players.
      gameStartedCallback(data.roomId, [
        data.gameData.startIntervalFloor,
        data.gameData.startIntervalCeil,
      ])
    }
  )
}
