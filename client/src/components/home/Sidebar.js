import React from 'react'
import { Link } from 'react-router-dom';

export default function Sidebar({tab , type}) {

    if(type === 'mobile'){
        return (
            <div className='home-sidebar-inner-wrapper mobile-home-sidebar'>
                <Link className={(tab === 'featured') ? 'home-sidebar-item home-sidebar-item-active' : 'home-sidebar-item'} to='/opps?tab=featured'><div className='home-sidebar-item-icon'><i class="fas fa-star"></i></div><div className='home-sidebar-item-text'>Featured</div> </Link>
                <Link className={(tab === 'latest') ? 'home-sidebar-item home-sidebar-item-active' : 'home-sidebar-item'} to='/opps?tab=latest'><div className='home-sidebar-item-icon'><i class="fas fa-list"></i></div><div className='home-sidebar-item-text'> All</div> </Link>
                <Link className={(tab === 'search') ? 'home-sidebar-item home-sidebar-item-active' : 'home-sidebar-item'} to='/opps?tab=search'><div className='home-sidebar-item-icon'><i class="fas fa-search"></i></div><div className='home-sidebar-item-text'>Search</div> </Link>
                <Link className={(tab === 'bookmarks') ? 'home-sidebar-item home-sidebar-item-active' : 'home-sidebar-item'} to='/opps?tab=bookmarks'><div className='home-sidebar-item-icon'><i class="fas fa-bookmark"></i></div><div className='home-sidebar-item-text'>Bookmarks</div> </Link>
                <Link className={(tab === 'account') ? 'home-sidebar-item home-sidebar-item-active' : 'home-sidebar-item'} to='/opps?tab=account'><div className='home-sidebar-item-icon'><i class="fas fa-user-circle"></i></div><div className='home-sidebar-item-text'>Account</div> </Link>
            </div>
        )
    }

    else{
        return (
            <div className='home-sidebar-inner-wrapper'>
                <Link className={(tab === 'featured') ? 'home-sidebar-item home-sidebar-item-active' : 'home-sidebar-item'} to='/opps?tab=featured'><div className='home-sidebar-item-icon'><i class="fas fa-star"></i></div><div className='home-sidebar-item-text'>Featured</div> </Link>
                <Link className={(tab === 'latest') ? 'home-sidebar-item home-sidebar-item-active' : 'home-sidebar-item'} to='/opps?tab=latest'><div className='home-sidebar-item-icon'><i class="fas fa-list"></i></div><div className='home-sidebar-item-text'> All</div> </Link>
                <Link className={(tab === 'search') ? 'home-sidebar-item home-sidebar-item-active' : 'home-sidebar-item'} to='/opps?tab=search'><div className='home-sidebar-item-icon'><i class="fas fa-search"></i></div><div className='home-sidebar-item-text'>Search</div> </Link>
                <Link className={(tab === 'bookmarks') ? 'home-sidebar-item home-sidebar-item-active' : 'home-sidebar-item'} to='/opps?tab=bookmarks'><div className='home-sidebar-item-icon'><i class="fas fa-bookmark"></i></div><div className='home-sidebar-item-text'>Bookmarks</div> </Link>
                <Link className={(tab === 'account') ? 'home-sidebar-item home-sidebar-account home-sidebar-item-active' : 'home-sidebar-item home-sidebar-account'} to='/opps?tab=account'><div className='home-sidebar-item-icon'><i class="fas fa-user-circle"></i></div><div className='home-sidebar-item-text'>Account</div> </Link>
            </div>
        )
    }
}
