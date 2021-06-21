import './FeedCard.scss';

import FeedCardForm from '../FeedCardForm/FeedCardForm';
import ContentActions from '../ContentActions/ContentActions';
import VideoMain from '../VideoMain/VideoMain';
import FeedCardComment from '../FeedCardComment/FeedCardComment';

import avatar from '../../assets/pictures/profile.jpeg';
import arrowIcon from '../../assets/icons/arrow-icon.png';
import friendIcon from '../../assets/icons/friend-icon.png';

import dateToString from '../../functions/dateToString';
import videoWatchToEmbed from '../../functions/videoWatchToEmbed';

function FeedCard ({className, feedContent, feedComments, taskTakeToGamePage, taskAddCommentToPost}) {

    const {feedId, userId, commentorName, userName, imgUrl, commentText, timestamp, 
        idEvent, strEvent, intHomeScore, intAwayScore, strVideo} = feedContent;
    
        console.log(feedComments)

    const cardComments = feedComments.filter(comment => comment.contentId === feedId)

    return (
        <article className={`feed-card ${className}`}>
            <div className="feed-card__info">
                <img className="feed-card__avatar" src={imgUrl} alt="avatar"/>
                <div className="feed-card__background">
                    <div className="feed-card__name-container">
                        <h3 className="feed-card__name">{commentorName}</h3>
                        {commentorName !== userName ? <img className="feed-card__arrow" src={arrowIcon} alt="arrow"/> : <div></div>}
                        {commentorName !== userName ? <h3 className="feed-card__name">{userName}</h3> : <div></div>}
                        {/* <img className="feed-card__arrow" src={arrowIcon} alt="arrow"/>
                        <h3 className="feed-card__name">{userName}</h3> */}
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
            {idEvent &&
                <div className="feed-card__video-container" onClick={() => taskTakeToGamePage(idEvent)}>
                    <VideoMain className="feed-card__video" videoSrc={videoWatchToEmbed(strVideo)} disabled={true}/>
                </div>
            }
            <ContentActions 
                className="feed-card__actions"
            />
            {cardComments.map(comment => {
                return (
                    <FeedCardComment 
                        className="feed-card__comment"
                        userId={comment.userId}
                        name={comment.name}
                        date={comment.timestamp}
                        text={comment.commentText}
                        profileUrl={comment.imgUrl}
                    />
                )
            })}
            <FeedCardForm 
                className="feed-card__form"
                onSubmit={taskAddCommentToPost}
                profileUrl={avatar}
                contentId={feedId}
                receiverId={userId}
            />
        </article>
    )
}

export default FeedCard;