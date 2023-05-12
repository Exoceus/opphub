import React, { Component } from 'react'
import { useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import firebase_app from '../../firebase'
import { withRouter } from 'react-router'

import UserImg from "../../images/auth_forms/user_icon.svg"

const AmbassadorSignup = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { ambassador_name, email, password } = event.target.elements;


        try {
            await firebase_app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);


            var user = firebase_app.auth().currentUser;
            var firebase_uid
            if (user != null) {
                firebase_uid = user.uid
            }

            const newUser = {
                ambassador_name: ambassador_name.value,
                email: email.value,
                UID: firebase_uid
            }

            console.log(newUser)

            axios.post('/api/amb/new', newUser)
                .then((res) => {
                    console.log(res)
                    history.push("/ambassador/dashboard");
                });


        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <div className="auth-form-page-wrapper">
            <div className="auth-form-wrapper">
                <img src={UserImg} />
                <form onSubmit={handleSignUp} className="sign-up-form">
                    <h3 className='form-title'>Ambassador Sign Up</h3>
                    <p>Already have an account? <Link to={"/login/ambassador"} className="classic-redirect">Login</Link></p>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input name="ambassador_name" type="ambassador_name" className="form-control" placeholder="ex. John Doe" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input name="email" type="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" placeholder="Password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <div className='button-wrapper'>
                            <button type="submit" className='submit-button'>Get Started</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default withRouter(AmbassadorSignup);