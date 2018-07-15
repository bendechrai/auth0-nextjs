import React from 'react'
import AuthService from '../utils/AuthService'

class Logout extends React.Component {

  componentDidMount() {
    const Auth = new AuthService();
    Auth.logout();
  }

  render() {
    return null;
  }

}

export default Logout;
