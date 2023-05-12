import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from "../loading.component"

import OpportunityItem from "../opportunity/item.opp"
import TestimonialForm from '../testimonial/TestimonialForm'
import TestimonialItem from '../testimonial/TestimonialItem'

import Navbar from "../navbar.component"
import Footer from "../footer"

import VerfiedCheckImg from "../../images/verified.svg"

import {AuthContext} from '../../auth'
export default class OpportunityPage extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props);

        this.starOpp = this.starOpp.bind(this);
        this.shareOpp = this.shareOpp.bind(this);
        this.unstarOpp = this.unstarOpp.bind(this);

        this.state = {
            opp: '',
            isLoaded: false,
            host_name: '',
            profile_pic: null,
            similar_position: null,
            similar_sector: null,
            UID: null,
            current_user: null,
            link_copied: false,
            bookmarked: false,
            reviews: null,
            addReview: false
        };
    }
    componentDidMount() {

        console.log(this.props.match.params)

        axios.get('/api/opp/' + this.props.match.params.id)
            .then(response => {
                var data = response.data
                this.setState({
                    opp: data,
                })
                console.log(this.state.opp[0].host_id)


                if (this.state.opp[0].host_id.length < 6) {
                    console.log('option 1')
                    this.setState({
                        host_name: 'Unknown Host',
                        isLoaded: true
                    })
                }

                else if (this.state.opp[0].host_id == 'unknown') {

                    this.setState({
                        host_name: 'Unknown Host',
                        profile_pic: this.state.opp[0].opp_img,
                        isLoaded: true
                    })

                    axios.get('/api/opp/all/filter', {
                        params: {
                            sector: this.state.opp[0].sector[0]
                        }
                    })
                        .then(response => {
                            var data = response.data
                            console.log(data)
                            this.setState({
                                similar_sector: data,
                            })

                            axios.get('/api/opp/all/filter', {
                                params: {
                                    position_type: this.state.opp[0].position_type[0]
                                }
                            })
                                .then(response => {
                                    var data = response.data
                                    this.setState({
                                        similar_position: data,
                                        isLoaded: true
                                    })

                                    console.log(this.state)
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
                    console.log('option 3')
                    axios.get('/api/org/opp/' + this.state.opp[0].host_id)
                        .then(response => {
                            var data = response.data
                            this.setState({
                                host_name: data.host_name,
                                profile_pic: data.profile_pic
                            })

                            axios.get('/api/opp/all/filter', {
                                params: {
                                    sector: this.state.opp[0].sector[0]
                                }
                            })
                                .then(response => {
                                    var data = response.data
                                    console.log(data)
                                    this.setState({
                                        similar_sector: data,
                                    })

                                    axios.get('/api/opp/all/filter', {
                                        params: {
                                            position_type: this.state.opp[0].position_type[0]
                                        }
                                    })
                                        .then(response => {
                                            var data = response.data
                                            this.setState({
                                                similar_position: data,
                                  
                                            })

                                        

                                            console.log(this.state)
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
            })

            .catch((error) => {
                console.log(error);
            })

            axios.get('/api/review/opp', {
                params: {
                    oppID: this.props.match.params.id
                }
            })
                .then(response => {
                    console.log(response.data)
                    this.setState({reviews: response.data, isLoaded: true})
                })

                .catch((error) => {
                    console.log(error);
                })
            
        

        if(this.context.currentUser){

            this.setState(
                {
                  isLoaded: false,
                  UID: this.context.currentUser.uid
                },
                () => {
                    axios.get('/api/user/UID/' + this.context.currentUser.uid)
                    .then(response => {
                        this.setState({current_user: response.data._id})

                        console.log(response.data.starred_opps)

                        if(response.data.starred_opps.includes( this.props.match.params.id)){
              
                            this.setState({bookmarked: true})
                        }

                        this.setState({isLoaded: true})
                    })
    
                    .catch((error) => {
                        console.log(error);
                    })
                }     
              );

        }

    }

    starOpp(e) {
        console.log('starred')

        axios.post('/api/user/new/opp', {
            opp_id: this.state.opp[0]._id,
            user_id: this.state.current_user
        })
            .then(response => {
                this.setState({
                    isLoaded: false
                }, () => {
                    axios.get('/api/user/UID/' + this.context.currentUser.uid)
                    .then(response => {
                        this.setState({current_user: response.data._id})

                        console.log(response.data.starred_opps)

                        if(response.data.starred_opps.includes(this.props.match.params.id)){
                    
                            this.setState({bookmarked: true})
                            this.setState({isLoaded: true})
                        }

                        else{
                            this.setState({bookmarked: false})
                            this.setState({isLoaded: true})
                        }
                        
                    })
    
                    .catch((error) => {
                        console.log(error);
                    })
                })
            })

            .catch((error) => {
                console.log(error);
            })

    }

    unstarOpp(e) {
        axios.post('/api/user/remove/opp', {
                        opp_id: this.state.opp[0]._id,
                        user_id: this.state.current_user
                    })
                    .then(response => {
                        this.setState({
                            isLoaded: false
                        }, () => {
                            axios.get('/api/user/UID/' + this.context.currentUser.uid)
                            .then(response => {
                                this.setState({current_user: response.data._id})
        
                                console.log(response.data.starred_opps)
        
                                if(response.data.starred_opps.includes(this.props.match.params.id)){
                             
                                    this.setState({bookmarked: true})
                                    this.setState({isLoaded: true})
                                }

                                else{
                                    this.setState({bookmarked: false})
                                    this.setState({isLoaded: true})
                                }
                            })
            
                            .catch((error) => {
                                console.log(error);
                            })
                        })
                    })
    }

    shareOpp(e) {
        console.log('Share')

        var copyText = "https://www.opp-hub.com/opp/" + this.state.opp[0]._id
        navigator.clipboard.writeText(copyText)
        
        this.setState({
            isLoaded: false
        }, () => {
            this.setState({
            link_copied: true,
            isLoaded: true
            })
        })
    }

    onSubmitReview = (rating, affiliation, review) => {

        const newTestimonial = {
            userID:  this.state.current_user,
            oppID: this.props.match.params.id,
            affiliation: affiliation,
            rating: rating,
            review_text: review
        }
        
        axios.post('/api/review/new', newTestimonial)
            .then(res => {
                console.log(res.data)
                window.location.reload();
            });

        console.log(rating, affiliation, review)
    }

    render() {
        var opp = this.state.opp[0]

        if (this.state.isLoaded == false || !opp) {
            return (
                <Loading />
            )
        }

        else {
            var unknowntext = <div></div>

            if (this.state.host_name == "Unknown Host") {
                var bgstyle = { backgroundImage: `url(${this.state.profile_pic})` }
            }

            else {
                var bgstyle = { backgroundImage: `url(${this.state.profile_pic})` }
            }

            var dateCreated = opp.createdAt

            if (dateCreated) {
                dateCreated = dateCreated.substring(0, 10)
                dateCreated = new Date(dateCreated)
                dateCreated = dateCreated.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' })
            }

            var due_date = dateCreated

            if (opp.due_date) {
                due_date = new Date(opp.due_date)
                due_date = due_date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' })
                var due_item = < span className="date-posted" > <i class="far fa-calendar-alt opp-icon"></i>{due_date}</span >
            }

            if (opp.updatedAt) {
                opp.updatedAt = opp.updatedAt.substring(0, 10)
                opp.updatedAt = new Date(opp.updatedAt)
                opp.updatedAt = opp.updatedAt.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' })
            }

            if (opp.application_link) {
                var apply_button = <button className='apply'><i class="fas fa-external-link-alt"></i>Learn More</button>
            }

            if (opp.duration == "") {
                opp.duration = "N/A"
            }

            if (this.state.similar_sector) {
                var sector_list = this.state.similar_sector.slice(0, 3).map((opp) => (
                    <div><OpportunityItem opp={opp} edit_mode={false} list_layout={"minimized"} suggested_id={this.state.opp[0]._id} /> </div>
                ))
            }

            if (this.state.similar_position) {
                var position_list = this.state.similar_position.slice(0, 3).map((opp) => (
                    <div><OpportunityItem opp={opp} edit_mode={false} list_layout={"minimized"} suggested_id={this.state.opp[0]._id} /> </div>
                ))
            }

            if (this.state.reviews) {
                var review_list = this.state.reviews.map((review) => (
                    < TestimonialItem testimonial={review} current_user={this.state.current_user} type='user'/>
                ))
            }

            if (opp.start_date) {
                var start_item = <div className="info-item"><span className="info-item-heading"><b>Start Date: </b></span>{opp.start_date}</div>
            }

            if (opp.end_date) {
                var end_item = <div className="info-item"><span className="info-item-heading"><b>End Date: </b></span>{opp.end_date}</div>
            }

            if (opp.poc) {
                var poc_item = <div className="info-item"><span className="info-item-heading"><b>Contact: </b></span>{opp.poc}</div>
            }

            if (opp.host_id == 'unknown') {
                var host_name = opp.temp_host_name
            }

            if (opp.verified || opp.ambassador_id || opp.host_id != "unknown") {
                var verified_check = <img className="opp-page-info-icons" src={VerfiedCheckImg} />
            }

            

            document.title = opp.title + " | OppHub"

            
            if (this.state.link_copied) {
                var share_button = <button className="share-button" onClick={this.shareOpp}><i class="far fa-check-circle"></i>  Link Copied!</button>
            }
            
            else {
                var share_button = <button className="share-button" onClick={this.shareOpp}><i class="far fa-share-square"></i>  Share Opportunity</button>
            }
            
      
            if(this.state.UID && !this.state.bookmarked){
                var bookmark_button = <button className="share-button" onClick={this.starOpp}><i class="far fa-bookmark"></i>  Bookmark Opportunity</button>

            }

            else if(this.state.UID  && this.state.bookmarked){
                var bookmark_button = <button className="share-button" onClick={this.unstarOpp}><i class="fas fa-bookmark"></i>  Remove Bookmark</button>
            }
            
            console.log(this.state.reviews)
            
            return (
                <div>
                    <Navbar />
                    <div className='page-wrapper'>

                        <div className='main-col'>
                            <Link to="/opps" className="section-more-link"><i class="fas fa-chevron-left"></i>  Home Page</Link>
                            <br />
                            <br />
                            <section className='opp-page-head-row'>
                                <div className='head-row-col'>
                                    <div className='img-wrapper' style={bgstyle}>{unknowntext}</div>
                                </div>
                                <div className='head-row-col'>
                                    <h3 className='opp-page-title'>{(opp.archived) ? "ARCHIVED: " : null}{opp.title} {verified_check}</h3>
                                    <div className='head-row-bottom-row'>
                                        <span className='opp-location'><i class="fas fa-map-marker-alt opp-icon"></i>{opp.location}</span>
                                        <span className="position-type"><i class="fas fa-user-friends opp-icon"></i>{opp.position_type.join(', ')}</span>
                                        <span className="position-type"><i class="fas fa-briefcase opp-icon"></i>{opp.sector.join(', ')}</span>
                                        {due_item}
                                                                               
                                    </div>
                                    
                                    {(this.state.UID) ? <div className='grid-2'> {bookmark_button}
                                    {share_button}</div> : share_button}
                                   
                                </div>
                            </section>
                          
                            <section className="opp-page-section info">
                                <h3 className="opp-page-section-headings">Details</h3>
                                <div className="opp-page-info-wrapper">
                                    <div className="info-item"><span className="info-item-heading"><b>Host Name: </b></span>{host_name}</div>
                                    <div className="info-item"><span className="info-item-heading"><b>Date Posted: </b></span>{dateCreated}</div>
                                    <div className="info-item"><span className="info-item-heading"><b>Duration: </b></span>{opp.duration}</div>
                                    <div className="info-item"><span className="info-item-heading"><b>Target Demographic: </b></span>{opp.target_demo.join(', ')}</div>
                                    {start_item}{end_item}{poc_item}
                                </div>
                            </section>
                            <section className="opp-page-section description">
                                <h3 className="opp-page-section-headings">Description</h3>
                                <p className="opp-page-description">{opp.description}</p>
                            </section>
                            <section className="opp-page-section links">
                                <h3 className="opp-page-section-headings">Links</h3>
                                <div className="opp-page-link-wrapper">
                                    <a className='learn-more opp-page-link' href={opp.learn_more}><i class="fas fa-external-link-alt"></i>  Learn More</a>
                                    {apply_button}
                                </div>
                            </section>

                            <section className="opp-page-section links">
                                <h3 className="opp-page-section-headings">Reviews</h3>
                                <div className="opp-page-link-wrapper">
                                    {(this.state.UID  && !this.state.addReview && this.state.reviews && !this.state.reviews.some(review => review.userID === this.state.current_user)) ? <button className='submit-button review-submit-button' onClick={e => this.setState({addReview: true})}><i className="fas fa-plus"></i> Add Review</button> : null}
                                    {(!this.state.UID) ?  <div>You need to create an account to add a review. <Link to='/signup/user' className='simple-link'>Sign Up</Link> or <Link to='/login/user' className='simple-link'>Login</Link>.</div> : null}

                                   
                                    {(this.state.addReview) ? <TestimonialForm onSubmitReview={this.onSubmitReview}/> : null}
                                    
                                    {review_list}
                                </div>
                            </section>
                        </div>
                        <div className='secondary-col'>
                            <h2 className="opp-page-section-headings">Similar Opportunities</h2>
                            <h4 className="opp-page-section-similar-heading">{opp.position_type[0]} Opps</h4>
                            <div className="opp-list-wrapper-compact">{position_list}</div>

                            <h4 className="opp-page-section-similar-heading">Opps in {opp.sector[0]}</h4>
                            <div className="opp-list-wrapper-compact">{sector_list}</div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }
    }
}


