import './ProfileImage.scss'


//component for profile images
function ProfileImage(props) {
    let divElement;

    if(props.img) {
        divElement = <div className={`${props.className} profile-img profile-img--picture`}></div>
    } else {
        divElement =<div className={`${props.className} profile-img profile-img--color`}></div>
    }

    return (
        divElement
    )
}

export default ProfileImage;