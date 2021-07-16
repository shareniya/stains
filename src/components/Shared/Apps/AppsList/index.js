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
import NewAppDetail from "../../CreateApplication/createapp";

const AppsList = () => {
  const initialSort = {
    field: "id",
    isAscSort: undefined,
  };
  const [appsList, setAppsList] = useState([]); //to store data & render in DOM
  const [sortConfig, setSortConfig] = useState(initialSort);
  const [active, setActive] = useState("None");

  // retrive audit logs from DB
  useEffect(() => {
    Axios.get("/applications/sel") //fetch api to read files
      .then((res) => {
        if (res.status === 200) {
          setAppsList(res.data[0]);
          console.log(res.data[0]);
        }
      })
      .catch((err) => {
        console.log("Failed to get audit logs", err);
      });
  }, []);

  // sorting algorithm
  const onSort = (e) => {
    let config = sortConfig;
    let appsdetail = [...appsList];
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

      if (col === "id" || col === "expectedappmembercount") {
        // int data type sorting
        appsdetail = appsdetail.sort((a, b) => a[col] - b[col]);
      } else {
        // string data type sorting
        appsdetail = appsdetail.sort((a, b) => a[col].localeCompare(b[col]));
      }

      // if isAscSort is false then reverse the sorting
      if (config.isAscSort === false) {
        appsdetail.reverse();
      }
    }
    setAppsList(appsdetail);
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

  let appsdetail = [...appsList];

  // "state" is refer to initial state, where input is the string from user input for filtering
  const filteringReducer = (state, input) => {
    appsdetail = appsList.filter((item) =>
      item[input.field]
        .toString()
        .toLowerCase()
        .match(escapeRegExp(input.value.toLowerCase()))
    );
    return appsdetail;
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
        <div className="panel panel-default shadow p-3 mb-5 bg-white">
          <header>
            <h3>
              Applications
              {/* button to add new app */}
              <button
                className="btn btn-success btn-sm float-right m-2"
                //onclick function to trigger and change the react hook state
                onClick={() => {
                  setActive("New App");
                }}
              >
                CREATE APP
              </button>
            </h3>
          </header>
          <div className="panel-body table-responsive">
            {/* Table header*/}
            <table className="table table-condensed table-hover table-responsive">
              <thead className="thead-dark">
                <tr>
                  {/** Application ID */}
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

                  {/** App Name */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="appname"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      App Name
                      <div className="btn-group float-right">
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
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** App URL */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="appurl"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      URL
                      <div className="btn-group float-right">
                        {sortConfig.field === "appurl" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "appurl" &&
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
                            id="appurl"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** DevOps URL */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="devopslink"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      DevOps URL
                      <div className="btn-group float-right">
                        {sortConfig.field === "devopslink" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortNumericDown />
                            </span>
                          )}
                        {sortConfig.field === "devopslink" &&
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
                            id="devopslink"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Tech Stack */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="techstack"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Tech Stacks
                      <div className="btn-group float-right">
                        {sortConfig.field === "techstack" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "techstack" &&
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
                            id="techstack"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Expected App member count */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="expectedappmembercount"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Member Count
                      <div className="btn-group float-right">
                        {sortConfig.field === "expectedappmembercount" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortNumericDown />
                            </span>
                          )}
                        {sortConfig.field === "expectedappmembercount" &&
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
                            id="expectedappmembercount"
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
                  

                  {/** Original Value */}
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

                  {/** Comments */}
                  <th>
                    <div
                      className="table-header-text header-width"
                      id="comments"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Comments
                      <div className="btn-group float-right">
                        {sortConfig.field === "comments" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "comments" &&
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
                            id="comments"
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
                {appsdetail.map((auditlog) => (
                  <tr key={auditlog.id}>
                    <td>{auditlog.id}</td>
                    <td>{auditlog.appname}</td>
                    <td>{auditlog.appurl}</td>
                    <td>{auditlog.devopslink}</td>
                    <td>{auditlog.techstack}</td>
                    <td>{auditlog.expectedappmembercount}</td>
                    <td>{auditlog.datecreated}</td>
                    <td>{auditlog.datemodified}</td>
                    <td>{auditlog.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
       {/* conditional rendering based on onClick */}

      <div className="col-auto" id="appdetailpop">
        {active === "New App" && (
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
        </div>
    </div>
  );
};

export default AppsList;
