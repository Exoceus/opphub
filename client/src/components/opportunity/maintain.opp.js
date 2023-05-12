import React, { Component, version } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import firebase_app from "../../firebase"
import Loading from "../loading.component"
import Navbar from "../navbar.component"
import Footer from "../footer"

export default class OpportunityMaintain extends Component {

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
        this.onChangeProfilePic = this.onChangeProfilePic.bind(this);
        this.onChangeTempHostName = this.onChangeTempHostName.bind(this);
        this.onChangePoc = this.onChangePoc.bind(this);

        this.onChangeDueDate = this.onChangeDueDate.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);

        this.onChangeRegion = this.onChangeRegion.bind(this);
        this.onChangeOnline = this.onChangeOnline.bind(this);

        this.onChangeNumSector = this.onChangeNumSector.bind(this);
        this.onChangeNumType = this.onChangeNumType.bind(this);
        this.onChangeNumDemo = this.onChangeNumDemo.bind(this);

        this.onDelNumSector = this.onDelNumSector.bind(this);
        this.onDelNumType = this.onDelNumType.bind(this);
        this.onDelNumDemo = this.onDelNumDemo.bind(this);

        this.onChangeOppID = this.onChangeOppID.bind(this);


        //this.onChangeTags = this.onChangeTags.bind(this);  Figure out how to split up tags by commas
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            host_id: '',
            confirmed_host_id: null,
            title: '',
            opp: '',
            description: '',
            duration: '',
            location: '',
            sector: [''],
            position_type: [''],
            target_demo: [''],
            learn_more: '',
            temp_host_name: null,
            isLoaded: true,
            selectedFile: null,
            opp_img: null,
            poc: null,
            due_date: null,
            start_date: null,
            end_date: null,
            isLoaded: true,
            temp_region: null,
            online: null,
            sector_err: false,
            position_type_err: false,
            target_demo_err: false,
            file_err: false,

        };

    }

    componentDidMount() {

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
                    temp_host_name: this.state.opp[0].temp_host_name,
                    opp_img: this.state.opp[0].opp_img,
                    poc: this.state.opp[0].poc,
                    due_date: this.state.opp[0].due_date,
                    start_date: this.state.opp[0].start_date,
                    end_date: this.state.opp[0].end_date,
                    temp_region: this.state.opp[0].temp_region,
                    online: this.state.opp[0].online,
                    isLoaded: true
                })
                console.log(this.state)
            })

            .catch((error) => {
                console.log(error);
            })


    }


    onDelNumSector(index, event) {
        let sectors = [...this.state.sector];
        sectors.splice(index, 1)
        this.setState({ sector: sectors });
        console.log('Index: ', index, 'Value: ', event)
    }


    onDelNumDemo(index, event) {

        let demos = [...this.state.target_demo];
        demos.splice(index, 1)
        this.setState({ target_demo: demos });
        console.log('Index: ', index, 'Value: ', event)
    }


    onDelNumType(index, event) {
        let types = [...this.state.position_type];
        types.splice(index, 1)
        this.setState({ position_type: types });
        console.log('Index: ', index, 'Value: ', event)
    }

    onChangeNumSector(e) {
        console.log(this.state.sector)
        this.setState({
            sector: this.state.sector.concat([''])
        }, () => {
            console.log(this.state.sector)
        })
    }

    onChangeNumDemo(e) {
        console.log(this.state.target_demo)
        this.setState({
            target_demo: this.state.target_demo.concat([''])
        }, () => {
            console.log(this.state.target_demo)
        })
    }

    onChangeNumType(e) {
        console.log(this.state.position_type)
        this.setState({
            position_type: this.state.position_type.concat([''])
        }, () => {
            console.log(this.state.position_type)
        })
    }


    onChangeOnline(e) {
        if (e.target.value == "Online") {
            this.setState({ online: true, location: 'Remote' })
        }

        else if (e.target.value == "In-Person") {
            this.setState({ online: false })
        }

    }

    onChangeOppID(e) {
        this.setState({
            opp_id: e.target.value
        })
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

    onChangePoc(e) {
        this.setState({
            poc: e.target.value
        })
    }

    onChangePoc(e) {
        this.setState({
            poc: e.target.value
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

    onChangePositionType(index, event) {
        let position_types = [...this.state.position_type];
        let type = { ...position_types[index] };
        type = event.target.value
        position_types[index] = type;
        this.setState({ position_type: position_types });
        console.log('Index: ', index, 'Value: ', event.target.value)
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

        var host_id = 'unknown'


        if (this.state.confirmed_host_id) {
            var host_id = this.state.confirmed_host_id
        }

        else {
            var host_id = 'unknown'
        }

        if (this.state.position_type.length <= 0) {
            this.setState({ position_type_err: true })
        }

        else {
            this.setState({ position_type_err: false })
        }

        if (this.state.sector.length <= 0) {
            this.setState({ sector_err: true })
        }

        else {
            this.setState({ sector_err: false })
        }

        if (this.state.target_demo.length <= 0) {
            this.setState({ target_demo_err: true })
        }

        else {
            this.setState({ target_demo_err: false })
        }


        console.log(this.state)
        if (!this.state.sector.length <= 0 && !this.state.position_type.length <= 0 && !this.state.target_demo.length <= 0) {

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
                poc: this.state.poc,
                due_date: this.state.due_date,
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                temp_region: this.state.temp_region,
                online: this.state.online
            }

            console.log('submitted', opp)


            axios.post('/api/opp/update/' + this.props.match.params.id, opp)
                .then(res => {
                    console.log(res.data)
                    this.props.history.push('/thank');
                });
        }
    }

    render() {

        if (this.state.isLoaded == false) {
            console.log(this.state)
            return (
                <div>Loading</div>
            )
        }



        else {
            console.log(this.state)

            var sectors = this.state.sector.map((sector, index) => (
                <div className="dropdown-item-wrap">
                    <select type="text"
                        required
                        className="form-control stacked-dropdown"
                        value={this.state.sector[index]}
                        onChange={event => this.onChangeSector(index, event)}
                        placeholder="Ex. Technology, Arts, Business, etc."
                        key={index}
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
                    <div className="del-opp-option-button" onClick={event => this.onDelNumSector(index, event)}><i class="far fa-trash-alt"></i></div>
                </div>
            ))

            var position_types = this.state.position_type.map((type, index) => (
                <div className="dropdown-item-wrap">
                    <select type="text"
                        required
                        className="form-control stacked-dropdown"
                        value={this.state.position_type[index]}
                        onChange={event => this.onChangePositionType(index, event)}
                        placeholder="Type of position: internship, volunteering, summer program, lectures, etc."
                        key={index}
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
                    <div className="del-opp-option-button" onClick={event => this.onDelNumType(index, event)}><i class="far fa-trash-alt"></i></div>
                </div>
            ))

            var target_demos = this.state.target_demo.map((type, index) => (
                <div className="dropdown-item-wrap">
                    <select type="text"
                        required
                        className="form-control stacked-dropdown"
                        value={this.state.target_demo[index]}
                        onChange={event => this.onChangeTargetDemo(index, event)}
                        placeholder="Target Demographic: High School, Middle School, University, Senior,etc."
                        key={index}
                    >
                        <option value="">Please choose a target demographic:</option>
                        <option value="Middle School">Middle School</option>
                        <option value="High School">High School</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Other">Other</option>
                    </select >
                    <div className="del-opp-option-button" onClick={event => this.onDelNumDemo(index, event)}><i class="far fa-trash-alt"></i></div>
                </div>
            ))

            var location_options

            if (this.state.online === true) {
                location_options = <div className="form-group">
                    <label className="input-title">Region: </label>
                    <select type="text"
                        required
                        className="form-control"
                        value={this.state.temp_region}
                        onChange={this.onChangeRegion}
                    >
                        <option value="">Please choose where this opportunity is restricted to:</option>

                        <optgroup label="Global">
                            <option value="Global">International/Global</option>
                        </optgroup>

                        <optgroup label="Popular Countries">
                            <option value="Canada">Canada</option>
                            <option value="USA">USA</option>
                            <option value="India">India</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="United Kingdom">United Kingdom</option>
                        </optgroup>

                        <optgroup label="Continents">
                            <option value="North America">North America</option>
                            <option value="Europe">Europe</option>
                            <option value="Asia">Asia</option>
                            <option value="Australia">Australia</option>
                            <option value="Africa">Africa</option>
                            <option value="South America">South America</option>
                        </optgroup>

                    </select>
                </div>
            }


            else if (this.state.online === false) {
                location_options =
                    <div className="grid-2">
                        <div className="form-group">
                            <label className="input-title">Region: </label>
                            <select type="text"
                                required
                                className="form-control"
                                value={this.state.temp_region}
                                onChange={this.onChangeRegion}
                            >
                                <option value="">Please choose where this opportunity is restricted to:</option>
                                <option value="Global">International/Global</option>

                                <optgroup label="Popular Countries">
                                    <option value="Canada">Canada</option>
                                    <option value="USA">USA</option>
                                    <option value="India">India</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                </optgroup>

                                <optgroup label="Continents">
                                    <option value="North America">North America</option>
                                    <option value="Europe">Europe</option>
                                    <option value="Asia">Asia</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Africa">Africa</option>
                                    <option value="South America">South America</option>
                                </optgroup>

                            </select>
                        </div>
                        <div className="form-group">
                            <label className="input-title">Location</label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.location}
                                onChange={this.onChangeLocation}
                                placeholder="City, State of where the opportunity is being hosted (ex. Toronto, Ontario)"
                            />
                        </div>
                    </div>
            }

            if (this.state.sector_err === true) {
                var sector_error = <label className="error-label">Please add at least one sector!</label>
            }

            if (this.state.position_type_err === true) {
                var position_type_error = <label className="error-label">Please add at least one opp type!</label>
            }

            if (this.state.target_demo_err === true) {
                var target_demo_error = <label className="error-label">Please add at least one demographic!</label>
            }

            if (this.state.file_err === true) {
                var file_error = <label className="error-label">Please add an image file!</label>
            }


            return (
                <div>
                    <Navbar />
                    <form onSubmit={this.onSubmit} className="add-opp-form">
                        <h3 className='form-title'>Edit Opportunity</h3>
                        <div className="grid-2">
                            <div className="form-group">
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
                                required
                                className="form-control"
                                rows="7"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                placeholder="Please give an overview of some of the most important information of the opportunity."
                            />
                        </div>
                        <div className="form-group">
                            <label className="input-title">What type of opportunity is this?</label>
                            {position_type_error}
                            <div className="multi-options-wrapper">
                                {position_types}
                                <div className="new-add-dropdown" onClick={this.onChangeNumType}><div><i className="far fa-plus-square"></i> Opp Type</div></div>
                            </div>
                        </div>

                        <div className="grid-3">
                            <div className="form-group">
                                <label className="input-title">Application/Sign up Deadline:</label>
                                <input type="date" value={this.state.due_date} onChange={this.onChangeDueDate} ></input>
                            </div>
                            <div className="form-group">
                                <label className="input-title">Start Date:</label>
                                <input type="date" value={this.state.start_date} onChange={this.onChangeStartDate} required></input>
                            </div>
                            <div className="form-group">
                                <label className="input-title">End Date:</label>
                                <input type="date" value={this.state.end_date} onChange={this.onChangeEndDate} required></input>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="input-title">Where is the this opportunity being hosted?</label>
                            <div onChange={this.onChangeOnline} className="hosted-options-wrapper">
                                <div> <input type="radio" value="Online" name="hosted" required checked={this.state.online} /> Online</div>
                                <div> <input type="radio" value="In-Person" name="hosted" required /> In-Person</div>
                            </div>
                        </div>

                        {location_options}

                        <div className="form-group">
                            <label className="input-title">Sector</label>
                            {sector_error}
                            <div className="multi-options-wrapper">
                                {sectors}
                                <div className="new-add-dropdown" onClick={this.onChangeNumSector}><div><i className="far fa-plus-square"></i>  Sector</div></div>
                            </div>
                        </div>


                        <div className="form-group">
                            <label className="input-title">Who is this opportunity for?</label>
                            {target_demo_error}
                            <div className="multi-options-wrapper">
                                {target_demos}
                                <div className="new-add-dropdown" onClick={this.onChangeNumDemo}><div><i className="far fa-plus-square"></i> Demographic</div></div>
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
                            <div className='button-wrapper'>
                                <button type="submit" value="submit" className='submit-button'>Create Opportunity</button>
                            </div>
                        </div>
                    </form>

                </div >
            )
        }
    }
}