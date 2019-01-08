import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';

class Login extends Component {

  state = {
    username: '',
    password: '',
  }

  componentDidMount() {

    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );

  }

  onLogin = async () => {
    const { username, password } = this.state;
    const result = await this.props.firebase.doSignInWithEmailAndPassword(username, password);
    debugger
  }

  render() {
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-4">
            <h1>Login</h1>

            <input
              type="text"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
            <input
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />

            <button onClick={this.onLogin}>Login</button>

          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Login);
