import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withFirebase } from '../../components/Firebase';
import Button from '../../components/Button';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

class Login extends PureComponent {

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        if (authUser) return this.props.history.push('/');
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  onClick = async () => {
    this.props.firebase.doSignIn();
  }

  render() {

    return (
      <Container>
        <Button onClick={this.onClick}>Login with Google</Button>
      </Container>
    );
  }

}

export default withFirebase(Login);
