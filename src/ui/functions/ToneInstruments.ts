import * as Tone from 'tone'

interface SampleMap {
  [key: string]: string
}

interface InstrumentSamples {
  [key: string]: SampleMap
}

interface LoadOptions {
  instruments: string[]
  baseUrl?: string
  minify?: boolean
  ext?: string
  onload?: () => void
}

class SampleLibraryClass {
  private minify: boolean = false
  private ext: string = '.[mp3|ogg]'
  private baseUrl: string = '/src/samples/'
  private list: string[] = [
    'bass-electric',
    'bassoon',
    'cello',
    'clarinet',
    'contrabass',
    'flute',
    'french-horn',
    'guitar-acoustic',
    'guitar-electric',
    'guitar-nylon',
    'harmonium',
    'harp',
    'organ',
    'piano',
    'saxophone',
    'trombone',
    'trumpet',
    'tuba',
    'violin',
    'xylophone'
  ]
  private onload: (() => void) | null = null

  private samples: InstrumentSamples = {
    'bass-electric': {
      'A#1': 'As1.[mp3|ogg]',
      'A#2': 'As2.[mp3|ogg]',
      'A#3': 'As3.[mp3|ogg]',
      'A#4': 'As4.[mp3|ogg]',
      'C#1': 'Cs1.[mp3|ogg]',
      'C#2': 'Cs2.[mp3|ogg]',
      'C#3': 'Cs3.[mp3|ogg]',
      'C#4': 'Cs4.[mp3|ogg]',
      E1: 'E1.[mp3|ogg]',
      E2: 'E2.[mp3|ogg]',
      E3: 'E3.[mp3|ogg]',
      E4: 'E4.[mp3|ogg]',
      G1: 'G1.[mp3|ogg]',
      G2: 'G2.[mp3|ogg]',
      G3: 'G3.[mp3|ogg]',
      G4: 'G4.[mp3|ogg]'
    },

    bassoon: {
      A4: 'A4.[mp3|ogg]',
      C3: 'C3.[mp3|ogg]',
      C4: 'C4.[mp3|ogg]',
      C5: 'C5.[mp3|ogg]',
      E4: 'E4.[mp3|ogg]',
      G2: 'G2.[mp3|ogg]',
      G3: 'G3.[mp3|ogg]',
      G4: 'G4.[mp3|ogg]',
      A2: 'A2.[mp3|ogg]',
      A3: 'A3.[mp3|ogg]'
    },

    cello: {
      E3: 'E3.[mp3|ogg]',
      E4: 'E4.[mp3|ogg]',
      F2: 'F2.[mp3|ogg]',
      F3: 'F3.[mp3|ogg]',
      F4: 'F4.[mp3|ogg]',
      'F#3': 'Fs3.[mp3|ogg]',
      'F#4': 'Fs4.[mp3|ogg]',
      G2: 'G2.[mp3|ogg]',
      G3: 'G3.[mp3|ogg]',
      G4: 'G4.[mp3|ogg]',
      'G#2': 'Gs2.[mp3|ogg]',
      'G#3': 'Gs3.[mp3|ogg]',
      'G#4': 'Gs4.[mp3|ogg]',
      A2: 'A2.[mp3|ogg]',
      A3: 'A3.[mp3|ogg]',
      A4: 'A4.[mp3|ogg]',
      'A#2': 'As2.[mp3|ogg]',
      'A#3': 'As3.[mp3|ogg]',
      B2: 'B2.[mp3|ogg]',
      B3: 'B3.[mp3|ogg]',
      B4: 'B4.[mp3|ogg]',
      C2: 'C2.[mp3|ogg]',
      C3: 'C3.[mp3|ogg]',
      C4: 'C4.[mp3|ogg]',
      C5: 'C5.[mp3|ogg]',
      'C#3': 'Cs3.[mp3|ogg]',
      'C#4': 'Cs4.[mp3|ogg]',
      D2: 'D2.[mp3|ogg]',
      D3: 'D3.[mp3|ogg]',
      D4: 'D4.[mp3|ogg]',
      'D#2': 'Ds2.[mp3|ogg]',
      'D#3': 'Ds3.[mp3|ogg]',
      'D#4': 'Ds4.[mp3|ogg]',
      E2: 'E2.[mp3|ogg]'
    },

    clarinet: {
      D4: 'D4.[mp3|ogg]',
      D5: 'D5.[mp3|ogg]',
      D6: 'D6.[mp3|ogg]',
      F3: 'F3.[mp3|ogg]',
      F4: 'F4.[mp3|ogg]',
      F5: 'F5.[mp3|ogg]',
      'F#6': 'Fs6.[mp3|ogg]',
      'A#3': 'As3.[mp3|ogg]',
      'A#4': 'As4.[mp3|ogg]',
      'A#5': 'As5.[mp3|ogg]',
      D3: 'D3.[mp3|ogg]'
    },

    contrabass: {
      C2: 'C2.[mp3|ogg]',
      'C#3': 'Cs3.[mp3|ogg]',
      D2: 'D2.[mp3|ogg]',
      E2: 'E2.[mp3|ogg]',
      E3: 'E3.[mp3|ogg]',
      'F#1': 'Fs1.[mp3|ogg]',
      'F#2': 'Fs2.[mp3|ogg]',
      G1: 'G1.[mp3|ogg]',
      'G#2': 'Gs2.[mp3|ogg]',
      'G#3': 'Gs3.[mp3|ogg]',
      A2: 'A2.[mp3|ogg]',
      'A#1': 'As1.[mp3|ogg]',
      B3: 'B3.[mp3|ogg]'
    },

    flute: {
      A6: 'A6.[mp3|ogg]',
      C4: 'C4.[mp3|ogg]',
      C5: 'C5.[mp3|ogg]',
      C6: 'C6.[mp3|ogg]',
      C7: 'C7.[mp3|ogg]',
      E4: 'E4.[mp3|ogg]',
      E5: 'E5.[mp3|ogg]',
      E6: 'E6.[mp3|ogg]',
      A4: 'A4.[mp3|ogg]',
      A5: 'A5.[mp3|ogg]'
    },

    'french-horn': {
      D3: 'D3.[mp3|ogg]',
      D5: 'D5.[mp3|ogg]',
      'D#2': 'Ds2.[mp3|ogg]',
      F3: 'F3.[mp3|ogg]',
      F5: 'F5.[mp3|ogg]',
      G2: 'G2.[mp3|ogg]',
      A1: 'A1.[mp3|ogg]',
      A3: 'A3.[mp3|ogg]',
      C2: 'C2.[mp3|ogg]',
      C4: 'C4.[mp3|ogg]'
    },

    'guitar-acoustic': {
      F4: 'F4.[mp3|ogg]',
      'F#2': 'Fs2.[mp3|ogg]',
      'F#3': 'Fs3.[mp3|ogg]',
      'F#4': 'Fs4.[mp3|ogg]',
      G2: 'G2.[mp3|ogg]',
      G3: 'G3.[mp3|ogg]',
      G4: 'G4.[mp3|ogg]',
      'G#2': 'Gs2.[mp3|ogg]',
      'G#3': 'Gs3.[mp3|ogg]',
      'G#4': 'Gs4.[mp3|ogg]',
      A2: 'A2.[mp3|ogg]',
      A3: 'A3.[mp3|ogg]',
      A4: 'A4.[mp3|ogg]',
      'A#2': 'As2.[mp3|ogg]',
      'A#3': 'As3.[mp3|ogg]',
      'A#4': 'As4.[mp3|ogg]',
      B2: 'B2.[mp3|ogg]',
      B3: 'B3.[mp3|ogg]',
      B4: 'B4.[mp3|ogg]',
      C3: 'C3.[mp3|ogg]',
      C4: 'C4.[mp3|ogg]',
      C5: 'C5.[mp3|ogg]',
      'C#3': 'Cs3.[mp3|ogg]',
      'C#4': 'Cs4.[mp3|ogg]',
      'C#5': 'Cs5.[mp3|ogg]',
      D2: 'D2.[mp3|ogg]',
      D3: 'D3.[mp3|ogg]',
      D4: 'D4.[mp3|ogg]',
      D5: 'D5.[mp3|ogg]',
      'D#2': 'Ds2.[mp3|ogg]',
      'D#3': 'Ds3.[mp3|ogg]',
      'D#4': 'Ds3.[mp3|ogg]',
      E2: 'E2.[mp3|ogg]',
      E3: 'E3.[mp3|ogg]',
      E4: 'E4.[mp3|ogg]',
      F2: 'F2.[mp3|ogg]',
      F3: 'F3.[mp3|ogg]'
    },

    'guitar-electric': {
      'D#3': 'Ds3.[mp3|ogg]',
      'D#4': 'Ds4.[mp3|ogg]',
      'D#5': 'Ds5.[mp3|ogg]',
      E2: 'E2.[mp3|ogg]',
      'F#2': 'Fs2.[mp3|ogg]',
      'F#3': 'Fs3.[mp3|ogg]',
      'F#4': 'Fs4.[mp3|ogg]',
      'F#5': 'Fs5.[mp3|ogg]',
      A2: 'A2.[mp3|ogg]',
      A3: 'A3.[mp3|ogg]',
      A4: 'A4.[mp3|ogg]',
      A5: 'A5.[mp3|ogg]',
      C3: 'C3.[mp3|ogg]',
      C4: 'C4.[mp3|ogg]',
      C5: 'C5.[mp3|ogg]',
      C6: 'C6.[mp3|ogg]',
      'C#2': 'Cs2.[mp3|ogg]'
    },

    'guitar-nylon': {
      'F#2': 'Fs2.[mp3|ogg]',
      'F#3': 'Fs3.[mp3|ogg]',
      'F#4': 'Fs4.[mp3|ogg]',
      'F#5': 'Fs5.[mp3|ogg]',
      G3: 'G3.[mp3|ogg]',
      G5: 'G3.[mp3|ogg]',
      'G#2': 'Gs2.[mp3|ogg]',
      'G#4': 'Gs4.[mp3|ogg]',
      'G#5': 'Gs5.[mp3|ogg]',
      A2: 'A2.[mp3|ogg]',
      A3: 'A3.[mp3|ogg]',
      A4: 'A4.[mp3|ogg]',
      A5: 'A5.[mp3|ogg]',
      'A#5': 'As5.[mp3|ogg]',
      B1: 'B1.[mp3|ogg]',
      B2: 'B2.[mp3|ogg]',
      B3: 'B3.[mp3|ogg]',
      B4: 'B4.[mp3|ogg]',
      'C#3': 'Cs3.[mp3|ogg]',
      'C#4': 'Cs4.[mp3|ogg]',
      'C#5': 'Cs5.[mp3|ogg]',
      D2: 'D2.[mp3|ogg]',
      D3: 'D3.[mp3|ogg]',
      D5: 'D5.[mp3|ogg]',
      'D#4': 'Ds4.[mp3|ogg]',
      E2: 'E2.[mp3|ogg]',
      E3: 'E3.[mp3|ogg]',
      E4: 'E4.[mp3|ogg]',
      E5: 'E5.[mp3|ogg]'
    },

    harmonium: {
      C2: 'C2.[mp3|ogg]',
      C3: 'C3.[mp3|ogg]',
      C4: 'C4.[mp3|ogg]',
      C5: 'C5.[mp3|ogg]',
      'C#2': 'Cs2.[mp3|ogg]',
      'C#3': 'Cs3.[mp3|ogg]',
      'C#4': 'Cs4.[mp3|ogg]',
      'C#5': 'Cs5.[mp3|ogg]',
      D2: 'D2.[mp3|ogg]',
      D3: 'D3.[mp3|ogg]',
      D4: 'D4.[mp3|ogg]',
      D5: 'D5.[mp3|ogg]',
      'D#2': 'Ds2.[mp3|ogg]',
      'D#3': 'Ds3.[mp3|ogg]',
      'D#4': 'Ds4.[mp3|ogg]',
      E2: 'E2.[mp3|ogg]',
      E3: 'E3.[mp3|ogg]',
      E4: 'E4.[mp3|ogg]',
      F2: 'F2.[mp3|ogg]',
      F3: 'F3.[mp3|ogg]',
      F4: 'F4.[mp3|ogg]',
      'F#2': 'Fs2.[mp3|ogg]',
      'F#3': 'Fs3.[mp3|ogg]',
      G2: 'G2.[mp3|ogg]',
      G3: 'G3.[mp3|ogg]',
      G4: 'G4.[mp3|ogg]',
      'G#2': 'Gs2.[mp3|ogg]',
      'G#3': 'Gs3.[mp3|ogg]',
      'G#4': 'Gs4.[mp3|ogg]',
      A2: 'A2.[mp3|ogg]',
      A3: 'A3.[mp3|ogg]',
      A4: 'A4.[mp3|ogg]',
      'A#2': 'As2.[mp3|ogg]',
      'A#3': 'As3.[mp3|ogg]',
      'A#4': 'As4.[mp3|ogg]'
    },

    harp: {
      C5: 'C5.[mp3|ogg]',
      D2: 'D2.[mp3|ogg]',
      D4: 'D4.[mp3|ogg]',
      D6: 'D6.[mp3|ogg]',
      D7: 'D7.[mp3|ogg]',
      E1: 'E1.[mp3|ogg]',
      E3: 'E3.[mp3|ogg]',
      E5: 'E5.[mp3|ogg]',
      F2: 'F2.[mp3|ogg]',
      F4: 'F4.[mp3|ogg]',
      F6: 'F6.[mp3|ogg]',
      F7: 'F7.[mp3|ogg]',
      G1: 'G1.[mp3|ogg]',
      G3: 'G3.[mp3|ogg]',
      G5: 'G5.[mp3|ogg]',
      A2: 'A2.[mp3|ogg]',
      A4: 'A4.[mp3|ogg]',
      A6: 'A6.[mp3|ogg]',
      B1: 'B1.[mp3|ogg]',
      B3: 'B3.[mp3|ogg]',
      B5: 'B5.[mp3|ogg]',
      B6: 'B6.[mp3|ogg]',
      C3: 'C3.[mp3|ogg]'
    },

    organ: {
      C3: 'C3.[mp3|ogg]',
      C4: 'C4.[mp3|ogg]',
      C5: 'C5.[mp3|ogg]',
      C6: 'C6.[mp3|ogg]',
      'D#1': 'Ds1.[mp3|ogg]',
      'D#2': 'Ds2.[mp3|ogg]',
      'D#3': 'Ds3.[mp3|ogg]',
      'D#4': 'Ds4.[mp3|ogg]',
      'D#5': 'Ds5.[mp3|ogg]',
      'F#1': 'Fs1.[mp3|ogg]',
      'F#2': 'Fs2.[mp3|ogg]',
      'F#3': 'Fs3.[mp3|ogg]',
      'F#4': 'Fs4.[mp3|ogg]',
      'F#5': 'Fs5.[mp3|ogg]',
      A1: 'A1.[mp3|ogg]',
      A2: 'A2.[mp3|ogg]',
      A3: 'A3.[mp3|ogg]',
      A4: 'A4.[mp3|ogg]',
      A5: 'A5.[mp3|ogg]',
      C1: 'C1.[mp3|ogg]',
      C2: 'C2.[mp3|ogg]'
    },

    piano: {
      A7: 'A7.[mp3|ogg]',
      A1: 'A1.[mp3|ogg]',
      A2: 'A2.[mp3|ogg]',
      A3: 'A3.[mp3|ogg]',
      A4: 'A4.[mp3|ogg]',
      A5: 'A5.[mp3|ogg]',
      A6: 'A6.[mp3|ogg]',
      'A#7': 'As7.[mp3|ogg]',
      'A#1': 'As1.[mp3|ogg]',
      'A#2': 'As2.[mp3|ogg]',
      'A#3': 'As3.[mp3|ogg]',
      'A#4': 'As4.[mp3|ogg]',
      'A#5': 'As5.[mp3|ogg]',
      'A#6': 'As6.[mp3|ogg]',
      B7: 'B7.[mp3|ogg]',
      B1: 'B1.[mp3|ogg]',
      B2: 'B2.[mp3|ogg]',
      B3: 'B3.[mp3|ogg]',
      B4: 'B4.[mp3|ogg]',
      B5: 'B5.[mp3|ogg]',
      B6: 'B6.[mp3|ogg]',
      C1: 'C1.[mp3|ogg]',
      C2: 'C2.[mp3|ogg]',
      C3: 'C3.[mp3|ogg]',
      C4: 'C4.[mp3|ogg]',
      C5: 'C5.[mp3|ogg]',
      C6: 'C6.[mp3|ogg]',
      C7: 'C7.[mp3|ogg]',
      'C#7': 'Cs7.[mp3|ogg]',
      'C#1': 'Cs1.[mp3|ogg]',
      'C#2': 'Cs2.[mp3|ogg]',
      'C#3': 'Cs3.[mp3|ogg]',
      'C#4': 'Cs4.[mp3|ogg]',
      'C#5': 'Cs5.[mp3|ogg]',
      'C#6': 'Cs6.[mp3|ogg]',
      D7: 'D7.[mp3|ogg]',
      D1: 'D1.[mp3|ogg]',
      D2: 'D2.[mp3|ogg]',
      D3: 'D3.[mp3|ogg]',
      D4: 'D4.[mp3|ogg]',
      D5: 'D5.[mp3|ogg]',
      D6: 'D6.[mp3|ogg]',
      'D#7': 'Ds7.[mp3|ogg]',
      'D#1': 'Ds1.[mp3|ogg]',
      'D#2': 'Ds2.[mp3|ogg]',
      'D#3': 'Ds3.[mp3|ogg]',
      'D#4': 'Ds4.[mp3|ogg]',
      'D#5': 'Ds5.[mp3|ogg]',
      'D#6': 'Ds6.[mp3|ogg]',
      E7: 'E7.[mp3|ogg]',
      E1: 'E1.[mp3|ogg]',
      E2: 'E2.[mp3|ogg]',
      E3: 'E3.[mp3|ogg]',
      E4: 'E4.[mp3|ogg]',
      E5: 'E5.[mp3|ogg]',
      E6: 'E6.[mp3|ogg]',
      F7: 'F7.[mp3|ogg]',
      F1: 'F1.[mp3|ogg]',
      F2: 'F2.[mp3|ogg]',
      F3: 'F3.[mp3|ogg]',
      F4: 'F4.[mp3|ogg]',
      F5: 'F5.[mp3|ogg]',
      F6: 'F6.[mp3|ogg]',
      'F#7': 'Fs7.[mp3|ogg]',
      'F#1': 'Fs1.[mp3|ogg]',
      'F#2': 'Fs2.[mp3|ogg]',
      'F#3': 'Fs3.[mp3|ogg]',
      'F#4': 'Fs4.[mp3|ogg]',
      'F#5': 'Fs5.[mp3|ogg]',
      'F#6': 'Fs6.[mp3|ogg]',
      G7: 'G7.[mp3|ogg]',
      G1: 'G1.[mp3|ogg]',
      G2: 'G2.[mp3|ogg]',
      G3: 'G3.[mp3|ogg]',
      G4: 'G4.[mp3|ogg]',
      G5: 'G5.[mp3|ogg]',
      G6: 'G6.[mp3|ogg]',
      'G#7': 'Gs7.[mp3|ogg]',
      'G#1': 'Gs1.[mp3|ogg]',
      'G#2': 'Gs2.[mp3|ogg]',
      'G#3': 'Gs3.[mp3|ogg]',
      'G#4': 'Gs4.[mp3|ogg]',
      'G#5': 'Gs5.[mp3|ogg]',
      'G#6': 'Gs6.[mp3|ogg]'
    },

    saxophone: {
      'D#5': 'Ds5.[mp3|ogg]',
      E3: 'E3.[mp3|ogg]',
      E4: 'E4.[mp3|ogg]',
      E5: 'E5.[mp3|ogg]',
      F3: 'F3.[mp3|ogg]',
      F4: 'F4.[mp3|ogg]',
      F5: 'F5.[mp3|ogg]',
      'F#3': 'Fs3.[mp3|ogg]',
      'F#4': 'Fs4.[mp3|ogg]',
      'F#5': 'Fs5.[mp3|ogg]',
      G3: 'G3.[mp3|ogg]',
      G4: 'G4.[mp3|ogg]',
      G5: 'G5.[mp3|ogg]',
      'G#3': 'Gs3.[mp3|ogg]',
      'G#4': 'Gs4.[mp3|ogg]',
      'G#5': 'Gs5.[mp3|ogg]',
      A4: 'A4.[mp3|ogg]',
      A5: 'A5.[mp3|ogg]',
      'A#3': 'As3.[mp3|ogg]',
      'A#4': 'As4.[mp3|ogg]',
      B3: 'B3.[mp3|ogg]',
      B4: 'B4.[mp3|ogg]',
      C4: 'C4.[mp3|ogg]',
      C5: 'C5.[mp3|ogg]',
      'C#3': 'Cs3.[mp3|ogg]',
      'C#4': 'Cs4.[mp3|ogg]',
      'C#5': 'Cs5.[mp3|ogg]',
      D3: 'D3.[mp3|ogg]',
      D4: 'D4.[mp3|ogg]',
      D5: 'D5.[mp3|ogg]',
      'D#3': 'Ds3.[mp3|ogg]',
      'D#4': 'Ds4.[mp3|ogg]'
    },

    trombone: {
      'A#3': 'As3.[mp3|ogg]',
      C3: 'C3.[mp3|ogg]',
      C4: 'C4.[mp3|ogg]',
      'C#2': 'Cs2.[mp3|ogg]',
      'C#4': 'Cs4.[mp3|ogg]',
      D3: 'D3.[mp3|ogg]',
      D4: 'D4.[mp3|ogg]',
      'D#2': 'Ds2.[mp3|ogg]',
      'D#3': 'Ds3.[mp3|ogg]',
      'D#4': 'Ds4.[mp3|ogg]',
      F2: 'F2.[mp3|ogg]',
      F3: 'F3.[mp3|ogg]',
      F4: 'F4.[mp3|ogg]',
      'G#2': 'Gs2.[mp3|ogg]',
      'G#3': 'Gs3.[mp3|ogg]',
      'A#1': 'As1.[mp3|ogg]',
      'A#2': 'As2.[mp3|ogg]'
    },

    trumpet: {
      C6: 'C6.[mp3|ogg]',
      D5: 'D5.[mp3|ogg]',
      'D#4': 'Ds4.[mp3|ogg]',
      F3: 'F3.[mp3|ogg]',
      F4: 'F4.[mp3|ogg]',
      F5: 'F5.[mp3|ogg]',
      G4: 'G4.[mp3|ogg]',
      A3: 'A3.[mp3|ogg]',
      A5: 'A5.[mp3|ogg]',
      'A#4': 'As4.[mp3|ogg]',
      C4: 'C4.[mp3|ogg]'
    },

    tuba: {
      'A#2': 'As2.[mp3|ogg]',
      'A#3': 'As3.[mp3|ogg]',
      D3: 'D3.[mp3|ogg]',
      D4: 'D4.[mp3|ogg]',
      'D#2': 'Ds2.[mp3|ogg]',
      F1: 'F1.[mp3|ogg]',
      F2: 'F2.[mp3|ogg]',
      F3: 'F3.[mp3|ogg]',
      'A#1': 'As1.[mp3|ogg]'
    },

    violin: {
      A3: 'A3.[mp3|ogg]',
      A4: 'A4.[mp3|ogg]',
      A5: 'A5.[mp3|ogg]',
      A6: 'A6.[mp3|ogg]',
      C4: 'C4.[mp3|ogg]',
      C5: 'C5.[mp3|ogg]',
      C6: 'C6.[mp3|ogg]',
      C7: 'C7.[mp3|ogg]',
      E4: 'E4.[mp3|ogg]',
      E5: 'E5.[mp3|ogg]',
      E6: 'E6.[mp3|ogg]',
      G4: 'G4.[mp3|ogg]',
      G5: 'G5.[mp3|ogg]',
      G6: 'G6.[mp3|ogg]'
    },

    xylophone: {
      C8: 'C8.[mp3|ogg]',
      G4: 'G4.[mp3|ogg]',
      G5: 'G5.[mp3|ogg]',
      G6: 'G6.[mp3|ogg]',
      G7: 'G7.[mp3|ogg]',
      C5: 'C5.[mp3|ogg]',
      C6: 'C6.[mp3|ogg]',
      C7: 'C7.[mp3|ogg]'
    }
  }

