import "../../../assets/css/event/style.css";
import "../../../assets/css/face-to-face/style.css";
import "../../../assets/css/face-to-face/responsive.css";
import "../../../assets/css/event/responsive.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import "../../../assets/new_design/css/footer.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../API/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../network/cartSlice";
import DOMPurify from "dompurify";
import { Skeleton } from "antd";
import { API_ENDPOINTS } from "../../../ulits/apiConstant";
const Eventbooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userid = sessionStorage.getItem("id");
  const [courseData, setCourseData] = useState([]);

  const participantCount = courseData?.participant?.length || 0;
  const sanitizedDescription = DOMPurify.sanitize(courseData.description);
  const [modalData, setModalData] = useState([]);
  const [rating, setStateRating] = useState(1);
  const [message, setMessage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalShow, setModalShow] = useState(0);
  const [mysubid, setmysubid] = useState(null);
  const [show, setShow] = useState(false);
  const [spin, setspin] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeRating = (e) => {
    setStateRating(e.target.value);
  };
  const handleChangemessage = (e) => {
    setMessage(e.target.value);
  };
  const eventId = localStorage.getItem("eventId");
  const getEventData = async () => {
    setspin(true);
    try {
      const response = await axiosInstance
        .post(API_ENDPOINTS.EVENT.GET_EVENT_DETAILE, {
          user_id: userid,
          course_id: eventId,
        })
        .then((response) => {
          if (response.data) {
            setCourseData(response.data.data.event_detaile);
            setModalData(response.data.data.event_detaile.installment);
            setspin(false);
          } else {
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (eventId) {
      getEventData();
    }
  }, [eventId]);

  const buynow = (id) => {
    let subid;
    if (activeIndex == 0) {
      subid = id;
    } else {
      subid = mysubid;
    }
    const requestData = {
      user_id: userid,
    };

    const requestData2 = {
      user_id: userid,
      course_id: courseData.id,
      subscription_id: subid,
      course_start_date: "",
      facetofacecenter_id: courseData.subcenter_id,
      is_part_payment: 0,
      course_registration_amount: "",
      pending_amount: "",
      payment_id: "",
      id_fr_learning_center_detail: "",
      booking_type: "",
      partner_member_id: "",
      is_cbt: "",
      is_combo_master: 0,
      combo_course_id: "",
    };

    const jwt_token = JSON.parse(localStorage.getItem("jwt_token"));

    axiosInstance
      .post("/v2_data_model/clearCart", requestData)
      .then((response) => {
        dispatch(clearCart());
        addCart(requestData2);
      })
      .catch((error) => {
        console.error("Error fetching Stream list data:", error);
      });
  };
  const addCart = (requestData2) => {
    axiosInstance
      .post("/v2_data_model/addCourseToCart", requestData2)
      .then((response) => {
        if (response.data.status === true) {
          navigate("/addToCart");
          location.reload();
          toast.success("Event has been added to cart", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (response.data.status === false) {
          navigate("/addToCart");
          location.reload();
          toast.error("Event already added in cart", {
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
        console.error("Error fetching list data:", error);
      });
  };

  const handlesave = (e) => {
    axiosInstance
      .post(API_ENDPOINTS.EVENT.ADD_REVIEW_TO_EVENT, {
        user_id: userid,
        rating: rating,
        text: message,
        course_id: localStorage.getItem("eventId"),
      })
      .then((response) => {
        if (response.data.message) {
          handleClose();
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handlePlanClick = (ind, b) => {
    setActiveIndex(ind);
    setmysubid(b);
  };

  return (
    <>
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Event Description</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="eventDes">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="desimgPart">
                <img
                  src={
                    courseData.cover_image ||
                    "https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/img1.svg"
                  }
                  loading="lazy"
                  alt={courseData.title}
                  onError={(e) =>
                    (e.target.src =
                      "https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/img1.svg")
                  }
                />
              </div>

              <div className="eventDescription">
                <Skeleton active loading={spin} paragraph={{ rows: 4 }}>
                  <div className="tarGeting">
                    <h1>{courseData?.title}</h1>
                    <p>{courseData?.vanue_address}</p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          sanitizedDescription || "No description available.",
                      }}
                    ></p>

                    <h2>
                      <span>
                        <FaRegCalendarAlt />
                      </span>
                      {courseData.event_start_date} -{" "}
                      {courseData.event_end_date} |{" "}
                      {courseData.event_start_time} -{" "}
                      {courseData.event_end_time}
                    </h2>

                    <div className="participant">
                      <ul>
                        {Array.isArray(courseData?.participant) && // Ensure participant is a valid array
                          courseData.participant.map((participant) => (
                            <li key={participant.user_id}>
                              <img
                                src={
                                  participant?.profile_picture ||
                                  "https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/login_logo.png"
                                }
                                alt={participant?.name}
                                title={participant?.name}
                              />
                            </li>
                          ))}

                        <li className="twoK">{participantCount}</li>
                      </ul>
                    </div>
                    <div className="allOver">
                      <h4>
                        Participant
                        <span className="d-block">
                          {courseData?.event_vanue}
                        </span>
                      </h4>
                    </div>
                  </div>
                </Skeleton>

                <div className="aboutEvent">
                  {/* <div className="aboutEventText">
                    <p>
                      <span>About this event:</span> Lorem Ipsum has been the
                      since a industry's standard dummy text ever since the
                      1500, when an unknown printer took galley of type and we
                      scrambled it to make a type specimen book.
                    </p>
                  </div> */}
                  {/* <div className="desCription">
                    <h5>Description</h5>
                    <p>
                      <img src="/checked.svg" /> Lorem Ipsum has been the since
                      a industry's
                    </p>
                    <p>
                      <img src="/checked.svg" /> Lorem Ipsum has been the since
                      a industry's
                    </p>
                  </div> */}
                  <div className="ratIng">
                    <div className="ratIngText">
                      {/* <span className="fa fa-star checked"></span>
                      <span className="fa fa-star"></span>
                      <p>2.5K rating</p> */}
                      <em className="fa fa-star-half-o"></em>
                      {courseData.avrage_rating}&nbsp;
                      <span className="text-gry">4 Rating</span>
                      <span className="rate">
                        <>
                          <Modal
                            className="ratingModal"
                            show={show}
                            onHide={handleClose}
                            style={{ marginTop: "125px;" }}
                          >
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body>
                              <div className="text-exp">
                                <h3>Give Your Experience</h3>
                                <fieldset className="rate-star">
                                  <input
                                    type="radio"
                                    required="required"
                                    id="rating10"
                                    name="rating"
                                    value="5"
                                    onChange={handleChangeRating}
                                  />
                                  <label for="rating10" title="5 stars"></label>
                                  <input
                                    type="radio"
                                    required="required"
                                    id="rating9"
                                    name="rating"
                                    value="5"
                                    onChange={handleChangeRating}
                                  />
                                  <label
                                    className="half"
                                    for="rating9"
                                    title="4 1/2 stars"
                                  ></label>
                                  <input
                                    type="radio"
                                    required="required"
                                    id="rating8"
                                    name="rating"
                                    value="4"
                                    onChange={handleChangeRating}
                                  />
                                  <label for="rating8" title="4 stars"></label>
                                  <input
                                    type="radio"
                                    required="required"
                                    id="rating7"
                                    name="rating"
                                    value="4"
                                    onChange={handleChangeRating}
                                  />
                                  <label
                                    className="half"
                                    for="rating7"
                                    title="3 1/2 stars"
                                  ></label>
                                  <input
                                    type="radio"
                                    required="required"
                                    id="rating6"
                                    name="rating"
                                    value="3"
                                    onChange={handleChangeRating}
                                  />
                                  <label for="rating6" title="3 stars"></label>
                                  <input
                                    type="radio"
                                    required="required"
                                    id="rating5"
                                    name="rating"
                                    value="3"
                                    onChange={handleChangeRating}
                                  />
                                  <label
                                    className="half"
                                    for="rating5"
                                    title="2 1/2 stars"
                                  ></label>
                                  <input
                                    type="radio"
                                    required="required"
                                    id="rating4"
                                    name="rating"
                                    value="2"
                                    onChange={handleChangeRating}
                                  />
                                  <label for="rating4" title="2 stars"></label>
                                  <input
                                    type="radio"
                                    required="required"
                                    id="rating3"
                                    name="rating"
                                    value="2"
                                    onChange={handleChangeRating}
                                  />
                                  <label
                                    className="half"
                                    for="rating3"
                                    title="1 1/2 stars"
                                  ></label>
                                  <input
                                    type="radio"
                                    required="required"
                                    id="rating2"
                                    name="rating"
                                    value="1"
                                    onChange={handleChangeRating}
                                  />
                                  <label for="rating2" title="1 star"></label>
                                  <input
                                    type="radio"
                                    required="required"
                                    id="rating1"
                                    name="rating"
                                    value="1"
                                    onChange={handleChangeRating}
                                  />
                                  <label
                                    className="half"
                                    for="rating1"
                                    title="1/2 star"
                                  ></label>
                                </fieldset>
                                <textarea
                                  rows="4"
                                  cols="50"
                                  name="comment"
                                  form="usrform"
                                  onChange={handleChangemessage}
                                >
                                  {" "}
                                </textarea>
                              </div>
                              <span className="error" id="username_err">
                                {" "}
                              </span>
                            </Modal.Body>
                            <Modal.Footer>
                              {/* <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button> */}

                              <button
                                type="button"
                                className="btn sub"
                                onClick={handlesave}
                              >
                                Submit
                              </button>
                            </Modal.Footer>
                          </Modal>
                        </>
                      </span>
                    </div>
                    <span className="review">Add your rating & review</span>
                  </div>
                  <div className="rateNow">
                    <Button className="btn" onClick={handleShow}>
                      Rate Now
                    </Button>
                  </div>
                  <div className="buyTicket">
                    <Skeleton active loading={spin} paragraph={{ rows: 4 }}>
                      {/* <button
                        className="btn"
                        onClick={
                          modalData.length > 0
                            ? () => setModalShow(1)
                            : () => toast.error("No Subscription Available")
                        }
                      >
                        ₹
                        {courseData.before_discount_mrp
                          ? courseData.before_discount_mrp
                          : courseData.mrp}{" "}
                        <span>Buy Ticket</span>
                      </button> */}
                      <button
                        className="btn"
                        onClick={() => {
                          if (modalData.length > 0) {
                            if (
                              !courseData?.installment ||
                              courseData.installment.length === 0
                            ) {
                              buynow(null); // Direct buy now if installment is empty
                            } else {
                              setModalShow(1); // Show modal if installment exists
                            }
                          } else {
                            // If no subscription, but installment is null => still call buynow
                            if (
                              !courseData?.installment ||
                              courseData.installment.length === 0
                            ) {
                              buynow(null); // Direct buy now
                            } else {
                              toast.error("No Subscription Available");
                            }
                          }
                        }}
                      >
                        ₹
                        {courseData.before_discount_mrp
                          ? courseData.before_discount_mrp
                          : courseData.mrp}{" "}
                        <span>Buy Ticket</span>
                      </button>
                    </Skeleton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {modalShow === 1 ? (
          <div
            className="modal subscriptionbg show"
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
                    onClick={() => setModalShow(0)}
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
                            loading="lazy"
                            alt="icon image"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div className="tab-pane active">
                          <div className="show-center">
                            <div className="row">
                              {/* <h3>{courseData1[0].title}</h3><span>{courseData1[0].mrp}</span> */}

                              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                {modalData?.map((module, index) => (
                                  <div
                                    key={module.id}
                                    className={`dams-center plan ${
                                      index == activeIndex ? "active" : ""
                                    }`}
                                    onClick={() =>
                                      handlePlanClick(index, module.id)
                                    }
                                    data-id={module.id}
                                  >
                                    <div className="row">
                                      <div className="col-2 col-sm-2 col-md-1 col-lg-1 col-xl-1 map">
                                        <div className="round"></div>
                                        <div className="active-img">
                                          <span>
                                            <img
                                              src="https://i.ibb.co/SPbrbh2/Layer-44.png"
                                              loading="lazy"
                                              alt="icon image"
                                            />
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-5">
                                        <div className="month-text">
                                          <h5>{module.name}</h5>
                                        </div>
                                      </div>
                                      <div className="col-6 col-sm-6 col-md-7 col-lg-7 col-xl-6 dams-text">
                                        <h3>
                                          <em className="fa fa-rupee"></em>
                                          {module.is_purchased === "1"
                                            ? module.mrp
                                            : module.amount_description
                                            ? module.amount_description
                                                .payment[0]
                                            : ""}
                                        </h3>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="continuebtn">
                              <a
                                href="#"
                                onClick={() =>
                                  buynow(courseData?.installment[0]?.id)
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
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default Eventbooking;
