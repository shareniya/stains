import React, { useEffect, useState } from "react";
import Axios from "axios";

const HistoryApps = () => {
  const [historyApps, setHistoryApps] = useState([]);

  useEffect(() => {
    Axios.get("/appsusers/sel").then((res) => {
      setHistoryApps(res.data[0]);
    });
  }, []);

  return (
    <div className="col-lg-5">
          <div className="content">
            <div className="table-responsive">
              <center>
                <h4> History of Application</h4>
              </center>
              <center>
                <table border={1}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Application ID</th>
                      <th>User ID</th>
                      <th>Ddate Started</th>
                      <th>Date Ended</th>
                    </tr>
                  </thead>

                  <tbody>
                    {historyApps.map((val, key) => (
                      <tr key={val.id}>
                        <td>{val.id}</td>
                        <td>{val.appid}</td>
                        <td>{val.userid}</td>
                        <td>{val.datestarted}</td>
                        <td>{val.dateended}</td>
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

export default HistoryApps;