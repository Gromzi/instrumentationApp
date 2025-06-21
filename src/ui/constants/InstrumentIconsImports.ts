import guitarIcon from '../assets/instruments/guitar.svg'
import violinIcon from '../assets/instruments/violin.svg'
import drumsIcon from '../assets/instruments/drums.svg'
import pianoIcon from '../assets/instruments/piano.svg'
import harpIcon from '../assets/instruments/harp.svg'
import xylophoneIcon from '../assets/instruments/xylophone.svg'
import clarinetIcon from '../assets/instruments/clarinet.svg'
import contrabassIcon from '../assets/instruments/contrabass.svg'
import celloIcon from '../assets/instruments/cello.svg'
import fluteIcon from '../assets/instruments/flute.svg'

export interface IInstrumentIcons {
  guitar: string
  violin: string
  drums: string
  piano: string
  harp: string
  xylophone: string
  clarinet: string
  contrabass: string
  cello: string
  flute: string
}

export const InstrumentIcons: IInstrumentIcons = {
  guitar: guitarIcon,
  violin: violinIcon,
  drums: drumsIcon,
  flute: fluteIcon,
  piano: pianoIcon,
  harp: harpIcon,
  xylophone: xylophoneIcon,
  clarinet: clarinetIcon,
  contrabass: contrabassIcon,
  cello: celloIcon,
}
