import React, { Component } from "react";
import "./style.css";
import Axios from "axios";

const updateAppsDetails = (appdetail) => {
  // update users engagement date
  Axios.post("/appsusers/upd", {
    appdetail,
  })
    .then((res) => {
      if (res.status === 200) {
        alert("Update User Engagement Date.");
      }
    })
    .catch((err) => {
      //console.log(err);
      alert("Failed to update, please try again.");
    });
};

const deleteAppsDetails = (userdetail) => {
  //unassign user from apps
  Axios.delete("/appsusers/del", {
    data: {
      userdetail: userdetail,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        alert("Unassign user from application is successful");
      }
    })
    .catch((err) => {
      //console.log("Failed to unassign user from application", err);
    });
};

class AppDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appId: this.props.appid,
      userId: this.props.userid,
      appName: "",
      appUrl: "",
      devopsLink: "",
      expectedAppMemberCount: "",
      dateStarted: "",
      dateEnded: "",
      techStacks: "",
    };
  }

  getAppsDetails = (appid, userid) => {
    Axios.post("/appsdetails/sel", {
      appid,
      userid,
    })
      .then((res) => {
        if (res.status === 200) {
          //console.log("Get Application Details Successful.");
          const appRecord = res.data[0][0];
          //console.log(res.data[0][0]);

          const dateISOtoString = (date) => {
            // parse to ISO 8061 Date object
            date = new Date(date);
            // convert date object to YYYY-MM-DD string
            // use UTC date to avoid timezone issue
            return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1
              }-${date.getUTCDate()}`;
          };

          this.setState({ appName: appRecord.appname });
          this.setState({ appUrl: appRecord.appurl });
          this.setState({ devopsLink: appRecord.devopslink });
          this.setState({
            expectedAppMemberCount: appRecord.expectedappmembercount,
          });
          this.setState({
            dateStarted: dateISOtoString(appRecord.datestarted),
          });
          this.setState({ dateEnded: dateISOtoString(appRecord.dateended) });
          this.setState({ techStacks: appRecord.techstacks });
        }
      })
      .catch((err) => {
        //console.log("No record of application details.", err);
      });
  };

  async componentDidMount() {
    this.getAppsDetails(this.state.appId, this.state.userId); // POST request to retrieve user data from db is invoked when react component is mounted
  }

  // handle change in namefiled including text and single selection
  changeHandler = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();

    let appdetail = {
      appid: this.state.appId,
      userid: this.state.userId,
      datestarted: this.state.dateStarted,
      dateended: this.state.dateEnded,
    };
    // update user engagement date in appsusers table
    updateAppsDetails(appdetail);
  };

  deleteHandler = (e) => {
    e.preventDefault();

    let userdetail = {
      appid: this.state.appId,
      userid: this.state.userId
    };
    //unassign user from apps
    deleteAppsDetails(userdetail);
  };

  render() {
    //const { isAuthenticated, login, logout } = this.props.auth;

    const {
      appName,
      //appUrl,
      //devopsLink,
      dateStarted,
      dateEnded,
      //techStacks,
      //expectedAppMemberCount,
    } = this.state;

    return (
      <div>
        <form className="form-horizontal appdetails" onSubmit={this.submitHandler.bind(this)}>
        <div className="">
            <h3 className="title" align="center">
              User App Engagement Info
            </h3>
            <p></p>
            {/* application name */}
            <div className="form-group text-center">
              <h4>{appName}</h4>
            </div>
            {/* date started */}
            <div className="form-group form-inline">
              <label htmlFor="datestarted" className="col-lg-4 text-center">Start Date Of Engagement</label>
              <input
                type="text"
                className="form-control col-lg-8"
                placeholder="Start Date"
                id="dateStarted"
                value={dateStarted}
                onChange={this.changeHandler}
              />
            </div>

            {/* date ended */}
            <div className="form-group form-inline text-center">
              <label htmlFor="dateended" className="col-lg-4 text-center">End Date Of Engagement</label>
              <input
                type="text"
                className="form-control col-lg-8"
                placeholder="End Date"
                id="dateEnded"
                value={dateEnded}
                onChange={this.changeHandler}
              />
            </div>

            <div className="">
              <div className="form-group text-right">
                <button
                  className="btn btn-danger mr-1"
                  onClick={this.deleteHandler.bind(this)}
                >
                  UN-ASSIGN APP
                </button>

                <button
                  className="btn btn-success"
                  type="submit"
                >
                  UPDATE
                </button>
              </div>
            </div>
            </div>
        </form>
      </div>
    );
  }
}

export default AppDetails;
