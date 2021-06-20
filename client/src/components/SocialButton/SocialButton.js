import './SocialButton.scss';


function SocialButton({className, imgSrc, text, onClick}) {


    if(onClick) {
        return (
            <button className={`${className} social`} onClick={onClick}>
                <img className="social__button-icon" src={imgSrc} alt="social"/>
                <span className="social__button-text">{text}</span>
            </button>
        )
    }
    else {
        return (
            <button className={`${className} social`}>
                <img className="social__button-icon" src={imgSrc} alt="social"/>
                <span className="social__button-text">{text}</span>
            </button>
        )
    }

    
}

export default SocialButton;