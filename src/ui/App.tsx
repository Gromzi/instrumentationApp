import './App.css'
import InstrumentIcon from './components/InstrumentIcon/InstrumentIcon'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import { InstrumentIcons } from './constants/InstrumentIconsImports'
import { MidiPlayerProvider } from './hooks/useMidiPlayer.tsx'

function App() {
  return (
    <MidiPlayerProvider>
      <div className="instrument-icon-section">
        <InstrumentIcon icon={InstrumentIcons.guitar} active={true} />
      </div>

      <div className="music-slider-section">
        <MusicPlayer />
      </div>
    </MidiPlayerProvider>
  )
}

export default App
