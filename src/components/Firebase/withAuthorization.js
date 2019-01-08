import React from 'react';
import { withFirebase } from './';

const withAuthorization = Component => {
  class withAuthorization extends React.Component {
    state = {
      authUser: null,
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => authUser ? this.setState({ authUser }) : null
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { authUser } = this.state;
      return authUser ? <Component {...this.props} user={authUser} /> : null;
    }
  }
  return withFirebase(withAuthorization);
}

export default withAuthorization;
