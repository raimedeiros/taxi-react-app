import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'; // changed

import SignUp from './components/SignUp'; // new
import LogIn from './components/LogIn'; // new

import './App.css';

// changed
function App () {
  return (
    <Switch>
      <Route exact path='/' render={() => (
        <div>
          <h1>Taxi</h1>
          <Link to='/sign-up'>Sign up</Link>
          <Link to='/log-in'>Log in</Link>
        </div>
      )} />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/log-in' component={LogIn} />
    </Switch>
  );
}

export default App;