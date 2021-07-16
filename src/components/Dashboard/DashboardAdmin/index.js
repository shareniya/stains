import React, { Component } from "react";
import { Link } from "react-router-dom";

import UsersNotLoggedIn from "./UsersNotLoggedIn";
import PageView from "./PageView";
import UsersAdministration from "./UsersAdministration";
import NavHorizontal from "../../Layout/Navigation/navhorizontal";
import NavVertical from "../../Layout/Navigation/navvertical";

import "./style.css";

//This the component for admin dashboard, which is intended to call each widget components
class AdminDashboard extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;

    return (
      <div className="">
        {/* top navigation  */}
        <NavHorizontal />
        {/* side navigation*/}
        <div className="row">
          {/*dashboard content  */}
          {isAuthenticated() ? (
            <div className="container-fluid">
              {/* Dashboard component call begin from here */}
              <div className="d-flex h-100">
                <div className="">
                  <NavVertical />
                </div>

                <div className="container-fluid">
                  <div className="contentpad">
                    <div className="row">
                      <div className="col-sm-8 col-md-8 col-lg-8">
                        <div className="card table-responsive">
                          <UsersAdministration />
                        </div>
                      </div>
                      <div className="col-sm-4 col-md-4 col-lg-4">
                        <div className="card table-responsive">
                          <PageView />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-8 col-md-8 col-lg-8">
                        <div className="card table-responsive">
                          <UsersNotLoggedIn />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Dashboard component call Form end here */}
            </div>
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
      </div>
    );
  }
}

export default AdminDashboard;
