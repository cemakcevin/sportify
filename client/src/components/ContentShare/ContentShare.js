import './ContentShare.scss';

import Input from '../Input/Input';

import cancelIcon from '../../assets/icons/cancel-icon.png'
import searchIcon from '../../assets/icons/search-icon.png'
import arrowRightIcon from '../../assets/icons/arrow-right-icon.png'
import ProfileImage from '../ProfileImage/ProfileImage';

function ContentShare({className, taskCancelContentShare, taskFilterFriends, searchedValue, friends}) {
    return (
        <div className={`${className} contentshare`}>
            <form className="contentshare__wrapper">
                <h2 className="contentshare__title">Share on a Friend's Profile</h2>
                <Input 
                    className="contentshare__input"
                    type="text"
                    placeholder="Search for a friend..."
                    icon={searchIcon}
                    value={searchedValue}
                    name="searchedValue"
                    onChange={taskFilterFriends}
                />
                <h3 className="contentshare__subtitle">Friends</h3>
                {friends.map(friend => {
                    return (
                        <div className="contentshare__friend">
                            <ProfileImage className="contentshare__friend-img" imgSrc={friend.imgUrl}/>
                            <img className="contentshare__friend-icon" src={arrowRightIcon} alt="friend" />
                        </div>
                    )
                })}
                <img className="contentshare__cancel" src={cancelIcon} alt="cancel" onClick={taskCancelContentShare}/>
            </form>
        </div>
    )
}

export default ContentShare;