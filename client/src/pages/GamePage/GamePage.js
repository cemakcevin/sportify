import './GamePage.scss';
import React from 'react';
import axios from 'axios';

import VideoMain from '../../components/VideoMain/VideoMain';
import VideoInfo from '../../components/VideoInfo/VideoInfo';

import videoWatchToEmbed from '../../functions/videoWatchToEmbed';

class GamePage extends React.Component {

    state = {
        strVideo: "",
        currentEvent: {}
    }

    componentDidMount() {
        const videoId = "1036641"

        axios.get("https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?id=" + videoId)
        .then(response => {
            const currentEvent = response.data.events[0];
            const strVideo = videoWatchToEmbed(currentEvent.strVideo)

            this.setState({
                strVideo: strVideo,
                currentEvent: currentEvent
            })
        })
    }

    render () {

        const {strVideo, currentEvent} = this.state;

        return (
            <main className="game">
                <VideoMain 
                    className="game__video"
                    videoSrc={strVideo}
                />
                <section className="game__info">
                    <VideoInfo 
                        className="game__video-info" 
                        currentEvent={currentEvent}
                    />
                </section>  
            </main>
        )
    }
}

export default GamePage;