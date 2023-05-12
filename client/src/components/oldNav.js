import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, withRouter } from 'react-router-dom';
import Logo from "../images/logo.svg"
class Navbar extends Component {
  render() {
    return (
      <header class="site-header">
        <div class="container">
          <div class="row justify-content-center align-items-center position-relative">
            <div class="col-sm-4 col-6 col-lg-2 col-xl-2 order-lg-1">
              <div class="brand-logo">
                <Link to={"/"}><img src={Logo} alt="OppHub Logo" /></Link>
              </div>
            </div>
            <div class="col-sm-6 col-lg-3 col-xl-3  col-4 d-sm-block order-lg-3 offset-xl-1">
              <div class="header-btns justify-content-end">
                <Link to={"/opportunities"} className="btn btn-outlined--primary btn-sm" id="action-button-custom">View Opportunities</Link>
              </div>
            </div>
            <div class="col-sm-1 col-6 col-lg-7 col-xl-6  position-static order-lg-2">
              <div class="main-navigation">
                <ul class="main-menu">
                  <li class="menu-item custom-menu-item" ><Link className="custom-menu-item" to="/feedback">Feedback</Link></li>
                  <li class="menu-item custom-menu-item"><Link to={"/suggest/opp"} className="custom-menu-item">Add Opportunities</Link></li>
                  <li class="menu-item has-dropdown">
                    <Link to="#features" className="custom-menu-item">More</Link>
                    <ul class="menu-dropdown">
                      <li class="single-item">
                        <Link to="/about">
                          <h3>About</h3>
                          <p>Learn more about the behind-the scenes and the team</p>
                        </Link>
                      </li>

                      <li class="single-item">
                        <a href="mailto:info@opp-hub.com" target="_blank">
                          <h3>Contact</h3>
                          <p>Shoot us message regarding potential partnerships, questions, suggestions or anything else</p>
                        </a>
                      </li>
                      <li class="single-item">
                        <a href="https://discord.gg/4dHY2yG" target="_blank">
                          <h3>Discord Server</h3>
                          <p>Join a global community of students and get updates directly from the team.</p>
                        </a>
                      </li>
                      <li class="single-item">
                        <a href="https://opp-hub.us2.list-manage.com/subscribe?u=51912e90952edbf9efa4aca96&id=ab7769f924" target="_blank">
                          <h3>Weekly Newsletter</h3>
                          <p> Featured weekly opportunities.</p>
                        </a>
                      </li>

                    </ul>
                  </li>
                </ul>
              </div>
              <div class="mobile-menu"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(Navbar)