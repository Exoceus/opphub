import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import firebase_app from "../../firebase"

export default class OpportunityUpdate extends Component {


    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeSector = this.onChangeSector.bind(this);
        this.onChangePositionType = this.onChangePositionType.bind(this);
        this.onChangeTargetDemo = this.onChangeTargetDemo.bind(this);
        this.onChangeLearnMore = this.onChangeLearnMore.bind(this);
        //this.onChangeTags = this.onChangeTags.bind(this);  Figure out how to split up tags by commas
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            host_id: '',
            title: '',
            UID: '',
            description: '',
            duration: '',
            location: '',
            sector: '',
            position_type: '',
            target_demo: '',
            learn_more: '',
            opp: '',
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
                        host_id: this.state.opp[0].host_id,
                        location: this.state.opp[0].location,
                        sector: this.state.opp[0].sector,
                        title: this.state.opp[0].title,
                        description: this.state.opp[0].description,
                        duration: this.state.opp[0].duration,
                        position_type: this.state.opp[0].position_type,
                        target_demo: this.state.opp[0].target_demo,
                        learn_more: this.state.opp[0].learn_more,
                        isLoaded: true
                    })
                    console.log(this.state)
                })

                .catch((error) => {
                    console.log(error);
                })

        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        })
    }

    onChangeSector(e) {
        this.setState({
            sector: e.target.value
        })
    }

    onChangePositionType(e) {
        this.setState({
            position_type: e.target.value
        })
    }

    onChangeTargetDemo(e) {
        this.setState({
            target_demo: e.target.value
        })
    }

    onChangeLearnMore(e) {
        this.setState({
            learn_more: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const opp = {
            host_id: this.state.host_id,
            title: this.state.title,
            description: this.state.description,
            duration: this.state.duration,
            location: this.state.location,
            sector: this.state.sector,
            position_type: this.state.position_type,
            target_demo: this.state.target_demo,
            learn_more: this.state.learn_more
        }


        axios.post('/api/opp/update/' + this.props.match.params.id, opp)
            .then(res => {
                console.log(res.data)
                this.props.history.push('/dashboard/');
            });
    }

    render() {

        if (this.state.isLoaded == false) {
            console.log(this.state)
            return (
                <div>Loading</div>
            )
        }

        else {

            return (
                <div>
                    <form onSubmit={this.onSubmit} className="sign-up-form">
                        <h3 className='form-title'>Update Opportunity</h3>
                        <div className="form-group">
                            <label>Title: </label>
                            <input type="text"
                                required
                                className="form-control"
                                defaultValue={this.state.title}
                                onChange={this.onChangeTitle}
                                placeholder="Title of the opportunity"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <textarea

                                className="form-control"
                                defaultValue={this.state.description}
                                onChange={this.onChangeDescription}
                                placeholder="You can mention any aspect your organization that stands out, the histroy of the organization or provide an overview of the organization."
                            />
                        </div>
                        <div className="form-group">
                            <label>Duration: </label>
                            <input type="text"

                                className="form-control"
                                defaultValue={this.state.duration}
                                onChange={this.onChangeDuration}
                                placeholder="Type of Organization (Educational, University, Non-Profit, Company, etc."
                            />
                        </div>
                        <div className="form-group">
                            <label>Location: </label>
                            <input type="text"

                                className="form-control"
                                defaultValue={this.state.location}
                                onChange={this.onChangeLocation}
                                placeholder="Please enter the location in the following format: City, Province/State, Country"
                            />
                        </div>
                        <div className="form-group">
                            <label>Sector: </label>
                            <select type="text"
                                required
                                className="form-control"
                                defaultValue={this.state.sector}
                                onChange={this.onChangeSector}
                                placeholder="Ex. Technology, Arts, Business, etc."
                            >
                                <option value="">Please choose a sector:</option>
                                <option value="Academic">Academic</option>
                                <option value="Arts">Arts/Design</option>
                                <option value="Business">Business</option>
                                <option value="Education">Education</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Entrepreneurship">Entrepreneurship</option>
                                <option value="Government">Government (Politics)</option>
                                <option value="Journalism">Journalism</option>
                                <option value="Law">Law</option>
                                <option value="Math">Math</option>
                                <option value="Media">Media</option>
                                <option value="Medical">Medical</option>
                                <option value="Mental Health">Mental Health</option>
                                <option value="Science">Science</option>
                                <option value="Social">Social/Civic (Diversity, Social Problems, etc.)</option>
                                <option value="Sports">Sports (Athletic)</option>
                                <option value="STEM">STEM (try to add the individual strands like Math, Science as well)</option>
                                <option value="Technology">Technology</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Position Type: </label>
                            <select type="text"
                                required
                                className="form-control"
                                defaultValue={this.state.position_type}
                                onChange={this.onChangePositionType}
                            >
                                <option value="">Please choose a type:</option>
                                <optgroup label="Position">
                                    <option value="Internship - Unpaid">Internship - Unpaid</option>
                                    <option value="Internship - Paid">Internship - Paid</option>
                                    <option value="Leadership">Leadership</option>
                                    <option value="Pre-College Program">Pre-College Program</option>
                                    <option value="Research">Research</option>
                                    <option value="Summer Program">Summer Program</option>
                                    <option value="Volunteering">Volunteering</option>
                                    <option value="Other Position">Other Position</option>
                                </optgroup>

                                <optgroup label="Contests/Competition">
                                    <option value="Hackathon">Hackathon</option>
                                    <option value="Case Study">Case Study</option>
                                    <option value="Academic Competition">Academic Competition (Olympiads, Science fairs)</option>
                                    <option value="Other Contest">Other Competition</option>
                                </optgroup>


                                <optgroup label="Event">
                                    <option value="Conference">Conference</option>
                                    <option value="Lectures">Lectures</option>
                                    <option value="Seminar">Webinar/Seminar</option>
                                    <option value="Workshops">Workshops</option>
                                    <option value="Other Event">Other Event</option>
                                </optgroup>

                                <optgroup label="Scholarship">
                                    <option value="Academic Scholarship">Academic Scholarship</option>
                                    <option value="Community Service Scholarships">Community Service Scholarships</option>
                                    <option value="Athletic Scholarship">Athletic Scholarship</option>
                                    <option value="Other Scholarship">Other Scholarship</option>
                                </optgroup>
                                <optgroup label="Other">
                                    <option value="Other">Other Opportunity Type</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Target Demo: </label>
                            <select type="text"

                                className="form-control"
                                defaultValue={this.state.target_demo}
                                onChange={this.onChangeTargetDemo}
                                placeholder="Target Demographic: High School, Middle School, University, Senior,etc."
                            >
                                <option value="High School">High School</option>
                                <option value="Middle School">Middle School</option>
                                <option value="Senior">Senior</option>
                                <option value="University">University</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Learn More: </label>
                            <input type="text"
                                required
                                className="form-control"
                                defaultValue={this.state.learn_more}
                                onChange={this.onChangeLearnMore}
                                placeholder="Link where users can learn more about the opportunity"
                            />
                        </div>
                        <div className="form-group">
                            <div className='button-wrapper'>
                                <button type="submit" className='submit-button'>Update Opportunity</button>
                            </div>
                        </div>
                    </form>
                </div >
            )
        }



    }
}
