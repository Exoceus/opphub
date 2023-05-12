import React from 'react'
import { Link } from 'react-router-dom';

import Navbar from "../navbar.component"

import Footer from "../footer"

function MegaList() {
    return (
        <div>
            <Navbar />
            <div className="opp-list">
                <Link to="/opportunities" className="section-more-link"><i class="fas fa-chevron-left"></i>  Home Page</Link>

            <section  className='mega-list-section'>
                <h4 className="mega-list-heading"><i className="fas fa-briefcase"></i> Sectors</h4>
                <div className="mega-list-wrapper">
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Academic">Academic</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Arts">Arts/Design</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Business">Business</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Education">Education</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Engineering">Engineering</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Entrepreneurship">Entrepreneurship</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Government">Government (Politics)</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Journalism">Journalism</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Law">Law</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Media">Media</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Medical">Medical</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Mental Health">Mental Health</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Science">Science</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Social">Social/Civic</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Sports">Sports</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/STEM">STEM</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Technology">Technology</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/sector/Other">Other</Link>
                </div>
            </section>

            <section className='mega-list-section'>
                <h4 className="mega-list-heading"><i className="fas fa-user-friends"></i> OppTypes</h4>
                <h4 className="mega-list-subheading">Positions</h4>
                <div className="mega-list-wrapper">
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Internship - Paid">Internship - Paid</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Internship - Unpaid">Internship - Unpaid</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Leadership">Leadership</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Pre-College Program">Pre-College Program</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Research">Research</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Summer Program">Summer Program</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Volunteering">Volunteering</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Other Position">Other Position</Link>

                </div>
                <h4 className="mega-list-subheading">Competitions</h4>
                <div className="mega-list-wrapper">
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Hackathon">Hackathon</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Case Study">Case Study</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Academic Competition">Academic Competition</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Other Competition">Other Competition</Link>
            </div>
            <h4 className="mega-list-subheading">Events</h4>
                <div className="mega-list-wrapper">
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Conference">Conference</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Lectures">Lectures</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Seminar">Webinar/Seminar</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Workshops">Workshops</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Other Event">Other Event</Link>

                </div>
                <h4 className="mega-list-subheading">Scholarships</h4>
                <div className="mega-list-wrapper">
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Academic Scholarship">Academic Scholarship</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Community Service Scholarships">Community Service Scholarships</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Athletic Scholarship">Athletic Scholarship</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/position_type/Other Scholarship">Other Scholarship</Link>
                    
                </div>
            </section>

            <section className='mega-list-section'>
                <h4 className="mega-list-heading"><i className="fas fa-map-marker-alt"></i> Location</h4>
                <h4 className="mega-list-subheading">Global</h4>
                <div className="mega-list-wrapper">
                    <Link className="mega-list-item" to="/opportunities/featured/region/Global">International/Global</Link>
                  
                </div>
                <h4 className="mega-list-subheading">Popular Countries</h4>
                <div className="mega-list-wrapper">
                    <Link className="mega-list-item" to="/opportunities/featured/region/Canada">Canada</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/region/USA">USA</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/region/India">India</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/region/Hong Kong">Hong Kong</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/region/United Kingdom">United Kingdom</Link>
                </div>
                <h4 className="mega-list-subheading">Continents</h4>
                <div className="mega-list-wrapper">
                    <Link className="mega-list-item" to="/opportunities/featured/region/North America">North America</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/region/Europe">Europe</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/region/Asia">Asia</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/region/Australia">Australia</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/region/Africa">Africa</Link>
                    <Link className="mega-list-item" to="/opportunities/featured/region/South America">Africa</Link>
                </div>
            </section>

            </div >
            <Footer/>
        </div>
    )
}

export default MegaList