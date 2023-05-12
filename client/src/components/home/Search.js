import React, { useState, useEffect, useContext } from 'react';

export default function Search({showSearchOptions, setShowSearchOptions, onSearch, searchText, setSearchText}) {
    return (
            <div className='search-bar-wrapper'>
                <div className='search-bar-inner-wrapper'>
                <div className='search-bar-search-icon'><i class="fas fa-search"></i></div>
                <input type='text' placeholder='Search Opportunities' onKeyPress={event => (event.key === 'Enter' && searchText != '') ? onSearch() : null} onChange={e => setSearchText(e.target.value)} />
                <button className='search-bar-filter-button' onClick={e=> setShowSearchOptions(!showSearchOptions)}><i class="fas fa-filter"></i></button>
                </div>
              
        </div>
    )
}
