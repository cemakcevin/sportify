import './VideoBox.scss';

import videoWatchToEmbed from '../../functions/videoWatchToEmbed';

function VideoBox({className, videoSrc, videoName}) {
    
    console.log(videoSrc)
    if(!videoSrc) {
        return <div></div>
    }

    const video = videoWatchToEmbed(videoSrc);
    console.log(video)

    return (

        <article className={`${className} video-box`}>
            <iframe className="video-box__frame" src={video} type="video/mp4" frameBorder="0" allowfullscreen /> 
            <div className="video-box__name-container">
                <h4 className="video-box__name">{videoName}</h4>
                {/* <p className="video__channel">{channel}</p> */}
            </div>
        </article>
    )
}

export default VideoBox;