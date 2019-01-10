import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #FFF;
  border: 1px solid #DAE1E9;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin: 0 0 30px 0;
  width: 100%;
`;
const Header = styled.div`
  align-items: center;
  display: flex;
  height: 55px;
  padding: 0 20px;
  h2 {
    color: #4E87EC;
    cursor: default;
    font-weight: 700;
    font-size: 16px;
    margin: 0;
  }
`;
const Main = styled.div`
  position: relative;
`;

const Card = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <Header>
        <h2>{props.title}</h2>
      </Header>
      <Main>
        {children}
      </Main>
    </Container>
  )
};

export default Card;
