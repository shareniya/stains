import React, { useState, useEffect, useReducer } from "react";
import Axios from "axios"; //make request thru api
import {
  FaFilter,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaSortNumericDownAlt,
  FaSortNumericDown,
} from "react-icons/fa";
import "../style.css";
import { AiOutlineClose } from "react-icons/ai";
//import CreateUser from "../Shared/Users/CreateUser";
import CreateUser from "../../Users/CreateUser";


const UsersList = () => {
  const initialSort = {
    field: "id",
    isAscSort: undefined,
  };
  const [usersList, setUsersList] = useState([]); //to store data & render in DOM
  const [sortConfig, setSortConfig] = useState(initialSort);
  const [active, setActive] = useState("None");

  // retrive audit logs from DB
  useEffect(() => {
    Axios.get("/users/sel") //fetch api to read files
      .then((res) => {
        if (res.status === 200) {
          setUsersList(res.data[0]);
          //console.log(res.data[0]);
        }
      })
      .catch((err) => {
        console.log("Failed to get audit logs", err);
      });
  }, []);

  // sorting algorithm
  const onSort = (e) => {
    let config = sortConfig;
    let userslist = [...usersList];
    let col = e.target.id;

    if (e.target.type !== "text") {
      // set the column (field) in sort configure
      // if e.target.id is returned from click event, use it as configuration for field/column
      if (col) {
        config.field = col;
      } else {
        // if e.target.id is not pass from click event, then copy from configuration
        config.field = sortConfig.field;
        col = config.field;
      }
      // reverse the Asc/Des icon
      config.isAscSort = !config.isAscSort;
      setSortConfig(config);

      if (col === "id") {
        // int data type sorting
        userslist = userslist.sort((a, b) => a[col] - b[col]);
      } else {
        // string data type sorting
        userslist = userslist.sort((a, b) => a[col].localeCompare(b[col]));
      }

      // if isAscSort is false then reverse the sorting
      if (config.isAscSort === false) {
        userslist.reverse();
      }
    }
    setUsersList(userslist);
  };

  //Handling change when there is changes in textbox for query aka filtering
  const handleChangeValue = (e) => {
    let queryField = e.target.id;
    let queryValue = e.target.value;

    //pass field and value to reducer
    dispatch({ field: queryField, value: queryValue });
  };

  // escape special characters from query string
  const escapeRegExp = (string) => {
    return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  };

  let userslist = [...usersList];

  // "state" is refer to initial state, where input is the string from user input for filtering
  const filteringReducer = (state, input) => {
    userslist = usersList.filter((item) =>
      item[input.field]
        .toString()
        .toLowerCase()
        .match(escapeRegExp(input.value.toLowerCase()))
    );
    return userslist;
  };

  // useReducer returns an array that holds the current state value
  // the "state" refers to initial state
  const [dispatch] = useReducer(filteringReducer, {
    field: "",
    value: "",
  });
  const bgcolor = {
    backgroundColor: "#343A40",
  };

  return (
    <div className="row position-relative">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
        <div className="panel panel-default shadow p-3 mt-1 mb-5 bg-white">
          <header>
            <h3>Users
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
            </h3>
          </header>
          <div className="panel-body table-responsive">
            {/* Table header*/}
            <table className="table table-condensed table-hover table-responsive">
              <thead className="thead-dark">
                <tr>
                  {/** Users ID */}
                  <th>
                    <div
                      className="table-header-text header-width-id"
                      id="id"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      ID
                      <div className="btn-group float-right">
                        {sortConfig.field === "id" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortNumericDown />
                            </span>
                          )}
                        {sortConfig.field === "id" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortNumericDownAlt />
                            </span>
                          )}
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
                            id="id"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>
                  
                  {/* Has Account Property */}
                  <th>
                    <div
                      className="table-header-text header-width-id"
                      id="id"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Has Account
                      <div className="btn-group float-right">
                        {sortConfig.field === "hasaccount" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortNumericDown />
                            </span>
                          )}
                        {sortConfig.field === "hasaccount" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortNumericDownAlt />
                            </span>
                          )}
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
                            id="hasaccount"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Users full name */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="fullname"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Full Name
                      <div className="btn-group float-right">
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
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Users email */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="email"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Email
                      <div className="btn-group float-right">
                        {sortConfig.field === "email" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortNumericDown />
                            </span>
                          )}
                        {sortConfig.field === "email" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortNumericDownAlt />
                            </span>
                          )}
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
                            id="email"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Phone Number */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="phonenumber"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Phone Number
                      <div className="btn-group float-right">
                        {sortConfig.field === "phonenumber" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "phonenumber" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortAlphaDownAlt />
                            </span>
                          )}
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
                            id="phonenumber"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Position */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="position"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Position
                      <div className="btn-group float-right">
                        {sortConfig.field === "position" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortNumericDown />
                            </span>
                          )}
                        {sortConfig.field === "position" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortNumericDownAlt />
                            </span>
                          )}
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
                            id="position"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Primary Skills */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="primaryskillname"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Primary Skills
                      <div className="btn-group float-right">
                        {sortConfig.field === "primaryskillname" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "primaryskillname" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortAlphaDownAlt />
                            </span>
                          )}
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
                            id="primaryskillname"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Secondary Skills */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="secondaryskillname"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Secondary Skills
                      <div className="btn-group float-right">
                        {sortConfig.field === "secondaryskillname" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "secondaryskillname" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortAlphaDownAlt />
                            </span>
                          )}
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
                            id="secondaryskillname"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Daily Rate */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="dailyrate"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Daily Rate
                      <div className="btn-group float-right">
                        {sortConfig.field === "dailyrate" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "dailyrate" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortAlphaDownAlt />
                            </span>
                          )}
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
                            id="dailyrate"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Contract Start Date */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="contractstartdate"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Contract Start Date
                      <div className="btn-group float-right">
                        {sortConfig.field === "contractstartdate" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "contractstartdate" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortAlphaDownAlt />
                            </span>
                          )}
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
                            id="contractstartdate"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Contract End Date */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="contractenddate"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Contract End Date
                      <div className="btn-group float-right">
                        {sortConfig.field === "contractenddate" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "contractenddate" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortAlphaDownAlt />
                            </span>
                          )}
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
                            id="contractenddate"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Date Created */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="datecreated"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Date Created
                      <div className="btn-group float-right">
                        {sortConfig.field === "datecreated" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "datecreated" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortAlphaDownAlt />
                            </span>
                          )}
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
                            id="datecreated"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Date Modified */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="datemodified"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Date Modified
                      <div className="btn-group float-right">
                        {sortConfig.field === "datemodified" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "datemodified" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortAlphaDownAlt />
                            </span>
                          )}
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
                            id="datemodified"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {userslist.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.hasaccount}</td>
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{user.phonenumber}</td>
                    <td>{user.position}</td>
                    <td>{user.primaryskillname}</td>
                    <td>{user.secondaryskillname}</td>
                    <td>{user.dailyrate}</td>
                    <td>{user.contractstartdate}</td>
                    <td>{user.contractenddate}</td>
                    <td>{user.datecreated}</td>
                    <td>{user.datemodified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* conditional rendering based on onClick */}

      <div className="col-auto" id="appdetailpop">
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
      </div>
    </div>
  );
};

export default UsersList;
