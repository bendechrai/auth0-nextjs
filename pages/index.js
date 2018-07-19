import React from 'react'
import Router from 'next/router'
import AuthService from '../utils/AuthService'

class Index extends React.Component {

  componentDidMount() {
    const Auth = new AuthService();
    if(Auth.isLoggedIn()) {
      Router.push('/dashboard');
    }
  }

  login() {
    const Auth = new AuthService();
    Auth.login();
  }

  render() {
    return (
      <div>
        <h1>Auth0 and Next.js</h1>
        <p><a onClick={() => this.login()}><button>Login</button></a></p>
      </div>
    );
  }

}

export default Index;
