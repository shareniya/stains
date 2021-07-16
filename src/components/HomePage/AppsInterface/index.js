import React, { Component } from "react";
import NavVertical from "../../Layout/Navigation/navvertical";
import NavHorizontal from "../../Layout/Navigation/navhorizontal";
import LandingPageContent from "../../LandingPage/LandingPageContent";
import AppsView from "../../Shared/Apps/AppsView";


//This the component for users dashboard, which is intended to call each widget components

class DashboardUserList extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
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
                < AppsView />
              </div>
            </div>
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

export default DashboardUserList;
