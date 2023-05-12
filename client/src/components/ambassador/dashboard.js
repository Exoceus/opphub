import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import firebase_app from "../../firebase"

import OpportunityItem from "../opportunity/item.opp"
import Loading from "../loading.component"

export default class AmbassadorDashboard extends Component {

    constructor(props) {
        super(props);
        this.onCreateOpp = this.onCreateOpp.bind(this);
        this.state = { ambassador: '', opps: '', UID: '', isLoaded: false };
    }

    componentDidMount() {
        var user = firebase_app.auth().currentUser;
        var firebase_uid
        if (user != null) {
            firebase_uid = user.uid

            this.setState({ UID: firebase_uid })


            axios.get('/api/amb/UID/' + firebase_uid)
                .then(response => {
                    var data = response.data
                    this.setState({
                        ambassador: data,
                    })
                    console.log(this.state.ambassador)

                    axios.get('/api/opp/amb/' + this.state.ambassador._id)
                        .then(response => {
                            var data = response.data
                            this.setState({
                                opps: data,
                                isLoaded: true
                            })
                            console.log(this.state.opps)
                        })

                        .catch((error) => {
                            console.log(error);
                        })
                })

                .catch((error) => {
                    console.log(error);
                })
        }

    }

    onCreateOpp(e) {
        this.props.history.push('/ambassador/dashboard/new');
    }

    render() {
        var ambassador = this.state.ambassador;
        var opps = this.state.opps

        document.title = 'Ambassador Portal'

        if (this.state.isLoaded == false) {
            console.log(this.state)
            return (
                <Loading />
            )
        }
        else {

            if (opps) {
                var opps_list = opps.map((opp) => (
                    <div><OpportunityItem opp={opp} edit_mode={true} ambassador_edit={true} /> </div>
                ))
            }
            return (
                <div className="host-dashboard">
                    <div className="host-header">
                        <h5>Ambassador Portal</h5>
                        <div className='host-profile-options'>
                            <button className="view-button" onClick={() => {
                                this.props.history.push('/opps')
                            }}>Browse Opportunities  <i class="fas fa-chevron-right"></i></button>
                            <button className="signout" onClick={() => firebase_app.auth().signOut()}>Sign out <i className="fas fa-sign-out-alt"></i></button>
                            <div className='profile-name'>{ambassador.ambassador_name}</div>
                        </div>

                    </div>
                    <div className="create-opp button-wrapper">
                        <button onClick={this.onCreateOpp} className='submit-button'><i className="far fa-plus-square"></i> New Opportunity</button>
                    </div>
                    <div className='list-opp-wrapper-col'>
                        {opps_list}
                    </div>
                </div >
            )
        }

    }

}
