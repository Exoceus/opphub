import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Route, withRouter } from 'react-router-dom';
import Logo from "../images/logo.svg"

import {AuthContext} from '../auth'

function Navbar() {
  const [hamState, changeHam] = useState(-1);


  const toogleNav = (event) => {
    event.preventDefault()

    changeHam(hamState * -1)

  }

  const reClose = () => {
    changeHam(hamState * -1)
  };

  useEffect(() => {
    window.addEventListener('resize', reClose);

    return (window.removeEventListener('resize', reClose))

  }, []);

  const contextData = useContext(AuthContext)

    if(contextData && contextData.currentUser && contextData.platformUser && contextData.platformUser._id){
      var profile_link = <button style={{color: 'var(--accent)'}}><a href={`/user/${contextData.platformUser._id}`}>Your Profile</a></button>
    }

    else if(contextData && contextData.currentUser && contextData.platformUser && contextData.platformUser.type === 'Ambassador'){
      var profile_link = <button style={{color: 'var(--accent)'}}><a href="ambassador/dashboard">Ambassador</a></button>
    }

    else{
      var profile_link = <button style={{color: 'var(--accent)'}}><a href="/login/user">Login</a></button>
    }


  var mobile_dropdown = <div className="dropElement-mobile" id="mobile-dropdown">
    <button onClick={e => toogleNav(e)}className="close" id="close">✖</button>

    <li className="navElements-mobile-viewOpp">
      <button className="viewOpp button"><a href="/opps">Discover Opportunities</a></button>
    </li>
          <div className="mobile-catagories">
          
            <div className="nav-mobile-dropdown about">
              <p className="nav-mobile-heading about">About</p>
              <div className="mobile-dropdown-options about">
                  <li className="mobil-Nav-options about one"><a href="/about">Company</a></li>
           
              </div>
            </div>
            <hr/>
            <div className="nav-mobile-dropdown community">
              <p className="nav-mobile-heading community">Community</p>
              
              <div className="mobile-dropdown-options community">
                
                <li className="mobil-Nav-options about one"><a href="https://opp-hub.us2.list-manage.com/subscribe?u=51912e90952edbf9efa4aca96&id=ab7769f924">Newsletter</a></li>
                <li className="mobil-Nav-options about two"><a href="/opptalks">OppTalks</a></li>
                <li className="mobil-Nav-options about three"><a href="/signup/ambassador">Ambassador Program</a></li>
              </div>
            </div>
            <hr/>
  
              <p className="nav-mobile-heading organizations">Organizations</p>
       
              
              <div className="mobile-dropdown-options organizations">
                
                <li className="mobil-Nav-options organizations one"><a href="/signup/org">Organizations Portal</a></li>

              </div>
            
          </div>
        </div>
  

  return (
    <div>
      <nav>
		<ul className="nav desktop">
			<div className="group-1">

        <li className="navElements opphub" style={{margin: "8px 0 0 0"}}>
          <button><a href="/"><img src={Logo} className="homeBtn"/></a></button>
        </li> 

        <div className="nav-dropdown-items">
        

          <li className="navElements about">
            <button>About <i class="fas fa-caret-down"></i></button>
            <div className="dropElements about">
              <ul>
                <li className="regItem"><a href="/about"><i class="far fa-building"></i> Company</a></li>
              </ul>
            </div>
          </li>
          
          <li className="navElements community">
            <button>Community <i class="fas fa-caret-down"></i></button>
            <div className="dropElements community">
              <ul>
              <li className="regItem"><a href="/suggest/opp"><i class="far fa-plus-square"></i> Post Opportunity</a></li>
           
              <li className="regItem"><a href="/signup/ambassador"><i class="far fa-flag"></i> Ambassador Program</a></li>
              <li className="regItem"><a href="https://opp-hub.us2.list-manage.com/subscribe?u=51912e90952edbf9efa4aca96&id=ab7769f924"><i class="far fa-newspaper"></i> Newsletter</a></li>
              <li className="regItem"><a href="/opptalks"><i class="fas fa-bullhorn"></i> OppTalks</a></li>
              </ul>
            </div>
          </li>

          <li className="navElements organizations">
            <button><a href="/signup/org">Organizations</a></button>
          </li>
        </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', paddingTop: 4}}>

        <li className="navElements viewOpp">
          <button><a href="/opps">Discover Opps</a></button>
        </li>
      </div>
      
      </ul>
      
      
      
      <div className="nav mobile">
        <li className="navElements-mobile opphub">
          <button><a href="/"><img src={Logo}className="homeBtn"/></a></button>
        </li> 
        <button onClick={e => toogleNav(e)}
        className="navElements-mobile hamburger-icon-button">
          <div className="menu-bar top"></div>
          <div className="menu-bar middle"></div>
          <div className="menu-bar buttom"></div> 
        </button>


        {(hamState === 1) ? mobile_dropdown : null}
      </div>

      
    </nav>
    </div>
  );
}

export default Navbar;