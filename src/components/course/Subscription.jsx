import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/css/course-plan/style.css";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import axiosInstance from "../../API/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { clearCart } from "../../network/cartSlice";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

function Subscription({ handleClose, courseData1 }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Catid = JSON.parse(localStorage.getItem("Catid"));
  localStorage.setItem("course_id", JSON.stringify(courseData1[0].id));
  const course_id = JSON.parse(localStorage.getItem("course_id"));
  //alert(course_id);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePlan, setactivePlan] = useState([]);
  const user_id = sessionStorage.getItem("id");
  const combo_course_id = sessionStorage.getItem("combo_course_id");
  // const jwt_token = JSON.parse(localStorage.getItem("jwt_token"));
  const buynow = async (course, id) => {
    let subid;
    if (activeIndex === 0) {
      subid = id;
    } else {
      subid = activePlan;
    }
    localStorage.setItem("subID", subid);

    const requestData = {
      user_id: user_id,
      course_id: course_id,
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
      is_combo_master: combo_course_id ? 1 : null,
      combo_course_id: combo_course_id,
    };
    const { data } = await axiosInstance.post(
      "/v2_data_model/getUserCartData",
      {
        user_id: user_id,
      }
    );

    // sessionStorage.setItem("is_shipping_charge_include",is_shipping_charge_include);

    if (data.status === false) {
      const { data } = await axiosInstance.post(
        "/v2_data_model/addCourseToCart",
        requestData
      );
      navigate("/addToCart");
      toast.success("Course has been added to cart");
    } else {
      try {
        const res = await axiosInstance.post(
          "/v2_data_model/clearCart",
          requestData
        );

        if (res.data.status === true) {
          dispatch(clearCart());
          const { data } = await axiosInstance.post(
            API_ENDPOINTS.CBT.ADD_COURSE_TO_CART,
            requestData
          );
          navigate("/addToCart");
          toast.success("Course has been added to cart");
        }
      } catch (error) {}
    }

    // if (data.status === false) {
    // }else{

    // }

    // await axiosInstance
    //   .post("/v2_data_model/clearCart", requestData)
    //   .then((response) => {
    //     if (response.data.status === true) {
    //       addtocart(requestData, subid);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching Stream list data:", error);
    //   });
  };

  const addtocart = async (requestData, subid) => {
    localStorage.setItem("CbtType", JSON.stringify("0"));
    await axiosInstance
      .post(API_ENDPOINTS.CBT.ADD_COURSE_TO_CART, requestData)
      .then((response) => {
        if (response.data.status === true) {
          // dispatch(addItemToCart(response.data.data));
          navigate("/addToCart");
          // window.location.reload();
          toast.success("Course has been added to cart");
        }
        if (response.data.status === false) {
          // window.location.reload();
          toast.error("Course already purchased");
        }
      })
      .catch((error) => {
        console.error("Error fetching list data:", error);
      });
  };

  const handlePlanClick = (index, planid) => {
    setActiveIndex(index);
    setactivePlan(planid);
  };
  return (
    <div
      className="modal subscription show"
      id="buy_now980"
      style={{ paddingRight: "17px", display: "block" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header ">
            <h4 className="modal-title Class_className__yAM1H">
              Select Plan Subscription
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
            <section className="subscription-data">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="slider">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/new-images.png"
                      loading="lazy" alt="icon image"
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <div className="tab-pane active">
                    <div className="show-center">
                      <div className="row">
                        {/* <h3>{courseData1[0].title}</h3><span>{courseData1[0].mrp}</span> */}
                        {courseData1.map((course) => (
                          <div
                            key={course.id}
                            className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                          >
                            {course.installment.map((module, index) => (
                              <div
                                key={module.id}
                                className={`dams-center plan ${
                                  index === activeIndex ? "active" : ""
                                }`}
                                onClick={() =>
                                  handlePlanClick(index, module.id)
                                }
                              >
                                <div className="row">
                                  <div className="col-2 col-sm-2 col-md-1 col-lg-1 col-xl-1 map">
                                    <div className="round"></div>
                                    <div className="active-img">
                                      <span>
                                        <img
                                          src="https://i.ibb.co/SPbrbh2/Layer-44.png"
                                          loading="lazy" alt="icon image"
                                        />
                                      </span>
                                    </div>
                                  </div>

                                  <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                    <div className="month-text">
                                      <h5>{module.name} </h5>
                                    </div>
                                  </div>
                                  <div className="col-6 col-sm-6 col-md-7 col-lg-7 col-xl-7 dams-text">
                                    <h3>
                                      <em className="fa fa-rupee"></em>
                                      {module.is_purchased === "1"
                                        ? module.mrp
                                        : module.amount_description
                                        ? module.amount_description.payment[0]
                                        : ""}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="continuebtn">
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            buynow(
                              courseData1,
                              courseData1[0].installment[0].id
                            )
                          }
                        >
                          Proceed to pay
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Subscription;
