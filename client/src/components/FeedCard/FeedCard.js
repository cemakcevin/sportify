import './FeedCard.scss';

import FeedCardForm from '../FeedCardForm/FeedCardForm';

import avatar from '../../assets/pictures/profile.jpeg';
import arrowIcon from '../../assets/icons/arrow-icon.png';
import friendIcon from '../../assets/icons/friend-icon.png';
import likeIcon from '../../assets/icons/like-icon.png';
import shareIcon from '../../assets/icons/share-icon.png';
import commentIcon from '../../assets/icons/comment-icon.png';

import dateToString from '../../functions/dateToString';

function FeedCard ({className, feedContent}) {

    const {contentType, commentorName, userName, imgUrl, commentText, timestamp} = feedContent;

    return (
        <article className={`feed-card ${className}`}>
            <div className="feed-card__info">
                <img className="feed-card__avatar" src={imgUrl} alt="avatar"/>
                <div className="feed-card__background">
                    <div className="feed-card__name-container">
                        <h3 className="feed-card__name">{commentorName}</h3>
                        <img className="feed-card__arrow" src={arrowIcon} alt="arrow"/>
                        <h3 className="feed-card__name">{userName}</h3>
                    </div>
                    <div className="feed-card__date-container">
                        <p className="feed-card__date">{dateToString(timestamp)}</p>
                        <img className="feed-card__friend-icon" src={friendIcon} alt="friend"/>
                    </div>
                </div>
            </div>
            <div className="feed-card__comment-container">
                <p className="feed-card__comment">{commentText}</p>
            </div>
            <div className="feed-card__actions">
                <div className="feed-card__icon-container">
                   <img className="feed-card__icon" src={likeIcon} alt="like" />
                   <p className="feed-card__icon-text">Like</p> 
                </div>
                <div className="feed-card__icon-container">
                   <img className="feed-card__icon" src={commentIcon} alt="like" />
                   <p className="feed-card__icon-text">Comment</p> 
                </div>
                <div className="feed-card__icon-container">
                   <img className="feed-card__icon" src={shareIcon} alt="like" />
                   <p className="feed-card__icon-text">Share</p> 
                </div>

            </div>
            <FeedCardForm 
                className="feed-card__form"
                onSubmit=""
                profileUrl={avatar}
            />
        </article>
    )
}

export default FeedCard;