import './HomePage.scss';
import React from 'react';

import Avatar from '../../components/Avatar/Avatar';

import avatarUrl from '../../assets/pictures/profile.jpeg';

class HomePage extends React.Component {


    state = {
        favouriteTeams:[]
    }

    componentDidMount() {
        
    }

    render () {

        return(
            <main className="home">
                <div className="home__profile profile">
                    <Avatar 
                        className="profile__avatar" 
                        avatarUrl={avatarUrl} 
                    />
                    <div className="profile__info">
    
                    </div>
                </div>
                <div className="home__interaction interaction">
                    <div className="interaction__favourites">
                        
                    </div>
                    <div className="interaction__feed-container">
                        <div className="interaction__feed feed">
    
                        </div>
                        <div className="interaction__news news">
    
                        </div>
                    </div>
                </div>
                <div className="home__updates updates">
                    <div className="updates__container">
                        
                    </div>
                    <div className="updates__container">
    
                    </div>
                </div>
                <div className="home__friends friends">
                    <div className="friends__wrapper">
                        <div className="friends__container">
                        
                        </div>
                        <div className="friends__container">
        
                        </div>
                    </div>
                </div>
            </main>
        )
    }
    
}

export default HomePage;