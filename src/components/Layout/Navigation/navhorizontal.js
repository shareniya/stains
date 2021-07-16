import React, { Component } from "react";
import "./style.css";
import Axios from "axios";
import { RiQuestionnaireLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import Auth from "../../../utils/Auth";
import ProfilePicture from "./profilepicture";
import Stainslogo from "../../../assets/Stains_logo.svg";

class NavHorizontal extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  state = {
    horizontal: [
      { home: "" },
      { search: "" },
      { faq: "" },
      { signIn: "" },
      { profiledetails: "" },
      { loginhistory: "" },
      { logOut: "" },
    ],
  };

  //to store data & render in DOM
  componentDidMount() {
    Axios.get("/navmenu/horizontal").then((res) => {
      const horizontal = res.data[0];

      this.setState({ horizontal });
      //console.log(horizontal);
    });
  }

  render() {
    // for authentication of user from Auth0
    const { isAuthenticated, login, logout } = this.auth;
    let { horizontal } = this.state;
   
    //display search // using splice to remove item from an array and return the remove item(s)
    horizontal.search = this.state.horizontal.splice(0, 1).map((val) => (
      <a
        className="nav-link text-white"
        href={val.menuitemlink}
        data-toggle="tooltip"
        title="Search"
      >
        <FaSearch id="search" />
       {val.menuitemname}
      </a>
    ));

    //display home
    horizontal.home = this.state.horizontal.splice(0, 1).map((val) => (
      <a
        className="nav-link text-white"
        href={val.menuitemlink}
        data-toggle="tooltip"
        title="Home"
      >
        <FaHome id="home" />
        {val.menuitemname}
      </a>
    ));

    // display faq
    horizontal.faq = this.state.horizontal.splice(0, 1).map((val) => (
      <a
        className="nav-link text-white"
        href={val.menuitemlink}
        data-toggle="tooltip"
        title="FAQ"
      >
        <RiQuestionnaireLine id="question" />
        <text id="questiontext">{val.menuitemname}</text>
      </a>
    ));

    // display signIn
    horizontal.signIn = this.state.horizontal.splice(0, 1).map((val) => (
      <a
        className="nav-link text-white"
        href={val.menuitemlink}
        onClick={login}
        data-toggle="tooltip"
        data-placement="top"
        title="Login"
      >
        {val.menuitemname}
      </a>
    ));

    // display profile
    horizontal.profiledetails = this.state.horizontal
      .splice(0, 1)
      .map((val) => (
        <div id="v-pills-tab" key={val.id}>
          <a href="/profile" style={{ color: "#FFFFFF" }}>
            {val.menuitemname}
          </a>
        </div>
      ));

    // display loginhistory
    horizontal.loginhistory = this.state.horizontal.splice(0, 1).map((val) => (
      <a href={val.menuitemlink} style={{ color: "#FFFFFF" }}>
        {val.menuitemname}
      </a>
    ));

    // display logout
    horizontal.logOut = this.state.horizontal.splice(0, 1).map((val) => (
      <a href={val.menuitemlink} onClick={logout} style={{ color: "#FFFFFF" }}>
        {val.menuitemname}
      </a>
    ));
    return (
      <div className="">
        <div className="row">
          <div className="container-fluid-lg" id="horizontalwidth">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark col sticky-top">
              <a className="navbar-brand" href="/">
                <img
                  src={Stainslogo}
                  width="130"
                  height="50"
                  alt="React Logo"
                />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto"></ul>
                {isAuthenticated() ? (
                  <>
                    <ul className="navbar-nav ">
                      <form className="form-inline my-2 my-lg-0">
                        <input
                          className="form-control mr-sm-2"
                          type="text"
                          placeholder="Search"
                          aria-label="Search"
                        />
                      </form>
                      <li className="nav-item">{horizontal.home}</li>
                      <li className="nav-item">{horizontal.faq}</li>

                      <li className="nav-item dropdown">
                        <li
                          className="nav-link"
                          data-target="dropdown-target"
                          data-toggle="dropdown"
                          href="/profile"
                        >
                          {<ProfilePicture />}
                        </li>
                        <li
                          className="dropdown-menu"
                          aria-labelledby="dropdown-target"
                        >
                          <li className="dropdown-item">
                            {horizontal.profiledetails}
                          </li>
                          <divider />
                          <li className="dropdown-item">
                            {horizontal.loginhistory}
                          </li>
                          <divider />
                          <li className="dropdown-item">{horizontal.logOut}</li>
                        </li>
                      </li>
                    </ul>
                  </>
                ) : (
                  [
                    <Link style={{ textDecoration: "none" }} to="/faq">
                      {horizontal.faq}
                    </Link>,
                    <NavLink style={{ textDecoration: "none" }} to="/">
                      {horizontal.signIn}
                    </NavLink>,
                  ]
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default NavHorizontal;