import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import deleteIcon from '../img/delete.svg';
import doneIcon from '../img/done.svg';
import circleIcon from '../img/circle.svg';

const Container = styled.div``;
const AddNewContainer = styled.div`
  margin-left: 48px;
  input {
    background: transparent;
    border: none;
    border-bottom: 1px solid #E0E0E0;
    font-size: 15px;
    height: 48px;
    flex-grow: 1;
    position: relative;
    outline: none;
    width: 100%;
  }
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

    &:after {
      transform: translateX(0%);
    }
  }

  &:hover {
    .todo-action {
      img {
        opacity: 1;
      }
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

const Todos = ({
  todos = {},
  onTodoChange,
  onTodoIndexChange,
  onTodoAdd,
  onTodoDelete,
}) => {
  const [newtodo, setNewtodo] = useState('');

  return (
    <Container>
      <AddNewContainer>
        <input
          type="text"
          value={newtodo}
          placeholder="Add a new task"
          onChange={e => setNewtodo(e.target.value)}
          onKeyPress={e => {
            if (e.key !== 'Enter') return;
            onTodoAdd({ title: e.target.value });
            setNewtodo('');
          }}
        />
      </AddNewContainer>

      <DragDropContext
        onDragEnd={e => e.destination && onTodoIndexChange(e.draggableId, e.source.index, e.destination.index)}
      >
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
            >
              {todos.map((todo, index) => (
                <Draggable key={index} draggableId={todo.uuid} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {todo.title} - {todo.index}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

export default Todos;

{/* <TodoRow
  className={todo.doneAt ? 'is-done' : ''}
>
  <div
    className="todo-staus"
    onClick={() => onTodoChange(key, {
      doneAt: todo.doneAt ? null : moment().format(),
    })}
  >
    {todo.doneAt && <img src={doneIcon} alt="todo-staus" width="20" />}
    {!todo.doneAt && <img src={circleIcon} alt="todo-staus" width="17" />}
  </div>
  <input
    className="todo-title"
    type="text"
    defaultValue={todo.title}
    onChange={e => onTodoChange(key, { title: e.target.value })}
  />
  <div
    className="todo-action"
    onClick={() => onTodoDelete(key)}
  >
    <img src={deleteIcon} alt="todo-action" width="20" />
  </div>
</TodoRow> */}
