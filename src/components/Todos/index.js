import React, { useState } from 'react';
import styled from 'styled-components';

import deleteIcon from '../img/delete.svg';
import doneIcon from '../img/done.svg';
import circleIcon from '../img/circle.svg';

const Container = styled.div`
`;

const TodoRow = styled.div`
  align-items: center;
  display: flex;
  height: 48px;
  white-space: nowrap;
  transition: all 200ms ease-in-out;
  position: relative;
  overflow: hidden;
  width: 100%;

  &:focus-within {
    background: #F8F9FA;

    .todo-action {
      img {
        opacity: 1;
      }
    }

    &:after {
      transform: translateX(0%);
    }
  }

  &:after {
    content: '';
    background: #4688F1;
    bottom: 0;
    left: 0;
    height: 2px;
    position: absolute;
    transition: all 200ms cubic-bezier(0.46, 0.03, 0.52, 0.96);
    transform: translateX(-100%);
    width: 100%;
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
    cursor: pointer;
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

const Todos = ({ todos, onChangeTodo, onAddTodo, onDeleteTodo }) => {
  const [newtodo, setNewtodo] = useState('');
  return (
    <Container>
      <div>

        <input
          type="text"
          value={newtodo}
          onChange={e => setNewtodo(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              onAddTodo({ title: e.target.value });
              setNewtodo('');
            }
          }}
        />

        {todos.map((todo) => (
          !todo.deleted &&
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
                onChangeTodo(todo.uuid, { title: e.target.value });
                // if (e.key === 'Enter') {
                  // onAddTodo({ title: '' });
                // } else {
                // }
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

export default Todos;
