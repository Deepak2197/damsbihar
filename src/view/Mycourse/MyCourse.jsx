import "../../assets/css/performance/style.css";
import "../../assets/css/performance/responsive.css";
import "./style.css";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../API/axiosConfig";
import MyStudyAnalysis from "./MyStudyAnalysis";
import MyCourseOneTab from "./MyCourseOneTab";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
const MyCourse = () => {
  const user_id = sessionStorage.getItem("id");

  const [activeTab] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categoryListShow, setCategoryListShow] = useState([]);
  const [coursecatListShow, setCourseCatListShow] = useState([]);
  const [planID, setPlanID] = useState("");

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const getAllCategoryData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        API_ENDPOINTS.MY_STUDY.GET_LIST_OF_MY_PLANE_COURSES,
        { user_id: user_id }
      );
      //console.log(response?.data?.data?.plan_list, "course");
      //setCategoryListShow(response?.data?.data?.plan_list);
      //setPlanID(response?.data?.data?.plan_list[0]?.id);
      //setCourseCatListShow(response?.data?.data?.course_list);
      const planList = response?.data?.data?.plan_list;
      const courseList = response?.data?.data?.course_list;

      if (planList && planList.length > 0) {
        setCategoryListShow(planList);
        setPlanID(planList[0].id);
      } else {
        setPlanID(null);
      }
      if (courseList && courseList.length > 0) {
        setCourseCatListShow(courseList);
      } else {
        setCourseCatListShow(null);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // const getAllCategoryData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axiosInstance.post(
  //       "/v2_data_model/get_list_of_my_courses",
  //       { user_id: user_id }
  //     );
  //     setCategoryListShow(response.data.data.plan_list);
  //     setPlanID(response.data.data.plan_list[0].id);
  //     setCourseCatListShow(response.data.data.course_list);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    getAllCategoryData();
  }, []);

  return (
    <div className="Mycourse">
      <section className="study-board">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="course-study-tab">
                {planID && <MyStudyAnalysis userID={user_id} planID={planID} />}

                {/* End: schedule button */}
                <div className="tab-content">
                  {
                    activeTab && (
                      <>
                        <div className="scheduleTab">
                          <Link to={"/scheduler"} className="linkbtn">
                            <h4>
                              <span>
                                <em className="fa fa-calendar"></em>
                              </span>
                              Schedule{" "}
                              <span>
                                <em className="fa fa-chevron-right float-right"></em>
                              </span>
                            </h4>
                          </Link>
                        </div>
                        <MyCourseOneTab
                          categoryListShow={categoryListShow}
                          coursecatListShow={coursecatListShow}
                          loading={loading}
                        />
                      </>
                    )
                    // : (
                    //   <MyStudyAnalysis userID={user_id} planID={planID} />
                    // )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyCourse;
