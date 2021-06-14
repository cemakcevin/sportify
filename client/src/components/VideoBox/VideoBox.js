import './VideoBox.scss';

function VideoBox({className, videoSrc, videoName}) {
    return (
        <article className={`${className} video`}>
            <iframe className="video__frame" src="https://www.youtube.com/embed/NGO2IzUZz-I" type="video/mp4" frameborder="0" allowfullscreen /> 
            <div className="video__name-container">
                <h4 className="video__name">{videoName}</h4>
                {/* <p className="video__channel">{channel}</p> */}
            </div>
        </article>
    )
}

export default VideoBox;