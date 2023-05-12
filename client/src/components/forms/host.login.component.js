import React, { Component } from 'react'
import { useCallback, useContext } from 'react';
import firebase_app from '../../firebase'
import { withRouter, Redirect } from 'react-router'
import { AuthContext } from '../../auth';
import { Link } from 'react-router-dom';

import OrgImg from "../../images/auth_forms/organization_icon.svg"

const HostLogin = ({ history }) => {
    const handleLogin = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;

        try {
            await firebase_app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            history.push("/dashboard");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    const { CurrentUser } = useContext(AuthContext);

    if (CurrentUser) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="auth-form-page-wrapper">
            <div className="auth-form-wrapper">
                <img src={OrgImg} />
                <form onSubmit={handleLogin} className="sign-up-form auth-form">
                    <h3 className='form-title'>Organization Login</h3>
                    <p>Don't have an account? <Link to={"/signup/org"} className="classic-redirect">Sign up</Link></p>

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



export default withRouter(HostLogin);