import React, { Component } from 'react';
import styled from 'styled-components';
import orderBy from 'lodash/orderBy';
import moment from 'moment';
import { withFirebase } from '../Firebase';
import Button from '../Button';
import Input from '../Input';

const List = styled.div`
`;
const ListItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  transition: all 150ms ease;
  width: 100%;

  &.is-done span {
    text-decoration: line-through;
  }

  &:hover {
    background: #FFF;
  }
`;

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
      this.setState({
        todos: orderBy(todos, ['done', 'created'], ['asc', 'desc']),
      });
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
        <div className="col-9">
          <Input
            autoFocus
            value={this.state.newTodoValue}
            onChange={e => this.setState({ newTodoValue: e.target.value })}
          />
        </div>
        <div className="col-3">
          <Button onClick={this.onClick} full>
            Add
          </Button>
        </div>

        <div className="col-12">
          <List>
            { this.state.todos.map((todo, key) => (
              <ListItem
                key={key}
                className={todo.done ? 'is-done' : ''}
                onClick={e => this.onTodoChange(todo, !todo.done)}
              >
                <span>{todo.title}</span>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    );
  }
}

export default withFirebase(Todolist);
