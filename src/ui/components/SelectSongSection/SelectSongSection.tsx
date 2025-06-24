import React, { useEffect, useRef, useState } from 'react'
import './SelectSongSectionStyles.css'
import { useMidiPlayer } from '../../hooks/useMidiPlayer'

interface ISong {
  value: string
  label: string
}

const songs: ISong[] = [
  { value: 'pirates_of_the_caribbean.mid', label: "Pirates of the Caribbean - He's a Pirate" },
  { value: 'super_mario_64.mid', label: 'Super Mario Bros Theme' },
  { value: 'toto_africa.mid', label: 'Toto - Africa' }
]

const SelectSongSection: React.FC = () => {
  const { currentSong, handleSongChange } = useMidiPlayer()
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
    handleSongChange(song)
    setIsOpen(false)
    setFocusedIndex(-1)
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
            <span className="selected-value">{currentSong.label}</span>
            <span className="dropdown-arrow">▼</span>
          </div>

          <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} ref={menuRef} role="listbox">
            {songs.map((song, index) => (
              <div
                key={song.value}
                className={`dropdown-item ${
                  currentSong.value === song.value ? 'selected' : ''
                } ${focusedIndex === index ? 'focused' : ''}`}
                onClick={() => handleSongSelect(song)}
                role="option"
                aria-selected={currentSong.value === song.value}
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
