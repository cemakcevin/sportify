import './SearchPage.scss';
import React from 'react';
import axios from 'axios';

import Input from '../../components/Input/Input';
import TeamDetails from '../../components/TeamDetails/TeamDetails';

import searchIcon from '../../assets/icons/search-icon.png';

class SearchPage extends React.Component {

    state = {
        searchedTeams: [],
        selectedTeam: null,
        detailsEnabled: false
    }

    taskSetTeams = (event) => {
        event.preventDefault();
        const teamName = event.target.teamName.value;
        
        axios.get("https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + teamName)
        .then(response => {
            
            this.setState({
                searchedTeams: response.data.teams,
            })
        })
    }

    taskDisplayTeam = (teamId) => {
        axios.get("https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=" + teamId)
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

    render() {

        const {searchedTeams, detailsEnabled, selectedTeam} = this.state;

        return (
            <main className="search">
                <div className="search__bar-column">
                    <form className="search__bar-form" onSubmit={this.taskSetTeams}>
                        <h1 className="search__bar-title">Search Your Team and Follow</h1>
                        <Input 
                            className="search__bar-input"
                            type="text"
                            placeholder="Search team by name..."
                            icon={searchIcon}
                            name="teamName"
                        />
                        <button className="search__button" type="submit">SEARCH</button>
                    </form>
                </div>
                <div className="search__result-column">
                    {searchedTeams.map(team => {

                        return(
                            <article className="search__result-card card" onClick={() => this.taskDisplayTeam(team.idTeam)}>
                                <img className="card__img" src={team.strTeamBadge} alt="team" />
                            </article>
                        )
                    })}
                </div>
                {detailsEnabled && 
                    <TeamDetails 
                        team={selectedTeam} 
                        taskEndDisplayTeam={this.taskEndDisplayTeam}
                    />
                }
            </main>
        )
    }
}

export default SearchPage;