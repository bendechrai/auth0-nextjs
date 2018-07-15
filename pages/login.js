import React from 'react'
import AuthService from '../utils/AuthService'

class Login extends React.Component {

  componentDidMount() {
    const Auth = new AuthService();
    Auth.login();
  }

  render() {
    return null;
  }

}

export default Login;
