import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/Firebase';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  </FirebaseContext.Provider>
);

export default App;
