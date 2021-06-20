import './ProfileImage.scss'


//component for profile images
function ProfileImage({className, imgSrc}) {

    return (
        <img className={`${className} profile-img`} src={imgSrc} alt="profile"/>
    )
}

export default ProfileImage;