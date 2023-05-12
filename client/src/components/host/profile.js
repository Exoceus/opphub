import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import OpportunityItem from "../opportunity/item.opp"

import Loading from "../loading.component"

export default class HostProfile extends Component {

    constructor(props) {
        super(props);
        this.state = { host: '', opp: '', UID: '', isLoaded: false };
    }

    componentDidMount() {

        axios.get('/api/org/' + this.props.match.params.id)
            .then(response => {
                var data = response.data
                this.setState({
                    host: data,
                })

                console.log(this.state)
                axios.get('/api/opp/org/' + this.props.match.params.id)
                    .then(response => {
                        var data = response.data
                        console.log(data)

                        this.setState({
                            opp: data,
                            isLoaded: true
                        })

                    })

                    .catch((error) => {
                        console.log(error);
                    })
            })

            .catch((error) => {
                console.log(error);
            })

    }

    render() {

        if (this.state.isLoaded == false) {
            console.log(this.state)
            return (
                <Loading />
            )
        }

        else {
            var host = this.state.host

            var bgstyle = { backgroundImage: `url(${host.profile_pic})` }

            if (this.state.opp) {
                var opps_list = this.state.opp.map((opp) => (
                    <div><OpportunityItem opp={opp} /> </div>
                ))
            }

            return (
                <div>

                    <div className='org-page-wrapper'>
                        <div className='main-col'>
                            <section className='org-page-head-row'>
                                <div className='head-row-col'>
                                    <div className='img-wrapper' style={bgstyle}></div>
                                </div>
                                <div className='head-row-col'>
                                    <h1 className='org-title'>{host.host_name}</h1>
                                    <div className='org-head-row-bottom-row'>
                                        <span className='opp-location'><i class="fas fa-map-marker-alt opp-icon"></i>{host.location}</span>
                                        <span className="position-type"><i class="fas fa-briefcase opp-icon"></i>{host.sector}</span>
                                        <a className="org-links" target='_blank' href={host.website}><i class="fas fa-link"></i> {host.host_name} Website</a>

                                    </div>
                                </div>

                            </section>

                            <section className="opp-page-section description">
                                <p className="org-page-description">{host.description}</p>
                            </section>
                            <section className="opp-page-section links">
                                <h3 className="opp-page-section-headings">Opportunities</h3>


                                <div className='list-opp-wrapper-col'>
                                    {opps_list}
                                </div>


                            </section>
                            <hr />
                            <br />
                        </div>

                    </div>
                </div>
            )
        }

    }

}



