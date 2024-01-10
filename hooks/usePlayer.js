import { useSocket } from "@/pages/context/socket";
import { cloneDeep } from "lodash";
import { useState } from "react";

const usePlayer = (myId,roomId) => {
    const socket = useSocket()
    const [players,setPlayers] = useState({})
    const playersCopy = cloneDeep(players)

    const playerHighlighted = playersCopy[myId]
    delete playersCopy[myId]

    const nonHighlightedPlayers = playersCopy

    const toggleAudio = () => {
        console.log("I toggled my Audio");
        setPlayers((prev) => { 
            const copy = cloneDeep(prev)
            copy[myId].muted = !copy[myId].muted
            return {...copy}
        })
    
         socket.emit('user-toggle-audio', myId, roomId);
    }

    const toggleVideo = () => {
        console.log("I toggled my Video");
        setPlayers((prev) => { 
            const copy = cloneDeep(prev)
            copy[myId].playing = !copy[myId].playing
            return {...copy}
        })
    
         socket.emit('user-toggle-video',myId,roomId)
    }
    return{players,setPlayers,playerHighlighted,nonHighlightedPlayers,toggleAudio,toggleVideo}
}

export default usePlayer;