import React, { useEffect, useRef, useState } from 'react'
import './SelectSongSectionStyles.css'

interface ISong {
  value: string
  label: string
}

const songs: ISong[] = [
  { value: 'pirates', label: "Pirates of the Caribbean - He's a Pirate" },
  { value: 'tetris', label: 'Tetris Theme' },
  { value: 'mario', label: 'Super Mario Bros Theme' },
  { value: 'zelda', label: 'The Legend of Zelda - Main Theme' },
  { value: 'pokemon', label: 'Pokemon Theme Song' },
  { value: 'starwars', label: 'Star Wars - Imperial March' },
  { value: 'harry', label: "Harry Potter - Hedwig's Theme" },
  { value: 'mission', label: 'Mission Impossible Theme' },
  { value: 'pink', label: 'Pink Panther Theme' },
  { value: 'james', label: 'James Bond Theme' }
]

interface SelectSongSectionProps {
  onSongSelect?: (song: ISong) => void
  defaultSong?: string
}

const SelectSongSection: React.FC<SelectSongSectionProps> = ({
  onSongSelect,
  defaultSong = 'pirates'
}) => {
  const [selectedSong, setSelectedSong] = useState<ISong>(
    songs.find((song) => song.value === defaultSong) || songs[0]
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'Escape':
          setIsOpen(false)
          setFocusedIndex(-1)
          break
        case 'ArrowDown':
          event.preventDefault()
          setFocusedIndex((prev) => (prev < songs.length - 1 ? prev + 1 : 0))
          break
        case 'ArrowUp':
          event.preventDefault()
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : songs.length - 1))
          break
        case 'Enter':
          event.preventDefault()
          if (focusedIndex >= 0) {
            handleSongSelect(songs[focusedIndex])
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, focusedIndex])

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen)
    setFocusedIndex(-1)
  }

  const handleSongSelect = (song: ISong) => {
    setSelectedSong(song)
    setIsOpen(false)
    setFocusedIndex(-1)
    onSongSelect?.(song)
  }

  return (
    <div className="select-song-section-container">
      <strong>Wybierz utwór:</strong>

      <div className="dropdown-container" ref={dropdownRef}>
        <div className="dropdown">
          <div
            className={`dropdown-toggle ${isOpen ? 'active' : ''}`}
            onClick={handleToggleDropdown}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            tabIndex={0}
          >
            <span className="selected-value">{selectedSong.label}</span>
            <span className="dropdown-arrow">▼</span>
          </div>

          <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} ref={menuRef} role="listbox">
            {songs.map((song, index) => (
              <div
                key={song.value}
                className={`dropdown-item ${
                  selectedSong.value === song.value ? 'selected' : ''
                } ${focusedIndex === index ? 'focused' : ''}`}
                onClick={() => handleSongSelect(song)}
                role="option"
                aria-selected={selectedSong.value === song.value}
                tabIndex={-1}
              >
                {song.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectSongSection
