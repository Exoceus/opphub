import React, { Component } from 'react';
import { Link, withRouter, } from 'react-router-dom';
import { Redirect } from 'react-router'
import ThankIcon from "../images/Thank.svg"
import Icon from "../icon.svg"

class Thankyou extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {

        return (
            <div className="loader-custom">
                <div>
                    <img src={ThankIcon} className="image-align-center" />
                </div>
                <h2 className="align-center">Thank You!</h2>
                <h5 className="align-center">We have added your opportunity and we really appreciate you adding this opportunity!</h5>

                <div className="thank-options">
                    <button className="thank-button" onClick={() => {
                        this.props.history.push('/suggest/opp')
                    }}>Add another opportunity <i class="fas fa-chevron-right"></i></button>
                    <button className="thank-button" onClick={() => {
                        this.props.history.push('/opportunities')
                    }}>Browse opportunities <i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        );


    }
}

export default withRouter(Thankyou)