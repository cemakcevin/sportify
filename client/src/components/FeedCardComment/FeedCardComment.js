import './FeedCardComment.scss';
import {Link} from 'react-router-dom';

import ProfileImage from "../ProfileImage/ProfileImage";
import timeDifference from '../../functions/timeDifference';


function FeedCardComment({className, userId, name, date, text, profileUrl}) {

    return (
        <article className={`${className} feed-card-comment`}>
            <div className="feed-card-comment__avatar-container">
                <Link to={"/user/" + userId}>
                    <ProfileImage 
                        className="feed-card-comment__img" 
                        imgSrc={profileUrl}
                    />
                </Link>
            </div>
            <div className="feed-card-comment__text-container">
                <div className="feed-card-comment__name-container">
                    <h3 className="feed-card-comment__name">{name}</h3>
                    <p className="feed-card-comment__date">{timeDifference(new Date(),date)}</p>
                </div>
                <p className="feed-card-comment__text">{text}</p>
            </div>
        </article>
    )
}

export default FeedCardComment;