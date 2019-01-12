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
    realSelectedTodolist: null,
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

  onChangeTodo = (todoId, todo) => {
    this.props.firebase.updateTodo(this.state.selectedTodolist.uuid, todoId, todo);
  }

  onDeleteTodo = todoId => {
    if (window.confirm('Do you really want to delete it?')) {
      this.props.firebase.updateTodo(
        this.state.selectedTodolist.uuid,
        todoId, {
          deletedAt: moment().format(),
        }
      );
    }
  }

  onAddTodo = todo => {
    this.props.firebase.addTodo(this.state.selectedTodolist.uuid ,{
      createdAt: moment().format(),
      ...todo,
    });
  }

  onAddTodolist = () => {
    const title = prompt('Please enter todolist title');
    if (!title) return;
    this.props.firebase.createTodolist({
      title,
      created: moment().format(),
      todos: [],
    });
  }

  onTodolistNameChange = () => {
    const list = getListById(this.state.todolists, this.state.selectedTodolist);
    const title = window.prompt('Please enter todolist title', list.title);
    if (!title) return;
    this.props.firebase.updateTodolist(list.uuid, { title });
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
              onAddTodolist={this.onAddTodolist}
              onTodolistNameChange={this.onTodolistNameChange}
              onChange={e => this.setState({ selectedTodolist: e })}
            />
            <Todos
              todos={todos}
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
