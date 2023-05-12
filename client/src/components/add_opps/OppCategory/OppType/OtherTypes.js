import React from 'react'
import Types from '../Types'

const OtherTypes = (props) => {
    
    const allOthers = ['Other']
    return(
        <div>
            <h5 className='checkbox-header-title'>Other</h5>
            <div className='checkbox-input-grid-wrapper'>
                {allOthers.map((pos, key) => <Types category='Other' val={pos} key={key} updater={type => props.setTypeOtherList(type)} typeList={props.typeOtherList}/>)}
            </div>
        </div>
    )
}

export default OtherTypes