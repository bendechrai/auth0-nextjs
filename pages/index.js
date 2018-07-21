import React from 'react'
import AuthService from '../utils/AuthService'

class Index extends React.Component {

  login() {
    const Auth = new AuthService();
    Auth.login();
  }

  render() {
    return (
      <div>
        <h1>Auth0 and Next.js</h1>
        <p><a onClick={() => this.login()}>
          <button>Login</button>
        </a></p>
      </div>
    );
  }

}

export default Index;
