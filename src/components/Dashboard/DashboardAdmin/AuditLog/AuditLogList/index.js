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

const AuditLogList = () => {
  const initialSort = {
    field: "auditid",
    isAscSort: undefined
  }
  const [auditLogs, setAuditLogs] = useState([]); //to store data & render in DOM
  const [sortConfig, setSortConfig] = useState(initialSort);

  // retrive audit logs from DB
  useEffect(() => {
    Axios.get("/auditlogs/sel") //fetch api to read files
      .then((res) => {
        if (res.status === 200) {
          setAuditLogs(res.data[0]);
        }
      }).catch((err) => {
        console.log("Failed to get audit logs", err);
      })
  }, []);

  // sorting algorithm
  const onSort = (e) => {
    let config = sortConfig;
    let auditlogs = [...auditLogs];
    let col = e.target.id

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
      
      if (col === "auditid" || col === "modifierid" || col === "targetuserid") {
        // int data type sorting 
        auditlogs = auditlogs.sort((a, b) => a[col] - b[col]);
      }
      else {
        // string data type sorting
        auditlogs = auditlogs.sort((a, b) => a[col].localeCompare(b[col]));
      }
      
      // if isAscSort is false then reverse the sorting
      if (config.isAscSort === false) {
        auditlogs.reverse();
      }
    }
    setAuditLogs(auditlogs);
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

  let auditlogs = [...auditLogs];

  // "state" is refer to initial state, where input is the string from user input for filtering
  const filteringReducer = (state, input) => {
    auditlogs = auditLogs.filter(item => (
      item[input.field].toString().toLowerCase().match(escapeRegExp(input.value.toLowerCase()))
    )
    );
    return auditlogs;
  }

  // useReducer returns an array that holds the current state value
  // the "state" refers to initial state
  const [dispatch] = useReducer(filteringReducer,
    {
      field: "",
      value: ""
    }
  );
  const bgcolor = {
    backgroundColor: "#343A40",
  };

  return (
    <div className="row position-relative">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
        <div className="panel panel-default shadow p-3 mb-5 bg-white">
          <div className="panel-heading"><h3>Audit Log</h3></div>
          <div className="panel-body">
            {/* Table header*/}
            <table className="table table-condensed table-hover table-responsive">
              <thead className="thead-dark">
                <tr>

                  {/** Audit ID */}
                  <th>
                    <div className="table-header-text header-width-id" id="auditid" type="button" onClick={(e) => onSort(e)}>
                      ID
                      <div className="btn-group float-right">
                        {sortConfig.field === "auditid" && sortConfig.isAscSort === true && <span><FaSortNumericDown /></span>}
                        {sortConfig.field === "auditid" && sortConfig.isAscSort === false && <span><FaSortNumericDownAlt /></span>}
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
                            id="auditid"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Modifier Name */}
                  <th>
                    <div className="table-header-text header-width" id="modifiername" type="button" onClick={(e) => onSort(e)}>
                      Modifier
                      <div className="btn-group float-right">
                        {sortConfig.field === "modifiername" && sortConfig.isAscSort === true && <span><FaSortAlphaDown /></span>}
                        {sortConfig.field === "modifiername" && sortConfig.isAscSort === false && <span><FaSortAlphaDownAlt /></span>}
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
                            id="modifiername"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Modifier User ID */}
                  <th>
                    <div className="table-header-text header-width" id="modifierid" type="button" onClick={(e) => onSort(e)}>
                      Modifier User ID
                      <div className="btn-group float-right">
                        {sortConfig.field === "modifierid" && sortConfig.isAscSort === true && <span><FaSortNumericDown /></span>}
                        {sortConfig.field === "modifierid" && sortConfig.isAscSort === false && <span><FaSortNumericDownAlt /></span>}
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
                            id="modifierid"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Target Username */}
                  <th>
                    <div className="table-header-text header-width" id="targetusername" type="button" onClick={(e) => onSort(e)}>
                      Target
                      <div className="btn-group float-right">
                        {sortConfig.field === "targetusername" && sortConfig.isAscSort === true && <span><FaSortAlphaDown /></span>}
                        {sortConfig.field === "targetusername" && sortConfig.isAscSort === false && <span><FaSortAlphaDownAlt /></span>}
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
                            id="targetusername"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Target User ID */}
                  <th>
                    <div className="table-header-text header-width" id="targetuserid" type="button" onClick={(e) => onSort(e)}>
                      Target User ID
                      <div className="btn-group float-right">
                        {sortConfig.field === "targetuserid" && sortConfig.isAscSort === true && <span><FaSortNumericDown /></span>}
                        {sortConfig.field === "targetuserid" && sortConfig.isAscSort === false && <span><FaSortNumericDownAlt /></span>}
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
                            id="targetuserid"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Object */}
                  <th>
                    <div className="table-header-text header-width" id="objectname" type="button" onClick={(e) => onSort(e)}>
                      Object
                      <div className="btn-group float-right">
                        {sortConfig.field === "objectname" && sortConfig.isAscSort === true && <span><FaSortAlphaDown /></span>}
                        {sortConfig.field === "objectname" && sortConfig.isAscSort === false && <span><FaSortAlphaDownAlt /></span>}
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
                            id="objectname"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Action */}
                  <th>
                    <div className="table-header-text header-width" id="actionname" type="button" onClick={(e) => onSort(e)}>
                      Action
                      <div className="btn-group float-right">
                        {sortConfig.field === "actionname" && sortConfig.isAscSort === true && <span><FaSortAlphaDown /></span>}
                        {sortConfig.field === "actionname" && sortConfig.isAscSort === false && <span><FaSortAlphaDownAlt /></span>}
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
                            id="actionname"
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
                    <div className="table-header-text header-width" id="valueorigin" type="button" onClick={(e) => onSort(e)}>
                      Value (Original)
                      <div className="btn-group float-right">
                        {sortConfig.field === "valueorigin" && sortConfig.isAscSort === true && <span><FaSortAlphaDown /></span>}
                        {sortConfig.field === "valueorigin" && sortConfig.isAscSort === false && <span><FaSortAlphaDownAlt /></span>}
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
                            id="valueorigin"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** New Value */}
                  <th>
                    <div className="table-header-text header-width" id="valuenew" type="button" onClick={(e) => onSort(e)}>
                      Value (New)
                      <div className="btn-group float-right">
                        {sortConfig.field === "valuenew" && sortConfig.isAscSort === true && <span><FaSortAlphaDown /></span>}
                        {sortConfig.field === "valuenew" && sortConfig.isAscSort === false && <span><FaSortAlphaDownAlt /></span>}
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
                            id="valuenew"
                            placeholder="search"
                            //call the handle change function
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Modified Date */}
                  <th>
                    <div className="table-header-text header-width" id="datecreated" type="button" onClick={(e) => onSort(e)}>
                      Modified Date
                      <div className="btn-group float-right">
                        {sortConfig.field === "datecreated" && sortConfig.isAscSort === true && <span><FaSortAlphaDown /></span>}
                        {sortConfig.field === "datecreated" && sortConfig.isAscSort === false && <span><FaSortAlphaDownAlt /></span>}
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
                </tr>
              </thead>

              <tbody>
                {auditlogs.map((auditlog) => (
                  <tr key={auditlog.auditid}>
                    <td>{auditlog.auditid}</td>
                    <td>{auditlog.modifiername}</td>
                    <td>{auditlog.modifierid}</td>
                    <td>{auditlog.targetusername}</td>
                    <td>{auditlog.targetuserid}</td>
                    <td>{auditlog.objectname}</td>
                    <td>{auditlog.actionname}</td>
                    <td>{auditlog.valueorigin}</td>
                    <td>{auditlog.valuenew}</td>
                    <td>{auditlog.datecreated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogList;