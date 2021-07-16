import React, { useState, useEffect, useReducer } from "react";
import Axios from "axios";
import "../style.css";
import UserDetails from "../UserDetails";
import NewUser from "../NewUser";
import ColumnOption from "../ColumnOption";
import { Link } from "react-router-dom";
import {
  FaFilter,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaRegEdit,
  FaInfoCircle,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import NewAppDetail from "../../CreateApplication/createapp";

const AppsView = () => {
  const initialSort = {
    field: "id",
    isAscSort: undefined,
  };

  //declare state variable
  const [appsList, setAppsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [active, setActive] = useState("None");
  const [userid, setUserId] = useState("");
  const [appid, setAppId] = useState("");
  const [sortConfig, setSortConfig] = useState(initialSort);

  // useReducer returns an array that holds the current state item
  const [input, dispatch] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      appname: "",
      appurl: "",
      techstack: "",
      datecreated: "",
      datemodified: "",
      userlist: "",
    }
  );

  function getAppData() {
    Axios.get("/applications/sel")
      .then((res) => {
        if (res.status === 200) {
          setAppsList(res.data[0]);
          //console.log("Successfully fetch apps list data.");
        }
      })
      .catch((err) => {
        console.log(err);
        //console.log("Failed to fetch apps list data.");
      });
  }

  function getAppUsersEngagedData() {
    Axios.get("/application/users")
      .then((res) => {
        if (res.status === 200) {
          setUsersList(res.data[0]);
          //console.log("Successfully fetch users list data.");
        }
      })
      .catch((err) => {
        console.log(err);
        //console.log("Failed to fetch users list data.");
      });
  }

  //componentDidMount (do something after render)
  useEffect(() => {
    getAppData();
    getAppUsersEngagedData();
  }, []);

  //filtering user lists by id
  function GetUsersEngaged(id) {
    return usersList.filter((users) => users.appid === id);
  }

  //Handling change when there is changes in textbox
  const handleChangeValue = (e) => {
    const inputName = e.target.id;
    const inputValue = e.target.value;

    //dispatch function, which  pass an action and later invoke
    dispatch({ [inputName]: inputValue });
  };

  // escape special characters from search string
  const escapeRegExp = (string) => {
    return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  };

  //set the data from api calls to appsData
  let appsData = [...appsList];

  // conditional filtering that execute when input query length > 0
  if (input.appname) {
    appsData = appsData.filter((i) =>
      i.appname.toLowerCase().match(escapeRegExp(input.appname.toLowerCase()))
    );
  } else if (input.userlist) {
    appsData = appsData.filter((i) =>
      i.userlist.toLowerCase().match(escapeRegExp(input.userlist.toLowerCase()))
    );
  }

  // sorting function
  const onSort = (e) => {
    let config = sortConfig;
    let appslist = [...appsList];
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
      appslist = appslist.sort((a, b) => a[col].localeCompare(b[col]));

      // if isAscSort is false then reverse the sorting
      if (config.isAscSort === false) {
        appslist.reverse();
      }
    }
    setAppsList(appslist); //to rerender
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
              Applications
            </h3>
            <span className="mr-2" id="titleline">|</span>
            <span id="titlelink">
              <Link to="/usersdash">Users View</Link>
            </span>
            {/* button to add new user */}
            <button
              className="btn btn-success btn-sm float-right m-2"
              onClick={() => {
                setActive("Create Application");
              }}
            >
              CREATE APPLICATION
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
            {/* Table start here*/}
            <table className="table table-condensed">
              <thead className="thead-dark">
                <tr>
                  {/* table header for apps name */}
                  <th className="align-middle header-width p-2">
                    <div id="appname" type="button" onClick={(e) => onSort(e)}>
                      Apps
                      <div className="btn-group float-right align-middle">
                        {sortConfig.field === "appname" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "appname" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortAlphaDownAlt />
                            </span>
                          )}
                        <span
                          type="button"
                          id="appname"
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
                            id="appname"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={input.appname}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/* table header for Users */}
                  <th className="align-top header-width p-2">Users</th>
                  <th className="align-middle">
                    <div className="btn-group float-right">
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
                          className="form-control-sm sm-1"
                          type="text"
                          id="userlist"
                          placeholder="search"
                          //call the handle change function
                          onChange={(e) => handleChangeValue(e)}
                          value={input.userlist}
                        />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Main content for the table */}
              <tbody>
                {appsData.map(
                  (
                    item,
                    key //mapping for applications list
                  ) => {
                    //conditional mapping. Call data filtering function previously and compare it with application ID
                    let totalUsers = GetUsersEngaged(item.id);
                    return (
                      <>
                        <tr key={key}>
                          <td>{item.appname}</td>
                          <td>
                            <div className="my-auto">
                              <span
                                type="button"
                                className="btn btn-sm"
                                onClick={() => {
                                  setActive("New Users");
                                  setAppId(item.id);
                                }}
                              >
                                <BiAddToQueue size={30} />
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="container-fluid">
                              <div className="row">
                                {/* Start of mapping for listing users card */}
                                {totalUsers.map(
                                  (
                                    users,
                                    userskey //mapping for users list engaged to a particular app
                                  ) => (
                                    <>
                                      {/* start of card */}
                                      <div className="card bg-light .col-xl-2 col-lg-3 col-md-12 col-sm-12 m-1">
                                        <div className="row">
                                          <div className="col-8">
                                            <h6
                                              id="namedisplay"
                                              className="card-title text-center m-2"
                                            >
                                              {users.fullname}
                                            </h6>
                                          </div>
                                          <div className="col-4 text-center align-middle">
                                            {/* button to view user details */}
                                            <span
                                              className="p-1"
                                              data-toggle="collapse"
                                              href={
                                                "#collapse" + users.id + item.id
                                              }
                                              role="button"
                                              aria-expanded="false"
                                              aria-controls={
                                                "collapse" + users.id + item.id
                                              }
                                            >
                                              <FaInfoCircle />
                                            </span>

                                            {/* button to edit engagement dates */}
                                            <span
                                              type="button"
                                              className="p-1"
                                              onClick={() => {
                                                setActive("User Details");
                                                setUserId(users.id);
                                                setAppId(item.id);
                                              }}
                                            >
                                              <FaRegEdit size={15} />
                                            </span>
                                          </div>
                                        </div>

                                        {/* start of collapse */}
                                        <div
                                          className="collapse"
                                          id={"collapse" + users.id + item.id}
                                        >
                                          <div className="card card-body m-2">
                                            <div className="col px-0">
                                              <p className="font-weight-light">
                                                <b>Position:</b>
                                                <br />
                                                {users.position}
                                              </p>
                                            </div>
                                            <div className="col px-0">
                                              <p className="font-weight-light">
                                                <b>Primary Skills:</b>
                                                <br />
                                                {users.primaryskillname}
                                              </p>
                                            </div>
                                            <div className="col px-0">
                                              <p className="font-weight-light">
                                                <b>Secondary Skills:</b>
                                                <br />
                                                {users.secondaryskillname}
                                              </p>
                                            </div>
                                            <div className="col px-0">
                                              <p className="font-weight-light">
                                                <b>Contract Start Date:</b>
                                                <br />
                                                {users.contractstartdate}
                                              </p>
                                            </div>
                                            <div className="col px-0">
                                              <p className="font-weight-light">
                                                <b>Contract End Date:</b>
                                                <br />
                                                {users.contractenddate}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* end of card */}
                                    </>
                                  )
                                )}
                                {/* end of mapping for listing users card */}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  }
                )}
                {/* end of mapping for listing application */}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* conditional rendering based on onClick */}
      <div className="col-auto" id="userdetailpop">
        {active === "None"}
        {active === "User Details" && (
          <>
            {/* width resizable for form */}
            <div className="panel panel-default shadow p-2 mb-5 bg-white">
              <span className="closeform">
                <AiOutlineClose
                  type="button"
                  title="Close"
                  size="1.5em"
                  onClick={() => setActive("None")}
                />
              </span>
              <UserDetails userid={userid} appid={appid} />
            </div>
          </>
        )}
        {active === "New Users" && (
          <>
            <div className="panel panel-default shadow p-3 mb-5 bg-white">
              <div>
                <div className="closeform">
                  <AiOutlineClose
                    type="button"
                    title="Close"
                    size={25}
                    onClick={() => {
                      setActive("None");
                    }}
                  />
                </div>
                <NewUser appid={appid} />
              </div>
            </div>
          </>
        )}
        {active === "Create Application" && (
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
            <NewAppDetail />
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

export default AppsView;
