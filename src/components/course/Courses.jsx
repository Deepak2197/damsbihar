import React from "react";
import "../../assets/css/home-page/responsive.css"
import "../../assets/css/home-page/style.css"
import "../../assets/newjs/style.css"
import "../../assets/new_design/css/footer.css"
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axiosInstance from "../../API/axiosConfig";

function Courses({ data }) {
  const Neetpg = `${window.IMG_BASE_URL}/neet-pg.png`
  const Tnd = `${window.IMG_BASE_URL}/tnd.png`
  const Mbbs = `${window.IMG_BASE_URL}/mbbs.png`
  const Fmge = `${window.IMG_BASE_URL}/fmge.png`
  const Usmle = `${window.IMG_BASE_URL}/usmle.png`;
  const Neetmds = `${window.IMG_BASE_URL}/neet-mds.png`;
  const Medicalcme = `${window.IMG_BASE_URL}/cme.png`;
  const Neetss = `${window.IMG_BASE_URL}/neet-ss.png`;
  const Nursing = `${window.IMG_BASE_URL}/nursing.svg`;

  const images = [Neetpg, Tnd, Mbbs, Fmge, Usmle, Neetmds, Medicalcme, Neetss, Nursing];
  const [imageIndex, setImageIndex] = useState(0);

  const handleLinkClick = (Catid, course_name, PlanType) => {
    localStorage.setItem('Catid', JSON.stringify(Catid));
    localStorage.setItem('Course_Name', JSON.stringify(course_name));
  };
  const alterSpace = (inputString) => {
    // Use the replace method with a regular expression to replace spaces with hyphens
    return inputString.replace(/ /g, '-');
  }
  return (
    <section className="coursename-area">
      <div className="container">
        <div className="courseplanBg" style={{ width: "100%", float: "left" }}>
          {data?.map((course, index) => (
            <Link to={course.plan_type === '1' ? `/courseplan/${alterSpace(course?.name)}` : '/course_category'} onClick={() => handleLinkClick(course.id, course.name, course.plan_type)} data-id={course.id} key={index}>
              <div className="mix-group cat1">
                <img className="" src={images[index % images?.length]} loading="lazy" alt="icon image" />
                <h3>{course?.name}</h3>
                <span className="btncot cartbtn">Explore <em className="fa fa-angle-right ml-2"></em></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section >
  );
}

export default Courses;
