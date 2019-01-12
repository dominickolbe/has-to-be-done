import React from 'react';
import styled from 'styled-components';
import deleteIcon from '../img/delete.svg';
import editIcon from '../img/create.svg';
import { getListById } from '../../utils';

const Container = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 45px;
  width: 100%;

  &:hover {
    .todolist-action {
      opacity: 1;
    }
  }

  select.todolist-select {
    background: #FFF;
    border: none;
    font-size: 1.5em;
    font-weight: 600;
    outline: none;
    appearance: none;
  }

  .todolist-action {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    opacity: 0;
    transition: all 200ms ease-in-out;
    width: 48px;

    &.delete {
      margin-left: auto;
    }
  }
`;

const Todos = ({
  todolists,
  onChange,
  onAddTodolist,
  onTodolistNameChange,
  selectedTodolist,
}) => {
  return (
    <Container>
      <select
        className="todolist-select"
        onChange={e => onChange(getListById(todolists, e.target.value))}
        value={selectedTodolist.uuid}
      >
        {todolists.map((todolist) => (
          <option
            key={todolist.uuid}
            value={todolist.uuid}
          >
            {todolist.title}
          </option>
        ))}
      </select>

      <div className="todolist-action edit" onClick={onTodolistNameChange}>
        <img src={editIcon} alt="todolist-action" width="20" />
      </div>

      <button onClick={onAddTodolist}>onAddTodolist</button>

      <div className="todolist-action delete" onClick={onTodolistNameChange}>
        <img src={deleteIcon} alt="todolist-action" width="20" />
      </div>
    </Container>
  );
}

export default Todos;
