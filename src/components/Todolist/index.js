import React from 'react';
import styled from 'styled-components';

import deleteIcon from './img/delete.svg';
import doneIcon from './img/done.svg';
import circleIcon from './img/circle.svg';

const Container = styled.div`
  h1 {
    font-size: 1.5em;
    margin-bottom: 15px;
    padding-left: 45px;
  }
`;

const TodoRow = styled.div`
  align-items: center;
  display: flex;
  height: 48px;
  white-space: nowrap;
  transition: all 200ms ease-in-out;
  position: relative;
  width: 100%;

  &:focus-within {
    background: #F8F9FA;

    .todo-action {
      img {
        opacity: 1;
      }
    }

    &:after {
      left: 0;
      width: 100%;
    }
  }

  &:after {
    content: '';
    background: #4688F1;
    bottom: 0;
    left: 50%;
    height: 2px;
    position: absolute;
    transition: all 200ms ease-in-out;
    width: 0%;
  }

  input.todo-title {
    background: transparent;
    border: none;
    border-bottom: 1px solid #E0E0E0;
    font-size: 15px;
    height: 48px;
    flex-grow: 1;
    position: relative;
    outline: none;
  }

  &.is-done {
    input.todo-title {
      text-decoration: line-through;
    }
  }

  .todo-action, .todo-staus {
    cursor: pointer
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    transition: all 200ms ease-in-out;
    width: 48px;
    img {
      transition: all 200ms ease-in-out;
    }
  }

  .todo-action {
    border-bottom: 1px solid #E0E0E0;
    img {
      opacity: 0;
    }
  }
`;

const Todolist = ({ todos, onChangeTodo, onAddTodo, onDeleteTodo }) => {

  return (
    <Container>
      <h1>My tasks</h1>
      <div>
        {todos.map((todo) => (
          <TodoRow
            key={todo.uuid}
            className={todo.done ? 'is-done' : ''}
          >
            <div
              className="todo-staus"
              onClick={e => onChangeTodo(todo.uuid, { done: !todo.done })}
            >
              {todo.done && <img src={doneIcon} alt="todo-staus" width="20" />}
              {!todo.done && <img src={circleIcon} alt="todo-staus" width="17" />}
            </div>
            <input
              className="todo-title"
              type="text"
              defaultValue={todo.title}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  onAddTodo({ title: '' });
                } else {
                  onChangeTodo(todo.uuid, { title: e.target.value });
                }
              }}
              onBlur={e => {
                onChangeTodo(todo.uuid, { title: e.target.value });
              }}
            />
            <div
              className="todo-action"
              onClick={e => onDeleteTodo(todo.uuid)}
            >
              <img src={deleteIcon} alt="todo-action" width="20" />
            </div>
          </TodoRow>
        ))}
      </div>
    </Container>
  );
}

export default Todolist;
