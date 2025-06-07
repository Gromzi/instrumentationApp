import { InstrumentIconProps } from "./InstrumentIconProps"
import "./InstrumentIconStyles.css"
import threeDotsIcon from "../../assets/three-dots.svg"

const InstrumentIcon = (props: InstrumentIconProps) => {
  return (
    <div className="instrument-icon-container">
      <div className="three-dots-container">
        <img src={threeDotsIcon} alt="Settings" className="three-dots icon" />
      </div>

      <img
        src={props.icon}
        className={props.active ? "icon pulse glow" : "icon"}
        alt="Instrument logo"
      />
    </div>
  )
}

export default InstrumentIcon
