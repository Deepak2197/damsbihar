import React from "react";
import "../../assets/css/home-page/responsive.css"
import "../../assets/css/home-page/style.css"
import "../../assets/newjs/style.css"
import "../../assets/new_design/css/footer.css"
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
function CoursesDqb() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const requestData = {
    user_id: '4',
   
 };

  useEffect(() => {
    axiosInstance
      .post(API_ENDPOINTS.HOMEPAGE_INDEX.HOMESCREEN_MYPLANE_V2, requestData)

      .then((response) => {
        setData(response.data.data.category);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleLinkClick = (Catid, course_name, PlanType) => {
    
    localStorage.setItem('Catid', JSON.stringify(Catid));
    localStorage.setItem('Course_Name', JSON.stringify(course_name));

  };

  return (
    <section className="coursename-area">
      <div className="position-relative">
        <div className="box-tringle float-bob-y">
          <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/animation-img/shap-tringle.png" loading="lazy" alt="icon image" />
        </div>
        <div className="box-tringle1 float-bob-x">
          <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/animation-img/shape-3.png" loading="lazy" alt="icon image" />
        </div>
      </div>
      <div className="container">
        <div className="row">
          {data.map((course, index) => (
            <div className="col-6 col-sm-3 col-md-3 col-lg-3 mb-3" key={index }>

              <Link to={course.plan_type === '1' ? `/${course.name}` : '/course_category'} onClick={() => handleLinkClick(course.id, course.name, course.plan_type)} data-id={course.id}>
                <div className="mix-group cat1">
                  <h3>{course.name}</h3>
                  <img src={course.image} loading="lazy" alt="icon image" />
                  <span className="btncot cartbtn">Explore <em className="fa fa-angle-right"></em></span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section >

  );
}

export default CoursesDqb