import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import videocall from '/pages/videocall.png'
import styles from '@/styles/home.module.css'
import { useState } from 'react';

export default function Home() {
  const router = useRouter()
  const [roomId,setRoom] = useState('')

  const createAndJoin = () => {
    const roomId = uuidv4()
    router.push(`/${roomId}`)
  }

  const joinRoom = () => {
    if(roomId) router.push(`/${roomId}`)
    else{
     alert('Please provide a valid room id')
     }
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
        <input  value={roomId} onChange={(e) => setRoom(e?.target?.value)}/> 
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <span className={styles.separatorText}>------------ OR ------------</span>
      <button onClick={createAndJoin}>Create New Room </button>
    </div>

  )
}


