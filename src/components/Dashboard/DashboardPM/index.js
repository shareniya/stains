import React from "react";
import ActiveApps from "../../Shared/ActiveApplication";
import HistoryApps from "./HistoryApps/index.js";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        {ActiveApps}
        {HistoryApps}
      </div>
    </div>
  );
};

export default Dashboard;