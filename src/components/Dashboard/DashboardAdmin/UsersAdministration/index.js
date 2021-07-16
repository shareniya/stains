import React, { useEffect, useState, useReducer } from "react";
import Axios from "axios";
import {
  FaFilter,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaSortNumericDownAlt,
  FaSortNumericDown,
  FaUserTie
} from "react-icons/fa";
import { GoVerified } from "react-icons/go"
import { Link } from "react-router-dom";
import "./style.css";

const UsersAdministration = () => {
  const initialSort = {
    field: "id",
    isAscSort: undefined,
  };

  const [users, setUsers] = useState([]); // data of all users
  const [roles, setRoles] = useState([]); // all role option such as Admin, Product, Engineer ...
  const [sortConfig, setSortConfig] = useState(initialSort);

  // get all role options from DB
  const getRoleOptions = () => {
    Axios.get("/lookupuserroles").then((res) => {
      if (res.status === 200) {
        let roles = res.data[0];
        setRoles(roles);
      }
    });
  };

  // get all users data from DB
  const getAllUsers = () => {
    Axios.get("/users/sel").then((res) => {
      if (res.status === 200) {
        let users = res.data[0].map((d) => {
          let usersinfo = {};
          usersinfo["id"] = d.id;
          usersinfo["hasaccount"] = d.hasaccount;
          usersinfo["firstname"] = d.firstname;
          usersinfo["lastname"] = d.lastname;
          usersinfo["fullname"] = [d.firstname, d.lastname].join(" ");
          usersinfo["email"] = d.email;
          usersinfo["position"] = d.position;
          // if roleid is not null then split the string to array then convert to int
          usersinfo["roleid"] = d.roleid ? d.roleid.split(",").map(Number) : [];

          return usersinfo;
        });

        setUsers(users);
      }
    });
  };

  // insert user role into db
  const insertUserRole = (userId, roleId) => {
    Axios.post("/userroles/ins", {
      userid: userId,
      roleid: roleId,
    })
      .then((res) => {
        if (res.status === 200) {
          roleId = parseInt(roleId);
          let newUsers = [...users]; // copy users object array from state
          let userIndex = newUsers.findIndex((user) => user.id === userId); // the index of user with id = userId in newUsers array
          let roleIndex = newUsers[userIndex].roleid.indexOf(roleId); // the index of role = roleId in roleid array

          // if the selected role doesnt exist in the user's role array then insert
          if (roleIndex === -1) {
            newUsers[userIndex].roleid.push(roleId);
          }
          // set users to re-render
          setUsers(newUsers);
        }
      })
      .catch((err) => {
        console.log("Cannot assign role to user", err);
      });
  };

  // delete all roles of the user before insert
  const deleteUserRole = (userId, roleId) => {
    Axios.delete("/userroles/del", {
      data: {
        userid: userId,
        roleid: roleId,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          roleId = parseInt(roleId);
          let newUsers = [...users]; // copy users object array from state
          let userIndex = newUsers.findIndex((user) => user.id === userId); // the index of user with id = userId in newUsers array
          let roleIndex = newUsers[userIndex].roleid.indexOf(roleId); // the index of role = roleId in roleid array

          // if the role exist in user's role array, remove it
          if (roleIndex > -1) {
            newUsers[userIndex].roleid.splice(roleIndex, 1);
          }

          // set users to re-render
          setUsers(newUsers);
        }
      })
      .catch((err) => {
        console.log("Cannot unassign role to user", err);
      });
  };

  useEffect(() => {
    getRoleOptions();
    getAllUsers();
  }, []);


  const checkboxHandler = (e, id) => {
    let isChecked = e.target.checked;
    let roleId = e.target.value;
    let userId = id;

    if (isChecked === true) {
      insertUserRole(userId, roleId);
    } else if (isChecked === false) {
      deleteUserRole(userId, roleId);
    }
  };

  const roleIsAssigned = (userId, roleId) => {
    // find index of the particular user with id = userId
    let index = users.findIndex((user) => user.id === userId);

    // if the roleid exist in the user's role then return true
    if (users[index].roleid.includes(roleId)) {
      return true;
    }

    return false;
  };



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

  //set the data from api calls to usersData
  let usersData = users;

  // "state" is refer to initial state, where input is the string from user input for filtering
  const filteringReducer = (state, input) => {
    usersData = usersData.filter(item => (
      item[input.field].toString().toLowerCase().match(escapeRegExp(input.value.toLowerCase()))
    )
    );
    return usersData;
  }


  // sorting algorithm
  const onSort = (e) => {
    let config = sortConfig;
    let usersData = [...users];
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

      switch (col) {
        case ("id"):
          // id is integer
          usersData = usersData.sort((a, b) => a[col] - b[col]);
          break;
        default:
          // other columns are string
          usersData = usersData.sort((a, b) => a[col].localeCompare(b[col]));
          break;
      }

      // if isAscSort is false then reverse the sorting
      if (config.isAscSort === false) {
        usersData.reverse();
      }
    }
    setUsers(usersData);
  };

  // useReducer returns an array that holds the current state value
  // the "state" refers to initial state
  const [dispatch] = useReducer(filteringReducer,
    {
      field: "",
      value: ""
    }
  );

  const hasRoleAssigned = (userid) => {
    // find index of the user array using the userid param
    let index = users.findIndex((user) => user.id === userid);
    // locate the user's roles array 
    let userRole = users[index].roleid;
    // user role array has length greater than zero means some role is assigned to him
    if (userRole.length > 0) {
      return (<FaUserTie />)
    }
  }

  const styling = {
    backgroundColor: "#E9ECEF",
  };

  return (

    <div className="row p-2">
      <div className="col-sm-12">
        <h3>Users Administration</h3>
        <table className="table table-hover table-sm-10 p-2">
          <thead className="thead-light">
            <tr>
              {/** ID */}
              <th className="align-middle header-width-id" >
                <div
                  className="table-header-text"
                  id="id"
                  type="button"
                  onClick={(e) => onSort(e)}
                >
                  ID
                  <div className="btn-group float-right">
                    {sortConfig.field === "id" && sortConfig.isAscSort === true && (
                      <span>
                        <FaSortNumericDown />
                      </span>
                    )}
                    {sortConfig.field === "id" && sortConfig.isAscSort === false && (
                      <span>
                        <FaSortNumericDownAlt />
                      </span>
                    )}
                    <span
                      type="button"
                      className="btn btn-sm icon"
                      data-toggle="dropdown"
                    >
                      <FaFilter />
                    </span>
                    <div
                      className="dropdown-menu dropdown-menu-right mt-0 border-0 rounded-0"
                      style={styling}
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

              {/** Header for Has Account */}
              <th className="align-middle header-width-id" >
                <div
                  className="table-header-text"
                  id="hasaccount"
                  type="button"
                  onClick={(e) => onSort(e)}
                >
                  Has Account
                  <div className="btn-group float-right">
                    {sortConfig.field === "hasaccount" && sortConfig.isAscSort === true && (
                      <span>
                        <FaSortNumericDown />
                      </span>
                    )}
                    {sortConfig.field === "hasaccount" && sortConfig.isAscSort === false && (
                      <span>
                        <FaSortNumericDownAlt />
                      </span>
                    )}
                    <span
                      type="button"
                      className="btn btn-sm icon"
                      data-toggle="dropdown"
                    >
                      <FaFilter />
                    </span>
                    <div
                      className="dropdown-menu dropdown-menu-right mt-0 border-0 rounded-0"
                      style={styling}
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

              {/* header for Name */}
              <th className="align-middle header-width">
                <div
                  className="table-header-text"
                  id="fullname"
                  type="button"
                  onClick={(e) => onSort(e)}
                >
                  User
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
                      <FaFilter />
                    </span>
                    <div
                      className="dropdown-menu dropdown-menu-right mt-0 border-0 rounded-0"
                      style={styling}
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

              {/* header for position */}
              <th className="align-middle  header-width">
                <div
                  className="table-header-text"
                  id="position"
                  type="button"
                  onClick={(e) => onSort(e)}
                >
                  Position{" "}
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
                      <FaFilter />
                    </span>
                    <div
                      className="dropdown-menu dropdown-menu-right mt-0 border-0 rounded-0"
                      style={styling}
                    >
                      <input
                        className="form-control-sm m-1"
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
              {/** Dynamic columns for roles */}
              {roles.map((role, index) => (
                <th className="header-checkbox align-middle p-2" key={index}>
                  {role.rolename}{" "}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.hasaccount === "TRUE" ? <GoVerified /> : null}</td>
                <td>
                  <Link
                    to={{
                      pathname: "/profile",
                      state: user.email,
                    }}
                  >
                    {user.fullname}
                    {" "}{hasRoleAssigned(user.id)}
                  </Link>
                  
                </td>
                <td>{user.position}</td>
                {/** Dynamic checkboxes for roles */}
                {roles.map((role, index) => (
                  <td className="checkbox align-middle" key={index}>
                    <input
                      className="checkbox"
                      type="checkbox"
                      id={role.id}
                      value={role.id}
                      checked={roleIsAssigned(user.id, role.id)}
                      onChange={(e) => checkboxHandler(e, user.id)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersAdministration;
