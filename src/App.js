import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './styles/sanitize.css';
import { GlobalStyle } from './styles/global';

import { Home } from './components/Home/Home';
import { Login, LoginProvider } from './components/Login/Login';
import { CreateLiveCast } from './components/GoLive/CreateLiveCast';

function App() {
  return (
    <LoginProvider>
      <div className="App">
        <GlobalStyle />
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/:id" render={props => <Home {...props} />} />
            <Route exact path="/create/:id" component={CreateLiveCast} />
          </Switch>
        </BrowserRouter>
      </div>
    </LoginProvider>
  );
}

export default App;
