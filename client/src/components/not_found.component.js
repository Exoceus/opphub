import React, { Component } from 'react';
import { Link, withRouter, } from 'react-router-dom';
import { Redirect } from 'react-router'
import NoSearch from "../images/nosearch.svg"


class NotFound extends Component {

    constructor(props) {
        super(props);
    }



    render() {

        return (
            <div className="not-found-wrapper">
                <div>
                    <img src={NoSearch} className="image-align-center" />
                </div>
                <h2 className="align-center">No {this.props.thing} found.</h2>
                <h5 className="align-center">Unfortunately, there are no {this.props.thing} in our database with our searched query. The search engine is still new so you have to put in the exact or very similar search term.</h5>
            </div>
        );
    }


}

export default withRouter(NotFound)