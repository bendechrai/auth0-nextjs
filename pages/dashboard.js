import React from 'react'
import Router from 'next/router'
import AuthService from '../utils/AuthService'

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {user: null};
  }

  async componentDidMount() {
    const Auth = new AuthService();
    if(!Auth.isLoggedIn()) {
      Auth.login();
    }
    this.setState({"user": await Auth.userProfile()});
  }

  logout() {
    const Auth = new AuthService();
    Auth.logout();
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        {this.state.user && (
          <p>Hi {this.state.user.name}!</p>
        )}
        <p><a onClick={() => this.logout()}><button>Logout</button></a></p>
      </div>
    );
  }

}

export default Dashboard;
