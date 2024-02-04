import ReactPlayer from "react-player";
import cx from "classnames";
import styles from "@/componenet/Player/index.module.css";
import { Mic, MicOff, CameraOff } from "lucide-react";

const Player = (props) => {
  const { url, muted, playing, isActive } = props;
  return (
    <div
      className={cx(styles.playerContainer, {
        [styles.notActive]: !isActive,
        [styles.active]: !isActive,
        [styles.notPlaying]: !playing,
      })}
    >
      {playing ? (
        <ReactPlayer
          url={url}
          muted={muted}
          playing={playing}
          width="100%"
          height="100%"
        />
      ) : (
        <CameraOff className={styles.user} size={isActive ? 300 : 150} />
      )}

      {!isActive ? (
        muted ? (
          <MicOff className={styles.icon} size={20} />
        ) : (
          <Mic size={20} className={styles.icon} />
        )
      ) : undefined}
    </div>
  );
};

export default Player;
