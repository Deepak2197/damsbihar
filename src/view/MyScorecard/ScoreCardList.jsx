import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { Spinner, Tabs } from "react-bootstrap";
import "../../assets/css/score-card/style.css";

import { Tab } from "bootstrap";

const ScoreCard = () => {
  const { id } = useParams();

  const [scoreData, setScoreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [test, setTest] = [
    { title: "Test Series", value: "TS" },
    { title: "DQB", value: "DQB" },
    { title: "Daily Quiz", value: "DQ" },
  ];
  const dbq = scoreData.filter((itm) => itm.set_type === "0");
  const testSeries = scoreData.filter((itm) => itm.set_type === "1");
  const dailyQuiz = scoreData.filter((itm) => itm.set_type === "2");

  const getScoreList = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/v2_data_model/get_user_given_testseries",
        { user_id: id, start: "0" }
      );
      setScoreData(response.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const bookmark_review = (ids) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;

      // Open the new window
      // window.open(`/test-home/dqb/${user_id}t${testid}`, "_blank", features);
      window.open(`/scorecard-report/${id}-${ids}`, "_blank", features);
    } catch (error) {}
  };

  useEffect(() => {
    getScoreList();
  }, []);

  const Result_dqb = (sid) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;

      // Open the new window
      window.open(`/testresult/dqb/${id}s${sid}`, "_blank", features);
    } catch (error) {}
  };

  const ResultView = (sid) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;

      // Open the new window

      window.open(`/testresult/dq/${id}s${sid}`, "_blank", features);
    } catch (error) {}
  };

  const ResultTest = (sid) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;

      // Open the new window

      window.open(`/testresult/${id}s${sid}`, "_blank", features);
    } catch (error) {}
  };
  const getTimeDifference = (creationTime) => {
    const currentTime = Date.now();
    const timeDifference = currentTime - creationTime;
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} days ago`;
    }
  };

  setTimeout(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, 0);

  const ResultWait = (time) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;

      // Open the new window

      window.open(`/testwait/${time}`, "_blank", features);
    } catch (error) {}
  };

  return (
    <div className="ScoreCard">
      <div className="page-content bg-white">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>My Scorecard</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="content-block scoreCardData">
        <div className="section-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 m-b30">
                <div className="profile-content-bx">
                  <div className="tab-content">
                    <div className="tab-pane active" id="courses">
                      <div className="profile-head">
                        <Tabs className="mb-5">
                          <Tab eventKey="home" title="Test">
                            <div className="profile-content-bx">
                              <div className="teacher-bx emez-expets pro-expert-eme">
                                {loading && (
                                  <div
                                    style={{
                                      height: "50vh",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Spinner animation="grow" />
                                  </div>
                                )}
                                {dbq?.map((result, i) => (
                                  <div className="teacher-info" key={i}>
                                    <div className="dquiz_book">
                                      <img
                                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/test_icon1.png"
                                        loading="lazy"
                                        alt="icon image"
                                      />
                                    </div>
                                    <div className="teacher-name">
                                      <h5>{result.test_series_name}</h5>
                                      <p>Test</p>
                                      <p className="date_txt">
                                        <em className="fa fa-clock-o"></em>

                                        <span>
                                          {getTimeDifference(
                                            parseInt(result?.creation_time)
                                          )}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="price">
                                      <p className="m-0 text-right">
                                        {result?.test_result_date != "" ? (
                                          <a
                                            className="testview btn result radius-xl"
                                            style={{ color: "#fff" }}
                                            onClick={() =>
                                              ResultWait(
                                                result.test_result_date
                                              )
                                            }
                                          >
                                            Result
                                          </a>
                                        ) : (
                                          <a
                                            className="testview btn result radius-xl"
                                            style={{ color: "#fff" }}
                                            onClick={() =>
                                              ResultTest(result.id)
                                            }
                                          >
                                            Result
                                          </a>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Tab>
                          <Tab eventKey="profile" title="Q Bank">
                            <div className="profile-content-bx">
                              <div className="teacher-bx emez-expets pro-expert-eme">
                                {testSeries?.map((result, i) => (
                                  <div className="teacher-info" key={i}>
                                    <div className="dquiz_book">
                                      <img
                                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/test_icon1.png"
                                        loading="lazy"
                                        alt="icon image"
                                      />
                                    </div>
                                    <div className="teacher-name">
                                      <h5>{result.test_series_name}</h5>
                                      <p>Quiz</p>
                                      <p className="date_txt">
                                        <em className="fa fa-clock-o"></em>

                                        <span>
                                          {getTimeDifference(
                                            parseInt(result?.creation_time)
                                          )}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="price">
                                      <p className="m-0 text-right">
                                        <a
                                          className="testview btn result radius-xl"
                                          onClick={() => ResultView(result.id)}
                                          style={{ color: "#fff" }}
                                        >
                                          Result
                                        </a>
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Tab>
                          <Tab eventKey="contact" title="Daily Quiz">
                            <div className="profile-content-bx">
                              <div className="teacher-bx emez-expets pro-expert-eme">
                                {loading && (
                                  <div
                                    style={{
                                      height: "50vh",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Spinner animation="grow" />
                                  </div>
                                )}
                                {dailyQuiz?.map((result, i) => (
                                  <div className="teacher-info" key={i}>
                                    <div className="dquiz_book">
                                      <img
                                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/test_icon1.png"
                                        loading="lazy"
                                        alt="icon image"
                                      />
                                    </div>
                                    <div className="teacher-name">
                                      <h5>{result.test_series_name}</h5>
                                      <p>Daily Quiz</p>
                                      <p className="date_txt">
                                        <em className="fa fa-clock-o"></em>

                                        <span>
                                          {getTimeDifference(
                                            parseInt(result?.creation_time)
                                          )}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="price">
                                      <p className="m-0 text-right">
                                        <span
                                          className="testview btn result radius-xl"
                                          style={{ color: "#fff" }}
                                          onClick={() => Result_dqb(result.id)}
                                        >
                                          Result
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScoreCard;
