import React from 'react'
import Types from '../Types'

const ScholarshipTypes = (props) => {

    const allScholarships = [
        'Academic Scholarship', 
        'Community Service Scholarship', 
        'Athletic Scholarship', 
        'Other Scholarship'
    ]

    return(
        <div>
            <h5 className='checkbox-header-title'>Scholarships</h5>
            <div className='checkbox-input-grid-wrapper'>
                {allScholarships.map((pos, key) => <Types category='Scholarship' val={pos} key={key} updater={type => props.setTypeScholarshipList(type)} typeList={props.typeScholarshipList}/>)}
            </div>
        </div>
    )
}

export default ScholarshipTypes