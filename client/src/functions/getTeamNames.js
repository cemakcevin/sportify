
function getTeamNames(favTeams) {

    let finalString = ""

    for(let i = 0; i< favTeams.length ; i++) {
        if(i !== 0) {
            finalString += " OR " + favTeams[i].strTeam.toLowerCase();
        }
        else {
            finalString += favTeams[i].strTeam.toLowerCase();
        }
    }

    return finalString;

}

export default getTeamNames;