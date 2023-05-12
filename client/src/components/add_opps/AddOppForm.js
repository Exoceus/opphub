import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import axios from 'axios';

import OppFormTextItem from "./oppFormItem"
import ImageUploader from "./imageUploader"

import SectorWrapper from './sector_wrapper/SectorWrapper'
import CategoryWrapper from './OppCategory/CategoryWrapper'
import DemographicWrapper from './target_demographic/DemographicWrapper'

import RegionSelector from './regionSelector'

function AddOppForm({history, type, ambassador_id, initialData, redirect_url, opp_id}) {

    const [title, setTitle] = useState('')
    const [hostName, setHostName] = useState('')
    const [description, setDescription] = useState('')
    const [paid, setPaid] = useState('')
    const [link, setLink] = useState('')
    const [location, setLocation] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [image, setImage] = useState(null)
    const [region, setRegion] = useState('')
    const [online, setOnline] = useState(false)
    const [recurring, setRecurring] = useState(false)
    const [sectorList, setSectorList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [typeList, setTypeList] = useState([])
    const [demographic, setDemographic] = useState([])
    const [submissionAttempt, setSubmissionAttempt] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();

        setSubmissionAttempt(true)


        if(type === 'edit'){
            var opp = {
                host_id: 'unknown',
                title: title,
                description: description,
                location: location,
                sector: sectorList,
                position_type: typeList,
                target_demo: demographic,
                learn_more: link,
                suggestion: true,
                temp_host_name: hostName,
                due_date: dueDate,
                start_date: startDate,
                end_date: endDate,
                temp_region: region,
                online: online,
                recurring: recurring, 
                paid: paid
            }

            axios.post('/api/opp/update/' + opp_id, opp)
                .then(res => {
                    console.log(res.data)
                    history.push(redirect_url);
                });
        }

        else{

            const data = new FormData();// If file selected

            if (image && sectorList.length > 0 && typeList.length > 0 && demographic.length > 0 && (link.substring(0,4) === 'http')) {
                console.log('trying to make request')
    
                data.append('hostImage', image, image.name);
                
                axios.post('/api/opp/img-upload/', data, {
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
    
                                var opp = {
                                    host_id: 'unknown',
                                    title: title,
                                    description: description,
                                    location: location,
                                    sector: sectorList,
                                    position_type: typeList,
                                    target_demo: demographic,
                                    learn_more: link,
                                    suggestion: true,
                                    opp_img: fileName.location,
                                    temp_host_name: hostName,
                                    due_date: dueDate,
                                    start_date: startDate,
                                    end_date: endDate,
                                    temp_region: region,
                                    online: online,
                                    recurring: recurring, 
                                    paid: paid
                                }

                                if(ambassador_id){
                                    opp.ambassador_id = ambassador_id


                                }
    
                                axios.post('/api/opp/new', opp)
                                    .then(res => {
                                        console.log(res.data)
                                        history.push(redirect_url);
                                    });
                            }
                        }
                    }).catch((error) => {
                        // If another error
                        console.log(error, 'red');
                    });
            } else if (image) {
                // if file not selected throw error
                console.log('Please upload file', 'red');
            }
        }
    }

    useEffect(() => {
        if(online){
            setLocation('Remote')
        }

        else{
            setLocation('')
        }
      }, [online]);

    useEffect(() => {
       if(initialData){
        console.log(initialData)

        setTitle(initialData.title)
        setHostName(initialData.temp_host_name)
        setDescription(initialData.description)
        setPaid(initialData.paid)
        setLink(initialData.learn_more)
        setLocation(initialData.location)
        setEndDate(initialData.end_date)
        setStartDate(initialData.start_date)
        setDueDate(initialData.due_date)
        setRegion(initialData.temp_region)
        setOnline(initialData.online)
        setRecurring(initialData.recurring)
        setSectorList(initialData.sector)

        setTypeList(initialData.position_type)
        setDemographic(initialData.target_demo)

    
       }
    }, []);




    return (

        <form className='add-opp-form-wrapper' onSubmit={onSubmit}>
                    <h3 className='form-title'>Add New Opportunity</h3>
                    {/*<p className="intro-para">Thank you for taking the time to add to our ever expanding library of opportunities! Watch this video if you ever find yourself confused about any section of the opportunity submissions page. It covers the entire process explaining what should be placed where and how.</p>*/}
                    
                    <div style={{'color': 'red', 'fontWeight': 800, 'textTransform': 'uppercase'}}>* = Required</div>

                    <div className="grid-2">
                        <OppFormTextItem type='text' value={hostName} onChange={setHostName} header="Organization Name" required={true} placeholder="Name of the Organization" />
                        <OppFormTextItem type='text' value={title} onChange={setTitle} header="Opportunity Title" required={true} placeholder="Title of the opportunity" />
                    </div>
                   
                    <OppFormTextItem type='textarea' value={description} onChange={setDescription} header="Description" required={true} placeholder="Please give an overview of some of the most important information of the opportunity"/>


                    <div className='form-group'><label className="input-title">Opportunity Type <span style={{'color': 'red'}}>*</span></label>
                    {(submissionAttempt && typeList.length < 1) ? <span style={{'color': 'red'}}>Please select at least one of the options from the subcategories</span> : null}
                
                    </div>


                    <CategoryWrapper categoryList={categoryList} setCategoryList={setCategoryList}
                    typeContestList={typeList} setTypeContestList={setTypeList}
                    typeEventList={typeList} setTypeEventList={setTypeList}
                    typeOtherList={typeList} setTypeOtherList={setTypeList}
                    typePositionList={typeList} setTypePositionList={setTypeList}
                    typeScholarshipList={typeList} setTypeScholarshipList={setTypeList}
                    />

                    <div className='form-group'><label className="input-title">Sectors</label>
                    {(submissionAttempt && sectorList.length < 1) ? <span style={{'color': 'red'}}>Please select at least one sector.</span> : null}
                    </div>

                    <SectorWrapper sectorList={sectorList} setSectorList={setSectorList} />

                    <div className='form-group'><label className="input-title">Demographic <span style={{'color': 'red'}}>*</span></label>
                    {(submissionAttempt && demographic.length < 1) ? <span style={{'color': 'red'}}>Please select at least one demographic.</span> : null}
                    </div>
                    <DemographicWrapper demographic={demographic} setDemographic={setDemographic}  />
                    

                    <OppFormTextItem type='number' value={paid} onChange={setPaid} header="Paid" placeholder="If this opp is paid (has a fee), please specify the amount in USD. If it is free, keep this field empty."/>

                    
                    
                    <div className="grid-2">
                        <OppFormTextItem type='checkbox' value={online} onChange={setOnline} header="Is this Opportunity Online?" required={false} optionHeading='Yes, Online' />

                        <OppFormTextItem type='checkbox' value={recurring} onChange={setRecurring} header="Will it likely occur again (usually every year)?" required={false} optionHeading='Yes, Recurring' />
                    </div>

                    {(!online) ? <OppFormTextItem type='text' value={location} onChange={setLocation} header="Location" required={true} placeholder="City, State of where the opportunity is being hosted (ex. Toronto, Ontario)"/> : null}
                    

                    <RegionSelector value={region} onChange={setRegion} required={true} />

                    <div className="grid-3">
                        <OppFormTextItem type='date' value={startDate} onChange={setStartDate} header="Start Date" required={true} />
                        <OppFormTextItem type='date' value={endDate} onChange={setEndDate} header="End Date" required={true} />
                        <OppFormTextItem type='date' value={dueDate} onChange={setDueDate} header="Due Date" required={false} />
                    </div>

                    <OppFormTextItem type='text' value={link} onChange={setLink} header="Link" required={true} placeholder="Link where users can learn more about the opportunity (begins with https or http)."/>
                    {((link.substring(0,4) != 'http') && submissionAttempt) ? <label className="input-title"><span style={{'color': 'red'}}>Link is not valid. Must begin with http or https.</span></label> : null}
                    
                    {(type === 'edit') ? null :  <ImageUploader setImage={setImage} type='Opportunity'/>}
                
                    
                    <div className="form-group">
                            <div className='button-wrapper'>
                                <button value="submit" type='submit' className='submit-button opp-submit-button'>{(type === 'edit') ? <><i class="far fa-edit"></i> Update Opportunity</> : <><i className="fas fa-plus"></i> Add Opportunity</>}</button>
                            </div>
                    </div>
                </form>
    )
}

export default AddOppForm