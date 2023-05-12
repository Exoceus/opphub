import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import oppTalks from '../../images/landing_page/opptalks.png'
import newsletter from '../../images/landing_page/newsletter.png'
import sectors from'../../images/landing_page/sector banner.png'

export default function BannerSlider() {
    const [bannerIndex, setBannerIndex] = useState(0)

    const bannerData = [
        {
            subtitle: 'OppTalks',
            link: '/opptalks',
            title: 'Webinars for your Post Secondary',
            graphic: oppTalks,
            textColor: 'var(--accent)',
            bgColor: 'var(--blackish)',
            sliderColor: 'var(--whiteish)',
            activeSliderColor: 'var(--accent)'
        },
        {
            subtitle: 'All Opportunities',
            link: '/all-opps',
            title: 'Featured Sectors',
            graphic: sectors,
            textColor: '#fff',
            bgColor: 'var(--dark-green)',
            sliderColor: 'var(--whiteish)',
            activeSliderColor: 'var(--accent)'
        },
        {
            subtitle: 'Stay Up To Date',
            link: '/newsletter',
            title: 'Weekly Newsletter',
            graphic: newsletter,
            textColor: 'var(--blackish)',
            bgColor: 'var(--whiteish)',
            sliderColor: 'var(--blackish)',
            activeSliderColor: 'var(--accent)'
        }
    ]

    const backBanner = (e) => {
        e.preventDefault(); 
        if(bannerIndex === 0){
            setBannerIndex(bannerData.length -1)
        }

        else{
            setBannerIndex(bannerIndex-1)
        }
    }

    const nextBanner = (e) => {
        e.preventDefault(); 

        if(bannerIndex === bannerData.length-1){
            setBannerIndex(0)
        }

        else{
            setBannerIndex(bannerIndex+1)
        }
    }

    return (
        <div className='banner-outer-wrapper'>
            <a className='banner-item-inner-wrapper' style={{'backgroundColor': bannerData[bannerIndex].bgColor, 'color': bannerData[bannerIndex].textColor}} href={bannerData[bannerIndex].link}>
                <div className='banner-item-content-wrapper'>
                    <h6 className='banner-item-subtitle' style={{'color': bannerData[bannerIndex].textColor}}> {bannerData[bannerIndex].subtitle}</h6>
                    <h2 className='banner-item-title' style={{'color': bannerData[bannerIndex].textColor}}>{bannerData[bannerIndex].title}</h2>
                    
                    <img src={bannerData[bannerIndex].graphic} className='banner-item-graphic'/>
                </div>

                <div className='banner-item-slider-wrapper' >
                    <div style={{'color': bannerData[bannerIndex].textColor}} className='banner-item-slider-arrows' onClick={e => {backBanner(e)}}><i class="fas fa-angle-left"></i></div>

                    <div className='banner-slider-items'>
                        {bannerData.map((banner, i) => (
                                <div className='banner-slider-item' onClick={e => { e.preventDefault(); setBannerIndex(i)}} style={(i === bannerIndex) ? {'backgroundColor': bannerData[bannerIndex].activeSliderColor} : {'backgroundColor': bannerData[bannerIndex].sliderColor}}></div>
                            ))}
                    </div>

                    <div style={{'color': bannerData[bannerIndex].textColor}} className='banner-item-slider-arrows' onClick={e => {nextBanner(e)}}><i class="fas fa-angle-right"></i></div>

                </div>
            </a>
        </div>
    )
}
