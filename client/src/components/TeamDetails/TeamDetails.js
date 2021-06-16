import './TeamDetails.scss';
import React from 'react';
import axios from 'axios';

import EventScore from '../../components/EventScore/EventScore';
import VideoBox from '../../components/VideoBox/VideoBox';
import CommentForm from '../../components/CommentForm/CommentForm';
import Comment from '../../components/Comment/Comment';
import NewsArticle from '../../components/NewsArticle/NewsArticle';

import cancelIcon from '../../assets/icons/cancel-icon.png'
import followIcon from '../../assets/icons/follow-icon.png'

const API__KEY="8b0979907442ae756bd39495fb5eebd0";
const localUrl = "http://localhost:8686";
const token = sessionStorage.getItem("token");

const comments = [
    {
        "name": "Micheal Lyons",
        "comment": "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of acconcert I have EVER witnessed.",
        "id": "1ab6d9f6-da38-456e-9b09-ab0acd9ce818",
        "likes": 0,
        "timestamp": 1545162149000
    },
    {
        "name": "Gary Wong",
        "comment": "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
        "id": "cc6f173d-9e9d-4501-918d-bc11f15a8e14",
        "likes": 0,
        "timestamp": 1544595784046
    },
    {
        "name": "Theodore Duncan",
        "comment": "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!",
        "id": "993f950f-df99-48e7-bd1e-d95003cc98f1",
        "likes": 0,
        "timestamp": 1542262984046
    }
]

class TeamDetails extends React.Component {

    state = {
        pastEvents: [],
        teamNews: []
    }

    componentDidMount() {
        const {team} = this.props;
        
        const teamId = team.idTeam;
        const teamName = team.strTeam;

        axios.all([
            axios.get("https://www.thesportsdb.com/api/v1/json/40130162/eventslast.php?id=" + teamId),
            axios.get("https://gnews.io/api/v4/search?q=" + teamName + "&token=" + API__KEY + "&lang=en")
        ])
        .then(axios.spread((pastEventsResponse, teamNewsResponse) => {
            const pastEvents = pastEventsResponse.data.results;
            const teamNews = teamNewsResponse.data.articles;

            this.setState({
                pastEvents: pastEvents,
                teamNews: teamNews
            })
            
        }))
        .catch(error => {
            console.log(error);
        })
    }

    taskAddToFavourites = () => {

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
            console.log(response)
          })
          .catch(error => {
              console.log(error)
          })

    }


    render () {
        const {team, taskEndDisplayTeam} = this.props;
        const {pastEvents, teamNews} = this.state;

        return (
            <section className="team">
                <div className="team__wrapper">
                    <div className="team__first-column">
                        <article className="team__card" >
                            <img className="team__card-img" src={team.strTeamBadge} alt="team" />
                            <img 
                                className="team__icon team__icon--bottom-right" 
                                src={followIcon} 
                                alt="cancel"
                                onClick={() => this.taskAddToFavourites(team.idTeam, team.strTeam, team.strTeamBadge)}
                            /> 
                        </article>
                        <div className="team__scores">
                            <h2 className="team__scores-title">Past Games</h2>
                            {pastEvents.map(event => {
                                
                                return <EventScore event={event} />
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
                            <CommentForm className="team__comments-form" />
                            {comments.map(comment => {
                                return(
                                    <Comment 
                                        key={comment.id}
                                        className= "team__comment"
                                        name={comment.name}
                                        date={comment.timestamp}
                                        text={comment.comment}
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
                </div>
            </section>
        )
    }  
}

export default TeamDetails;