import './FeedCard.scss';

import FeedCardForm from '../FeedCardForm/FeedCardForm';
import ContentActions from '../ContentActions/ContentActions';

import avatar from '../../assets/pictures/profile.jpeg';
import arrowIcon from '../../assets/icons/arrow-icon.png';
import friendIcon from '../../assets/icons/friend-icon.png';

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
            <ContentActions 
                className="feed-card__actions"
            />
            <FeedCardForm 
                className="feed-card__form"
                onSubmit=""
                profileUrl={avatar}
            />
        </article>
    )
}

export default FeedCard;