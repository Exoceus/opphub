import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase_app from './firebase'

import { AuthProvider } from "./auth";
import PrivateRoute from "./privateRoute";
import PrivateAmbRoute from "./privateAmbRoute";
import PrivateOrgRoute from "./privateOrgRoute"

import "./css/custom.css";

import DesktopHome from "./components/home/Desktop"

import HostSignup from "./components/forms/host.signup.component"
import HostLogin from "./components/forms/host.login.component"
import HostDashboard from "./components/host/dashboard"

import HostProfile from "./components/host/profile"

import AmbassadorSignup from "./components/ambassador/signup.amb"
import AmbassadorLogin from "./components/ambassador/login.amb"
import AmbassadorDashboard from "./components/ambassador/dashboard"

import NewAmbassadorOpportunity from "./components/ambassador/new.opp"
import AmbassadorOpportunityUpdate from "./components/ambassador/update.opp"

import OpportunitySuggest from "./components/opportunity/suggest.opp"
import OpportunityMaintain from "./components/opportunity/maintain.opp"

import NewOpportunity from "./components/opportunity/new.opp"
import OpportunityUpdate from "./components/opportunity/update.opp"
import OpportunityDelete from "./components/opportunity/del.opp"
import OppRedirect from "./components/opportunity/redirect.opp"

import OpportunityList from "./components/opportunity/home.opp"

import UpdateHost from "./components/forms/create.host.component"
import OpportunityPage from "./components/opportunity/page.opp"
import Navbar from "./components/navbar.component"

import Thankyou from "./components/thank.component"

import landingPage from "./components/other/landingpage.component"

import FeedbackRedirect from "./components/feedback.component"

import UserLogin from "./components/user/user.login.component"
import UserSignup from "./components/user/user.signup.component"

import FeaturedOpportunityPage from "./components/opportunity/featured_page.opp"

import aboutPage from "./components/other/aboutPage.component"

import OppTalks from "./components/other/opptalks"

import MegaList from "./components/other/megalist"

import UserProfilePage from "./components/user/profilePage"
import UpdateProfile from './components/user/updateProfile'


import Newsletter from './components/other/Newsletter'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/user/:id" exact component={UserProfilePage} />
        <PrivateRoute path="/edit/user/:id" exact component={UpdateProfile} />
        

        <Route path="/org/:id" exact component={HostProfile} />
        <Route path="/newsletter" exact component={Newsletter} />

        <Route path="/opps" exact component={DesktopHome} />
        <Route path="/about" exact component={aboutPage} />

        <Route path="/opptalks" exact component={OppTalks} />
        
        <Route path="/all-opps" exact component={MegaList} />
        

        <Route path="/feedback" exact component={FeedbackRedirect} />

        <Route path="/signup/org" exact component={HostSignup} />
        <Route path="/login/org" exact component={HostLogin} />

        <Route path="/signup/ambassador" exact component={AmbassadorSignup} />
        <Route path="/login/ambassador" exact component={AmbassadorLogin} />
        <PrivateAmbRoute path="/ambassador/dashboard" exact component={AmbassadorDashboard} />

        <PrivateAmbRoute path="/ambassador/dashboard/new" exact component={NewAmbassadorOpportunity} />
        <PrivateAmbRoute path="/opp/update/amb/:id" exact component={AmbassadorOpportunityUpdate} />

        <Route path="/suggest/opp" exact component={OpportunitySuggest} />
        <Route path="/maintain/opp/:id" exact component={OpportunityMaintain} />

        <Route path="/thank" exact component={Thankyou} />

        <Route path="/signup/user" exact component={UserSignup} />
        <Route path="/login/user" exact component={UserLogin} />

        <PrivateOrgRoute path="/org/setup" exact component={UpdateHost} />
        <PrivateRoute path="/opp/update/:id" exact component={OpportunityUpdate} />


        <Route path="/opp/:id/:user_id?" exact component={OpportunityPage} />
        <PrivateRoute path="/opp/del/:id" exact component={OpportunityDelete} />

        <Route path="/redirect/:id/:user_id?" exact component={OppRedirect} />

        <Route path="/opportunities/:search?" exact component={OpportunityList} />
        <Route path="/opportunities/featured/:type/:category" exact component={FeaturedOpportunityPage} />


        <PrivateOrgRoute path="/dashboard" exact component={HostDashboard} />
        <PrivateOrgRoute path="/dashboard/new" exact component={NewOpportunity} />

        <Route path="/" exact component={landingPage} />
      </Router>
    </AuthProvider>
  );
}

export default App