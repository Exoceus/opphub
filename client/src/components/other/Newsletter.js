import React, { Component } from 'react';
import { Link, withRouter, } from 'react-router-dom';
import { Redirect } from 'react-router'
import Icon from "../../icon.svg"

class Newsletter extends Component {

    componentDidMount() {
        window.location = "https://opp-hub.us2.list-manage.com/subscribe?u=51912e90952edbf9efa4aca96&id=ab7769f924";
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
        )

    }
}

export default withRouter(Newsletter)