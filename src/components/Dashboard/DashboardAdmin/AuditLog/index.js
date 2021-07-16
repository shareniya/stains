import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavHorizontal from "../../../Layout/Navigation/navhorizontal";
import NavVertical from "../../../Layout/Navigation/navvertical";
import AuditLogList from "./AuditLogList";
import "./style.css";

class AuditLog extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;

    return (
      <div>
        <NavHorizontal />

        {/*dashboard content  */}
        {isAuthenticated() ? (
          <>
            {/* Applist component call begin from here */}

            <div className="d-flex h-100">
              <div className="hidden-mobile">
                <NavVertical />
              </div>

              <div className="container-fluid" id="content">
                <AuditLogList />
              </div>
            </div>

            {/* Applist component call Form end here */}
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

export default AuditLog;

