import { useEffect } from "react";

import { useSocket } from "./context/socket";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";

import Player from "@/componenet/Player";
import Bottom from "@/componenet/Bottom";

import { LogLevel } from "peerjs";
import usePlayer from "@/hooks/usePlayer";

import styles from "@/styles/room.module.css";
import { useRouter } from "next/router";

const Room = () => {
  const socket = useSocket();
  const { roomId } = useRouter().query;
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo
  } = usePlayer(myId, roomId);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser) => {
      console.log(`user-Connented in Room with UserId ${newUser}`);

      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream) => {
        console.log(`incomming stream from ${newUser} `);

        setPlayers((perv) => ({
          ...perv,
          [newUser]: {
            url: incomingStream,
            muted: false,
            playing: true,
          },
        }));
      });
    };
    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, socket, setPlayers, stream]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on("call", (call) => {
      const { peer: callerId } = call;

      call.answer(stream);

      call.on("stream", (incomingStream) => {
        console.log(`incomming stream from ${callerId} `);
        setPlayers((perv) => ({
          ...perv,
          [callerId]: {
            url: incomingStream,
            muted: false,
            playing: true,
          },
        }));
      });
    });
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!stream || !myId || !setPlayers) return;
    console.log(`setting my stream ${myId}`);
    setPlayers((perv) => ({
      ...perv,
      [myId]: {
        url: stream,
        muted: false,
        playing: true,
      },
    }));
  }, [myId, setPlayers, stream]);

  return (
    <>
      <div className={styles.activePlayerContainer}>
        {playerHighlighted && (
          <Player
            url={playerHighlighted.url}
            muted={playerHighlighted.muted}
            playing={playerHighlighted.playing}
            isActive
          ></Player>
        )}
      </div>
      <div className={styles.inActivePlayerContainer}>
        {Object.keys(nonHighlightedPlayers).map((PlayerId) => {
          const { url, muted, playing } = nonHighlightedPlayers[PlayerId];
          return (
            <Player
              key={PlayerId}
              url={url}
              muted={muted}
              playing={playing}
              inActive={false}
            />
          );
        })}
      </div>
      <Bottom
        muted={playerHighlighted?.muted}
        playing={playerHighlighted?.playing}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
      />
    </>
  );
};

export default Room;
