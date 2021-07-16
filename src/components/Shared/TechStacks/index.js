import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavHorizontal from "../../Layout/Navigation/navhorizontal";
import NavVertical from "../../Layout/Navigation/navvertical";
import TechStackList from "./TechStackTable";
import "./style.css";

class TechStacks extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;

    return (
      <div>
        <NavHorizontal />

        {isAuthenticated() ? (
          <>
            {/* Techstack list component call begin from here */}

            <div className="d-flex h-100">
              <div className="">
                <NavVertical />
              </div>

              <div className="container-fluid">
                <TechStackList />
              </div>
            </div>

            {/* Techstack list component call Form end here */}
          </>
        ) : (
          <div>
            <div className="col-md bgcolor">
              Please{" "}
              <Link to="/" onClick={login}>
                Sign In/Up
              </Link>{" "}
              to continue
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TechStacks;
