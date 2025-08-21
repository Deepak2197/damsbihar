import React, { useState } from 'react';
import "../Mystudy/style.css";
import "../Mystudy/responsive.css";
import { Link } from 'react-router-dom';

const Mylibrarynodownload = () => {
  return (
    <div className='Mylibrarynodownload'>
        <div className="page-content position-relative">
            <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>My Library / No Download Available</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='Nodownload'>
            <div className='container'>
                <div className='showdata'>
                    <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/nodownload.svg' alt="" />
                    <div className='downloadtext'>
                        <h2>No Download Available</h2>
                        <p>Explore and download your favourite videos, notes and shows to watch on the go</p>
                    </div>
                   
                    <Link to="/" className='gotohome'>Go to Home</Link>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Mylibrarynodownload