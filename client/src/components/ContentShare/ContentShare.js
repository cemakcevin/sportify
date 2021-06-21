import './ContentShare.scss';

import Input from '../Input/Input';

import cancelIcon from '../../assets/icons/cancel-icon.png'
import searchIcon from '../../assets/icons/search-icon.png'
import arrowRightIcon from '../../assets/icons/arrow-right-icon.png'
import backIcon from '../../assets/icons/back-icon.png'
import ProfileImage from '../ProfileImage/ProfileImage';

function ContentShare({className, currentUser, taskCancelContentShare, 
    taskFilterFriends, taskBackToPrevious, taskEnableVideoPost, taskSubmitSharePost, videoSharePost, 
    searchedValue, friends, selectedFriend}) {

    return (
        <div className={`${className} contentshare`}>
            <form className="contentshare__wrapper" onSubmit={taskSubmitSharePost}>
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
                        <div className="contentshare__friend" onClick={() => taskEnableVideoPost(friend)}>
                            <ProfileImage className="contentshare__friend-img" imgSrc={friend.imgUrl}/>
                            <p className="contentshare__friend-name">{friend.friendName}</p>
                            <img className="contentshare__friend-icon" src={arrowRightIcon} alt="friend" />
                        </div>
                    )
                })}
                <img className="contentshare__cancel" src={cancelIcon} alt="cancel" onClick={taskCancelContentShare}/>
                {videoSharePost && 
                    <div className="contentshare__post-container">
                        <h2 className="contentshare__title">Create a Post</h2>
                        <div className="contentshare__input-post-container">
                            <ProfileImage className="contentshare__user-img" imgSrc={currentUser.imgUrl}/>
                            <Input 
                                className="contentshare__input-post"
                                type="text"
                                placeholder={`Write something to ${selectedFriend.friendName}...`}
                                icon={searchIcon}
                                name="post"
                            />
                        </div>
                        <button className="contentshare__button" type="submit">POST</button>
                        <img className="contentshare__back" src={backIcon} alt="cancel" onClick={taskBackToPrevious}/>
                        <img className="contentshare__cancel" src={cancelIcon} alt="cancel" onClick={taskCancelContentShare}/>
                    </div>
                }
            </form>
        </div>
    )
}

export default ContentShare;