import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { withFirebase } from '../Firebase';

class Todolist extends Component {
  state = {
    todos: [],
    newTodoValue: ''
  }

  componentDidMount() {
    this.props.firebase.getTodos().on('value', snapshot => {
      const todos = [];
      Object.entries(snapshot.val() || []).forEach(
        ([key, value]) => todos.push({ ...value, uuid: key })
      );
      this.setState({ todos });
    });
  }

  componentWillUnmount() {
    this.props.firebase.getTodos().off();
  }

  onClick = () => {
    const { newTodoValue } = this.state;
    this.props.firebase.addTodo({
      title: newTodoValue,
      created: moment().format(),
      done: false,
    });
    this.setState({ newTodoValue: '' });
  }

  onTodoChange = (todo, done) => {
    this.props.firebase.updateTodo(todo.uuid, { done });
  }

  render() {
    return (
      <div>
        <List component="nav">
          { this.state.todos.map((todo, key) => (
            <ListItem button key={key} onClick={e => this.onTodoChange(todo, !todo.done)}>
              <ListItemText primary={todo.title} />
              <ListItemSecondaryAction>
                <Checkbox
                  checked={todo.done}
                  onChange={e => this.onTodoChange(todo, e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}

        </List>

        <TextField
          id="name"
          label="Title"
          margin="normal"
          value={this.state.newTodoValue}
          onChange={e => this.setState({ newTodoValue: e.target.value })}
        />

        <Button color="secondary" onClick={this.onClick}>
          Add
        </Button>
      </div>
    );
  }
}

export default withFirebase(Todolist);
