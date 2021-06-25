import './UserPage.scss';
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';

import Avatar from '../../components/Avatar/Avatar';
import TeamCard from '../../components/TeamCard/TeamCard';
import TeamDetails from '../../components/TeamDetails/TeamDetails';
import EventScore from '../../components/EventScore/EventScore';
import NewsArticle from '../../components/NewsArticle/NewsArticle';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import IsFriend from '../../components/IsFriend/IsFriend';
import FeedForm from '../../components/FeedForm/FeedForm';
import FeedCard from '../../components/FeedCard/FeedCard';

import lockIcon from '../../assets/icons/lock-icon.png';
import homeIcon from '../../assets/icons/home-icon.png';
import locationIcon from '../../assets/icons/location-icon.png';

import timeDifference from '../../functions/timeDifference';


const API__KEY="dd7ed4159ce8b1df6d8cbadaa67c7cdf";
const localUrl = "http://localhost:8686";
let socket;


class UserPage extends React.Component {


    state = {
        index: 0,
        favouriteTeams:[],
        selectedTeam: null,
        detailsEnabled: false,
        pastEvents: [],
        articles: [],
        currentUser: {},
        profileInfo: {},
        currentIsProfile: null,
        friends: [],
        requests: [],
        isFriend: null,
        isRequestSent: false,
        isRequestReceived: false,
        feed: [],
        feedComments: []
    }

