import { RateButtonProps } from './RateButtonProps'
import likeIcon from '../../assets/like.svg'
import dislikeIcon from '../../assets/dislike.svg'
import './RateButtonStyles.css'

const RateIcon = ({ displayOnly = false, type }: RateButtonProps) => {
  return (
    <div className="button-container">
      {type === 'like' ? (
        displayOnly ? (
          <img src={likeIcon} className="rate-icon-display" alt="Like icon" />
        ) : (
          <img src={likeIcon} className="rate-icon like" alt="Like icon" />
        )
      ) : displayOnly ? (
        <img src={dislikeIcon} className="rate-icon-display" alt="Dislike icon" />
      ) : (
        <img src={dislikeIcon} className="rate-icon dislike" alt="Dislike icon" />
      )}
    </div>
  )
}

export default RateIcon
