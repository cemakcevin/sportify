import './UserPage.scss';
import React from 'react';
import axios from 'axios';

import Avatar from '../../components/Avatar/Avatar';
import TeamCard from '../../components/TeamCard/TeamCard';
import TeamDetails from '../../components/TeamDetails/TeamDetails';
import EventScore from '../../components/EventScore/EventScore';
import NewsArticle from '../../components/NewsArticle/NewsArticle';
import ProfileImage from '../../components/ProfileImage/ProfileImage';


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
        requests: []
    }

    componentDidMount() {
        const token = sessionStorage.getItem("token");
        const userId = this.props.match.params.userId;
    

        axios.all([
            axios.get(localUrl + "/favourites/user/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
            axios.get(localUrl + "/users/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
            axios.get(localUrl + "/friends/" + userId, {headers: {Authorization: `Bearer ${token}`}}),
            axios.get(localUrl + "/requests/" + userId, {headers: {Authorization: `Bearer ${token}`}})
        ])
        .then(axios.spread((favouritesResponse, profileResponse, friendsResponse, requestsResponse)=> {
            if(favouritesResponse.data){
                this.setState({
                    favouriteTeams: favouritesResponse.data,
                    profileInfo: profileResponse.data,
                    friends: friendsResponse.data,
                    requests: requestsResponse.data
                })
            }
            else {
                this.setState({
                    profileInfo: profileResponse.data,
                    friends: friendsResponse.data,
                    requests: requestsResponse.data
                })
            }  
        }))
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

    render () {

        const {favouriteTeams, selectedTeam, detailsEnabled, pastEvents, articles, profileInfo, friends, requests} = this.state;

        return(
            <main className="home">
                <div className="home__profile profile">
                    <Avatar 
                        className="profile__avatar" 
                        avatarUrl={profileInfo.imgUrl} 
                    />
                    <div className="profile__info">
    
                    </div>
                </div>
                <div className="home__interaction interaction">
                    <div className="interaction__favourites">
                        {favouriteTeams.map(team => {
                            return (
                                <TeamCard 
                                    className="interaction__fav-card" 
                                    taskDisplayTeam={this.taskDisplayTeam}
                                    strTeamBadge={team.strTeamBadge}
                                    teamId={team.idTeam} 
                                />
                            )
                        })} 
                    </div>
                    <div className="interaction__feed-container">
                        <div className="interaction__feed feed">
    
                        </div>
                        {/* <div className="interaction__news news">
    
                        </div> */}
                    </div>
                </div>
                <div className="home__updates updates">
                    <div className="updates__container">
                        {pastEvents.map(event => {
                            return <EventScore event={event} />
                        })}
                    </div>
                    <div className="updates__container">
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
                <div className="home__friends friends">
                    <div className="friends__wrapper">
                        <div className="friends__container">
                            <h3 className="friends__title">Friends</h3>
                            {friends.map(friend => {
                                return(
                                    <ProfileImage 
                                        key={friend.userId}
                                        className="friends__avatar"
                                        imgSrc={friend.imgUrl}
                                    />
                                )
                            })}
                        </div>
                        <div className="friends__request-container">
                            <h3 className="friends__title">Requests</h3>
                            {requests.map(request => {
                                return(
                                    <ProfileImage 
                                        key={request.requestorId}
                                        className="friends__avatar"
                                        imgSrc={request.imgUrl}
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
            </main>
        )
    }
    
}

export default UserPage;