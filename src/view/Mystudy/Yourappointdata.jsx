import React, { useState } from "react";
import "../Mystudy/style.css";
import "../Mystudy/responsive.css";

const Yourappointdata = () => {
  const [activeTab, setActiveTab] = useState("Today");

  // Tab titles and content
  const tabs = [
    { title: "Today", content: "Monday July 29, 2024" },
    { title: "Overall", content: "Monday July 29, 2024" },
  ];

  return (
    <div className="Yourappointment">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Your Appointment</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="AppoitmentData">
        <div className="container">
          <div className="searchbox position-relative">
            <input
              type="search"
              placeholder="Search here..."
              //value=""
            />
            <em className="fa fa-search"></em>
          </div>
          <div className="tabbingshow">
            <div className="tabs">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`tab-button ${
                    tab.title === activeTab ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.title)}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="tab-content">
                {activeTab === "Today" ?
                <>
                  <div className="dataShow">
                    <h3 className="changeText">Monday July 29, 2024</h3>
                    <div className="joinclass">
                      <div className="mainportion">
                        <div className="imgname">
                            <img src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/sumer-sir.svg" />
                        </div>
                        <div className="namedata">
                            <h3>Dr. Sumer Sethi</h3>
                            <h4>21st November 2024</h4>
                            <p>03:00 PM - 04:00 PM</p>
                        </div>
                      </div>
                      <div className="joinbtn">
                          <button type="button">Join Now</button>
                      </div>
                    </div> 
                    <div className="joinclass">
                        <div className="mainportion">
                            <div className="imgname">
                                <img src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/sumer-sir.svg" />
                            </div>
                            <div className="namedata">
                                <h3>Dr. Sumer Sethi</h3>
                                <h4>21st November 2024</h4>
                                <p>03:00 PM - 04:00 PM</p>
                            </div>
                        </div>
                        <div className="joinbtn">
                            <button type="button">Join Now</button>
                        </div>
                    </div> 
                </div> 
                </>
                  
                : <>
                <div className="dataShow">
                  <h3 className="changeText">All Appointment</h3>
                  <div className="joinclass">
                    <div className="mainportion">
                        <div className="imgname">
                            <img src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/sumer-sir.svg" />
                        </div>
                        <div className="namedata">
                            <h3>Dr. Sumer Sethi</h3>
                            <h4>21st November 2024</h4>
                            <p>03:00 PM - 04:00 PM</p>
                        </div>
                    </div>
                    <div className="joinbtn">
                        <button type="button">Join Now</button>
                    </div>
                  </div>
                  <div className="joinclass">
                    <div className="mainportion">
                      <div className="imgname">
                        <img src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/sumer-sir.svg" />
                      </div>
                      <div className="namedata">
                        <h3>Dr. Sumer Sethi</h3>
                        <h4>21st November 2024</h4>
                        <p>03:00 PM - 04:00 PM</p>
                      </div>
                    </div>
                    <div className="joinbtn">
                      <button type="button">Join Now</button>
                    </div>
                  </div>
                  <div className="joinclass">
                    <div className="mainportion">
                      <div className="imgname">
                        <img src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/sumer-sir.svg" />
                      </div>
                      <div className="namedata">
                        <h3>Dr. Sumer Sethi</h3>
                        <h4>21st November 2024</h4>
                        <p>03:00 PM - 04:00 PM</p>
                      </div>
                    </div>
                    <div className="joinbtn">
                      <button type="button">Join Now</button>
                    </div>
                  </div>
                </div>
              </>
              
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Yourappointdata;

