import React, { Component } from 'react';
import moment from 'moment';
import { withAuth } from '../../components/Firebase';
import Todos from '../../components/Todos';
import Todolists from '../../components/Todolists';
import { getListById } from '../../utils';

class Home extends Component {
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

  onTodoAdd = todo => {
    const { selectedTodolistId } = this.state;
    this.props.firebase.addTodo(
      selectedTodolistId ,
      {
        createdAt: moment().format(),
        ...todo,
      }
    );
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
    const { selectedTodolistId, todolists } = this.state;
    const { title } = getListById(todolists, selectedTodolistId);
    const newTitle = window.prompt('Enter your new todolist title', title);
    if (!newTitle) return;
    this.props.firebase.updateTodolist(selectedTodolistId, { title: newTitle });
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
              onSelectedTodolistChange={e => this.setState({ selectedTodolistId: e })}
            />
            <Todos
              todos={selectedTodolist.todos}
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
