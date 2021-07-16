import React, { useState, useEffect, useReducer } from "react";
import Axios from "axios";
import {
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaSortNumericDown,
  FaSortNumericDownAlt,
  FaFilter
} from "react-icons/fa"

const PageView = () => {
  const initialSort = {
    field: "pagename",
    isAscSort: undefined
  }
  //declare "state variables"
  const [pageView, setPageView] = useState([]);
  const [sortConfig, setSortConfig] = useState(initialSort);


  //effect hook, similar to componentdidmount to fetch data
  useEffect(() => {
    Axios.get("/lookuppages")
      .then((res) => {
        if (res.status === 200) {
          setPageView(res.data[0]);
        }
      }).catch((err) => {
        console.log("Error in getting Page Views.", err);
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

  let pageViews = [...pageView];

  // "state" is refer to initial state, where input is the string from user input for filtering
  const filteringReducer = (state, input) => {
    pageViews = pageViews.filter((item) =>
      item[input.field]
        .toString()
        .toLowerCase()
        .match(escapeRegExp(input.value.toLowerCase()))
    );
    return pageViews;
  };

  // useReducer returns an array that holds the current state value
  // the "state" refers to initial state
  const [dispatch] = useReducer(filteringReducer, {
    field: "",
    value: "",
  });

  const onSort = (e) => {
    let config = sortConfig;
    let pageViews = [...pageView];
    let col = e.target.id

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

      if (col === "id" || col === "views") {
        // id and views is integer
        pageViews = pageViews.sort((a, b) => a[col] - b[col]);
      }
      else {
        // other columns are string
        pageViews = pageViews.sort((a, b) => a[col].localeCompare(b[col]));
      }
    }
    // if isAscSort is false then reverse the sorting
    if (config.isAscSort === false) {
      pageViews.reverse();
    }

    setPageView(pageViews)
  };

  const bgcolor = {
    backgroundColor: "#E9ECEF",
  };

  return (
    <div className="row p-2">
      <div className="col-md-12">
        <h3> Pages Viewed</h3>
        <table className="table table-hover table-sm-10 p-2">
          <thead className="thead-light">
            <tr>
              <th className="align-middle header-width-id">
                <div 
                className="table-header-text" id="pagename" 
                type="button" onClick={(e) => onSort(e)}
                >
                  Page Name
                  <div className="btn-group float-right">
                    {sortConfig.field === "pagename" && sortConfig.isAscSort === true && (
                      <span>
                        <FaSortAlphaDown />
                      </span>)}
                    {sortConfig.field === "pagename" && sortConfig.isAscSort === false && (
                      <span>
                        <FaSortAlphaDownAlt />
                      </span>)}
                    <span
                      type="button"
                      className="btn btn-sm icon"
                      data-toggle="dropdown"
                    >
                      <FaFilter />
                    </span>
                    <div
                      className="dropdown-menu dropdown-menu-right mt-0 border-0 rounded-0"
                      style={bgcolor}
                    >
                      <span>
                        <input
                          className="form-control-sm sm-1"
                          type="text"
                          id="pagename"
                          placeholder="search"
                          onChange={(e) => handleChangeValue(e)}
                          value={dispatch.value}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </th>
              <th>
                <div className="table-header-text" id="url" type="button" onClick={(e) => onSort(e)}>
                  Page URL
                  <div className="btn-group float-right">
                    {sortConfig.field === "url" && sortConfig.isAscSort === true && <span><FaSortAlphaDown /></span>}
                    {sortConfig.field === "url" && sortConfig.isAscSort === false && <span><FaSortAlphaDownAlt /></span>}
                    <span
                      type="button"
                      className="btn btn-sm icon"
                      data-toggle="dropdown"
                    >
                      <FaFilter />
                    </span>
                    <div
                      className="dropdown-menu dropdown-menu-right mt-0 border-0 rounded-0"
                      style={bgcolor}
                    >
                      <span>
                        <input
                          className="form-control-sm sm-1"
                          type="text"
                          id="url"
                          placeholder="search"
                          onChange={(e) => handleChangeValue(e)}
                          value={dispatch.value}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </th>
              <th>
                <div className="table-header-text" id="views" type="button" onClick={(e) => onSort(e)}>
                  Views
                  <div className="btn-group float-right">
                    {sortConfig.field === "views" && sortConfig.isAscSort === true && <span><FaSortNumericDown /></span>}
                    {sortConfig.field === "views" && sortConfig.isAscSort === false && <span><FaSortNumericDownAlt /></span>}
                    <span
                      type="button"
                      className="btn btn-sm icon"
                      data-toggle="dropdown"
                    >
                      <FaFilter />
                    </span>
                    <div
                      className="dropdown-menu dropdown-menu-right mt-0 border-0 rounded-0"
                      style={bgcolor}
                    >
                      <span>
                        <input
                          className="form-control-sm sm-1"
                          type="text"
                          id="views"
                          placeholder="search"
                          onChange={(e) => handleChangeValue(e)}
                          value={dispatch.value}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </th>
              <th>
                <div className="table-header-text" id="datemodified" type="button" onClick={(e) => onSort(e)}>
                  Date Modified
                  <div className="btn-group float-right">
                    {sortConfig.field === "datemodified" && sortConfig.isAscSort === true && <span><FaSortAlphaDown /></span>}
                    {sortConfig.field === "datemodified" && sortConfig.isAscSort === false && <span><FaSortAlphaDownAlt /></span>}
                    <span
                      type="button"
                      className="btn btn-sm icon"
                      data-toggle="dropdown"
                    >
                      <FaFilter />
                    </span>
                    <div
                      className="dropdown-menu dropdown-menu-right mt-0 border-0 rounded-0"
                      style={bgcolor}
                    >
                      <span>
                        <input
                          className="form-control-sm sm-1"
                          type="text"
                          id="datemodified"
                          placeholder="search"
                          onChange={(e) => handleChangeValue(e)}
                          value={dispatch.value}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </th>

            </tr>
          </thead>
          <tbody>
            {pageViews.map((pages, index) => (
              <tr key={index}>
                <td>{pages.pagename}</td>
                <td>{pages.url}</td>
                <td>{pages.views}</td>
                <td>{pages.datemodified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>

  );
};

export default PageView;