import React, { useEffect, useState, useReducer } from "react";
import Axios from "axios"; //make request thru api
import {
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaFilter
} from "react-icons/fa"

const UsersNotLoggedIn = () => {

  const initialSort = {
    field: "id",
    isAscSort: undefined
  }

  const [usersnotloggedin, setUsersnotloggedin] = useState([]);
  const [sortConfig, setSortConfig] = useState(initialSort);
  // TODO: add check status and error catching
  useEffect(() => {
    Axios.get("/usersnotloggedin")
      .then((res) => {
        if (res.status === 200) {
          let users = res.data[0];
          setUsersnotloggedin(users);
        }
      }).catch((err) => {
        console.log("Failed to get users not loggen in the past 90 days");
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

  let  usersnotloggedins = [...usersnotloggedin];

  // "state" is refer to initial state, where input is the string from user input for filtering
  const filteringReducer = (state, input) => {
    usersnotloggedins =  usersnotloggedins.filter((item) =>
      item[input.field]

        .toString()
        .toLowerCase()
        .match(escapeRegExp(input.value.toLowerCase()))
    );
    return  usersnotloggedins;
  };

  // useReducer returns an array that holds the current state value
  // the "state" refers to initial state
  const [dispatch] = useReducer(filteringReducer, {
    field: "",
    value: "",
  });

  const sendNotificationEmail = () => {

    let recipients = [...usersnotloggedin].map((user) => {
      let recipient = {};
      recipient["email"] = user.email;
      recipient["name"] = [user.firstname, user.lastname].join(" ");
      return recipient;
    });

    console.log("Noti email recipients:", recipients);
    Axios.post("/send/notification", {
      recipients
    }).then((res) => {
      if (res.status === 200) {
        alert("Successfully send notification email to users.");
      }
    }).catch((err) => {
      alert("Failed to send notification email");
    })
  }


  const onSort = (e) => {
    let config = sortConfig;
    let usersnotloggedins = [...usersnotloggedin];
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

      if (col === "id" || col === "name" ||col === "latestlogin" ) {
        // id and views is integer
        usersnotloggedins =  usersnotloggedins.sort((a, b) => a[col] - b[col]);
      }
      else {
        // other columns are string
        usersnotloggedins =  usersnotloggedins.sort((a, b) => a[col].localeCompare(b[col]));
      }
    }
    // if isAscSort is false then reverse the sorting
    if (config.isAscSort === false) {
      usersnotloggedins.reverse();
    }

    setUsersnotloggedin( usersnotloggedins)
  };

  const bgcolor = {
    backgroundColor: "#E9ECEF",
  };
  

  return (
    <div className="row p-2">
      <div className="col-sm-12 col-md-12 col-lg-12">
        <h3> Users Not Logged In Last 90 Days</h3>
        <table className="table table-hover table-sm-10 p-2">
        <thead className="thead-light">
            <tr>
              <th className="align-middle header-width-id">
                <div 
                className="table-header-text" id="id" 
                type="button" onClick={(e) => onSort(e)}
                >
                  id
                  <div className="btn-group float-right">
                    {sortConfig.field === "id" && sortConfig.isAscSort === true && (
                      <span>
                        <FaSortAlphaDown />
                      </span>)}
                    {sortConfig.field === "id" && sortConfig.isAscSort === false && (
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
              <th>
                <div className="table-header-text" id="name" type="button" onClick={(e) => onSort(e)}>
                  Name
                  <div className="btn-group float-right">
                    {sortConfig.field === "name" && sortConfig.isAscSort === true && <span><FaSortAlphaDown /></span>}
                    {sortConfig.field === "name" && sortConfig.isAscSort === false && <span><FaSortAlphaDownAlt /></span>}
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
                          id="username"
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
                <div className="table-header-text" id="latestlogin" type="button" onClick={(e) => onSort(e)}>
                  Date Modified
                  <div className="btn-group float-right">
                    {sortConfig.field === "latestlogin" && sortConfig.isAscSort === true && <span><FaSortAlphaDown /></span>}
                    {sortConfig.field === "latestlogin" && sortConfig.isAscSort === false && <span><FaSortAlphaDownAlt /></span>}
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
                          id="latestlogin"
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
            {usersnotloggedins.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.latestlogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="btn btn-success btn-sm float-right m-2"
          onClick={sendNotificationEmail}
        >
          SEND USER NOTIFICATION
        </button>

      </div>
    </div>
  );
};

export default UsersNotLoggedIn;