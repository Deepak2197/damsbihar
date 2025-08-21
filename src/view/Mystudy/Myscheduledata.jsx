import React, { useState, useEffect } from "react";
import "../Mystudy/style.css";
import "../Mystudy/responsive.css";
import { format, addDays, subDays, addMonths, subMonths, isToday } from "date-fns";
import {useNavigate } from "react-router-dom";


const Myscheduledata = () => {
  const [activeTab, setActiveTab] = useState(1);

  // Tab titles and content
  const tabs = [
    { title: "Live Class Schedule", id: 1 },
    { title: "Attendance", id: 2 },
  ];
  const [activeTab1, setActiveTab1] = useState(1);

  // Tab titles and content
  const tabs1 = [
    { title: "Today", id1: 1 },
    { title: "Overall", id1: 2 },
  ];

 
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/mark-attendance");
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [displayMonth, setDisplayMonth] = useState(new Date());

  // Generate days for the week view
  const generateDays = () => {
    const days = [];
    for (let i = -7; i <= 7; i++) {
      days.push(addDays(currentDate, i));
    }
    return days;
  };

  const [days, setDays] = useState(generateDays());

  useEffect(() => {
    setDays(generateDays());
  }, [currentDate]);

  // Handle navigation for days
  const goToNextDay = () => {
    setCurrentDate((prev) => addDays(prev, 1));
  };

  const goToPrevDay = () => {
    setCurrentDate((prev) => subDays(prev, 1));
  };

  // Handle month navigation
  const goToNextMonth = () => {
    setDisplayMonth((prev) => addMonths(prev, 1));
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const goToPrevMonth = () => {
    setDisplayMonth((prev) => subMonths(prev, 1));
    setCurrentDate((prev) => subMonths(prev, 1));
  };


  return (
    <div className='ScheduleClass'>
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Class Schedule</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='classSchedule'>
        <div className='container'>
          <div className='searchbox position-relative'>
            <input
            type="search"
            placeholder="Search here..."
            //value=""
          />
            <em className='fa fa-search'></em>
          </div>

          <div className="tabbingshow">
            <div className="tabs">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`tab-button ${
                    tab.id === activeTab ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="tab-content">
                {activeTab ===1?
                <>
                    <div className="calenderData">
                      <div className="date-picker-container">
                        <div className="month-navigation">
                          <button onClick={goToPrevMonth}>&lt;</button>
                          <h2>{format(displayMonth, "MMMM yyyy")}</h2>
                          <button onClick={goToNextMonth}>&gt;</button>
                        </div>
                        <div className="day-navigation">
                          <button onClick={goToPrevDay}>&lt;</button>
                          <div className="days-container">
                            {days.map((day, index) => (
                              <div
                                key={index}
                                className={`day ${isToday(day) ? "today" : ""} ${
                                  format(day, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd") ? "selected" : ""
                                }`}
                                onClick={() => setCurrentDate(day)}
                              >
                                <div className="day-name">{format(day, "EEE")}</div>
                                <div className="day-number">{format(day, "d")}</div>
                              </div>
                            ))}
                          </div>
                          <button onClick={goToNextDay}>&gt;</button>
                        </div>
                      </div>
                    </div>
                    <div className="Logistmain">
                      <div className="Radiologist">
                        <div className="logistinner">
                          <div className="logistimg">
                            <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/radiologist.svg' />
                          </div>
                          <div className="textonline">
                            <h3>Radiologist <span>(Online)</span></h3>
                            <p>Dr. Sumer Sethi</p>
                          </div>
                        </div>
                        <div className="enterClass">
                           <button type="button" onClick={handleClick}>Enter Class</button>
                        </div>
                      </div>
                      <div className="Datedata">
                        <h4>Monday, 29 July 2024</h4>
                        <h4>11:00 AM - 01:00 PM</h4>
                      </div>
                    </div>
                    <div className="Logistmain">
                      <div className="Radiologist">
                        <div className="logistinner">
                          <div className="logistimg">
                            <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/radiologist.svg' />
                          </div>
                          <div className="textonline">
                            <h3>Radiologist <span>(Offline)</span></h3>
                            <p>Dr. Sumer Sethi</p>
                          </div>
                        </div>
                        <div className="enterClass">
                           <button type="button" onClick={handleClick}>Enter Class</button>
                        </div>
                      </div>
                      <div className="Datedata">
                        <div className="timedata">
                          <h4>Monday, 29 July 2024</h4>
                          <p>Center Location - New Delhi </p>
                        </div>
                        <div className="timedata"><h4>4:00 PM - 06:00 PM</h4></div>
                      </div>
                    </div>
                    <div className="Logistmain">
                      <div className="Radiologist">
                        <div className="logistinner">
                          <div className="logistimg">
                            <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/radiologist.svg' />
                          </div>
                          <div className="textonline">
                            <h3>Radiologist <span>(Offline)</span></h3>
                            <p>Dr. Sumer Sethi</p>
                          </div>
                        </div>
                        <div className="enterClass">
                           <button type="button" onClick={handleClick}>Enter Class</button>
                        </div>
                      </div>
                      <div className="Datedata">
                        <div className="timedata">
                          <h4>Monday, 29 July 2024</h4>
                          <p>Center Location - New Delhi </p>
                        </div>
                        <div className="timedata"><h4>4:00 PM - 06:00 PM</h4></div>
                      </div>
                    </div>
                </>
                :<>
                    <div className="Attendacetab">
                        <div className="tabs">
                          {tabs1.map((tab, index) => (
                            <button
                              key={index}
                              className={`tab-button ${
                                tab.id1 === activeTab1 ? "active" : ""
                              }`}
                              onClick={() => setActiveTab1(tab.id1)}
                            >
                              {tab.title}
                            </button>
                          ))}
                        </div>
                        <div className="tabData">
                          {activeTab1 ===1?
                            <>
                              <div className="Daypresent">
                                <div className="dataDate">
                                    <h4>Monday July 29, 2024</h4>
                                </div>
                                <div className="dataDate">
                                    <ul>
                                        <li className="text-danger"><em className="fa fa-circle"></em>1 Absent</li>
                                        <li className="text-success"><em className="fa fa-circle"></em>1 Present</li>
                                    </ul>
                                </div>
                              </div>
                              <div className="dateGroup">
                                <div className="setalldata">
                                  <div className="timeset">
                                    <h3>11:00 AM</h3>
                                    <h3>1:00 PM</h3>
                                  </div>
                                  <div className="radiodata">
                                    <h4>Radiologist <span>(Online)</span></h4>
                                    <p>Dr. Sumer Sethi</p>
                                  </div>
                                </div>
                                <div className="absent">
                                    A
                                </div>
                              </div>
                              <div className="dateGroup">
                                <div className="setalldata">
                                  <div className="timeset">
                                    <h3>4:00 AM</h3>
                                    <h3>6:00 PM</h3>
                                  </div>
                                  <div className="radiodata">
                                    <h4>Radiologist <span>(Offline)</span></h4>
                                    <p>Dr. Sumer Sethi</p>
                                  </div>
                                </div>
                                <div className="absent present">
                                    P
                                </div>
                              </div>
                            </>
                            :<>
                              <div className="Daypresent">
                                <div className="dataDate">
                                    <h4>Attendance Summary</h4>
                                </div>
                                <div className="dataDate">
                                    <ul>
                                        <li className="text-danger"><em className="fa fa-circle"></em>20 Absent</li>
                                        <li className="text-success"><em className="fa fa-circle"></em>200 Present</li>
                                    </ul>
                                </div>
                              </div>
                              <div className="dateGroup">
                                <div className="setalldata">
                                  <div className="timeset">
                                    <h3>11:00 AM</h3>
                                    <h3>1:00 PM</h3>
                                  </div>
                                  <div className="radiodata">
                                    <h4>Radiologist <span>(Online)</span></h4>
                                    <p>Dr. Sumer Sethi</p>
                                  </div>
                                </div>
                                <div className="absent">
                                    A
                                </div>
                              </div>
                              <div className="dateGroup">
                                <div className="setalldata">
                                  <div className="timeset">
                                    <h3>4:00 AM</h3>
                                    <h3>6:00 PM</h3>
                                  </div>
                                  <div className="radiodata">
                                    <h4>Radiologist <span>(Offline)</span></h4>
                                    <p>Dr. Sumer Sethi</p>
                                  </div>
                                </div>
                                <div className="absent present">
                                    P
                                </div>
                              </div>
                              <div className="dateGroup">
                                <div className="setalldata">
                                  <div className="timeset">
                                    <h3>11:00 AM</h3>
                                    <h3>1:00 PM</h3>
                                  </div>
                                  <div className="radiodata">
                                    <h4>Radiologist <span>(Online)</span></h4>
                                    <p>Dr. Sumer Sethi</p>
                                  </div>
                                </div>
                                <div className="absent">
                                    A
                                </div>
                              </div>
                              <div className="dateGroup">
                                <div className="setalldata">
                                  <div className="timeset">
                                    <h3>4:00 AM</h3>
                                    <h3>6:00 PM</h3>
                                  </div>
                                  <div className="radiodata">
                                    <h4>Radiologist <span>(Offline)</span></h4>
                                    <p>Dr. Sumer Sethi</p>
                                  </div>
                                </div>
                                <div className="absent present">
                                    P
                                </div>
                              </div>
                            </>
                          }
                        </div>
                     
                    </div>
                </>
                
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Myscheduledata