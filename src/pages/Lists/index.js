import React, { Component } from 'react';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import { withAuth } from '../../components/Firebase';
import Todos from '../../components/Todos';
import Todolists from '../../components/Todolists';
import { getListById, reorder } from '../../utils';

class Lists extends Component {
  state = {
    todolists: [],
    selectedTodolistId: null,
  }

  componentDidMount() {
    this.props.firebase.getTodolists().on('value', snapshot => {
      const todolists = [];
      Object.entries(snapshot.val() || []).forEach(
        ([key, value]) => todolists.push({ ...value, uuid: key })
      );
      this.setState(state => {
        const { selectedTodolistId } = state;
        return {
          todolists,
          selectedTodolistId: selectedTodolistId ? selectedTodolistId : todolists[0].uuid,
        }
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.getTodolists().off();
  }

  getTodos = () => {
    const selectedTodolist = getListById(this.state.todolists, this.state.selectedTodolistId);

    let todos = [];
    Object.entries(selectedTodolist.todos || []).forEach(([key, todo]) => {
      todos.push({
        ...todo,
        uuid: key,
      });
    });
    return orderBy(todos, ['index', 'createdAt'], ['asc', 'desc']);
  }

  onTodoChange = (todoId, todo) => {
    const { selectedTodolistId } = this.state;
    this.props.firebase.updateTodo(selectedTodolistId, todoId, todo);
  }

  onTodoDelete = todoId => {
    const { selectedTodolistId } = this.state;
    if (window.confirm('Do you really want to delete it?')) {
      this.props.firebase.updateTodo(
        selectedTodolistId,
        todoId, {
          deletedAt: moment().format(),
        }
      );
    }
  }

  onTodoAdd = async todo => {
    const { selectedTodolistId } = this.state;
    this.props.firebase.addTodo(
      selectedTodolistId ,
      {
        createdAt: moment().format(),
        ...todo,
        index: 0,
      }
    );
  }

  onTodolistAdd = async () => {
    const title = window.prompt('Enter todolist title');
    if (!title) return;
    const response = await this.props.firebase.createTodolist({
      title,
      created: moment().format(),
      todos: [],
    });
    this.setState({ selectedTodolistId: response.key });
  }

  onTodolistChange = () => {
    const { selectedTodolistId, todolists } = this.state;
    const { title } = getListById(todolists, selectedTodolistId);
    const newTitle = window.prompt('Enter your new todolist title', title);
    if (!newTitle) return;
    this.props.firebase.updateTodolist(selectedTodolistId, { title: newTitle });
  }

  onTodolistDelete = () => {
    const { selectedTodolistId } = this.state;
    if (window.confirm('Do you really want to delete it?')) {
      this.props.firebase.updateTodolist(
        selectedTodolistId,
        {
          deletedAt: moment().format(),
        }
      );
    }
  }

  onTodoIndexChange = e => {
    if (!e.destination) return;

    let todos = this.getTodos()
    const { selectedTodolistId } = this.state;
    todos = reorder(todos, e.source.index, e.destination.index);

    todos.forEach((todo, index) => {
      this.props.firebase.updateTodo(selectedTodolistId, todo.uuid, { index });
    });
  }

  render() {
    const { selectedTodolistId, todolists } = this.state;
    const selectedTodolist = getListById(todolists, selectedTodolistId);

    if (!selectedTodolist) return null;

    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <Todolists
              selectedTodolistId={selectedTodolistId}
              todolists={this.state.todolists}
              onTodolistAdd={this.onTodolistAdd}
              onTodolistChange={this.onTodolistChange}
              onTodolistDelete={this.onTodolistDelete}
              onSelectedTodolistChange={e => this.setState({ selectedTodolistId: e })}
            />
            <Todos
              todos={this.getTodos()}
              onTodoChange={this.onTodoChange}
              onTodoIndexChange={this.onTodoIndexChange}
              onTodoAdd={this.onTodoAdd}
              onTodoDelete={this.onTodoDelete}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Lists);
