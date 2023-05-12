import React, { useState, useEffect, useContext } from 'react';

import SearchFilterInputItem from './SearchFilterInputItem'

export default function SearchFilterInputWrapper({value, setValue, type}) {
    const [viewAll, setViewAll] = useState(false)

    if(type === 'Demographic'){
        var all_values = [
            'Middle School',
            'High School',
            'Undergraduate',
            'Postgraduate',
            'Other'
        ]
    }

    else if(type === 'Location'){
        var all_values = [
            'Global',
            'Canada',
            'USA',
            'India',
            'Hong Kong',
            'United Kingdom',
            'North America',
            'Europe', 
            'Asia',
            'Australia',
            'Africa',
            'South America'
        ]
    }

    else if(type === 'Sector'){
        var all_values = [
            'Academic',
            'Arts',
            'Business',
            'Education',
            'Engineering',
            'Entrepreneurship',
            'Government',
            'Journalism',
            'Law',
            'Math',
            'Media',
            'Medical',
            'Mental Health',
            'Science',
            'Social',
            'Sports',
            'STEM',
            'Technology',
            'Other'
        ]
    }

    else if(type === 'Type'){
        var all_values = 
            [
                'Internship - Unpaid', 
                'Internship - Paid', 
                'Leadership', 
                'Pre-College Program', 
                'Research', 
                'Summer Program', 
                'Volunteering', 
                'Other Position',
                'Conference', 
                'Lectures', 
                'Seminar', 
                'Workshops', 
                'Other Event',
                'Hackathon', 
                'Case Study', 
                'Academic Competition', 
                'Other Contest',
                'Academic Scholarship', 
                'Community Service Scholarship', 
                'Athletic Scholarship', 
                'Other Scholarship',
                'Other'
            ]
        
    }

    if(viewAll){
        var filter_items = 
        all_values.map((val, key) =>
        <SearchFilterInputItem key={key} currentItem={val} setValue={setValue} value={value}/>)
    }

    else{
        var filter_items = 
        all_values.slice(0,3).map((val, key) =>
        <SearchFilterInputItem key={key} currentItem={val} setValue={setValue} value={value}/>)
    }

    if(all_values){

        console.log()

        return (
            <div className='filter-search-section-wrapper'>
                <h6 className='filter-search-section-header'>{type} {value.length > 0 ? `(${value.length})` : null}</h6>
                <div className='filter-search-item-wrapper'>
                    
                {filter_items}   
                </div>
                {(!viewAll && all_values.length > 3) ? 
                <button onClick={e => setViewAll(true)} className='filter-search-item-toggle'>More (+{all_values.length-3})</button> : null}
                 {(viewAll && all_values.length > 3) ? 
                <button onClick={e => setViewAll(false)} className='filter-search-item-toggle'>View Less</button> : null}
            </div>
        )
    }

    else{
        return null;
    }

}