import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavVertical from "../../../Layout/Navigation/navvertical";

import NavHorizontal from "../../../Layout/Navigation/navhorizontal";
import UserRolesTable from "./UserRoleTable";
//import NavVertical from "../components/Layout/Navigation/navvertical";

//This the component for admin dashboard, which is intended to call each widget components

class RolesType extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;

    return (
      <div className="">
        {/* top navigation  */}
        <NavHorizontal />

        {/*dashboard content  */}
        {isAuthenticated() ? (
          <>
            {/* roles table component call begin from here */}

            <div className="d-flex h-100">
              <div>
                <NavVertical />
              </div>
              <div className="container-fluid" id="content">
                <UserRolesTable />
              </div>
            </div>

            {/* Roles table component call Form end here */}
          </>
        ) : (
          <div className="col-md bgcolor">
            Please{" "}
            <Link to="/" onClick={login}>
              Sign In/Up
            </Link>{" "}
            to continue
          </div>
        )}
      </div>
    );
  }
}

export default RolesType;
