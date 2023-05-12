import React, { Component } from 'react'
import { useCallback, useContext } from 'react';
import firebase_app from '../../firebase'
import { withRouter, Redirect } from 'react-router'
import { AuthContext } from '../../auth';
import { Link } from 'react-router-dom';

import UserImg from "../../images/auth_forms/user_icon.svg"

const AmbassadorLogin = ({ history }) => {
    const handleLogin = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;

        try {
            await firebase_app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            history.push("/ambassador/dashboard");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/ambassador/dashboard" />
    }

    return (

        <div className="auth-form-page-wrapper">
            <div className="auth-form-wrapper">
                <img src={UserImg} />
                <form onSubmit={handleLogin} className="sign-up-form">
                    <h3 className='form-title'>Ambassador Login</h3>
                    <p>Don't have an account? <Link to={"/signup/ambassador"} className="classic-redirect">Sign up</Link></p>

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
                            <button type="submit" className='submit-button'>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default withRouter(AmbassadorLogin);