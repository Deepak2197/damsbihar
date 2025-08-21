import "../../../assets/css/study-test/style.css";
import "../../../assets/css/study-test/responsive.css";
//import "../../../assets/css/study-test/bootstrap.min.css";
import "../style.css";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../API/axiosConfig";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DQBskeleton from "./QbankSkeleton/DQBskeletonTestAll";
import { API_ENDPOINTS } from "../../../ulits/apiConstant";
const DqbTestAll = () => {
  const navigate = useNavigate();
  const { catId } = useSelector((state) => state.testseries);
  const { courseId } = useSelector((state) => state.testseries);
  const user_id = sessionStorage.getItem("id");
  const topic_id = localStorage.getItem("topicId");
  const courseDqbId = localStorage.getItem("courseDqbId");
  const [loading, setloading] = useState(true);

  // const finalCourseId = courseId ? courseId : courseDqbId;
  // console.log(finalCourseId);
  //const courseId = course_id !== null ? course_id : catId;
  //const courseId = catId ? catId : course_id;
  const [testSeriesList, setTestSeries] = useState();
  //console.log(courseId);
  const [ispurchased, setTestPurchased] = useState([]);

  //const { courseId, catId } = useSelector((state) => state.testseries);
  const handleNavigate = () => {
    //const catId = location.state?.isCategoryid;
    if (catId) {
      navigate("/courses", { state: { catId } }); // Make sure key matches the receiving code
    } else {
      console.error("Category ID not found!");
    }
  };

  useEffect(() => {
    const fetchatQbnkSeries = async () => {
      try {
        const responses = await axiosInstance.post(
          API_ENDPOINTS.CUSTOM_QBANK.COURSE_TYPES_TEST,
          { user_id: user_id, course_id: courseId ? courseId : courseDqbId }
        );
        setTestSeries(responses.data.data.test_series);
        setloading(false);
        setTestPurchased(responses?.data?.data?.is_purchased);
        //console.log("dqbbbtest",responses.data.data.test_series);
      } catch (err) {
        console.log(err);
      }
    };

    fetchatQbnkSeries();
  }, [user_id, courseId ? courseId : courseDqbId]);
  useEffect(() => {
    //console.log("Test series list changed:", testSeriesList);
  }, [testSeriesList]);

  const StartNew = (testid) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;
      // Open the new window
      // window.open(`/test-home/dq/${user_id}t${testid}`, "_blank", features);//for open with instruction
      window.open(`/test-panel/dq/${user_id}t${testid}`, "_blank", features);
    } catch (error) {
      console.log(error);
    }
  };

  const StartPaused = (testid) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;
      // Open the new window
      window.open(
        `/test-panel/dq/paused/${user_id}t${testid}`,
        "_blank",
        features
      );
    } catch (error) {
      console.log(error);
    }
  };

  const ResultView = (sid) => {
    //console.log("review");
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;

      // Open the new window

      window.open(`/testresult/dq/${user_id}s${sid}`, "_blank", features);
    } catch (error) {
      console.log(error);
    }
  };
  const checkresult = (data) => {
    //console.log(data);
  };

  return (
    <div className="page-content">
      <div className="breadcrumb-row">
        <div className="container">
          <ul className="list-inline">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/my-course/course-dqb"}>Test &gt;</Link>
            </li>{" "}
            &gt;All Test
          </ul>
        </div>
      </div>
      {loading ? (
        <DQBskeleton />
      ) : (
        <section className="test-studytabbibg neetTest neetAnatomy">
          <div className="container clearfix ">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="subTopic">
                  <h3>Anatomy</h3>
                  <ul>
                    <li>25 Topics</li>
                    <li>123 Sub Topics</li>
                    <li>854 Questions</li>
                  </ul>
                </div>
                <div className="pillSec scrolling">
                  <ul className="nav nav-pills ">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="pill"
                        data-bs-target="#all"
                      >
                        All
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="pill"
                        data-bs-target="#paused"
                      >
                        Paused
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="pill"
                        data-bs-target="#completed"
                      >
                        Completed
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="pill"
                        data-bs-target="#nostarted"
                      >
                        Not Started
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="pill"
                        data-bs-target="#free"
                      >
                        Free
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="all">
                      <div className="SetOfBgColor">
                        <div className="setSectionNew">
                          <div className="generalHeading">
                            <h4>1. General Embryology</h4>
                          </div>
                          <div className="setPartNew">
                            <div className="picSecNew">
                              {/* <img src={anatomy} /> */}
                            </div>
                            <div className="textSecNew">
                              <h2>Head, Face, Neck & Brain</h2>
                              <h3>
                                <em class="fa fa-star"></em> 4.6 | 11 MCQs
                                <span>
                                  {/* <img src={lock} /> */}
                                  Pro
                                </span>
                              </h3>
                              {/* <p>Ended on 18 July . 100 MCQs / 60 mins</p> */}
                            </div>
                          </div>
                          <div className="setPartNew">
                            <div className="picSecNew">
                              {/* <img src={anatomy} /> */}
                            </div>
                            <div className="textSecNew">
                              <h2>General Anatomy & Embryology</h2>
                              <h3>
                                <em class="fa fa-star"></em> 4.6 | 11 MCQs
                                <span>
                                  {/* <img src={lock} /> */}
                                  Pro
                                </span>
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div className="setSectionNew">
                          <div className="generalHeading">
                            <h4>2. Histology</h4>
                          </div>
                          <div className="setPartNew">
                            <div className="picSecNew">
                              {/* <img src={anatomy} /> */}
                            </div>
                            <div className="textSecNew">
                              <h2>Upper Limb</h2>
                              <h3>
                                <em class="fa fa-star"></em> 4.6 | 11 MCQs
                                <span>
                                  {/* <img src={lock} /> */}
                                  Pro
                                </span>
                              </h3>
                            </div>
                          </div>
                          <div className="setPartNew">
                            <div className="picSecNew">
                              {/* <img src={anatomy} /> */}
                            </div>
                            <div className="textSecNew">
                              <h2>Thoarx</h2>
                              <h3>
                                <em class="fa fa-star"></em> 4.6 | 11 MCQs
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="paused">
                      Paused
                    </div>
                    <div className="tab-pane fade" id="completed">
                      Completed
                    </div>
                    <div className="tab-pane fade" id="nostarted">
                      Not Started
                    </div>
                    <div className="tab-pane fade" id="free">
                      <div className="SetOfBgColor">
                        <div className="setSectionNew">
                          <div className="generalHeading">
                            <h4>1. General Embryology</h4>
                          </div>
                          <div className="setPartNew">
                            <div className="picSecNew">
                              {/* <img src={anatomy} /> */}
                            </div>
                            <div className="textSecNew">
                              <h2>General Anatomy & Embryology</h2>
                              <h3>
                                <em class="fa fa-star"></em> 4.6 | 11 MCQs
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="setSectionNew">
                        <div className="generalHeading">
                          <h4>2. Histology</h4>
                        </div>
                        <div className="setPartNew">
                          <div className="picSecNew">
                            {/* <img src={anatomy} /> */}
                          </div>
                          <div className="textSecNew">
                            <h2>Thoarx</h2>
                            <h3>
                              <em class="fa fa-star"></em> 4.6 | 11 MCQs
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="rightcont Ophtha-center">
                  <div className="all-test-page">
                    <div className="tab-content" id="v-pills-tabContent">
                      <div
                        className=""
                        id="quetion-bank"
                        role="tabpanel"
                        aria-labelledby="quetion-bank"
                      >
                        <div
                          className="tab-pane show active"
                          id="test-study"
                          role="tabpanel"
                          aria-labelledby="test-study"
                        >
                          <div className="tab-content path">
                            <div id="active-tab" className="tab-pane active">
                              <div className="row">
                                {testSeriesList?.map((result) =>
                                  result.topic_id == topic_id ? (
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                      <div className="position-relative">
                                        <div
                                          onClick={() => checkresult(result)}
                                        >
                                          <div className="allTestSetBox">
                                            <div className="boxImg">
                                              <div className="boxSet">
                                                <img
                                                  src={`${window.IMG_BASE_URL}/emdpublic/qbank/attempbook.svg`}
                                                  alt=""
                                                />
                                              </div>
                                            </div>
                                            <div className="reattempt textSet">
                                              <h3>{result.test_series_name}</h3>
                                              {result.is_paused === "0" ? (
                                                <button
                                                  to={""}
                                                  onClick={() =>
                                                    ResultView(
                                                      result.is_user_attemp
                                                    )
                                                  }
                                                  className="buton review"
                                                >
                                                  Review
                                                </button>
                                              ) : result.is_paused === "1" ? (
                                                <button
                                                  className="buton review"
                                                  onClick={() =>
                                                    StartPaused(
                                                      result.test_series_id
                                                    )
                                                  }
                                                >
                                                  Resume
                                                </button>
                                              ) : // --- Start of new conditions ---
                                              ispurchased === "1" &&
                                                result.is_free === "0" ? (
                                                <button
                                                  className="buton start"
                                                  onClick={() =>
                                                    StartNew(result.element_fk)
                                                  }
                                                >
                                                  Start
                                                </button>
                                              ) : ispurchased === "0" &&
                                                result.is_free === "1" ? (
                                                <button
                                                  className="buton"
                                                  onClick={() =>
                                                    StartNew(result.element_fk)
                                                  }
                                                >
                                                  Free
                                                </button>
                                              ) : ispurchased === "0" &&
                                                result.is_free === "0" ? (
                                                <button
                                                  className="buton locked"
                                                  onClick={handleNavigate}
                                                >
                                                  <em class="fa fa-lock"></em>{" "}
                                                  Pro
                                                  {/* Assuming FaLock is imported */}
                                                </button>
                                              ) : ispurchased === "2" ? (
                                                <button
                                                  className="buton start"
                                                  onClick={() =>
                                                    StartNew(result.element_fk)
                                                  }
                                                >
                                                  Start
                                                </button>
                                              ) : // --- End of new conditions ---
                                              // Original fallback if none of the above match, and it's a new attempt
                                              result.is_user_attemp === "" ? (
                                                <button
                                                  className="buton start"
                                                  onClick={() =>
                                                    StartNew(result.element_fk)
                                                  }
                                                >
                                                  Start
                                                </button>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <span></span>
                                  )
                                )}
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
          </div>
        </section>
      )}
    </div>
  );
};

export default DqbTestAll;
