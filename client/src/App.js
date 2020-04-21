import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Users from './components/Users';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/signin' />
          </Route>
          <Route exact path='/signup'>
            <div className='register'>
              <h1>Register:</h1>
              <RegisterForm />
            </div>
          </Route>
          <Route exact path='/signin'>
            <div className='login'>
              <h1>Login:</h1>
              <LoginForm />
            </div>
          </Route>
          <PrivateRoute exact path='/users' component={Users} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
