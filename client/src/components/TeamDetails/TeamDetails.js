import './TeamDetails.scss';
import React from 'react';

class TeamDetails extends React.Component {


    render () {
        const {team} = this.props;

        return (
            <section className="team">
                <div className="team__wrapper">
                    <div className="team__first-column">
                        <article className="team__card" >
                            <img className="team__card-img" src={team.strTeamBadge} alt="team" />
                        </article>
                        <div className="team__scores">
    
                        </div>
                    </div>
                    <div className="team__second-column">
    
                    </div>
                    <div className="team__third-column">
    
                    </div>
                </div>
            </section>
        )
    }  
}

export default TeamDetails;