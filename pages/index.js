import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import videocall from '/pages/videocall.png'
import styles from '@/styles/home.module.css'

export default function Home() {
  const router = useRouter()

  const createAndJoin = () => {
    const roomId = uuidv4()
    router.push(`/${roomId}`)
  }
  return (
    <div className={styles.homeContainer}>
      <Image src={videocall}  
                    alt="Call-icon"
                    width={70}
                    height={70}/>
      <h1>EchoMeet</h1>
      <span className={styles.separatorText}>Enter Your Code To Join The Conservation</span>
      <div className={styles.enterRoom}>
        <input /> 
        <button>Join Room</button>
      </div>
      <span className={styles.separatorText}>------------ OR ------------</span>
      <button>Create New Room </button>
    </div>

  )
}


