import React, { Component } from 'react';
import moment from 'moment';
import { withFirebase } from '../Firebase';
import Button from '../Button';
import Input from '../Input';

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
      <div className="row">
        <div className="col-8">
          <Input
            autoFocus
            value={this.state.newTodoValue}
            onChange={e => this.setState({ newTodoValue: e.target.value })}
          />
        </div>
        <div className="col-4">
          <Button onClick={this.onClick}>
            Add
          </Button>
        </div>
        {/* <List component="nav">
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

        </List> */}
      </div>
    );
  }
}

export default withFirebase(Todolist);
