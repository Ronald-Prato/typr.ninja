import { Socket } from 'socket.io-client'

export const gameOverSocket = (
  socket: Socket,
  gameOverCallback: (
    winnerUid: string,
    pointsEarned: Record<string, string>
  ) => void
) => {
  return socket.on(
    'game-over',
    (data: { winner: string; pointsEarned: Record<string, string> }) => {
      gameOverCallback(data.winner, data.pointsEarned)
    }
  )
}
