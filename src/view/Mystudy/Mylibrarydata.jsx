import React, { useState } from 'react';
import "../Mystudy/style.css";
import "../Mystudy/responsive.css";
import { Link } from 'react-router-dom';

const Mylibrarydata = () => {
  return (
    <div className='Mylibrarydata'>
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>My Library</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='Mylibrarysec'>
        <div className='container'>
          <div className='searchbox position-relative'>
              <input
              type="search"
              placeholder="Search here..."
              //value=""
            />
            <em className='fa fa-search'></em>
          </div>
          <div className='recentActivity RecentlyAdd'>
              <h2>Recently Add</h2>
              <div className='recentGroup'>
                <div className='imgText'>
                    <div className='videoImg'>
                      <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/vedio-img.svg' />
                    </div>
                    <div className='textG'>
                        <h3>Video</h3>
                        <h4 className='m-0'>Pathology (Hemat & Sys-
                          Path) Dr. Sanjeev</h4>
                    </div>
                </div>
                <div className='imgText'>
                    <div className='pdf'>
                      <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/pdf.svg' />
                    </div>
                    <div className='textG'>
                        <h3>Notes</h3>
                        <h4 className='m-0'>Pathology (Hemat & Sys-
                          Path) Dr. Sanjeev</h4>
                    </div>
                </div>
                <div className='imgText'>
                    <div className='videoImg'>
                      <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/vedio-img.svg' />
                    </div>
                    <div className='textG'>
                        <h3>Notes</h3>
                        <h4 className='m-0'>Pathology (Hemat & Sys-
                          Path) Dr. Sanjeev</h4>
                    </div>
                </div>
              </div>
              <div className='courseLinkdata'>
                  <div className='setarround'>
                    <div className='innertext'>
                      <div className='livedata'>
                        <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/libray-icon1.svg' />
                        <h3>Live Course Videos</h3>
                      </div>
                      <div className='btnLink'>
                        <Link to="/live-coursedata"><em className='fa fa-angle-right'></em></Link>
                      </div>
                    </div>
                    <div className='innertext'>
                      <div className='livedata'>
                        <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/libray-icon2.svg' />
                        <h3>Recoded Class Videos</h3>
                      </div>
                      <div className='btnLink'>
                        <Link to="//"><em className='fa fa-angle-right'></em></Link>
                      </div>
                    </div>
                    <div className='innertext'>
                      <div className='livedata'>
                        <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/libray-icon3.svg' />
                        <h3>Test Series Videos</h3>
                      </div>
                      <div className='btnLink'>
                        <Link to="//"><em className='fa fa-angle-right'></em></Link>
                      </div>
                    </div>
                    <div className='innertext'>
                      <div className='livedata'>
                        <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/libray-icon4.svg' />
                        <h3>Live Course Notes</h3>
                      </div>
                      <div className='btnLink'>
                        <Link to="//"><em className='fa fa-angle-right'></em></Link>
                      </div>
                    </div>
                    <div className='innertext'>
                      <div className='livedata'>
                        <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/libray-icon5.svg' />
                        <h3>Recoded Class Notes</h3>
                      </div>
                      <div className='btnLink'>
                        <Link to="//"><em className='fa fa-angle-right'></em></Link>
                      </div>
                    </div>
                   
                  </div>
              </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Mylibrarydata