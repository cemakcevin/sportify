import './IsFriend.scss';

import SocialButton from '../SocialButton/SocialButton';

import followingIcon from '../../assets/icons/following-icon.png'

function IsFriend({className, isFriend, isRequestSent, isRequestReceived, taskSendFriendRequest, taskAcceptFriendRequest}) {

    return(
        <div className={`${className} isfriend`}>
            {isFriend 
                ?
                <div className="isfriend__button-container">
                    <SocialButton 
                        className="isfriend__button isfriend__button--friends" 
                        imgSrc={followingIcon}
                        text={"Friends"}
                    />
                    <SocialButton 
                        className="isfriend__button"
                        imgSrc={followingIcon}
                        text={"Message"}
                    />
                </div>
                :
                ( isRequestSent
                    ?
                    <SocialButton 
                        className="isfriend__button isfriend__button--sent"
                        imgSrc={followingIcon}
                        text={"Request Sent"}
                    />
                    :(
                        isRequestReceived
                        ?
                        <SocialButton 
                            className="isfriend__button isfriend__button--received"
                            imgSrc={followingIcon}
                            text={"Accept Request"}
                            onClick={taskAcceptFriendRequest}
                        />
                        :
                        <SocialButton 
                            className="isfriend__button"
                            imgSrc={followingIcon}
                            text={"Send Request"}
                            onClick={taskSendFriendRequest}
                        />
                    )
                )

            }
        </div>
    )
}

export default IsFriend;