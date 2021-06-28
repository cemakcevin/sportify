import './EventScore.scss';

import leftTriangleIcon from '../../assets/icons/left-triangle-icon.png';

import dateToString from '../../functions/dateToString';

function EventScore ({event}) {

    const {strHomeTeam, strAwayTeam, intHomeScore, intAwayScore, dateEvent} = event;

    let homeStatus, awayStatus;

    if(Number(intHomeScore) > Number(intAwayScore)) {
        homeStatus = true;
        awayStatus = false;
    }
    else {
        homeStatus = false;
        awayStatus = true;
    }

    return (
        <div className="score">
            <div className="score__container">
                <div className={`score__team-container score__team-container--margin ${homeStatus ? "score__team-container--bold" : ""}`}>
                    <p className="score__team-name">{strHomeTeam}</p>
                    <p className="score__team-score">{intHomeScore}</p>
                    {homeStatus && <img className="score__pointer-icon" src={leftTriangleIcon} alt="pointer" />}
                </div>
                <div className={`score__team-container ${awayStatus ? "score__team-container--bold" : ""}`}>
                    <p className="score__team-name">{strAwayTeam}</p>
                    <p className="score__team-score">{intAwayScore}</p>
                    {awayStatus && <img className="score__pointer-icon" src={leftTriangleIcon} alt="pointer" />}
                </div>
            </div>
            <div className="score__date-container">
                <p className="score__game-date">{dateToString(dateEvent)}</p>
            </div>  
        </div>
    )
}

export default EventScore;