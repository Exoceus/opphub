import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import firebase_app from "../../firebase"
import Loading from "../loading.component"

export default class OpportunityDelete extends Component {


    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            title: '',
            UID: '',
            isLoaded: false
        };

    }

    componentDidMount() {
        var user = firebase_app.auth().currentUser;
        var firebase_uid
        if (user != null) {
            firebase_uid = user.uid

            this.setState({ UID: firebase_uid })


            axios.get('/api/opp/' + this.props.match.params.id)
                .then(response => {
                    var data = response.data
                    this.setState({
                        opp: data,
                    })

                    this.setState({
                        id: this.props.match.params.id,
                        title: this.state.opp[0].title,
                        isLoaded: true
                    })
                    console.log(this.state)
                })

                .catch((error) => {
                    console.log(error);
                })

        }
    }



    onSubmit(e) {
        e.preventDefault();

        const opp = {
            id: this.state.id
        }


        axios.delete('/api/opp/del/' + this.props.match.params.id)
            .then(res => {
                console.log(res.data)
                this.props.history.push('/dashboard');
            });
    }

    render() {

        if (this.state.isLoaded == false) {
            console.log(this.state)
            return (
                <Loading />
            )
        }

        else {

            return (
                <div>
                    <div className="form-group">
                        <h3>Are You Sure You want to Delete the {this.state.title} Opportunity Forever?</h3>
                        <div className='button-wrapper'>
                            <button type="submit" onClick={this.onSubmit} className='submit-button'>Delete Opportunity</button>
                        </div>
                    </div>
                </div >
            )
        }



    }
}
