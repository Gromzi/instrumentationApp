import RateIcon from "../RateButton/RateButton"
import "./MusicPlayerStyles.css"
import playIcon from "../../assets/play.svg"
import { InstrumentIcons } from "../../constants/InstrumentIconsImports"
import {useMidiPlayer} from "../../hooks/useMidiPlayer.tsx";

const MusicPlayer = () => {
    const {handleStart, handlePause, handleNextInstrument,instrument,songTitle, isPlaying, duration, currentTime, formatTime} = useMidiPlayer()


    const handlePlayPause = () => {
        if(isPlaying){
            handlePause()
        }
        else {
            handleStart()
        }
    }


  return (
    <div className="music-player-container">
      <div className="instrument-info">
        <div className="current-instrument" id="currentInstrument">
            {instrument?.label}
        </div>
        <div className="song-title">{songTitle}</div>
      </div>

      <div className="progress-section">
        <div className="time-display">
          <span id="currentTime">{formatTime(currentTime)}</span>
          <span id="totalTime">{formatTime(duration)}</span>
        </div>

        <div className="progress-track">
          <div className="progress-fill" id="progressFill" style={{width: (currentTime/duration)*100+"%"}}></div>
        </div>
      </div>

      <div className="controls">
        <RateIcon type="like" />

        <button className="control-button play-pause-btn" id="playPauseBtn" onClick={handlePlayPause}>
          <img src={playIcon} alt="Play icon" />
        </button>

        <button
          className="control-button next-instrument-btn violin"
          id="nextInstrumentBtn"
          title="Next Instrument"
          onClick={()=> handleNextInstrument()}
        >
          <img src={InstrumentIcons.violin} alt="Next instrument icon" />
        </button>

        <RateIcon type="dislike" />
      </div>
    </div>
  )
}

export default MusicPlayer
