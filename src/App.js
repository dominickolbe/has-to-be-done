import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/Firebase';
import Login from './pages/Login';
import List from './pages/List';

const App = () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <>
        <main>
          <Route path='/login' component={Login} />
          <Route path='/list' component={List} />
        </main>
      </>
    </Router>
  </FirebaseContext.Provider>
);

export default App;
