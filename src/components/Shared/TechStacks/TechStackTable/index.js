import React, { useState, useEffect, useReducer } from "react";
import Axios from "axios"; //make request thru api
import TechStackCreate from "../TechStackCreate";
import {
  FaFilter,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaSortNumericDownAlt,
  FaSortNumericDown,
} from "react-icons/fa";
import "../style.css";
import { AiOutlineClose } from "react-icons/ai";
import { Rnd } from "react-rnd"; //package for resizable form"

const TechStackList = () => {
  const initialSort = {
    field: "id",
    isAscSort: undefined,
  };

  const [techStacks, setTechStacks] = useState([]); //to store data & render in DOM
  const [active, setActive] = useState("None");
  const [sortConfig, setSortConfig] = useState(initialSort);

  useEffect(() => {
    Axios.get("/techstacks/sel") //fetch api to read files
      .then((res) => {
        let techstacks = res.data[0];
        techstacks = techstacks.filter(
          (techstack) => techstack.techname !== "System Administration"
        );
        setTechStacks(techstacks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  let techstacks = [...techStacks];

  // "state" is refer to initial state, where input is the string from user input for filtering
  const filteringReducer = (state, input) => {
    techstacks = techstacks.filter((item) =>
      item[input.field]
        .toString()
        .toLowerCase()
        .match(escapeRegExp(input.value.toLowerCase()))
    );
    return techstacks;
  };

  // useReducer returns an array that holds the current state value
  // the "state" refers to initial state
  const [state, dispatch] = useReducer(filteringReducer, {
    field: "",
    value: "",
  });

  // sorting algorithm
  const onSort = (e) => {
    let config = sortConfig;
    let techstacks = [...techStacks];
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
          techstacks = techstacks.sort((a, b) => a[col] - b[col]);
          break;
        default:
          // other columns are string
          techstacks = techstacks.sort((a, b) => a[col].localeCompare(b[col]));
          break;
      }

      // if isAscSort is false then reverse the sorting
      if (config.isAscSort === false) {
        techstacks.reverse();
      }
    }
    setTechStacks(techstacks);
  };

  const bgcolor = {
    backgroundColor: "#343A40",
  };

  return (
    <div className="row position-relative">
      <div className="col-sm-12 col-md-12 col-lg-12">
        <div className="panel panel-default shadow p-3 mt-4 ml-3 mb-3 bg-white">
          <p>
            <h3 id="titledash">Tech Stacks/ Skills</h3>

            {/* button to add new tech skill */}
            <button
              className="btn btn-success btn-sm float-right mt-1"
              //onclick function to trigger and change the react hook state
              onClick={() => {
                setActive("Add Tech Stack");
              }}
            >
              CREATE TECH STACK
            </button>
          </p>

          <div className="panel-body table-responsive">
            <table className="table table-condensed table-hover">
              <thead className="thead-dark">
                <tr>
                  {/** ID */}
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
                          <span>
                            <input
                              className="form-control-sm sm-1"
                              type="text"
                              id="id"
                              placeholder="search"
                              onChange={(e) => handleChangeValue(e)}
                              value={dispatch.value}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Tech Stacks */}
                  <th className="align-middle header-width">
                    <div
                      className="table-header-text"
                      id="techname"
                      type="button"
                      onClick={(e) => onSort(e)}
                    >
                      Tech Name
                      <div className="btn-group float-right">
                        {sortConfig.field === "techname" &&
                          sortConfig.isAscSort === true && (
                            <span>
                              <FaSortAlphaDown />
                            </span>
                          )}
                        {sortConfig.field === "techname" &&
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
                            id="techname"
                            placeholder="search"
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Date Created */}
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
                            onChange={(e) => handleChangeValue(e)}
                            value={dispatch.value}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  {/** Date Modified */}
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
                {techstacks.map((val, key) => (
                  <tr key={val.id}>
                    <td className="table-data-id">{val.id}</td>
                    <td className="table-data">{val.techname}</td>
                    <td className="table-data-date">{val.datecreated}</td>
                    <td className="table-data-date">{val.datemodified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Onclick conditional rendering */}
      <div className="col-auto" id="newtechstackpop">
        {active === "None"}
        {active === "Add Tech Stack" && (
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
              <TechStackCreate />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStackList;
