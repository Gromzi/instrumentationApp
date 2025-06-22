import './App.css'
import SelectSongSection from './components/SelectSongSection/SelectSongSection.tsx'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import { InstrumentIcons } from './constants/InstrumentIconsImports'
import { MidiPlayerProvider } from './hooks/useMidiPlayer.tsx'

function App() {
  return (
    <MidiPlayerProvider>
      <div className="instrument-icon-section">
        <SelectSongSection onSongSelect={() => console.log('Konrados')} />
      </div>

      <div className="music-slider-section">
        <MusicPlayer />
      </div>
    </MidiPlayerProvider>
  )
}

export default App
