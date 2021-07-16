import React, { Component } from "react";
import Auth from "../../../utils/Auth";
import "./style.css";

class ProfilePicture extends Component {

  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
    this.state = {
      profilepic: null,
      error: ""
      };
  }

  

    componentDidMount() {
      this.loadUserProfile();
    }
  
    loadUserProfile() {
      this.auth.getProfile((profilepic, error) =>
        this.setState({ profilepic, error }, () => { 
        })
      );
    }

    
  render() {
    const {profilepic} = this.state;
    if (!profilepic ) return null;

    return (
        <img
        className="profilepic"
        src={profilepic.picture}
        alt="profile pic"
      />
    );
  }
}

export default ProfilePicture;