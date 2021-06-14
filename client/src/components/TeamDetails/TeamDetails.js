import './TeamDetails.scss';
import React from 'react';
import axios from 'axios';

import EventScore from '../../components/EventScore/EventScore';
import VideoBox from '../../components/VideoBox/VideoBox';
import CommentForm from '../../components/CommentForm/CommentForm';

import cancelIcon from '../../assets/icons/cancel-icon.png'

const API__KEY="8b0979907442ae756bd39495fb5eebd0";

class TeamDetails extends React.Component {

    state = {
        pastEvents: [],
        teamNews: []
    }

    componentDidMount() {
        const {team} = this.props;
        
        const teamId = team.idTeam;
        const teamName = team.strTeam;

        // axios.all([
        //     axios.get("https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=" + teamId),
        //     axios.get("https://gnews.io/api/v4/search?q=" + teamName + "&token=" + API__KEY + "&lang=en")
        // ])
        // .then(axios.spread((pastEventsResponse, teamNewsResponse) => {
        //     const pastEvents = pastEventsResponse.data.results;
        //     const teamNews = teamNewsResponse.data.articles;

        //     this.setState({
        //         pastEvents: pastEvents,
        //         teamNews: teamNews
        //     })
            
        // }))
        // .catch(error => {
        //     console.log(error);
        // })

        axios.get("https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=" + teamId)
        .then(response => {
            const pastEvents = response.data.results;
            
            this.setState({
                pastEvents: pastEvents
            })
        })
    }


    render () {
        const {team} = this.props;
        const {pastEvents} = this.state;

        return (
            <section className="team">
                <div className="team__wrapper">
                    <div className="team__first-column">
                        <article className="team__card" >
                            <img className="team__card-img" src={team.strTeamBadge} alt="team" />
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
                        </div>
                        <div className="team__comments">
                            <CommentForm className="team__comments-form" />
                        </div>
                    </div>
                    <div className="team__third-column">
                        <div className="team__videos">
                           {pastEvents.map(event => {
                               return <VideoBox 
                                        videoSrc={event.strVideo} 
                                        videoName={event.strFilename}
                                       /> 
                           })} 
                        </div>
                    </div>
                    <img className="team__cancel-icon" src={cancelIcon} alt="cancel"/>
                </div>
            </section>
        )
    }  
}

export default TeamDetails;