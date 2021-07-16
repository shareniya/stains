import React, { Component } from "react";

class Callback extends Component {
  componentDidMount() {
    // handle authentication if expected values are in the URL.
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("invalid callback url");
    }
  }

  render() {
    return (
      <div className="container h-100 d-flex justify-content-center">
        <div className="jumbotron my-auto">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        </div>
      </div>
    );
  }
}

export default Callback;
