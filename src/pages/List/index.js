import React, { Component } from 'react';
import Todolist from '../../components/Todolist'
import withAuthorization from '../../components/Firebase/withAuthorization'

class List extends Component {
  render() {
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-4">
            <h1>{this.props.user.email}</h1>
            <Todolist />
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthorization(List);
