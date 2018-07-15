import Router from 'next/router'

export default class AuthService {

  constructor() {
    this.auth0 = require('auth0-js');
    this.webAuth = new this.auth0.WebAuth({
      domain: 'YOUR_AUTH0_DOMAIN',
      clientID: 'YOUR_CLIENT_ID',
      redirectUri: 'http://localhost:3000/callback',
      audience: 'https://YOUR_AUTH0_DOMAIN/userinfo',
      responseType: 'token id_token',
      scope: 'openid profile'
    });
  }

  login() {
    this.webAuth.authorize();
  }

  callback(hash) {
    this.webAuth.parseHash({ hash: hash }, function(err, authResult) {

      if (err) {
        return console.log(err);
      }

      let expiresAt = JSON.stringify(
        (authResult.expiresIn * 1000) + new Date().getTime()
      );
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);

      Router.push('/dashboard');

    });
  }

  userProfile() {
    let webAuth = this.webAuth;
    return new Promise(function(resolve, reject) {
      let accessToken = localStorage.getItem('access_token');
      webAuth.client.userInfo(accessToken, function(err, user){
        resolve(user);
      });
    });
  }

  isLoggedIn() {
    // If there's an expiry, and it's in the future, user is logged in
    let exp = localStorage.getItem('expires_at');
    let now = new Date().getTime();
    return (exp>=now);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    Router.push('/');
  }

}
