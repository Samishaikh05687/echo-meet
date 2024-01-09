import ReactPlayer from 'react-player'

const Player = (props) => {
    const {PlayerId,url,muted,playing} = props
    return(
        <div>
            <ReactPlayer key={PlayerId} url={url} muted={muted} playing={playing}/>
        </div>
    )
}

export default Player;