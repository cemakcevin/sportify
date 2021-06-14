import './TeamDetails.scss';
import React from 'react';
import axios from 'axios';

import EventScore from '../../components/EventScore/EventScore';
import VideoBox from '../../components/VideoBox/VideoBox';

class TeamDetails extends React.Component {

    state = {
        pastEvents: []
    }

    componentDidMount() {
        const {team} = this.props;
        const teamId = team.idTeam;

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
                </div>
            </section>
        )
    }  
}

export default TeamDetails;