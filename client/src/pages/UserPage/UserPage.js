import './UserPage.scss';
import React from 'react';
import axios from 'axios';

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


const API__KEY="8b0979907442ae756bd39495fb5eebd0";
const localUrl = "http://localhost:8686";


class UserPage extends React.Component {


    state = {
        index: 0,
        favouriteTeams:[],
        selectedTeam: null,
        detailsEnabled: false,
        pastEvents: [],
        articles: [],
        profileInfo: {},
        friends: [],
        isFriend: null,
        isRequestSent: false,
        isRequestReceived: false,
        feed: []
    }

    componentDidMount() {
        const token = sessionStorage.getItem("token");
        const userId = this.props.match.params.userId;

        axios.all([
            axios.get(localUrl + "/favourites/user/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
            axios.get(localUrl + "/users/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
            axios.get(localUrl + "/friends/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
            axios.get(localUrl + "/feed/" + userId, {headers: {Authorization: `Bearer ${token}`}})
        ])
        .then(axios.spread((favouritesResponse, profileResponse, friendsResponse, feedResponse)=> {
            if(favouritesResponse.data){
                this.setState({
                    favouriteTeams: favouritesResponse.data,
                    profileInfo: profileResponse.data,
                    friends: friendsResponse.data,
                    feed: feedResponse.data
                })
            }
            else {
                this.setState({
                    profileInfo: profileResponse.data,
                    friends: friendsResponse.data,
                    feed: feedResponse.data
                })
                
            } 
        
            return axios.all([
                axios.get(localUrl + "/friends/isFriend/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                axios.get(localUrl + "/requests/isRequestSent/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
                axios.get(localUrl + "/requests/isRequestReceived/" + userId, {headers: {Authorization: `Bearer ${token}`}})
            ])
        }))
        .then(axios.spread((isFriendResponse, isSentResponse, isRecievedResponse) => {
            console.log(isFriendResponse, isSentResponse, isRecievedResponse);

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

    componentDidUpdate() {
        const {index, favouriteTeams, pastEvents, articles} = this.state;

        console.log(index)
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

                // const {strHomeTeam, strAwayTeam, intHomeScore, intAwayScore, dateEvent, strVideo, strFilename} = pastEventsResponse.data.results;
                // const {title, image, url} = teamNewsResponse.data.articles;

                // const newPastEvents = {strHomeTeam, strAwayTeam, intHomeScore, intAwayScore, dateEvent, strVideo, strFilename};
                // const newArticles = {title, image, url};

                this.setState({
                    index: index + 1,
                    pastEvents: [...pastEvents, ...newPastEvents],
                    articles: [...articles, ...newArticles]
                })
            })) ,1000)
            

        }
        
        
        
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

        const token = sessionStorage.getItem("token");
        const userId = this.props.match.params.userId;

        axios.post(localUrl + '/requests', {userId}, {headers: {Authorization: `Bearer ${token}`}})
        .then(_response => {
            
            this.setState({
                isRequestSent: true
            })
        })
    }

    taskAcceptFriendRequest = () => {

        const token = sessionStorage.getItem("token");
        const requestorId = this.props.match.params.userId;

        axios.post(localUrl + '/requests/acceptRequest', {requestorId}, {headers: {Authorization: `Bearer ${token}`}})
        .then(_response => {

            this.setState({
                isFriend: true
            })
        })
    }

    taskAddPost = (event) => {

        event.preventDefault();
    
        const token = sessionStorage.getItem("token");

        const commentText = event.target.commentText.value;
        const contentType = "comment";
        const userId = this.props.match.params.userId;
        
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
            })
        })

    }

    render () {

        const {favouriteTeams, selectedTeam, detailsEnabled, 
            pastEvents, articles, profileInfo, friends, isFriend, 
            isRequestSent, isRequestReceived, feed} = this.state;


            console.log(isFriend);

        return(
            <main className="user">
                <div className="user__profile user-profile">
                    <Avatar 
                        className="user-profile__avatar" 
                        avatarUrl={profileInfo.imgUrl} 
                    />
                    <div className="user-profile__info">
                        <div>Just Text</div>
                        <div className="user-profile__info-buttons">
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
                    </div>
                </div>
                {isFriend === null
                    ?
                    <div></div>
                    :
                    (isFriend === true
                        ?
                        <div className="user__profile-details">
                            <div className="user__interaction user-interaction">
                                <div className="interaction__favourites">
                                    {favouriteTeams.map(team => {
                                        return (
                                            <TeamCard 
                                                className="user-interaction__fav-card" 
                                                taskDisplayTeam={this.taskDisplayTeam}
                                                strTeamBadge={team.strTeamBadge}
                                                teamId={team.idTeam} 
                                            />
                                        )
                                    })} 
                                </div>
                                <div className="user-interaction__feed-container">
                                    <div className="user-interaction__feed feed">
                                        <div className="feed__card">
                                            <FeedForm 
                                                className="feed__form"
                                                onSubmit={this.taskAddPost}
                                                profileUrl={profileInfo.imgUrl}
                                                feedTitle={`${profileInfo.name}'s Feed`}
                                                placeholder={`Write something to ${profileInfo.name}...`}
                                            />
                                        </div>
                                        {feed.map(feedContent => {
                                            return (
                                                <FeedCard 
                                                    className="feed__card"
                                                    feedContent={feedContent}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="user__updates user-updates">
                                <div className="user-updates__container">
                                    {pastEvents.map(event => {
                                        return <EventScore event={event} />
                                    })}
                                </div>
                                <div className="user-updates__container">
                                    {articles.map(article => {
                                        return (
                                            <NewsArticle 
                                                className="team__news-article" 
                                                newsArticle={article} 
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="user__friends user-friends">
                                <div className="user-friends__wrapper">
                                    <div className="user-friends__container">
                                        <h3 className="friends__title">Friends</h3>
                                        {friends.map(friend => {
                                            return(
                                                <ProfileImage 
                                                    key={friend.userId}
                                                    className="user-friends__avatar"
                                                    imgSrc={friend.imgUrl}
                                                />
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
                        <div className="user__private user-private">
                            <div className="user-private__wrapper">
                                <img className="user-private__img" src={lockIcon} alt="lock"/>
                                <div className="user-private__card">    
                                    <h3 className="user-private__title">This Account is Private</h3>
                                    <p className="user-private__text">Send a friend request to this account to see their details.</p>
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