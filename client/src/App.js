import './App.scss';
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage';

import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/search" exact component={SearchPage} />
          <Redirect to="/login"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
