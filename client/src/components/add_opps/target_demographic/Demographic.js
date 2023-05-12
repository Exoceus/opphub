import React from 'react'

const Demographic = (props) => {
    const updateList = (event) => {
        console.log('clicked')
   
        if(!checked_val){
            props.updater(r => [...r, props.val])
        }
        else if (checked_val){
            const placeHolder = props.demographic
            props.updater(placeHolder.filter(sector => sector !== props.val))
        }
    }

    if(props.demographic.includes(props.val)){
        var checked_val = true
    }

    else{
        var checked_val = false
    }

    return(
        <div className='add-opp-checkbox-container' onClick={updateList}>
            <input className='add-opp-checkbox-input' type='checkbox' checked={checked_val} />
            <span class="add-opp-checkbox-checkmark"></span>
            {props.val}
        </div>
    )
}

export default Demographic