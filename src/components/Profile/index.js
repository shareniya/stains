import React, { Component } from "react";
import "./style.css";
import NavVertical from "./../Layout/Navigation/navvertical";
import NavHorizontal from "./../Layout/Navigation/navhorizontal";
import ProfileDetails from "./ProfileDetails";
import Auth from "../../utils/Auth";
import LandingPageContent from "../LandingPage/LandingPageContent";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
    this.state = {
      profile: null,
      error: "",
    };
  }
 
  componentDidMount() {
    this.loadUserProfile();
  }
 
  loadUserProfile() {
    this.auth.getProfile((profile, error) => this.setState({ profile, error }));
  }
 
  render() {
    const { isAuthenticated } = this.props.auth;
    const { profile } = this.state;
    if (!profile) return null;
    return (
      <div className="">
        {/* top navigation  */}
        <NavHorizontal />
        {/* side navigation*/}
        <div className=" ">
          {/*dashboard content  */}
          {isAuthenticated() ? (
            <div className="">
              {/* Employment table component call begin from here */}
 
              <div className="d-flex h-100">
                <div class="">
                <NavVertical />
                </div>
 
                {this.props.location.state ? (
                  <div className="container-fluid">
                    <ProfileDetails
                      email={this.props.location.state}
                      modifier={profile.email}
                      picture={""}
                    />
                  </div>
                ) : (
                  <div className="col-md bgcolor">
                    <ProfileDetails
                      email={profile.email}
                      modifier={profile.email}
                      picture={profile.picture}
                    />
                  </div>
                )}
              </div>
 
              {/* Employment table component call Form end here */}
            </div>
          ) : (
            <LandingPageContent />
          )}
        </div>
      </div>
    );
  }
}
 
export default Profile;
