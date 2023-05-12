import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import firebase_app from "../../firebase"


import Navbar from '../navbar.component'
import Loading from '../loading.component'
import Footer from '../footer'

import AddOppForm from '../add_opps/AddOppForm'

export default class NewAmbassadorOpportunity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ambassador_id: '',
            UID: '',
            isLoaded: false,
        };

    }

    componentDidMount() {
        document.title = 'Add Opp'
        var user = firebase_app.auth().currentUser;
        var firebase_uid
        if (user != null) {
            firebase_uid = user.uid

            this.setState({ UID: firebase_uid })


            axios.get('/api/amb/UID/' + firebase_uid)
                .then(response => {
                    var data = response.data
                    this.setState({
                        ambassador_id: data._id,
                        isLoaded: true
                    })

                    console.log(this.state)
                })

                .catch((error) => {
                    console.log(error);
                })

        }
    }

    render() {
        if (this.state.isLoaded == false) {
            console.log(this.state)
            return (
                <Loading/>
            )
        }

        else {
            return (
                <div>
                    <Navbar/>
                    <AddOppForm type='suggest' ambassador_id={this.state.ambassador_id} redirect_url='/ambassador/dashboard' history={this.props.history}/>
                    <Footer/>
                </div >
            )
        }
    }
}