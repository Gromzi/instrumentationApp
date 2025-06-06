import { InstrumentIconProps } from "./InstrumentIconProps"
import "./InstrumentIconStyles.css"

const InstrumentIcon = (props: InstrumentIconProps) => {
  return (
    <div className="instrument-icon-container">
      {/* <img
        src={props.icon}
        className={props.active ? "icon pulse" : "icon"}
        alt="Instrument logo"
      /> */}
      <div style={{ fontSize: "6rem" }} className="pulse">
        🎸
      </div>
    </div>
  )
}

export default InstrumentIcon
