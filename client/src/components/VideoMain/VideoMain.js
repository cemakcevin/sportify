import './VideoMain.scss'

function VideoMain({videoSrc, className, disabled}) {

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
                <iframe className={`video__frame ${video__disabled}`} src={videoSrc} type="video/mp4" frameBorder="0" allowfullscreen /> 
            </div>
        </div>
    )
}

export default VideoMain;