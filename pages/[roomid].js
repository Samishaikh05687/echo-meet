import { useEffect } from "react"

import { useSocket } from "./context/socket"
import usePeer from "@/hooks/usePeer"
import useMediaStream from "@/hooks/useMediaStream"; 
import Player from "@/componenet/Player";

const Room = () => {
    const socket = useSocket();
    const { peer,myId} = usePeer();
    const {stream} = useMediaStream();

    return ( <div>
        <Player url={stream} muted playing PlayerId={myId}></Player>
    </div>)
};

export default Room;