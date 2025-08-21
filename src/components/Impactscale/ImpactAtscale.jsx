import React from "react";
import "../../assets/css/home-page/style.css";
function ImpactAtscale() {
  return (
    <section className="impact-at-scale position-relative">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
            <div className="globe_heading text-center">
              <h2 className="font-weight-bold mb-3">Impact At scale </h2>
              <p>Making education affordable and accessible across the globe</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3">
            <div className="impact_text">
              <img className="" src="/question-and-answer.svg" loading="lazy" alt="icon image" />
              <h3>25 K +</h3>
              <p className="m-0">Questions &amp; Q Bank</p>
            </div>
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3">
            <div className="impact_text">
              <img className="" src="/online-course.svg" loading="lazy" alt="icon image" />
              <h3>200 +</h3>
              <p className="m-0">Courses</p>
            </div>
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3">
            <div className="impact_text">
              <img className="videcamera" src="/video-camera.svg" loading="lazy" alt="icon image" />
              <h3>2.5 M +</h3>
              <p className="m-0">Video Lecture</p>
            </div>
          </div>
          <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3">
            <div className="impact_text">
              <img className="" src="/download-icon.svg" loading="lazy" alt="icon image" />
              <h3>1 M +</h3>
              <p className="m-0">Downloads</p>
            </div>
          </div>
          {/* 
            <ul>
            <li>25 K +<span className="d-block">Questions &amp; Q Bank</span>
            </li>
            <li>200 +<span className="d-block">Courses</span>
            </li>
            <li>2.5 M+<span className="d-block">Video Lecture</span>
            </li>
                <li>Million<span className="d-block">Downloads</span>
            </li>
        </ul> */}
          {/* <div className="col-12 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                <div className="impact_text">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <ul>
                               <li>25 K +<span className="d-block">Questions &amp; Q Bank</span>
                                </li>
                                <li>200 +<span className="d-block">Courses</span>
                                </li>
                                <li>2.5 M+<span className="d-block">Video Lecture</span>
                                </li>
                                  <li>Million<span className="d-block">Downloads</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
          {/* <div className="col-12 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                <div className="right-box position-relative">
                    <a href="javascript:;">
                        <div className="mixed-box q-bank-box">
                            <div className="mixed-text q-bank">
                                Q Bank
                            </div>
                        </div>
                    </a>
                    <a href="javascript:;">
                        <div className="mixed-box live-class-box">
                            <div className="mixed-text live-class-text">
                                Live className
                            </div>
                        </div>
                    </a>
                    <a href="javascript:;">
                        <div className="mixed-box mcq-box">
                            <div className="mixed-text mcq-text">
                                MCQ-based Sessions
                            </div>
                        </div>
                    </a>
                    <a href="javascript:;">
                        <div className="mixed-box tnd-box">
                            <div className="mixed-text tnd-text">
                                TND Session
                            </div>
                        </div>
                    </a>
                    <a href="javascript:;">
                        <div className="mixed-box outs-box">
                            <div className="mixed-text outs-text">
                                Outstanding Success Rate
                            </div>
                        </div>
                    </a>
                    <a href="javascript:;">
                        <div className="mixed-box test-box">
                            <div className="mixed-text test-text">
                                Test Series
                            </div>
                        </div>
                    </a>
                    <a href="javascript:;">
                        <div className="mixed-box detail-box">
                            <div className="mixed-text detail-text">
                                Detailed Notes
                            </div>
                        </div>
                    </a>
                </div>
            </div> */}
        </div>
      </div>
    </section>
  );
}

export default ImpactAtscale;
