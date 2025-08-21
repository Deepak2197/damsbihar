import React, { useEffect, useState } from "react";
import "../../assets/css/home-page/style.css";
import "../OurTeam/style.css";
function OurTeam() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="Ourteam position-relative">
      <div className="page-content position-relative">
        {/* <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li><a href={'/'}>Home</a></li>
                        <li>Our Team </li>
                    </ul>
                </div>
            </div> */}
      </div>
      <section className="ourTeamData">
        <div className="container">
          <div className="TheTeam">
            <h2>
              <img
                className="titleimg"
                src="../images/homePage/theTeam.png"
                alt=""
              />
              <span>Meet</span>The Team
            </h2>
            <div className="mainSec">
              <div className="ceoData">
                <div className="row">
                  <div className="col-12 col-md-5 col-lg-6">
                    <div className="imgData">
                      <img
                        src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/course_file_meta/65464897383165sumerSir.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-7 col-lg-6">
                    <div className="dataText">
                      <h3>Dr. Sumer Sethi</h3>
                      <h4>Radiology | Founder DAMS</h4>
                      <p>
                        Sumer Sethi, MD is an eminent Radiologist, Entrepreneur,
                        Blogger, Innovator, TedX Speaker and motivator, who has
                        not only done pioneering work in his field, but has
                        mentored lakhs of medical graduates in the last two
                        decades...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ceoData">
                <div className="row">
                  <div className="col-12 col-md-5 col-lg-6">
                    <div className="imgData">
                      <img
                        src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/course_file_meta/66501086571540deeptiMam.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-7 col-lg-6">
                    <div className="dataText dataWidth">
                      <h3>Dr Deepti Bahl</h3>
                      <h4>MBBS, MS - Obstetrics & Gynaecology</h4>
                      <p>
                        Dr. Deepti Bahl is a Gynecologist and has an experience
                        of 13 years in this field. She completed MBBS from
                        U.Delhi in 2004 and MS - Obstetrics & Gynaecology from
                        Lady Hardinge Medical College, New Delhi in 2009...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="TeamData">
            <div className="nameText">
              <img src={`${window.IMG_BASE_URL}/team1.png`} alt="" />
              <h3>Rajwant Kaur</h3>
              <p>Chief Operating Officer</p>
              {/* <p>USMLE EDGE Educationist</p> */}
            </div>
            <div className="nameText">
              <img src={`${window.IMG_BASE_URL}/team2.png`} alt="" />
              <h3>Dr. Mala Srinivasan</h3>
              <p>
                Chief International Academic{" "}
                <span className="d-block">Initiatives and Alliances</span>
              </p>
            </div>
            <div className="nameText">
              <img src={`${window.IMG_BASE_URL}/team4.png`} alt="" />
              <h3>Monika Gupta</h3>
              <p>Chief Financial Officer</p>
            </div>
            <div className="nameText">
              <img src={`${window.IMG_BASE_URL}/team6.png`} alt="" />
              <h3>Sunny Pahuja</h3>
              <p>Vice President (Marketing)</p>
            </div>
            <div className="nameText">
              <img src={`${window.IMG_BASE_URL}/team3.png`} alt="" />
              <h3>Jitendra Sharma</h3>
              <p>Chief Technology Officer</p>
            </div>

            {/* <div className="nameText">
              <img src={`${window.IMG_BASE_URL}/team5.png`} alt="" />
              <h3>Ayush Sharma</h3>
              <p>
                Chief Business Development
                <span className="d-block">Officer</span>{" "}
              </p>
            </div> */}
          </div>

          <div className="allTeamData">
            <div className="showdata">
              <div className="joinGroup d-none">
                <h2>IT Team</h2>
                {/* <img src="/team-img.svg" alt="" /> */}
              </div>
              <div className="joinGroup marginSet m-0">
                <h2>Our Team</h2>
                <div className="image-container">
                  <img
                    src={`${window.IMG_BASE_URL}/saleteam.jpg`}
                    alt="Our Team"
                    className="zoom-image"
                  />
                </div>
              </div>
            </div>
            <div className="showdata d-none">
              <div className="joinGroup">
                <h2>Marketing Team</h2>
                <img src="/team-img.svg" alt="" />
              </div>
              <div className="joinGroup marginSet">
                <h2>Support Team</h2>
                {/* <img src="/team-img.svg" alt="" /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurTeam;
