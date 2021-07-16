import React, { Component } from "react";
import NavHorizontal from "../../Layout/Navigation/navhorizontal";
import NavVertical from "../../Layout/Navigation/navvertical";
import AppsList from "./AppsList";
import LandingPageContent from "../../LandingPage/LandingPageContent";
import "./style.css";

class DashboardAppsList extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;

    return (
      <div className="">
        <NavHorizontal />

        {/*dashboard content  */}
        {isAuthenticated() ? (
          <>
            {/* Userlist component call begin from here */}

            <div className="d-flex h-100">
              <div className="hidden-mobile">
                <NavVertical />
              </div>
              <div className="container-fluid" id="content">
                <AppsList />
              </div>
            </div>

            {/* Userlist component call Form end here */}
          </>
        ) : (
          <div className="col-md bgcolor">
            <LandingPageContent />
          </div>
        )}
      </div>
    );
  }
}

export default DashboardAppsList;
