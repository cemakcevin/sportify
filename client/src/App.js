import './App.scss';
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage';
import GamePage from './pages/GamePage/GamePage';

import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/game/:gameId" component={GamePage} />
          <Redirect to="/login"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
