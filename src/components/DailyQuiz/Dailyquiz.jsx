import React from "react";
import "../../assets/css/home-page/style.css";
import "../../assets/css/home-page/responsive.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../apiConfig";
import { useNavigate } from "react-router-dom";

const Dailyquiz = ({ dailyQuizData }) => {
  const [dailyQuiz, setData] = useState([]);
  const user_id = sessionStorage.getItem("id");
  const navigate = useNavigate();

  const start_test_series_dqb = (testid) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;

      // Open the new window
      window.open(`/test-home/dqb/${user_id}s${testid}`, "_blank", features);
    } catch (error) {}
  };

  const Result_dqb = (sid) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;

      // Open the new window
      window.open(`/testresult/dqb/${user_id}s${sid}`, "_blank", features);
    } catch (error) {}
  };

  return (
    <>
      <section className="daily-quiz-area position-relative">
        <div className="container">
          <h2>
            <img
              className="titleimg"
              src={`${window.IMG_BASE_URL}/work.svg`}
              loading="lazy"
              alt="work image"
            />
            <span>Daily</span>Quiz
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <h6
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/all-daily-quiz", { state: user_id })}
            >
              See all
            </h6>
          </div>
          <div className="row mt-5">
            {dailyQuizData?.dailyQuiz?.map((dailyquiz, index) => (
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4"
                key={index}
              >
                <div className="anatomytopic">
                  <div className="row">
                    <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-8">
                      <ul>
                        <li>
                          <img
                            src={`${window.IMG_BASE_URL}/anatomy-icon.png`}
                            loading="lazy"
                            alt="icon image"
                          />
                        </li>
                        <li>
                          Topic{" "}
                          <span className="d-block">{dailyquiz?.dq_title}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-4">
                      <ul style={{ float: "right" }}>
                        <li>
                          <span className="d-block">
                            {new Date(
                              parseInt(dailyquiz?.test_start_date * 1000)
                            ).toLocaleDateString()}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-7 col-sm-7 col-md-7 col-lg-7">
                      <ul>
                        <li>
                          <img
                            src={`${window.IMG_BASE_URL}/qa-icon.png`}
                            loading="lazy"
                            alt="icon image"
                          />
                        </li>
                        <li className="text-dark font-weight-bold tono">
                          <span className="d-block">5 </span>Total No Of
                          Questions
                        </li>
                      </ul>
                    </div>
                    <div className="col-5 col-sm-5 col-md-5 col-lg-5">
                      <ul className="status">
                        <li>
                          <img
                            src={`${window.IMG_BASE_URL}/watch-icon.png`}
                            loading="lazy"
                            alt="icon image"
                          />
                        </li>
                        <li className="text-dark">
                          <span className="d-block">5 Minutes</span> Duration
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="plybtn text-right mb-2">
                        {dailyquiz?.segment_id == "0" ? (
                          <a
                            onClick={() => start_test_series_dqb(dailyquiz.id)}
                            id="timer50602"
                            className="data-timer"
                          >
                            Play Now
                          </a>
                        ) : (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              Result_dqb(dailyquiz.segment_id);
                            }}
                            id="timer50602"
                            className="data-timer"
                          >
                            Result
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Repeat the above structure for other quiz topics */}
          </div>
        </div>
      </section>
    </>
  );
};
export default Dailyquiz;
