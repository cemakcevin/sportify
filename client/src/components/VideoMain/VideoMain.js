import './VideoMain.scss'

function VideoMain({videoSrc, className, disabled, videoName}) {

    let video__disabled;

    if (disabled) {
        video__disabled = "video__frame--disabled";
    }
    else {
        video__disabled = "";
    }

    return (
        <div className={`${className} video`}>
            <div className="video__wrapper">
                <iframe className={`video__frame ${video__disabled}`} title={videoName} src={videoSrc} type="video/mp4" frameBorder="0" allowFullScreen /> 
            </div>
        </div>
    )
}

export default VideoMain;