import React from 'react';
import styled from 'styled-components';

import deleteIcon from '../img/delete.svg';
import editIcon from '../img/create.svg';

const Container = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 45px;
  width: 100%;

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
  onTodolistnameChange,
  onAddTodolist,
  selectedTodolist,
}) => {
  return (
    <Container>
      <select
        className="todolist-select"
        onChange={e => onChange(e.target.value)}
        value={selectedTodolist}
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

      <div className="todolist-action edit" onClick={onTodolistnameChange}>
        <img src={editIcon} alt="todolist-action" width="20" />
      </div>

      <div className="todolist-action delete" onClick={onTodolistnameChange}>
        <img src={deleteIcon} alt="todolist-action" width="20" />
      </div>
    </Container>
  );
}

export default Todos;
