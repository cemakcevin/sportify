import './GamePage.scss';
import React from 'react';
import axios from 'axios';

import VideoMain from '../../components/VideoMain/VideoMain';
import VideoInfo from '../../components/VideoInfo/VideoInfo';
import VideoBox from '../../components/VideoBox/VideoBox';

import videoWatchToEmbed from '../../functions/videoWatchToEmbed';

class GamePage extends React.Component {

    state = {
        strVideo: "",
        currentEvent: {},
        pastLeagueEvents: []
    }

    componentDidMount() {
        const videoId = "1036641"

        axios.get("https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?id=" + videoId)
        .then(response => {
            const currentEvent = response.data.events[0];
            const strVideo = currentEvent.strVideo && videoWatchToEmbed(currentEvent.strVideo)
            const leagueId = currentEvent.idLeague;

            this.setState({
                strVideo: strVideo,
                currentEvent: currentEvent
            })

            return axios.get("https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=" + leagueId)
        })
        .then(response => {
            const pastLeagueEvents = response.data.events;

            this.setState({
                pastLeagueEvents: pastLeagueEvents
            })
        })
    }

    render () {

        const {strVideo, currentEvent, pastLeagueEvents} = this.state;

        return (
            <main className="game">
                <VideoMain 
                    className="game__video"
                    videoSrc={strVideo}
                />
                <section className="game__info">
                    <div className="game__info-wrapper">
                        <VideoInfo 
                            className="game__video-info" 
                            currentEvent={currentEvent}
                        />
                        <div className="game__side-videos-container">
                        {pastLeagueEvents.map(event => {
                            return(
                                <VideoBox 
                                    key={event.idEvent}
                                    className="game__side-video"
                                    videoSrc={event.strVideo} 
                                    videoName={event.strFilename}
                                />)
                        })}
                    </div>
                    </div>
                </section>  
            </main>
        )
    }
}

export default GamePage;