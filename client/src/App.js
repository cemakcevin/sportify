import './App.scss';
import React from 'react';
import axios from 'axios';
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage';
import GamePage from './pages/GamePage/GamePage';
import UserPage from './pages/UserPage/UserPage';

import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';

const token = sessionStorage.getItem("token");
const localUrl = "http://localhost:8686"

class App extends React.Component {

  state = {
    loggedIn: null,
    currentUser: null,
    url: ""
  }

  componentDidMount() {
    

    //checking if logged in
    if(token) {

      axios.get(localUrl + "/users", {headers: {Authorization: `Bearer ${token}`}})
      .then(response => {

        this.setState({
          loggedIn: true,
          currentUser: response.data
        })

      })
    }
    else {

      this.setState({
        loggedIn: false
      })
    }

  }

  taskLogin = (event) => {
    
    event.preventDefault();
    
    const userName = event.target.userName.value;
    const password = event.target.password.value;
    
    const loginCredentials = {
      userName,
      password
    }

    axios.post(localUrl + "/login", loginCredentials)
    .then(response => {
      const token = response.data.token;
      sessionStorage.setItem("token", token);
      
      return axios.get(localUrl + "/users", {headers: {Authorization: `Bearer ${token}`}})
    })
    .then(response => {
      
      this.setState({
        loggedIn: true,
        currentUser: response.data
      })
    })
    .catch(error => {

      console.log(error);
    })

  }

  taskUpdateUrl = (url) => {

    this.setState({
      url: url
    })

  }

  render() {

    const {loggedIn, currentUser, url} = this.state;
    
    return (
      <BrowserRouter>
        <Header 
          loggedIn={loggedIn} 
          imgUrl={currentUser && currentUser.imgUrl} 
          url={url}
        />
        {loggedIn === null 
        ? 
        <Loading />
        :
        <Switch>
            {!loggedIn && <Route path="/login" render={(routerProps) => <LoginPage taskLogin={this.taskLogin} {...routerProps}/> } />}
            {loggedIn && <Route path="/home" render={(routerProps) => <UserPage taskUpdateUrl={this.taskUpdateUrl} {...routerProps}/> } />}
            {loggedIn && <Route path="/user/:userId" render={(routerProps) => <UserPage taskUpdateUrl={this.taskUpdateUrl} {...routerProps}/> } />}
            {loggedIn && <Route path="/search" render={(routerProps) => <SearchPage taskUpdateUrl={this.taskUpdateUrl} {...routerProps}/> } />}
            {loggedIn && <Route path="/game/:videoId" render={(routerProps) => <GamePage taskUpdateUrl={this.taskUpdateUrl} {...routerProps}/> } />}
            {loggedIn ? <Redirect to="/home"/> : <Redirect to="/login"/>}
        </Switch>
        }
      </BrowserRouter>
    );
  } 
}

export default App;
