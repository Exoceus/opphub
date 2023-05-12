import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import FilledStar from '../../images/filled_star.svg'
import UnfilledStar from '../../images/unfilled_star.svg'

export default function TestimonialForm({onSubmitReview}) {

    const [affiliation, setAffiliation] = useState('')
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')


    var filled_star = <img className='testimonial-star-icon' src={FilledStar} />

    var unfilled_star = <img className='testimonial-star-icon' src={UnfilledStar} />

    var star_selector = <div className='testimonial-star-selector-wrapper'>
        <div className='testimonial-star-item' onClick={e => setRating(1)} key={1}>{rating >= 1 ? filled_star : unfilled_star}</div>
        <div className='testimonial-star-item' onClick={e => setRating(2)} key={2}>{rating >= 2 ? filled_star : unfilled_star}</div>
        <div className='testimonial-star-item' onClick={e => setRating(3)} key={3}>{rating >= 3 ? filled_star : unfilled_star}</div>
        <div className='testimonial-star-item' onClick={e => setRating(4)} key={4}>{rating >= 4 ? filled_star : unfilled_star}</div>
        <div className='testimonial-star-item' onClick={e => setRating(5)} key={5}>{rating >= 5 ? filled_star : unfilled_star}</div>

    </div>

    const SubmitReview = () =>{
        onSubmitReview(rating, affiliation, review)
    }

    return (
        <div>
            <div className='testimonial-form-wrapper'>
                <div className='grid-3-1'>
                    <div className="form-group">
                        <label className="input-title">Choose Rating (1-5)</label>
                        {star_selector}
                    </div>
                    <div className="form-group"><label className="input-title">Add affiliation</label><input type='text'  className="form-control" placeholder='What was your affiliation?' value={affiliation} onChange={e => setAffiliation(e.target.value)} /> </div>
                </div>
                
                <div className="form-group"><label className="input-title">Describe Your Experience</label><textarea  className="form-control" placeholder='Please write your review (max. 200 words)' value={review} onChange={e => setReview(e.target.value)} style={{"borderRadius": "0.5rem", "border": "2px solid var(--accent)", "backgroundColor": "#fff"}} rows="4" /> </div>
                
                <div className="form-group">
                            <div className='button-wrapper'>
                                <button className='submit-button review-submit-button' onClick={e => SubmitReview(e)}><i className="fas fa-plus"></i> Add Review</button>
                            </div>
                    </div>

            </div>
        </div>
    )
}
