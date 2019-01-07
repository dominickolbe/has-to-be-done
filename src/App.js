import React, { Component } from 'react';
import Firebase, { FirebaseContext } from './components/Firebase';
import Todolist from './components/Todolist';

class App extends Component {
  render() {
    return (
      <FirebaseContext.Provider value={new Firebase()}>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-4">
              <Todolist />
            </div>
          </div>
        </div>
      </FirebaseContext.Provider>
    );
  }
}

export default App;
