import React from 'react'

import Sectors from './Sectors'

const SectorWrapper = (props) => {
    const allSectors = [
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

    return(
        <div className="form-group" >
            <div className='checkbox-input-grid-wrapper'>
            {allSectors.map((sect, key) =>
                <Sectors key={key} val={sect} updater={sector => props.setSectorList(sector)} sectorList={props.sectorList}/>)
                }   
            </div>
            
        </div>
    )
}

export default SectorWrapper;