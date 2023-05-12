import React from 'react'
import Types from '../Types'

const EventTypes = (props) => {
    
    const allEvents = [
        'Conference', 
        'Lectures', 
        'Seminar', 
        'Workshops', 
        'Other Event'
    ]

    return(
        <div>
            <h5 className='checkbox-header-title'>Events</h5>
            <div className='checkbox-input-grid-wrapper'>
                {allEvents.map((pos, key) => <Types category='Event' val={pos} key={key} updater={type => props.setTypeEventList(type)} typeList={props.typeEventList}/>)}
            </div>
        </div>
    )
}

export default EventTypes