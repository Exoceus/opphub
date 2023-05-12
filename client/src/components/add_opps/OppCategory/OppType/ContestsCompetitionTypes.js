import React from 'react'
import Types from '../Types'

const ContestsCompetitionTypes = (props) => {

    const allContests = [
        'Hackathon', 
        'Case Study', 
        'Academic Competition', 
        'Other Contest'
    ]

    return(
        <div>
            <h5 className='checkbox-header-title'>Contests/Competitions</h5>
            <div className='checkbox-input-grid-wrapper'>
                {allContests.map((pos, key) => <Types category='Contests/Competition' val={pos} key={key} updater={type => props.setTypeContestList(type)} typeList={props.typeContestList}/>)}
            </div>
        </div>
    )
}

export default ContestsCompetitionTypes