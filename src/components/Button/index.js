import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.button`
  background: #FFF;
  border: 1px solid #dadce0;
  border-radius: 4px;
  color: #1a73e8;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  height: 36px;
  padding: 0 25px;
  transition: all 150ms ease;
  outline: inherit;

  ${props => props.full && css`
    padding: 0;
    width: 100%;
  `}

  &:hover {
    background: #F6FAFE;
    border-color: #d2e3fc;
  }

  &:active {
    background: #DCEAFB;
    border-color: #d2e3fc;
  }
`;

const Button = ({ children, onClick, full }) => {
  return (
    <Container onClick={onClick} full={full}>
      {children}
    </Container>
  )
};

export default Button;
