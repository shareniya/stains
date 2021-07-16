import React, { Component } from "react";
import Axios from "axios";
import Select from "react-select";
import "./style.css";

import Swal from "sweetalert2";

const insertApplications = (newapps) => {
  Axios.post("/applications/ins", {
    newapps,
  })
    .then((res) => {
      if (res.status === 200) {
        // alert("Application has been created successfully.");
       
        //console.log("Insert new application has been successful.");
      }
    })
    .catch((err) => {
      alert("Failed to create application, please try again.");
      //console.log("Failed to insert, please try again.", err);
    });
};

const insertAppTechStacks = (appTechStacks) => {
  Axios.post("/appstechstacks/ins", {
    appTechStacks,
  })
    .then((res) => {
      if (res.status === 200) {
        //console.log("Insert app techstacks is successful.");
        //console.log(res);
      }
    })
    .catch((err) => {
      //console.log("Failed to insert, please try again.", err);
    });
};

class NewAppDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appname: "",
      appurl: "",
      devopslink: "",
      apptechStacks: [],
      expectedappmembercount: null,
      comments: "",
      techStackList: [],
      applicationList: [],
    };
  }

  // handle change in namefiled including text and single selection
  changeHandler = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  multiSelectHandler = (name) => (value) => {
    value = Array.isArray(value)
      ? value.map((techStackList) => techStackList.value)
      : []; // map the returned selected skills from object to array
    this.setState({
      [name]: value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    //console.log(this.state.apptechStacks);

    // escape special characters from search string
    const escapeRegExp = (string) => {
      return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    };

    //map the list of techstack fetched from DB
    let input = this.state.appname.toUpperCase();
    let result = this.state.applicationList.map((a) => a.appname.toUpperCase());
    let matchInfo = result.find((b) =>
      b.match(escapeRegExp(input.slice(0, 3)))
    ); //finding input inside result

    //switch condition
    switch (true) {
      case result.indexOf(input) !== -1:
        Swal.fire({
          title: "<h3>Warning</h3>",
          text: "We are unable to create a new value as we have identified that such application already exist!",
          confirmButtonColor: "#64717B",
          customClass: {
            title: "text-warning",
          },
        });
        break;

      case result.some((b) => b.includes(input.slice(0, 3))):
        //.some() - to check if elements in the array pass a test
        //.includes() - to check if the string contains a specified string

        Swal.fire({
          title: "<h3>Warning</h3>",
          text:
            "We have found a similar records in the system " +
            "'" +
            matchInfo +
            "'" +
            ". Do you still want to proceed and add a new application?",
          showCancelButton: true,
          confirmButtonText: "SAVE",
          cancelButtonText: "CANCEL",
          confirmButtonColor: "#218838",
          closeButtonColor: "#00ff00",
          customClass: {
            title: "text-warning",
          },
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // Save it!
            let newapps = {
              appname: this.state.appname,
              appurl: this.state.appurl,
              devopslink: this.state.devopslink,
              expectedappmembercount: this.state.expectedappmembercount,
              comments: this.state.comments,
              startingdate: null,
              enddate: null,
            };
            insertApplications(newapps);

            let appTechStacks = {
              appname: newapps.appname,
              techstackid: 0,
            };

            var techStacksArray = this.state.apptechStacks.map(Number);
            for (let x of techStacksArray) {
              appTechStacks.techstackid = x;
              insertAppTechStacks(appTechStacks);
            }
            //calling function to insert data into db

            Swal.fire({
              text: "New application has been successfully created!",
              icon: "success",
              title: "<h3>CONFIRMATION</h3>",
              confirmButtonColor: "#63707A",
              customClass: {
                title: "text-light",
                htmlContainer: "text-light",
                popup: "bg-success",
              },
            });
          }
        });
        break;

      default:
        Swal.fire({
          title: "Do you want to add " + input + " as new application?",
          showCancelButton: true,
          confirmButtonText: "SAVE",
          confirmButtonColor: "#218838",
          cancelButtonText: "CANCEL",
          cancelButtonColor: "#63707A",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // Save it!
            let newapps = {
              appname: this.state.appname,
              appurl: this.state.appurl,
              devopslink: this.state.devopslink,
              expectedappmembercount: this.state.expectedappmembercount,
              comments: this.state.comments,
              startingdate: null,
              enddate: null,
            };
            insertApplications(newapps);

            let appTechStacks = {
              appname: newapps.appname,
              techstackid: 0,
            };

            var techStacksArray = this.state.apptechStacks.map(Number);
            for (let x of techStacksArray) {
              appTechStacks.techstackid = x;
              insertAppTechStacks(appTechStacks);
            }
            //calling function to insert data into db

            Swal.fire({
              text: "New application has been successfully created!",
              icon: "success",
              title: "<h3>CONFIRMATION</h3>",
              confirmButtonColor: "#63707A",
              customClass: {
                title: "text-light",
                htmlContainer: "text-light",
                popup: "bg-success",
              },
            });
          }
        });
    }
  };

  getTechStacksList = () => {
    Axios.get("/techstacks/sel")
      .then((res) => {
        if (res.status === 200) {
          // console.log("Get tech stack is successful");
          // format the returned data and create new array of object with two property: values, label for react-select
          let techStackListFormatted = res.data[0]
            .map((obj) => {
              let newObj = {};
              newObj["value"] = obj.id;
              newObj["label"] = obj.techname;
              return newObj;
            })
            .filter((obj) => obj["label"] !== "System Administration"); // remove the object with label as System Administration
          // localeCompare sort the techstack in alphabetical order based on label name
          techStackListFormatted = techStackListFormatted.sort((a, b) =>
            a.label.localeCompare(b.label)
          );

          this.setState({ techStackList: techStackListFormatted });
        }
      })
      .catch((err) => {
        console.log(
          "Failed to get tech stack list, check your code again.",
          err
        );
      });
  };

  // get all user roles in db
  getApplicationList = () => {
    Axios.get("/applications/sel")
      .then((res) => {
        if (res.status === 200) {
          let applicationList = res.data[0];
          this.setState({ applicationList });
          //console.log(userRolesList);
        }
      })
      .catch((err) => {
        // console.log(err);
        // console.log("Failed to retrieve, please try again.");
      });
  };

  componentDidMount() {
    this.getTechStacksList();
    this.getApplicationList();
  }

  render() {
    const { appname, appurl, devopslink, expectedappmembercount, comments } =
      this.state;

    return (
      <div>
        <form className="form-group" onSubmit={this.submitHandler}>
          <h3  className="NewUser p-2 ml-4 text-center">Create A New Application</h3>

          {/* application name */}

          <div className="form-group form-inline form-row">
          <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="primarySkills"
            >
              Name:
            </h10>
            <input
              type="text"
              className="col-sm-8 col-md-8 col-lg-6"
              placeholder="Enter App Name"
              id="appname"
              value={appname}
              onChange={this.changeHandler}
            />
          </div>

          {/* application url */}

          <div className="form-group form-inline form-row">
          <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="primarySkills"
            >
             URL:
            </h10>
            <input
              type="text"
              className=" col-sm-8 col-md-8 col-lg-6"
              placeholder="Enter App URL"
              id="appurl"
              value={appurl}
              onChange={this.changeHandler}
            />
          </div>

          {/* devops link */}
          <div className="form-group form-inline form-row">
          <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="primarySkills"
            >
             Devops Link:
            </h10>
            <input
              type="text"
              className="col-sm-8 col-md-8 col-lg-6"
              placeholder="Enter DevOps Link"
              id="devopslink"
              value={devopslink}
              onChange={this.changeHandler}
            />
          </div>

          {/* tech stacks */}

          <div className="form-group form-inline form-row">
          <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="primarySkills"
            >
              Tech stacks:
            </h10>
            <Select
              value={this.state.apptechStacks.value}
              isMulti
              isSearchable
              isClearable
              className="basic-multi-select col-sm-8 col-md-6 col-lg-6"
              name="apptechStacks"
              options={this.state.techStackList}
              placeholder="Select Tech Stack"
              onChange={this.multiSelectHandler("apptechStacks")}
            ></Select>
          </div>

          {/* expected member count */}

          <div className="form-group form-inline form-row">
          <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="primarySkills"
            >
             Member Count:
            </h10>
            <input
              type="text"
              className="col-sm-8 col-md-6 col-lg-6"
              placeholder="No. of App Member"
              id="expectedappmembercount"
              value={expectedappmembercount}
              onChange={this.changeHandler}
            />
          </div>

          {/* comments */}

          <div className="form-group form-inline form-row">
          <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="primarySkills"
            >
             Comments:
            </h10>
            <input
              type="text"
              className="col-sm-8 col-md-6 col-lg-6"
              placeholder="Comment"
              id="comments"
              value={comments}
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-row">
            <div className="col" />
            <div className="form-button float-left">
              <button type="submit" className="btn btn-success">
               CREATE
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default NewAppDetail;
