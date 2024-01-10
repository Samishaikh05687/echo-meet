import cx from "classnames";

import {
    Mic,
    Video, 
    PhoneOff,
    MicOff,
    VideoOff
} from "lucide-react";  // lucide-react library is used in app to provide better icon experince

import styles from "@/componenet/Bottom/index.module.css"

const Bottom = (props) => {
  const {muted, playing, toggleAudio, toggleVideo} = props ;

  return (<div className={styles.bottomMenu}>
  {muted ? <MicOff className={cx(styles.icon, styles.active)} size={55} onClick={toggleAudio}/> : <Mic className={styles.icon} size={55} onClick={toggleAudio}/>}
  {playing ? <Video className={styles.icon} size={55} onClick={toggleVideo}/> : <VideoOff size={55} className={cx(styles.icon, styles.active)} onClick={toggleVideo}/>}
  <PhoneOff size={55} className={styles.icon}/>
  </div>)
}

export default Bottom;