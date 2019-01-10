import React, { Component } from 'react';
import styled from 'styled-components';
import orderBy from 'lodash/orderBy';
import moment from 'moment';
import { withFirebase } from '../Firebase';
import Button from '../Button';
import Card from '../Card';
import Input from '../Input';

const TodoRow = styled.div`
  align-items: center;
  display: flex;
  height: 45px;
  white-space: nowrap;
  width: 100%;

  .doneButton {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 45px;
  }

  .check-icon {
    color: #4E87EC;
    height: 19px;
    width: 17px;
    svg {
      width: 100%;
    }
  }

  .title {
    color: #202124;
    border: none;
    border-bottom: 1px solid #E0E0E0;
    font-size: 14px;
    height: 45px;
    flex-grow: 1;
    /* transition: color .2s ease-in-out; */
    position: relative;
    outline: none;
  }
  &.isDone {
    .title {
      text-decoration: line-through;
    }
  }
`;

class Todolist extends Component {
  state = {
    todos: [],
    todolists: [],
    newTodoValue: ''
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
    this.props.firebase.getTodolists().on('value', snapshot => {
      const todolists = [];
      Object.entries(snapshot.val() || []).forEach(
        ([key, value]) => todolists.push({ ...value, uuid: key })
      );
      this.setState({
        todolists: orderBy(todolists, ['created'], ['desc']),
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.getTodos().off();
  }

  addTodo = () => {
    const { newTodoValue } = this.state;
    this.props.firebase.addTodo({
      title: newTodoValue,
      created: moment().format(),
      done: false,
    });
    this.setState({ newTodoValue: '' });
  }

  addTodolist = () => {
    const title = prompt('Please enter list title');
    title && this.props.firebase.createTodolist({
      title,
      created: moment().format(),
    });
  }

  onChange = (uuid, obj) => {
    this.props.firebase.updateTodo(uuid, obj);
  }

  onDelete = uuid => {
    this.props.firebase.deleteTodo(uuid);
  }

  render() {
    return (
      <div className="row">

        <div className="col-12">
          <Card
            title="default"
          >
            { this.state.todos.map((todo, key) => (
              !todo.todolistId && <TodoRow
                key={todo.uuid}
                className={todo.done ? 'isDone' : ''}
              >
                <div
                  className="doneButton"
                  onClick={e => this.onChange(todo.uuid, { done: !todo.done })}
                >
                  {todo.done && <div className="check-icon">
                    <svg aria-hidden="true" data-prefix="fal" data-icon="check" role="img" viewBox="0 0 448 512">
                      <path fill="currentColor" d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z" />
                    </svg>
                  </div>}
                </div>
                <input
                  className="title"
                  type="text"
                  defaultValue={todo.title}
                  onBlur={e => this.onChange(todo.uuid, { title: e.target.value })}
                />
              </TodoRow>
            ))}
          </Card>

          {/* { this.state.todolists.map((todolist, key) => (
            <Card
              title={todolist.title.toUpperCase()}
              key={todolist.uuid}
            >
              { this.state.todos.map((todo, key) => (
                todolist.uuid === todo.todolistId && <TodoRow
                  key={todo.uuid}
                  className={todo.done ? 'isDone' : ''}
                  onClick={e => this.onChange(todo.uuid, { done: !todo.done })}
                >
                  <div className="title">{todo.title}</div>
                </TodoRow>
              ))}
            </Card>
          ))} */}
        </div>

        <div className="col-2">
          <button onClick={this.addTodolist}>new list</button>
        </div>

        <div className="col-9">
          <Input
            autoFocus
            value={this.state.newTodoValue}
            onChange={e => this.setState({ newTodoValue: e.target.value })}
            onKeyPress={e => e.key === 'Enter' ? this.addTodo() : null}
          />
        </div>
        <div className="col-3">
          <Button onClick={this.addTodo} full>
            Add
          </Button>
        </div>

        {/* <div className="col-12">
          <List>
            { this.state.todos.map((todo, key) => (
              <ListItem
                key={todo.uuid}
                className={todo.done ? 'is-done' : ''}
              >
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={e => this.onChange(todo.uuid, { done: !todo.done })}
                />
                <input
                  type="text"
                  defaultValue={todo.title}
                  onBlur={e => this.onChange(todo.uuid, { title: e.target.value })}
                />
                <button onClick={e => this.onDelete(todo.uuid)}>delete</button>
              </ListItem>
            ))}
          </List>
        </div> */}
      </div>
    );
  }
}

export default withFirebase(Todolist);
