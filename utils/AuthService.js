import Router from 'next/router'

export default class AuthService {

  accessToken = null;
  idToken = null;
  expiresAt = null;
  user = null;

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
    this.saveTokens = this.saveTokens.bind(this);
  }

  login() {
    this.webAuth.authorize();
  }

  saveTokens(err, authResult) {

    if (err) {
      if(err.error == 'login_required') this.login();
      else return console.log(err);
    }

    let expiresAt = JSON.stringify(
      (authResult.expiresIn * 1000) + new Date().getTime()
    );
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    var saveUser = (function(err, user) {
      this.user = user;
    }).bind(this);
    this.webAuth.client.userInfo(this.accessToken, saveUser);

  }

  callback(hash) {
    this.webAuth.parseHash({ hash: hash }, this.saveTokens);
    Router.push('/dashboard');
  }

  checkSession() {
    this.webAuth.checkSession({}, this.saveTokens);
  }

  getUser() {
    var _this = this;
    return new Promise((function(resolve, reject) {
      (function waitForUser(){
        if (_this.user != null) return resolve(_this.user);
        setTimeout(waitForUser, 100);
      })();
    }));
  }

  logout() {
    this.webAuth.logout({
      returnTo: 'http://localhost:3000/'
    });
  }

}
