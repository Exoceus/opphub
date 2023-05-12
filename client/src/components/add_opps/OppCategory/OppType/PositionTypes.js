import React from 'react'
import Types from '../Types'

const PositionTypes = (props) => {
    
    const allPositions = [
        'Internship - Unpaid', 
        'Internship - Paid', 
        'Leadership', 
        'Pre-College Program', 
        'Research', 
        'Summer Program', 
        'Volunteering', 
        'Other Position'
    ]

    return(
        <div>
            <h5 className='checkbox-header-title'>Position</h5>
            <div className='checkbox-input-grid-wrapper'>
                {allPositions.map((pos, key) => <Types category='Position' val={pos} key={key} updater={type => props.setTypePositionList(type)} typeList={props.typePositionList}/>)}
            </div> 
        </div>
    )
}

export default PositionTypes