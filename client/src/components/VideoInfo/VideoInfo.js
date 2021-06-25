import './VideoInfo.scss';

import CommentForm from '../CommentForm/CommentForm';
import Comment from '../Comment/Comment';
import ContentActions from '../ContentActions/ContentActions';

function VideoInfo({className , currentEvent, currentUser, comments, taskSubmitComment, taskShareVideo}) {

    const {strLeague, strEvent, strDescriptionEN, dateEvent} = currentEvent;
    
    return (
        <div className={`${className} video-info`}>
            <section className="video-info_description description">
                <header className="description__header">
                    <h1 className="description__title">{strEvent}</h1>
                    <div className="description__sub-title-container">
                        <p className="description__sub-title">By {strLeague}</p>
                        <p className="description__date">{dateEvent}</p>
                    </div>  
                </header>
                {strDescriptionEN 
                    ? 
                    <div className="description__text-container">
                        <p className="description__text">{strDescriptionEN}</p>
                    </div>
                    :
                    <div className="description__text-container">
                        <p className="description__text">Led by Giannis Antetokounmpo’s 20 
                        points, 12 rebounds and Playoff career-high 15 assists, the No. 3 seed 
                        Bucks defeated the No. 6 seed Heat, 120-103, in Game 4. Brook Lopez added 
                        a game-high 25 points (11-15 FG) for the Bucks in the victory, while 
                        Jimmy Butler tallied 12 points, 10 rebounds and 10 assists for the Heat 
                        in the losing effort. The Bucks have now closed out this best-of-seven 
                        series, 4-0, and will advance to the Eastern Conference Semifinals to face 
                        the winner of the Brooklyn Nets – Boston Celtics series (Brooklyn currently 
                        leads, 2-1).</p>
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