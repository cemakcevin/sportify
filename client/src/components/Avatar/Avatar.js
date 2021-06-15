import './Avatar.scss';

function Avatar ({className, avatarUrl}) {

    return(
        <div className={`${className} avatar`}>
            <img className="avatar__img" src={avatarUrl} alt="profile"/>
        </div>
    )
} 

export default Avatar;