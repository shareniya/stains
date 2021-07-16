


import React, { Component } from "react";
import LoginHistoryList from "./loginhistorylist";
import NavHorizontal from "../../Layout/Navigation/navhorizontal";
import NavVertical from "../../Layout/Navigation/navvertical";
import LandingPageContent from "../../LandingPage/LandingPageContent";
 
import "./style.css";
 
class LoginHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      error: "",
      firstName: "",
      lastName: "",
      email: "",
    };
  }
 
  loadUserProfile() {
    this.props.auth.getProfile((profile, error) =>
      this.setState({ profile, error }, () => {})
    );
  }
 
  componentDidMount() {
    this.loadUserProfile(); // POST request to retrieve user data from db is invoked when react component is mounted
  }
 
  render() {
    const { isAuthenticated, login } = this.props.auth;
 
    const { profile } = this.state;
    if (!profile) return null;
 
    return (
      <div>
        {/* top navigation  */}
        <NavHorizontal />
        {/* side navigation*/}
        <div className="">
          {/*dashboard content  */}
          {isAuthenticated() ? (
        
        <div className="d-flex h-100">
        <div className="">
          <NavVertical />
        </div>
 
        <div className="container-fluid">
        <LoginHistoryList email={profile.email} />
        </div>
      </div>
 
           
          ) : (
            <div className="col-md bgcolor">
              <LandingPageContent />
            </div>
          )}
        </div>
      </div>
     
    );
  }
}
 
export default LoginHistory;