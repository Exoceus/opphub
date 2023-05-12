import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, withRouter } from 'react-router-dom';
import LogoAlt from '../images/logo_white.svg';



class Footer extends Component {
    render() {
        return (
            <footer className="real-footer">
                <div className="footer-categories">
                    <div className="footer-column">
                        <Link to={"/"}><img src={LogoAlt} alt="OppHub Logo" /></Link>
                        <p>Our mission is to enable students by connecting them to opportunities!</p>
                    </div>
                    <div className="footer-column">
                        <h3 className="footer-column-header">Company</h3>
                        <Link className="footer-column-item" to={"/about"}>About</Link>
                        <Link className="footer-column-item" to={"/about"}>Team</Link>
                        <a className="footer-column-item" href={"mailto:info@opp-hub.com"}>Contact</a>
                    </div>
                    <div className="footer-column">
                        <h3 className="footer-column-header">Other</h3>
                        <Link className="footer-column-item" to={"/suggest/opp"}>Add an Opportunity</Link>
                        <a className="footer-column-item" href={"https://opp-hub.us2.list-manage.com/subscribe?u=51912e90952edbf9efa4aca96&id=ab7769f924"}>Newletter</a>
                        <a className="footer-column-item" href={"mailto:info@opp-hub.com"}>Ambassador program</a>
                        <Link className="footer-column-item" to={"/feedback"}>Feedback</Link>
                    </div>
                    <div className="footer-column">
                        <h3 className="footer-column-header">Connect</h3>
                        <a className="footer-column-item" href={"https://discord.gg/4dHY2yG"}>Discord Server</a>
                        <a className="footer-column-item" href={"https://www.instagram.com/opphub_official/"}>Instagram</a>
                        <a className="footer-column-item" href={"https://www.linkedin.com/company/opphub"}>LinkedIn</a>

                    </div>
                </div>
                <div className="footer-copyright">
                    © 2021 OppHub. All rights reserved.
        </div>

            </footer>
        );
    }
}

export default withRouter(Footer)