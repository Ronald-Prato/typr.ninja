import io, { Socket } from 'socket.io-client'
import { useState, useEffect } from 'react'
import { SERVER_API_URL } from '../constants'

export const useSocketIO = () => {
  const [socket, setSocket] = useState<Socket>()

  useEffect((): any => {
    const newSocket = io(SERVER_API_URL)
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  return { socket }
}
