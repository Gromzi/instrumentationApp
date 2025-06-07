import RateIcon from "../RateButton/RateButton"
import "./MusicPlayerStyles.css"
import playIcon from "../../assets/play.svg"
import { InstrumentIcons } from "../../constants/InstrumentIconsImports"

const MusicPlayer = () => {
  return (
    <div className="music-player-container">
      <div className="instrument-info">
        <div className="current-instrument" id="currentInstrument">
          Guitar
        </div>
        <div className="song-title">Song Title</div>
      </div>

      <div className="progress-section">
        <div className="time-display">
          <span id="currentTime">00:15</span>
          <span id="totalTime">03:00</span>
        </div>

        <div className="progress-track">
          <div className="progress-fill" id="progressFill"></div>
        </div>
      </div>

      <div className="controls">
        <RateIcon type="like" />

        <button className="control-button play-pause-btn" id="playPauseBtn">
          <img src={playIcon} alt="Play icon" />
        </button>

        <button
          className="control-button next-instrument-btn violin"
          id="nextInstrumentBtn"
          title="Next Instrument"
        >
          <img src={InstrumentIcons.violin} alt="Next instrument icon" />
        </button>

        <RateIcon type="dislike" />
      </div>
    </div>
  )
}

export default MusicPlayer
