import './ContentActions.scss';

import likeIcon from '../../assets/icons/like-icon.png';
import shareIcon from '../../assets/icons/share-icon.png';
import commentIcon from '../../assets/icons/comment-icon.png';

function ContentActions ({className, taskShareVideo}) {

    return(
        <div className={`${className} actions`}>
            <div className="actions__icon-container">
                <img className="actions__icon" src={likeIcon} alt="like" />
                <p className="actions__icon-text">Like</p> 
            </div>
            <div className="actions__icon-container">
                <img className="actions__icon" src={commentIcon} alt="like" />
                <p className="actions__icon-text">Comment</p> 
            </div>
            <div className="actions__icon-container" onClick={taskShareVideo}>
                <img className="actions__icon" src={shareIcon} alt="like" />
                <p className="actions__icon-text">Share</p> 
            </div>
        </div>
    )
}

export default ContentActions;