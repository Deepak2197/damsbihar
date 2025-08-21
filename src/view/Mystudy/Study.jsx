import React, { useState } from "react";
import "../Mystudy/style.css";
import "../Mystudy/responsive.css";
import { Link } from "react-router-dom";
import { Flex, Progress } from "antd";

const Study = ({ progress }) => {
  const [selectedValue, setSelectedValue] = useState("");
  // Handle change event
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    
  };

  return (
    <div className="Mystudy">
      <div className="page-content bg-white position-relative">
        <div className="breadcrumb-row custombread">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>My Study</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="fixdwidth">
        <div className="container">
          <div className="dropbtn">
            <select value={selectedValue} onChange={handleChange}>
              <option value="">FMGE Face To Face</option>
              <option value="option1">FMGE Online</option>
            </select>
            {/* <p style={{ marginTop: '20px' }}>
              <strong>Selected Value:</strong> {selectedValue || "None"}
            </p> */}
          </div>
          <div className="Activatenow">
            <div className="textdata">
              <p className="m-0">
                Activate your plan with in <span>5 days</span>
              </p>
            </div>
            <div className="activetBtn">
              <button type="button">Activate Now</button>
            </div>
          </div>
          <div className="groupbox">
            <div className="imgText">
              <Link to="/my-library">
                <img
                  src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/icon1.svg"
                  alt=""
                />
                <h4>My Library</h4>
              </Link>
            </div>
            <div className="imgText">
              <Link to="/my-scheduledata">
                <img
                  src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/icon3.svg"
                  alt=""
                />
                <h4>Class Schedule</h4>
              </Link>
            </div>
            <div className="imgText">
              <Link to="/your-appointment">
                <img
                  src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/icon2.svg"
                  alt=""
                />
                <h4>Your Appointment </h4>
              </Link>
            </div>
          </div>
          <div className="LiveClass">
            <h2>Live Class</h2>
            <div className="liveVideo">
              <div className="imgTextset">
                <img
                  className="liveimg"
                  src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/live.svg"
                  alt="Live"
                />
                <div className="images">
                  <img
                    src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/live-img.svg"
                    alt="Live"
                  />
                </div>
                <div className="textData">
                  <h3>Radiology Live Class</h3>
                  <h4>Dr. Sumer Sethi</h4>
                  <p>Start on 04:00 pm</p>
                  <p className="m-0">Monday, 25th Nov 2024</p>
                  <button type="button">Join Now</button>
                </div>
              </div>
              <div className="imgTextset">
                <img
                  className="liveimg"
                  src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/live.svg"
                  alt="Live"
                />
                <div className="images">
                  <img
                    src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/live-img.svg"
                    alt="Live"
                  />
                </div>
                <div className="textData">
                  <h3>Radiology Live Class</h3>
                  <h4>Dr. Sumer Sethi</h4>
                  <p>Start on 04:00 pm</p>
                  <p className="m-0">Monday, 25th Nov 2024</p>
                  <button type="button">Join Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="attempdata">
            <div className="testAttemp">
              <Link to="//">
                <h1>74/581</h1>
                <h3>Test Attempts</h3>
              </Link>
            </div>
            <div className="testAttemp">
              <Link to="//">
                <h1>74/581</h1>
                <h3>Test Attempts</h3>
              </Link>
            </div>
          </div>
          <div className="maintainStreak">
            <h2 className="text-center">Maintain Your Streak</h2>
            <div className="twoSection">
              <div className="roundCircle">
                <Progress type="circle" percent={75} />
                <img
                  className="liveimg"
                  src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/fire.svg"
                  alt="fire"
                />
              </div>
              <div className="thisWeek">
                <div className="weekslide">
                  <em className="fa fa-angle-left"></em>
                  <h3>This Week</h3>
                  <em className="fa fa-angle-right"></em>
                </div>
                <div className="datatext">
                  <h4>Day 3 Streak</h4>
                  <h5>3/4 Done Today</h5>
                </div>
              </div>
            </div>
            <div className="calData">
              <div className="number">
                <div className="day active"> S </div>
                <p className="m-0">4</p>
              </div>
              <div className="number">
                <div className="day active"> S </div>
                <p className="m-0">5</p>
              </div>
              <div className="number">
                <div className="day"> M </div>
                <p className="m-0">6</p>
              </div>
              <div className="number">
                <div className="day"> T </div>
                <p className="m-0">7</p>
              </div>
              <div className="number">
                <div className="day"> W </div>
                <p className="m-0">8</p>
              </div>
              <div className="number">
                <div className="day"> T </div>
                <p className="m-0">9</p>
              </div>
              <div className="number">
                <div className="day"> F </div>
                <p className="m-0">10</p>
              </div>
            </div>
          </div>

          <div className="mostConsistent">
            <h1 className="text-center">Most Consistent Students</h1>
            <div className="Consistentdata">
              <div className="namewise position-relative">
                <h2>Test Series</h2>
                <div className="studentdata">
                  <img
                    className="image-front"
                    src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/stu.svg"
                    alt="Student"
                  />
                  <img
                    className="image-behind"
                    src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/imgdesign.svg"
                    alt="Student"
                  />
                </div>
                <img
                  className="imageLight"
                  src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/light-img.svg"
                  alt="Design"
                />
                <div className="belowtext mt-3">
                  <h3>247/252</h3>
                  <h5>S Joshan Vinrajkar</h5>
                </div>
              </div>
              <div className="namewise position-relative">
                <h2>Q Bank Module</h2>
                <div className="studentdata">
                  <img
                    className="image-front"
                    src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/stu.svg"
                    alt="Student"
                  />
                  <img
                    className="image-behind"
                    src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/imgdesign.svg"
                    alt="Student"
                  />
                </div>
                <img
                  className="imageLight"
                  src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/light-img.svg"
                  alt="Design"
                />
                <div className="belowtext mt-3">
                  <h3>247/252</h3>
                  <h5>Akanksha Mandal</h5>
                </div>
              </div>
              <div className="namewise position-relative">
                <h2>Test Series</h2>
                <div className="studentdata">
                  <img
                    className="image-front"
                    src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/stu.svg"
                    alt="Student"
                  />
                  <img
                    className="image-behind"
                    src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/imgdesign.svg"
                    alt="Student"
                  />
                </div>
                <img
                  className="imageLight"
                  src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/light-img.svg"
                  alt="Design"
                />
                <div className="belowtext mt-3">
                  <h3>247/252</h3>
                  <h5>S Joshan Vinrajkar</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="groupLink">
            <div className="AiButton Aibg">
              <Link to="/ai-chat">
                <span>
                  <img
                    src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/aiIcon.svg"
                    alt="Ai"
                  />
                </span>
                Your AI Intelligence Report
              </Link>
              <div className="round"></div>
            </div>
            <div className="AiButton">
              <Link to="/viewdetail-analaysis">
                <span>
                  <img
                    src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/analytics.svg"
                    alt="Analaytic"
                  />
                </span>
                View Detailed Analysis
              </Link>
              <div className="round"></div>
            </div>
          </div>

          <div className="recentActivity">
            <h2>Recently Activity</h2>
            <div className="recentGroup">
              <div className="imgText">
                <div className="anatomy">
                  <img
                    src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/anatomy.svg"
                    alt="Anatomy"
                  />
                </div>
                <div className="textG">
                  <h3>Anatomy</h3>
                  <h4 className="m-0">
                    <Link to="//">Recorded Lectures</Link>
                  </h4>
                </div>
              </div>
              <div className="imgText">
                <div className="textSeries">
                  <img
                    src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/test-series.svg"
                    alt="Test Series"
                  />
                </div>
                <div className="textG">
                  <h3>SWT-Orthopedics</h3>
                  <h4 className="m-0">
                    <Link to="//">Test Series</Link>
                  </h4>
                </div>
              </div>
              <div className="imgText">
                <div className="pdf">
                  <img
                    src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/pdf.svg"
                    alt="Pdf"
                  />
                </div>
                <div className="textG">
                  <h3>Abortions & mtp</h3>
                  <h4 className="m-0">
                    <Link to="//">PDF</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          
          <div className="planInclusion">
            <h2>Plan Inclusion</h2>
            <div className="fullwidth">
              <div className="planData">
                <div className="dividesec">
                  <h3>FMGE Interactive APP TND</h3>
                  <p>Complete 40%</p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="dividesec">
                  <Link to="//" className="fontdata">
                    <em className="fa fa-angle-right"></em>
                  </Link>
                </div>
              </div>
              <div className="planData">
                <div className="dividesec">
                  <h3>DQB - G.O.A.T With Video Solutions</h3>
                </div>
                <div className="dividesec">
                  <Link to="//" className="fontdata">
                    <em className="fa fa-angle-right"></em>
                  </Link>
                </div>
              </div>
              <div className="planData">
                <div className="dividesec">
                  <h3>
                    DAMS Online Test Series ( GT & SWT ) ( With Video Solution)
                  </h3>
                </div>
                <div className="dividesec">
                  <Link to="//" className="fontdata">
                    <em className="fa fa-angle-right"></em>
                  </Link>
                </div>
              </div>
              <div className="planData">
                <div className="dividesec">
                  <h3>FMGE XPRESS (DFX)</h3>
                </div>
                <div className="dividesec">
                  <Link to="//" className="fontdata">
                    <em className="fa fa-angle-right"></em>
                  </Link>
                </div>
              </div>
              <div className="planData">
                <div className="dividesec">
                  <h3>10 X Transform Mentor Duo</h3>
                </div>
                <div className="dividesec">
                  <Link to="//" className="fontdata">
                    <em className="fa fa-angle-right"></em>
                  </Link>
                </div>
              </div>
              <div className="planData">
                <div className="dividesec">
                  <h3>FMGE XPRESS (DFX) New Cycle</h3>
                </div>
                <div className="dividesec">
                  <Link to="//" className="fontdata">
                    <em className="fa fa-angle-right"></em>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
