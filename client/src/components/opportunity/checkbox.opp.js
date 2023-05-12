import React, { Component, version } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import firebase_app from "../../firebase"
import Loading from "../loading.component"
import Navbar from "../navbar.component"

export default class OpportunitySuggest extends Component {

    constructor(props) {
        super(props);
        //this.onChangeTags = this.onChangeTags.bind(this);  Figure out how to split up tages by commas
        this.onSubmit = this.onSubmit.bind(this);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeSector = this.onChangeSector.bind(this);
        this.onChangePositionType = this.onChangePositionType.bind(this);
        this.onChangeTargetDemo = this.onChangeTargetDemo.bind(this);
        this.onChangeLearnMore = this.onChangeLearnMore.bind(this);
        this.onChangeProfilePic = this.onChangeProfilePic.bind(this);
        this.onChangeTempHostName = this.onChangeTempHostName.bind(this);
        this.onChangeDueDate = this.onChangeDueDate.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);

        this.onChangeRegion = this.onChangeRegion.bind(this);

        this.state = {
            title: '',
            description: '',
            duration: '',
            location: '',
            type: {
                'Competition': false,
                'Contest': false,
                'Internship - Paid': false,
                'Internship - Unpaid': false,
                'Leadership': false,
                'Lectures': false,
                'Research': false,
                'Social Group': false,
                'Summer Program': false,
                'Volunteering': false,
                'Other': false
            },
            sector: {
                'Art': false,
                'Business': false,
                'Education': false,
                'Engineering': false,
                'Entrepreneurship': false,
                'Government': false,
                'Journalism': false,
                'Law': false,
                'Math': false,
                'Media': false,
                'Medical': false,
                'Health': false,
                'Science': false,
                'Social': false,
                'Sports': false,
                'STEM': false,
                'Technology': false,
                'Other': false
            },
            target_demo: {
                'Middle School': false,
                'High School': false,
                'Undergraduate': false,
                'Postgraduate': false,
            },
            hosted_on: '',
            learn_more: '',
            temp_host_name: null,
            isLoaded: true,
            selectedFile: null,
            opp_img: null,
            due_date: null,
            start_date: null,
            end_date: null,
            temp_region: null
        };
    }

    onChangeRegion(e) {
        this.setState({
            temp_region: e.target.value
        })
    }

    onChangeTempHostName(e) {
        this.setState({
            temp_host_name: e.target.value
        })
    }

    onChangeDueDate(e) {
        this.setState({
            due_date: e.target.value
        })
    }

    onChangeStartDate(e) {
        this.setState({
            start_date: e.target.value
        })
    }

    onChangeEndDate(e) {
        this.setState({
            end_date: e.target.value
        })
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

    onChangeSector(index, event) {
        let sectors = [...this.state.sector];
        let sector = { ...sectors[index] };
        sector = event.target.value
        sectors[index] = sector;
        this.setState({ sector: sectors });
        console.log('Index: ', index, 'Value: ', event.target.value)
    }

    onChangePositionType(e) {
        console.log(e.target.name)
        console.log(e.target.checked)
    }

    onChangeTargetDemo(index, event) {
        let target_demos = [...this.state.target_demo];
        let demo = { ...target_demos[index] };
        demo = event.target.value
        target_demos[index] = demo;
        this.setState({ target_demo: target_demos });
        console.log('Index: ', index, 'Value: ', event.target.value)
    }

    onChangeLearnMore(e) {
        this.setState({
            learn_more: e.target.value
        })
    }

    onChangeProfilePic(e) {
        this.setState({
            selectedFile: e.target.files[0]
        })
        console.log(e.target.files);
    }


    onSubmit(e) {
        e.preventDefault();

        if (this.state.confirmed_host_id) {
            var host_id = this.state.confirmed_host_id
        }

        else {
            var host_id = 'unknown'
        }

        const data = new FormData();// If file selected
        console.log(this.state)
        if (this.state.selectedFile) {
            data.append('hostImage', this.state.selectedFile, this.state.selectedFile.name);
            axios.post('/api/opp/img-upload/', data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
                .then((response) => {
                    if (200 === response.status) {
                        // If file size is larger than expected.
                        if (response.data.error) {
                            if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                                console.log('Max size: 2MB', 'red');
                            } else {
                                console.log(response.data.error, 'red');
                            }
                        } else {
                            // Success
                            let fileName = response.data;
                            console.log('fileName', fileName);
                            console.log('File Uploaded', '#3089cf');
                            this.setState({
                                opp_img: fileName.location
                            })
                            const opp = {
                                host_id: host_id,
                                title: this.state.title,
                                description: this.state.description,
                                duration: this.state.duration,
                                location: this.state.location,
                                sector: this.state.sector,
                                position_type: this.state.position_type,
                                target_demo: this.state.target_demo,
                                learn_more: this.state.learn_more,
                                suggestion: true,
                                opp_img: this.state.opp_img,
                                temp_host_name: this.state.temp_host_name,
                                due_date: this.state.due_date,
                                start_date: this.state.start_date,
                                end_date: this.state.end_date,
                                temp_region: this.state.temp_region
                            }

                            if (this.state.confirmed_host_id) {
                                opp.temp_host_name = this.state.temp_host_name
                            }

                            axios.post('/api/opp/new', opp)
                                .then(res => {
                                    console.log(res.data)
                                    this.props.history.push('/thank');
                                });
                        }
                    }
                }).catch((error) => {
                    // If another error
                    console.log(error, 'red');
                });
        } else if (!this.state.profile_pic) {
            // if file not selected throw error
            console.log('Please upload file', 'red');
        }

        else {
            var opp = {
                host_id: host_id,
                title: this.state.title,
                description: this.state.description,
                duration: this.state.duration,
                location: this.state.location,
                sector: this.state.sector,
                position_type: this.state.position_type,
                target_demo: this.state.target_demo,
                learn_more: this.state.learn_more,
                suggestion: true,
                temp_host_name: this.state.temp_host_name,
                due_date: this.state.due_date,
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                temp_region: this.state.temp_region
            }

            if (this.state.confirmed_host_id) {
                opp.temp_host_name = this.state.temp_host_name
            }

            axios.post('/api/opp/new', opp)
                .then(res => {
                    console.log(res.data)
                    this.props.history.push('/thank');
                });
        }
    }


    selectHandler(hostname, hostid) {
        this.setState({ confirmed_host_id: hostid, confirmed_host_name: hostname })

        console.log(this.state.confirmed_host)
    }

    render() {

        if (this.state.isLoaded == false) {
            return (
                <Loading />
            )
        }

        else {
            console.log(this.state)
            var opp_type = this.state.type

            if (!this.state.confirmed_host_name) {
                var add_host = <div className="form-group">
                    <label className="input-title">Organization Name</label>
                    <input
                        required
                        className="form-control"
                        type="text"
                        value={this.state.temp_host_name}
                        onChange={this.onChangeTempHostName}
                        placeholder="Name of the Organization"
                    />
                </div>
            }



            return (
                <div>
                    <Navbar />
                    <form onSubmit={this.onSubmit} className="add-opp-form">
                        <h3 className='form-title'>New Opportunity</h3>
                        <div className="grid-2">
                            {add_host}
                            <div className="form-group">
                                <label className="input-title">Opportunity Title</label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    placeholder="Title of the opportunity"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="input-title">Description: </label>
                            <textarea
                                className="form-control"
                                rows="7"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                placeholder="Please give an overview of some of the most important information of the opportunity."
                            />
                        </div>


                        <div className="form-group">
                            <label className="input-title">Opportunity Type: </label>
                            <div className="checkbox-grid">
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" checked={opp_type['Competition']} onChange={this.onChangePositionType} name="Competition" />Competition
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" checked={opp_type['Contest']} onChange={this.onChangePositionType} name="Contest" />Contest
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" checked={opp_type['Internship - Paid']} onChange={this.onChangePositionType} name="Internship - Paid" />Internship - Paid
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" checked={opp_type['Internship - Unpaid']} onChange={this.onChangePositionType} name="Internship - Unpaid" />Internship - Unpaid
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" checked={opp_type['Leadership']} onChange={this.onChangePositionType} name="Leadership" />Leadership
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" checked={opp_type['Lectures']} onChange={this.onChangePositionType} name="Lectures" />Lectures/Workshop
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" checked={opp_type['Research']} onChange={this.onChangePositionType} name="Research" />Research
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" checked={opp_type['Social Group']} onChange={this.onChangePositionType} name="Social Group" />Social Group
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" checked={opp_type['Summer Program']} onChange={this.onChangePositionType} name="type" />Summer Program
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" checked={opp_type['Volunteering']} onChange={this.onChangePositionType} name="Volunteering" />Volunteering
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" checked={opp_type['Other']} onChange={this.onChangePositionType} name="Other" />Other
                                </label>
                            </div>
                        </div>


                        <div className="form-group">
                            <label className="input-title">Sector: </label>
                            <div className="checkbox-grid">
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Arts/Design
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Business
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Education
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Engineering
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Entrepreneurship
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Government
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Journalism
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Law
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Mathematics
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Media/Marketing
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Medical
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Mental Health
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Science
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Social/Civic
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Sports
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />STEM
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Technology
                                </label>

                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="sector" />Other
                                </label>
                            </div>
                        </div>


                        <div className="form-group">
                            <label className="input-title">Target Demo: </label>
                            <div className="checkbox-grid">
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="demographic" />Middle School
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="demographic" />High School
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="demographic" />Undergraduate
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="demographic" />Post graduation
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="input-title">Where is the opportunity being hosted?</label>
                            <div className="checkbox-grid grid-2">
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="demographic" />Online
                                </label>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" name="demographic" />In-Person
                                </label>

                            </div>
                        </div>

                        <div className="form-group">
                            <label className="input-title">Duration: </label>
                            <input type="text"

                                className="form-control"
                                value={this.state.duration}
                                onChange={this.onChangeDuration}
                                placeholder="Duration of the opportunity (ex. 2 Weeks Aug - September, etc)"
                            />
                        </div>
                        <div className="grid-3">
                            <div className="form-group">
                                <label className="input-title">Application Deadline:</label>
                                <input type="date" value={this.state.due_date} onChange={this.onChangeDueDate}></input>
                            </div>
                            <div className="form-group">
                                <label className="input-title">Start Date:</label>
                                <input type="date" value={this.state.start_date} onChange={this.onChangeStartDate}></input>
                            </div>
                            <div className="form-group">
                                <label className="input-title">End Date:</label>
                                <input type="date" value={this.state.end_date} onChange={this.onChangeEndDate}></input>
                            </div>
                        </div>
                        <div className="grid-2">
                            <div className="form-group">
                                <label className="input-title">Region: </label>
                                <select type="text"
                                    required
                                    className="form-control"
                                    value={this.state.temp_region}
                                    onChange={this.onChangeRegion}
                                >
                                    <option value="">Please choose a region:</option>
                                    <option value="Canada">Canada</option>
                                    <option value="USA">USA</option>
                                    <option value="India">India</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="North America">North America</option>
                                    <option value="Europe">Europe</option>
                                    <option value="Asia">Asia</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Africa">Africa</option>
                                    <option value="South America">South America</option>
                                    <option value="Global">Global (Remote)</option>
                                </select>
                            </div>
                            <div className="form-group">

                                <label className="input-title">Location: </label>
                                <input type="text"
                                    className="form-control"
                                    value={this.state.location}
                                    onChange={this.onChangeLocation}
                                    placeholder="Please enter the location in the following format: City, Province/State, Country or for remote - Remote"
                                />
                            </div>

                        </div>

                        <div className="form-group">
                            <label className="input-title">Link</label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.learn_more}
                                onChange={this.onChangeLearnMore}
                                placeholder="Link where users can learn more about the opportunity"
                            />
                        </div>

                        <div className="form-group">
                            <label className="input-title">Image/Logo Upload</label>
                            <p className="card-text">Please upload an SQUARE image (1:1) aspect ratio</p>
                            <p className="card-text">JPGs and PNGs are accepted</p>
                            <input type="file" className="form-control" onChange={this.onChangeProfilePic} />
                        </div>

                        <div className="form-group">
                            <div className='button-wrapper'>
                                <button type="submit" className='submit-button'>Create Opportunity</button>
                            </div>
                        </div>
                    </form>
                </div >
            )
        }
    }
}

