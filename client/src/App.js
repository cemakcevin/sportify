import './App.scss';
import React from 'react';
import axios from 'axios';
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage';
import GamePage from './pages/GamePage/GamePage';
import HomePage from './pages/HomePage/HomePage';
import UserPage from './pages/UserPage/UserPage';

import Header from './components/Header/Header';

const token = sessionStorage.getItem("token");
const localUrl = "http://localhost:8686"

class App extends React.Component {

  state = {
    loggedIn: false,
    currentUser: null
  }

  componentDidMount() {
    
    //checking if logged in
    if(token) {
      
      this.setState({
        loggedIn: true
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

  render() {

    const {loggedIn, currentUser} = this.state;
    
    return (
      <BrowserRouter>
        <Header loggedIn={loggedIn} imgUrl={currentUser && currentUser.imgUrl} />
        <Switch>
            {!loggedIn && <Route path="/login" render={(routerProps) => <LoginPage taskLogin={this.taskLogin} {...routerProps}/> } />}
            {loggedIn && <Route path="/home" component={HomePage}/> }
            {loggedIn && <Route path="/user/:userId" component={UserPage}/> }
            {loggedIn && <Route path="/search" component={SearchPage} /> }
            {loggedIn && <Route path="/game/:videoId" component={GamePage} /> }
            {loggedIn ? <Redirect to="/home"/> : <Redirect to="/login"/>}
        </Switch>
      </BrowserRouter>
    );
  } 
}

export default App;
