import './App.scss';
import React from 'react';
import axios from 'axios';
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage';
import GamePage from './pages/GamePage/GamePage';
import HomePage from './pages/HomePage/HomePage';

import Header from './components/Header/Header';

class App extends React.Component {

  state = {
    loggedIn: false
  }

  taskLogin = (event) => {
    
    event.preventDefault();
    
    const userName = event.target.userName.value;
    const password = event.target.password.value;
    
    const loginCredentials = {
      userName,
      password
    }

    axios.post("http://localhost:8686/login", loginCredentials)
    .then(response => {
      sessionStorage.setItem("token", response.data.token)
      
      this.setState({
        loggedIn: true
      })
      
    })
    .catch(error => {
      console.log(error);
    })

  }

  render() {

    const {loggedIn} = this.state;
    
    return (
      <BrowserRouter>
        <Header loggedIn={loggedIn} />
        <Switch>
            {!loggedIn && <Route path="/login" render={(routerProps) => <LoginPage taskLogin={this.taskLogin} {...routerProps}/> } />}
            <Route path="/home" component={HomePage}/>
            <Route path="/search" component={SearchPage} />
            <Route path="/game/:gameId" component={GamePage} />
            {loggedIn ? <Redirect to="/home"/> : <Redirect to="/login"/>}
        </Switch>
      </BrowserRouter>
    );
  } 
}

export default App;
