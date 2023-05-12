import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../navbar.component'
import Footer from '../footer'
import Loading from '../loading.component'
import OpportunityItem from '../opportunity/item.opp'
import TestimonialItem from '../testimonial/TestimonialItem'

import {AuthContext} from '../../auth'

export default function UserProfilePage({match}) {

    const [user, setUser] = useState(null)
    const [isLoaded, setLoaded] =  useState(false)
    const [bookmarkedOpps, setBookmarkedOpps] = useState([])
    const [expanded, setExpanded] =  useState(false)
    const [reviewData, setReviewData] = useState([])

    useEffect(() => {
        axios.get('/api/user/'+match.params.id)
            .then(response => {
                var data = response.data
                setUser(response.data)

                axios.get('/api/review/user', {
                    params: {
                        userID: match.params.id
                    }
                })
                    .then(response => {
                        var data = response.data
                        setReviewData(data)
                        setLoaded(true)
                    })

                    .catch((error) => {
                        console.log(error);
                    })

  

            })

            .catch((error) => {
                console.log(error);
            })
    }, []);

    
    useEffect(() => {
        if(user){
            var fetchStarOpps = (opp_id) => {
                axios.get('/api/opp/' + opp_id)
                    .then(response => {
                        var random_array = response.data[0]
                        
                        setBookmarkedOpps(oldArray => [...oldArray, random_array]);
                    })
            }

            var starred_opps = user.starred_opps.map(async (opp_id) => (
                await fetchStarOpps(opp_id)
            ))
        }
    }, [user]);


    const formatDate = (string) => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    const contextData = useContext(AuthContext)

    if(user && contextData && contextData.currentUser && contextData.currentUser.uid === user.UID){
        var edit_profile_button = <Link className='edit-profile-button' to={`/edit/user/${user._id}`}><i className="far fa-edit"></i> Edit Profile</Link>
    }



    if(isLoaded){
        if(bookmarkedOpps.length > 0){   
            if(expanded){
                var bookmarked_opps = bookmarkedOpps.map((opp) => (
                    <div><OpportunityItem opp={opp} edit_mode={false} list_layout={"block"} /> </div>
                ))
            }

            else{
                var bookmarked_opps = bookmarkedOpps.slice(0,4).map((opp) => (
                    <div><OpportunityItem opp={opp} edit_mode={false} list_layout={"block"} /> </div>
                ))
            }  
        } 

        if(reviewData){
            var review_list = reviewData.map((review) => (
                < TestimonialItem testimonial={review} type='opp'/>
            ))
        }
    
        console.log(reviewData)

        var bgstyle = { backgroundImage: `url(${user.profile_img})` }

        return (
            <div>
                <Navbar />
                <div className='profile-page-wrapper'>
                    <header className='profile-header-wrapper' style={{ backgroundImage: `url(https://opphubhostimages.s3.us-east-2.amazonaws.com/Banner_3_Desktop.png)` }}>
                        <div className='profile-header-card-wrapper'>
                           
                            <div className='user-profile-img-wrapper'><div className='img-wrapper' style={bgstyle}></div></div>
                            <h2 className='profile-name-title'>{user.name}</h2>
                            <h6 className='profile-tagline'>{user.tagline}</h6>
                       
                            <div className='user-profile-social-wrapper'>
                                {(user.website) ? <a href={user.website} className='user-profile-social-item'><i class="fas fa-link"></i></a> : null}
                                {(user.linkedin) ? <a href={'https://www.linkedin.com/in/'+user.linkedin} className='user-profile-social-item'><i class="fab fa-linkedin-in"></i></a> : null}
                                {(user.instagram) ? <a href={'https://www.instagram.com/'+user.instagram} className='user-profile-social-item'><i class="fab fa-instagram"></i></a> : null}
                                {(user.twitter) ? <a href={'https://www.twitter.com/'+user.twitter} className='user-profile-social-item'><i class="fab fa-twitter"></i></a> : null}
                                
                                
                            </div>
                            <div className='profile-tertiary'>Member Since {formatDate(user.createdAt)}</div>
                            {edit_profile_button}
                        </div>
                    </header>
                    <section className='profile-page-section'>
                        <h4 className='profile-page-section-title'>About</h4>
                        <p className='profile-page-section-para'>
                        {(user.bio) ? user.bio : `${user.name}'s profile page.`}    

                        </p>
                        
                    </section>
                    <section className='profile-page-section'>
                        <h4 className='profile-page-section-title'>Bookmarks</h4>

                        {(bookmarked_opps)? <div className='list-opp-wrapper-col'>{bookmarked_opps}</div> : `${user.name} has no bookmarked opportunities.`}
                        <div className='content-center'>

                        {(bookmarkedOpps.length > 4 && !expanded) ? <button className='user-profile-expand-button' onClick={e => setExpanded(!expanded)}>View All <i class="fas fa-chevron-down"></i></button> : null}
                        {(bookmarkedOpps.length > 4 && expanded) ? <button className='user-profile-expand-button' onClick={e => setExpanded(!expanded)}>Collapse <i class="fas fa-chevron-up"></i></button> : null}
                        </div>
                    
                    </section>
                    <section className='profile-page-section'>
                        <h4 className='profile-page-section-title'>Reviews</h4>
                        {reviewData ? review_list : `${user.name} has not reviewed any opportunities.`}
                  
                        <div></div>
                    </section>
                </div>
                <Footer />
            </div>
        )

    }

    else{
        return(
            <Loading />
        )
    }
    
}
