import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Loading from "../loading.component"


export default class OppRedirect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opp_id: null
        };
    }

    render() {

        if (this.props.match.params.user_id != undefined) {
            return (
                <Redirect to={"/opp/" + this.props.match.params.id + "/" + this.props.match.params.user_id} />
            )
        }

        else {
            return (
                <Redirect to={"/opp/" + this.props.match.params.id} />
            )
        }
    }


}


