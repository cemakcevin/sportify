import './GamePage.scss';
import React from 'react';
import axios from 'axios';

import VideoMain from '../../components/VideoMain/VideoMain';
import VideoInfo from '../../components/VideoInfo/VideoInfo';
import VideoBox from '../../components/VideoBox/VideoBox';

import videoWatchToEmbed from '../../functions/videoWatchToEmbed';

const localUrl = "http://localhost:8686";

class GamePage extends React.Component {

    state = {
        strVideo: "",
        currentEvent: {},
        pastLeagueEvents: [],
        videoComments:[]
    }

    componentDidMount() {

        const videoId = this.props.match.params.videoId;
        const token = sessionStorage.getItem("token");

        axios.all([
            axios.get("https://www.thesportsdb.com/api/v1/json/40130162/lookupevent.php?id=" + videoId),
            axios.get(localUrl + "/comments/game/" + videoId, {headers: {Authorization: `Bearer ${token}`}})   
        ])
        .then(axios.spread((responseEvent, responseComments) => {
            
            const currentEvent = responseEvent.data.events[0];
            const videoComments = responseComments.data;
            const strVideo = currentEvent.strVideo && videoWatchToEmbed(currentEvent.strVideo)
            const leagueId = currentEvent.idLeague;

            if(videoComments) {
                this.setState({
                    strVideo: strVideo,
                    currentEvent: currentEvent,
                    videoComments: videoComments
                })
            }
            else {
                this.setState({
                    strVideo: strVideo,
                    currentEvent: currentEvent,
                })
            }
            

            return axios.get("https://www.thesportsdb.com/api/v1/json/40130162/eventspastleague.php?id=" + leagueId)
        }))
        .then(response => {
            const pastLeagueEvents = response.data.events;

            this.setState({
                pastLeagueEvents: pastLeagueEvents
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {

        const videoId = this.props.match.params.videoId;
        const prevVideoId = prevProps.match.params.videoId;

        console.log(prevVideoId, "and", videoId)

        if(videoId !== prevVideoId) {
            
            const token = sessionStorage.getItem("token");

            axios.all([
                axios.get("https://www.thesportsdb.com/api/v1/json/40130162/lookupevent.php?id=" + videoId),
                axios.get(localUrl + "/comments/game/" + videoId, {headers: {Authorization: `Bearer ${token}`}})   
            ])
            .then(axios.spread((responseEvent, responseComments) => {
                
                const currentEvent = responseEvent.data.events[0];
                const videoComments = responseComments.data;
                const strVideo = currentEvent.strVideo && videoWatchToEmbed(currentEvent.strVideo)
                const leagueId = currentEvent.idLeague;
    
                if(videoComments) {
                    this.setState({
                        strVideo: strVideo,
                        currentEvent: currentEvent,
                        videoComments: videoComments
                    })
                }
                else {
                    this.setState({
                        strVideo: strVideo,
                        currentEvent: currentEvent,
                    })
                }
                
    
                return axios.get("https://www.thesportsdb.com/api/v1/json/40130162/eventspastleague.php?id=" + leagueId)
            }))
            .then(response => {
                let pastLeagueEvents = response.data.events;
    
                pastLeagueEvents = pastLeagueEvents.filter(event => {

                    if(event.idEvent === videoId) {
                        return false;
                    }

                    return true;
                })

                this.setState({
                    pastLeagueEvents: pastLeagueEvents
                })
            })
        }

        
    }

    taskSubmitComment = (event) => {

        event.preventDefault();

        const commentText = event.target.comment.value;
        const contentType = "game";
        const contentId = this.props.match.params.videoId;
        const token = sessionStorage.getItem("token");

        const commentData = {
            contentId,
            contentType,
            commentText
        }

        axios.post(localUrl + "/comments", commentData, {headers: {Authorization: `Bearer ${token}`}})
        .then(_response => {
            
            return axios.get(localUrl + "/comments/" + contentType + "/" + contentId, {headers: {Authorization: `Bearer ${token}`}})
        })
        .then(response => {

            this.setState({
                videoComments: response.data
            })
        })
        .catch(error => {
            console.log(error);
        })

        event.target.reset();

    }

    taskChangeVideo = (videoId, _videoSrc) => {
        this.props.history.push('/game/' + videoId)
    }

    render () {

        const {strVideo, currentEvent, pastLeagueEvents, videoComments} = this.state;

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
                            comments={videoComments}
                            taskSubmitComment={this.taskSubmitComment}
                        />
                        <div className="game__side-videos-container">
                        {pastLeagueEvents.map(event => {
                            return(
                                <VideoBox 
                                    key={event.idEvent}
                                    videoSrc={event.strVideo} 
                                    videoName={event.strFilename}
                                    videoId={event.idEvent}
                                    onClick={this.taskChangeVideo}
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