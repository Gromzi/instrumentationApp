import { InstrumentIconProps } from './InstrumentIconProps'
import './InstrumentIconStyles.css'
import threeDotsIcon from '../../assets/three-dots.svg'
import {IInstrumentIcons, InstrumentIcons} from "../../constants/InstrumentIconsImports.ts";
import {useMidiPlayer} from "../../hooks/useMidiPlayer.tsx";

const InstrumentIcon = (props: InstrumentIconProps) => {

    const { instrument } = useMidiPlayer()
  return (
    <div className="instrument-icon-container">
      <div className="three-dots-container">
        <img src={threeDotsIcon} alt="Settings" className="three-dots icon" />
      </div>

      <img
          src={InstrumentIcons[instrument?.value as keyof IInstrumentIcons]}
          alt={`${instrument?.label}`}
        className={props.active ? 'icon pulse glow' : 'icon'}
      />
    </div>
  )
}

export default InstrumentIcon
