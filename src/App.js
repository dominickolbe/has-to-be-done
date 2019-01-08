import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/Firebase';
import Login from './pages/Login';
import List from './pages/List';

const App = () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={List} />
      </Switch>
    </Router>
  </FirebaseContext.Provider>
);

export default App;