  public setExt(newExt: string): void {
    for (const instrument of this.list) {
      if (this.samples[instrument]) {
        for (const note in this.samples[instrument]) {
          this.samples[instrument][note] = this.samples[instrument][note].replace(this.ext, newExt)
        }
      }
    }
    this.ext = newExt
    // console.log('sample extensions set to ' + this.ext)
  }

  public load(options: LoadOptions): { [key: string]: Tone.Sampler } {
    const instruments = options.instruments || this.list
    const baseUrl = options.baseUrl || this.baseUrl

    // console.log('Loading samples with options:', {
    //   instruments,
    //   baseUrl,
    //   ext: this.ext
    // })

    const result: { [key: string]: Tone.Sampler } = {}

    for (const instrument of instruments) {
      if (!this.samples[instrument]) {
        console.warn(`Instrument ${instrument} not found in samples`)
        continue
      }

      // console.log(`Creating sampler for ${instrument}...`)
      let samples = { ...this.samples[instrument] }

      if (this.minify || options.minify) {
        samples = this.minifySamples(samples)
      }

      // Utwórz ścieżkę do sampli z poprawnym rozszerzeniem
      const urls: Record<string, string> = {}
      for (const [note, file] of Object.entries(samples)) {
        // Zamień [mp3|ogg] na konkretne rozszerzenie
        urls[note] = file.replace('.[mp3|ogg]', '.mp3')
      }

      // console.log(`Sample URLs for ${instrument}:`, urls)

      try {
        result[instrument] = new Tone.Sampler({
          urls,
          baseUrl: baseUrl + instrument + '/',
          onload: () => {
            // console.log(`${instrument} samples loaded successfully`)
            if (options.onload) {
              options.onload()
            }
          },
          onerror: (error) => {
            console.error(`Error loading ${instrument} samples:`, error)
          }
        })
        // console.log(`Sampler created for ${instrument}`)
      } catch (error) {
        console.error(`Error creating sampler for ${instrument}:`, error)
      }
    }

    return result
  }

  private minifySamples(samples: SampleMap): SampleMap {
    const minified: SampleMap = {}
    for (const key in samples) {
      if (samples.hasOwnProperty(key)) {
        minified[key] = samples[key].replace(/\.(mp3|ogg)$/, '.min.$1')
      }
    }
    return minified
  }
}

export const SampleLibrary = new SampleLibraryClass()
