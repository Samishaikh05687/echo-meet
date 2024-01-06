import { useEffect } from "react"
import { useSocket } from "./context/socket"

export default function Home() {
  const socket = useSocket()

  useEffect(() => {
    socket?.on("connect", () => {
      console.log(socket.id);
    });

  },[socket])
  return (
    <h1>welcome</h1>

  )
}


