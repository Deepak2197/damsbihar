import "../../../assets/css/course-detail/style.css";
import "../../../assets/css/course-detail/responsive.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLock } from "react-icons/fa";
import Internet from "../../NursingTest/Internet";
import axiosInstance from "../../../API/axiosConfig";
function isFutureDate(seconds) {
  // Convert seconds to milliseconds
  const milliseconds = seconds * 1000;

  // Create Date objects for today's date and the provided timestamp
  const currentDate = new Date();
  const providedDate = new Date(milliseconds);
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

const ClassSchedulesDetails = () => {
  const loc = useLocation();
 
  const handleModel = () => {
    toast.success(
      "If you want to open or watch lecture Video go to the DAMS mobile app"
    );
  };
  const handleTest = () => {
    toast.success("If you want to open PDF please visit DAMS mobile app");
  };

  const [TestCourseList, setTestCourse] = useState([]);
  const [ModuleName, SetModuleName] = useState([]);
  const [VideoTopicList, SetVideoTopic] = useState([]);
  const [VideoTopicLists, SetVideoTopics] = useState([]);
  const [VideoPyqList, SetVideoPyq] = useState([]);
  const [courseDetailList, setCourseDetailList] = useState([]);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [TabList, setTab] = useState();
  const user_id = sessionStorage.getItem("id");

  const course_Title = localStorage.getItem("course_Title")
    ? localStorage.getItem("course_Title")
    : "";
  const course_Id = localStorage.getItem("course_Id")
    ? JSON.parse(localStorage.getItem("course_Id"))
    : "";
  const [showSchedules, setShowSchedules] = useState(false);

  const handleToggles = () => {
    setShowSchedules(!showSchedules);
  };

  const loadFormDataFromLocalStorage = () => {
    const savedFormData = localStorage.getItem("testdata");
    if (savedFormData) {
      const formObject = JSON.parse(savedFormData);
      const formData = new FormData();
      Object.entries(formObject).forEach(([key, value]) => {
        formData.append(key, value);
      });
      return formData;
    }
    return null;
  };

  useEffect(() => {
    const savedatatest = async () => {
      try {
        const formData = loadFormDataFromLocalStorage();
        if (formData) {
          await axiosInstance.post("/v2_data_model/save_test_series", formData);
          localStorage.removeItem("testdata");
        }
      } catch (error) {
        console.log(error);
      }
    };

    savedatatest();

    const fetVideoTopic = async () => {
      try {
        const responses = await axiosInstance.post(
          `/v2_data_model/get_course_video_topic_list`,
          { user_id: user_id, id: course_Id }
        );
        SetVideoTopic(responses?.data?.data?.topic_video_data[0]?.list);
        SetVideoTopics(responses?.data?.data?.topic_video_data[1]?.list);
      } catch (err) {
        console.log(err);
      }
    };

    const is_cbt = JSON.parse(localStorage.getItem("is_cbt"));
    const getAllCourseDetail = async () => {
      try {
        const response = await axiosInstance.post(
          "/v2_data_model/get_course_detail",
          { user_id: user_id, id: course_Id, cbt_publish: is_cbt ? is_cbt : "" }
        );
        setCourseDetailList(response.data.data.course_schedule);
      } catch (err) {
        console.log(err);
      }
    };

    fetVideoTopic();

    getAllCourseDetail();
  }, []);

  const fetchatTest = async () => {
    try {
      const responses = await axiosInstance.post(
        `/v2_data_model/get_course_notes_and_test_data`,
        { user_id: user_id, id: course_Id }
      );
      SetModuleName(course_Title);

      //setTestCourse(responses.data.data[0]["list"]);
      setTestCourse(responses.data.data[0]?.list?.length ? responses.data.data[0].list : responses.data.data[1]?.list || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchatTest();
  }, [TestCourseList, isOnline]);

  const [toggles, setToggles] = useState(
    Array(TestCourseList.length).fill(false)
  );

  const handleToggle = (index) => {
    const newToggles = [...toggles];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);
  };

  const handleSubToggle = async (index, topic_id) => {
    const newToggles = [...toggles];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);
    try {
      const responses = await axiosInstance.post(
        `/v2_data_model/get_video_topic_wise_list`,
        { user_id: user_id, course_id: course_Id, topic_id: topic_id }
      );
      SetVideoPyq(responses.data.data.vedio_list);
    } catch (err) {
      console.log(err);
    }

    // setShowSchedules(!showSchedules);
  };

  const StartNew = (testid) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;
      // Open the new window
      window.open(`/test-home/cho/${user_id}t${testid}`, "_blank", features);
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

  const StartPausedNur = (testid) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;

      window.open(
        `/test-panel/nur/paused/${user_id}t${testid}`,
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

      window.open(`/testresult/cho/${user_id}s${sid}`, "_blank", features);
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

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "instant",
  //   });
  // }, []);
  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedTime} ${formattedDate}`;
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Additional logic when online
    };

    const handleOffline = () => {
      setIsOnline(false);
      // Additional logic when offline
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <Internet />;
  } else {
    return (
      <div>
        <div className="page-content position-relative">
          <div className="breadcrumb-row">
            <div className="container">
              <ul className="list-inline">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li style={{ color: "#434343" }}>
                  {localStorage.getItem("coursePlanTitle").slice(1, -1)}
                  {/* {localStorage.getItem("courseTitle")
                    ? localStorage.getItem("coursePlanTitle").slice(1, -1)
                    : !loc.state
                    ? ModuleName
                    : loc.state} */}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <section className="Schedule_schedule_background__kukcH pt-5 pb-0">
          <div className="container">
            <div className="tabsystem">
              <div
                className="nav nav-pills nav-pills-custom"
                style={{ display: "block" }}
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <div className="row">
                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <h3 className="h3">Class Schedules</h3>
                  </div>
                  {courseDetailList?.length != 0 ? (
                    <div
                      className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                      style={{ textAlign: "right" }}
                    >
                      {/* <button
                        className="nav-link1 item active show"
                        onClick={handleToggles}
                      >
                        <i className="fa fa-calendar" style={{}}></i>
                      </button> */}
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
              <div className="tab-content Schedule_schedule_details__Ebvco">
                <div className="tab-pane fade active show">
                  <div id="seeall_curcullam_list">
                    {showSchedules &&
                      courseDetailList?.map((classItem, index) => (
                        <div className="col-xl-6" key={index}>
                          <div
                            className="curriculum-list-box curriDiv"
                            style={{}}
                          >
                            <div>
                              <img
                                src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/114.png"
                                alt=""
                              />
                            </div>
                            <span style={{ width: "70%" }}>
                              {classItem.title}
                            </span>
                            <span
                              style={{
                                width: "30%",
                                textAlign: "right",
                                marginRight: "10px",
                              }}
                            >
                              <p>{classItem.date}</p>
                              <p>
                                {classItem.time} - {classItem.end_time}
                              </p>
                            </span>
                          </div>
                        </div>
                      ))}
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="Schedule_schedule_background__kukcH">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="tabsystem">
                  <div className="wrapper">
                    <div
                      className="nav flex-column nav-pills nav-pills-custom"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      {VideoTopicList?.length != 0 ||
                      VideoTopicLists?.length > 0 ? (
                        <Link
                          style={{ curser: "pointer" }}
                          className="nav-link item"
                          data-toggle="pill"
                          onClick={() => setTab("videoTab")}
                        >
                          <img
                            src="https://damsdelhi.com/images/course-detail/test-icon3.png"
                            alt=""
                          />
                          <span className="d-block mt-3">Videos</span>
                        </Link>
                      ) : (
                        <span></span>
                      )}

                      {TestCourseList?.length != 0 ? (
                        <Link
                          style={{ curser: "pointer" }}
                          className="nav-link item"
                          data-toggle="pill"
                          onClick={() => setTab("Tests")}
                        >
                          <img
                            src="https://damsdelhi.com/images/course-detail/test-icon3.png"
                            alt=""
                          />
                          <span className="d-block mt-3">Notes & Tests</span>
                        </Link>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </div>
                  <div className="tab-content Schedule_schedule_details__Ebvco">
                    {TabList == "Tests" ? (
                      <div
                        id="testtab"
                        className="Schedule_schedule_details__Ebvco active show"
                      >
                        <div className="row">
                          <div className="accordion" id="faq">
                            {TestCourseList?.map((item, index) => (
                              <div className="col-lg-12 p-0">
                                <div className="card mb-3">
                                  <div
                                    className="card-header position-relative"
                                    id="faqhead64"
                                    onClick={() => handleToggle(index)}
                                  >
                                    <a className="collapsed">
                                      <img
                                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/course-plan/course/deadly-combo.svg"
                                        alt=""
                                      />
                                      {item.title}{" "}
                                    </a>
                                  </div>
                                  {toggles[index] &&
                                    item?.data.map((submod, key) =>
                                      submod.test_series_name ? (
                                        <div
                                          className="card-body"
                                          is_paused={submod.is_paused}
                                        >
                                          <div className="text-plan">
                                            <div className="test-series-g">
                                              <div className="row">
                                                <div className="col-3 col-sm-2 col-md-2 col-lg-1 col-xl-1">
                                                  <div className="imgtext">
                                                    <img
                                                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/course-plan/course/set.svg"
                                                      alt=""
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-7 col-sm-7 col-md-7 col-lg-8 col-xl-8">
                                                  <div className="tttetx">
                                                    <p className="m-0">
                                                      {submod.test_series_name
                                                        ? submod.test_series_name
                                                        : submod.title}
                                                    </p>

                                                    <p className="m-0">
                                                      Ques :{" "}
                                                      {submod.total_questions} |
                                                      Mins :{" "}
                                                      {submod.time_in_mins}
                                                    </p>
                                                    <p>
                                                      Start Date:{" "}
                                                      {submod.test_start_date}
                                                    </p>
                                                    <p>
                                                      End Date:{" "}
                                                      {submod.test_end_date}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="col-2 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-right">
                                                  <span
                                                    className="mt-3"
                                                    submodis_paused={
                                                      submod.is_paused
                                                    }
                                                  >
                                                    {submod.seg_id &&
                                                    isFutureDate(
                                                      submod.test_result_date
                                                    ) &&
                                                    submod.is_paused != 1 ? (
                                                      <Link
                                                        style={{
                                                          float: "right",
                                                        }}
                                                        className="reviewBtn"
                                                        onClick={() =>
                                                          ResultWait(
                                                            submod.test_result_date
                                                          )
                                                        }
                                                      >
                                                        Review
                                                      </Link>
                                                    ) : submod.seg_id &&
                                                      submod.nursing_testing ==
                                                        "1" &&
                                                      submod.is_paused != 1 ? (
                                                      <Link
                                                        style={{
                                                          float: "right",
                                                        }}
                                                        className="reviewBtn"
                                                        onClick={() =>
                                                          ResultViewSec(
                                                            submod.seg_id
                                                          )
                                                        }
                                                      >
                                                        Review
                                                      </Link>
                                                    ) : submod.seg_id &&
                                                      submod.is_paused != 1 ? (
                                                      <Link
                                                        style={{
                                                          float: "right",
                                                        }}
                                                        className="reviewBtn"
                                                        onClick={() =>
                                                          ResultView(
                                                            submod.seg_id
                                                          )
                                                        }
                                                      >
                                                        Review
                                                      </Link>
                                                    ) : submod.is_paused == 1 &&
                                                      submod.nursing_testing ==
                                                        1 ? (
                                                      <Link
                                                        to={""}
                                                        style={{
                                                          float: "right",
                                                        }}
                                                        className="reviewBtn"
                                                        onClick={() =>
                                                          StartPausedNur(
                                                            submod.id
                                                          )
                                                        }
                                                      >
                                                        Continue
                                                      </Link>
                                                    ) : submod.is_paused == 1 &&
                                                      submod.nursing_testing !=
                                                        1 ? (
                                                      <Link
                                                        to={""}
                                                        style={{
                                                          float: "right",
                                                        }}
                                                        className="reviewBtn"
                                                        onClick={() =>
                                                          StartPaused(submod.id)
                                                        }
                                                      >
                                                        Paused
                                                      </Link>
                                                    ) : (submod.is_paused ==
                                                        "" ||
                                                        submod.is_paused ==
                                                          "0") &&
                                                      submod.nursing_testing ==
                                                        "1" &&
                                                      !isFutureDateTime(
                                                        submod.test_start_date
                                                      ) &&
                                                      submod.is_expire != 1 ? (
                                                      <Link
                                                        to={""}
                                                        style={{
                                                          float: "right",
                                                        }}
                                                        className="reviewBtn"
                                                        onClick={() =>
                                                          StartNewSec(submod.id)
                                                        }
                                                      >
                                                        Start Test
                                                      </Link>
                                                    ) : submod.is_paused ==
                                                        "" &&
                                                      !isFutureDateTime(
                                                        submod.test_start_date
                                                      ) &&
                                                      submod.is_expire != 1 ? (
                                                      <Link
                                                        to={""}
                                                        style={{
                                                          float: "right",
                                                        }}
                                                        className="reviewBtn"
                                                        onClick={() =>
                                                          StartNew(submod.id)
                                                        }
                                                      >
                                                        Start Test
                                                      </Link>
                                                    ) : (submod.is_paused ==
                                                        "" ||
                                                        submod.is_paused ==
                                                          "0") &&
                                                      isFutureDateTime(
                                                        submod.test_start_date
                                                      ) &&
                                                      submod.is_expire != 1 ? (
                                                      <Link
                                                        to={""}
                                                        style={{
                                                          float: "right",
                                                        }}
                                                        className="reviewBtn"
                                                        onClick={() =>
                                                          HandleEarlyTest(
                                                            submod.test_start_date
                                                          )
                                                        }
                                                      >
                                                        <FaLock size={20} />
                                                      </Link>
                                                    ) : (
                                                      <Link
                                                        to={""}
                                                        style={{
                                                          float: "right",
                                                          backgroundColor:
                                                            "red",
                                                        }}
                                                        className="reviewBtn"
                                                      >
                                                        Expired
                                                      </Link>
                                                    )}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div
                                          className="card-body"
                                          is_paused={submod.is_paused}
                                        >
                                          <div className="text-plan">
                                            <div className="test-series-g">
                                              <div className="row">
                                                <div className="col-3 col-sm-2 col-md-2 col-lg-1 col-xl-1">
                                                  <div className="imgtext">
                                                    <img
                                                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/course-plan/course/set.svg"
                                                      alt=""
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-7 col-sm-7 col-md-7 col-lg-8 col-xl-8">
                                                  <div className="tttetx">
                                                    <p className="m-0">
                                                      {submod.test_series_name
                                                        ? submod.test_series_name
                                                        : submod.title}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="col-2 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-right">
                                                  <span>
                                                    <a
                                                      href="#"
                                                      className="add_modal1"
                                                      onClick={() =>
                                                        handleTest()
                                                      }
                                                    >
                                                      <em
                                                        className="fa fa-download"
                                                        style={{
                                                          float: "right",
                                                        }}
                                                      ></em>
                                                    </a>
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div id="bookstab" className="tab-pane fade active show">
                        <div id="seeall_curcullam_list">
                          {VideoTopicList?.map((result) => (
                            <div
                              className="curriculum-list-box curriDiv"
                              style={{ float: "right", width: "100%" }}
                            >
                              <div>
                                <img
                                  src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/icon/play-icon.png"
                                  alt=""
                                />
                              </div>
                              <span style={{ width: "100%" }}>
                                <strong>
                                  {result.title}
                                  &nbsp;video
                                </strong>
                                <p>Video : 07:00:00 mins</p>
                              </span>

                              <span className="add_modal2">
                                <Link to={""} onClick={() => handleModel()}>
                                  <em className="fa fa-eye"></em>
                                </Link>
                              </span>
                            </div>
                            // <hr />
                          ))}
                          <input
                            type="hidden"
                            name="mrp"
                            value="0"
                            id="mrp_in"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="tab-content Schedule_schedule_details__Ebvco">
                    {TabList == "videoTab" ? (
                      <div
                        id="testtab"
                        className="Schedule_schedule_details__Ebvco active show"
                      >
                        <div className="row">
                          <div className="accordion" id="faq">
                            {VideoTopicLists?.map((item, index) => (
                              <div className="col-lg-12 p-0">
                                <div className="card mb-3">
                                  <div
                                    className="card-header position-relative"
                                    id="faqhead64"
                                    //onClick={() => handleToggle(index)}
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      handleSubToggle(index, item.id)
                                    }
                                  >
                                    <a className="collapsed">
                                      <img
                                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/course-plan/course/deadly-combo.svg"
                                        alt=""
                                      />
                                      {item.title}{" "}
                                    </a>
                                  </div>
                                  {toggles[index] &&
                                    VideoPyqList?.map((submod, key) =>
                                      submod.video_title ? (
                                        <div className="card-body">
                                          <div className="text-plan">
                                            <div className="test-series-g">
                                              <div className="row">
                                                <div className="col-3 col-sm-2 col-md-2 col-lg-1 col-xl-1">
                                                  <div className="imgtext">
                                                    <img
                                                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/course-plan/course/set.svg"
                                                      alt=""
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-7 col-sm-7 col-md-7 col-lg-8 col-xl-9">
                                                  <div className="tttetx">
                                                    <p className="m-0">
                                                      {submod.video_title}
                                                    </p>
                                                    {submod.live_on !== "" ? (
                                                      <p className="m-0">
                                                        Live on:
                                                        <span
                                                          style={{
                                                            marginLeft: "5px",
                                                          }}
                                                        >
                                                          {convertTimestamp(
                                                            submod.live_on
                                                          )}
                                                        </span>
                                                      </p>
                                                    ) : (
                                                      <p className="m-0">
                                                        Video Length:
                                                        <span className="ml-2">
                                                          {submod.duration}
                                                        </span>
                                                      </p>
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="col-7 col-sm-2 col-md-2 col-lg-2 col-xl-2 text-right">
                                                  <div className="tttetx">
                                                    <p className="float-right">
                                                      <em
                                                        className="fa fa-eye"
                                                        style={{
                                                          color: "#2a88de",
                                                          fontSize: "18px",
                                                          cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                          handleModel()
                                                        }
                                                      ></em>
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div
                                          className="card-body"
                                          is_paused={submod.is_paused}
                                        >
                                          <div className="text-plan">
                                            <div className="test-series-g">
                                              <div className="row">
                                                <div className="col-3 col-sm-2 col-md-2 col-lg-1 col-xl-1">
                                                  <div className="imgtext">
                                                    <img
                                                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/course-plan/course/set.svg"
                                                      alt=""
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-7 col-sm-7 col-md-7 col-lg-8 col-xl-8">
                                                  <div className="tttetx">
                                                    <p className="m-0">
                                                      {submod.test_series_name
                                                        ? submod.test_series_name
                                                        : submod.title}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="col-2 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-right">
                                                  <span>
                                                    <a
                                                      href="#"
                                                      className="add_modal1"
                                                      onClick={() =>
                                                        handleTest()
                                                      }
                                                    >
                                                      <em
                                                        className="fa fa-download"
                                                        style={{
                                                          float: "right",
                                                        }}
                                                      ></em>
                                                    </a>
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div id="bookstab" className="tab-pane fade active show">
                        <div id="seeall_curcullam_list">
                          {VideoTopicLists?.map((result) => (
                            <div
                              className="curriculum-list-box curriDiv"
                              style={{ float: "right", width: "100%" }}
                            >
                              <div>
                                <img
                                  src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/icon/play-icon.png"
                                  alt=""
                                />
                              </div>
                              <span style={{ width: "100%" }}>
                                <strong>
                                  {result.title}
                                  &nbsp;video
                                </strong>
                                <p>Video : 07:00:00 mins</p>
                              </span>

                              <span className="add_modal2">
                                <Link to={""} onClick={() => handleModel()}>
                                  <em className="fa fa-eye"></em>
                                </Link>
                              </span>
                            </div>
                            // <hr />
                          ))}
                          <input
                            type="hidden"
                            name="mrp"
                            value="0"
                            id="mrp_in"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default ClassSchedulesDetails;
