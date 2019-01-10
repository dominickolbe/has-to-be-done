import React, { Component } from 'react';
import Todolist from '../../components/Todolist'
import NewTodolist from '../../components/NewTodolist'
import { withAuth } from '../../components/Firebase'

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <NewTodolist />
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Home);
