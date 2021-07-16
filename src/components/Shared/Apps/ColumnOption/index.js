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

          {/* App URL */}
          <div className="row border m-2">
            <div className="col-sm-8 pl-1">
              <label htmlFor="appurl" className="p-2">
                URL
              </label>
            </div>
            <div className="col-sm-4 my-auto">
              <Toggle
                id="appurl"
                // defaultChecked={this.state.columnIsReady}
                // onChange={this.handleColumnChange}
              />
            </div>
          </div>

          {/* Tech Stacks */}
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

          {/* Expected team members */}
          <div className="row border m-2">
            <div className="col-sm-8 pl-1">
              <label htmlFor="expectedmembers" className="p-2">
                Expected Team Members
              </label>
            </div>
            <div className="col-sm-4 my-auto">
              <Toggle
                id="expectedmembers"
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
