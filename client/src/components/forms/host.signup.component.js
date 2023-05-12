import React, { Component } from 'react'
import { useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import firebase_app from '../../firebase'
import { withRouter } from 'react-router'
import OrgImg from "../../images/auth_forms/organization_icon.svg"

const HostSignup = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { host_name, email, password } = event.target.elements;


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
                host_name: host_name.value,
                email: email.value,
                UID: firebase_uid
            }

            console.log(newUser)

            axios.post('/api/org/new', newUser)
                .then((res) => {
                    console.log(res)
                    history.push("/org/setup");
                });

        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <div className="auth-form-page-wrapper">
            <div className="auth-form-wrapper">
                <img src={OrgImg} />
                <form onSubmit={handleSignUp} className="sign-up-form auth-form">
                    <h3 className='form-title'>Organization Sign Up</h3>
                    <p>Already have an account? <Link to={"/login/org"} className="classic-redirect">Login</Link></p>
                    <div className="form-group">
                        <label className="auth-form-label">Name of Organization</label>
                        <input name="host_name" type="text" className="form-control auth-form-input" placeholder="Name of your organization" />
                    </div>
                    <div className="form-group">
                        <label className="auth-form-label">Email</label>
                        <input name="email" type="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label className="auth-form-label">Password</label>
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



export default withRouter(HostSignup);