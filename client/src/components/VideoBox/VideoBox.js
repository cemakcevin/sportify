import './VideoBox.scss';

import videoWatchToEmbed from '../../functions/videoWatchToEmbed';

function VideoBox({className, videoSrc, videoName, videoId, onClick}) {
    
    if(!videoSrc) {
        return <div></div>
    }

    const video = videoWatchToEmbed(videoSrc);

    return (

        <article className={`${className} video-box`} onClick={() => onClick(videoId, videoSrc)}>
            <iframe className="video-box__frame" title={videoName}  src={video} type="video/mp4" frameBorder="0" allowFullScreen /> 
            <div className="video-box__name-container">
                <h4 className="video-box__name">{videoName}</h4>
            </div>
        </article>
    )
}

export default VideoBox;