import './TeamCard.scss'

function TeamCard ({className, taskDisplayTeam, strTeamBadge, teamId}) {

    return (
        <article className={`${className} card`} onClick={() => taskDisplayTeam(teamId)}>
            <img className="card__img" src={strTeamBadge} alt="team" />
        </article>
    )
};

export default TeamCard;