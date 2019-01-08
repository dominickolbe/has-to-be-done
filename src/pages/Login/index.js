import React, { Component } from 'react';
import { withFirebase } from '../../components/Firebase';
import Button from '../../components/Button';
import Input from '../../components/Input';

class Login extends Component {

  state = {
    username: '',
    password: '',
    loginFailed: false,
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

  onLogin = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { firebase } = this.props;
    const user = await firebase.doSignIn(username, password);

    if (!user) this.setState({ loginFailed: true })
  }

  render() {
    return (
      <form onSubmit={this.onLogin}>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-4">

              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <h1>Authentication</h1>
                </div>
                <div className="col-12">
                  <Input
                    type="email"
                    name="email"
                    value={this.state.username}
                    onChange={e => this.setState({ username: e.target.value })}
                    placeholder="username"
                  />
                </div>
                <div className="col-12" style={{ marginBottom: '10px' }}>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    placeholder="password"
                  />
                </div>
                {this.state.loginFailed &&
                  <div className="col-12">
                    <span style={{ color: '#D22B22', fontWeight: 'bold' }}>Bad credentials!</span>
                  </div>
                }
                <div className="col-12 d-flex justify-content-end">
                  <Button onClick={this.onLogin}>Login</Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default withFirebase(Login);
