import './VideoInfo.scss';

import CommentForm from '../CommentForm/CommentForm';
import Comment from '../Comment/Comment';
import ContentActions from '../ContentActions/ContentActions';

function VideoInfo({className , currentEvent, currentUser, comments, taskSubmitComment, taskShareVideo}) {

    const {strLeague, strEvent, strDescriptionEN, intHomeScore, intAwayScore} = currentEvent;
    
    return (
        <div className={`${className} video-info`}>
            <section className="video-info_description description">
                <header className="description__header">
                    <h1 className="description__title">{strLeague}: {strEvent}</h1>
                </header>
                {strDescriptionEN && 
                    <div className="description__text-container">
                        <p className="description__text">{strDescriptionEN}</p>
                    </div>
                }       
                <ContentActions 
                    className="description__actions"
                    taskShareVideo={taskShareVideo}
                />
            </section>
            <div className="video-info__comments comments">
                <h2 className="comments__title">Comments</h2>
                <CommentForm 
                    className="comments__form" 
                    onSubmit={taskSubmitComment}
                    profileUrl={currentUser.imgUrl}
                />
                {comments.map(comment => {
                    return(
                        <Comment 
                            key={comment.commentId}
                            className= "comments__comment"
                            userId={comment.userId}
                            name={comment.name}
                            date={comment.timestamp}
                            text={comment.commentText}
                            profileUrl={comment.imgUrl}
                        />)
                    })
                }
            </div>
        </div>
    )
}

export default VideoInfo;