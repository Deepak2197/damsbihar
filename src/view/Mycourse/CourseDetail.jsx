import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/course-detail/style.css";
import "../../assets/css/course-detail/responsive.css";
import axiosInstance from "../../API/axiosConfig";

const CourseDetail = () => {
  const user_id = sessionStorage.getItem("id");

  const [courseDetailList, setCourseDetailList] = useState([]);
  const [showSchedules, setShowSchedules] = useState(false);

  const handleToggle = () => {
    setShowSchedules(!showSchedules);
  };

  const getAllCourseDetail = async () => {
    let courseId = JSON.parse(localStorage.getItem("course_Id"));
    try {
      const response = await axiosInstance.post(
        "/v2_data_model/get_course_detail",
        { user_id: user_id, id: courseId }
      );
      setCourseDetailList(response.data.data.course_schedule);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCourseDetail();
  }, []);

  return (
    <div className="Course-detail">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li style={{ color: "#434343" }}>My Course detail</li>
            </ul>
          </div>
        </div>
      </div>
      <section
        className="Schedule_schedule_background__kukcH"
        style={{ padding: "0px 0" }}
      >
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
                <div className="col-xl-6">
                  <h3 className="h3">Class Schedules</h3>
                </div>
                <div className="col-xl-6" style={{ textAlign: "right" }}>
                  <button
                    className="nav-link1 item active show"
                    onClick={handleToggle}
                  >
                    <i
                      className="fa fa-calendar"
                      aria-hidden="true"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="tab-content Schedule_schedule_details__Ebvco">
              <div className="tab-pane fade active show">
                <div id="seeall_curcullam_list" className="row">
                  {showSchedules &&
                    courseDetailList.map((classItem, index) => (
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
    </div>
  );
};

export default CourseDetail;
