import React, { Component } from "react";
import Axios from "axios";
import "./style.css";
/*
THIS PAGE IS FOR SHOW DETAILS OF USER IN APPLICATION LIST
the store prod used are 
sp_userdetails_sel to select the data
sp_appdetails_upd to upd the appliction enggaemnt date
sp_appdetails_del to delete the app
*/

const updateUserDetails = (appdetail) => {
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
      console.log(err);
      alert("Failed to update, please try again.");
    });
};
const deleteUserDetails = (userdetail) => {
  //unassign user from apps
  Axios.delete("/appsusers/del", {
    data: {
      userdetail: userdetail,
    },
  }).then((res) => {
    if (res.status === 200) {
      alert("Unassign user from application is successful");
    }
  });
};

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userid,
      firstName: "",
      lastName: "",
      email: "",
      contractStartDate: "",
      contractEndDate: "",
      skillSet: "",
      totalApps: "",
      appId: this.props.appid,
      appName: "",
      dateStarted: "",
      dateEnded: "",
    };
  }

  getUserDetails = (appid, userid) => {
    Axios.post("/userdetails/sel", {
      appid,
      userid,
    })
      .then((res) => {
        if (res.status === 200) {
          //console.log("Get User Details Successful.");
          const userRecord = res.data[0][0];
          //console.log(res.data[0][0]);

          const dateISOtoString = (date) => {
            // parse to ISO 8061 Date object
            date = new Date(date);
            // convert date object to YYYY-MM-DD string
            // use UTC date to avoid timezone issue
            return `${date.getUTCFullYear()}-${
              date.getUTCMonth() + 1
            }-${date.getUTCDate()}`;
          };

          this.setState({ firstName: userRecord.firstname });
          this.setState({ lastName: userRecord.lastname });
          this.setState({ email: userRecord.email });
          this.setState({
            contractStartDate: dateISOtoString(userRecord.contractstartdate),
          });
          this.setState({
            contractEndDate: dateISOtoString(userRecord.contractenddate),
          });
          this.setState({
            dateStarted: dateISOtoString(userRecord.datestarted),
          });
          this.setState({ dateEnded: dateISOtoString(userRecord.dateended) });
          this.setState({ skillSet: userRecord.skillset });
          this.setState({ totalApps: userRecord.totalApps });
          this.setState({ appName: userRecord.appname });
        }
      })
      .catch((err) => {
        console.log("No record of user details.", err);
      });
  };

  async componentDidMount() {
    this.getUserDetails(this.state.appId, this.state.userId); // POST request to retrieve user data from db is invoked when react component is mounted
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
    updateUserDetails(appdetail);
  };

  deleteHandler = (e) => {
    e.preventDefault();

    let userdetail = {
      appid: this.state.appId,
      userid: this.state.userId,
    };
    //unassign user from apps
    deleteUserDetails(userdetail);
  };

  render() {
    //const { isAuthenticated, login, logout } = this.props.auth;

    const {
      dateStarted,
      dateEnded,
    } = this.state;

    return (
      
      <div>
        <form className="userdetails" onSubmit={this.submitHandler.bind(this)}>
        <h3 className="mb-3">
          User App Engagement Info</h3>
            <br></br>

            {/* date engagement start*/}
            <div className="form-group form-inline text-center">
              <label htmlFor="dateStarted" className="col-lg-4">
                Start Date Of Engagement
              </label>
              <input
                type="text"
                className="form-control col-lg-8"
                placeholder="dateStarted"
                id="dateStarted"
                value={dateStarted}
                onChange={this.changeHandler}
              />
            </div>

            {/* date engagement end */}
            <div className="form-group form-inline text-center">
              <label htmlFor="dateEnded" className="col-lg-4">
                End Date Of Engagement
              </label>
              <input
                type="text"
                className="form-control col-lg-8"
                placeholder="dateEnded"
                id="dateEnded"
                value={dateEnded}
                onChange={this.changeHandler}
              />
            </div>

            <div className="row justify-content-end">
              <button
                className="btn btn-danger m-1 d-block"
                onClick={this.deleteHandler.bind(this)}
              >
                UN-ASSIGN USER
              </button>
              <button className="btn btn-success m-1 d-block" type="submit">
                UPDATE
              </button>
            </div>
          
        </form>
      </div>
    );
  }
}

export default UserDetails;
