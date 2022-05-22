import React from 'react'


// images 
import twitter from "../../assets/img/twitter.svg";
import reddit from "../../assets/img/reddit.svg"
import bitcoin from "../../assets/img/bitcointalk.svg";
import producthunt from "../../assets/img/producthunt.svg";
import github from "../../assets/img/github.svg";
import blockstack from "../../assets/img/blockstack.svg";


// custom styles 

import "./socialMedia.style.css";


const SocialMedia = () => {
    return (
        <div className='container'>
            <div className="row">
                <div className='social-media-container'>
                    <a href="#"><img src={twitter} alt="twitter" /></a>
                    <a href="#"><img src={reddit} alt="reddit" /></a>
                    <a href="#"><img src={bitcoin} alt="bitcoin" /></a>
                    <a href="#"><img src={producthunt} alt="producthunt"/></a>
                    <a href="#"><img src={github} alt="github"/></a>
                    <a href="#"><img src={blockstack} alt="blockstack" /></a>
                </div>
            </div>
        </div>
    )
}

export default SocialMedia