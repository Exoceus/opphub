import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import Logo from '../../logo.svg';
import axios from 'axios';

import LandingGraphic from "../../images/Flag.png"

import company_1 from "../../images/landing_page/google.png"
import company_2 from "../../images/landing_page/mit.png"
import company_3 from "../../images/landing_page/nytimes.png"
import company_4 from "../../images/landing_page/cpa.png"

import opptalks from "../../images/landing_page/opptalks.png"
import newsletter from "../../images/landing_page/newsletter.png"
import sectors from "../../images/landing_page/sectors.png"
import opps from "../../images/landing_page/opps.png"

import icon_flag from "../../images/landing_page/icons/Flag.png"
import icon_list from "../../images/landing_page/icons/List Icon.png"
import icon_briefcase from "../../images/landing_page/icons/Briefcase Icon.png"
import icon_basketball from "../../images/landing_page/icons/Basketball Icon.png"
import icon_flask from "../../images/landing_page/icons/Flask Icon.png"
import icon_location from "../../images/landing_page/icons/Location Icon.png"
import icon_palette from "../../images/landing_page/icons/Palette Icon.png"
import icon_people from "../../images/landing_page/icons/People Icon.png"

import sideimg from "../../images/landing_page/sideimg.jpg"

import Loading from "../loading.component"
import Navbar from "../navbar.component"
import Footer from "../footer"

import OpportunityItem from "../opportunity/item.opp"

class landingPage extends Component {
    constructor(props) {
        super(props);


        this.state = {
            isLoaded: false,
            sector_category: 1,
            opp_1: [],
            opp_2: [],
            opp_3: [],
            opp_4: [],
            search_query: ''
        };

    }

