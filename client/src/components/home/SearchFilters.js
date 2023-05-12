import React, { useState, useEffect, useContext } from 'react';

import CarretUp from '../../images/icons/CarretUp.svg'
import CarretDown from '../../images/icons/CarretDown.svg'

import SearchFilterInputWrapper from './SearchFilterInputWrapper'

export default function SearchFilters({showSearchOptions, setShowSearchOptions, onSearch, updateFilters,device}) {
    const [demographic, setDemographic] = useState([])
    const [location, setLocation] = useState([])
    const [type, setType] = useState([])
    const [sector, setSector] = useState([])

    var carret_up = <img src={CarretUp} className='filter-carrets'  />
    var carret_down = <img src={CarretDown} className='filter-carrets'  />

    const resetFilters = (e) => {
        setDemographic([])
        setLocation([])
        setType([])
        setSector([])
    }

    useEffect(() => {
        updateFilters({demographic, location, type, sector})
    }, [demographic, location,type,  sector]);


    if(showSearchOptions){
        return(
            <div className={(device === 'mobile') ? 'search-filters-outer-wrapper search-filters-wrapper-mobile'  : 'search-filters-outer-wrapper' } >
            <div className='search-filters-wrapper'>
                <div className='toggle-search-options' onClick={e=>{setShowSearchOptions(!showSearchOptions)}}>Filter Search <div>{(showSearchOptions) ? carret_up : carret_down}</div></div>

                {(showSearchOptions) ? 
                <div>
                    <button onClick={e => onSearch(e)} className='filter-search-reset-toggle filter-search-search-toggle'><i class="fas fa-search"></i> Search</button>


                    {(demographic.length > 0 || location.length > 0 || sector.length > 0 || type.length > 0) ? <button onClick={e => resetFilters(e)} className='filter-search-reset-toggle'><i class="fas fa-redo-alt"></i> Reset Filters</button> : null}
                    
                    <SearchFilterInputWrapper type='Demographic' value={demographic} setValue={setDemographic}/>
                    <SearchFilterInputWrapper type='Location' value={location} setValue={setLocation}/>
                    <SearchFilterInputWrapper type='Sector' value={sector} setValue={setSector}/>
                    <SearchFilterInputWrapper type='Type' value={type} setValue={setType}/>
                </div>
                : null}
            </div>
        </div>
        )
    }

    else{
        return (
            <div>
                <div className={(device === 'mobile') ? 'search-filters-wrapper search-filters-wrapper-mobile'  : 'search-filters-wrapper' } onClick={e=>{setShowSearchOptions(!showSearchOptions)}}>
                <div className='toggle-search-options' onClick={e=>{setShowSearchOptions(!showSearchOptions)}}>Filter Search <div>{(showSearchOptions) ? carret_up : carret_down}</div></div>

                </div>
            </div>
            
        )
    }
}