    componentDidMount(prevProps, _prevState) {

        const url = this.props.match.url;
        const previousUrl = prevProps && prevProps.match.url;

        if(url !== previousUrl) {
            this.props.taskUpdateUrl(this.props.match.url);
        }

        const token = sessionStorage.getItem("token");
        let userId = this.props.match.params.userId;

        socket = io.connect(localUrl);

        if(!userId) {

            socket.on("feedPostUpdate", () => {
                axios.get(localUrl + "/feed/currentUser", {headers: {Authorization: `Bearer ${token}`}})
                .then(response => {
                    
                    this.setState({
                        feed: response.data
                    })
                })
            });

            socket.on("feedPostCommentUpdate", () => {
                axios.get(localUrl + "/comments/feedComments/currentUser", {headers: {Authorization: `Bearer ${token}`}})
                .then(response => {
                    
                    this.setState({
                        feedComments: response.data
                    })
                })
            });

            socket.on("friendRequestUpdate", () => {
                axios.get(localUrl + "/requests", {headers: {Authorization: `Bearer ${token}`}})
                .then(response => {

                    this.setState({
                        requests: response.data,
                    })
                })
            });

            socket.off("friendAcceptUpdate");

            axios.get(localUrl + "/users", {headers: {Authorization: `Bearer ${token}`}})
            .then(response => {
                
                userId = response.data.userId;

                this.setState({
                    currentUser: response.data,
                    profileInfo: response.data,
                    currentIsProfile: true
                })

                return axios.all([
                    axios.get(localUrl + "/favourites", {headers: {Authorization: `Bearer ${token}`}}),
                    axios.get(localUrl + "/friends", {headers: {Authorization: `Bearer ${token}`}}),
                    axios.get(localUrl + "/requests", {headers: {Authorization: `Bearer ${token}`}}),
                    axios.get(localUrl + "/feed/currentUser", {headers: {Authorization: `Bearer ${token}`}}),
                    axios.get(localUrl + "/comments/feedComments/currentUser", {headers: {Authorization: `Bearer ${token}`}})
                ])
            })
            .then(axios.spread((favouritesResponse, friendsResponse, requestsResponse, feedResponse, feedCommentsResponse)=> {
                
                if(favouritesResponse.data){
                    this.setState({
                        favouriteTeams: favouritesResponse.data,
                        friends: friendsResponse.data,
                        requests: requestsResponse.data,
                        feed: feedResponse.data,
                        feedComments: feedCommentsResponse.data,
                        isFriend: true
                    })
                }
                else {
                    this.setState({
                        friends: friendsResponse.data,
                        requests: requestsResponse.data,
                        feed: feedResponse.data,
                        feedComments: feedCommentsResponse.data,
                        isFriend: true
                    },() =>  console.log("yess"))
                    
                } 
            }))
            .catch(error => {
                console.log(error)
            })
        }
        else {

            socket.on("feedPostUpdate", () => {
                axios.get(localUrl + "/feed/" + userId, {headers: {Authorization: `Bearer ${token}`}})
                .then(response => {
                    
                    this.setState({
                        feed: response.data
                    })
                })
            });

            socket.on("feedPostCommentUpdate", () => {
                axios.get(localUrl + "/comments/feedComments/"  + userId, {headers: {Authorization: `Bearer ${token}`}})
                .then(response => {
                    
                    this.setState({
                        feedComments: response.data
                    })
                })
            });

            socket.on("friendAcceptUpdate", () => {

                console.log("it is working");
                axios.all([
                    axios.get(localUrl + "/friends/isFriend/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                    axios.get(localUrl + "/friends/" + userId, {headers: {Authorization: `Bearer ${token}`}})
                ])
                .then(axios.spread((isFriendResponse, friendsResponse) => {
                    console.log(isFriendResponse.data, friendsResponse.data)
                    
                    this.setState({
                        isFriend: isFriendResponse.data,
                        friends: friendsResponse.data
                    })
                }))
            });

            socket.off("friendRequestUpdate");

            axios.all([
                axios.get(localUrl + "/favourites/user/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                axios.get(localUrl + "/users/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                axios.get(localUrl + "/users", {headers: {Authorization: `Bearer ${token}`}}),
                axios.get(localUrl + "/friends/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                axios.get(localUrl + "/feed/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                axios.get(localUrl + "/comments/feedComments/" + userId, {headers: {Authorization: `Bearer ${token}`}})
            ])
            .then(axios.spread((favouritesResponse, profileResponse, currentUserResponse, 
                friendsResponse, feedResponse, feedCommentsResponse)=> {
                if(favouritesResponse.data){
                    this.setState({
                        favouriteTeams: favouritesResponse.data,
                        currentUser: currentUserResponse.data,
                        profileInfo: profileResponse.data,
                        currentIsProfile: false,
                        friends: friendsResponse.data,
                        feed: feedResponse.data,
                        feedComments: feedCommentsResponse.data,
                    })
                }
                else {
                    this.setState({
                        currentUser: currentUserResponse.data,
                        profileInfo: profileResponse.data,
                        currentIsProfile: false,
                        friends: friendsResponse.data,
                        feed: feedResponse.data,
                        feedComments: feedCommentsResponse.data,
                    })
                    
                } 
            
                return axios.all([
                    axios.get(localUrl + "/friends/isFriend/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                    axios.get(localUrl + "/requests/isRequestSent/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                    axios.get(localUrl + "/requests/isRequestReceived/" + userId, {headers: {Authorization: `Bearer ${token}`}})
                ])
            }))
            .then(axios.spread((isFriendResponse, isSentResponse, isRecievedResponse) => {
    
                this.setState({
                    isFriend: isFriendResponse.data.isFriend,
                    isRequestSent: isSentResponse.data.isRequestSent,
                    isRequestReceived: isRecievedResponse.data.isRequestReceived
                })
            }))
            .catch(error => {
                console.log(error)
            })
        }

        
    }

    componentDidUpdate(prevProps, _prevState) {
        
        const url = this.props.match.url;
        const previousUrl = prevProps && prevProps.match.url;

        if(url !== previousUrl) {
            this.props.taskUpdateUrl(this.props.match.url);
        }

        const token = sessionStorage.getItem("token");

        const userId = this.props.match.params.userId;
        const prevUserId = prevProps.match.params.userId;

        if(userId !== prevUserId) {

            socket.off("feedPostUpdate");
            socket.off("feedPostCommentUpdate");
            socket.off("friendRequestUpdate");
            socket.off("friendAcceptUpdate");

            if(!userId) {

                socket.on("feedPostUpdate", () => {
                
                    axios.get(localUrl + "/feed/currentUser", {headers: {Authorization: `Bearer ${token}`}})
                    .then(response => {
                        
                        this.setState({
                            feed: response.data
                        })
                    })
                })
                
                socket.on("feedPostCommentUpdate", () => {
                    axios.get(localUrl + "/comments/feedComments/currentUser", {headers: {Authorization: `Bearer ${token}`}})
                    .then(response => {
                        
                        this.setState({
                            feedComments: response.data
                        })
                    })
                })

                socket.on("friendRequestUpdate", () => {
                    axios.get(localUrl + "/requests", {headers: {Authorization: `Bearer ${token}`}})
                    .then(response => {
                        
                        this.setState({
                            requests: response.data
                        })
                    })
                })
    
                axios.get(localUrl + "/users", {headers: {Authorization: `Bearer ${token}`}})
                .then(response => {
    
                    this.setState({
                        currentUser: response.data,
                        profileInfo: response.data,
                        currentIsProfile: true
                    }, () => {
                        console.log(this.state.currentUser)
                    })
    
                    return axios.all([
                        axios.get(localUrl + "/favourites", {headers: {Authorization: `Bearer ${token}`}}),
                        axios.get(localUrl + "/friends", {headers: {Authorization: `Bearer ${token}`}}),
                        axios.get(localUrl + "/requests", {headers: {Authorization: `Bearer ${token}`}}),
                        axios.get(localUrl + "/feed/currentUser", {headers: {Authorization: `Bearer ${token}`}}),
                        axios.get(localUrl + "/comments/feedComments/currentUser", {headers: {Authorization: `Bearer ${token}`}})
                    ])
                })
                .then(axios.spread((favouritesResponse, friendsResponse, requestsResponse, feedResponse, feedCommentsResponse)=> {
                    console.log(favouritesResponse, friendsResponse, feedResponse, feedCommentsResponse)
                    if(favouritesResponse.data){
                        this.setState({
                            index: 0,
                            favouriteTeams: favouritesResponse.data,
                            friends: friendsResponse.data,
                            requests: requestsResponse.data,
                            feed: feedResponse.data,
                            feedComments: feedCommentsResponse.data,
                            isFriend: true
                        })
                    }
                    else {
                        this.setState({
                            index:0,
                            friends: friendsResponse.data,
                            requests: requestsResponse.data,
                            feed: feedResponse.data,
                            feedComments: feedCommentsResponse.data,
                            isFriend: true
                        })
                        
                    } 
                }))
                .catch(error => {
                    console.log(error)
                })
            }
            else {

                socket.on("feedPostUpdate", () => {
                
                    axios.get(localUrl + "/feed/" + userId, {headers: {Authorization: `Bearer ${token}`}})
                    .then(response => {
                        
                        this.setState({
                            feed: response.data
                        })
                    })
                });

                socket.on("feedPostCommentUpdate", () => {
                    axios.get(localUrl + "/comments/feedComments/"  + userId, {headers: {Authorization: `Bearer ${token}`}})
                    .then(response => {
                        
                        this.setState({
                            feedComments: response.data
                        })
                    })
                });

                socket.on("friendAcceptUpdate", () => {
                    console.log("it is working");
                    axios.all([
                        axios.get(localUrl + "/friends/isFriend/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                        axios.get(localUrl + "/friends/" + userId, {headers: {Authorization: `Bearer ${token}`}})
                    ])
                    .then(axios.spread((isFriendResponse, friendsResponse) => {
                        console.log(isFriendResponse.data, friendsResponse.data)
                        this.setState({
                            isFriend: isFriendResponse.data,
                            friends: friendsResponse.data
                        })
                    }))
                });

                axios.all([
                    axios.get(localUrl + "/favourites/user/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                    axios.get(localUrl + "/users/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                    axios.get(localUrl + "/users", {headers: {Authorization: `Bearer ${token}`}}),
                    axios.get(localUrl + "/friends/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                    axios.get(localUrl + "/feed/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                    axios.get(localUrl + "/comments/feedComments/" + userId, {headers: {Authorization: `Bearer ${token}`}})
                ])
                .then(axios.spread((favouritesResponse, profileResponse, currentUserResponse, 
                    friendsResponse, feedResponse, feedCommentsResponse)=> {
                    if(favouritesResponse.data){
                        this.setState({
                            index: 0,
                            favouriteTeams: favouritesResponse.data,
                            currentUser: currentUserResponse.data,
                            profileInfo: profileResponse.data,
                            currentIsProfile: false,
                            friends: friendsResponse.data,
                            feed: feedResponse.data,
                            feedComments: feedCommentsResponse.data,
                        })
                    }
                    else {
                        this.setState({
                            index: 0,
                            currentUser: currentUserResponse.data,
                            profileInfo: profileResponse.data,
                            currentIsProfile: false,
                            friends: friendsResponse.data,
                            feed: feedResponse.data,
                            feedComments: feedCommentsResponse.data,
                        })
                        
                    } 
                
                    return axios.all([
                        axios.get(localUrl + "/friends/isFriend/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                        axios.get(localUrl + "/requests/isRequestSent/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                        axios.get(localUrl + "/requests/isRequestReceived/" + userId, {headers: {Authorization: `Bearer ${token}`}})
                    ])
                }))
                .then(axios.spread((isFriendResponse, isSentResponse, isRecievedResponse) => {
        
                    this.setState({
                        isFriend: isFriendResponse.data.isFriend,
                        isRequestSent: isSentResponse.data.isRequestSent,
                        isRequestReceived: isRecievedResponse.data.isRequestReceived
                    })
                }))
                .catch(error => {
                    console.log(error)
                })
            }
        } 
        else {

            const {index, favouriteTeams, pastEvents, articles} = this.state;

            if(index < favouriteTeams.length) {

                const teamId = favouriteTeams[index].idTeam;
                const teamName = favouriteTeams[index].strTeam;

                setTimeout(axios.all([
                    axios.get("https://www.thesportsdb.com/api/v1/json/40130162/eventslast.php?id=" + teamId),
                    axios.get("https://gnews.io/api/v4/search?q=" + teamName + "&token=" + API__KEY + "&lang=en")
                ]).then(axios.spread((pastEventsResponse, teamNewsResponse) => {

                    let newPastEvents = pastEventsResponse.data.results;
                    let newArticles = teamNewsResponse.data.articles;

                    newPastEvents = newPastEvents.map(event => {
                        const {strHomeTeam, strAwayTeam, intHomeScore, intAwayScore, dateEvent, strVideo, strFilename} = event;
                        return {strHomeTeam, strAwayTeam, intHomeScore, intAwayScore, dateEvent, strVideo, strFilename};
                    })

                    newArticles = newArticles.map(article => {
                        const {title, image, url} = article;
                        return {title, image, url};
                    })
                    
                    this.setState({
                        index: index + 1,
                        pastEvents: [...pastEvents, ...newPastEvents],
                        articles: [...articles, ...newArticles]
                    })
                })) ,2000)

            }
        }
    }

    componentWillUnmount() {

        socket.off("feedPostUpdate");
        socket.off("feedPostCommentUpdate");
        socket.off("friendRequestUpdate");
        socket.off("friendAcceptUpdate");
    }

    taskDisplayTeam = (teamId) => {
        axios.get("https://www.thesportsdb.com/api/v1/json/40130162/lookupteam.php?id=" + teamId)
        .then(response => {
            const selectedTeam = response.data.teams[0];

            this.setState({
                selectedTeam: selectedTeam,
                detailsEnabled: true
            })
        })
    }

    taskEndDisplayTeam = () => {
        
        this.setState({
            detailsEnabled: false
        })
    }

    taskUpdateFavourites = () => {

        const token = sessionStorage.getItem("token");

        axios.get(localUrl + "/favourites", {headers: {Authorization: `Bearer ${token}`}})
        .then(response => {
            
            if(response.data){
                this.setState({
                    favouriteTeams: response.data
                })
            }
            else {
                this.setState({
                    favouriteTeams: []
                })
            } 

        })
    }

    taskSendFriendRequest = () => {

        const {profileInfo} = this.state;

        const token = sessionStorage.getItem("token");
        const userId = profileInfo.userId;

        axios.post(localUrl + '/requests', {userId}, {headers: {Authorization: `Bearer ${token}`}})
        .then(_response => {
            
            this.setState({
                isRequestSent: true
            }, () => {

                socket.emit("friendRequest");
            })
        })
    }

    taskAcceptFriendRequest = () => {

        const {profileInfo} = this.state;

        const token = sessionStorage.getItem("token");
        const requestorId = profileInfo.userId;
        

        axios.post(localUrl + '/requests/acceptRequest', {requestorId}, {headers: {Authorization: `Bearer ${token}`}})
        .then(_response => {

            return axios.all([
                axios.get(localUrl + "/friends/" + requestorId, {headers: {Authorization: `Bearer ${token}`}}),
                axios.get(localUrl + "/requests/" + requestorId, {headers: {Authorization: `Bearer ${token}`}}),
            ])
            .then(axios.spread((friendsResponse, requestResponse) => {

                this.setState({
                    isFriend: true,
                    friends: friendsResponse.data,
                    requests: requestResponse.data
                }, () => {
    
                    socket.emit("friendAccept");
                })

            }))
        })
    }

    taskAddPost = (event) => {

        event.preventDefault();

        const {profileInfo} = this.state;
    
        const token = sessionStorage.getItem("token");

        const commentText = event.target.commentText.value;
        const contentType = "comment";
        const userId = profileInfo.userId;
        
        const commentData = {
            userId, 
            commentText, 
            contentType
        }
        
        axios.post(localUrl + "/feed", commentData, {headers: {Authorization: `Bearer ${token}`}})
        .then(response => {
            this.setState({
                feed: response.data
            }, () => {
                event.target.reset();

                socket.emit("feedPost", {feed: response.data});
            })
        })

    }

    taskAddCommentToPost = (event) => {

        event.preventDefault();

        const {profileInfo} = this.state;

        const token = sessionStorage.getItem("token");
        const userId = profileInfo.userId;

        const commentText = event.target.commentText.value;
        const contentId = event.target.contentId.value;
        const contentType = event.target.contentType.value;
        const receiverId = event.target.receiverId.value;

        const feedCommentData = {
            contentId, 
            contentType, 
            commentText, 
            receiverId
        }

        axios.post(localUrl + "/comments", feedCommentData, {headers: {Authorization: `Bearer ${token}`}})
        .then(_response => {

            return axios.get(localUrl + "/comments/feedComments/" + userId, {headers: {Authorization: `Bearer ${token}`}})
        })
        .then(response => {

            this.setState({
                feedComments: response.data
            }, () => {

                event.target.reset();
                socket.emit("feedPostComment", {feedComments: response.data})
            })
        })
    }

    taskTakeToGamePage = (idEvent) => {

        this.props.history.push('/game/' + idEvent);
    }

    render () {

        const {favouriteTeams, selectedTeam, detailsEnabled, 
            pastEvents, articles, profileInfo, currentUser, currentIsProfile, friends, requests, isFriend, 
            isRequestSent, isRequestReceived, feed, feedComments} = this.state;

        return(
            <main className="user">
                <div className="user__profile profile">
                    <Avatar 
                        className="profile__avatar" 
                        avatarUrl={profileInfo.imgUrl} 
                    />
                    <div className="profile__info">
                        <h3 className="profile__name">{profileInfo.name} {profileInfo.lastName}</h3>
                        <p className="profile__date">Joined {timeDifference(profileInfo.timestamp)}</p>
                        <p className="profile__description">{profileInfo.description}</p>
                        <div className="profile__location-container">
                            <img className="profile__location-icon" src={homeIcon} alt="location"/>
                            <p className="profile__location">Lives in <span className="profile__bold">{profileInfo.location}</span></p>
                        </div> 
                        <div className="profile__location-container">
                            <img className="profile__location-icon" src={locationIcon} alt="location"/>
                            <p className="profile__location">From <span className="profile__bold">{profileInfo.from}</span></p>
                        </div>
                        {!currentIsProfile && 
                            <div className="profile__info-buttons">
                                {isFriend === null
                                    ?
                                    <div></div>
                                    :
                                    <IsFriend 
                                        className=""
                                        isFriend={isFriend}
                                        isRequestSent={isRequestSent}
                                        isRequestReceived={isRequestReceived}
                                        taskSendFriendRequest={this.taskSendFriendRequest}
                                        taskAcceptFriendRequest={this.taskAcceptFriendRequest}
                                    />
                                }
                            </div>
                        }
                    </div>
                </div>
                {isFriend === null
                    ?
                    <div></div>
                    :
                    (isFriend === true
                        ?
                        <div className="user__profile-details">
                            <div className="user__interaction interaction">
                                <div className="interaction__favourites">
                                    {favouriteTeams.map(team => {
                                        return (
                                            <TeamCard 
                                                className="interaction__fav-card" 
                                                key={team.idTeam}
                                                taskDisplayTeam={this.taskDisplayTeam}
                                                strTeamBadge={team.strTeamBadge}
                                                teamId={team.idTeam} 
                                            />
                                        )
                                    })} 
                                </div>
                                <div className="interaction__feed-container">
                                    <div className="interaction__feed feed">
                                        <div className="feed__card">
                                            {currentIsProfile
                                            ?
                                            <FeedForm 
                                                className="feed__form"
                                                onSubmit={this.taskAddPost}
                                                profileUrl={currentUser.imgUrl}
                                                feedTitle={`${profileInfo.name}'s Feed`}
                                                placeholder={`What is on your mind?`}
                                            />
                                            :
                                            <FeedForm 
                                                className="feed__form"
                                                onSubmit={this.taskAddPost}
                                                profileUrl={currentUser.imgUrl}
                                                feedTitle={`${profileInfo.name}'s Feed`}
                                                placeholder={`Write something to ${profileInfo.name}...`}
                                            />
                                            }
                                        </div>
                                        {feed.map(feedContent => {
                                            return (
                                                <FeedCard 
                                                    className="feed__card"
                                                    key={feedContent.feedId}
                                                    feedContent={feedContent}
                                                    feedComments={feedComments}
                                                    taskTakeToGamePage={this.taskTakeToGamePage}
                                                    taskAddCommentToPost={this.taskAddCommentToPost}
                                                    userAvatar={currentUser.imgUrl}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="user__updates updates">
                                <div className="updates__container">
                                    {pastEvents.map(event => {
                                        return <EventScore key={event.idEvent} event={event} />
                                    })}
                                </div>
                                <div className="updates__container">
                                    {articles.map((article, i) => {
                                        return (
                                            <NewsArticle 
                                                className="updates__news-article" 
                                                key={i}
                                                newsArticle={article} 
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="user__friends friends">
                                <div className="friends__wrapper">
                                    <div className="friends__container">
                                        <h3 className="friends__title">Friends</h3>
                                        {friends.map(friend => {
                                            return(
                                                <Link key={friend.friendId} to={"/user/" + friend.friendId}>
                                                    <ProfileImage 
                                                        className="friends__avatar"
                                                        key={friend.friendId}
                                                        imgSrc={friend.imgUrl}
                                                    />
                                                </Link>
                                            )
                                        })}
                                    </div>
                                    <div className="friends__request-container">
                                        <h3 className="friends__title">Requests</h3>
                                        {requests.map(request => {
                                            return(
                                                <Link key={request.requestorId} to={"/user/" + request.requestorId}>
                                                    <ProfileImage 
                                                        key={request.requestorId}
                                                        className="friends__avatar"
                                                        imgSrc={request.imgUrl}
                                                    />
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            {detailsEnabled && 
                                <TeamDetails 
                                    team={selectedTeam} 
                                    taskEndDisplayTeam={this.taskEndDisplayTeam}
                                    taskUpdateFavourites={this.taskUpdateFavourites}
                                />
                            }
                        </div>
                        :
                        <div className="user__private private">
                            <div className="private__wrapper">
                                <img className="private__img" src={lockIcon} alt="lock"/>
                                <div className="private__card">    
                                    <h3 className="private__title">This Account is Private</h3>
                                    <p className="private__text">Send a friend request to this account to see their details.</p>
                                </div>
                            </div>
                        </div>
                    )
                }
                
                
            </main>
        )
    }
    
}

export default UserPage;