import React from 'react'
import './Types.css'

const Types = (props) => {
    
    const updateList = (event) => {
        if(!checked_val){
            props.updater(r => [...r, props.val])
        }
        else if (checked_val){
            let placeHolder = props.typeList
            props.updater(placeHolder.filter(type => type !== props.val))
        }
    }

    if(props.typeList.includes(props.val)){
        var checked_val = true
    }

    else{
        var checked_val = false
    }


    return(
        <div className='add-opp-checkbox-container'  onClick={updateList}>
            <input className={`${props.category} add-opp-checkbox-input`} type='checkbox' checked={checked_val}/>
            <span class="add-opp-checkbox-checkmark"></span>
            {props.val}
        </div>
    )
}

export default Types