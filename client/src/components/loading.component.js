import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from "../images/Flag.png"

export default class Loading extends Component {
    render() {
        return (
            <div className="loader-custom">
                <img src={Icon} style={{width: "10rem", marginBottom: 16}}/>
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            </div>
        );
    }
}
