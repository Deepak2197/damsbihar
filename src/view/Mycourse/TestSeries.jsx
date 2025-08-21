import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/study-test/style.css";
import "../../assets/css/study-test/responsive.css";
import axiosInstance from "../../API/axiosConfig";
import { setAppElement } from "react-modal";
import { FaLock } from "react-icons/fa";
import "./style.css";
import { useSelector } from "react-redux";
import TestSeriessSkeleton from "./TestSeriesSkeleton";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
function isFutureDate(seconds) {
  // Convert seconds to milliseconds
  const milliseconds = seconds * 1000;
  // Create Date objects for today's date and the provided timestamp
  const currentDate = new Date();
  const providedDate = new Date(milliseconds);

  // Set both dates to midnight to compare only dates without time
  currentDate.setHours(0, 0, 0, 0);
  providedDate.setHours(0, 0, 0, 0);

  // Compare the year, month, and day parts of the dates
  if (providedDate.getFullYear() < currentDate.getFullYear()) {
    return false;
  } else if (
    providedDate.getFullYear() === currentDate.getFullYear() &&
    providedDate.getMonth() < currentDate.getMonth()
  ) {
    return false;
  } else if (
    providedDate.getFullYear() === currentDate.getFullYear() &&
    providedDate.getMonth() === currentDate.getMonth() &&
    providedDate.getDate() < currentDate.getDate()
  ) {
    return false;
  }

  return true;
}

