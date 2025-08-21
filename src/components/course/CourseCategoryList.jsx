import React, { useState, useEffect } from "react";
import "../../assets/css/category-page/style.css";
import "../../assets/css/category-page/responsive.css";
import CourseSubscriptionModal from "../course/CourseSubscriptionModal";
import axiosInstance from "../../API/axiosConfig";
import SignInModal from "../../components/SignInModal/SignInModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../Login/Login";
import { Modal, Spin, Tooltip } from "antd";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

function CourseCategoryList({ setIsAuthenticated }) {
  const user_id = sessionStorage.getItem("id");
  const [courseDetails, setCourseDetails] = useState({});
  const token = sessionStorage.getItem("jwt_token");
  const [ShowPopupSubscriptionCat, setShowPopupSubscriptionCat] =
    useState(false);
  const [courseData, setCourseData] = useState([]);
  const [CourseDataToFilter, setCourseDataToFilter] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("307547");
  // const user_id = "307547";
  const course_cate_id = JSON.parse(localStorage.getItem("course_cate_id"));
  const course_subcate_id = JSON.parse(
    localStorage.getItem("course_subcate_id")
  );

  const t = new Date(courseDetails?.creation_time);

  const [isSignInModalOpen, setSignInModalOpen] = useState(false);

  const jwt_token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMzk1MDE3IiwiZGV2aWNlX3Rva2VuIjoiZGV2aWNlX3Rva2VuIiwidGltZVN0YW1wIjoiMjAyNC0wNi0yOCAxMjoxODoyMyIsImV4cCI6MTcyNzMzMzMwM30.mP-3c-EuyTeeUyIOkDPER2DBZguXbaUk1eo9hmuzge4";
  const getAllCart = async () => {
    const requestData = {
      user_id: !user_id ? userId : user_id,
      cat_id: course_cate_id,
      sub_cat_id: course_subcate_id,
    };
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.COURSE_CATEGORY.COURSES_BY_CAT_WEB,
        requestData,
        { headers: { Authorization: !token ? jwt_token : token } }
      );
      setCourseData(res?.data?.data?.course_list);
    
      setCourseDataToFilter(res?.data?.data);
    } catch (err) {
    }
  };

  useEffect(() => {
    getAllCart();
  }, []);

  const checkvalidater = (courseId, coursePrice) => {
    if (coursePrice === 0) {
      const requestDatavalidator = {
        course_price: coursePrice,
        course_id: courseId,
        coupon_applied: "",
        points_used: "",
        tax: "",
        points_rate: "",
        user_id: user_id,
      };
      axiosInstance
        .post(
          "/v2_data_model/free_course_transaction_test",
          requestDatavalidator
        )
        .then((response) => {
          const { status, message } = response.data.data.courselist;
          if (status === true) {
            setEnrolled(true);
            toast.success(message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // Do something else if coursePrice is not 0
    }
  };

  const openSubcrictionInModalCat = (id) => {
    const sess_id = sessionStorage.getItem("id");

    if (sess_id) {
      setShowPopupSubscriptionCat(true);
      localStorage.setItem("CourseDataID", id);
    } else {
      setSignInModalOpen(true);
    }
  };
  const closeSubcrictionInModalCat = () => {
    setShowPopupSubscriptionCat(false);
  };
  const handlerClose = () => {
    setSignInModalOpen(false);
  };

  const handleSignInSuccess = () => {
    setSignInModalOpen(false);
  };

  const openDetail = async (id) => {
    setIsImage(true);
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.COURSE_CATEGORY.GET_COURSE_DETAIL,
        {
          user_id: user_id,
          id: id,
          cbt_publish: "",
        }
      );
      if (data.status === true) {
        setCourseDetails(data.data);
       
        setLoading(false);
      } else {
        setCourseDetails({});
        setLoading(false);
      }
    } catch (error) {
   
      setLoading(false);
    }
  };

  return (
    <>
      <div className="profileUpdation">
        <div className="page-content position-relative">
          <div className="breadcrumb-row">
            <div className="container">
              <ul className="list-inline">
                <li>
                  <a href={"/"}>Home</a>
                </li>
                <li>Plan course category</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="categoty_page">
          <div className="container">
            <div className="row live_view">
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <h3 className="cate">{/* Course Categories */}</h3>
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"></div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="UpcomingClasses_upcomingSectionWrapper__2VMOJ UpcomingClasses_upcomingTodayWrapper__3Kc09">
                  {courseData ? (
                    courseData.map((course) => (
                      <div className="Class_class__2Qr_D" key={course.id}>
                        <a>
                          <div className="Class_classImage__Ez4Aq position-relative">
                            <img
                              style={{ cursor: "pointer" }}
                              src={
                                course.cover_image
                                  ? course.cover_image
                                  : "https://damsdelhi.com/src/components/header/login_logo.png"
                              }
                              loading="lazy"
                              alt="icon image"
                              onClick={() => openDetail(course.id)}
                            />

                            {course.mrp !== "0" &&
                            course.for_dams !== "0" &&
                            course.non_dams !== "0" ? (
                              <div className="offer">
                                <p>{"Paid"}</p>
                              </div>
                            ) : (
                              <div className="offer">
                                <p>{"Free"}</p>
                              </div>
                            )}
                          </div>
                        </a>
                        <div className="Class_classDetails__2HITj">
                          <a>
                            <div className="Class_classNameJoinCTA__2jRYq">
                              <div
                                className="Class_className__yAM1H"
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                <Tooltip placement="top" title={course.title}>
                                  {course.title}
                                </Tooltip>
                              </div>
                              <div className="Class_classTag__3DJeE">
                                <span>
                                  <em className="fa fa-star"></em>
                                  {course.rating}
                                </span>
                              </div>
                            </div>
                          </a>
                          <ul className="feature">
                            <li>
                              <img
                                src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/category-page/top faculties.svg"
                                loading="lazy"
                                alt="icon image"
                              />
                              <span className="d-block">
                                Top <br />
                                Faculties
                              </span>
                            </li>
                            <li>
                              <img
                                src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/category-page/Hybrid Learning.svg"
                                loading="lazy"
                                alt="icon image"
                              />
                              <span className="d-block">
                                Hybrid <br />
                                Learning
                              </span>
                            </li>
                            <li>
                              <img
                                src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/category-page/latest content.svg"
                                loading="lazy"
                                alt="icon image"
                              />
                              <span className="d-block">
                                Latest <br />
                                Content
                              </span>
                            </li>
                          </ul>
                          <div className="Class_classNameJoinCTA__2jRYq">
                            <div className="Class_className__yAM1H student">
                              {course.learner}+ Enrolled
                            </div>

                            {course?.is_purchased === false && (
                              <div
                                style={{
                                  background:
                                    course?.is_purchased === true && "red",
                                }}
                                onClick={() =>
                                  openSubcrictionInModalCat(course.id)
                                }
                                className="Class_classReminder__2EOd3 Class_remindMe__3HLYT"
                              >
                                Enroll Now
                              </div>
                            )}
                            {course.mrp === 0 && (
                              <div
                                onClick={() =>
                                  checkvalidater(course.id, course.mrp)
                                }
                                className="Class_classReminder__2EOd3"
                              >
                                Enroll Now
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="Class_classDivider__31mBz"></div>
                      </div>
                    ))
                  ) : (
                    <div>No courses available</div>
                  )}
                </div>
              </div>

              {ShowPopupSubscriptionCat && (
                <CourseSubscriptionModal
                  handleClose={closeSubcrictionInModalCat}
                  CourseDataFilter={CourseDataToFilter}
                />
              )}
            </div>
          </div>
        </section>
      </div>

      {isSignInModalOpen && (
        <Login
          handlerClose={handlerClose}
          setIsAuthenticated={setIsAuthenticated}
          handleSignInSuccess={handleSignInSuccess}
          setSignInModalOpen={setSignInModalOpen}
        />
      )}

      <Modal
        className="imgPopData"
        title="Details"
        open={isImage}
        onOk={() => setIsImage(false)}
        onCancel={() => setIsImage(false)}
        footer={null}
      >
        <div
          className="imgsetdata"
          style={{
            height: loading && "20vh",
          }}
        >
          {loading ? (
            <Spin />
          ) : (
            <>
              <img src={courseDetails?.cover_image} width="50%" />
              <h3>Description</h3>
              <h6
                dangerouslySetInnerHTML={{ __html: courseDetails?.description }}
              />
              <p>
                Created by:<i>{courseDetails?.created_by}</i>
              </p>
              {/* <p>Created by:<i>{t.toLocaleString()}</i></p> */}
              <p>
                Language Available:
                <i>
                  {courseDetails?.language === "0"
                    ? "Hindi"
                    : courseDetails?.language === "2" && "English"}
                </i>
              </p>
              <p>Curriculum:</p>
              <div className="belowBTn">
                {courseDetails?.tiles?.map((itm, i) => (
                  <div className="btndata" key={i}>
                    {itm?.tile_name === "Pdf" ? "Notes & Test" : itm?.tile_name}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export default CourseCategoryList;
