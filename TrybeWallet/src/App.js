import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Component } from 'react/cjs/react.production.min';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Notfound from './pages/Notfound';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/carteira" render={ (props) => <Wallet { ...props } /> } />
        <Route path="*" render={ (props) => <Notfound { ...props } /> } />
      </Switch>
    );
  }
}

export default App;
