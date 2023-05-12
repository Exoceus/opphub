import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import firebase_app from "../../firebase";

import Navbar from "../navbar.component";
import Loading from "../loading.component";
import Footer from "../footer";

import AddOppForm from "../add_opps/AddOppForm";

class AmbassadorOpportunityUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialOppData: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    axios
      .get("/api/opp/" + this.props.match.params.id)
      .then((response) => {
        var data = response.data[0];

        console.log(response.data[0]);
        this.setState({
          initialOppData: data,
          isLoaded: true,
        });

        console.log(this.state);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  onDeleteOpp = () => {
    axios
      .delete("/api/opp/del/987654321/" + this.props.match.params.id)
      .then((response) => {
        this.props.history.push("/ambassador/dashboard");
      });
  };

  render() {
    if (this.state.isLoaded == false) {
      console.log(this.state);
      return <Loading />;
    } else {
      console.log(this.state);

      return (
        <div>
          <Navbar />
          <AddOppForm
            initialData={this.state.initialOppData}
            type="edit"
            ambassador_id={this.state.initialOppData.ambassador_id}
            redirect_url="/ambassador/dashboard"
            opp_id={this.props.match.params.id}
            history={this.props.history}
          />
          <div className="form-group">
            <div className="button-wrapper delete-button-wrapper">
              <button className="delete-button" onClick={this.onDeleteOpp}>
                <i class="far fa-trash-alt"></i> Delete Opportunity
              </button>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

export default withRouter(AmbassadorOpportunityUpdate);
