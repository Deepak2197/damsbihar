import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../assets/css/course-plan/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/plain.css";
import "../../assets/css/course-plan/responsive.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../apiConfig";
import Subscription from "../course/Subscription";
const correctStyle = { cursor: "pointer" };
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import SignInModal from "../SignInModal/SignInModal";
import Login from "../Login/Login";
import axiosInstance from "../../API/axiosConfig";
import { FaShare } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
function CoursePlan({ setIsAuthenticated }) {
  const { name } = useParams();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(62);
  const [CourseSubsdata, SetCourseSubsdata] = useState([]);
  const [toggleEmailOrPhone, setToggleEmailOrPhone] = useState("number");
  const [courseData, setCourseData] = useState([]);
  const [courseData1, setCourseData1] = useState([]);
  const [activeTab, setActiveTab] = useState(null); // State to keep track of active tab
  const Catid = JSON.parse(localStorage.getItem("Catid"));
  const [enrolled, setEnrolled] = useState(false);
  //alert(course_id);
  const Course_Name = JSON.parse(localStorage.getItem("Course_Name"));
  const [userId, setUserId] = useState(null);
  const user_id = Number(sessionStorage.getItem("id"));
  const [ShowPopupSubscription, setShowPopupSubscription] = useState(false);
  //free trial
  const [showModal, setShowModal] = useState(false);
  const [planId, setPlanId] = useState(null);
  const [meta_Data, setMeta_Data] = useState([]);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [productSlug, setProductSlug] = useState("");

  useEffect(() => {
    setUserId(user_id);
    // Fetch data from the first API when component mounts
    axiosInstance
      .post(API_ENDPOINTS.COURSEACESS_HOMEPAGE.GET_PLANE_BY_CATEGORY_ID, {
        user_id: user_id ? user_id : 4,
        cat_id: Catid,
      })
      .then((response) => {
        setCourseData(response.data?.data?.plan_list || []);
        setMeta_Data(response?.data?.data?.seo_catlist);
        setProductSlug(response?.data?.data?.seo_catlist?.slug);
        // Trigger handleClick on default window load if there's no activeTab
        if (activeTab === null && response.data?.data?.plan_list.length > 0) {
          handleClick(response.data?.data?.plan_list[0].id);
          ///alert(response.data?.data?.plan_list[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClick = (id) => {
    // Fetch data for the clicked tab
    axiosInstance
      .post(API_ENDPOINTS.COURSEACESS_HOMEPAGE.GET_PLANE_BY_CATEGORY_ID, {
        user_id: user_id ? user_id : 4,
        cat_id: Catid,
      })
      .then((response) => {
        const foundCourse = response?.data?.data?.plan_list.find(
          (course) => course.id === id
        );
        sessionStorage.setItem("combo_course_id", foundCourse?.combo_course_id);

        if (foundCourse) {
          setCourseData1([foundCourse]);
          setActiveTab(id); // Set active tab
        } else {
          setCourseData1([]);
          setActiveTab(null); // Clear active tab
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    window.scroll({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  };

  const meta_image = meta_Data?.banner?.[0]?.image;
  const meta_title = meta_Data?.meta_title;
  const meta_description = meta_Data.meta_description;
  const meta_keywords = meta_Data.meta_keywords;

  const closeSubcrictionInModal = () => {
    setShowPopupSubscription(false);
  };
  const openSubcrictionInModal = (id) => {
    const sess_id = sessionStorage.getItem("id");

    if (sess_id) {
      setShowPopupSubscription(true);
    } else {
      setSignInModalOpen(true);
    }
  };
  const [spin, setspin] = useState(false);
  const checkvalidater = async (courseId, coursePrice) => {
    if (coursePrice == 0) {
      setspin(true);
      const res = await axiosInstance.post(
        `/v2_data_model/free_course_transaction_test`,
        {
          course_price: coursePrice,
          course_id: courseId,
          coupon_applied: "",
          points_used: "",
          tax: "",
          points_rate: "",
          user_id: user_id,
        }
      );

      if (res?.data?.status) {
        setspin(false);
        setEnrolled(true);
        toast.success(res?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const handleFreeTrialNow = (planId) => {
    axiosInstance
      .post(API_ENDPOINTS.JOIN_AFFILIATE.AFFILIATE_ROLE, {
        user_id: user_id,
        course_id: planId,
      })
      .then((response) => {
        // Show success message and reload page

        if (response.data.status) {
          toast.success("Free trial activated", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          location.reload();
        } else if (response.data.status === 2) {
          // Handle status 2
          //setShowModal(true);
        } else {
        }
      })
      .catch((error) => {
        // Handle error
        // Show error message
      });
  };

  const handlerClose = () => {
    setSignInModalOpen(false);
  };

  const handleSignInSuccess = () => {
    setSignInModalOpen(false);
  };

  const creId = localStorage.getItem("idTocredentials");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleClickFun = () => {
    setCounter(60);
  };
  const location = useLocation();

  //sharing
  const catidd = localStorage.getItem("Catid");
  const handleShare = async () => {
    if (!catidd) {
      console.error("No plan ID found!");
      return;
    }
    const url = `${window.location.origin}?slug=${productSlug}#${activeTab}`;
    const shareText = "Check out this post";
    if (navigator.share) {
      try {
        await navigator.share({
          title: courseData.title,
          text: shareText,
          url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Could not copy text:", error);
      }
    } else {
      alert("Clipboard API not supported.");
    }
  };

  return (
    <>
      <div className="page-content position-relative">
        <Helmet>
          {/* Basic SEO tags */}
          <title>{meta_title}</title>
          <meta name="description" content={meta_description} />
          <meta name="keywords" content={meta_keywords} />

          {/* Open Graph tags for product sharing */}
          <meta property="og:type" content="product" />
          <meta property="og:title" content={meta_title} />
          <meta property="og:description" content={meta_description} />
          <meta
            property="og:url"
            content={`${window.location.origin}?slug=${productSlug}#${activeTab}`}
          />
          <meta property="og:image" content={meta_image} />
          <meta property="og:site_name" content="DAMS" />
        </Helmet>
        <div className="breadcrumb-row d-none">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>{Course_Name}</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="plan-Neet-Pg">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 position-relative">
              <ul className="nav nav-pills scrollmenu" role="tablist">
                {courseData.map((course) => (
                  <li key={course.id} className="nav-item">
                    <a
                      className={`nav-link ${
                        activeTab === course.id ? "active" : ""
                      }`}
                      onClick={() => handleClick(course.id)}
                    >
                      {course?.title}
                      <br />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="tab-content">
                {activeTab &&
                  courseData1.map((course) => (
                    <div
                      key={course.id}
                      id={course.title.replace(/\s/g, "")}
                      className="tab-pane active"
                    >
                      <div className="inclusions-text position-relative">
                        <h3>{course?.title} </h3>
                        {/* <ul>
                          {course?.module_data.map((module) => (
                            <li key={module.id}>
                              <span>
                                <img
                                  src={`https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/course-plan/${
                                    module.exist == 1
                                      ? "check.svg"
                                      : "close.svg"
                                  }`}
                                  loading="lazy" alt="icon image"
                                />
                              </span>
                              {module?.module_name}
                            </li>
                          ))}
                        </ul> */}
                        <ul>
                          {course?.module_data
                            .filter((module) => Number(module.exist) === 1)
                            .map((module) => (
                              <li key={module.id}>
                                <span>
                                  <img
                                    src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/course-plan/check.svg"
                                    alt="course-plan"
                                  />
                                </span>
                                {module?.module_name}
                              </li>
                            ))}
                        </ul>

                        {creId === "1" &&
                        course.is_purchased === "1" &&
                        course.is_renew === "1" &&
                        course?.mrp != 0 ? (
                          <div className="enrollBtn">
                            <a
                              onClick={() => openSubcrictionInModal(course.id)}
                              style={{ cursor: "pointer" }}
                              className="byu-now"
                            >
                              Enroll Now
                            </a>
                          </div>
                        ) : course.mrp == 0 ? (
                          course?.is_purchased == 1 || enrolled ? (
                            <div className="enrollBtn">
                              <a
                                style={{ backgroundColor: "#00A859" }}
                                className="byu-now "
                              >
                                Enrolled
                              </a>
                            </div>
                          ) : (
                            <div className="enrollBtn">
                              <a
                                onClick={() =>
                                  checkvalidater(course?.id, course?.mrp)
                                }
                                style={{ cursor: "pointer" }}
                                className="byu-now"
                              >
                                {spin ? <Spinner /> : "Enroll Now"}
                              </a>
                            </div>
                          )
                        ) : creId === "1" &&
                          course.is_purchased === "1" &&
                          course.is_free_trial === false ? (
                          <div className="enrollBtn">
                            <a
                              className="byu-now"
                              style={{
                                background: "#66d969",
                                color: "#fff",
                              }}
                            >
                              Plan Already Purchased
                            </a>
                          </div>
                        ) : creId === "1" &&
                          course.is_purchased === "0" &&
                          course.by_free_trial === "0" &&
                          course.is_free_trial === false ? (
                          <div className="enrollBtn">
                            <a
                              className="byu-now"
                              onClick={() => openSubcrictionInModal(course.id)}
                              style={{ cursor: "pointer" }}
                            >
                              Enroll Now
                            </a>
                          </div>
                        ) : creId === "1" &&
                          course.is_purchased === "0" &&
                          course.by_free_trial === "1" &&
                          course.is_free_trial === false ? (
                          <div className="enrollBtn">
                            <a
                              className="byu-now"
                              onClick={() => openSubcrictionInModal(course.id)}
                              style={{ cursor: "pointer" }}
                            >
                              Enroll Now
                            </a>
                          </div>
                        ) : creId === "1" &&
                          course.is_purchased === "1" &&
                          course.by_free_trial === "1" &&
                          course.is_free_trial === "0" ? (
                          <div className="enrollBtn">
                            <a
                              className="byu-now"
                              onClick={() => openSubcrictionInModal(course.id)}
                              style={{ cursor: "pointer" }}
                            >
                              Enroll Now
                            </a>
                          </div>
                        ) : creId === "1" &&
                          course.is_purchased === "0" &&
                          course.by_free_trial === null &&
                          course.is_free_trial === true ? (
                          <div className="enrollBtn">
                            <a
                              className="byu-now"
                              onClick={() => openSubcrictionInModal(course.id)}
                              style={{ cursor: "pointer" }}
                            >
                              Enroll Now
                            </a>
                          </div>
                        ) : creId === "1" &&
                          course.is_purchased === "0" &&
                          course.is_renew === "1" &&
                          course.mrp === "0" ? (
                          <div className="enrollBtn">
                            <a
                              className="byu-now"
                              style={{
                                background: "#66d969",
                                color: "#fff",
                              }}
                            >
                              Plan Already Purchased
                            </a>
                          </div>
                        ) : creId === "1" && course.mrp === 0 ? (
                          <div className="enrollBtn">
                            <a
                              onClick={() =>
                                checkvalidater(course.id, course.mrp)
                              }
                              className="byu-now"
                              style={{ cursor: "pointer" }}
                            >
                              Enroll Now
                            </a>
                          </div>
                        ) : creId === "1" &&
                          course.is_purchased === "0" &&
                          course.by_free_trial === null &&
                          course.is_free_trial === false ? (
                          <div className="enrollBtn">
                            <a
                              className="byu-now"
                              onClick={() => openSubcrictionInModal(course.id)}
                              style={{ cursor: "pointer" }}
                            >
                              Enroll Now
                            </a>
                          </div>
                        ) : (
                          <div className="enrollBtn">
                            <a
                              onClick={() => openSubcrictionInModal(course.id)}
                              className="byu-now"
                              style={{ cursor: "pointer" }}
                            >
                              Enroll Now
                            </a>
                          </div>
                        )}
                        <div>
                          {creId == "1" && (
                            <>
                              {course.by_free_trial == "1" &&
                                course.is_purchased == "0" &&
                                !course.is_free_trial && (
                                  <div
                                    className="free-trail enrollBtn"
                                    id="div2"
                                  >
                                    <a
                                      id="input"
                                      className="deactive free-trail"
                                    >
                                      You have already used free trial
                                    </a>
                                  </div>
                                )}
                              {course.is_free_trial == true &&
                                course.is_purchased == "0" && (
                                  <div
                                    className="free-trail enrollBtn"
                                    id="div2"
                                  >
                                    <a
                                      id="input"
                                      onClick={() =>
                                        handleFreeTrialNow(course.id)
                                      }
                                      className="deactive free-trail"
                                      style={{ cursor: "pointer" }}
                                    >
                                      ACTIVE FREE TRIAL
                                      <span className="d-block">
                                        {course.free_trial_duration} Day(s)
                                      </span>
                                    </a>
                                  </div>
                                )}
                              {course.is_free_trial == "0" &&
                                course.is_purchased == "2" && (
                                  <div className="free-trail enrollBtn">
                                    <a className="active free-trail test">
                                      FREE TRIAL ACTIVATED
                                      <span>
                                        {course.is_free_trial != "0" ? (
                                          <span>
                                            {course.free_trial_duration} Day(s)
                                            Remaining
                                          </span>
                                        ) : null}
                                      </span>
                                    </a>
                                  </div>
                                )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="help-share">
                <div className="need-help">
                  <Link to={"/help-and-support"}>
                    <ul className="m-0">
                      <li>
                        <img
                          src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/course-plan/help-desk.svg"
                          loading="lazy"
                          alt="icon image"
                        />
                      </li>
                      <li>Need Help?</li>
                      <li className="float-right">
                        <img
                          src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/course-plan/navigate.svg"
                          loading="lazy"
                          alt="icon image"
                        />
                      </li>
                    </ul>
                  </Link>
                </div>

                <div className="share">
                  <a onClick={handleShare}>
                    <ul className="m-0">
                      {/* <li>Share</li> */}
                      <li>
                        <img src="/web/share.svg" />
                      </li>
                    </ul>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {ShowPopupSubscription && (
          <Subscription
            handleClose={closeSubcrictionInModal}
            courseData1={courseData1}
          />
        )}
      </section>

      {/* modal section */}
      {isSignInModalOpen && (
        <Login
          handlerClose={handlerClose}
          setIsAuthenticated={setIsAuthenticated}
          handleSignInSuccess={handleSignInSuccess}
          setSignInModalOpen={setSignInModalOpen}
        />
      )}
    </>
  );
}

export default CoursePlan;
