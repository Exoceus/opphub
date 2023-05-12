import React, { Component } from 'react'
import { useCallback, useContext } from 'react';
import firebase_app from '../../firebase'
import { withRouter, Redirect } from 'react-router'
import { AuthContext } from '../../auth';
import { Link } from 'react-router-dom';


import OppFlag from "../../images/auth_forms/Flag.svg"
import GoogleIcon from "../../images/auth_forms/Google Icon.svg"

import "./forms.css";
import firebase from 'firebase';

const UserLogin = ({ history }) => {
    const handleEmailLogin = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;

        try {
            await firebase_app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            history.push("/opps");
        } catch (error) {
            alert(error);
        }
    }, [history]);


    const handleGoogleLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase_app.auth()
            .signInWithRedirect(provider)
            .then((result) => {
                console.log(result)
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    const { currentUser } = useContext(AuthContext);


    if (currentUser) {
        return <Redirect to="/opps" />
    }

    return (
        <div className="auth-page-form">
               
                <div className="login-form">
                    <h1>Opportunities Await!</h1>

                    <p>Don't have an account? <Link to={"/signup/user"} className="classic-redirect" style={{fontWeight: 600}}>Sign up</Link></p>
                    <button className='google-auth-button' onClick={handleGoogleLogin}> <img src={GoogleIcon}/> Login With Google</button>

                    <div className='auth-separator-wrapper'>
                        <div className='auth-separator-text'>OR</div>
                        Or
                    </div>

                 
                    <form onSubmit={handleEmailLogin}>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="email" className="form-control login-form-input" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" placeholder="Password" className="form-control login-form-input" />
                        </div>
                        <div className="form-group">
                            <div className='button-wrapper'>
                                <button type="submit" className='submit-button'>Login</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className='auth-page-graphic-wrapper'>
                    <div className='auth-page-graphic-inner-wrapper' style={{backgroundImage: `url(https://opphubhostimages.s3.us-east-2.amazonaws.com/Login+Icon+Grid.svg)`}}>
                        <img src={OppFlag} className='login-form-flag' />
                    </div>
                </div>
                
     
        </div>
    );
};



export default withRouter(UserLogin);