import './App.css'
import SelectSongSection from './components/SelectSongSection/SelectSongSection.tsx'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import { InstrumentIcons } from './constants/InstrumentIconsImports'
import { MidiPlayerProvider } from './hooks/useMidiPlayer.tsx'
import Statistics from './components/Statistics/Statistics.tsx'

function App() {
  return (
    <MidiPlayerProvider>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
        <div>
          <div className="instrument-icon-section">
            <SelectSongSection />
          </div>

          <div className="music-slider-section">
            <MusicPlayer />
          </div>
        </div>
        <div
          className="statistics-container"
          style={{ width: 400, height: 840, overflowY: 'auto' }}
        >
          <Statistics />
        </div>
      </div>
    </MidiPlayerProvider>
  )
}

export default App
