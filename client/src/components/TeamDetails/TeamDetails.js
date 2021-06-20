import './TeamDetails.scss';
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import EventScore from '../../components/EventScore/EventScore';
import VideoBox from '../../components/VideoBox/VideoBox';
import CommentForm from '../../components/CommentForm/CommentForm';
import Comment from '../../components/Comment/Comment';
import NewsArticle from '../../components/NewsArticle/NewsArticle';
import VideoMain from '../../components/VideoMain/VideoMain';

import videoWatchToEmbed from '../../functions/videoWatchToEmbed';

import cancelIcon from '../../assets/icons/cancel-icon.png'
import followIcon from '../../assets/icons/follow-icon.png'
import unfollowIcon from '../../assets/icons/unfollow-icon.png'
import backIcon from '../../assets/icons/back-icon.png'
import expandIcon from '../../assets/icons/expand-icon.png'

const API__KEY="8b0979907442ae756bd39495fb5eebd0";
const localUrl = "http://localhost:8686";


class TeamDetails extends React.Component {

    state = {
        pastEvents: [],
        teamNews: [],
        teamComments: [],
        partOfFavourites: false,
        eventWatchedUrl: null,
        eventWatchedId: null,
        currentUser: {}
    }

    componentDidMount() {
        const {team} = this.props;
        const token = sessionStorage.getItem("token");
        
        const teamId = team.idTeam;
        const teamName = team.strTeam;

        axios.all([
            axios.get("https://www.thesportsdb.com/api/v1/json/40130162/eventslast.php?id=" + teamId),
            // axios.get("https://gnews.io/api/v4/search?q=" + teamName + "&token=" + API__KEY + "&lang=en"),
            axios.get(localUrl + "/comments/team/" + teamId, {headers: {Authorization: `Bearer ${token}`}}),
            axios.get(localUrl + "/favourites/" + teamId, {headers: {Authorization: `Bearer ${token}`}}),
            axios.get(localUrl + "/users" , {headers: {Authorization: `Bearer ${token}`}}),
        ])
        .then(axios.spread((pastEventsResponse, /*teamNewsResponse,*/ teamCommentsResponse, partOfFavouritesResponse, usersResponse) => {
            const pastEvents = pastEventsResponse.data.results;
            // const teamNews = teamNewsResponse.data.articles;
            const teamComments = teamCommentsResponse.data;
            const partOfFavourites = partOfFavouritesResponse.data.partOfFavourites;
            const currentUser = usersResponse.data;

            this.setState({
                pastEvents: pastEvents,
                // teamNews: teamNews,
                teamComments: teamComments,
                partOfFavourites: partOfFavourites,
                currentUser: currentUser
            })
            
        }))
        .catch(error => {
            console.log(error);
        })
    }

    taskAddToFavourites = () => {
        const token = sessionStorage.getItem("token");

        const {idTeam, strTeam, strTeamBadge} = this.props.team;
        const teamData = {
            idTeam,
            strTeam,
            strTeamBadge
        }

        axios.post(localUrl + "/favourites",
            teamData, 
            {headers: {
                Authorization: `Bearer ${token}`
            }
        })
          .then(response => {
            
            this.setState({
                partOfFavourites: true
            })
          })
          .catch(error => {
              console.log(error)
          })

    }

    taskRemoveFromFavourites = () => {
        const {idTeam} = this.props.team;
        const taskUpdateFavourites = this.props.taskUpdateFavourites;
        const token = sessionStorage.getItem("token");

        axios.delete(localUrl + "/favourites/" + idTeam, {headers: {Authorization: `Bearer ${token}`}})
        .then(_response => {
            
            if(taskUpdateFavourites) {
                this.setState({
                    partOfFavourites: false
                }, 
                () => {
                    taskUpdateFavourites();
                })
            }
            else {
                this.setState({
                    partOfFavourites: false
                })
            }
            
        })
        .catch(error => {

            console.log(error)
        })
    }

