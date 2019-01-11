import React, { Component } from 'react';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import { withAuth } from '../../components/Firebase';
import Todos from '../../components/Todos';
import Todolists from '../../components/Todolists';
import { filterDeleted, getListById } from '../../utils';

class Home extends Component {
  state = {
    todos: [],
    todolists: [],
    selectedTodolist: null,
  }

  componentDidMount() {
    this.props.firebase.getTodos().on('value', snapshot => {
      const todos = [];
      Object.entries(snapshot.val() || []).forEach(
        ([key, value]) => todos.push({ ...value, uuid: key })
      );
      this.setState({
        todos: orderBy(filterDeleted(todos), ['created'], ['desc']),
      });
    });
    this.props.firebase.getTodolists().on('value', snapshot => {
      const todolists = [];
      Object.entries(snapshot.val() || []).forEach(
        ([key, value]) => todolists.push({ ...value, uuid: key })
      );
      this.setState({
        todolists,
        selectedTodolist: todolists[0].uuid,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.getTodos().off();
    this.props.firebase.getTodolists().off();
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
    if (!title) return;
    this.props.firebase.createTodolist({
      title,
      created: moment().format(),
    });
  }

  onTodolistNameChange = () => {
    const list = getListById(this.state.todolists, this.state.selectedTodolist);
    const title = window.prompt('Please enter todolist title', list.title);
    if (!title) return;
    this.props.firebase.updateTodolist(list.uuid, { title });
  }

  onDeleteTodo = uuid => {
    if (window.confirm('Do you really want to delete it?')) {
      this.props.firebase.updateTodo(uuid, {
        deleted: moment().format(),
      });
    }
  }

  render() {
    const { todolists } = this.state;

    if (!todolists.length) return null;

    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <Todolists
              selectedTodolist={this.state.selectedTodolist}
              todolists={this.state.todolists}
              onAddTodolist={this.onAddTodolist}
              onTodolistNameChange={this.onTodolistNameChange}
              onChange={e => this.setState({ selectedTodolist: e })}
            />
            <Todos
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
