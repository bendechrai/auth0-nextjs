import React from 'react'
import AuthService from '../utils/AuthService'

class Callback extends React.Component {

  componentDidMount() {
    const Auth = new AuthService();
    Auth.callback(window.location.hash);
  }

  render() {
    return null
  }

}

export default Callback;
