import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router'
import axios from 'axios';
import {AuthContext} from '../../auth'

import OpportunityItem from "./item.opp"
import Loading from "../loading.component"
import NotFound from "../not_found.component"

import Navbar from "../navbar.component"
import Footer from "../footer"

import firebase_app from "../../firebase"

import feedback_icon from "../../images/feedback icon.svg"

import TalksGraphic from "../../images/OppTalksImage.png"

export default class OpportunityList extends Component {
    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);

        this.onFilter = this.onFilter.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeSector = this.onChangeSector.bind(this);
        this.onChangePositionType = this.onChangePositionType.bind(this);
        this.onChangeTargetDemo = this.onChangeTargetDemo.bind(this);
        this.onChangeTempRegion = this.onChangeTempRegion.bind(this);

        this.onChangeFeatured = this.onChangeFeatured.bind(this);
        this.onChangeLatest = this.onChangeLatest.bind(this);
        this.onChangeStarred = this.onChangeStarred.bind(this);

        this.onChangeNewStarred = this.onChangeNewStarred.bind(this);

        this.onResetSearch = this.onResetSearch.bind(this);

        this.state = {
            opps: '',
            isLoaded: false,
            max_num_opps: 5,
            sector: '',
            position_type: '',
            target_demo: '',
            temp_region: '',
            search: null,
            no_opps: false,
            page_number: 0,
            section_view: 'featured',
            feature_canada: null,
            feature_comps: null,
            feature_tech: null,
            feature_global: null,
            view_type: 'compact',
            search_mode: false,
            starred_opportunities: [],
            UID: '',
            new_star_opp: '',
            user_id: null,
            type_user: 'reg_user',
            width: window.innerWidth,
            advanced_search: false,
            current_user: null
        };
    }

    componentDidMount() {

        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener('resize', this.handleWindowSizeChange);

        if(this.context.currentUser){
              this.setState(
                {
                  isLoaded: false,
                  UID: this.context.currentUser.uid
                },
                () => {
                    axios.get('/api/user/UID/' + this.context.currentUser.uid)
                    .then(response => {
                        this.setState({current_user: response.data._id, isLoaded: true})
                    })
    
                    .catch((error) => {
                        console.log(error);
                    })
                }     
              );
        }

        if (this.props.match.params.search) {

            console.log(this.props.match.params.search)

            axios.get('/api/opp/search', {
                params: {
                    query: this.props.match.params.search
                }
            })
                .then(response => {
                    var data = response.data

                    if (data.length == 0) {
                        this.setState({
                            no_opps: true
                        })

                    }

                    this.setState({
                        opps: data,
                        search: this.props.match.params.search,
                        section_view: 'latest',
                        search_mode: true
                    })


                    axios.get('/api/opp/all/feature', {
                        params: {
                            type: 'region',
                            value: ["Canada"],
                            verified: true,
                            limit: 6
                        }
                    })
                        .then(response => {
                            var data = response.data

                            this.setState({
                                feature_canada: data
                            })

                            axios.get('/api/opp/all/feature', {
                                params: {
                                    type: 'region',
                                    value: ["Global"],
                                    verified: true,
                                    limit: 6
                                }
                            })
                                .then(response => {
                                    var data = response.data

                                    this.setState({
                                        feature_global: data
                                    })

                                    axios.get('/api/opp/all/feature', {
                                        params: {
                                            type: 'sector',
                                            value: ["Technology"],
                                            verified: true,
                                            limit: 6
                                        }
                                    })
                                        .then(response => {
                                            var data = response.data

                                            this.setState({
                                                feature_tech: data
                                            })

                                            axios.get('/api/opp/all/feature', {
                                                params: {
                                                    type: 'position_type',
                                                    value: ["Other Contest", "Competitions"],
                                                    verified: true,
                                                    limit: 6
                                                }
                                            })
                                                .then(response => {
                                                    var data = response.data

                                                    this.setState({
                                                        feature_comps: data,
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
                                })
                                .catch((error) => {
                                    console.log(error);
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

        else {
            axios.get('/api/opp/all/new', {
                params: {
                    page: this.state.page_number,
                    limit: 10
                }
            })
                .then(response => {
                    var data = response.data

                    this.setState({
                        opps: data,
                    })

                    axios.get('/api/opp/all/feature', {
                        params: {
                            type: 'region',
                            value: ["Canada"],
                            verified: true,
                            limit: 6
                        }
                    })
                        .then(response => {
                            var data = response.data

                            this.setState({
                                feature_canada: data
                            })

                            axios.get('/api/opp/all/feature', {
                                params: {
                                    type: 'region',
                                    value: ["Global"],
                                    verified: true,
                                    limit: 6
                                }
                            })
                                .then(response => {
                                    var data = response.data

                                    this.setState({
                                        feature_global: data
                                    })

                                    axios.get('/api/opp/all/feature', {
                                        params: {
                                            type: 'sector',
                                            value: ["Technology"],
                                            verified: true,
                                            limit: 6
                                        }
                                    })
                                        .then(response => {
                                            var data = response.data

                                            this.setState({
                                                feature_tech: data
                                            })

                                            axios.get('/api/opp/all/feature', {
                                                params: {
                                                    type: 'position_type',
                                                    value: ["Other Contest", "Competitions"],
                                                    verified: true,
                                                    limit: 6
                                                }
                                            })
                                                .then(response => {
                                                    var data = response.data

                                                    this.setState({
                                                        feature_comps: data,
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

                                })

                                .catch((error) => {
                                    console.log(error);
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
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    onResetSearch(e) {
        console.log('resetting search')
        this.setState({
            search: null, page_number: 0, sector: '',
            position_type: '',
            target_demo: '',
            temp_region: '',
        }, () => {
            this.onFilter()
        })
    }

    onChangeNewStarred(e) {
        this.setState({
            new_star_opp: e.target.value
        })
    }

    onChangeStarred(e) {
        console.log('changing')

        this.setState({
            isLoaded: false,
        }, () => {

            if (this.state.starred_opportunities.length === 0) {
                axios.get('/api/user/UID/' + this.state.UID)
                    .then(response => {
                        var data = response.data
                        var starred_opp_ids = data.starred_opps

                        var fetchStarOpps = (opp_id) => {
                            axios.get('/api/opp/' + opp_id)
                                .then(response => {
                                    var random_array = [response.data[0]]
                                    this.setState({
                                        starred_opportunities: this.state.starred_opportunities.concat(random_array)
                                    })
                                })
                        }

                        var starred_opps = starred_opp_ids.map(async (opp_id) => (
                            await fetchStarOpps(opp_id)
                        ))

                        this.setState({
                            section_view: 'starred',
                            no_opps: false,
                            isLoaded: true
                        })
                    })

                    .catch((error) => {
                        console.log(error);
                        this.setState({
                            section_view: 'starred',
                            type_user: 'ambassador',
                            isLoaded: true
                        })
                    })
            }

            else {
                this.setState({
                    section_view: 'starred',
                    no_opps: false,
                    isLoaded: true
                })
            }
        })
    }

    onChangeFeatured(e) {
        console.log('changing')

        this.setState({
            isLoaded: false,
        }, () => {
            this.setState({
                section_view: 'featured',
                no_opps: false,
                isLoaded: true
            })
        })
    }

    onChangeLatest(e) {

        this.setState({
            isLoaded: false,
        }, () => {
            this.setState({
                section_view: 'latest',
                no_opps: false,
                isLoaded: true
            })
        })

    }


    handleScroll(e) {
        var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        var body = document.body;
        var html = document.documentElement;
        var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

        var windowBottom = windowHeight + window.pageYOffset + 10;

        if (windowBottom >= docHeight && this.state.section_view === 'latest' && this.state.search_mode === false) {


            this.setState({
                page_number: this.state.page_number + 1
            }, () => {
                axios.get('/api/opp/all/new', {
                    params: {
                        page: this.state.page_number,
                        limit: 10
                    }
                })
                    .then(response => {
                        var data = response.data

                        console.log('its working')
                        this.setState({
                            opps: this.state.opps.concat(data),
                            isLoaded: true
                        })

                    })

                    .catch((error) => {
                        console.log(error);
                    })
            })
        }

    }


    onChangeTempRegion(e) {
        this.setState({
            temp_region: e.target.value
        })
    }

    onChangeSearch(e) {

        this.setState({
            search: e.target.value
        })
        if (e.keyCode === 13) {
            // Cancel the default action, if needed
            e.preventDefault();
            // Trigger the button element with a click
            console.log('Damn')
        }
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

    onFilter(e) {
        this.setState({
            isLoaded: false,
            no_opps: false,
            section_view: 'latest'
        })

        if (this.state.location == "" && this.state.sector == "" && this.state.position_type == "" && this.state.target_demo == "" && this.state.temp_region == "" && this.state.search == null) {


            axios.get('/api/opp/all/new', {
                params: {
                    page: this.state.page_number,
                    limit: 10
                }
            })
                .then(response => {
                    var data = response.data

                    this.setState({
                        opps: data,
                        search_mode: false,
                        isLoaded: true
                    })
                })

                .catch((error) => {
                    console.log(error);
                })
        }

        else {
            this.setState({ search_mode: true }, () => {
                axios.post('/api/data/filter/new', {
                    location: this.state.location,
                    sector: this.state.sector,
                    position_type: this.state.position_type,
                    target_demo: this.state.target_demo,
                    temp_region: this.state.temp_region,
                    search: this.state.search
                })
                    .then(response => {
                        axios.get('/api/opp/all/filter', {
                            params: {
                                location: this.state.location,
                                sector: this.state.sector,
                                position_type: this.state.position_type,
                                target_demo: this.state.target_demo,
                                temp_region: this.state.temp_region,
                                search: this.state.search
                            }
                        })
                            .then(response => {
                                var data = response.data

                                if (data.length == 0) {
                                    this.setState({
                                        no_opps: true
                                    })
                                    console.log('yeet')
                                }

                                this.setState({
                                    opps: data,
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
            })
        }

    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    onChangeAdvancedSearch = (e) => {
        e.preventDefault();
        this.setState({ isLoaded: false }, () => {
            if (this.state.advanced_search) {
                this.setState({ advanced_search: false, isLoaded: true })
            }
            else {
                this.setState({ advanced_search: true, isLoaded: true })
            }
        })
    }

    onSelectBookmarkedOpp = (opp_id) => {
        axios.post('/api/user/remove/opp', {
                        opp_id: opp_id,
                        user_id: this.state.current_user
                    })
                    .then(response => {
                        this.setState({
                            isLoaded: false,
                            starred_opportunities: []
                        }, () => {
                            console.log(opp_id)
                            
                            axios.get('/api/user/UID/' + this.state.UID)
                            .then(response => {
                                var data = response.data
                                var starred_opp_ids = data.starred_opps


                            var starred_opps = starred_opp_ids.map((opp_id) => (
                                axios.get('/api/opp/' + opp_id)
                                        .then(response => {
                                            var random_array = [response.data[0]]
                                            this.setState({
                                                starred_opportunities: this.state.starred_opportunities.concat(random_array)
                                            })
                                        })
                            ))

                            Promise.all(starred_opps).then(() => {
                      
                                this.setState({
                                section_view: 'starred',
                                no_opps: false,
                                isLoaded: true
                                })
                            });

                            
                    })

                    .catch((error) => {
                        console.log(error);
                        this.setState({
                            section_view: 'starred',
                            type_user: 'ambassador',
                            isLoaded: true
                        })
                    })
            
                            
                        })
                    })
    }


    render() {
       
        document.title = "OppHub"
        var opps = this.state.opps

        var feedback_button = <button className="feedback-button" onClick={(e) => { this.props.history.push('/feedback') }}><img src={feedback_icon} className="feedback-icon" /></button>

        var { width } = this.state;

        var isMobile = width <= 426;

        var filter_bar = <div className="opp-filter-options">

            <div class="searchbar-wrapper">
                <input type="text" className="search-input" value={this.state.search}
                    onChange={this.onChangeSearch} onKeyPress={event => (event.key === 'Enter' && this.state.search != '') ? this.onFilter() : null} 
                    placeholder="Search Opportunities" />


                <button onClick={this.onFilter} className='searchButton'> <i class="fas fa-search"></i></button>

            </div>

            <div className="filter-bar">
                <div className="filter-item filter-icon">
                    <i class="fas fa-university"></i>
                </div>

                <div className="filter-item">
                    <select type="text"

                        className="form-control"
                        defaultValue={this.state.target_demo}
                        onChange={this.onChangeTargetDemo}
                    >
                        <option value="">Demographic</option>
                        <option value="Middle School">Middle School</option>
                        <option value="High School">High School</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="filter-item filter-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>


                <div className="filter-item">
                    <select type="text"

                        className="form-control"
                        defaultValue={this.state.temp_region}
                        onChange={this.onChangeTempRegion}
                    >
                        <option value="">Location</option>

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

                <div className="filter-item filter-icon">
                    <i class="fas fa-briefcase"></i>
                </div>

                <div className="filter-item">
                    <select type="text"
                        required
                        className="form-control"
                        defaultValue={this.state.sector}
                        onChange={this.onChangeSector}
                        placeholder="Ex. Technology, Arts, Business, etc."
                    >
                        <option value="">Sector</option>
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
                        <option value="STEM">STEM</option>
                        <option value="Technology">Technology</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="filter-item filter-icon">
                    <i class="fas fa-user-friends"></i>
                </div>

                <div className="filter-item">
                    <select type="text"
                        required
                        className="form-control"
                        defaultValue={this.state.position_type}
                        onChange={this.onChangePositionType}
                        placeholder="Type of position: internship, volunteering, summer program, lectures, etc."
                    >
                        <option value="">Opp Type</option>

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
            </div>

        </div>


        if (this.state.isLoaded == false) {
            return (
                <Loading />
            )
        }

        else {
            if (isMobile) {

                var search_bar = <div className="opp-filter-options">

                    <div class="searchbar-wrapper">
                        <input type="text" className="search-input" value={this.state.search}
                            onChange={this.onChangeSearch}
                            placeholder="Search Opportunities" placeholder="Search Opportunity" />


                        <button onClick={this.onFilter} className='searchButton'> <i class="fas fa-search"></i></button>

                    </div>

                </div>

                if (this.state.advanced_search) {
                    var filter_options = <div><div className="filter-bar">
                        <div className="filter-item filter-icon">
                            <i class="fas fa-university"></i>
                        </div>
                        <div className="filter-item">
                            <select type="text"

                                className="form-control"
                                defaultValue={this.state.target_demo}
                                onChange={this.onChangeTargetDemo}
                            >
                                <option value="">Demographic</option>
                                <option value="Middle School">Middle School</option>
                                <option value="High School">High School</option>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Postgraduate">Postgraduate</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="filter-item filter-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="filter-item">
                            <select type="text"

                                className="form-control"
                                defaultValue={this.state.temp_region}
                                onChange={this.onChangeTempRegion}
                            >
                                <option value="">Location</option>

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

                    </div>
                        <div className="filter-bar">
                            <div className="filter-item filter-icon">
                                <i class="fas fa-briefcase"></i>
                            </div>

                            <div className="filter-item">
                                <select type="text"
                                    required
                                    className="form-control"
                                    defaultValue={this.state.sector}
                                    onChange={this.onChangeSector}
                                    placeholder="Ex. Technology, Arts, Business, etc."
                                >
                                    <option value="">Sector</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Arts">Arts/Design</option>
                                    <option value="Business">Business</option>
                                    <option value="Education">Education</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Entrepreneurship">Entrepreneurship</option>
                                    <option value="Government">Government (Politics)</option>
                                    <option value="Journalism">Journalism</option>
                                    <option value="Law">Law</option>
                                    <option value="Math">Law</option>
                                    <option value="Media">Media</option>
                                    <option value="Medical">Medical</option>
                                    <option value="Mental Health">Mental Health</option>
                                    <option value="Science">Science</option>
                                    <option value="Social">Social/Civic (Diversity, Social Problems, etc.)</option>
                                    <option value="Sports">Sports (Athletic)</option>
                                    <option value="STEM">STEM</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="filter-item filter-icon">
                                <i class="fas fa-user-friends"></i>
                            </div>
                            <div className="filter-item">
                                <select type="text"
                                    required
                                    className="form-control"
                                    defaultValue={this.state.position_type}
                                    onChange={this.onChangePositionType}
                                    placeholder="Type of position: internship, volunteering, summer program, lectures, etc."
                                >
                                    <option value="">Opp Type</option>

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
                        </div>
                    </div>

                    var filter_dropdown = <div onClick={this.onChangeAdvancedSearch} className="advanced-filters-text">Advanced Filters <i class="fas fa-caret-up"></i></div>
                }

                else {
                    var filter_dropdown = <div onClick={this.onChangeAdvancedSearch} className="advanced-filters-text">Advanced Filters <i class="fas fa-caret-down"></i></div>
                }

                if (this.state.section_view === 'latest') {

                    if (opps) {
                        if (this.state.view_type == 'block') {
                            var opps_list = opps.map((opp) => (
                                <div><OpportunityItem opp={opp} edit_mode={false} list_layout={"block"} auth={this.state.user_id} /> </div>
                            ))
                        }
                        else if (this.state.view_type == 'compact') {
                            var opps_list = opps.map((opp) => (
                                <div><OpportunityItem opp={opp} edit_mode={false} list_layout={"compact"} auth={this.state.user_id} /> </div>
                            ))

                            var compact_view_legend =
                                <div className="compact-view-legend">
                                    <div className="compact-legend-item"></div>
                                    <div className="compact-legend-item">TITLE</div>
                                    <div className="compact-legend-item">LOCATION</div>
                                    <div className="compact-legend-item">TYPE</div>
                                    <div className="compact-legend-item">SECTOR</div>
                                    <div className='compact-legend-item'>DEMOGRAPHIC</div>
                                </div>
                        }

                    }

                    if (this.state.no_opps) {
                        var not_found = <NotFound thing="opportunity" />
                    }

                    if (!this.state.no_opps && !this.state.search_mode) {
                        var scroll_icon = <div className="align-center scroll-infinite"><i className="fas fa-angle-double-down opp-icon"></i> Scroll Down For More</div>
                    }

                    else if (this.state.no_opps && this.state.search_mode) {
                        var scroll_icon = <div className="align-center scroll-infinite" ><button onClick={this.onResetSearch} className="reset-search-button">Reset Search</button></div>
                    }

                    return (
                        <div >
                            <Navbar />
                            <div className="mobile-main-margin">
                                {search_bar}
                                {filter_options}
                                {filter_dropdown}
                            </div>



                            <div className="mobile-fixed-section-nav">
                                <div className="section-toggle-item" onClick={this.onChangeFeatured}><div className="mobile-nav-section-icon"><i class="fas fa-home"></i></div> <div className="mobile-nav-section-text">Featured</div></div>
                                <div className="section-toggle-item active-mobile-nav-item" onClick={this.onChangeLatest}> <div className="mobile-nav-section-icon"><i class="far fa-list-alt"></i></div> <div className="mobile-nav-section-text">Latest</div></div>

                                {this.state.UID ? <div className="section-toggle-item" onClick={this.onChangeStarred}> <div className="mobile-nav-section-icon"><i class="far fa-bookmark"></i></div> <div className="mobile-nav-section-text">Bookmarks</div></div> : null}
                            </div>

                            <div className="list-opp-wrapper opp-list">
                                {compact_view_legend}
                                {
                                    opps_list
                                }
                            </div>
                            {scroll_icon}
                            { not_found}
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        </div >
                    )
                }

                else if(this.state.section_view === 'featured') {
                    if (this.state.feature_canada) {
                        var canada_opps = this.state.feature_canada.map((opp) => (
                            <div><OpportunityItem opp={opp} edit_mode={false} list_layout={"mobile"} auth={this.state.user_id} /> </div>
                        ))
                    }

                    if (this.state.feature_comps) {
                        var comp_opps = this.state.feature_comps.map((opp) => (
                            <OpportunityItem opp={opp} edit_mode={false} list_layout={"mobile"} auth={this.state.user_id} />
                        ))
                    }


                    if (this.state.feature_global) {
                        var global_opps = this.state.feature_global.map((opp) => (
                            <OpportunityItem opp={opp} edit_mode={false} list_layout={"mobile"} auth={this.state.user_id} />
                        ))
                    }

                    if (this.state.feature_tech) {
                        var tech_opps = this.state.feature_tech.map((opp) => (
                            <OpportunityItem opp={opp} edit_mode={false} list_layout={"mobile"} auth={this.state.user_id} />
                        ))
                    }



                    if (this.state.no_opps) {
                        var not_found = <NotFound thing="opportunity" />
                    }

                    return (
                        <div>
                            <Navbar />

                            <div className="mobile-main-margin">
                                {search_bar}
                                {filter_options}
                                {filter_dropdown}
                            </div>
                            <div className="mobile-fixed-section-nav">
                                <div className="section-toggle-item active-mobile-nav-item" onClick={this.onChangeFeatured}><div className="mobile-nav-section-icon"><i class="fas fa-home"></i></div> <div className="mobile-nav-section-text">Featured</div></div>
                                <div className="section-toggle-item" onClick={this.onChangeLatest}> <div className="mobile-nav-section-icon"><i class="far fa-list-alt"></i></div> <div className="mobile-nav-section-text">Latest</div></div>
                                {this.state.UID ? <div className="section-toggle-item" onClick={this.onChangeStarred}> <div className="mobile-nav-section-icon"><i class="far fa-bookmark"></i></div> <div className="mobile-nav-section-text">Bookmarks</div></div> : null}
                            </div>

                           

                            <section className="mobile-featured-section">
                                <h5 className="mobile-featured-section-title">Featured Sectors</h5>
                                <div className='mobile-side-opp-wrapper'>
                                    <Link to="/opportunities/featured/position_type/Internship - Paid" className="featured-type-item">
                                        <div className="featured-type-icon"><i class="fas fa-briefcase"></i></div>
                                        <div className="featured-type-title">Internships (Paid)</div>
                                    </Link>

                                    <Link to="/opportunities/featured/position_type/Summer Program" className="featured-type-item">
                                        <div className="featured-type-icon"><i class="fas fa-chalkboard"></i></div>
                                        <div className="featured-type-title">Summer Program</div>
                                    </Link>

                                    <Link to="/opportunities/featured/position_type/Volunteering" className="featured-type-item">
                                        <div className="featured-type-icon"><i class="fas fa-hands-helping"></i></div>
                                        <div className="featured-type-title">Volunteering</div>
                                    </Link>

                                    <Link to="/opportunities/featured/position_type/Other Contest" className="featured-type-item">
                                        <div className="featured-type-icon"><i class="fas fa-medal"></i></div>
                                        <div className="featured-type-title">Contests</div>
                                    </Link>

                                    <Link to="/opportunities/featured/position_type/Lectures" className="featured-type-item">
                                        <div className="featured-type-icon"><i class="fas fa-chalkboard-teacher"></i></div>
                                        <div className="featured-type-title">Lectures</div>
                                    </Link>
                                    <Link to="/opportunities/featured/position_type/Other" className="featured-type-item">
                                        <div className="featured-type-icon"><i class="far fa-list-alt"></i></div>
                                        <div className="featured-type-title">Other</div>
                                    </Link>
                                </div>
                            </section>

                            <section className="mobile-featured-section alt-bg">
                                <h5 className="mobile-featured-section-title">Featured In Technology</h5>
                                <div className='mobile-side-opp-wrapper'>{tech_opps}</div>
                                <Link className="mobile-featured-section-link" to="/opportunities/featured/sector/Technology">More in Technology</Link>
                            </section>
                            <section className="mobile-featured-section">
                                <h5 className="mobile-featured-section-title">Featured Globally</h5>
                                <div className='mobile-side-opp-wrapper'>{global_opps}</div>
                                <Link className="mobile-featured-section-link" to="/opportunities/featured/region/Global">More in Global</Link>
                            </section>
                            <section className="mobile-featured-section alt-bg">
                                <h5 className="mobile-featured-section-title">Featured Sectors</h5>
                                <div className='mobile-side-opp-wrapper'>
                                    <Link to="/opportunities/featured/sector/STEM" className="featured-type-item">
                                        <div className="featured-type-icon"><i class="fas fa-flask"></i></div>
                                        <div className="featured-type-title">STEM</div>
                                    </Link>

                                    <Link to="/opportunities/featured/sector/Business" className="featured-type-item">
                                        <div className="featured-type-icon"><i class="fas fa-user-tie"></i></div>
                                        <div className="featured-type-title">Business</div>
                                    </Link>

                                    <Link to="/opportunities/featured/sector/Government" className="featured-type-item">
                                        <div className="featured-type-icon"><i class="fas fa-university"></i></div>
                                        <div className="featured-type-title">Government</div>
                                    </Link>

                                    <Link to="/opportunities/featured/sector/Arts" className="featured-type-item">
                                        <div className="featured-type-icon"><i class="fas fa-palette"></i></div>
                                        <div className="featured-type-title">Arts/ Design</div>
                                    </Link>

                                    <Link to="/opportunities/featured/sector/Social" className="featured-type-item">
                                        <div className="featured-type-icon"><i class="fas fa-users"></i></div>
                                        <div className="featured-type-title">Social/Civic</div>
                                    </Link>
                                    <Link to="/opportunities/featured/sector/Other" className="featured-type-item">
                                        <div className="featured-type-icon"><i class="far fa-list-alt"></i></div>
                                        <div className="featured-type-title">Other</div>
                                    </Link>
                                </div>
                            </section>
                            <section className="mobile-featured-section">
                                <h5 className="mobile-featured-section-title">Featured Competitions</h5>
                                <div className='mobile-side-opp-wrapper'>{comp_opps}</div>
                                <Link className="mobile-featured-section-link" to="/opportunities/featured/position_type/Competitions" >More Competitions</Link>
                            </section>
                            <Footer />
                            <br></br>
                            <br></br>
                        </div>

                    )
                }

                else if (this.state.section_view === 'starred') {
                    var starred_opps_list = this.state.starred_opportunities.map((opp) => (
                        <div><OpportunityItem opp={opp} edit_mode={true} starred_edit={this.onSelectBookmarkedOpp} list_layout={"compact"} auth={this.state.user_id} /> </div>
                    ))

              
                    return(
                    <div>
                            <Navbar />

                            <div className="mobile-main-margin">
                                {search_bar}
                                {filter_options}
                                {filter_dropdown}
                            </div>
                            <div className="mobile-fixed-section-nav">
                                <div className="section-toggle-item" onClick={this.onChangeFeatured}><div className="mobile-nav-section-icon"><i class="fas fa-home"></i></div> <div className="mobile-nav-section-text">Featured</div></div>
                                <div className="section-toggle-item" onClick={this.onChangeLatest}> <div className="mobile-nav-section-icon"><i class="far fa-list-alt"></i></div> <div className="mobile-nav-section-text">Latest</div></div>
                                {this.state.UID ? <div className="section-toggle-item active-mobile-nav-item" onClick={this.onChangeStarred}> <div className="mobile-nav-section-icon"><i class="fas fa-bookmark"></i></div> <div className="mobile-nav-section-text">Bookmarks</div></div> : null}
                            </div>

                            <div className="list-opp-wrapper opp-list">
                                {compact_view_legend}
                                {
                                    starred_opps_list
                                }
                            </div>

                            
                            <Footer />
                            <br></br>
                            <br></br>
                        </div>)
                }

            }

            else {
                if (this.state.section_view === 'latest') {

                    if (opps) {
                        if (this.state.view_type == 'block') {
                            var opps_list = opps.map((opp) => (
                                <div><OpportunityItem opp={opp} edit_mode={false} list_layout={"block"} auth={this.state.user_id} /> </div>
                            ))
                        }
                        else if (this.state.view_type == 'compact') {
                            var opps_list = opps.map((opp) => (
                                <div><OpportunityItem opp={opp} edit_mode={false} list_layout={"compact"} auth={this.state.user_id} /> </div>
                            ))

                            var compact_view_legend =
                                <div className="compact-view-legend">
                                    <div className="compact-legend-item"></div>
                                    <div className="compact-legend-item">TITLE</div>
                                    <div className="compact-legend-item">LOCATION</div>
                                    <div className="compact-legend-item">TYPE</div>
                                    <div className="compact-legend-item">SECTOR</div>
                                    <div className='compact-legend-item'>DEMOGRAPHIC</div>
                                </div>
                        }

                    }

                    if (this.state.no_opps) {
                        var not_found = <NotFound thing="opportunity" />
                    }

                    if (!this.state.no_opps && !this.state.search_mode) {
                        var scroll_icon = <div className="align-center scroll-infinite"><i class="fas fa-angle-double-down opp-icon"></i> Scroll Down For More</div>
                    }

                    else if (this.state.no_opps && this.state.search_mode) {
                        var scroll_icon = <div className="align-center scroll-infinite" ><button onClick={this.onResetSearch} className="reset-search-button">Reset Search</button></div>
                    }

                    return (
                        <div>
                            <Navbar />
                     
                        <div className="opp-list">
                            
                            {filter_bar}

                            {feedback_button}

                            <div className="section-toggle-wrap">
                                <button className="section-toggle-button" onClick={this.onChangeFeatured}>Featured</button>
                                <button className="section-toggle-button active-section" onClick={this.onChangeLatest}>Latest</button>
                                {this.state.UID ? <button className="section-toggle-button" onClick={this.onChangeStarred}>Bookmarked</button> : null}
                              
                            </div>
                            <div classname='list-opp-wrapper'>
                                {compact_view_legend}
                                {
                                    opps_list
                                }


                            </div>
                            {scroll_icon}
                            { not_found}
                        </div >
                        </div>
                    )
                }

                else if (this.state.section_view === 'featured') {
                    if (this.state.feature_canada) {
                        var canada_opps = this.state.feature_canada.map((opp) => (
                            <div><OpportunityItem opp={opp} edit_mode={false} auth={this.state.user_id} /> </div>
                        ))
                    }

                    if (this.state.feature_comps) {
                        var comp_opps = this.state.feature_comps.map((opp) => (
                            <div><OpportunityItem opp={opp} edit_mode={false} auth={this.state.user_id} /> </div>
                        ))
                    }


                    if (this.state.feature_global) {
                        var global_opps = this.state.feature_global.map((opp) => (
                            <div><OpportunityItem opp={opp} edit_mode={false} auth={this.state.user_id} /> </div>
                        ))
                    }

                    if (this.state.feature_tech) {
                        var tech_opps = this.state.feature_tech.map((opp) => (
                            <div><OpportunityItem opp={opp} edit_mode={false} auth={this.state.user_id} /> </div>
                        ))
                    }



                    if (this.state.no_opps) {
                        var not_found = <NotFound thing="opportunity" />
                    }

                    return (
                        <div>
                             <Navbar />
                            <div className="opp-list">
                               
                                {filter_bar}
                                {feedback_button}


                                <div className="section-toggle-wrap">
                                    <button className="section-toggle-button active-section" onClick={this.onChangeFeatured}>Featured</button>
                                    <button className="section-toggle-button" onClick={this.onChangeLatest}>Latest</button>
                                    {this.state.UID ? <button className="section-toggle-button" onClick={this.onChangeStarred}>Bookmarked</button> : null}
                                </div>


                                <section className="featured-opp-section">
                                    <div className="featured-type-wrapper">

                                        <Link to="/opportunities/featured/position_type/Internship - Paid" className="featured-type-item">
                                            <div className="featured-type-icon"><i class="fas fa-briefcase"></i></div>
                                            <div className="featured-type-title">Internships (Paid)</div>
                                        </Link>

                                        <Link to="/opportunities/featured/position_type/Summer Program" className="featured-type-item">
                                            <div className="featured-type-icon"><i class="fas fa-chalkboard"></i></div>
                                            <div className="featured-type-title">Summer Program</div>
                                        </Link>

                                        <Link to="/opportunities/featured/position_type/Volunteering" className="featured-type-item">
                                            <div className="featured-type-icon"><i class="fas fa-hands-helping"></i></div>
                                            <div className="featured-type-title">Volunteering</div>
                                        </Link>

                                        <Link to="/opportunities/featured/position_type/Other Contest" className="featured-type-item">
                                            <div className="featured-type-icon"><i class="fas fa-medal"></i></div>
                                            <div className="featured-type-title">Contests</div>
                                        </Link>

                                        <Link to="/opportunities/featured/position_type/Lectures" className="featured-type-item">
                                            <div className="featured-type-icon"><i class="fas fa-chalkboard-teacher"></i></div>
                                            <div className="featured-type-title">Lectures</div>
                                        </Link>
                                        <Link to="/opportunities/featured/position_type/Other" className="featured-type-item">
                                            <div className="featured-type-icon"><i class="far fa-list-alt"></i></div>
                                            <div className="featured-type-title">Other</div>
                                        </Link>
                                    </div>
                                </section>

                                <section className="featured-opp-section">
                                    <div className="opp-list-section-header">
                                        <h1 className="featured-opp-section-title">Featured in Technology</h1>
                                        <Link to="/opportunities/featured/sector/Technology" className="section-more-link">See More  <i class="fas fa-chevron-right"></i></Link>
                                    </div>
                                    <div className='list-opp-wrapper-col'>
                                        {tech_opps}
                                    </div>
                                </section>

                                <section className="featured-opp-section">
                                    <div className="opp-list-section-header">
                                        <h1 className="featured-opp-section-title">Featured in Competitions</h1>
                                        <Link to="/opportunities/featured/position_type/Competitions" className="section-more-link">See More  <i class="fas fa-chevron-right"></i></Link>
                                    </div>
                                    <div className='list-opp-wrapper-col'>
                                        {comp_opps}
                                    </div>
                                </section>

                                <section className="featured-opp-section">
                                    <h1 className="featured-opp-section-title">Featured Sectors</h1>
                                    <div className="featured-type-wrapper">

                                        <Link to="/opportunities/featured/sector/STEM" className="featured-type-item">
                                            <div className="featured-type-icon"><i class="fas fa-flask"></i></div>
                                            <div className="featured-type-title">STEM</div>
                                        </Link>

                                        <Link to="/opportunities/featured/sector/Business" className="featured-type-item">
                                            <div className="featured-type-icon"><i class="fas fa-user-tie"></i></div>
                                            <div className="featured-type-title">Business</div>
                                        </Link>

                                        <Link to="/opportunities/featured/sector/Government" className="featured-type-item">
                                            <div className="featured-type-icon"><i class="fas fa-university"></i></div>
                                            <div className="featured-type-title">Government</div>
                                        </Link>

                                        <Link to="/opportunities/featured/sector/Arts" className="featured-type-item">
                                            <div className="featured-type-icon"><i class="fas fa-palette"></i></div>
                                            <div className="featured-type-title">Arts/ Design</div>
                                        </Link>

                                        <Link to="/opportunities/featured/sector/Social" className="featured-type-item">
                                            <div className="featured-type-icon"><i class="fas fa-users"></i></div>
                                            <div className="featured-type-title">Social/Civic</div>
                                        </Link>
                                        <Link to="/opportunities/featured/sector/Other" className="featured-type-item">
                                            <div className="featured-type-icon"><i class="far fa-list-alt"></i></div>
                                            <div className="featured-type-title">Other</div>
                                        </Link>
                                    </div>
                                </section>

                                <section className="featured-opp-section">

                                    <div className="opp-list-section-header">
                                        <h1 className="featured-opp-section-title">Featured Globally (/Remote)</h1>
                                        <Link to="/opportunities/featured/region/Global" className="section-more-link">See More  <i class="fas fa-chevron-right"></i></Link>
                                    </div>
                                    <div className='list-opp-wrapper-col'>
                                        {global_opps}
                                    </div>
                                </section>

                                <section className="featured-opp-section">
                                    <div className="opp-list-section-header">
                                        <h1 className="featured-opp-section-title">Featured in Canada</h1>
                                        <Link to="/opportunities/featured/region/Canada" className="section-more-link">See More  <i class="fas fa-chevron-right"></i></Link>
                                    </div>
                                    <div className='list-opp-wrapper-col'>
                                        {canada_opps}
                                    </div>
                                </section>

                                {not_found}



                            </div >
                            <Footer />
                        </div>
                    )
                }

                else if (this.state.section_view === 'starred') {

                    if (this.state.starred_opportunities.length > 0) {

                        var starred_opps_list = this.state.starred_opportunities.map((opp) => (
                            <div><OpportunityItem opp={opp} edit_mode={true} starred_edit={this.onSelectBookmarkedOpp} list_layout={"block"} auth={this.state.user_id} /> </div>
                        ))
                    }

                    if (this.state.type_user == 'ambassador') {
                        var starred_content = <div className='content-center'> This feature has not yet been implemented for ambassadors. You can sign out and log in as a regular user:   <div className='content-center'><button className="signout" onClick={() => {firebase_app.auth().signOut(); window.location.reload();}}>Sign out <i className="fas fa-sign-out-alt"></i></button></div></div>
                    }

                    else {
                        var starred_content = <div>
                           <div className='content-center' style={{marginBottom: 24}}><button className="signout" onClick={() => {firebase_app.auth().signOut(); window.location.reload();}}>Sign out <i className="fas fa-sign-out-alt"></i></button></div>


                            <div className='list-opp-wrapper-col'>
                            {starred_opps_list}
                            </div>
                      
                        </div>
                    }
                    return (
                        <div>
                            <Navbar />
                            <div className="opp-list">
                            {filter_bar}
                            {feedback_button}
                            <div className="section-toggle-wrap">
                                <button className="section-toggle-button" onClick={this.onChangeFeatured}>Featured</button>
                                <button className="section-toggle-button" onClick={this.onChangeLatest}>Latest</button>
                                {this.state.UID ? <button className="section-toggle-button active-section" onClick={this.onChangeStarred}>Bookmarked</button> : null}
                            </div>
                            {starred_content}

                            <br />
                            <br />
                            </div>
                            

                            <Footer />
                        </div >
                    )
                }
            }
        }



    }
}


