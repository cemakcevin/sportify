import './VideoBox.scss';

import videoWatchToEmbed from '../../functions/videoWatchToEmbed';

function VideoBox({className, videoSrc, videoName}) {
    
    const video = videoWatchToEmbed(videoSrc);
    console.log(video)
    
    return (

        <article className={`${className} video`}>
            <iframe className="video__frame" src={video} type="video/mp4" frameBorder="0" allowfullscreen /> 
            <div className="video__name-container">
                <h4 className="video__name">{videoName}</h4>
                {/* <p className="video__channel">{channel}</p> */}
            </div>
        </article>
    )
}

export default VideoBox;