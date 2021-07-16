import React, { Component } from "react";
import NavVertical from "../../Layout/Navigation/navvertical";
import "./style.css";
import NavHorizontal from "../../Layout/Navigation/navhorizontal";
import LandingPageContent from "../../LandingPage/LandingPageContent";
import UsersList from "./UsersList";
//import UsersView from "./UsersView";


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
                <UsersList />
                {/* <UsersView /> */}
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

export default DashboardUserList;
