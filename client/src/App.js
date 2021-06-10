import './App.scss';
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/login" component={LoginPage}/>
          <Redirect to="/login"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
