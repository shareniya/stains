import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavVertical from "../../../Layout/Navigation/navvertical";

import EmploymentList from "./EmploymentTable";
import NavHorizontal from "../../../Layout/Navigation/navhorizontal";
//import NavVertical from "../components/Layout/Navigation/navvertical";
import "./style.css";

//This the component for admin dashboard, which is intended to call each widget components

class EmploymentType extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;

    return (
      <div>
        <NavHorizontal />

        {isAuthenticated() ? (
          <>
            {/* Employment table component call begin from here */}

            <div className="d-flex h-100">
              <div className="hidden-mobile">
                <NavVertical />
              </div>
              <div className="container-fluid" id="content">
                <EmploymentList />
              </div>
            </div>

            {/* Employment table component call Form end here */}
          </>
        ) : (
          <div>
            <div className="col-md bgcolor">
              Please{" "}
              <Link to="/" onClick={login}>
                Sign In/Up
              </Link>{" "}
              to continue
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EmploymentType;
