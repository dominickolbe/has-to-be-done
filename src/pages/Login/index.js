import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import Button from '../../components/Button';
import Input from '../../components/Input';

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
    return;
    const { username, password } = this.state;
    const result = await this.props.firebase.doSignInWithEmailAndPassword(username, password);
    debugger
  }

  render() {
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-4">

            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <h1>Authentication</h1>
              </div>
              <div className="col-12">
                <Input
                  type="text"
                  value={this.state.username}
                  onChange={e => this.setState({ username: e.target.value })}
                  placeholder="username"
                />
              </div>
              <div className="col-12" style={{ marginBottom: '10px' }}>
                <Input
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                  placeholder="password"
                />
              </div>
              <div className="col-12 d-flex justify-content-end">
                <Button onClick={this.onLogin}>Login</Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Login);
