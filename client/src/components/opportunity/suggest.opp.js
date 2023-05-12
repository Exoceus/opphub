import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import axios from 'axios';

import Navbar from "../navbar.component"
import Footer from "../footer"

import AddOppForm from '../add_opps/AddOppForm'

function OpportunitySuggest({history}) {

    return (
        <div>
            <Navbar/>
                <AddOppForm history={history} type='suggest' redirect_url='/thank' />
            <Footer/>
        </div>
    )
}

export default OpportunitySuggest