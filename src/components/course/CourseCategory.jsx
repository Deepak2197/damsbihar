import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { toast } from "react-toastify";
import Login from "../Login/Login";
import "../../assets/css/course-plan/style.css";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
function CourseCategory({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state?.courseId;
  const course_id = JSON.parse(localStorage.getItem("course_id"));
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [ShowPopupSubscription, setShowPopupSubscription] = useState(false);
  const [data, setData] = useState([]);
  setTimeout(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, 0);
  const jwtToken = sessionStorage.getItem("jwt_token");
  const userid = sessionStorage.getItem("id")
    ? sessionStorage.getItem("id")
    : 4;
  //const Catid = JSON.parse(localStorage.getItem("Catid"));
  const Catid = location.state?.courseId ?? JSON.parse(localStorage.getItem("Catid"));
  const ShowSubcatlist = (course_cate_id, course_subcate_id) => {
    localStorage.setItem("course_cate_id", course_cate_id);
    localStorage.setItem("course_subcate_id", course_subcate_id);
    if (userid === 4) {
      // toast.error("Please login first");
      setSignInModalOpen(true)
    } else {
      navigate("/course-category-list");
    }
  };

  const getCalledCategory = async () => {
    const requestData = {
      user_id: userid,
      course_category_id: Catid,
    };
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.COURSE_CATEGORY.SUB_CATEGORY,
        requestData
      );
      setData(res.data.data);
    } catch (err) {
    }
  };

  useEffect(() => {
    getCalledCategory();
  }, []);

  const handlerClose = () => {
    setSignInModalOpen(false);
  };

  const handleSignInSuccess = () => {
    setSignInModalOpen(false);
  };



  return (
    <>
      <div className="profileUpdation">
        <div className="page-content position-relative">
          <div className="breadcrumb-row d-none">
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
        <section className="student_course_category">
          <div className="container">
            <div className="row">
              {data.map((subcategory, i) => (
                <div
                  key={i}
                  className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3"
                >
                  <a
                    style={{ cursor: "pointer" }}
                    className="course_id"
                    onClick={() =>
                      ShowSubcatlist(
                        subcategory.course_category_id,
                        subcategory.course_sub_category_id
                      )
                    }
                  >
                    <div
                      className="course_group height-group color2 position-relative"
                      style={{ paddingTop: "23px" }}
                    >
                      <h3>{subcategory.sub_category_name}</h3>
                      <img
                        src={subcategory.sub_category_image}
                        loading="lazy" alt={subcategory.sub_category_name}
                      />
                    </div>
                  </a>
                </div>
              ))}
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
    </>
  );
}

export default CourseCategory;
