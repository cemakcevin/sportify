import './VideoMain.scss'

function VideoMain({videoSrc, className}) {

    return (
        <div className={`${className} video`}>
            <div className="video__wrapper">
                <iframe className="video__frame" src={videoSrc} type="video/mp4" frameBorder="0" allowfullscreen /> 
            </div>
        </div>
    )
}

export default VideoMain;