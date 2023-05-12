import React, { Component } from 'react'

import JatinImg from "../../images/about_asset/team_headshots/jatin-headshot.png"
import BilalImg from "../../images/about_asset/team_headshots/bilal-headshot.png"
import CadenImg from "../../images/about_asset/team_headshots/caden-headshot.png"
import AidanImg from "../../images/about_asset/team_headshots/aidan-headshot.png"
import AdyImg from "../../images/about_asset/team_headshots/ady-headshot.png"
import BurhanImg from "../../images/about_asset/team_headshots/burhan-headshot.png"
import YashImg from "../../images/about_asset/team_headshots/yash-headshot.png"
import MarkImg from "../../images/about_asset/team_headshots/mark-headshot.png"
import EmadImg from "../../images/about_asset/team_headshots/emad-headshot.png"
import JoshImg from "../../images/about_asset/team_headshots/josh-headshot.png"

import Navbar from "../navbar.component"
import Footer from "../footer"

export default class aboutPage extends Component {
    render() {
        console.log('About page')
        return (
  
            <div>
                <Navbar />
           
                <div className="opphub-team-container">
                  <div className="opphub-team-wrapper about-page-spacing-setup">
                    <div className="about-page-header">The OppHub Team</div>

                    <div className="about-page-text">We are a diverse group high school students based in Ontario, Canada united under our goal of making opportunities of all kinds available to high school students.</div>  

                    <div className="about-page-text">Our current goal is to make OppHub an official non-for-profit in order to expand the platform and bring more opportunities to you!</div>
                  </div>
                </div>

                <div className="meet-the-team-container about-page-spacing-setup">
                  <div className="about-page-header">Meet The Team</div>

                  <div className="meet-the-team-member">
                    <div className="meet-the-team-image-wrapper">
                        <img src={JatinImg} alt="Jatin" />
                    </div> 

                    <div className="meet-the-team-text-wrapper">
                      <div className="meet-the-team-text-inner-wrapper">
                        <div className="meet-the-team-name">Jatin M.</div> 
                        <div className="meet-the-team-role">Founder</div> 
                      </div>
                    </div>
                  </div>

                  <div className="meet-the-team-member">
                    <div className="meet-the-team-image-wrapper">
                        <img src={AdyImg} alt="Ady" />
                    </div> 

                    <div className="meet-the-team-text-wrapper">
                      <div className="meet-the-team-text-inner-wrapper">
                        <div className="meet-the-team-name">Ady A.</div> 
                        <div className="meet-the-team-role">Web Developer</div>
                      </div> 
                    </div>
                  </div>

                  <div className="meet-the-team-member">
                    <div className="meet-the-team-image-wrapper">
                        <img src={CadenImg} alt="Caden" />
                    </div> 

                    <div className="meet-the-team-text-wrapper">
                      <div className="meet-the-team-text-inner-wrapper">
                        <div className="meet-the-team-name">Caden C.</div> 
                        <div className="meet-the-team-role">UX Designer</div> 
                      </div>
                    </div>
                  </div>

                  <div className="meet-the-team-member">
                    <div className="meet-the-team-image-wrapper">
                        <img src={EmadImg} alt="Emad" />
                    </div> 

                    <div className="meet-the-team-text-wrapper">
                      <div className="meet-the-team-text-inner-wrapper">
                        <div className="meet-the-team-name">Emad H.</div> 
                        <div className="meet-the-team-role">Web Developer</div> 
                      </div>
                    </div>
                  </div>

                  <div className="meet-the-team-member">
                    <div className="meet-the-team-image-wrapper">
                        <img src={YashImg} alt="Yash" />
                    </div> 

                    <div className="meet-the-team-text-wrapper">
                      <div className="meet-the-team-text-inner-wrapper">
                        <div className="meet-the-team-name">Yash J.</div> 
                        <div className="meet-the-team-role">Data Analyst</div>
                      </div>
                    </div>
                  </div>

                  <div className="meet-the-team-member">
                    <div className="meet-the-team-image-wrapper">
                        <img src={BilalImg} alt="Bilal" />
                    </div> 

                    <div className="meet-the-team-text-wrapper">
                      <div className="meet-the-team-text-inner-wrapper">
                        <div className="meet-the-team-name">Bilal N.</div> 
                        <div className="meet-the-team-role">Partnerships</div> 
                      </div>
                      </div>
                  </div>

                  <div className="meet-the-team-member">
                    <div className="meet-the-team-image-wrapper">
                        <img src={JoshImg} alt="Josh" />
                    </div> 

                    <div className="meet-the-team-text-wrapper">
                      <div className="meet-the-team-text-inner-wrapper">
                        <div className="meet-the-team-name">Josh L.</div> 
                        <div className="meet-the-team-role">Outreach Director</div> 
                      </div>
                    </div>
                  </div>

                  <div className="meet-the-team-member">
                    <div className="meet-the-team-image-wrapper">
                        <img src={AidanImg} alt="Aidan" />
                    </div> 

                    <div className="meet-the-team-text-wrapper">
                      <div className="meet-the-team-text-inner-wrapper">
                        <div className="meet-the-team-name">Aidan K.</div> 
                        <div className="meet-the-team-role">Journalist</div>
                      </div>
                    </div>
                  </div>

                  <div className="meet-the-team-member">
                    <div className="meet-the-team-image-wrapper">
                        <img src={BurhanImg} alt="Burhan" />
                    </div> 

                    <div className="meet-the-team-text-wrapper">
                      <div className="meet-the-team-text-inner-wrapper">
                        <div className="meet-the-team-name">Burhan K.</div> 
                        <div className="meet-the-team-role">Marketing Director</div> 
                      </div>    
                    </div>
                  </div>

                  <div className="meet-the-team-member">
                    <div className="meet-the-team-image-wrapper">
                        <img src={MarkImg} alt="Mark" />
                    </div> 

                    <div className="meet-the-team-text-wrapper">
                      <div className="meet-the-team-text-inner-wrapper">
                        <div className="meet-the-team-name">Mark S.</div> 
                        <div className="meet-the-team-role">Opportunities Director</div> 
                      </div>
                    </div>
                  </div>
                </div>

                  <div className="join-us-container">
                    <div className="join-us-wrapper about-page-spacing-setup">
                      <div className="join-us-header">Want to join?</div>

                      <div className="join-us-text">We are always looking for passionate people to help us achieve our mission.</div>

                      <a href="mailto:info@opp-hub.com" className="join-us-button">Apply Now</a>
                    </div> 
                  </div>
            
                <Footer />
            </div>
        )
    }
}
