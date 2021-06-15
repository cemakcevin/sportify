import './VideoInfo.scss';


function VideoInfo({className , currentEvent}) {

    const {strLeague, strEvent, strDescriptionEN, intHomeScore, intAwayScore} = currentEvent;
    
    return (
        <div className={`${className} video-info`}>
            <section className="video-info_description description">
                <header className="description__header">
                    <h1 className="description__title">{strLeague}: {strEvent}</h1>
                    {/* <DescriptionInfo 
                        className="description__header-info-container"
                        currentVideo={currentVideoInfo}
                    /> */}
                </header>
                <div className="description__text-container">
                    <p className="description__text">{strDescriptionEN}</p>
                </div>
            </section>
            {/* <Comments 
                className="video-info__comments"
                comments={comments}
                currentVideoId={id}
                updateCommentsOnSubmit={updateCommentsOnSubmit}
                deleteCommentsOnClick={deleteCommentsOnClick}
            />                      */}
        </div>
    )
}

export default VideoInfo;