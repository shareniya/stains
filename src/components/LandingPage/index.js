import React, { Component } from "react";

import NavHorizontal from "./../Layout/Navigation/navhorizontal";
import LandingPageContent from "./LandingPageContent";
import "./LandingPageContent/style.css";
class LandingPage extends Component {

  render() {
    return (
      <div >
        {/* top navigation  */}
        <NavHorizontal />
        <div>
          <LandingPageContent />
        </div>
      
      </div>
    );
  }
}

export default LandingPage;

