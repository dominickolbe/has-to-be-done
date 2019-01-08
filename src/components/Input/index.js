import React from 'react';
import styled from 'styled-components';

const Container = styled.input`
  border: 1px solid #dadce0;
  border-radius: 2px;
  color: #243342;
  font-size: 14px;
  font-weight: 500;
  height: 36px;
  margin-bottom: 5px;
  padding: 0 10px;
  transition: all 150ms ease;
  outline: inherit;
  width: 100%;

  &:hover {
    border-color: #d2e3fc;
  }

  &:active {
    border-color: #d2e3fc;
  }
`;

const Input = props => {
  return (
    <Container {...props} />
  )
};

export default Input;
