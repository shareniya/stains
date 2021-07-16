import React, { useState, useEffect } from "react";
import Axios from "axios"; //make request thru api
 
const UserApplication = () => {
  const [users, setUsers] = useState([]); //to store data & render in DOM
 
  useEffect(() => {
    Axios.get("/appsusers/sel") //fetch api to read files
      .then((res) => {
          console.log(res);
          setUsers(res.data[0]);
        })
        .catch((err) => {
            console.log(err);
          });
 
  }, []);
 
  return (
    <div>
      <b>Application Views for User Application</b>
      <table border={1} cellPadding={5}>
      <thead>
            <tr>
              <th>ID</th>
              <th>Application</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date Started</th>
              <th>Date Ended</th>
            </tr>
        </thead>
 
        <tbody>
            {users.map((val, key) => (
            <tr key={val.id}>
            <td>{val.id}</td>
            <td>{val.appname}</td>
            <td>{val.firstname}</td>
            <td>{val.lastname}</td>
            <td>{val.datestarted}</td>
            <td>{val.dateended}</td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default UserApplication;