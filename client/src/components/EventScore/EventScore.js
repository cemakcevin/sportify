import './EventScore.scss';

import dateToString from '../../functions/dateToString';

function EventScore ({event}) {

    const {strHomeTeam, strAwayTeam, intHomeScore, intAwayScore, dateEvent} = event;

    return (
        <div className="score">
            <div className="score__container">
                <div className="score__team-container score__team-container--margin">
                    <p className="score__team-name">{strHomeTeam}</p>
                    <p className="score__team-score">{intHomeScore}</p>
                </div>
                <div className="score__team-container">
                    <p className="score__team-name">{strAwayTeam}</p>
                    <p className="score__team-score">{intAwayScore}</p>
                </div>
            </div>
            <div className="score__date-container">
                <p className="score__game-date">{dateToString(dateEvent)}</p>
            </div>  
        </div>
    )
}

export default EventScore;