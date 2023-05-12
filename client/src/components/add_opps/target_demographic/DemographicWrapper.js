import React from 'react'

import Demographic from './Demographic'

const DemographicWrapper = (props) => {
    const allDemos = [
        'Middle School',
        'High School',
        'Undergraduate',
        'Postgraduate',
        'Other'
    ]

    return(
        <div className="form-group" >
            <div className='checkbox-input-grid-wrapper'>
            {allDemos.map((demo, key) =>
                <Demographic key={key} val={demo} updater={sector => props.setDemographic(sector)} demographic={props.demographic}/>)
                }   
            </div>
            
        </div>
    )
}

export default DemographicWrapper;