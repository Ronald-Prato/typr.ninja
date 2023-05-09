import { Socket } from "socket.io-client"

export const countPlayersSocket = (
  socket: Socket,
  countPlayersCallback: (
    count: number
  ) => void
)=> {
  return socket.on('users-count', (count: number) => {
    countPlayersCallback(count)
  })
}