    componentDidMount() {

        axios.get('/api/opp/all/feature', {
            params: {
                type: 'sector',
                value: ["STEM"],
                verified: true,
                limit: 4
            }
        })
            .then(response => {
                var data = response.data

                this.setState({
                    opp_1: data
                })
                axios.get('/api/opp/all/feature', {
                    params: {
                        type: 'sector',
                        value: ["Business"],
                        verified: true,
                        limit: 4
                    }
                })
                    .then(response => {
                        var data = response.data

                        this.setState({
                            opp_2: data
                        })
                        axios.get('/api/opp/all/feature', {
                            params: {
                                type: 'sector',
                                value: ["Government"],
                                verified: true,
                                limit: 4
                            }
                        })
                            .then(response => {
                                var data = response.data

                                this.setState({
                                    opp_3: data
                                })

                                axios.get('/api/opp/all/feature', {
                                    params: {
                                        type: 'sector',
                                        value: ["Medical"],
                                        verified: true,
                                        limit: 4
                                    }
                                })
                                    .then(response => {
                                        var data = response.data

                                        this.setState({
                                            opp_4: data

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

    handleChange = (event) => {
        this.setState({search_query: event.target.value});
      }

    onChangeCategory = (index, event) => {
        console.log(index, event)
        if (this.state.sector_category != index) {
            this.setState({ sector_category: index })
        }
    }

    onSearch = (event) => {
        this.props.history.push(`/opportunities/${this.state.search_query}`)
    }


    render() {

        if (this.setState.isLoaded == false) {
            return (
                <Loading />
            )
        }

        else {


            if (this.state.sector_category == 1) {
                var popular_opp_options = <div className="landing-page-section-popular-opps-options-wrapper landing-pad">
                    <span className="landing-page-section-popular-opps-option active-opps-option" onClick={event => this.onChangeCategory(1, event)}>STEM</span>
                    <span className="landing-page-section-popular-opps-option" onClick={event => this.onChangeCategory(2, event)}>Business</span>
                    <span className="landing-page-section-popular-opps-option" onClick={event => this.onChangeCategory(3, event)}>Politics</span>
                    <span className="landing-page-section-popular-opps-option" onClick={event => this.onChangeCategory(4, event)}>Medical</span>
                </div>

                var opp_1 = this.state.opp_1.map((opp) => (
                    <div className="landing-pad"><div><OpportunityItem opp={opp} edit_mode={false} auth={this.state.user_id} /> </div> </div>
                ))
            }

            else if (this.state.sector_category == 2) {
                var popular_opp_options = <div className="landing-page-section-popular-opps-options-wrapper landing-pad">
                    <span className="landing-page-section-popular-opps-option" onClick={event => this.onChangeCategory(1, event)}>STEM</span>
                    <span className="landing-page-section-popular-opps-option active-opps-option" onClick={event => this.onChangeCategory(2, event)}>Business</span>
                    <span className="landing-page-section-popular-opps-option" onClick={event => this.onChangeCategory(3, event)}>Politics</span>
                    <span className="landing-page-section-popular-opps-option" onClick={event => this.onChangeCategory(4, event)}>Medical</span>
                </div>
                var opp_2 = this.state.opp_2.map((opp) => (
                    <div className="landing-pad"><div><OpportunityItem opp={opp} edit_mode={false} auth={this.state.user_id} /> </div> </div>
                ))
            }

            else if (this.state.sector_category == 3) {
                var popular_opp_options = <div className="landing-page-section-popular-opps-options-wrapper landing-pad">
                    <span className="landing-page-section-popular-opps-option" onClick={event => this.onChangeCategory(1, event)}>STEM</span>
                    <span className="landing-page-section-popular-opps-option" onClick={event => this.onChangeCategory(2, event)}>Business</span>
                    <span className="landing-page-section-popular-opps-option active-opps-option" onClick={event => this.onChangeCategory(3, event)}>Politics</span>
                    <span className="landing-page-section-popular-opps-option" onClick={event => this.onChangeCategory(4, event)}>Medical</span>
                </div>
                var opp_3 = this.state.opp_3.map((opp) => (
                    <div className="landing-pad"><div><OpportunityItem opp={opp} edit_mode={false} auth={this.state.user_id} /> </div> </div>
                ))
            }
            else if (this.state.sector_category == 4) {
                var popular_opp_options = <div className="landing-page-section-popular-opps-options-wrapper landing-pad">
                    <span className="landing-page-section-popular-opps-option" onClick={event => this.onChangeCategory(1, event)}>STEM</span>
                    <span className="landing-page-section-popular-opps-option" onClick={event => this.onChangeCategory(2, event)}>Business</span>
                    <span className="landing-page-section-popular-opps-option" onClick={event => this.onChangeCategory(3, event)}>Politics</span>
                    <span className="landing-page-section-popular-opps-option active-opps-option" onClick={event => this.onChangeCategory(4, event)}>Medical</span>
                </div>
                var opp_4 = this.state.opp_4.map((opp) => (
                    <div className="landing-pad"><div><OpportunityItem opp={opp} edit_mode={false} auth={this.state.user_id} /> </div> </div>
                ))
            }

            return (
                <div>
                    <Navbar />
                    <div className="landing-page-wrapper">
                        <section className="landing-page-hero-section">
                            <div className="landing-page-section-innerwrap">
                                <div className="landing-page-section-hero">
                                    <div>
                                        <h1 className="landing-page-section-hero-heading landing-pad">Discover Student Opportunities</h1>
                                        <div className="landing-page-section-hero-search-bar landing-pad">
                                            <div className="landing-page-section-hero-search-bar-inner">
                                                <input className="landing-page-section-hero-input" type="text" placeholder='Search opportunities' value={this.state.search_query} onChange={this.handleChange} onKeyPress={event => (event.key === 'Enter' && this.state.search_query != '') ? this.onSearch(event) : null} />
                                                <button onClick={event => this.onSearch(event)} className='searchButton'> <i class="fas fa-search"></i></button>
                                            </div>
                                        </div>
                                        <Link to="/opps" className="landing-page-section-hero-text landing-pad">View All Opportunities <i class="fas fa-chevron-right"></i></Link>
                                    </div>
                                    <div className="landing-page-section-hero-graphic-wrapper fade-in-one">
                         
                                            <div class="flag fade-in-one float-one">
                                                <img src={icon_flag}/>
                                            </div>
                                       
                                            <div class="icon-list icon fade-in-two float-two">
                                                <img src={icon_list}/>
                                            </div>
                                     
                                            <div class="briefcase icon fade-in-two float-two">
                                                <img src={icon_briefcase}/>
                                            </div>
                                       
                                            <div class="basketball icon fade-in-three float-three">
                                                <img src={icon_basketball}/>
                                            </div>
                                     
                             
                                            <div class="flask icon fade-in-two float-two">
                                                <img src={icon_flask}/>
                                            </div>
                                 

                                 
                                            <div class="location icon fade-in-three float-three">
                                                <img src={icon_location}/>
                                            </div>
                             

                                      
                                            <div class="pallete icon fade-in-three float-three">
                                                <img src={icon_palette}/>
                                            </div>
                                      

                                   
                                            <div class="people icon fade-in-two float-two">
                                                <img src={icon_people}/>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="landing-page-section section-featured-orgs">
                        <div className="landing-page-section-innerwrap"><h2 className="landing-page-section-feature-heading landing-pad">Hosting Opportunities from</h2>
                            <div className="landing-page-section section-featured-orgs-wrapper">
                                <img src={company_1} className="landing-pad featured-org"/>
                                <img src={company_2} className="landing-pad featured-org"/>
                                <img src={company_3} className="landing-pad featured-org"/>
                                <img src={company_4} className="landing-pad featured-org"/>
                            </div>
                            </div>
                        </section>


                        <section className="landing-page-section section-popular-opps">
                            <div className="landing-page-section-innerwrap">
                                <h5 className="landing-page-section-subheading landing-pad">Diverse Catalogue</h5>
                                <h2 className="landing-page-section-heading landing-pad">Explore Latest Opportunities</h2>
                                <div className="landing-page-section-para-wrapper-2x2">
                                    <p className="landing-page-section-para landing-pad">
                                        Stop wasting time search group chats and forums for outdated opportunities. Simply filter between the sector, location, position type and demographics to only find the opportunities you are looking for.
                                    </p>
                                    <p className="landing-page-section-para landing-pad">
                                    We host a large and diverse library of opportunities geared towards high-school students through an easy to navigate online platform. From the arts to human sciences, we work to ensure there is the perfect opportunity for you.
                                    </p>
                                </div>

                                <div className="landing-page-section-popular-opps-wrapper">
                                    {popular_opp_options}
                                    <div className="landing-page-section-popular-opps">{opp_1}{opp_2}{opp_3}{opp_4}</div>
                                </div>


                            </div>
                        </section>


                        <section className="landing-page-section section-interest-areas">
                            <div className="landing-page-section-innerwrap">
                                <h5 className="landing-page-section-subheading landing-pad">Something for Everyone</h5>
                                <h2 className="landing-page-section-heading landing-pad">Many Ways to get involved.</h2>
                                <div className="landing-page-section-para-wrapper-2x2">
                                    <div>
                                        <p className="landing-page-section-para landing-pad">
                                            At OppHub we provide the resources to explore opportunities that bring value to you. Whether you want to search it yourself, read a weekly newsletter, sit in on webinars, we’ve created the tools to get the information you need.
                                        </p>
                                        <br/>
                                        <br/>
                                        <div className="landing-page-involvement-item involvement-item-2 landing-mar">
                                            <a className="landing-page-involvement-item-innerwrap" href="/opps">
                                                <div>
                                                <div className="landing-page-involvement-item-subheading">Opps</div>
                                                <div className="landing-page-involvement-item-heading">Featured Opportunities</div>
                                                </div>
                                                <div className="landing-page-involvement-item-link"><span>See More <i class="fas fa-chevron-right"></i></span></div>
                                                <img src={opps} className="landing-page-involvement-item-img involvement-img-2"/>
                                            </a>
                                        </div>
                                        <br/>
                                        <br/>
                                        <div className="landing-page-involvement-item involvement-item-3 landing-mar">
                                            <a className="landing-page-involvement-item-innerwrap" href="/opptalks">
                                                <div>
                                                <div className="landing-page-involvement-item-subheading">OppTalks</div>
                                                <div className="landing-page-involvement-item-heading">Webinars for your post Secondary</div>
                                                </div>
                                                <div className="landing-page-involvement-item-link"><span>See More <i class="fas fa-chevron-right"></i></span></div>
                                                <img src={opptalks} className="landing-page-involvement-item-img involvement-img-3"/>
                                            </a>
                                        </div>

                                    </div>

                                    
                                    <div className="landing-page-section-para">
                                        <div className="landing-page-involvement-item involvement-item-1 landing-mar">
                                            <a className="landing-page-involvement-item-innerwrap" href="/opps">
                                                <div>
                                                <div className="landing-page-involvement-item-subheading">Sectors</div>
                                                <div className="landing-page-involvement-item-heading">Featured Sectors</div>
                                                </div>
                                                <div className="landing-page-involvement-item-link"><span>See More <i class="fas fa-chevron-right"></i></span></div>
                                                <img src={sectors} className="landing-page-involvement-item-img involvement-img-1"/>
                                            </a>
                                        </div>
                                        <br/>
                                        <br/>
                                        <div className="landing-page-involvement-item involvement-item-4 landing-mar">
                                            <a className="landing-page-involvement-item-innerwrap" href="https://opp-hub.us2.list-manage.com/subscribe?u=51912e90952edbf9efa4aca96&id=ab7769f924">
                                                <div>
                                                <div className="landing-page-involvement-item-subheading">Stay Up To Date</div>
                                                <div className="landing-page-involvement-item-heading">Weekly Newsletter</div>
                                                </div>
                                                <div className="landing-page-involvement-item-link"> <span>See More <i class="fas fa-chevron-right"></i></span></div>
                                                <img src={newsletter} className="landing-page-involvement-item-img involvement-img-4"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>

                        <section className="landing-page-section section-about-org">
                            <div className="landing-page-section-innerwrap landing-page-section-wrapper-2x2">
                                <div>
                                    <h5 className="landing-page-section-subheading landing-pad">For Students, By Students</h5>
                                    <h2 className="landing-page-section-heading landing-pad">Students Helping Students</h2>
                             
                                    <p className="landing-page-section-para landing-pad">
                                    As students ourselves we understand the constant struggles that come with finding opportunities. By creating OppHub we have developed a platform that serves as a one-stop-shop for the opportunities you once struggled to find. 
                                    </p>
                                </div>
                                <div className="landing-page-section-para landing-pad landing-center">
                                    <img src={sideimg} className="landing-page-section-side-img"/>
                                </div>
                            </div>
                        </section>

                        <section className="landing-page-section section-student-orgs">
                            <div className="landing-page-section-innerwrap">
                                <h5 className="landing-page-section-subheading landing-pad">For Student Organizations</h5>
                                <h2 className="landing-page-section-heading landing-pad">Upload Opportunities</h2>
                                <div className="landing-page-section-para-wrapper-2x2">
                                    <p className="landing-page-section-para landing-pad">
                                        Whether you’ve heard of an amazing opportunity and don’t see it on our website or an organization hoping to promote your own, we want in. Submit it directly to us and we’ll feature on our platform.
                                    </p>
                                    <div className="landing-page-section-para-wrapper-2x2">
                                    <div className="landing-page-section-feature-col">
                                            <h6 className="landing-page-section-feature-heading landing-pad"><i class="far fa-plus-square"></i> Add With Ease</h6>
                                            <p className="landing-page-section-para landing-pad">
                                            Our Ambassador Portal allows organizations to easily upload opportunities to our platform
                                            </p>
                                        </div>
                                        <div className="landing-page-section-feature-col">
                                            <h6 className="landing-page-section-feature-heading landing-pad"><i class="fas fa-bullhorn"></i> Expand Reach</h6>
                                            <p className="landing-page-section-para landing-pad">
                                            Our organization certification lets students know that the opportunity was posted from a reliable organization.
                                            </p>
                                        </div>
                                   </div>
                                </div>

                            </div>
                        </section>


                        <section className="landing-page-section section-call-to-action">
                            <div className="landing-page-section-innerwrap">
                                <h2 className="landing-page-section-heading landing-pad">Opportunities Await!</h2>
                                <div className="landing-page-section-para-wrapper-1x4">
     
                                    <a className="landing-page-section-button landing-mar" href="/opps">Opportunity Portal <i class="fas fa-chevron-right"></i></a>
                                    <a className="landing-page-section-button landing-mar" href="/suggest/opp">Add Opportunities <i class="fas fa-chevron-right"></i></a>
                                    <a className="landing-page-section-button landing-mar" href="https://opp-hub.us2.list-manage.com/subscribe?u=51912e90952edbf9efa4aca96&id=ab7769f924">Newsletter <i class="fas fa-chevron-right"></i></a>
                    
                                    <a className="landing-page-section-button landing-mar" href="/opptalks">OppTalks <i class="fas fa-chevron-right"></i></a>

                                        
                              
                                </div>


                            </div>
                        </section>
                    </div>
                    <Footer />
                </div>
            )
        }
    }
}


export default withRouter(landingPage)