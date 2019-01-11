import React, { Component } from 'react';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import { withAuth } from '../../components/Firebase'
import Todolist from '../../components/Todolist'

class Home extends Component {
  state = {
    todos: [],
  }

  componentDidMount() {
    this.props.firebase.getTodos().on('value', snapshot => {
      const todos = [];
      Object.entries(snapshot.val() || []).forEach(
        ([key, value]) => todos.push({ ...value, uuid: key })
      );
      this.setState({
        todos: orderBy(todos, ['created'], ['desc']),
       });
    });
  }

  componentWillUnmount() {
    this.props.firebase.getTodos().off();
  }

  onChangeTodo = (uuid, todo) => {
    this.props.firebase.updateTodo(uuid, todo);
  }

  onAddTodo = () => {
    this.props.firebase.addTodo({
      title: '',
      created: moment().format(),
      done: false,
    });
  }

  onAddTodolist = () => {
    const title = prompt('Please enter todolist title');
    title && this.props.firebase.createTodolist({
      title,
      created: moment().format(),
    });
  }

  onDeleteTodo = uuid => {
    this.props.firebase.deleteTodo(uuid);
  }

  render() {
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <Todolist
              todos={this.state.todos}
              onChangeTodo={this.onChangeTodo}
              onAddTodo={this.onAddTodo}
              onDeleteTodo={this.onDeleteTodo}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Home);
