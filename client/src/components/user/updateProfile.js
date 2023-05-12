import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../navbar.component'
import Footer from '../footer'
import Loading from '../loading.component'

import OppFormTextItem from "../add_opps/oppFormItem"
import ImageUploader from "../add_opps/imageUploader"


import {AuthContext} from '../../auth'


export default function UpdateProfile({match, history}) {

    const [initialUser, setInitialUser] = useState(null)
    const [isLoaded, setLoaded] =  useState(false)
    const [newImgOption, setNewImgOption] =  useState(false)
    const [newImg, setNewImg] =  useState(null)
    const [submissionAttempt, setSubmissionAttempt] = useState(false)


    const [username, setUsername] =  useState('')
    const [bio, setBio] =  useState('')
    const [tagline, setTagline] =  useState('')
    const [instagram, setInstagram] =  useState('')
    const [linkedin, setLinkedin] =  useState('')
    const [twitter, setTwitter] =  useState('')
    const [website, setWebsite] =  useState('')


    const contextData = useContext(AuthContext)


    useEffect(() => {
        axios.get('/api/user/'+match.params.id)
            .then(response => {
                var data = response.data
                setInitialUser(response.data)
                setLoaded(true)
            })

            .catch((error) => {
                console.log(error);
            })
      }, []);

    useEffect(() => {
        if(initialUser){
            setUsername(initialUser.name)
            setBio(initialUser.bio)
            setTagline(initialUser.tagline)
            setWebsite(initialUser.website)
            setInstagram(initialUser.instagram)
            setLinkedin(initialUser.linkedin)
            setTwitter(initialUser.twitter)
     
        }
       
    }, [initialUser]);

      const onSubmit = () => {
            const updatedUser = {
                name: username,
                bio,
                tagline,
                instagram,
                linkedin,
                twitter,
                website,
            }

            axios.post(`/api/user/update/${match.params.id}`, updatedUser)
            .then(res => {
                console.log(res.data)
                history.push(`/user/${match.params.id}`);
            });
      }

      const onUpdateImg = () => {
          console.log('yeet')
          setSubmissionAttempt(true)
            if(newImg){
                const data = new FormData();
                data.append('hostImage', newImg, newImg.name);

                axios.post('/api/user/img-upload/', data, {
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    }
                })
                    .then((response) => {
                        if (200 === response.status) {
                            // If file size is larger than expected.
                            if (response.data.error) {
                                if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                                    console.log('Max size: 2MB', 'red');
                                } else {
                                    console.log(response.data.error, 'red');
                                }
                            } else {
                                // Success
                                let fileName = response.data;
    
                                console.log('fileName', fileName);

                                const updateProfile = {
                                    profile_img: fileName.location,
                                }

                                axios.post(`/api/user/profile-img-update/${match.params.id}`, updateProfile)
                                .then(res => {
                                    console.log(res.data)
                                    window.location.reload();
                                    });
                            }
                        }
                    }).catch((error) => {
                        // If another error
                        console.log(error, 'red');
                    });
            } 

        }
        

        if(initialUser){
            var bgstyle = { backgroundImage: `url(${initialUser.profile_img})` }
        }
        

    if(newImgOption){
        var new_img = <div><ImageUploader setImage={setNewImg} type='Profile'/>
        {(submissionAttempt && !newImg) ? <span style={{'color': 'red'}}>Please upload a new image</span> : null} <div className='content-center'><button className='reg-button' onClick={e => onUpdateImg()}>Add Image</button></div></div>
    }


    document.title = 'Edit Profile'
    
      if(isLoaded && initialUser && contextData.currentUser && contextData.currentUser.uid === initialUser.UID){
        return (
            <div>
                <Navbar />

       
                <div className='add-opp-form-wrapper'>
                    <h3 className='form-title'>Update Profile</h3>
                    

                    <div className="form-group">
                    <div className='user-profile-img-wrapper'><div className='img-wrapper' style={bgstyle}> <button className='change-pic-button' onClick={e => setNewImgOption(!newImgOption)}><i class="fas fa-plus"></i></button></div></div>
                                
                    {new_img}
                    </div>
                   
                    <OppFormTextItem type='text' value={username} onChange={setUsername} header="Name" required={true} placeholder="Please enter First and Last Names"/>

                    <OppFormTextItem type='text' value={tagline} onChange={setTagline} header="Tagline" placeholder="Please enter a tagline"/>

                    <OppFormTextItem type='textarea' value={bio} onChange={setBio} header="Bio" placeholder="Please enter a bio"/>

                    <div className='grid-3'>
                        <OppFormTextItem type='text' value={instagram} onChange={setInstagram} header="Instagram Handle" placeholder="Instagram handle only (not url/link)."/>
                        <OppFormTextItem type='text' value={twitter} onChange={setTwitter} header="Twitter Handle" placeholder="Twitter handle only (not url/link)."/>
                        <OppFormTextItem type='text' value={linkedin} onChange={setLinkedin} header="LinkedIn Handle" placeholder="LinkedIn handle only (not url/link)."/>
                    </div>

                    <OppFormTextItem type='text' value={website} onChange={setWebsite} header="Website" placeholder="Website link (must start with http or https)."/>
               


                    <div className="form-group">
                            <div className='button-wrapper'>
                                <button value="submit" type='submit' className='submit-button' onClick={e => onSubmit(e)}><i className="far fa-edit"></i> Update Profile</button>
                            </div>
                           
                    </div>
                </div>
 
                

                <Footer />
    
            </div>
        )
      }

      else{
        return (
            <Loading />
        )
      }
   
}
