import "./FeedCardForm.scss";

import ProfileImage from '../ProfileImage/ProfileImage';

function FeedCardForm ({className, onSubmit, profileUrl, contentId, receiverId}) {

    return (
        <form className={`${className} feed-card-form`} onSubmit={onSubmit}>
            <ProfileImage 
                className="feed-card-form__profile-image"
                imgSrc={profileUrl}
            />
            <div className="feed-card-form__container">
                <div className="feed-card-form__input-box">
                    <div className="feed-card-form__input-container">
                        <input 
                            className="feed-card-form__input" 
                            type="text"
                            placeholder="Leave a comment..."
                            name="commentText"
                        />
                        <input 
                            className="feed-card-form__input" 
                            type="hidden"
                            name="contentId"
                            value={contentId}
                        />
                        <input 
                            className="feed-card-form__input" 
                            type="hidden"
                            name="contentType"
                            value="feed"
                        />
                        <input 
                            className="feed-card-form__input" 
                            type="hidden"
                            name="receiverId"
                            value={receiverId}
                        />
                    </div>
                    <div className="feed-card-form__button-container">
                        <button className="feed-card-form__button" type="submit">COMMENT</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FeedCardForm;