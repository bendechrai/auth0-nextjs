import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import AuthService from '../utils/AuthService'

class Index extends React.Component {

  componentDidMount() {
    const Auth = new AuthService();
    if(Auth.isLoggedIn()) {
      Router.push('/dashboard');
    }
  }

  render() {
    return (
      <div>
        <h1>Auth0 and Next.js</h1>
        <Link href="login"><button>Login</button></Link>
      </div>
    );
  }

}

export default Index;
