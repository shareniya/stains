import React, { Component } from "react";
import Axios from "axios";
import "./style.css";
import { AiOutlineClose } from "react-icons/ai";

import NewAppDetail from "../../CreateApplication/createapp";
class NewApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: this.props.userid,
      assignedApps: [],
      unassignedApps: [],
      appsToAssign: [],
      divContainer: false,
    };
  }

  getAssignedApps = () => {
    Axios.get("/appsusers/sel")
      .then((res) => {
        if (res.status === 200) {
          let appsusers = res.data[0];

          // filter assgined app with the particular user id passed from props
          let userApp = appsusers.filter(
            (app) => app.userid === this.state.userid
          );

          // map assigned apps' id into array
          let assignedAppsList = userApp.map((app) => app.appid);

          this.setState({ assignedApps: assignedAppsList });
        }
      })
      .catch((err) => {
        console.log("Failed to get user assigned app id", err);
      });
  };

  getUnassignedApps = () => {
    Axios.get("/applications/sel")
      .then((res) => {
        if (res.status === 200) {
          let apps = res.data[0];
          // get new (unassigned) apps by filtering assigned apps based on appid
          let unassignedAppsList = apps.filter(
            (app) => !this.state.assignedApps.includes(app.id)
          );

          this.setState({ unassignedApps: unassignedAppsList });
        }
      })
      .catch((err) => {
        console.log("Failed to get apps not currently assigned to user", err);
      });
  };

  insertAppUser = (appuser) => {
    Axios.post("/appsusers/ins", {
      appuser,
    })
      .then((res) => {
        if (res.status === 200) {
          //console.log("Successful assigning new app(s) to user");
        }
      })
      .catch((err) => {
        console.log("Failed to assign app", err);
      });
  };

  componentDidMount() {
    this.getAssignedApps();
    this.getUnassignedApps();
  }

  checkboxHandler = (e, appId) => {
    // is the checkbox checked?
    let isChecked = e.target.checked;

    let app = {
      id: appId,
      startdate: null,
      enddate: null,
    };

    // copy appsToAssign from state
    let apps = [...this.state.appsToAssign];

    // find matching appid from the copied object, return -1 if none of it exist
    let appIndex = apps.findIndex((app) => app.id === appId);

    if (isChecked === true && appIndex === -1) {
      // set state to appsToAssign if the checkbox is checked
      apps.push(app);
    } else if (isChecked === false && appIndex > -1) {
      apps.splice(appIndex, 1);
    }

    this.setState({ appsToAssign: apps });
  };

  changeHandler = (e, appId) => {
    // copy appsToAssign from state
    let apps = [...this.state.appsToAssign];

    // find matching appid from the copied object, return -1 if none of it exist
    let appIndex = apps.findIndex((app) => app.id === appId);

    // if the target field is start date
    if (appIndex > -1 && e.target.id === "startDate") {
      // set start date property in copied object with the matched appid
      apps[appIndex].startdate = e.target.value;
    }
    // if the target field is end date
    else if (appIndex > -1 && e.target.id === "endDate") {
      // set end date property in copied object with the matched appid
      apps[appIndex].enddate = e.target.value;
    }

    this.setState({ appsToAssign: apps });
  };

  submitHandler = (e) => {
    e.preventDefault();

    let apps = [...this.state.appsToAssign];

    // copy unassigned apps object array from state (apps available to user)
    let availableApps = [...this.state.unassignedApps];

    apps.forEach((app) => {
      let appuser = {
        userid: parseInt(this.state.userid),
        appid: app.id,
        startdate: app.startdate,
        enddate: app.enddate,
      };
      console.log(appuser);
      // send request to API
      this.insertAppUser(appuser);

      // remove the app object from the copied array with matching appid as the appid being send to API
      availableApps = availableApps.filter((app) => app.id !== appuser.appid);
    });

    // set new state to invoke re-render to reflect changes of unassigned apps
    this.setState({ unassignedApps: availableApps });
  };

  isAppChecked = (appId) => {
    // is the particular app already checked?
    let index = this.state.appsToAssign.findIndex((app) => app.id === appId);

    // if the app is already checked
    if (index !== -1) {
      return false;
    }

    return true;
  };

  render() {
    const { unassignedApps } = this.state;

    //handling state onclick
    var HandleComponent = (e) => {
      this.setState({ divContainer: !this.state.divContainer });
    };

    const show = this.state.divContainer;

    return (
      <div>
        {/* conditional rendering based on state */}

        {show && (
          <div className="panel shadow p-2 mb-5 bg-white">
            <div className="d-flex flex-row-reverse">
              <AiOutlineClose
                type="button"
                size={25}
                onClick={HandleComponent}
              />
            </div>
            <NewAppDetail />
          </div>
        )}

        <form
          id="assignApps"
          onSubmit={this.submitHandler.bind(this)}
          className="newapp"
        >
          <button
            type="button"
            className="btn btn-link float-right"
            onClick={HandleComponent}
          >
            CREATE APP
          </button>
          <h4 className="mb-3">Assign App To The User</h4>
          <table className="table table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th></th>
                <th className="p-2">App Name</th>
                <th className="p-2">Start Date</th>
                <th className="p-2">End Date</th>
              </tr>
            </thead>
            <tbody>
              {unassignedApps.map((app, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      id="isAssigned"
                      onChange={(e) => this.checkboxHandler(e, app.id)}
                    />
                  </td>
                  <td>{app.appname}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Start Date"
                      id="startDate"
                      value={this.startDate}
                      onChange={(e) => this.changeHandler(e, app.id)}
                      disabled={this.isAppChecked(app.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="End Date"
                      id="endDate"
                      value={this.endDate}
                      onChange={(e) => this.changeHandler(e, app.id)}
                      disabled={this.isAppChecked(app.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="form-group float-right">
            <button type="submit" className="btn btn-success AssignApps mr-1">
              ASSIGN APP
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewApplication;
