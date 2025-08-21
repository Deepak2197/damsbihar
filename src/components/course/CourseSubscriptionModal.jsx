import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { clearCart } from "../../network/cartSlice";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
function CourseSubscriptionModal({ handleClose, CourseDataFilter }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("id");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePlan, setactivePlan] = useState([]);
  const [FilterCourseData1, setCourseData1] = useState([]);
 
  const buynow = (id) => {
    const combo_course_id = sessionStorage.getItem("combo_course_id");
    let subid;
    if (activeIndex === 0) {
      subid = id;
    } else {
      subid = activePlan;
    }
    const requestData = {
      user_id: user_id,
      course_id: FilterCourseData1[0]?.id,
      subscription_id: subid,
      facetofacecenter_id: "",
      course_start_date: "",
      is_part_payment: "",
      course_registration_amount: "",
      pending_amount: "",
      payment_id: "",
      id_fr_learning_center_detail: "",
      partner_member_id: "",
      booking_type: "",
      is_cbt: "",
      is_combo_master: combo_course_id?'1':"",
      combo_course_id: combo_course_id,
    };

    axiosInstance
      .post(API_ENDPOINTS.CBT.CLEAR_DATA, requestData)
      .then((response) => {
        if (response.data.status === true) {
          dispatch(clearCart());
          addCart(requestData, subid);
        }
      })
      .catch((error) => {
        console.error("Error fetching Stream list data:", error);
      });
  };

  const handlePlanClick = (index, planid) => {
    setActiveIndex(index);
    setactivePlan(planid);
  };

  const addCart = (requestData, subid) => {
    axiosInstance
      .post("/v2_data_model/addCourseToCart", requestData)
      .then((response) => {
        if (response.data.status === true) {
          localStorage.setItem("subscription_id", JSON.stringify(subid));

          navigate("/addToCart");
          // window.location.reload();

          toast.success("Course has been added to cart");
        }
        if (response.data.status === false) {
          // window.location.reload();
          toast.error("Course already added in cart");
        }
      })
      .catch((error) => {
        console.error("Error fetching list data:", error);
      });
  };

  const Course_localId = localStorage.getItem("CourseDataID");
  useEffect(() => {

    const foundCourse = CourseDataFilter?.course_list?.find(
      (course) => course?.id == Course_localId
    );
sessionStorage.setItem("combo_course_id",foundCourse?.combo_course_id);
    if (foundCourse) {
   
      setCourseData1([foundCourse]);
    } else {
      setCourseData1([]);
    }
  }, []);

  return (
    <div
      className="modal"
      id="buy_now"
      style={{ paddingRight: "17px", display: "block" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header ">
            <h4 className="modal-title Class_className__yAM1H">
              Select Course Subscription
            </h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={handleClose}
            >
              ×
            </button>
          </div>
          <div className="modal-body">
            <div className="row rowbg">
              {FilterCourseData1 &&
                FilterCourseData1?.map((course) =>
                  course.installment.map((instal, index) => (
                    <div className="col-6 col-md-3 col-lg-3" key={instal.id}>
                      <div
                        key={instal.id}
                        className={`item plan bordr-right ${
                          index === activeIndex ? "active" : ""
                        }`}
                        onClick={() => handlePlanClick(index, instal.id)}
                        data-id={instal.id}
                      >
                        <div
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            padding: "0px 5px",
                          }}
                          className="Class_className__yAM1H"
                        >
                          {instal.name}
                        </div>
                        <p
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            padding: "0px 5px",
                          }}
                        >
                          ₹ {instal.amount_description.payment[0]}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              <div className="col-12 col-md-12 col-lg-12">
                <button
                  className="Class_classReminder__2EOd3 Class_remindMe__3HLYT cartbtn"
                  title="Buy Now"
                  onClick={() => buynow(FilterCourseData1[0].installment[0].id)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseSubscriptionModal;
