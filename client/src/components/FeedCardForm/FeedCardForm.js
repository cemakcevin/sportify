import "./FeedCardForm.scss";

import ProfileImage from '../ProfileImage/ProfileImage';

function FeedCardForm ({className, onSubmit, profileUrl}) {

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
                            id="input"
                            name="input" 
                            type="text"
                            placeholder="Leave a comment..."
                            name="comment"
                        >
                        </input>
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