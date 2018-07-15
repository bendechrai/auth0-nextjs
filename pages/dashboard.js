import React from 'react'
import Link from 'next/link'
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
      Router.push('/login');
    }
    this.setState({"user": await Auth.userProfile()});
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        {this.state.user && (
          <p>Hi {this.state.user.name}!</p>
        )}
        <Link href="logout"><button>Logout</button></Link>
      </div>
    );
  }

}

export default Dashboard;
