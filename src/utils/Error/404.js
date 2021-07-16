import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavHorizontal from "../../components/Layout/Navigation/navhorizontal";
import NavVertical from "../../components/Layout/Navigation/navvertical";
import LandingPage from "../../components/LandingPage";

class NotFound extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        {isAuthenticated() ? (
          <div>
            {" "}
            <NavHorizontal />
            <div className="d-flex h-100">
              <div className="hidden-mobile">
                <NavVertical />
              </div>
              <div
                className="col-lg-10 col-sm-auto col-md-9 col-auto"
                align="center"
              >
                <br></br>
                <h1>404</h1>
                <h1>Oops, nothing here..</h1>
                <h7>
                  Uh oh, we cant's seems to find the page you're looking for.Try
                  going back to previous page or Contact us for more
                  information.
                </h7>
                <br></br>
                <Link className="btn btn-success p-2 " to="/home">
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <LandingPage />
          </div>
        )}
      </div>
    );
  }
}

export default NotFound;

