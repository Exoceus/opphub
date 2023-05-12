import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import ThankIcon from "../images/Thank.svg";
import Icon from "../icon.svg";

class FeedbackRedirect extends Component {
  componentDidMount() {
    window.location = "https://forms.gle/KTZ1Xf3pEPWcLiYS8";
  }

  render() {
    return (
      <div className="loader-custom">
        <img src={Icon} />
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(FeedbackRedirect);
