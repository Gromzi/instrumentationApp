import RateIcon from '../RateButton/RateButton'
import './MusicPlayerStyles.css'
import playIcon from '../../assets/play.svg'
import stopIcon from '../../assets/stop.svg'
import { IInstrumentIcons, InstrumentIcons } from '../../constants/InstrumentIconsImports'
import { useMidiPlayer } from '../../hooks/useMidiPlayer.tsx'
import React, { useState } from 'react'

const MusicPlayer = () => {
  const {
    handleStart,
    handlePause,
    handleStop,
    handleNextInstrument,
    instrument,
    songTitle,
    isPlaying,
    duration,
    currentTime,
    formatTime,
    INSTRUMENTS,
    selectedInstruments,
    setSelectedInstruments,
    fragmentLength,
    setFragmentLength,
    volume,
    setVolume,
    instrumentOrder,
    instrumentRatings,
    handleRateFragment,
      disableControls
  } = useMidiPlayer()

  const handleInstrumentCheckbox = (value: string) => {
    setSelectedInstruments((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const handleFragmentLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFragmentLength(Number(e.target.value))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause()
    } else {
      handleStart()
    }
  }

  return (
    <div>
      {/* Nowy UI do wyboru instrumentów i długości fragmentu */}
      <div
        className="music-player-container"
        style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: '24px' }}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
        >
          <strong>Wybierz instrumenty:</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {INSTRUMENTS.map((inst) => (
              <label key={inst.value} style={{ marginRight: 12 }}>
                <input
                  type="checkbox"
                  checked={selectedInstruments.includes(inst.value)}
                  onChange={() => handleInstrumentCheckbox(inst.value)}
                  disabled={disableControls}
                />
                {inst.label}
              </label>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <label>
            <strong>Długość fragmentu (sekundy): </strong>
            <input
              type="number"
              min={5}
              max={duration || 300}
              value={fragmentLength}
              onChange={handleFragmentLengthChange}
              style={{ width: 60, marginLeft: 8 }}
              disabled={disableControls}
            />
          </label>
        </div>
        <div style={{ marginTop: 12 }}>
          <label>
            <strong>Głośność: </strong>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={handleVolumeChange}
              style={{ width: 200, marginLeft: 8 }}
            />
            <span style={{ marginLeft: 8 }}>{volume}%</span>
          </label>
        </div>
      </div>

      <div className="music-player-container" style={{ borderRadius: '20px 20px 0 0' }}>
        <div className="instrument-info">
          <div
            className="current-instrument"
            id="currentInstrument"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            {`${instrument?.label}: `}

            <img
              src={InstrumentIcons[instrument?.value as keyof IInstrumentIcons]}
              alt={`${instrument?.label}`}
              width={64}
              height={64}
            />
          </div>
          <div className="song-title">{songTitle}</div>
        </div>
      </div>
      <div className="music-player-container" style={{ width: 1200 }}>
        <div className="progress-section">
          <div className="time-display">
            <span id="currentTime">{formatTime(currentTime)}</span>
            <span id="totalTime">{formatTime(duration)}</span>
          </div>

          <div className="progress-track" style={{ position: 'relative' }}>
            {/* Podział na fragmenty */}
            {duration > 0 &&
              fragmentLength > 0 &&
              Array.from({ length: Math.ceil(duration / fragmentLength) }).map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    left: `calc(${((idx * fragmentLength) / duration) * 100}% - 4px)`,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    background: '#fff',
                    zIndex: 2
                  }}
                />
              ))}
            {/* Pasek postępu */}
            <div
              className="progress-fill"
              id="progressFill"
              style={{
                width: (currentTime / duration) * 100 + '%',
                height: 8,
                zIndex: 1
              }}
            ></div>
          </div>

          {/* Nazwy instrumentów pod paskiem */}
          <div
            style={{
              position: 'relative',
              height: '70px',
              marginTop: '8px',
              fontSize: '12px',
              color: '#fff'
            }}
          >
            {duration > 0 &&
              fragmentLength > 0 &&
              instrumentOrder.map((instrumentName, idx) => {
                const instrument = INSTRUMENTS.find((i) => i.value === instrumentName)
                const rating = instrumentRatings[idx] || 0

                // Obliczanie szerokości fragmentu w procentach
                let width = 0
                if (duration - idx * fragmentLength > fragmentLength) {
                  width = (fragmentLength / duration) * 100
                } else {
                  width = ((duration - idx * fragmentLength) / duration) * 100
                }

                return (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      left: `${((idx * fragmentLength) / duration) * 100}%`,
                      whiteSpace: 'nowrap',
                      width: `${width}%`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1px',
                      flexDirection: 'column'
                    }}
                  >
                    <div>
                      {/*Do zamiany na ikonę instrumentu*/}
                      {instrument?.label || instrumentName}
                    </div>
                    <div>
                      {rating !== 0 && (
                        <div style={{ transform: 'scale(0.9)' }}>
                          <RateIcon type={rating === 1 ? 'like' : 'dislike'} />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        <div className="controls">
          <div
            onClick={() => {
              const currentFragment = Math.floor(currentTime / fragmentLength)
              handleRateFragment(currentFragment, instrumentRatings[currentFragment] === 1 ? 0 : 1)
            }}
          >
            <RateIcon type="like" />
          </div>

          <button
            className="control-button play-pause-btn"
            id="playPauseBtn"
            onClick={handlePlayPause}
            disabled={disableControls}
          >
            <img src={playIcon} alt="Play icon" />
          </button>

          <button className="control-button play-pause-btn" id="stopBtn" onClick={handleStop}>
            <img src={stopIcon} alt="Stop icon" />
          </button>

          <div
            onClick={() => {
              const currentFragment = Math.floor(currentTime / fragmentLength)
              handleRateFragment(
                currentFragment,
                instrumentRatings[currentFragment] === -1 ? 0 : -1
              )
            }}
          >
            <RateIcon type="dislike" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