const TestSeries = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("id");
  const [ispurchased, setTestPurchased] = useState();
  const [testSeriesData, setTestSeriesData] = useState([]);
  const [testSeriesType, setTestSeriesType] = useState([]);
  const [catid, setcatid] = useState(null);
  const [filtereddata, setfilter] = useState(null);
  const [ActiveTab, SetActiveTab] = useState(null);
  const [allact, Setallact] = useState(true);

  const testSeriesTab = (id) => {
    SetActiveTab(null);
    Setallact(false);
    setcatid(id);
  };
  const { courseId, catId } = useSelector((state) => state.testseries);

  const handleNavigate = () => {
    //const catId = location.state?.isCategoryid;

    if (catId) {
      navigate("/courses", { state: { catId } }); // Make sure key matches the receiving code
    } else {
      console.error("Category ID not found!");
    }
  };

  const getAlltestData = async () => {
    let course_Id = JSON.parse(localStorage.getItem("course_Id"));
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.TEST_SERIES.GET_TESTSERIES,
        { user_id: user_id, course_id: courseId ? courseId : course_Id }
      );
      setLoading(false);
      setTestSeriesData(response?.data?.data?.test_series);
      setTestSeriesType(response.data.data.masters);
      setfilter(response?.data?.data?.test_series);
      setTestPurchased(response?.data?.data?.basic_info?.is_purchased);
      //setCourseCatListShow(response.data.data.course_list);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAlltestData();

    //}, [testSeriesData]); //if user cut browser then status change
  }, []);

  useEffect(() => {
    if (catid) {
      const fil = testSeriesData.filter((item) => item.subject_id == catid);
      setfilter(fil);
      // console.log("fill", testSeriesData);
    } else {
      setfilter(testSeriesData);
    }
  }, [catid]);

  //useEffect(()=>{setfilter(testSeriesData)},[ActiveTab])

  const handleactive = () => {
    SetActiveTab("All");
    if (allact) {
      let fil = testSeriesData
        .filter((item) => item.is_paused == "")
        .filter((item) => item.is_user_attemp == "")
        .filter((item) => item.is_expire == 0);
      setfilter(fil);
    } else {
      let fil = testSeriesData
        .filter((item) => item.subject_id == catid)
        .filter((item) => item.is_paused == "")
        .filter((item) => item.is_user_attemp == "")
        .filter((item) => item.is_expire == 0);
      setfilter(fil);
    }
  };

  const handlepause = () => {
    SetActiveTab("Paused");
    if (allact) {
      let fil = testSeriesData.filter((item) => item.is_paused == 1);
      setfilter(fil);
    } else {
      let fil = testSeriesData
        .filter((item) => item.subject_id == catid)
        .filter((item) => item.is_paused == 1);
      setfilter(fil);
    }
  };

  const handlemissed = () => {
    SetActiveTab("Missed");
    if (allact) {
      setfilter(testSeriesData.filter((item) => item.is_expire == 1));
    } else {
      setfilter(
        testSeriesData
          .filter((item) => item.is_expire == 1)
          .filter((item) => item.subject_id == catid)
      );
    }
  };

  const handlecomplete = () => {
    SetActiveTab("Completed");
    if (allact) {
      setfilter(
        testSeriesData
          .filter((item) => item.is_user_attemp)
          .filter((item) => item.is_paused == "0")
      );
    } else {
      setfilter(
        testSeriesData
          .filter((item) => item.subject_id == catid)
          .filter((item) => item.is_user_attemp)
          .filter((item) => item.is_paused == "0")
      );
    }
  };
  const handlealldata = () => {
    // console.log(testSeriesData);
    SetActiveTab(null);
    Setallact(true);
    setcatid(null);
    setfilter(testSeriesData);
    // console.log(testSeriesData);
  };

  const currentDate = new Date();

  // Extract date components
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  // Formatted date string
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  const StartNew = (testid) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;
      // Open the new window
      window.open(`/test-home/${user_id}t${testid}`, "_blank", features);
    } catch (error) {
      console.log(error);
    }
  };

  const StartNewSec = (testid) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;
      // Open the new window
      window.open(`/test-home/nur/${user_id}t${testid}`, "_blank", features);
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
        `/test-panel/paused/${user_id}t${testid}`,
        "_blank",
        features
      );
    } catch (error) {
      console.log(error);
    }
  };

  const ResultView = (sid) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;

      // Open the new window

      window.open(`/testresult/${user_id}s${sid}`, "_blank", features);
    } catch (error) {
      console.log(error);
    }
  };

  const ResultViewSec = (sid) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;

      // Open the new window

      window.open(`/testresult/nur/${user_id}s${sid}`, "_blank", features);
    } catch (error) {
      console.log(error);
    }
  };

  const ResultWait = (time) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;

      // Open the new window

      window.open(`/testwait/${time}`, "_blank", features);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleEarlyTest = (date) => {
    window.alert(`Your Test will be available on ${date}`);
  };
  function isFutureDateTime(dateTimeString) {
    // Parse the given date string into a Date object
    const givenDateTime = new Date(dateTimeString);

    // Get the current date and time
    const currentDateTime = new Date();

    // Compare the given date and time with the current date and time
    return givenDateTime > currentDateTime;
  }

  const StartPausednur = (testid) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;

      // Open the new window
      window.open(
        `/test-panel/nur/paused/${user_id}t${testid}`,
        "_blank",
        features
      );
    } catch (error) {
      console.log(error);
    }
  };
  const [loading, setLoading] = useState(true);
  return (
    <div className="TestSeries">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>Test Series</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="test-studytabbibg">
        <div className="container clearfix">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12" id="main_id">
              <div className="rightcont">
                <div className="all-test-page">
                  <div className="tab-content" id="v-pills-tabContent">
                    <div className="tabdatcls">
                      <div className="grouptest">
                        <div className="row">
                          {loading ? (
                            <TestSeriessSkeleton />
                          ) : (
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                              <ul className="nav nav-pills tab_data NewSet">
                                <li className="nav-item">
                                  <Link
                                    className={`nav-link ${
                                      allact ? "show active" : ""
                                    } d-block p-0`}
                                    data-toggle="pill"
                                    onClick={handlealldata}
                                    data-id="9"
                                  >
                                    <div className="alltest-group border-none">
                                      {/* <img
                                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/study-test/test-icon4.png"
                                      alt=""
                                    /> */}
                                      {/* <img
                                      src={`${window.IMG_BASE_URL}/alltestIcon.png`}
                                      alt=""
                                    /> */}
                                      <h4 className="all_test" data-id="">
                                        All Test
                                      </h4>
                                    </div>
                                  </Link>
                                </li>
                                {testSeriesType &&
                                  testSeriesType?.map((subject, index) => (
                                    <li className="nav-item" key={index}>
                                      <Link
                                        className={`nav-link ${
                                          catid === subject.id
                                            ? "active show"
                                            : ""
                                        }`}
                                        data-toggle="pill"
                                        onClick={() =>
                                          testSeriesTab(subject.id)
                                        }
                                      >
                                        <div className="alltest-group border-none">
                                          {/* <img
                                          src={`${window.IMG_BASE_URL}/testIcon.png`}
                                          alt=""
                                        /> */}
                                          <h4 className="all_test">
                                            {subject.test_type_title}
                                          </h4>
                                        </div>
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="mix-tab-data">
                                    {/* Nav pills */}
                                    <ul
                                      className="nav nav-pills"
                                      role="tablist"
                                    >
                                      <li
                                        className="nav-item"
                                        onClick={handleactive}
                                      >
                                        <Link
                                          className={
                                            ActiveTab == "All"
                                              ? "nav-link active"
                                              : "nav-link"
                                          }
                                          data-toggle="pill"
                                        >
                                          <span className="d-block">
                                            {/* <img
                                            src={`${window.IMG_BASE_URL}/activeIcon.png`}
                                            alt=""
                                          /> */}
                                          </span>
                                          All
                                        </Link>
                                      </li>
                                      <li
                                        className="nav-item"
                                        onClick={handlepause}
                                      >
                                        <Link
                                          className={
                                            ActiveTab == "Paused"
                                              ? "nav-link active"
                                              : "nav-link"
                                          }
                                          data-toggle="pill"
                                        >
                                          <span className="d-block">
                                            {/* <img
                                            src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/pause.svg"
                                            alt=""
                                          /> */}
                                            {/* <img
                                            src={`${window.IMG_BASE_URL}/pauseIcon.svg`}
                                            alt=""
                                          /> */}
                                          </span>
                                          Paused
                                        </Link>
                                      </li>
                                      <li
                                        className="nav-item"
                                        onClick={handlemissed}
                                      >
                                        <Link
                                          data-toggle="pill"
                                          href="#grand_test"
                                          className={
                                            ActiveTab == "Missed"
                                              ? "nav-link active"
                                              : "nav-link"
                                          }
                                        >
                                          <span className="d-block">
                                            {/* <img
                                            className="missed-img"
                                            src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/missed.svg"
                                            alt=""
                                          /> */}
                                            {/* <img
                                            src={`${window.IMG_BASE_URL}/missedIcon.svg`}
                                            alt=""
                                          /> */}
                                          </span>
                                          Missed
                                        </Link>
                                      </li>
                                      <li
                                        className="nav-item"
                                        onClick={handlecomplete}
                                      >
                                        <Link
                                          className={
                                            ActiveTab == "Completed"
                                              ? "nav-link active"
                                              : "nav-link"
                                          }
                                          data-toggle="pill"
                                        >
                                          <span className="d-block">
                                            {/* <img
                                            src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/tick.svg"
                                            alt=""
                                          /> */}
                                            {/* <img
                                            src={`${window.IMG_BASE_URL}/completeIcon.svg`}
                                            alt=""
                                          /> */}
                                          </span>
                                          Completed
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="tab-content">
                                <div
                                  id="all_test"
                                  className="tab-pane fade active show"
                                >
                                  <div className="tab_datagg">
                                    <h3 className="subject_name">All Test</h3>
                                    <button
                                      className="refresh"
                                      onClick={() => {
                                        window.location.reload();
                                      }}
                                    >
                                      <em className="fa fa-refresh"></em>Click
                                      to Refresh
                                    </button>
                                    <p>
                                      Note: To get the latest update, kindly
                                      refresh the page
                                    </p>
                                    <div className="tab-content path">
                                      <div
                                        id="active-tab"
                                        className="tab-pane active"
                                      >
                                        <div className="row">
                                          {filtereddata?.map(
                                            (series, index) => (
                                              <div
                                                key={index}
                                                className="col-12 col-sm-12 col-md-6 col-lg-4 show-modal"
                                              >
                                                <div
                                                  className="pathlogy-group position-relative show-modal"
                                                  //style={{ cursor: "pointer" }}
                                                >
                                                  <div className="row">
                                                    {/* <div class="boxDivset">
                                                  <div class="setOfimgsec">
                                                    <div class="setOfimgPart">
                                                      <img src={`${window.IMG_BASE_URL}/emdpublic/testseries/set.svg`} />
                                                    </div>
                                                  </div>
                                                  <div class="setOftext">
                                                    <h3>
                                                      FMGE CT - Biochemistry
                                                    </h3>
                                                    <h4>(Set B)</h4>
                                                    <h2>
                                                      <span class="examModetext">
                                                        Ended on 2025-12-31
                                                        23:55
                                                      </span>{" "}
                                                      <em class="fa fa-circle"></em>{" "}
                                                      40 MCQs / 30 mins
                                                    </h2>
                                                  </div>
                                                  <div class="startbtn">
                                                    <button class="buton review">
                                                      Review
                                                    </button>
                                                  </div>
                                                </div> */}

                                                    <div className="boxDivset">
                                                      <div class="setOfimgsec">
                                                        <div class="setOfimgPart">
                                                          <img
                                                            src={`${window.IMG_BASE_URL}/emdpublic/testseries/set.svg`}
                                                            alt=""
                                                          />
                                                        </div>
                                                      </div>
                                                      {/* <h2>{series.is_free}</h2> */}

                                                      <div class="setOftext">
                                                        <h3>
                                                          {
                                                            series.test_series_name
                                                          }
                                                        </h3>
                                                        {/* <h2>{ispurchased}</h2> */}
                                                        {/* <h4>(Set B)</h4> */}
                                                        {/* <h2>
                                                      <span class="examModetext">
                                                        Start Date:
                                                        {series.test_start_date}
                                                      </span>{" "}
                                                      <em class="fa fa-circle"></em>{" "}
                                                      End Date:
                                                      {series.test_end_date}
                                                    </h2> */}
                                                        <h2>
                                                          <span class="examModetext">
                                                            Ended on 2025-12-31
                                                            23:55
                                                          </span>{" "}
                                                          <em class="fa fa-circle"></em>{" "}
                                                          {
                                                            series.total_questions
                                                          }{" "}
                                                          MCQs /
                                                          {series.time_in_mins}{" "}
                                                          mins
                                                        </h2>
                                                      </div>

                                                      <div
                                                        className="startbtn"
                                                        // style={{
                                                        //   width: "93px",
                                                        //   float: "right",
                                                        //   marginRight: "-97px",
                                                        //   marginTop: "0px",
                                                        // }}
                                                      >
                                                        {series.is_paused ==
                                                          "1" &&
                                                        series.nursing_testing ==
                                                          1 ? (
                                                          <button
                                                            className="buton pause"
                                                            onClick={() =>
                                                              StartPausednur(
                                                                series.test_series_id
                                                              )
                                                            }
                                                          >
                                                            Paused
                                                          </button>
                                                        ) : series.is_paused ==
                                                            "1" &&
                                                          series.nursing_testing !=
                                                            1 ? (
                                                          <button
                                                            className="buton pause"
                                                            onClick={() =>
                                                              StartPaused(
                                                                series.test_series_id
                                                              )
                                                            }
                                                          >
                                                            Paused
                                                          </button>
                                                        ) : (
                                                          <></>
                                                        )}

                                                        {series.is_user_attemp ===
                                                          "" &&
                                                        series.is_paused !==
                                                          1 &&
                                                        formattedDate <
                                                          series.test_end_date &&
                                                        !isFutureDateTime(
                                                          series.test_start_date
                                                        ) &&
                                                        series.nursing_testing ===
                                                          "1" ? (
                                                          ispurchased == 1 ||
                                                          ispurchased == 1 ||
                                                          ispurchased == 2 ||
                                                          ispurchased == 2 ? (
                                                            <button
                                                              className="buton new"
                                                              onClick={() =>
                                                                StartNewSec(
                                                                  series.element_fk
                                                                )
                                                              }
                                                            >
                                                              New
                                                            </button>
                                                          ) : (ispurchased ==
                                                              0 ||
                                                              ispurchased ==
                                                                0) &&
                                                            series.is_free ==
                                                              1 ? (
                                                            <button
                                                              className="buton new"
                                                              onClick={() =>
                                                                StartNewSec(
                                                                  series.element_fk
                                                                )
                                                              }
                                                            >
                                                              Free
                                                            </button>
                                                          ) : (ispurchased ==
                                                              0 ||
                                                              ispurchased ==
                                                                0) &&
                                                            series.is_free ==
                                                              0 ? (
                                                            <button
                                                              className="buton locked"
                                                              onClick={
                                                                handleNavigate
                                                              }
                                                            >
                                                              <em className="fa fa-lock"></em>{" "}
                                                              Pro
                                                            </button>
                                                          ) : (
                                                            <button
                                                              className="buton new"
                                                              onClick={() =>
                                                                StartNewSec(
                                                                  series.element_fk
                                                                )
                                                              }
                                                            >
                                                              New
                                                            </button>
                                                          )
                                                        ) : series.is_user_attemp ===
                                                            "" &&
                                                          series.is_paused !==
                                                            1 &&
                                                          formattedDate <
                                                            series.test_end_date &&
                                                          !isFutureDateTime(
                                                            series.test_start_date
                                                          ) ? (
                                                          ispurchased == 1 ||
                                                          ispurchased == 1 ||
                                                          ispurchased == 2 ||
                                                          ispurchased == 2 ? (
                                                            <button
                                                              className="buton new"
                                                              onClick={() =>
                                                                StartNew(
                                                                  series.element_fk
                                                                )
                                                              }
                                                            >
                                                              New
                                                            </button>
                                                          ) : (ispurchased ==
                                                              0 ||
                                                              ispurchased ==
                                                                0) &&
                                                            series.is_free ==
                                                              1 ? (
                                                            <button
                                                              className="buton new"
                                                              onClick={() =>
                                                                StartNew(
                                                                  series.element_fk
                                                                )
                                                              }
                                                            >
                                                              Free
                                                            </button>
                                                          ) : (ispurchased ==
                                                              0 ||
                                                              ispurchased ==
                                                                0) &&
                                                            series.is_free ==
                                                              0 ? (
                                                            <button
                                                              className="buton locked"
                                                              onClick={
                                                                handleNavigate
                                                              }
                                                            >
                                                              <em className="fa fa-lock"></em>{" "}
                                                              Pro
                                                            </button>
                                                          ) : (
                                                            <button
                                                              className="buton new"
                                                              onClick={() =>
                                                                StartNew(
                                                                  series.element_fk
                                                                )
                                                              }
                                                            >
                                                              New
                                                            </button>
                                                          )
                                                        ) : series.is_user_attemp ===
                                                            "" &&
                                                          series.is_paused !==
                                                            1 &&
                                                          formattedDate <
                                                            series.test_end_date &&
                                                          isFutureDateTime(
                                                            series.test_start_date
                                                          ) ? (
                                                          <button
                                                            className="buton"
                                                            onClick={() =>
                                                              HandleEarlyTest(
                                                                series.test_start_date
                                                              )
                                                            }
                                                          >
                                                            <FaLock /> Pro
                                                          </button>
                                                        ) : (
                                                          <></>
                                                        )}

                                                        {series.is_user_attemp &&
                                                        isFutureDate(
                                                          series.test_result_date
                                                        ) &&
                                                        series.is_paused !=
                                                          1 ? (
                                                          <button
                                                            className="buton review"
                                                            onClick={() =>
                                                              ResultWait(
                                                                series.test_result_date
                                                              )
                                                            }
                                                          >
                                                            Review
                                                          </button>
                                                        ) : series.is_user_attemp &&
                                                          series.is_paused !=
                                                            1 &&
                                                          series.nursing_testing ==
                                                            "1" ? (
                                                          <button
                                                            className="buton review"
                                                            onClick={() =>
                                                              ResultViewSec(
                                                                series.is_user_attemp
                                                              )
                                                            }
                                                          >
                                                            Review
                                                          </button>
                                                        ) : series.is_user_attemp &&
                                                          series.is_paused !=
                                                            1 ? (
                                                          <button
                                                            className="buton review"
                                                            onClick={() =>
                                                              ResultView(
                                                                series.is_user_attemp
                                                              )
                                                            }
                                                          >
                                                            Review
                                                          </button>
                                                        ) : (
                                                          <></>
                                                        )}

                                                        {formattedDate >
                                                          series.test_end_date && (
                                                          <button className="expireText">
                                                            expired
                                                          </button>
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  {/* <h3>
                                                {series.total_questions} MCQs |
                                                {series.time_in_mins} mins
                                              </h3> */}
                                                  <div
                                                    className="row mt-2"
                                                    style={{
                                                      marginTop:
                                                        "-0.3rem!important",
                                                    }}
                                                  >
                                                    {/* <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                                                  <div className="calimg">
                                                    <p>
                                                      <span>
                                                        <img
                                                          src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/study-test/cal-icon.svg"
                                                          alt=""
                                                        />
                                                        Start Date:
                                                        {series.test_start_date}
                                                      </span>
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                                                  <div className="calimg">
                                                    <p>
                                                      <span>
                                                        <img
                                                          src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/study-test/cal-icon.svg"
                                                          alt=""
                                                        />
                                                        End Date:
                                                        {series.test_end_date}
                                                      </span>
                                                    </p>
                                                  </div>
                                                </div> */}
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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
      </section>
    </div>
  );
};

export default TestSeries;
