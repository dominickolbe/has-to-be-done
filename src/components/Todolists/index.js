import React from 'react';
import styled from 'styled-components';
import deleteIcon from '../img/delete.svg';
import editIcon from '../img/create.svg';
import addIcon from '../img/add.svg';
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

  .todolist-action-container {
    display: flex;
    margin-left: auto;
  }

  .todolist-action {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    opacity: 0;
    transition: all 200ms ease-in-out;
    width: 40px;
  }
`;

const Todos = ({
  todolists,
  onSelectedTodolistChange,
  onTodolistAdd,
  onTodolistChange,
  selectedTodolist,
}) => {
  return (
    <Container>
      <select
        className="todolist-select"
        onChange={e => onSelectedTodolistChange(getListById(todolists, e.target.value))}
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

      <div className="todolist-action-container">
        <div className="todolist-action edit" onClick={onTodolistChange}>
          <img src={editIcon} alt="todolist-action" width="20" />
        </div>
        <div className="todolist-action add" onClick={onTodolistAdd}>
          <img src={addIcon} alt="todolist-action" width="20" />
        </div>
        <div className="todolist-action delete" onClick={onTodolistChange}>
          <img src={deleteIcon} alt="todolist-action" width="20" />
        </div>
      </div>
    </Container>
  );
}

export default Todos;