    taskSubmitComment = (event) => {

        event.preventDefault();

        const commentText = event.target.comment.value;
        const contentType = "team";
        const contentId = this.props.team.idTeam;
        const token = sessionStorage.getItem("token");

        const commentData = {
            contentId,
            contentType,
            commentText
        }

        axios.post(localUrl + "/comments", commentData, {headers: {Authorization: `Bearer ${token}`}})
        .then(_response => {
            
            return axios.get(localUrl + "/comments/" + contentType + "/" + contentId, {headers: {Authorization: `Bearer ${token}`}})
        })
        .then(response => {

            this.setState({
                teamComments: response.data
            })
        })
        .catch(error => {
            console.log(error);
        })

        event.target.reset();
    }

    taskSelectVideo = (eventId, videoUrl) => {

        const newVideoUrl = videoWatchToEmbed(videoUrl);

        this.setState({
            eventWatchedUrl: newVideoUrl,
            eventWatchedId: eventId
        })
    }

    taskDisableVideo = () => {
        this.setState({
            eventWatchedUrl: null,
            eventWatchedId: null
        })
    }

    render () {
        const {team, taskEndDisplayTeam} = this.props;
        const {pastEvents, teamNews, teamComments, partOfFavourites, eventWatchedUrl, eventWatchedId, currentUser} = this.state;

        return (
            <section className="team">
                <div className="team__wrapper">
                    <div className="team__first-column">
                        <article className="team__card" >
                            <img className="team__card-img" src={team.strTeamBadge} alt="team" />
                            {partOfFavourites 
                            ?
                            <img 
                                className="team__icon team__icon--bottom-right" 
                                src={unfollowIcon} 
                                alt="remove from favourites"
                                onClick={this.taskRemoveFromFavourites}
                            /> 
                            :
                            <img 
                                className="team__icon team__icon--bottom-right" 
                                src={followIcon} 
                                alt="add to favourites"
                                onClick={this.taskAddToFavourites}
                            /> 
                            }
                            
                        </article>
                        <div className="team__scores">
                            <h2 className="team__scores-title">Past Games</h2>
                            {pastEvents.map(event => {
                                
                                return <EventScore key={event.idEvent} event={event} />
                            })}
                        </div>
                    </div>
                    <div className="team__second-column">
                        <div className="team__news">
                            <h3 className="team__news-title">Top News</h3>
                            {teamNews.map(newsArticle => {
                                return (
                                    <NewsArticle 
                                        className="team__news-article" 
                                        newsArticle={newsArticle} 
                                    />
                                )
                                
                            })}
                        </div>
                        <div className="team__comments">
                            <CommentForm 
                                className="team__comments-form"
                                onSubmit={this.taskSubmitComment}
                                profileUrl={currentUser.imgUrl} 
                            />
                            {teamComments.map(comment => {
                                return(
                                    <Comment 
                                        key={comment.commentId}
                                        className= "team__comment"
                                        userId={comment.userId}
                                        name={comment.name}
                                        date={comment.timestamp}
                                        text={comment.commentText}
                                        profileUrl={comment.imgUrl}
                                    />)
                                })
                            }
                        </div>
                    </div>
                    <div className="team__third-column">
                        <div className="team__videos">
                           {pastEvents.map(event => {
                               return (
                                    <VideoBox 
                                        key={event.idEvent}
                                        videoSrc={event.strVideo} 
                                        videoName={event.strFilename}
                                        videoId={event.idEvent}
                                        onClick={this.taskSelectVideo}
                                    /> )
                           })} 
                        </div>
                    </div>
                    <img 
                        className="team__icon team__icon--top-right" 
                        src={cancelIcon} 
                        alt="cancel"
                        onClick={taskEndDisplayTeam}
                    />
                     {eventWatchedUrl && 
                        <div className="team__video-watched video-watched">
                            <VideoMain className="video-watched__video" videoSrc={eventWatchedUrl} />
                            <img 
                                className="video-watched__back-icon" 
                                src={backIcon} 
                                alt="back"
                                onClick={this.taskDisableVideo}
                            />
                            <Link className="video-watched__expand-icon-anchor" to={`/game/${eventWatchedId}`}>
                                <img 
                                    className="video-watched__expand-icon" 
                                    src={expandIcon} 
                                    alt="expand"
                                />  
                            </Link>
                        </div>
                    } 
                </div>
            </section>
        )
    }  
}

export default TeamDetails;