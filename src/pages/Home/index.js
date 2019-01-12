import React, { Component } from 'react';
import moment from 'moment';
import { withAuth } from '../../components/Firebase';
import Todos from '../../components/Todos';
import Todolists from '../../components/Todolists';
import { getListById } from '../../utils';

class Home extends Component {
  state = {
    todos: [],
    todolists: [],
    selectedTodolist: null,
  }

  componentDidMount() {
    this.props.firebase.getTodolists().on('value', snapshot => {
      const todolists = [];
      Object.entries(snapshot.val() || []).forEach(
        ([key, value]) => todolists.push({ ...value, uuid: key })
      );
      this.setState({
        todolists,
        selectedTodolist: todolists[0],
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.getTodos().off();
    this.props.firebase.getTodolists().off();
  }

  onTodoChange = (todoId, todo) => {
    const todolistId = this.state.selectedTodolist.uuid;
    this.props.firebase.updateTodo(todolistId, todoId, todo);
  }

  onTodoDelete = todoId => {
    if (window.confirm('Do you really want to delete it?')) {
      this.props.firebase.updateTodo(
        this.state.selectedTodolist.uuid,
        todoId, {
          deletedAt: moment().format(),
        }
      );
    }
  }

  onTodoAdd = todo => {
    this.props.firebase.addTodo(this.state.selectedTodolist.uuid ,{
      createdAt: moment().format(),
      ...todo,
    });
  }

  onTodolistAdd = () => {
    const title = prompt('Enter todolist title');
    if (!title) return;
    this.props.firebase.createTodolist({
      title,
      created: moment().format(),
      todos: [],
    });
  }

  onTodolistChange = () => {
    const todolist = this.state.selectedTodolist
    const title = window.prompt('Enter your new todolist title', todolist.title);
    if (!title) return;
    this.props.firebase.updateTodolist(todolist.uuid, { title });
  }

  render() {
    const { selectedTodolist } = this.state;
    if (!selectedTodolist) return null;

    const todos = selectedTodolist.todos || [];

    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <Todolists
              selectedTodolist={this.state.selectedTodolist}
              todolists={this.state.todolists}
              onTodolistAdd={this.onTodolistAdd}
              onTodolistChange={this.onTodolistChange}
              onSelectedTodolistChange={e => this.setState({ selectedTodolist: e })}
            />
            <Todos
              todos={todos}
              onTodoChange={this.onTodoChange}
              onTodoAdd={this.onTodoAdd}
              onTodoDelete={this.onTodoDelete}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Home);
