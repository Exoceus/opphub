import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import firebase_app from "../../firebase"

import OpportunityItem from "../opportunity/item.opp"
import Loading from "../loading.component"

export default class HostDashboard extends Component {

    constructor(props) {
        super(props);
        this.onCreateOpp = this.onCreateOpp.bind(this);
        this.state = { host: '', opps: '', UID: '', isLoaded: false };
    }

    componentDidMount() {
        var user = firebase_app.auth().currentUser;
        var firebase_uid
        if (user != null) {
            firebase_uid = user.uid

            this.setState({ UID: firebase_uid })


            axios.get('/api/org/UID/' + firebase_uid)
                .then(response => {
                    var data = response.data
                    this.setState({
                        host: data,
                    })

                    axios.get('/api/opp/org/' + this.state.host._id)
                        .then(response => {
                            var data = response.data
                            this.setState({
                                opps: data,
                                isLoaded: true
                            })
                            console.log(this.state)
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
        this.props.history.push('/dashboard/new');
    }


    render() {
        var host = this.state.host;
        var opps = this.state.opps
        if (this.state.isLoaded == false) {
            console.log(this.state)
            return (
                <Loading />
            )
        }
        else {

            if (opps) {
                var opps_list = opps.map((opp) => (
                    <div><OpportunityItem opp={opp} edit_mode={true} /> </div>
                ))
            }
            return (
                <div className="host-dashboard">
                    <div className="host-header">
                        <h5>Organization Portal</h5>
                        <div className='host-profile-options'>
                            <button onClick={() => this.props.history.push(`/org/${this.state.host._id}`)} className="view-button">View Org Page <i class="fas fa-chevron-right"></i></button>

                            <button onClick={() => this.props.history.push('/org/setup')}>Edit Profile <i class="far fa-edit"></i></button>

                            <button className="signout" onClick={() => firebase_app.auth().signOut()}>Sign out <i class="fas fa-sign-out-alt"></i></button>
                            <div className='profile-img-wrapper' style={{ backgroundImage: `url(${host.profile_pic})` }}></div>
                        </div>

                    </div>
                    <div className="create-opp button-wrapper">
                        <button onClick={this.onCreateOpp} className='submit-button'>New Opportunity <i class="far fa-plus-square"></i></button>
                    </div>
                    <div className='list-opp-wrapper-col'>
                        {opps_list}
                    </div>
                </div >
            )
        }

    }

}
