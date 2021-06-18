import './ProfileImage.scss'


//component for profile images
function ProfileImage({className, imgSrc}) {
    let divElement;

    if(imgSrc) {
        divElement = <img className={`${className} profile-img`} src={imgSrc} alt="profile"/>
    } else {
        divElement = <div className={`${className} profile-container`}></div>
    }

    return (
        divElement
    )
}

export default ProfileImage;