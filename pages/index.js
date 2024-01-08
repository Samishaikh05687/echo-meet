import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()

  const createAndJoin = () => {
    const roomId = uuidv4()
    router.push(`/${roomId}`)
  }
  return (
    <div>
      <h1>Echo Meet</h1>
      <div>
        <input /> 
        <button>Join Room</button>
      </div>
      <span>-----------OR-------------</span>
      <button>Create New Room </button>
    </div>

  )
}


