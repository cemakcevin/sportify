import "./CommentForm.scss";

import ProfileImage from '../ProfileImage/ProfileImage';

function CommentForm ({className}) {

    return (
        <form className={`${className} form`}>
            <div className="form__avatar-container">
                <ProfileImage 
                    className="form__profile-image"
                    img={false}
                />
            </div>
            <div className="form__container">
                <label className="form__title" htmlFor="input">JOIN THE CONVERSATION</label>
                <div className="form__input-box">
                    <div className="form__input-container">
                        <textarea 
                            className="form__input" 
                            id="input"
                            name="input" 
                            type="text"
                            placeholder="Add a comment..."
                        >
                        </textarea>
                    </div>
                    <div className="form__button-container">
                        <button className="form__button" type="submit">SUBMIT</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CommentForm;