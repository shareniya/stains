import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isProfileCompleted = localStorage.getItem("isProfileCompleted");
  // auth0 access token
  const accessToken = localStorage.getItem("access_token");
  // url of component passed from props
  const url = Object.values({ ...rest.location.pathname }).join("");

  
  if (!accessToken) {
    return <Redirect exact to="" />
  }
  else if (url === "/profile") {
    return <Route {...rest} />
  }
  // comparing true or false as a string because localStorage only accept string value
  else if (isProfileCompleted === "true") {
    return <Route {...rest} />
  }
  // comparing true or false as a string because localStorage only accept string value
  else if (isProfileCompleted === "false" || !isProfileCompleted) {
    return <Redirect exact to="/profile" />
  };
}

export default ProtectedRoute;