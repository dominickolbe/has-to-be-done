import React, { Component } from 'react';
import Todolist from '../../components/Todolist'
import withAuthorization from '../../components/Firebase/withAuthorization'

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <h1>Todos</h1>
            <Todolist />
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthorization(Home);
