import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import FilledStar from '../../images/filled_star.svg'
import UnfilledStar from '../../images/unfilled_star.svg'


export default function TestimonialItem({testimonial, current_user, type}) {

    const [loaded, setLoaded] = useState(false)
    const [user, setUser] = useState(null)
    const [opp, setOpp] = useState(null)


    useEffect(() => {
        if(type === 'user'){
            axios.get('/api/user/' + testimonial.userID)
            .then(response => {
             setUser(response.data)
             setLoaded(true)
            })
    
            .catch((error) => {
                console.log(error);
            })
        }

        else if(type === 'opp'){
         
            axios.get('/api/opp/' + testimonial.oppID)
            .then(response => {
                setOpp(response.data[0])
                setLoaded(true)
            })
    
            .catch((error) => {
                console.log(error);
            })
        }
    }, []);


    var filled_star = <img className='testimonial-star-icon-display' src={FilledStar} />

    var unfilled_star = <img className='testimonial-star-icon-display' src={UnfilledStar} />

    var star_selector = <div className='testimonial-star-selector-wrapper'>
        <div className='testimonial-star-item-display' key={1}>{testimonial.rating >= 1 ? filled_star : unfilled_star}</div>
        <div className='testimonial-star-item-display' key={2}>{testimonial.rating >= 2 ? filled_star : unfilled_star}</div>
        <div className='testimonial-star-item-display' key={3}>{testimonial.rating >= 3 ? filled_star : unfilled_star}</div>
        <div className='testimonial-star-item-display' key={4}>{testimonial.rating >= 4 ? filled_star : unfilled_star}</div>
        <div className='testimonial-star-item-display' key={5}>{testimonial.rating >= 5 ? filled_star : unfilled_star}</div>
    </div>

    console.log(opp)


    const deleteReview = () => {
        console.log('yeet')
        axios.delete('/api/review/987654321/'+testimonial._id)
                .then(response => {
                    console.log(response.data)
                    window.location.reload();
                })

                .catch((error) => {
                    console.log(error);
                })
    }

    if(loaded){

        if(user){
            return (
                <div className='testimonial-item'>
                   <div className='testimonial-header'>
                       <Link className='testimonial-profile-img-wrapper' to={`/user/${user._id}`}>
                      <div className='img-wrapper' style={ { backgroundImage: `url(${user.profile_img})` }}></div>
                       </Link>
                        <div className={(current_user === testimonial.userID) ? 'testimonial-header-info-del' : 'testimonial-header-info'}>
                            <div><Link to={`/user/${user._id}`}><h3 className='testimonial-username'>{user.name}</h3></Link>
                            <h6 className='testimonial-affiliation'>{testimonial.affiliation}</h6>
                            {star_selector}</div>
                            {(current_user === testimonial.userID) ? <div><button className='delete-review-icon' onClick={e => deleteReview(e)}><i class="far fa-trash-alt"></i></button></div> : null}
                            
                        </div>
                   </div>
                   <div className='testimonial-review'>
                    {testimonial.review_text}
                   </div>
                </div>
        
            )   
        }

        else if(opp){
            return (
                <div className='testimonial-item'>
                  <div className='testimonial-header'>
                       <Link className='testimonial-profile-img-wrapper' to={`/opp/${opp._id}`}>
                      <div className='img-wrapper' style={ { backgroundImage: `url(${opp.opp_img})` }}></div>
                       </Link>
                        <div className={(current_user) ? 'testimonial-header-info-del' : 'testimonial-header-info'}>
                            <div><Link to={`/opp/${opp._id}`}><h3 className='testimonial-username'>{opp.title}</h3></Link>
                            <h6 className='testimonial-affiliation'>{testimonial.affiliation}</h6>
                            {star_selector}</div>
                            
                            
                        </div>
                   </div>
                   <div className='testimonial-review'>
                    {testimonial.review_text}
                   </div>
                </div>
            )   
        }

        
        
    }

    else{
        return(<div>Loading</div>)
    }
}
