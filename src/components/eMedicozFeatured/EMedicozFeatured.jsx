import "../../assets/css/shortcodes/shortcodes.css";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axiosInstance from '../../API/axiosConfig';
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const correctStyle = { width: '198px', marginRight: '10px' };

    const EMedicozFeatured = () => {
        const [newsData, setnewsData] = useState([]);
        const user_id = (sessionStorage.getItem("id"))?sessionStorage.getItem("id"):4;

            useEffect(() => {
              axiosInstance
                .post(API_ENDPOINTS.HOMEPAGE_INDEX.GET_ALL_WEBNEWS, {
                  user_id: user_id,
                })
                .then((response) => {
                  setnewsData(response.data.data);
                })
                .catch((error) => {
                  console.error(
                    "Error fetching latest article and news data:",
                    error
                  );
                });
            }, []);
  return(

    <div className="section-area  featuredBg">
        <div className="position-relative" style={{display:"none"}}>
            <div className="sec-shape float-bob-y">
                <img src="/shapes.png" loading="lazy" alt="icon image"/>
            </div>
            <div className="sec-shape1 float-bob-x">
                <img src="/shapes.png" loading="lazy" alt="icon image"/>
            </div>
        </div>
        <div className="container scroll-group">
            <div className="row">
                <div className="col-lg-12">
                    <div className="text-center">
                        <h2 className="font-weight-bold">Dams <span>Has Been Featured In</span></h2>
                    </div>
                </div>
            </div>
            <div className="row">
            {newsData?.map((resullt,i) => (

                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 article-img" key={i}>
                    <div className="item position-relative">
                     <img src={resullt.news_img_url} loading="lazy" alt="Thumb"/>
                        <div className="single-item thumb">
                            <div className="info-bx textpad textsdo text-center">
                                <h6>{resullt.news_content}</h6>
                                <Link to={resullt.news_url} className="btn-more" target="_blank">Read More <i className="arrow_right"></i></Link>
                            </div>
                        </div> 
                    </div>
                </div>
                ))}
            </div>
        </div>

        <div className="thought">
            <div className="container">
                <div className='textwritten text-center'>
                    <div className='row'>
                        <div className='col-12 col-md-12 col-lg-12'>
                            <h3>" That fire in your belly is there for a reason</h3>
                            <h3 className='difcolor'>do not ignore it rather, let it burn"</h3>
                            {/* <img className="dataimg" src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/banner_images/6747420Dairy%201.jpg" loading="lazy" alt="icon image" /> */}
                            <p>Dr. Sumer Sethi</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
   

  );
}
export default EMedicozFeatured