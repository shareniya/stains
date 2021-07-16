import auth0 from "auth0-js";
import Axios from "axios";

import GetCurrentLocalDateTime from "../GetCurrentLocalDateTime";
import isProfileCompleted from "../IsProfileCompleted";

// insert user's email and created date from auth0 to mysql users table
const addUser = (email, datecreated) => {
  Axios.post("/users/ins", {
    email: email,
    datecreated: datecreated
  })
    .then((res) => {
      if (res.status !== 200) {
        console.log("Something went wrong in adding information");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const addUserLogin = (email, datelogin) => {
  //fire request
  Axios.post("userlogin/add", {
    email: email,
    datelogin: datelogin
  })
    .then((res) => {
      if (res.status !== 200) {
        console.log("Something went wrong in adding login date information");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export default class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;

    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: "token id_token",
      scope: "openid profile email",
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push("/home");

        // get client side local date 
        const dateString = GetCurrentLocalDateTime();
        const email = authResult.idTokenPayload.email;

        // insert successfully login new user into DB
        addUser(email, dateString);
        // insert user login history
        addUserLogin(email, dateString);

        // call function to check whether profile is completed
        isProfileCompleted(email);
      }
      else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  };

  setSession = (authResult) => {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
  };

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");

    this.userProfile = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000",
    });
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.log("no access token found");
      return null;
    }
    return accessToken;
  };

  getProfile = (cb) => {
    if (this.userProfile) return cb(this.userProfile);

    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, err);
    });
  };

}
