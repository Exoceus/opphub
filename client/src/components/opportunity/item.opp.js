import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';

import VerfiedCheckImg from "../../images/verified.svg"
import RecurringIcon from "../../images/Recurring.svg"

import '../item/item.css'

class OpportunityItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_name: '',
            profile_pic: null,
            styling: '',
            expanded: false,
            width: window.innerWidth,
            isLoaded: false
        }
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    componentDidMount() {

        if (this.props.opp.host_id.length < 6) {
            this.setState({
                host_name: 'Unknown Host',
                isLoaded: true
            })
        }

        else if (this.props.opp.host_id == 'unknown') {
            if (this.props.opp.opp_img != undefined) {
                this.setState({
                    host_name: this.props.opp.temp_host_name,
                    profile_pic: this.props.opp.opp_img
                }, () => {
                    this.setState({ isLoaded: true })
                })
            }

            else {
                this.setState({
                    host_name: this.props.opp.temp_host_name,
                    isLoaded: true
                })
            }
        }

        else {
            axios.get('/api/org/opp/' + this.props.opp.host_id)
                .then(response => {
                    var data = response.data
                    this.setState({
                        host_name: data.host_name,
                        profile_pic: data.profile_pic,
                        isLoaded: true
                    })

                    console.log(this.state)
                })

                .catch((error) => {
                    console.log(error);
                })
        }
    }

    onChangeExpand = (e) => {
        e.preventDefault();
        this.setState({ isLoaded: false }, () => {
            if (this.state.expanded) {
                this.setState({ expanded: false, isLoaded: true })
            }
            else {
                this.setState({ expanded: true, isLoaded: true })
            }
        })
    }

    render() {
        const { width } = this.state;
        const isMobile = width <= 700;

        var opp = this.props.opp

        var unknowntext = <div></div>

        if (this.state.profile_pic == null) {
            var bgstyle = { background: '#3BA881' }
            var unknowntext = <div>Unknown host</div>
        }

        else {

            var bgstyle = { backgroundImage: `url(${this.state.profile_pic})` }
        }

        if (this.props.edit_mode) {
            if (this.props.ambassador_edit) {
                var edit_icon = <div className="opp-options"><button className='edit-opp' onClick={() => {
                    this.props.history.push('/opp/update/amb/' + opp._id)
                }}>Edit Opportunity <i className="far fa-edit"></i></button><button className='remove-opp' onClick={() => {
                    this.props.history.push('/opp/update/amb/' + opp._id)
                }}>Delete Opportunity <i class="far fa-trash-alt"></i></button></div>
            }

            else if (this.props.starred_edit) {
                var edit_icon =
                    <div className="opp-options opp-options-remove-star">
                        <button className='unstar-opp' onClick={() => {
                            this.props.starred_edit(opp._id)
                        }}><i class="far fa-bookmark"></i> Remove Bookmark</button>
                    </div>
            }

            else {
                var edit_icon = <div className="opp-options"><button className='edit-opp' onClick={() => {
                    this.props.history.push('/opp/update/' + opp._id)
                }}>Edit Opportunity <i className="far fa-edit"></i></button><button className='remove-opp' onClick={() => {
                    this.props.history.push('/opp/del/' + opp._id)
                }}>Delete Opportunity <i class="far fa-trash-alt"></i></button></div>
            }
        }

        if (opp.sector.length > 1) {
            if (this.props.list_layout == "compact") {
                if (opp.sector.length > 3) {

                    var sectors = opp.sector[0] + ", " + opp.sector[1] + ", " + opp.sector[2] + " + " + (opp.sector.length - 3)
                }

                else if (opp.sector.length == 3) {
                    var sectors = opp.sector[0] + ", " + opp.sector[1] + ", " + opp.sector[2]
                }

                else if (opp.sector.length == 2) {
                    var sectors = opp.sector[0] + ", " + opp.sector[1]
                }
            }
            else {
                var sectors = <><span className='opp-card-info-maintext'>{opp.sector[0]}</span><span className='opp-card-info-subtext'> & {opp.sector.length - 1} More</span></>
            }

        }

        else {
            var sectors = <><span className='opp-card-info-maintext'>{opp.sector[0]}</span></>
        
        }

        if (opp.target_demo.length > 1) {
            if (this.props.list_layout == "compact") {
                if (opp.target_demo.length > 3) {

                    var target_demos = opp.target_demo[0] + ", " + opp.target_demo[1] + ", " + opp.target_demo[2] + " + " + (opp.target_demo.length - 3)
                }

                else if (opp.target_demo.length == 3) {
                    var target_demos = opp.target_demo[0] + ", " + opp.target_demo[1] + ", " + opp.target_demo[2]
                }

                else if (opp.target_demo.length == 2) {
                    var target_demos = opp.target_demo[0] + ", " + opp.target_demo[1]
                }
            }
            else {
                var target_demos = <><span className='opp-card-info-maintext'>{opp.target_demo[0]}</span><span className='opp-card-info-subtext'> & {opp.target_demo.length - 1} More</span></>
            }
        }

        else {
            var target_demos =<><span className='opp-card-info-maintext'>{opp.target_demo[0]}</span></>
        }


        if (opp.position_type.length > 1) {
            var position_types = <><span className='opp-card-info-maintext'>{opp.position_type[0]}</span><span className='opp-card-info-subtext'> & {opp.position_type.length - 1} More</span></>
        }



        else {
            var position_types = <><span className='opp-card-info-maintext'>{opp.position_type[0]}</span></>
        }


        var dateCreated = opp.createdAt
        dateCreated = dateCreated.substring(0, 10)
        dateCreated = new Date(dateCreated)
        dateCreated = dateCreated.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' })

        var description = opp.description


        if (description) {

            if (description.length > 200) {

                if (this.props.minimized) {
                    description = description.substring(0, 50)
                }

                else if (this.props.list_layout == "compact") {
                    description = description.substring(0, 100)
                }
                else {
                    description = description.substring(0, 130)
                }

                description = description + " ..."
            }
        }

        if (opp.title.length > 48) {
            var title = opp.title.substring(0, 48) + ".."
        }

        else {
            var title = opp.title
        }

        var temp_host_name = this.state.host_name


        if (opp.temp_host_name) {
            if (opp.temp_host_name.length > 40) {
                temp_host_name = temp_host_name.substring(0, 40) + "..."
            }
        }

        if (opp.due_date) {
            var due_date = new Date(opp.due_date)
            due_date = due_date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' })

            var deadline_tag = <div className="tag-group" title='Opportunity Deadline (sign up/submission)'>
                <div className="tag-icon"><i class="far fa-calendar-alt opp-icon"></i></div>
                <div className="tag-value">{due_date}</div>
            </div>
        }

        if (this.props.minimized) {
            var min_style = {
                display: 'none'
            }

            var min_title = {
                fontSize: '1.1rem'
            }
        }

        if (opp.online) {
            var online_tag = <div className="tag-group">
                <div className="tag-icon"><i class="fas fa-globe opp-icon"></i></div>
                <div className="tag-value">Online</div>
            </div>
        }

        var redirect_link = '/redirect/' + opp._id

        if (opp.verified || opp.ambassador_id || opp.host_id != "unknown") {
            var verified_check = <img className="opp-card-info-icons" src={VerfiedCheckImg} title="Opportunity verified by OppHub or the organization" />
        }

        if(opp.recurring){
            var verified_icon = <img className="opp-card-info-icons" src={RecurringIcon} title="Recurring opportunity (likely will occur again next year/semester/etc)" />
            
        }

        if (this.state.expanded) {
            var expanded_content = <div className="opp-card-inner"><p className='opp-card-description'>{description}</p>
                <div className="opp-card-tag-row">
                    {online_tag}{deadline_tag}
                </div></div>
        }

        else {
            var expanded_content = <div onClick={this.onChangeExpand} className="expand-opp-button">Expand <i class="fas fa-angle-down"></i></div>
        }


        //Where the renders are



        if (this.state.isLoaded == false) {
            return (
                <div className='opp-card'>
                    <div>Loading Opportunity</div>
                </div>
            )
        }

        else if (this.props.suggested_id != this.props.opp._id) {

            if (this.props.list_layout == "compact") {
                return (
                    <div className='compact-opp-card' style={(opp.archived) ? {opacity: 0.5} : null}>
                        {edit_icon}
                        <a target='_blank' className='opp-card-link' href={redirect_link}>
                            <div className="compact-card-inner-wrap">
                                <div className='compact-img-wrapper' style={bgstyle}>{unknowntext}</div>
                                <div> <div className="opp-card-subtitle">{temp_host_name}</div> 
                                 <div className="opp-card-title">{(opp.archived) ? "ARCHIVED: " : null}{title} {verified_check} {verified_icon} </div> </div>
                               

                                <div className="row-group">
                                    {opp.location + " (" + opp.temp_region + ")"}
                                </div>
                                <div className="row-group">{position_types}
                                </div>
                                <div className="row-group">{sectors}
                                </div>
                                <div className="row-group">{opp.target_demo.join(', ')}
                                </div>
                            </div>
                        </a>
                    </div >
                )
            }

            else if (this.props.list_layout == "minimized") {
                return (
                    <div className='opp-card'>
                        {/*Change the link to the acc opp once it is finished*/}
                        {edit_icon}
                        <div className='opp-card-inner'>
                            <a target='_blank' className='opp-card-link' href={redirect_link}>
                                <div className='opp-card-col-wrapper-mobile'>
                                    <div className='opp-card-col-wrapper-1'>
                                        <div className='img-wrapper' style={bgstyle}>{unknowntext}</div>

                                    </div>
                                    <div className="main-row-mobile">
                                        <span className='opp-card-host-name' style={min_title}>{this.state.host_name}</span>
                                        <h4 className='opp-card-title' style={min_title}>{title} {verified_check} {verified_icon}</h4>

                                    </div>
                                </div>
                                <div className="opp-card-info-row-mobile" style={min_style}>
                                    <div className="row-group">
                                        <span className='opp-location'><i class="fas fa-map-marker-alt opp-icon"></i> {opp.location + " (" + opp.temp_region + ")"}</span>
                                    </div>
                                    <div className="row-group">
                                        <span className="position-type"><i class="fas fa-user-friends opp-icon"></i>{position_types}</span>
                                    </div>
                                    <div className="row-group">
                                        <span className="sector"><i class="fas fa-briefcase opp-icon"></i>{sectors}</span>
                                    </div>

                                </div>

                            </a>
                        </div>
                    </div >
                )
            }

            else if (this.props.list_layout == "mobile") {
                return (
                    <div className='mobile-opp-card'>

                        {edit_icon}
                        <a target='_blank' className='opp-card-link' href={redirect_link}>
                            <div className='opp-card-mobile-side-inner'>
                                <span className='opp-card-host-name' style={min_title}>{temp_host_name}</span>
                                <h4 className='opp-card-title' style={min_title}>{title} {verified_check} {verified_icon}</h4>
                                <div className='opp-card-col-wrapper-1'>
                                    <div className='img-wrapper' style={bgstyle}>{unknowntext}</div>

                                </div>

                                <div className="opp-card-columns-side">


                                </div>

                                <div className="opp-card-info-row-mobile-side" style={min_style}>
                                    <div className="row-group">
                                        <span className='opp-location'><i class="fas fa-map-marker-alt opp-icon"></i>{opp.location + " (" + opp.temp_region + ")"}</span>
                                    </div>
                                    <div className="row-group">
                                        <span className="position-type"><i class="fas fa-user-friends opp-icon"></i>{position_types}</span>
                                    </div>
                                    <div className="row-group">
                                        <span className="sector"><i class="fas fa-briefcase opp-icon"></i>{sectors}</span>
                                    </div>

                                </div>


                            </div>


                        </a>

                    </div >
                )
            }


            else {
                    return (
                        <div className='opp-card'>
                            {/*Change the link to the acc opp once it is finished*/}
                            {edit_icon}
                            <div className='opp-card-inner'>
                                <a target='_blank' className='opp-card-link' href={redirect_link}>
                                    <div className='opp-card-col-wrapper'>
                                        <div className='opp-card-col-wrapper-1'>
                                            <div className='img-wrapper' style={bgstyle}>{unknowntext}</div>

                                        </div>
                                        <div className='opp-card-col-wrapper-2'>
                                            <div className="main-row">
                                                <h4 className='opp-card-title' style={min_title}>{title}  {verified_check} {verified_icon}</h4>
                                                <span className='opp-card-host-name' style={min_title} title='Organization Name'>{temp_host_name}</span>
                                            </div>

                                            <div className="opp-card-info-row" style={min_style}>
                                                <div className="row-group">
                                                    <span className='opp-location row-group-item' title='Location of opportunity.'>
                                                        <span className='opp-card-info-icon'>{opp.online ? <i class="fas fa-globe opp-icon"></i> : <i class="fas fa-map-marker-alt opp-icon"></i>}</span>
                                                        <span className='opp-card-info-text'><span className='opp-card-info-maintext'>{(opp.location.length > 15) ? opp.location.substring(0,15) + 
                                                        "..." + " (" + opp.temp_region + ")" : opp.location + " (" + opp.temp_region + ")"}</span></span>
                                                    </span>
                                                </div>
                                                <div className="row-group">
                                                    <span className="position-type row-group-item" title='Type of opportunity.'>
                                                        <span className='opp-card-info-icon'>  <i class="fas fa-user-friends opp-icon"></i></span>
                                                        <span className='opp-card-info-text'>  {position_types}</span>
                                                        
                                               
                                                    </span>
                                                </div>
                                                <div className="row-group">
                                                    <span className="sector row-group-item" title='Sectors of opportunity.'>
                                                       <span className='opp-card-info-icon'><i class="fas fa-briefcase opp-icon"></i></span>
                                                       <span className='opp-card-info-text'> {sectors}</span>
                                                       
                                                    </span>
                                                </div>
                                                <div className="row-group">
                                                    <span className="target-demo row-group-item" title='Demographic of opportunity.'>
                                                        <span className='opp-card-info-icon'>
                                                            <i class="fas fa-university opp-icon"></i>
                                                        </span>
                                                    
                                                        <span className='opp-card-info-text'>
                                                            {target_demos}
                                                        </span>
                                                    </span>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className='opp-card-inner-mobile'>
                                <a target='_blank' className='opp-card-link' href={redirect_link}>
                                  
                                        <div className='opp-card-mobile-header'>
                                            <div className='img-wrapper' style={bgstyle}>{unknowntext}</div>
                                            <div className="main-col">
                                           
                                                <h4 className='opp-card-title' style={min_title}>{title}  {verified_check} {verified_icon}</h4>
                                                <span className='opp-card-host-name' style={min_title} title='Organization Name'>{temp_host_name}</span>
                                            </div>
                                        </div>
                                        <div className='opp-card-col-wrapper-2'>
                                            
                                            <div className="opp-card-info-row" style={min_style}>
                                                <div className="row-group">
                                                    <span className='opp-location row-group-item' title='Location of opportunity.'>
                                                        <span className='opp-card-info-icon'>{opp.online ? <i class="fas fa-globe opp-icon"></i> : <i class="fas fa-map-marker-alt opp-icon"></i>}</span>
                                                        <span className='opp-card-info-text'><span className='opp-card-info-maintext'>{(opp.location.length > 15) ? opp.location.substring(0,15) + 
                                                        "..." + " (" + opp.temp_region + ")" : opp.location + " (" + opp.temp_region + ")"}</span></span>
                                                    </span>
                                                </div>
                                                <div className="row-group">
                                                    <span className="position-type row-group-item" title='Type of opportunity.'>
                                                        <span className='opp-card-info-icon'>  <i class="fas fa-user-friends opp-icon"></i></span>
                                                        <span className='opp-card-info-text'>  {position_types}</span>
                                                        
                                               
                                                    </span>
                                                </div>
                                                <div className="row-group">
                                                    <span className="sector row-group-item" title='Sectors of opportunity.'>
                                                       <span className='opp-card-info-icon'><i class="fas fa-briefcase opp-icon"></i></span>
                                                       <span className='opp-card-info-text'> {sectors}</span>
                                                       
                                                    </span>
                                                </div>
                                                <div className="row-group">
                                                    <span className="target-demo row-group-item" title='Demographic of opportunity.'>
                                                        <span className='opp-card-info-icon'>
                                                            <i class="fas fa-university opp-icon"></i>
                                                        </span>
                                                    
                                                        <span className='opp-card-info-text'>
                                                            {target_demos}
                                                        </span>
                                                    </span>
                                                </div>

                                            </div>

                                        </div>
                                 
                                </a>
                            </div>
                        </div >
                    )
            }
        }

        else {
            return null
        }
    }
}

export default withRouter(OpportunityItem)