import React, { useState, useEffect, useReducer } from "react";
import Axios from "axios"; //make request thru api
import UserRoleCreate from "../UserRoleCreate";
import {
  FaFilter,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaSortNumericDownAlt,
  FaSortNumericDown,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "./style.css";

const UserRolesTable = () => {
  const initialSort = {
    field: "id",
    isAscSort: undefined,
  };

  const [userRoles, setUserRoles] = useState([]); //to store data & render in DOM
  const [active, setActive] = useState("None");
  const [sortConfig, setSortConfig] = useState(initialSort);

  //componentDidMount (do something after render)
  useEffect(() => {
    Axios.get("/lookupuserroles") //Fetch user roles type list
      .then((res) => {
        if (res.status === 200) {
          setUserRoles(res.data[0]);
        }
      })
      .catch((err) => {
        console.log("Failed to fetch user roles type list data.", err);
      });
  }, []);

  //Handling change when there is changes in textbox for query aka filtering
  const handleChangeValue = (e) => {
    let queryField = e.target.id;
    let queryValue = e.target.value;

    //pass field and value to reducer
    dispatch({ field: queryField, value: queryValue });
  };

  // escape special characters from search string
  const escapeRegExp = (string) => {
    return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  };

  //set the data from api calls to rolesData
  let rolesData = userRoles;

  // "state" is refer to initial state, where input is the string from user input for filtering
  const filteringReducer = (state, input) => {
    rolesData = rolesData.filter((item) =>
      item[input.field]
        .toString()
        .toLowerCase()
        .match(escapeRegExp(input.value.toLowerCase()))
    );
    return rolesData;
  };

  // useReducer returns an array that holds the current state value
  // the "state" refers to initial state
  const [dispatch] = useReducer(filteringReducer, {
    field: "",
    value: "",
  });

  const onSort = (e) => {
    let config = sortConfig;
    let rolesData = [...userRoles];
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

      switch (col) {
        case "id":
          // id is integer
          rolesData = rolesData.sort((a, b) => a[col] - b[col]);
          break;
        default:
          // other columns are string
          rolesData = rolesData.sort((a, b) => a[col].localeCompare(b[col]));
          break;
      }

      // if isAscSort is false then reverse the sorting
      if (config.isAscSort === false) {
        rolesData.reverse();
      }
    }
    setUserRoles(rolesData);
  };

  const bgcolor = {
    backgroundColor: "#343A40",
  };

  return (
    <div className="row position-relative">
      <div className=" col-md-12 ">
        <div className="panel panel-default shadow p-3 mb-5 bg-white">
          <p>
            <h3 id="titledash">User Roles</h3>

            <button
              className="btn btn-success btn-sm float-right mb-2"
              //onclick function to trigger and change the react hook state
              onClick={() => {
                setActive("Add Roles");
              }}
            >
              CREATE USER ROLE
            </button>
          </p>

          {/* Table header*/}
          <div className="panel-body table-responsive">
            <table className="table table-condensed table-hover ">
              <thead className="thead-dark">
                <tr>
                  {/* header for id */}
                  <th className="align-middle header-width-id">
                    <div
                      className="table-header-text"
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

                  {/* header for role name */}
                  <th className="align-middle header-width">
                    <div
                      className="table-header-text"
                      id="rolename"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Role Name
                      <div className="btn-group float-right">
                        {sortConfig.field === "rolename" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "rolename" &&
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
                            id="rolename"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/* header for date created*/}
                  <th className="align-middle header-width">
                    <div
                      className="table-header-text"
                      id="datecreated"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Date Created{" "}
                      <div className="btn-group float-right">
                        {sortConfig.field === "datecreated" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortNumericDown />
                            </span>
                          )}
                        {sortConfig.field === "datecreated" &&
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
                            className="form-control-sm m-1"
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

                  {/* header for date modified*/}
                  <th className="align-middle header-width">
                    <div
                      className="table-header-text"
                      id="datemodified"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Date Modified{" "}
                      <div className="btn-group float-right">
                        {sortConfig.field === "datemodified" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortNumericDown />
                            </span>
                          )}
                        {sortConfig.field === "datemodified" &&
                          sortConfig.isAscSort === false && (
                            <span>
                              <FaSortNumericDownAlt disabled={true} />
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
                            className="form-control-sm m-1"
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

              {/* Main content for the table */}

              <tbody>
                {rolesData.map(
                  (
                    val,
                    key //mapping for user role type
                  ) => {
                    return (
                      <>
                        <tr key={key}>
                          <td>{val.id}</td>
                          <td>{val.rolename}</td>
                          <td>{val.datecreated}</td>
                          <td>{val.datemodified}</td>
                        </tr>
                      </>
                    );
                  }
                )}
                {/* end of mapping for user roles type */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Onclick conditional rendering */}
      <div className="col-auto" id="employmentpop">
        {active === "None"}
        {active === "Add Roles" && (
          <div className="row panel panel-default bg-white shadow p-3">
            <div className="col">
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
              <UserRoleCreate />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRolesTable;
