import { useState } from "react"
import "./App.css"
import InstrumentIcon from "./components/InstrumentIcon/InstrumentIcon"
import MusicSlider from "./components/MusicPlayer/MusicPlayer"
import { InstrumentIcons } from "./constants/InstrumentIconsImports"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="instrument-icon-section">
        <InstrumentIcon icon={InstrumentIcons.guitar} active={true} />
      </div>

      <div className="music-slider-section">
        <MusicSlider />
      </div>
    </>
  )
}

export default App
