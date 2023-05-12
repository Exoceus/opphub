import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


import Loading from "../loading.component"

import OpportunityItem from "../opportunity/item.opp"

import Navbar from "../navbar.component"
import Footer from "../footer"

import shaylonImg from "../../images/opptalks/shaylon.jpg"
import asmaImg from "../../images/opptalks/asma.jpg"
import freemanImg from "../../images/opptalks/freeman.jpg"
import shubhImg from "../../images/opptalks/shubh.jpg"
import donnyImg from "../../images/opptalks/donny.jpg"
import lakshyaImg from "../../images/opptalks/lakshya.jpg"

export default class OppTalks extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

        console.log(this.props.match.params)
    }


    render() {


        var unknowntext = <div></div>


        var bgstyle = { backgroundImage: `url(https://opphubhostimages.s3.amazonaws.com/OppTalks%20Image-1612316771052.jpg)` }





        document.title = "OppTalks"


        return (
            <div>
                <Navbar />
                <div className='opptalks-wrapper'>

                    <div>
                        <Link to="/opportunities" className="section-more-link"><i class="fas fa-chevron-left"></i>  Home Page</Link>
                        <br />
                        <br />
                        <section className='opp-page-head-row'>
                            <div className='head-row-col'>
                                <div className='img-wrapper' style={bgstyle}></div>
                            </div>
                            <div className='head-row-col'>
                                <h3 className='opp-page-title'>OppTalks</h3>
                                <div className='head-row-bottom-row'>
                                    <span className='opp-location'><i class="fas fa-map-marker-alt opp-icon"></i> Remote (Zoom)</span>
                                    <span className="position-type"><i class="fas fa-user-friends opp-icon"></i>High School</span>
                                    <span className="position-type"><i class="fas fa-briefcase opp-icon"></i> Business, Technology, Science, Medical, Mathematics </span>
                                    <span className="position-type"><i class="fas fa-calendar opp-icon"></i>February 15 to March 23.</span>
                                </div>
                            </div>
                        </section>
                   
                      
                        <h4 className="opptalks-page-heading">About OppTalks</h4>
                        <p className="opptalks-para">The transition from high school to post-secondary education can be a tough one for student as it is hard to know what to expect and what new opportunities you can take advantage of. The OppHub team is excited to introduce OppTalks, an online webinar series that aims to expose high school students to various impactful extra-curricular opportunities. These weekly webinars will last approximately 30 minutes. Each webinar will be about impactful opportunities they were/are apart of, how to hone networking and soft skills, as well as a Q/A session! Please sign up using the link at the bottom of the page and we will send you a link to the Zoom event 1 day prior to the event via email!</p>

                        <a class="learn-more opp-page-link" href="https://www.youtube.com/playlist?list=PLL2ZQCxvCiqudGIFbFJK05AwZZ-wLkwiZ"><i class="fab fa-youtube"></i> View All OppTalks Webinars</a>


                        <h4 className="opptalks-page-heading">Speaker Spotlight</h4>
                        <section className="opptalks-speaker-grid">
                            <div class="profile-card">
                                <img src={shaylonImg} alt="shaylon" class="profile-img" />
                                <h3 class="profile-name">Shaylon Godse</h3>
                                <h6 class="icon-role"><i class="fas fa-university opp-icon"></i><span>Business Administration @ Laurier University</span></h6>
                                <h6 class="icon-role"><i class="fas fa-calendar-alt opp-icon"></i><span>7pm - 7:30 PM EST February 15, 2021</span></h6>

                                <p className="profile-description">Shaylon is a first-year BBA student at the Lazaridis School of Business and Economics at Wilfrid Laurier University, looking to specialize in finance with a minor in economics. Shaylon is actively involved within clubs at Laurier as a part of the Laurier Finance and Investment Association, the Laurier Venture Capital Club, and the Laurier Consulting Club. In his spare time, Shaylon enjoys biking, playing basketball, watching NBA games, and travelling to different countries.</p>

                                <a class="learn-more opp-page-link" href="https://youtu.be/vfDh1atAouY"><i class="fab fa-youtube"></i> View Shaylon's Talk</a>
                            </div>

                            <div class="profile-card">
                                <img src={asmaImg} alt="Asma" class="profile-img" />
                                <h3 class="profile-name">Asma Khamis</h3>
                                <h6 class="icon-role"><i class="fas fa-university opp-icon"></i><span>Bio Chemistry @ McGill University</span></h6>
                                <h6 class="icon-role"><i class="fas fa-calendar-alt opp-icon"></i> <span>7pm - 7:30 PM EST, February 22, 2021</span></h6>
                                <p className="profile-description">Asma Khamis is a first year Biochemistry student at McGill University. Originally from the GTA , she completed the IB program in high school and is currently involved in First-Year Science Council, McGill’s Student Research Initiative, and national youth nonprofit PuMP. In her free time, she enjoys reading, playing the trumpet, and cooking.</p>
                                <a class="learn-more opp-page-link" href="https://youtu.be/9I5EKgIrKqA"><i class="fab fa-youtube"></i> View Asma's Talk</a>
                            </div>

                            <div class="profile-card">
                                <img src={freemanImg} alt="Freeman" class="profile-img" />
                                <h3 class="profile-name">Freeman Cheng</h3>
                                <h6 class="icon-role"><i class="fas fa-university opp-icon"></i><span>Computer Science @ University of Toronto</span></h6>
                                <h6 class="icon-role"><i class="fas fa-calendar-alt opp-icon"></i> <span>7pm - 7:30 PM EST, March 1, 2021</span></h6>
                                <p className="profile-description">Freeman Cheng is a first year computer science student at UTSG. Last year, Freeman completed the IB program and qualified for the Canadian Math Olympiad. Currently, he is working towards his long-term goal of going to graduate school. In his free time, he enjoys reading, playing video games, and watching anime.</p>
                                <a class="learn-more opp-page-link" href="https://youtu.be/NNh1nrT8SeI"><i class="fab fa-youtube"></i> View Freeman's Talk</a>
                            </div>

                            
                            <div class="profile-card">
                                 <img src={shubhImg} alt="Shubh" class="profile-img" />
                                <h3 class="profile-name">Shubh Parekh</h3>
                                <h6 class="icon-role"><i class="fas fa-university opp-icon"></i><span>Kinesiology @ Western University</span></h6>
                                <h6 class="icon-role"><i class="fas fa-calendar-alt opp-icon"></i> <span>7pm - 7:30 PM EST, March 8, 2021</span></h6>
                                <p className="profile-description">Hey guys! My name is Shubh Parekh and I'm a first year Kinesology student at Western University. I completed the IB program last year in highschool and am currently involved in a student research group, exploring the origin and spread of the Coronavirus. When I get the time, I usually like to watch random netflix shows or call my friends, and love to play basketball or volleyball! I look forward to seeing all of you March 8th.</p>
                                <a class="learn-more opp-page-link" href="https://youtu.be/w08fZmotBYQ"><i class="fab fa-youtube"></i> View Shubh's Talk</a>
                            </div>


                            <div class="profile-card">
                                <img src={lakshyaImg} alt="Lakshya" class="profile-img" />
                                <h3 class="profile-name">Lakshya Balchandani</h3>
                                <h6 class="icon-role"><i class="fas fa-university opp-icon"></i><span>Computer Science @ University of Waterloo</span></h6>
                                <h6 class="icon-role"><i class="fas fa-calendar-alt opp-icon"></i> <span>7pm - 7:30 PM EST, March 15, 2021</span></h6>
                                <p className="profile-description"> My name is Lakshya Balchandani and I’m a first year Computer Science student at the University of Waterloo. I graduated with the IB Diploma last year and am currently gearing up for my first co-op work term as a CS student this summer! In my free time, I enjoy reading, watching movies, and talking to my friends. Also, I promise I don’t look as serious as my picture makes me look in real life, so make sure to come and say hi! I look forward to speaking with all of you.</p>
                                <a class="learn-more opp-page-link" href="https://youtu.be/Ukg_clFz0U8"><i class="fab fa-youtube"></i> View Lakshya's Talk</a>
                            </div>

                            <div class="profile-card">
                                <img src={donnyImg} alt="Donny" class="profile-img" />
                                <h3 class="profile-name">Donny Li</h3>
                                <h6 class="icon-role"><i class="fas fa-university opp-icon"></i><span>Health Science @ McMaster University</span></h6>
                                <h6 class="icon-role"><i class="fas fa-calendar-alt opp-icon"></i> <span>7pm - 7:30 PM EST, March 22, 2021</span></h6>
                                <p className="profile-description">Donny is a first-year Health Sciences student at McMaster University. At school, he’s part of the executive team at the Global Public Health Brigades and Canadian Society for Epidemiology and Biostatistics, as well as being involved with HOSA and the Health Sciences Elections Committee. Outside of school, he is a passionate pilot and civilian instructor for the Royal Canadian Air Cadets, founder of the national research nonprofit AlumNav, and board director at the nation-wide youth science organization Race to a Cure. In his free time, he enjoys playing the piano, biking, flying, and facing off friends in chess.</p>
                                <a class="learn-more opp-page-link" href="https://youtu.be/meQdCkSjU4Y"><i class="fab fa-youtube"></i> View Donny's Talk</a>
                            </div>


                        </section>
                       
                    </div>
                </div>
                <Footer />
            </div>
        )


    }

}