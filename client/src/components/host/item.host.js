import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';

class HostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_name: '',
            profile_pic: null,
            host_select: null,
            styling: ''
        }

        this.sendData = this.sendData.bind(this);
    }

    sendData() {
        this.props.action(this.props.host.host_name, this.props.host._id)
    }

    render() {
        var host = this.props.host

        var description = host.description
        if (description) {
            if (description.length > 200) {
                description = description.substring(0, 200)
                description = description + " ..."
            }
        }

        if (this.props.select_mode) {
            var select = <button className='select-host' onClick={this.sendData}>Select Host</button>

        }

        return (
            <div className='opp-card'>
                {select}
                <div className='opp-card-inner'>
                    <div className='opp-card-col-wrapper'>
                        <div className='opp-card-col-wrapper-1'>
                            <div className='img-wrapper' style={{ backgroundImage: `url(${host.profile_pic})` }}></div>

                        </div>
                        <div className='opp-card-col-wrapper-1'>
                            <h4 className='opp-card-title'>{host.host_name}</h4>
                            <p className='opp-card-description'>{description}</p>
                            <div className="opp-card-bottom-row">
                                <div className="row-group">
                                    <span className='opp-location'><i class="fas fa-map-marker-alt opp-icon"></i>{host.location}</span>
                                </div>
                                <div className="row-group">
                                    <span className="position-type"><i class="fas fa-user-friends opp-icon"></i>{host.host_type}</span>
                                </div>
                                <div className="row-group">
                                    <span className="date-posted"><i class="far fa-calendar-alt opp-icon"></i>{host.sector}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )

    }
}

export default withRouter(HostItem)