import './App.scss';
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';

import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
          <Route path="/login" component={LoginPage}/>
          <Redirect to="/login"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
