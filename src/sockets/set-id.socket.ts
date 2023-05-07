import { CompleteGameDataProps } from '@/types/game'
import { Socket } from 'socket.io-client'

export const setIdSocket = (
  socket: Socket,
  stateData: CompleteGameDataProps
) => {
  const { setSocketId } = stateData

  return socket.on('your-id', (socketId) => {
    console.log('Your socket id is ', socketId)
    setSocketId(socketId)
  })
}
