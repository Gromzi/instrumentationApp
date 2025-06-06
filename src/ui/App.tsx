import { useState } from "react"
import guitarIcon from "./assets/guitar.png"
import "./App.css"
import InstrumentIcon from "./components/InstrumentIcon/InstrumentIcon"
import MusicSlider from "./components/MusicPlayer/MusicPlayer"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <img
        src={settingsIcon}
        className="icon settings-icon"
        alt="Settings icon"
      /> */}

      <h1>Instrumentation App</h1>

      <div className="instrument-icon-section">
        <InstrumentIcon icon={guitarIcon} active={false} />
      </div>

      <div className="music-slider-section">
        <MusicSlider />
      </div>
    </>
  )
}

export default App
