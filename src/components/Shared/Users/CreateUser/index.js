import React, { Component } from "react";
import Axios from "axios";
import Select from "react-select";
import Swal from 'sweetalert2';

import GetCurrentLocalDateTime from '../../../../utils/GetCurrentLocalDateTime';

import "./style.css"

// insert user's email and created date from auth0 to mysql users table
const addUser = (email, datecreated) => {
  Axios.post("/users/ins", {
    email: email,
    datecreated: datecreated,
  })
    .then((res) => {
      if (res.status !== 200) {
        console.log("Something w ml-3ent w ml-3rong in adding information");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateUserProfile = (user) => {
  // update user's profile
  Axios.post("/users/upd", {
    user,
  })
    .then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "<h3>Success</h3>",
          text: `User Account For ${user.email} Has Been Created Successfully.`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Failed to update, please try again.");
    });
};

const insertUserTechStacks = (userTechStacks) => {
  Axios.post("/userstechstacks/ins", {
    userTechStacks,
  })
    .then((res) => {
      if (res.status === 200) {
        //console.log("Insert user's techstacks Successful.");
      }
    })
    .catch((err) => {
      console.log("Failed to insert, please try again.", err);
    });
};

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      position: "",
      employmentType: 1,
      contractStartDate: null,
      contractEndDate: null,
      dailyRate: 0.0,
      primarySkills: [],
      secondarySkills: [],
      employmentTypeList: [],
      techStackList: [],
    };
  }

  // get all tech stacks from DB
  getTechStacks = () => {
    Axios.get("/techstacks/sel")
      .then((res) => {
        if (res.status === 200) {
          // console.log("Get Tech Stack List Successful");
          // format the returned data and create new ml-3 array of object w ml-3ith tw ml-3o property: values, label for react-select
          let techStackListFormatted = res.data[0]
            .map((stack) => {
              let newObj = {};
              newObj["value"] = stack.id;
              newObj["label"] = stack.techname;
              return newObj;
            })
            .filter((stack) => stack["label"] !== "System Administration"); // remove the object w ml-3ith label as System Administration
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

  // get all employment types from DB
  getEmploymentTypes = () => {
    Axios.get("/employment/sel")
      .then((res) => {
        if (res.status === 200) {
          // change each employment type object properties to value (type id) and label (type name)
          let employmentTypes = res.data[0].map((type) => {
            let newObj = {};
            newObj["value"] = type.id;
            newObj["label"] = type.typename;
            return newObj;
          });

          this.setState({ employmentTypeList: employmentTypes });
        }
      })
      .catch((err) => {
        console.log("Failed to retriev employment types", err);
      });
  };

  // handle change in namefiled including text and single selection
  changeHandler = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  // name refers to primary or secondary skills, value is the selected skills. (double arrow ml-3 function)
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

    //Get timestamp, convert UTC time into our Malaysia local time
    let dateString = GetCurrentLocalDateTime();

    let user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      employmentType: parseInt(this.state.employmentType),
      position: this.state.position,
      contractStartDate: this.state.contractStartDate,
      contractEndDate: this.state.contractEndDate,
      dailyRate: parseFloat(this.state.dailyRate),
    };

    addUser(user.email, dateString);

    updateUserProfile(user);

    let userTechStacks = {
      email: user.email,
      techstackid: 0,
      skilllevel: 0,
      datecreated: dateString,
      datemodified: dateString,
    };

    // loop through primary skills and fire request for each selected stack
    const primarySkillsArray = this.state.primarySkills.map(Number);
    for (let x of primarySkillsArray) {
      userTechStacks.techstackid = x;
      userTechStacks.skilllevel = 1;
      insertUserTechStacks(userTechStacks);
    }

    // loop through secondary skills and fire request for each selected stack
    const secondarySkillsArray = this.state.secondarySkills.map(Number);
    for (let x of secondarySkillsArray) {
      userTechStacks.techstackid = x;
      userTechStacks.skilllevel = 2;
      insertUserTechStacks(userTechStacks);
    }
  };

  // filter user's primary and secondary skills to set default value for skills selection part
  findDefaultValue = (skillArray) => {
    let defaultValue = [];
    for (let i = 0; i < skillArray.length; i++) {
      // add object to array w ml-3hen filtering matching techstackid in techStackList
      let item = this.state.techStackList.filter(
        (x) => x.value === skillArray[i]
      );
      defaultValue.push(item[0]);
    }
    return defaultValue;
  };

  componentDidMount() {
    this.getEmploymentTypes();
    this.getTechStacks();
  }

  render() {
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      employmentType,
      position,
      contractStartDate,
      contractEndDate,
      dailyRate,
      primarySkills,
      secondarySkills,
      techStackList,
      employmentTypeList,
    } = this.state;

    return (
      <div>
        <form className="form-group" onSubmit={this.submitHandler}>
          <h3 className="NewUser p-2 ml-4">Create New User</h3>

          {/* /* first name */}
          <div className="form-group form-inline form-row">
            <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="firstName"
            >
              First Name :
            </h10>
            <input
              type="text"
              className=" col-sm-8 col-md-6 col-lg-6"
              placeholder="Enter first name"
              id="firstName"
              value={firstName}
              onChange={this.changeHandler}
            />
          </div>

          {/* last name */}
          <div className="form-group form-inline form-row">
          <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="firstName"
            >
              Last Name :
            </h10>
            <input
              type="text"
              className="col-sm-8 col-md-6 col-lg-6"
              placeholder="Enter last name"
              id="lastName"
              value={lastName}
              onChange={this.changeHandler}
            />
          </div>

          {/* email */}
          <div className="form-group form-inline form-row">
            <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="email"
            >
              E-mail:
            </h10>
            <input
              type="text"
              className=" col-sm-8 col-md-6 col-lg-6"
              placeholder="Email Address"
              id="email"
              value={email}
              onChange={this.changeHandler}
            />
          </div>

          {/* Phone number */}
          <div className="form-group form-inline form-row">
            <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="phone-number"
            >
              
              Phone Number:
            </h10>
            <input
              type="text"
              className="col-sm-8 col-md-6 col-lg-6"
              placeholder="Enter phone number"
              id="phoneNumber"
              value={phoneNumber}
              onChange={this.changeHandler}
            />
          </div>

          {/* Employment type */}
          <div className="form-group form-inline form-row">
            <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="employment-type"
            >
              Employment Type:
            </h10>
            <select
              name="employment-type"
              className="custom-select form-control col-sm-8 col-md-8 col-lg-6"
              id="employmentType"
              value={employmentType}
              onChange={this.changeHandler}
            >
              {employmentTypeList.map((employmentTypeList) => (
                <option
                  value={employmentTypeList.value}
                  key={employmentTypeList.value}
                >
                  {employmentTypeList.label}
                </option>
              ))}{" "}
              {/* Code reuse by mapping 4 employment types from EmploymentTypeList to option*/}
            </select>
          </div>

          {/* Position */}
          <div className="form-group form-inline form-row">
            <h10
              className="col-sm-4 col-md-4 col-lg-4 text-md-right mr-0 pr-3"
              htmlFor="phone-number"
            >
              Position:
            </h10>
            <input
              type="text"
              className=" col-sm-8 col-md-6 col-lg-6"
              placeholder="Enter position"
              id="position"
              value={position}
              onChange={this.changeHandler}
              disabled={this.state.modifier === this.state.email ? true : false}
            />
          </div>

          {/* start date*/}
          <div className="form-group form-inline form-row">
            <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="startDate"
            >
              Contract start date:
            </h10>
            <input
              type="text"
              className="col-sm-8 col-md-6 col-lg-6"
              placeholder="Enter contract start date"
              id="contractStartDate"
              value={contractStartDate}
              onChange={this.changeHandler}
            />
          </div>

          {/* end date */}
          <div className="form-group form-inline form-row">
            <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="endDate"
            >
              Contract end date:
            </h10>
            <input
              type="text"
              className="col-sm-8 col-md-6 col-lg-6"
              placeholder="Enter contract end date"
              id="contractEndDate"
              value={contractEndDate}
              onChange={this.changeHandler}
            />
          </div>

          {/* Daily Rate */}
          <div className="form-group form-inline form-row">
            <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="dailyRate"
            >
             
              Daily Rate:
            </h10>
            <input
              type="text"
              className="col-sm-8 col-md-6 col-lg-6"
              placeholder="Enter daily rate"
              id="dailyRate"
              value={dailyRate}
              onChange={this.changeHandler}
              disabled={this.state.modifier === this.state.email ? true : false}
            />
          </div>

          {/** Primary Skills */}
          <div className="form-group form-inline form-row">
            <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="primarySkills"
            >
              Primary Skills:
            </h10>
            <Select
              value={this.findDefaultValue(primarySkills)}
              isMulti
              isClearable
              className=" col-sm-8 col-md-6 col-lg-6"
              name="primarySkills"
              options={techStackList.filter(
                (option) => !secondarySkills.includes(option.value)
              )}
              placeholder="Select Primary Skills"
              onChange={this.multiSelectHandler("primarySkills")}
            />
          </div>

          {/** Seconday Skills */}
          <div className="form-group form-inline form-row">
            <h10
              className="col-sm-4 col-md-4 col-lg-4 col-form-label text-md-right pr-3"
              htmlFor="secondarySkills"
            >
              Secondary Skills:
            </h10>
            <Select
              value={this.findDefaultValue(secondarySkills)}
              isMulti
              isClearable
              className=" col-sm-8 col-md-6 col-lg-6"
              name="secondarySkills"
              options={techStackList.filter(
                (option) => !primarySkills.includes(option.value)
              )}
              placeholder="Select Secondary Skills"
              onChange={this.multiSelectHandler("secondarySkills")}
            />
          </div>

          {/* Button handler */}
          <div className="row justify-content-end">
            <div className="form-button">
              <button
                type="button"
                className="btn btn-danger button-cancel mr-1"
              >
                CANCEL
              </button>
              <button type="submit" className="btn btn-success button-save">
                CREATE
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;
