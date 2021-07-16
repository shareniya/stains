import React, { Component } from "react";
import Axios from "axios";
import GetCurrentLocalDateTime from "../../../../../utils/GetCurrentLocalDateTime";
import Swal from "sweetalert2";
//import { Link } from "react-router-dom";

const addEmployment = (employmentData) => {
  // API call to add employmet type to db
  Axios.post("/employment/ins", {
    employmentData,
  })
    .then((res) => {
      if (res.status === 200) {
      }
    })
    .catch((err) => {
      // console.log(err);
    });
};

class NewEmployment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeName: "",
      employmentTypeList: [],
    };
  }

  getEmploymentData = () => {
    Axios.get("/employment/sel") //Fetch employment type list
      .then((res) => {
        if (res.status === 200) {
          let employmentTypes = res.data[0];
          this.setState({ employmentTypeList: employmentTypes });
        }
      })
      .catch((err) => {
        // console.log(err);
        // console.log("Failed to fetch employment type list data.");
      });
  };

  componentDidMount() {
    this.getEmploymentData();
  }

  // handle change in namefiled including text and single selection
  changeHandler = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();

    // Caliing function to get time
    let dateString = GetCurrentLocalDateTime();

    // escape special characters from search string
    const escapeRegExp = (string) => {
      return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    };

    //map the list of techstack fetched from DB
    let input = this.state.typeName.toUpperCase(); // typeName is from user input
    let result = this.state.employmentTypeList.map((a) =>
      a.typename.toUpperCase()
    ); // a.typename is column from data table
    let matchInfo = result.find((b) =>
      b.match(escapeRegExp(input.slice(0, 3)))
    ); //finding input inside result

    //switch condition
    switch (true) {
      case result.indexOf(input) !== -1:
        Swal.fire({
          title: "<h3>Warning</h3>",
          text: "We are unable to create a new value as we have identified that such employment type already exist!",
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
            ". Do you still want to proceed and add a new employment type?",
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
            let employmentData = {
              typename: this.state.typeName,
              datecreated: dateString,
              datemodified: dateString,
            };
            //calling function to insert data into db
            addEmployment(employmentData);

            Swal.fire({
              text: "New Employment type has been successfully created!",
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
          title: "Do you want to add " + input + " as new employment type?",
          showCancelButton: true,
          confirmButtonText: "SAVE",
          confirmButtonColor: "#218838",
          cancelButtonText: "CANCEL",
          cancelButtonColor: "#63707A",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // Save it!
            let employmentData = {
              typename: this.state.typeName,
              datecreated: dateString,
              datemodified: dateString,
            };
            //calling function to insert data into db
            addEmployment(employmentData);

            Swal.fire({
              text: "New Tech Stack has been successfully created!",
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

  render() {
    const { typeName } = this.state;

    return (
      <form className="NewEmployment" onSubmit={this.submitHandler.bind(this)}>
        <div>
          <h4 className="title p-1" align="center">
            Create A New Employment Type
          </h4>
          {/* date ended */}
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="typeName"
              value={typeName}
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-group float-right">
            <button type="submit" className="btn btn-success AssignApps">
              CREATE
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default NewEmployment;
