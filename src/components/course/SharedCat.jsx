import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Spin } from "antd";
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
import { Helmet } from "react-helmet-async";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

function SharedCat({ setIsAuthenticated, slug }) {
  const { name } = useParams();
  const navigate = useNavigate();

  const [counter, setCounter] = useState(62);
  const [CourseSubsdata, SetCourseSubsdata] = useState([]);
  const [toggleEmailOrPhone, setToggleEmailOrPhone] = useState("number");
  const [courseData, setCourseData] = useState([]);
  const [courseData1, setCourseData1] = useState([]);
  const [activeTab, setActiveTab] = useState(null); // State to keep track of active tab
  const [loding, setLoding] = useState(false);
  const catID = `${window.location}`;
  const url = catID.split("#");
  const subId = url[1];
  const Slug = slug;

  const [enrolled, setEnrolled] = useState(false);
  const [meta_Data, setMeta_Data] = useState([]);

  const Course_Name = JSON.parse(localStorage.getItem("Course_Name"));
  const [userId, setUserId] = useState(null);
  const user_id = Number(sessionStorage.getItem("id"));
  const [ShowPopupSubscription, setShowPopupSubscription] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [planId, setPlanId] = useState(null);

  const [isSignInModalOpen, setSignInModalOpen] = useState(false);


  const GetData = async (user_id) => {
    await axiosInstance
      .post(API_ENDPOINTS.COURSEACESS_HOMEPAGE.GET_PLANE_BY_CATEGORY_ID, {
        user_id: user_id ? user_id : 4,
        slug: slug,
      })
      .then((response) => {
        setMeta_Data(response?.data?.data?.seo_catlist);
        setCourseData(response.data?.data?.plan_list || []);
        setLoding(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    setUserId(user_id);
    // Fetch data from the first API when component mounts
    GetData(user_id);
    if (subId) {
      handleClick(subId);
    }
  }, []);

  const handleClick = (id) => {
    // Fetch data for the clicked tab
    axiosInstance
      .post(API_ENDPOINTS.COURSEACESS_HOMEPAGE.GET_PLANE_BY_CATEGORY_ID, {
        user_id: user_id ? user_id : 4,
        slug: slug,
      })
      .then((response) => {
        const foundCourse = response.data?.data?.plan_list.find(
          (course) => course.id === id
        );
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
  };

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
  const checkvalidater = async (courseId, coursePrice) => {
    if (coursePrice == 0) {
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
    // Make AJAX request
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

  // modal
  const creId = localStorage.getItem("idTocredentials");

  // useEffect(() => {
  //   const timer =
  //     counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
  //   return () => clearInterval(timer);
  // }, [counter]);

  // const handleClickFun = () => {
  //   setCounter(60);
  // };
  const location = useLocation();
  const routeAfterSlash = location.pathname.substring(1);

  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (routeAfterSlash == "NEET-PG-NEXT") {
      document.title =
        "NEET PG Preparation: Online | Offline Coaching for NEET PG";
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Prepare effectively for NEET PG with comprehensive online and offline coaching. Get expert
      guidance, practice tests, study materials to ace your NEET PG Exam`
        );
      }
      if (metaKeywords) {
        metaKeywords.setAttribute(
          "content",
          `NEET PG, NEET PG Entrance Exam, Online Coaching for NEET PG, NEET PG Coaching,
      NEET PG Preparation, NEET PG Online Coaching, NEET PG Exam Preparation, NEET PG
      Classes, best coaching for neet pg in india, neet pg courses, neet pg coaching in delhi`
        );
      }
    }

    if (routeAfterSlash == "TND-Courses-NEET-PG-INICET") {
      document.title =
        "INICET Coaching for AIIMS PG 2024 | INICET TND; NEET PG TND";
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Discover our expertly crafted TND courses for NEET PG; INICET, ensuring your success in both
      exams and elevating your medical career.`
        );
      }
      if (metaKeywords) {
        metaKeywords.setAttribute(
          "content",
          `INICET, INICET Entrance Exam, Online Coaching for INICET, INICET Coaching, INICET Preparation,
      INICET Online Coaching, INICET Exam Preparation, INICET Classes`
        );
      }
    }

    if (routeAfterSlash == "1st-Year-2nd-Year-MBBS") {
      document.title =
        "NEET PG Courses &amp; PG Medical Education for 1st; 2nd Year MBBS";
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Specialized NEET PG courses; PG medical tailored for 1st; 2nd-year MBBS students. Elevate your
      career with DAMS expert guidance; comprehensive study materials`
        );
      }
      if (metaKeywords) {
        metaKeywords.setAttribute(
          "content",
          `NEET PG preparation, Medical PG coaching, PG medical entrance exams, NEET PG coaching institute,
      1st-year MBBS students, 2nd-year MBBS students, PG medical courses, PG Medical exam
      preparation, NEET PG study materials, Best coaching for NEET PG`
        );
      }
    }

    if (routeAfterSlash == "FMGE") {
      document.title =
        "FMGE Coaching | Best MCI Coaching | FMGE Online Coaching";
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Prepare for the FMGE exam with best MCI coaching at DAMS Delhi. Our FMGE Coaching offers
      comprehensive preparation to help foreign medical graduates succeed`
        );
      }
      if (metaKeywords) {
        metaKeywords.setAttribute(
          "content",
          `FMGE, FMGE Entrance Exam, Online Coaching for FMGE, FMGE Coaching, FMGE Preparation, FMGE
      Online Coaching, FMGE Exam Preparation, FMGE Classes`
        );
      }
    }

    if (routeAfterSlash == "USMLE,-PLAB") {
      document.title =
        "Online USMLE | PLAB Coaching in India | USMLE &amp; PLAB Test";
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Elevate your medical career with premier online coaching for USMLE | PLAB exams in India. Gain
      comprehensive preparation to ace your USMLE; PLAB tests.`
        );
      }
      if (metaKeywords) {
        metaKeywords.setAttribute(
          "content",
          `USMLE coaching, USMLE preparation, USMLE online coaching, USMLE classes, USMLE course, USMLE
      study materials, USMLE practice tests, USMLE review, USMLE exam, USMLE step 1 coaching, USMLE
      step 2 coaching, USMLE mock exams, USMLE tips and tricks, USMLE books, , USMLE coaching
      centers, PLAB coaching, PLAB preparation, PLAB online coaching, PLAB classes, PLAB course, PLAB
      study materials, PLAB practice tests`
        );
      }
    }
    if (routeAfterSlash == "NEET-MDS") {
      document.title =
        "NEET MDS Coaching | MDS Coaching Online | Dental PG Coaching";
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Prepare for NEET MDS with expert guidance from DAMS Delhi. Our comprehensive courses ensure
      thorough preparation for your Dental PG Exam. Join us to ace NEET MDS`
        );
      }
      if (metaKeywords) {
        metaKeywords.setAttribute(
          "content",
          `NEET MDS, NEET MDS Entrance Exam, Online Coaching for NEET MDS, NEET MDS Coaching, NEET
      MDS Preparation, NEET MDS Online Coaching, NEET MDS Exam Preparation, NEET MDS Classes`
        );
      }
    }
    if (routeAfterSlash == "Nursing") {
      document.title =
        "Nursing Courses | Advance Your Nursing Career with DAMS Delhi";
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Advance your nursing career with DAMS Delhi&#39;s specialized courses for NORCET, NHM &amp; CHO exams.
      Get expert guidance and comprehensive preparation for success`
        );
      }
      if (metaKeywords) {
        metaKeywords.setAttribute(
          "content",
          `Nursing courses, NORCET preparation, NHM nursing courses, CHO exam preparation, Nursing career
      advancement, Nursing entrance exams, Nursing officer recruitment, Nursing job preparation,
      Nursing exam coaching, Nursing education institute, Nursing career development, Nursing course
      syllabus, Nursing training programs, Nursing professional courses, Nursing entrance test coaching`
        );
      }
    }

    return () => {
      document.title = "Neet PG Preparation, Neet PG Coaching, FMGE, USMLE";
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          "Prepare for NEET PG, FMGE, USMLE, NEET MDS, exams with DAMS' expert coaching. Access study materials, NEET PG Mock Tests, Neet PG Test series to Ace Neet PG Exam"
        );
      }
      if (metaKeywords) {
        metaKeywords.setAttribute(
          "content",
          `Neet pg, neet pg online, neet pg live, NEET PG coaching classes, Best NEET PG coaching, NEET PG coaching institutes, NEET PG coaching online, NEET PG coaching centers, Top NEET PG coaching, NEET PG coaching near me, NEET PG coaching fees, NEET PG coaching in india, NEET PG coaching reviews, NEET PG coaching, NEET PG coaching faculty, NEET PG coaching programs, NEET PG coaching schedule, NEET PG coaching success rate, NEET PG coaching books, NEET PG coaching mock tests, NEET PG coaching video lectures, NEET PG coaching tips, NEET PG coaching online registration, fmge coaching, fmge classes, usmle coaching, usmle preparation, neet pg recorded, neet pg video, neet pg entrance`
        );
      }
    };
  }, []);
  const meta_image = meta_Data?.banner?.[0]?.image;
  const meta_title = meta_Data?.meta_title;
  const meta_description = meta_Data.meta_description;
  const meta_keywords = meta_Data.meta_keywords;

  // Sharing
  // const catidd = localStorage.getItem("Slug");
  // const handleShare = async () => {
  //   if (!catidd) {
  //     console.error("No plan ID found!");
  //     return;
  //   }
  //   const url = `${window.location.origin}?cat_id=${catidd.slice(1, -1)}`;
  //   const shareText = "Check out this post";
  //   if (navigator.share) {
  //     try {
  //       await navigator.share({
  //         title: courseData.title,
  //         text: shareText,
  //         url,
  //       });
  //     } catch (error) {
  //       console.error("Error sharing:", error);
  //     }
  //   } else if (typeof navigator !== "undefined" && navigator.clipboard) {
  //     try {
  //       await navigator.clipboard.writeText(url);
  //       alert("Link copied to clipboard!");
  //     } catch (error) {
  //       console.error("Could not copy text:", error);
  //     }
  //   } else {
  //     alert("Clipboard API not supported.");
  //   }
  // };

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
            content={`${window.location.origin}?slug=${Slug}#${activeTab}`}
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
        {loding ? (
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
                          <ul>
                            {course?.module_data.map((module) => (
                              <li key={module.id}>
                                <span>
                                  <img
                                    src={`https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/course-plan/${
                                      module.exist === 1
                                        ? "check.svg"
                                        : "close.svg"
                                    }`}
                                    loading="lazy"
                                    alt="icon image"
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
                                onClick={() =>
                                  openSubcrictionInModal(course.id)
                                }
                                style={{ cursor: "pointer" }}
                                className="byu-now"
                              >
                                Enroll Now
                              </a>
                            </div>
                          ) : course.mrp == 0 ? (
                            <div className="enrollBtn">
                              <a
                                onClick={() =>
                                  checkvalidater(course?.id, course?.mrp)
                                }
                                style={{ cursor: "pointer" }}
                                className="byu-now"
                              >
                                {course?.is_purchased == 1 || enrolled
                                  ? "Enrolled"
                                  : "Enroll Now"}
                              </a>
                            </div>
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
                                onClick={() =>
                                  openSubcrictionInModal(course.id)
                                }
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
                                onClick={() =>
                                  openSubcrictionInModal(course.id)
                                }
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
                                onClick={() =>
                                  openSubcrictionInModal(course.id)
                                }
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
                                onClick={() =>
                                  openSubcrictionInModal(course.id)
                                }
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
                                onClick={() =>
                                  openSubcrictionInModal(course.id)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                Enroll Now
                              </a>
                            </div>
                          ) : (
                            <div className="enrollBtn">
                              <a
                                onClick={() =>
                                  openSubcrictionInModal(course.id)
                                }
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
                                              {course.free_trial_duration}{" "}
                                              Day(s) Remaining
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
                    <Link to={"/help-and-support"} target="_blank">
                      <ul className="m-0" style={{ width: "600px" }}>
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

                  {/* <div className="share">
                  <a onClick={handleShare}>
                    <ul className="m-0">
                      <li>Share</li>
                      <li className="float-right">
                      <FaShare size={18} color="white" style={{marginLeft:'5px'}}/>
                      </li>
                    </ul>
                  </a>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Spin />
          </div>
        )}
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

export default SharedCat;
