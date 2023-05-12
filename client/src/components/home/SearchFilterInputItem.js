import React from 'react'

export default function SearchFilterInputItem({value, setValue, currentItem}) {
    const updateList = (event) => {
        console.log('clicked')
   
        if(!checked_val){
            setValue(r => [...r, currentItem])
        }
        else if (checked_val){
            setValue(value.filter(item => item !== currentItem))
        }
    }

    if(value.includes(currentItem)){
        var checked_val = true
    }

    else{
        var checked_val = false
    }

    return(
        <div className='filter-item-checkbox-container' onClick={updateList}>
            <input className='filter-item-checkbox-input' type='checkbox' checked={checked_val} />
            <span class="filter-item-checkbox-checkmark"></span>
            <span>{currentItem}</span>
        </div>
    )
}
