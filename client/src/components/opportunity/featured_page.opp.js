import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import OpportunityItem from "./item.opp"
import Loading from "../loading.component"
import NotFound from "../not_found.component"

import Navbar from "../navbar.component"
import Footer from "../footer"

export default class FeaturedOpportunityPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            opps: '',
            isLoaded: false,
            page_number: 0,
        };
    }

    componentDidMount() {

        axios.get('/api/opp/all/feature', {
            params: {
                type: this.props.match.params.type,
                value: [`${this.props.match.params.category}`],
                verified: false,
                limit: 100
            }
        })
            .then(response => {
                var data = response.data

                this.setState({
                    opps: data,
                    isLoaded: true
                })

            })

            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        document.title = "OppHub"
        var opps = this.state.opps

        if (this.state.isLoaded == false) {
            return (
                <Loading />
            )
        }
        else {
            if (opps) {
                var featured_opps = opps.map((opp) => (
                    <div><OpportunityItem opp={opp} edit_mode={false} /> </div>
                ))
            }

            if (this.state.no_opps) {
                var not_found = <NotFound thing="opportunity" />
            }

            return (
                <div>
                    <Navbar />
                    <div className="opp-list">
                    <Link to="/opps" className="section-more-link"><i class="fas fa-chevron-left"></i>  Home Page</Link>
                    <br />
                    <br />
                    <h1>Featured in {this.props.match.params.category}</h1>
                    <div className='list-opp-wrapper-col'>
                        {featured_opps}
                    </div>

                    { not_found}
                    </div>
                    <Footer/>
                </div >
            )
        }

    }
}


