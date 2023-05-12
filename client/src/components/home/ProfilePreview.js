import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import firebase_app from "../../firebase"

export default function ProfilePreview({user}) {
    if(user && user._id){ 
           var bgstyle = { backgroundImage: `url(${user.profile_img})` }

    const formatDate = (string) => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

        return (
            <Link className='profile-preview-card' to={`/user/${user._id}`}>
                               
                               <div className='user-profile-img-wrapper'><div className='img-wrapper' style={bgstyle}></div></div>
                                <h2 className='profile-name-title'>{user.name}</h2>
                                <h6 className='profile-tagline'>{user.tagline}</h6>
                           
                                <Link className='edit-profile-button' to={`/edit/user/${user._id}`}><i className="far fa-edit"></i> Edit Profile</Link>
                                <div className='edit-profile-button' onClick={e => {firebase_app.auth().signOut(); window.location.reload();}}> <i className="fas fa-sign-out-alt"></i> Sign out</div>
                            </Link>
        )
    }

    else if(user && user.type === 'Ambassador'){
        var bgstyle = { backgroundImage: `url(https://opphubhostimages.s3.us-east-2.amazonaws.com/default_user_icon.png)` }


        return(        
        <div className='profile-preview-card' to={`/ambassador/dashboard`}>
                               
        <div className='user-profile-img-wrapper'><div className='img-wrapper' style={bgstyle}></div></div>
         <h2 className='profile-name-title'>Ambassador Account</h2>
    
         <Link className='edit-profile-button' to={`/ambassador/dashboard`}><i class="fas fa-home"></i> Ambassador Portal</Link>
         <div className='edit-profile-button' onClick={e => {firebase_app.auth().signOut(); window.location.reload();}}> <i className="fas fa-sign-out-alt"></i> Sign out</div>
     </div>)


    }

    else{
        var bgstyle = { backgroundImage: `url(https://opphubhostimages.s3.us-east-2.amazonaws.com/default_user_icon.png)` }

        return(
            <Link className='profile-preview-card'  to={`/login/user`}>
                               
            <div className='user-profile-img-wrapper'><div className='img-wrapper' style={bgstyle}></div></div>
             <h2 className='profile-name-title'>Your Profile</h2>
             <h6 className='profile-tagline'>Access Bookmarks and Add Reviews</h6>
             <Link className='edit-profile-button' to={`/login/user`}><i class="fas fa-user-plus"></i> Sign In</Link>
      
         </Link>
        )
    }

}