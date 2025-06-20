import guitarIcon from '../assets/instruments/guitar.svg'
import violinIcon from '../assets/instruments/violin.svg'
import drumsIcon from '../assets/instruments/drums.svg'
import pianoIcon from '../assets/instruments/piano.svg'

export interface IInstrumentIcons {
  guitar: string
  violin: string
  drums: string
  piano: string
}

export const InstrumentIcons: IInstrumentIcons = {
  guitar: guitarIcon,
  violin: violinIcon,
  drums: drumsIcon,
  piano: pianoIcon
}
