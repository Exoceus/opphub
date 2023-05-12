import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import firebase_app from "../../firebase"

import Loading from "../loading.component"

export default class UpdateHost extends Component {

    constructor(props) {
        super(props);
        this.onChangeHostName = this.onChangeHostName.bind(this);
        this.onChangeHostType = this.onChangeHostType.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeSector = this.onChangeSector.bind(this);
        this.onChangeWebsite = this.onChangeWebsite.bind(this);
        this.onChangeProfilePic = this.onChangeProfilePic.bind(this);
        //this.onChangeTags = this.onChangeTags.bind(this);  Figure out how to split up tages by commas

        this.onChangeRegion = this.onChangeRegion.bind(this);

        this.onChangeNumSector = this.onChangeNumSector.bind(this);
        this.onChangeNumType = this.onChangeNumType.bind(this);
        this.onChangeNumDemo = this.onChangeNumDemo.bind(this);

        this.onDelNumSector = this.onDelNumSector.bind(this);
        this.onDelNumType = this.onDelNumType.bind(this);
        this.onDelNumDemo = this.onDelNumDemo.bind(this);


        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            host: '',
            hostName: '',
            UID: '',
            host_type: [''],
            description: '',
            location: '',
            sector: [''],
            website: '',
            selectedFile: null,
            profile_pic: null,
            isLoaded: false,
            temp_region: null,
        };
    }

    componentDidMount() {
        var user = firebase_app.auth().currentUser;
        var firebase_uid
        if (user != null) {
            firebase_uid = user.uid

            this.setState({ UID: firebase_uid })

            axios.get('/api/org/UID/' + firebase_uid)
                .then(response => {
                    var data = response.data
                    this.setState({
                        host: data,
                    })
                    console.log(this.state.host)
                    this.setState({
                        hostName: this.state.host.host_name,
                        host_type: this.state.host.host_type,
                        description: this.state.host.description,
                        location: this.state.host.location,
                        sector: this.state.host.sector,
                        website: this.state.host.website,
                        profile_pic: this.state.host.profile_pic,
                        temp_region: this.state.host.temp_region,
                        isLoaded: true
                    })
                })
                .catch((error) => {
                    console.log(error);
                })

        }
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
        let types = [...this.state.host_type];
        types.splice(index, 1)
        this.setState({ host_type: types });
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
        console.log(this.state.host_type)
        this.setState({
            host_type: this.state.host_type.concat([''])
        }, () => {
            console.log(this.state.host_type)
        })
    }

    onChangeRegion(e) {
        this.setState({
            temp_region: e.target.value
        })
    }


    onChangeHostName(e) {
        this.setState({
            hostName: e.target.value
        })
    }

    onChangeHostType(e) {
        this.setState({
            host_type: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })

        console.log(e.target.value)
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

    onChangeWebsite(e) {
        this.setState({
            website: e.target.value
        })
    }

    onChangeProfilePic(e) {
        this.setState({
            selectedFile: e.target.files[0]
        })
        console.log(e.target.files);
    }


    onChangeHostType(index, event) {
        let host_types = [...this.state.host_type];
        let type = { ...host_types[index] };
        type = event.target.value
        host_types[index] = type;
        this.setState({ host_type: host_types });
        console.log('Index: ', index, 'Value: ', event.target.value)
    }


    onSubmit(e) {
        e.preventDefault();

        const data = new FormData();// If file selected
        console.log(this.state)
        if (this.state.selectedFile) {
            data.append('hostImage', this.state.selectedFile, this.state.selectedFile.name); axios.post('/api/org/img-upload/', data, {
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
                                profile_pic: fileName.location
                            })
                            const host = {
                                host_name: this.state.hostName,
                                host_type: this.state.host_type,
                                description: this.state.description,
                                location: this.state.location,
                                sector: this.state.sector,
                                website: this.state.website,
                                profile_pic: this.state.profile_pic,
                                temp_region: this.state.temp_region
                            }

                            axios.post('/api/org/update/' + this.state.host.UID, host)
                                .then(res => {
                                    console.log(res.data)
                                    this.props.history.push('/dashboard');
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
            console.log('Doing route #2')
            const host = {
                host_name: this.state.hostName,
                host_type: this.state.host_type,
                description: this.state.description,
                location: this.state.location,
                sector: this.state.sector,
                website: this.state.website,
                profile_pic: this.state.profile_pic,
                temp_region: this.state.temp_region
            }
            axios.post('/api/org/update/' + this.state.host.UID, host)
                .then(res => {
                    console.log(res.data)
                    this.props.history.push('/dashboard');
                });
        }



    }

    render() {
        if (this.state.isLoaded == false) {
            console.log(this.state)
            return (
                <Loading />
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
                        <option value="Arts">Arts/Design</option>
                        <option value="Business">Business</option>
                        <option value="Education">Education</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Entrepreneurship">Entrepreneurship</option>
                        <option value="Government">Government (Politics)</option>
                        <option value="Math">Journalism</option>
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

            var host_types = this.state.host_type.map((type, index) => (
                <div className="dropdown-item-wrap">
                    <select type="text"
                        required
                        className="form-control stacked-dropdown"
                        value={this.state.host_type[index]}
                        onChange={event => this.onChangeHostType(index, event)}
                        placeholder="Type of position: internship, volunteering, summer program, lectures, etc."
                        key={index}
                    >
                        <option value="">Please choose a type:</option>
                        <optgroup label="Academic">
                            <option value="University">University/College</option>
                            <option value="High School">High School</option>
                            <option value="Other Academic">High School</option>
                        </optgroup>

                        <optgroup label="Not for Profit">
                            <option value="Youth Organization">Youth Organization</option>
                            <option value="Governmental Organization">Governmental Organization</option>
                            <option value="Other Not for Profit">Other Not for Profit</option>
                        </optgroup>

                        <optgroup label="Community">
                            <option value="Professional Community">Professional Community</option>
                            <option value="Educational Community">Educational Community</option>
                            <option value="Advocate Community">Advocate Community</option>
                            <option value="Other Community">Advocate communities</option>
                        </optgroup>
                        <optgroup label="Company">
                            <option value="Startup">Startup</option>
                            <option value="Large Company">Large Company</option>
                            <option value="Advocate Community">Advocate Community</option>
                        </optgroup>
                        <optgroup label="Other">
                            <option value="Other">Other Opportunity Type</option>
                        </optgroup>



                    </select>
                    <div className="del-opp-option-button" onClick={event => this.onDelNumType(index, event)}><i class="far fa-trash-alt"></i></div>
                </div>
            ))


            return (
                <div>
                    <form onSubmit={this.onSubmit} className="add-opp-form">
                        <h3 className='form-title'>Set Up Organization Profile</h3>
                        <div className="grid-2">
                            <div className="form-group">
                                <label className="input-title">Organization Name</label>
                                <input
                                    required
                                    className="form-control"
                                    type="text"
                                    value={this.state.hostName}
                                    onChange={this.onChangeHostName}
                                    placeholder="Name of the Organization"
                                />
                            </div>
                            <div className="form-group">
                                <label className="input-title">Organization website</label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.website}
                                    onChange={this.onChangeWebsite}
                                    placeholder="Link to you organization's website."
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description: </label>
                            <textarea
                                required
                                rows="7"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                placeholder="You can mention any aspect your organization that stands out, the histroy of the organization or provide an overview of the organization."
                            />
                        </div>
                        <div className="form-group">
                            <label className="input-title">What type of organization?</label>
                            <div className="multi-options-wrapper">
                                {host_types}
                                <div className="new-add-dropdown" onClick={this.onChangeNumType}><div><i className="far fa-plus-square"></i> Org Type</div></div>
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
                                <label className="input-title">Where is your org based?</label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.location}
                                    onChange={this.onChangeLocation}
                                    placeholder="City, State of where the opportunity is being hosted (ex. Toronto, Ontario)"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="input-title">Sector</label>

                            <div className="multi-options-wrapper">
                                {sectors}
                                <div className="new-add-dropdown" onClick={this.onChangeNumSector}><div><i className="far fa-plus-square"></i>  Sector</div></div>
                            </div>
                        </div>

                        <div className="card border-light mb-3 mt-5">
                            <div className="card-header">
                                <label>Profile Picture (Logo): </label>
                                <p className="text-muted" style={{ width: "100%" }, { textAlign: 'right' }}>Upload Size: 250px x 250px ( Max 2MB )</p>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Please upload an image for your profile. For updating your profile, only select an image if you would like to change the current image.</p>
                                <input type="file" className="form-control" onChange={this.onChangeProfilePic} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className='button-wrapper'><input type="submit" value="Setup or Update Host" className="submit-button" /></div>
                        </div>
                    </form>
                </div >
            )
        }



    }

}

