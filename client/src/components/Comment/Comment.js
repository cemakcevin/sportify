import './Comment.scss';
import ProfileImage from "../ProfileImage/ProfileImage";
import timeDifference from '../../functions/timeDifference';


function Comment({className, name, date, text, profileUrl}) {

    return (
        <article className={`${className} comment`}>
            <div className="comment__avatar-container">
                <ProfileImage 
                    className="comment__img" 
                    imgSrc={profileUrl}
                />
            </div>
            <div className="comment__text-container">
                <div className="comment__name-container">
                    <h3 className="comment__name">{name}</h3>
                    <p className="comment__date">{timeDifference(new Date(),date)}</p>
                </div>
                <p className="comment__text">{text}</p>
            </div>
        </article>
    )
}

export default Comment;