import { RateButtonProps } from "./RateButtonProps"
import likeIcon from "../../assets/like.svg"
import dislikeIcon from "../../assets/dislike.svg"
import "./RateButtonStyles.css"

const RateIcon = (props: RateButtonProps) => {
  return (
    <div className="button-container">
      {props.type === "like" ? (
        <img src={likeIcon} className="icon rate-icon like" alt="Like icon" />
      ) : (
        <img
          src={dislikeIcon}
          className="icon rate-icon dislike"
          alt="Dislike icon"
        />
      )}
    </div>
  )
}

export default RateIcon
