import './VideoInfo.scss';

import CommentForm from '../CommentForm/CommentForm';
import Comment from '../Comment/Comment';

function VideoInfo({className , currentEvent, comments, taskSubmitComment}) {

    const {strLeague, strEvent, strDescriptionEN, intHomeScore, intAwayScore} = currentEvent;
    
    return (
        <div className={`${className} video-info`}>
            <section className="video-info_description description">
                <header className="description__header">
                    <h1 className="description__title">{strLeague}: {strEvent}</h1>
                </header>
                <div className="description__text-container">
                    <p className="description__text">{strDescriptionEN}</p>
                </div>
            </section>
            <div className="video-info__comments comments">
                <h2 className="comments__title">Comments</h2>
                <CommentForm 
                    className="comments__form" 
                    onSubmit={taskSubmitComment}
                />
                {comments.map(comment => {
                    return(
                        <Comment 
                            key={comment.commentId}
                            className= "comments__comment"
                            name={comment.name}
                            date={comment.timestamp}
                            text={comment.commentText}
                        />)
                    })
                }
            </div>
        </div>
    )
}

export default VideoInfo;