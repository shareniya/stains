import React, { Component } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";

class ColumnOption extends Component {
  render() {
    return (
      <div>
        <form
          className="form-horizontal appdetails"
          //   onSubmit={this.submitHandler.bind(this)}
        >
          <h3 className="title b-2" align="center">
            Column Options
          </h3>
          <p>Add or remove column into view as per below option: </p>
          <br />
          {/* date started */}
          <div className="row border m-2">
            <div className="col-sm-8 pl-1">
              <label htmlFor="datestarted" className="p-2">
                Contract Start Date
              </label>
            </div>
            <div className="col-sm-4 my-auto">
              <Toggle
                id="datestarted"
                // defaultChecked={this.state.columnIsReady}
                // onChange={this.handleColumnChange}
              />
            </div>
          </div>

          {/* date ended */}
          <div className="row border m-2">
            <div className="col-sm-8 pl-1">
              <label htmlFor="dateended" className="p-2">
                Contract End Date
              </label>
            </div>
            <div className="col-sm-4 my-auto">
              <Toggle
                id="dateended"
                // defaultChecked={this.state.columnIsReady}
                // onChange={this.handleColumnChange}
              />
            </div>
          </div>

          {/* daily rate */}
          <div className="row border m-2">
            <div className="col-sm-8 pl-1">
              <label htmlFor="dailyrate" className="p-2">
                Daily Rate
              </label>
            </div>
            <div className="col-sm-4 my-auto">
              <Toggle
                id="dailyrate"
                // defaultChecked={this.state.columnIsReady}
                // onChange={this.handleColumnChange}
              />
            </div>
          </div>

          {/* tech stacks */}
          <div className="row border m-2">
            <div className="col-sm-8 pl-1">
              <label htmlFor="techstack" className="p-2">
                Tech Stacks
              </label>
            </div>
            <div className="col-sm-4 my-auto">
              <Toggle
                id="techstack"
                // defaultChecked={this.state.columnIsReady}
                // onChange={this.handleColumnChange}
              />
            </div>
          </div>

          {/* employment type */}
          <div className="row border m-2">
            <div className="col-sm-8 pl-1">
              <label htmlFor="employmenttype" className="p-2">
                Employment Type
              </label>
            </div>
            <div className="col-sm-4 my-auto">
              <Toggle
                id="employmenttype"
                // defaultChecked={this.state.columnIsReady}
                // onChange={this.handleColumnChange}
              />
            </div>
          </div>

          {/* position */}
          <div className="row border m-2">
            <div className="col-sm-8 pl-1">
              <label htmlFor="position" className="p-2">
                Position
              </label>
            </div>
            <div className="col-sm-4 my-auto">
              <Toggle
                id="position"
                // defaultChecked={this.state.columnIsReady}
                // onChange={this.handleColumnChange}
              />
            </div>
          </div>

          <div className="pt-4">
            <div className="form-group text-right">
              <button className="btn btn-danger mr-1">CANCEL</button>
              <button className="btn btn-success" type="submit">
                OK
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ColumnOption;
