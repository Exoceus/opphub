import React, { Component } from 'react'
import { useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import firebase_app from '../../firebase'
import { withRouter } from 'react-router'

import OppFlag from "../../images/auth_forms/Flag.svg"
import GoogleIcon from "../../images/auth_forms/Google Icon.svg"

import firebase from 'firebase';

import "./forms.css";


const UserSignup = ({ history }) => {
    const handleEmailSignUp = useCallback(async event => {
        event.preventDefault();
        const { name, email, password } = event.target.elements;

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
                name: name.value,
                email: email.value,
                UID: firebase_uid
            }

            console.log(newUser)

            axios.post('/api/user/new', newUser)
                .then((res) => {
                    console.log(res)
                    history.push("/opps");
                });


        } catch (error) {
            alert(error);
        }
    }, [history]);

    
    const handleGoogleSignup = () => {
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

                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    UID: user.uid,
                    profile_img: user.photoURL
                }

                axios.post('/api/user/new', newUser)
                    .then((res) => {
                        console.log(res)
                        history.push("/opportunities");
                    });
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

    return (
        <div className="auth-page-form">
            
            <div className="login-form">
            <h1>Opportunities Await!</h1>
                    <p>Already have an account? <Link to={"/login/user"} className="classic-redirect">Login</Link></p>
                     <button className='google-auth-button' onClick={handleGoogleSignup}> <img src={GoogleIcon}/> Signup With Google</button>

                    <div className='auth-separator-wrapper'>
                        <div className='auth-separator-text'>OR</div>
                        Or
                    </div>
            
                <form onSubmit={handleEmailSignUp}>
               


                    <div className="form-group">
                        <label className="auth-form-label">Full Name</label>
                        <input name="name" type="text" className="form-control login-form-input" placeholder="ex. John Doe" />
                    </div>
                    <div className="form-group">
                        <label className="auth-form-label">Email</label>
                        <input name="email" type="email" className="form-control login-form-input" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label className="auth-form-label">Password</label>
                        <input name="password" type="password" placeholder="Password" className="form-control login-form-input" />
                    </div>
                    <div className="form-group">
                        <div className='button-wrapper'>
                            <button type="submit" className='submit-button'>Sign Up</button>
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

export default withRouter(UserSignup);