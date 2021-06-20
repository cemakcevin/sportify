import "./FeedForm.scss";

import ProfileImage from '../ProfileImage/ProfileImage';

function FeedForm ({className, onSubmit, profileUrl, feedTitle, placeholder}) {

    return (
        <form className={`${className} feed-form`} onSubmit={onSubmit}>
            <div className="feed-form__avatar-container">
                <ProfileImage 
                    className="feed-form__profile-image"
                    imgSrc={profileUrl}
                />
            </div>
            <div className="feed-form__container">
                <label className="feed-form__title" htmlFor="input">{feedTitle}</label>
                <div className="feed-form__input-box">
                    <div className="feed-form__input-container">
                        <input 
                            className="feed-form__input" 
                            id="input"
                            name="input" 
                            type="text"
                            placeholder={placeholder}
                            name="commentText"
                        >
                        </input>
                    </div>
                    <div className="feed-form__button-container">
                        <button className="feed-form__button" type="submit">SUBMIT</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FeedForm;