import React, { useEffect, useState } from "react";
import Axios from "axios";

const ActiveApps = () => {
  const [activeApps, setActiveApps] = useState([]);

  useEffect(() => {
    Axios.get("/applications/sel").then((res) => {
      setActiveApps(res.data[0]);
    });
  }, []);

  return (
    <div className="col-lg-5">
      <div className="content">
        <div className="table-responsive">
          <center>
            <h4> Active Application</h4>
          </center>
          <center>
            <table border={1}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Application Name</th>
                  <th>Application URL</th>
                  <th>DevOps Link</th>
                  <th>Member Count</th>
                  <th>Date Created</th>
                  <th>Date Date Modified</th>
                  <th>Comments</th>
                </tr>
              </thead>

              <tbody>
                {activeApps.map((val, key) => (
                  <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.appname}</td>
                    <td>{val.appurl}</td>
                    <td>{val.devopslink}</td>
                    <td>{val.expectedappmembercount}</td>
                    <td>{val.datecreated}</td>
                    <td>{val.datemodified}</td>
                    <td>{val.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </center>
        </div>
      </div>
    </div>
  )
};

export default ActiveApps;
