import { RateButtonProps } from './RateButtonProps'
import likeIcon from '../../assets/like.svg'
import dislikeIcon from '../../assets/dislike.svg'
import './RateButtonStyles.css'

const RateIcon = ({ displayOnly = false, type, style = {} }: RateButtonProps) => {
  return (
    <div className="button-container">
      {type === 'like' ? (
        displayOnly ? (
          <img src={likeIcon} className="rate-icon-display" alt="Like icon" style={style} />
        ) : (
          <img src={likeIcon} className="rate-icon like" alt="Like icon" style={style} />
        )
      ) : displayOnly ? (
        <img src={dislikeIcon} className="rate-icon-display" alt="Dislike icon" style={style} />
      ) : (
        <img src={dislikeIcon} className="rate-icon dislike" alt="Dislike icon" style={style} />
      )}
    </div>
  )
}

export default RateIcon
