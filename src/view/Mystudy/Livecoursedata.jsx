import React, { useState } from 'react';
import "../Mystudy/style.css";
import "../Mystudy/responsive.css";
import { Link } from 'react-router-dom';

const Livecoursedata = () => {
  return (
    <div className='LivecourseData'>
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Live Course Videos</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='LiveCourseVideos'>
        <div className='container'>
          <div className='searchbox position-relative'>
            <input
            type="search"
            placeholder="Search here..."
            //value=""
          />
            <em className='fa fa-search'></em>
          </div>
          <div className='courseVideo'>
              <div className='innertext'>
                <div className='livedata'>
                  <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/course-img.svg' />
                  <div className='showtext'>
                    <h3>Live Course Videos</h3>
                    <h4>5 Videos <span><em className='fa fa-circle'></em>544 MB</span></h4>
                  </div>
                </div>
                <div className='btnLink'>
                  <Link to="/course-titlepage"><em className='fa fa-angle-right'></em></Link>
                </div>
              </div>
              <div className='innertext'>
                <div className='livedata'>
                  <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/course-img.svg' />
                  <div className='showtext'>
                    <h3>Physiology</h3>
                    <h4>5 Videos <span><em className='fa fa-circle'></em>544 MB</span></h4>
                  </div>
                </div>
                <div className='btnLink'>
                  <Link to="/course-titlepage"><em className='fa fa-angle-right'></em></Link>
                </div>
              </div>
              <div className='innertext'>
                <div className='livedata'>
                  <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/course-img.svg' />
                  <div className='showtext'>
                    <h3>Biochemistry</h3>
                    <h4>5 Videos <span><em className='fa fa-circle'></em>544 MB</span></h4>
                  </div>
                </div>
                <div className='btnLink'>
                  <Link to="/course-titlepage"><em className='fa fa-angle-right'></em></Link>
                </div>
              </div>
              <div className='innertext'>
                <div className='livedata'>
                  <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/course-img.svg' />
                  <div className='showtext'>
                    <h3>Pathology</h3>
                    <h4>5 Videos <span><em className='fa fa-circle'></em>544 MB</span></h4>
                  </div>
                </div>
                <div className='btnLink'>
                  <Link to="/course-titlepage"><em className='fa fa-angle-right'></em></Link>
                </div>
              </div>
              <div className='innertext'>
                <div className='livedata'>
                  <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/course-img.svg' />
                  <div className='showtext'>
                    <h3>Pharmacology</h3>
                    <h4>5 Videos <span><em className='fa fa-circle'></em>544 MB</span></h4>
                  </div>
                </div>
                <div className='btnLink'>
                  <Link to="/course-titlepage"><em className='fa fa-angle-right'></em></Link>
                </div>
              </div>
          </div>



        </div>
      </div>

    </div>
  )
}

export default Livecoursedata