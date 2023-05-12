import React from 'react'
import Categories from './Categories'
import PositionTypes from './OppType/PositionTypes'
import ContestsCompetitionTypes from './OppType/ContestsCompetitionTypes'
import EventTypes from './OppType/EventTypes'
import ScholarshipTypes from './OppType/ScholarshipTypes'
import OtherTypes from './OppType/OtherTypes'


const CategoryWrapper = (props) => {

    const allCategories = [
        'Position',
        'Contests/Competition',
        'Event',
        'Scholarship',
        'Other',
    ]

    if((props.typeContestList.includes('Hackathon') || props.typeContestList.includes('Case Study') || props.typeContestList.includes('Academic Competition') || props.typeContestList.includes('Other Contest')) && !props.categoryList.includes('Contests/Competition')){
        props.setCategoryList(r => [...r, 'Contests/Competition'])
    }

    if((props.typeEventList.includes('Conference') || props.typeEventList.includes('Lectures') || props.typeEventList.includes('Seminar') || props.typeEventList.includes('Workshops') || props.typeEventList.includes('Other Event')) && !props.categoryList.includes('Event')){
        props.setCategoryList(r => [...r, 'Event'])
    }

    if((props.typePositionList.includes('Internship - Unpaid') || props.typePositionList.includes('Internship - Paid') || props.typePositionList.includes('Leadership') || props.typePositionList.includes('Pre-College Program') || props.typePositionList.includes('Research') || props.typePositionList.includes('Summer Program') || props.typePositionList.includes('Volunteering') || props.typePositionList.includes('Other Position')) && !props.categoryList.includes('Position')){
        props.setCategoryList(r => [...r, 'Position'])
    }

    if((props.typeScholarshipList.includes('Academic Scholarship') || props.typeScholarshipList.includes('Community Service Scholarship') || props.typeScholarshipList.includes('Athletic Scholarship') || props.typeScholarshipList.includes('Other Scholarship')) && !props.categoryList.includes('Scholarship')){
        props.setCategoryList(r => [...r, 'Scholarship'])
    }

    if((props.typeOtherList.includes('Other')) && !props.categoryList.includes('Other')){
        props.setCategoryList(r => [...r, 'Other'])
    }

    return(
        <div className="form-group">
            <div className='checkbox-input-grid-wrapper'>
                {allCategories.map((cat, key) => <Categories key={key} val={cat} updater={category => props.setCategoryList(category)} categoryList={props.categoryList}/>)}
            </div>
            {props.categoryList.includes('Position')?<PositionTypes categoryList={props.categoryList} allCategories={allCategories} typePositionList={props.typePositionList} setTypePositionList={props.setTypePositionList}/>:null}
            {props.categoryList.includes('Contests/Competition')?<ContestsCompetitionTypes categoryList={props.categoryList} allCategories={allCategories} typeContestList={props.typeContestList} setTypeContestList={props.setTypeContestList}/>:null}
            {props.categoryList.includes('Event')?<EventTypes categoryList={props.categoryList} allCategories={allCategories} typeEventList={props.typeEventList} setTypeEventList={props.setTypeEventList}/>:null}
            {props.categoryList.includes('Scholarship')?<ScholarshipTypes categoryList={props.categoryList} allCategories={allCategories} typeScholarshipList={props.typeScholarshipList} setTypeScholarshipList={props.setTypeScholarshipList}/>:null}
            {props.categoryList.includes('Other')?<OtherTypes categoryList={props.categoryList} allCategories={allCategories} typeOtherList={props.typeOtherList} setTypeOtherList={props.setTypeOtherList}/>:null}
        </div>
    )
}

export default CategoryWrapper;