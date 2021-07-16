import React, { Component } from "react";
import NavVertical from "./../Layout/Navigation/navvertical";
import NavHorizontal from "./../Layout/Navigation/navhorizontal";
import LandingPageContent from "../LandingPage/LandingPageContent";
import { IoIosPeople, IoMdApps } from "react-icons/io";
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

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
             <div className="container-fluid" id="content">
             <div className="row" align="center">
              <div className="col-md bgcolor">
                <br></br>
                <h1>STAINS DASHBOARD</h1>
              </div>
                </div>
                <div className="row">
                <div className="col" align="center">
                <Link to="/usersdash" ><button 
                  className="btn btn-default"                  
                  ><IoIosPeople font-size="15em" color="#2b2d2f"/>
                  <h5>User View</h5></button></Link>
                {/* <AppsList /> */}
                <Link to="/appsdash" ><button
                  className="btn btn-default"                  
                  ><IoMdApps  font-size="15em" color="#2b2d2f"/>
                  <h5>Application View</h5></button></Link>
                 </div>
                </div>
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

export default HomePage;
