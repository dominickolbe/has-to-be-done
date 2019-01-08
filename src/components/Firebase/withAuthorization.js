import React from 'react';
import { withFirebase } from './';

const withAuthorization = Component => {
  class withAuthorization extends React.Component {
    state = {
      user: null,
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(user => {
        if (user) {
          this.setState({ user })
        } else {
          this.props.history.push('/login');
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { user } = this.state;
      return user ? <Component {...this.props} user={user} /> : null;
    }
  }
  return withFirebase(withAuthorization);
}

export default withAuthorization;
