import React, { useState, useEffect, useReducer } from "react";
import Axios from "axios"; //make request thru api
import "../style.css";
import { Link } from "react-router-dom";
import NewApplication from "../NewApplication";
import AppDetails from "../AppDetails";
import CreateUser from "../CreateUser";
import ColumnOption from "../ColumnOption";
import {
  FaFilter,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaRegEdit,
  FaInfoCircle,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
//import { Rnd } from "react-rnd"; //package for resizable form"

const UsersView = () => {
  const initialSort = {
    field: "id",
    isAscSort: undefined,
  };

  const [userList, setUserList] = useState([]); //to store data & render in DOM
  const [appList, setAppList] = useState([]);
  const [active, setActive] = useState("None");
  const [userid, setUserId] = useState("");
  const [appid, setAppId] = useState("");
  const [sortConfig, setSortConfig] = useState(initialSort);

  // useReducer returns an array that holds the current state value
  const [input, dispatch] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      fullname: "",
      rolename: "",
      dailyrate: "",
      primaryskillname: "",
      secondaryskillname: "",
      appsname: "",
    }
  );

  //componentDidMount (do something after render)
  useEffect(() => {
    getUserData();
    getUserAppData();
  }, []);

  function getUserData() {
    Axios.get("/users/sel") //Fetch users list
      .then((res) => {
        if (res.status === 200) {
          setUserList(res.data[0]);
          //console.log(res.data[0]);
          // console.log("Sucessfully fetch users list data.");
        }
      })
      .catch((err) => {
        //console.log(err);
        // console.log("Failed to fetch users list data.");
      });
  }

  function getUserAppData() {
    Axios.get("/users/application") //fetch application list
      .then((res) => {
        if (res.status === 200) {
          setAppList(res.data[0]);
          // console.log(res.data[0]);
          // console.log("Sucessfully fetch application list data");
        }
      })
      .catch((err) => {
        console.log(err);
        // console.log("Failed to fetch application list data.");
      });
  }

  //filtering application list by id
  function filterAppByID(id) {
    return appList.filter((app) => app.userid === id);
  }

  //Handling change when there is changes in textbox
  const handleChangeValue = (event) => {
    const inputName = event.target.id;
    const inputValue = event.target.value;

    //dispatch function, which  pass an action and later invoke
    dispatch({ [inputName]: inputValue });
  };

  // escape special characters from search string
  const escapeRegExp = (string) => {
    return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  };

  //set the data from api calls to usersData
  let usersData = [...userList];

  //conditional filtering. If the input is more than 0 it will execute the filtering based on input field
  if (input.fullname.length > 0) {
    usersData = usersData.filter((i) => {
      return i.fullname
        .toLowerCase()
        .match(escapeRegExp(input.fullname.toLowerCase()));
    });
  } else if (input.appsname.length > 0) {
    usersData = usersData.filter((i) => {
      return i.appsname
        .toLowerCase()
        .match(escapeRegExp(input.appsname.toLowerCase()));
    });
  }

  // sorting function
  const onSort = (e) => {
    let config = sortConfig;
    let userlist = [...userList];
    let col = e.target.id;

    if (e.target.type !== "text") {
      // set the column (field) in sort configure
      if (col) {
        config.field = col;
      } else {
        config.field = sortConfig.field;
        col = config.field;
      }
      // reverse the Asc/Des icon
      config.isAscSort = !config.isAscSort;
      setSortConfig(config);

      // string data type sorting
      userlist = userlist.sort((a, b) => a[col].localeCompare(b[col]));

      // if isAscSort is false then reverse the sorting
      if (config.isAscSort === false) {
        userlist.reverse();
      }
    }

    setUserList(userlist); //to rerender
  };

  const bgcolor = {
    backgroundColor: "#343A40",
  };

  return (
    <div className="row position-relative">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
        <div className="panel panel-default shadow p-3 mt-1 mb-5 bg-white">
          <p id="titledashboard">
            <h3 className="mr-2" id="titledash">
              Users
            </h3>
            <span className="mr-2" id="titleline">|</span>
            <span id="titlelink">
              <Link to="/appsdash">Applications View</Link>
            </span>
            {/* button to add new user */}
            <button
              className="btn btn-success btn-sm float-right m-2"
              //onclick function to trigger and change the react hook state
              onClick={() => {
                setActive("New User");
              }}
            >
              CREATE USER
            </button>
            {/* button to add new column */}
            <button
              className="btn btn-primary btn-sm float-right m-2"
              //onclick function to trigger and change the react hook state
              onClick={() => {
                setActive("Column Option");
              }}
            >
              COLUMN OPTIONS
            </button>
          </p>

          <div className="panel-body table-responsive">
            {/* Table header*/}

            <table className="table table-condensed">
              <thead className="thead-dark">
                <tr>
                  {/* table header for fullname */}
                  <th id="name-header" className="align-middle p-2">
                    <div id="fullname" type="button" onClick={(e) => onSort(e)}>
                      User
                      <div className="btn-group float-right align-middle">
                        {sortConfig.field === "fullname" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "fullname" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortAlphaDownAlt />
                            </span>
                          )}
                        <span
                          type="button"
                          id="fullname"
                          className="btn btn-sm icon"
                          data-toggle="dropdown"
                        >
                          <FaFilter color="white" />
                        </span>
                        <div
                          className="dropdown-menu dropdown-menu-right mt-0 border-0 rounded-0"
                          style={bgcolor}
                        >
                          <input
                            className="form-control-sm sm-1"
                            type="text"
                            id="fullname"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={input.fullname}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  <th
                    data-visible="false"
                    className="align-top header-width p-2"
                  >
                    Application
                  </th>
                  <th className="align-middle">
                    <div className="btn-group  float-right">
                      <span
                        type="button"
                        className="btn btn-sm icon"
                        data-toggle="dropdown"
                      >
                        <FaFilter color="white" />
                      </span>

                      <div
                        className="dropdown-menu dropdown-menu-right mt-0 border-0 rounded-0"
                        style={bgcolor}
                      >
                        <input
                          className="form-control-sm m-1"
                          type="text"
                          id="appsname"
                          placeholder="search"
                          //call the handle change function
                          onChange={handleChangeValue}
                          value={input.appsname}
                        />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Main content for the table */}
              <tbody>
                {usersData.map(
                  (
                    val,
                    key //mapping for userList
                  ) => {
                    //conditional mapping. Call data filtering function previously and compare it with user ID
                    let totalApps = filterAppByID(val.id);
                    return (
                      <>
                        <tr key={key}>
                          <td id="namedata">{val.fullname}</td>
                          <td>
                            <div className="my-auto">
                              <span
                                type="button"
                                className="btn btn-sm"
                                onClick={() => {
                                  setActive("New Applications");
                                  setUserId(val.id);
                                }}
                              >
                                <BiAddToQueue size={30} />
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="container-fluid">
                              <div className="row">
                                {/* Start of mapping for listing application card */}
                                {totalApps.map(
                                  (
                                    app,
                                    appkey //mapping for application list by users
                                  ) => (
                                    <>
                                      {/* start of card */}
                                      <div className="card bg-light .col-xl-2 col-lg-3 col-md-12 col-sm-12 m-1">
                                        <div className="row">
                                          <div className="col-8">
                                            <h5
                                              id="userdisplay"
                                              className="card-title text-center m-2"
                                            >
                                              {app.appname}
                                            </h5>
                                          </div>
                                          <div className="col-4 text-center align-middle">
                                            {/* button to view application details */}
                                            <span
                                              className="p-1"
                                              data-toggle="collapse"
                                              href={
                                                "#collapse" + app.id + val.id
                                              }
                                              role="button"
                                              aria-expanded="false"
                                              aria-controls={
                                                "collapse" + app.id + val.id
                                              }
                                            >
                                              <FaInfoCircle />
                                            </span>

                                            {/* icon to edit engagement dates */}
                                            <span
                                              type="button"
                                              className="p-1"
                                              onClick={() => {
                                                setActive(
                                                  "Application Details"
                                                );
                                                setUserId(val.id);
                                                setAppId(app.id);
                                              }}
                                            >
                                              <FaRegEdit size={15} />
                                            </span>
                                          </div>
                                        </div>

                                        {/* start of collapse */}
                                        <div
                                          className="collapse"
                                          id={"collapse" + app.id + val.id}
                                        >
                                          <div className="card card-body mb-2">
                                            <div className="col px-0">
                                              <p className="font-weight-light">
                                                <Link
                                                  target={"_blank"}
                                                  to={`//${app.appurl}`}
                                                  rel="noopener noreferrer"
                                                >
                                                  {app.appurl}
                                                </Link>
                                              </p>
                                            </div>
                                            <div className="col px-0">
                                              <p className="font-weight-light">
                                                {app.techstacks}
                                              </p>
                                            </div>
                                            <div className="col px-0">
                                              <p className="font-weight-light">
                                                <b>
                                                  Start Date of engagement:{" "}
                                                </b>
                                                <br />
                                                {app.datestarted}
                                              </p>
                                            </div>
                                            <div className="col px-0">
                                              <p className="font-weight-light">
                                                <b>End Date of engagement: </b>
                                                <br />
                                                {app.dateended}
                                              </p>
                                            </div>
                                            <div className="col px-0">
                                              <p className="font-weight-light">
                                                <b>Team Members : </b>
                                                <br />
                                                {app.expectedmembers}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* end of card */}
                                    </>
                                  )
                                )}
                                {/* end of mapping for listing application for users */}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  }
                )}
                {/* end of mapping for listing application for users */}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* conditional rendering based on onClick */}

      <div className="col-auto" id="appdetailpop">
        {active === "None"}
        {active === "Application Details" && (
          <>
            {/* width resizable for form */}
            <div className="panel panel-default shadow p-2 mb-5 bg-white">
              <span className="closeform">
                <AiOutlineClose
                  type="button"
                  title="Close"
                  size="2em"
                  onClick={() => setActive("None")}
                />
              </span>
              <AppDetails userid={userid} appid={appid} />
            </div>
          </>
        )}
        {active === "New Applications" && (
          <div className="panel panel-default bg-white shadow p-3">
            <div>
              <div className="d-flex flex-row-reverse">
                <AiOutlineClose
                  type="button"
                  size={25}
                  onClick={() => {
                    setActive("None");
                    //setIsOverlay("None");
                  }}
                />
              </div>
              <NewApplication userid={userid} />
            </div>
          </div>
        )}
        {active === "New User" && (
          <div className="panel shadow p-2 mb-5 bg-white">
            <div className="d-flex flex-row-reverse">
              <AiOutlineClose
                type="button"
                size={25}
                onClick={() => {
                  setActive("None");
                  //setIsOverlay("None");
                }}
              />
            </div>
            <CreateUser />
          </div>
        )}
        {active === "Column Option" && (
          <div className="panel shadow p-2 mb-5 bg-white">
            <div className="d-flex flex-row-reverse">
              <AiOutlineClose
                type="button"
                size={25}
                onClick={() => {
                  setActive("None");
                  //setIsOverlay("None");
                }}
              />
            </div>
            <ColumnOption />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersView;
