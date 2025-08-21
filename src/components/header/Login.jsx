import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "bootstrap";
import logo from "./login_logo.png";
import "../../assets/newjs/style.css";
import "../../assets/new_design/css/style.css";
import "../../assets/css/home-page/responsive.css";
import "../../assets/css/shortcodes/shortcodes.css";
import "../../assets/css/mega-menu.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/signIn-pop/style.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Myprofile from "./Myprofile";
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

function Header() {
  const onKeyUp = () => {
 
  };

  const handleClick = () => {
   
  };
  const openNav = () => {};
  //const [isOtpModalOpen, setIsOtpModalOpen] = useState(true); // Set initial state to true if you want it to be initially open
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isOtpModalOpen, setOtpModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // State variable for error message
  const [otpVerified, setOtpVerified] = useState(false); // State variable to track OTP verification status

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const openSignInModal = () => {
    setSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setSignInModalOpen(false);
  };

  const openOtpModal = async () => {
    if (!phoneNumber) {
      toast.error("Phone number is not provided.");
      return;
    }

    // Open OTP modal
    setOtpModalOpen(true);

    // Make login API request

    await axiosInstance
      .post(API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: phoneNumber,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == true) {
          toast.success("OTP has been sent successfully!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Failed to send OTP. Please try again.", {
            position: "top-right",
            autoClose: 1000,
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
        toast.error("An error occurred. Please try again later.", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const closeOtpModal = () => {
    setOtpModalOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform any necessary actions before sending OTP
    sendOTP();
    openOtpModal();
  };
  const sendOTP = () => {

  };

  {
    /* 
  const handleOtpVerification = (e) => {
    e.preventDefault();
    // Perform OTP verification logic
    if (otp === '1234') {  // Replace '1234' with the actual OTP sent or generated
      console.log('OTP Verified');
      // You can perform the actual login or other actions here
      // Close the OTP modal or redirect the user
      closeOtpModal();
    } else {
      // Handle incorrect OTP
      console.log('Incorrect OTP');
      // Display an error message or take appropriate action
    }
    
  };
  */
  }

  function handlecahnge(e) {
    setPhoneNumber(e.target.value);
  }

  const handleOtpChange = (index, value) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join("");

    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION,
        {
          otp: enteredOtp,
          mobile: phoneNumber,
        }
      );

      // Handle the response as needed


      // You can add logic here to handle a successful verification

      if (response.data.status == true) {
        sessionStorage.setItem("id", response.data.data.id);
        sessionStorage.setItem("mobile", response.data.data.mobile);
        sessionStorage.setItem("email", response.data.data.email);
        sessionStorage.setItem(
          "is_course_register",
          response.data.data.is_course_register
        );
        setIsAuthenticated(true);
        setOtpModalOpen(false);
        setSignInModalOpen(false);
        toast.success("User authentication successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setIsAuthenticated(false);
        toast.error("Please Enter Valid OTP.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      // OTP verification successful, hide the popup module
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setErrorMsg("An error occurred. Please try again later.");
    }
  };

  return (
    <header className="header rs-nav header-transparent ">
      <ToastContainer />
      <div className="sticky-header navbar-expand-lg">
        <div className="menu-bar clearfix headbrd topg mt-0">
          <div className="container clearfix contmb nav-pd">
            <div className="menu-logo notmshow">
              <a href="https://damsdelhi.com/">
                <Link to={"/"}>
                  <img src={logo} loading="lazy" alt="icon image" />
                </Link>
              </a>
            </div>
            <a href="https://damsdelhi.com/cart" className="mshow">
              <img
                className="cart-bag"
                src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/cart.svg"
                loading="lazy"
                alt="icon image"
              />
              <span className="mcart"> 0 </span>
            </a>
            <div className="new-hdr-serch">
              <div className="searchbar" onClick={onKeyUp}>
                <input
                  type="search"
                  placeholder="What do you want to learn ?"
                  name="search"
                  className="searchbar-input search_input search_input_login search_courses"
                  required=""
                />
                <input
                  type="submit"
                  className="searchbar-submit search_icon"
                  defaultValue="GO"
                />
                <span className="searchbar-icon">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </span>
              </div>
            </div>
            <a href="#" className="mshow">
              <div className="position-relative location-box">
                <div className="tooltip facebook">
                  <span className="tooltipText fb">You are in Delhi</span>
                  <span className="select_city"></span>{" "}
                  <img
                    className="location-icon modal_selected"
                    data-toggle="modal"
                    data-target="#myModal45"
                    data-lat="0"
                    data-lon="0"
                    // data-ip="125.99.186.50"
                    src="https://damsdelhi.com/assets/images/location.svg"
                    loading="lazy"
                    alt="icon image"
                  />
                </div>
              </div>
            </a>
            <div className="nav-search-bar">
              <form action="#">
                <input
                  name="search"
                  defaultValue=""
                  type="text"
                  className="form-control"
                  placeholder="Type to search"
                />
                <span>
                  <em className="ti-search"></em>
                </span>
              </form>
              <span id="search-remove">
                <em className="ti-close"></em>
              </span>
            </div>
            <div
              className="menu-links navbar-collapse collapse justify-content-start float-right"
              id="menuDropdown"
            >
              <div className="nav-logo menu-logo">
                <a href="">
                  <img src={logo} loading="lazy" alt="icon image" />
                </a>
              </div>
              <ul className="nav navbar-nav">
                <li className="login-signup notmshow">
                  <a
                    className="loginbtn loginbtnSignupbtn"
                    href="https://cbt.damsdelhi.com"
                    id="newUser"
                  >
                    Dams CBT
                  </a>
                </li>
                <li className="d-sm-block notmshow1">
                  <div className="search-btn_padding">
                    <div className="searchbar">
                      <a className="search_icon">
                        <em
                          className="fa fa-search m-0"
                          aria-hidden="true"
                        ></em>
                      </a>
                      <input
                        className="search_input search_input_login search_courses"
                        type="text"
                        name=""
                        placeholder="What do you want to learn ?"
                      />
                    </div>
                    <div
                      className="trending_search nobg"
                      style={{ display: "none" }}
                    ></div>
                  </div>
                </li>
                <li
                  className="notmshow"
                  style={{ display: "flex", border: "0px solid #a3b4bf" }}
                >
                  <a
                    href="https://damsdelhi.com/find-center"
                    className="centre"
                    style={{ display: "flex" }}
                  >
                    <div
                      className="wpicon bounce"
                      style={{
                        padding: "0px 2px",
                        margin: "2px 0px",
                        height: "39px",
                        background: "transparent",
                        boxShadow: "none",
                      }}
                    >
                      <img
                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/courses/cartoon-student-walking.gif"
                        style={{ height: "38px" }}
                        loading="lazy"
                        alt="icon image"
                      />
                    </div>
                    <div className="wpnumber" style={{ margin: "-2px auto" }}>
                      <p>
                        <img
                          src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/courses/find-center.svg"
                          style={{ height: "25px", margin: "0px 10px" }}
                          loading="lazy"
                          alt="icon image"
                        />
                      </p>
                      <span
                        style={{
                          lineHeight: "22px",
                          fontWeight: 600,
                          color: "#3d92eb",
                          fontSize: "13px",
                        }}
                      >
                        Find Centre
                      </span>
                    </div>
                  </a>
                </li>
                <li className="notmshow call" style={{ display: "flex" }}>
                  <div className="wpicon">
                    <a
                      href="https://api.whatsapp.com/send?phone=919899664533&amp;text=Hello,%20I%20have%20a%20question"
                      target="_blank"
                    >
                      <img
                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/courses/phone_black_24dp1.svg"
                        loading="lazy"
                        alt="icon image"
                      />
                    </a>
                  </div>
                  <div className="wpnumber">
                    <a
                      href="https://api.whatsapp.com/send?phone=919899664533&amp;text=Hello,%20I%20have%20a%20question"
                      target="_blank"
                    >
                      <p>Talk to our ninjas</p>
                      <span>011-4009-4009</span>
                    </a>
                  </div>
                </li>
                <li className="notmshow">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    data-toggle="modal"
                    data-target="#myModal45"
                    className="ntshow-a marloc modal_selected"
                    data-lat="0"
                    data-lon="0"
                    // data-ip="125.99.186.50"
                  >
                    <span className="select_city">Delhi</span>{" "}
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/location.svg"
                      className="locate-img-a"
                      loading="lazy"
                      alt="icon image"
                    />
                  </a>
                </li>
                {/*sign in */}
                <li className="login-signup notmshow">
                  <a
                    className="loginbtn loginbtnSignupbtn"
                    href="#"
                    onClick={openSignInModal}
                  >
                    Sign in
                  </a>
                </li>
                {/* sign in end  */}

                {/* Sign in popup */}
                {isSignInModalOpen && (
                  <section className="login-popup">
                    <div
                      className="modal modal-open show"
                      id="exampleModal-reg"
                      style={{ display: "block", paddingLeft: "0px" }}
                    >
                      <div
                        className="modal-dialog modal-lg"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                        style={{}}
                      >
                        <div className="modal-content">
                          <div
                            className="modal-header close_btn"
                            style={{ borderBottom: "0px" }}
                          >
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              onClick={closeSignInModal}
                              style={{ display: "none" }}
                            >
                              ×
                            </button>
                          </div>
                          <div className="modal-body login_area">
                            <div className="row">
                              <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                <div className="login_text">
                                  <h2>Get Comprehensive Study Material</h2>
                                  <p>
                                    Complete Preparation With Videos, <br />
                                    Lesson &amp; Unlimited Practice Test
                                  </p>
                                </div>
                                <div className="login_img">
                                  <img
                                    src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/signIn-pop/login-img.svg"
                                    loading="lazy"
                                    alt="img"
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                <div className="login-logo">
                                  <div className="text-center">
                                    <img
                                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/signIn-pop/login_logo.png"
                                      loading="lazy"
                                      alt="logo"
                                    />
                                  </div>
                                  <div className="login-logo_text">
                                    <h2>
                                      Enroll Now To Learn Live{" "}
                                      <span
                                        className="d-block"
                                        style={{ color: "#00A651" }}
                                      >
                                        Application for NEET PG Preparation
                                      </span>
                                    </h2>
                                  </div>
                                  {!isOtpModalOpen ? (
                                    <form
                                      id="loginFormbyPhone"
                                      name="loginFormbyPhone"
                                      onSubmit={handleLogin}
                                    >
                                      <div className="login-input-holder">
                                        <div className="login-input-group home-screen-country-code-container">
                                          <input
                                            list="countryCode"
                                            className="country-code login-input-select-elem is-hidden"
                                          />
                                          <datalist id="countryCode">
                                            <option value="+91">India</option>
                                            <option value="+355">
                                              Albania
                                            </option>
                                            <option value="+213">
                                              Algeria
                                            </option>
                                          </datalist>
                                          <span className="bar"></span>
                                        </div>
                                        <div
                                          className="login-input-group"
                                          id="login-email-phone"
                                        >
                                          <input
                                            type="hidden"
                                            id="phone_c_code"
                                            name="phone_c_code"
                                            value="1"
                                          />
                                          <input
                                            type="text"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            placeholder="Enter your phone number"
                                            onChange={handlecahnge}
                                            style={{ left: "0px" }}
                                            className="fieldSelectorId"
                                          />
                                          <span className="bar"></span>
                                          <div className="error-container">
                                            Please enter a valid email Id
                                          </div>
                                        </div>
                                      </div>
                                      <button
                                        type="submit"
                                        name="submit"
                                        value="submit"
                                        className="common-bottom-btn"
                                        onClick={openOtpModal}
                                      >
                                        Next
                                      </button>
                                      <div className="email-acc">
                                        <a
                                          href="#"
                                          onClick={(e) => e.preventDefault()}
                                          data-toggle="modal"
                                          data-target="#emailModal"
                                        >
                                          Login Using Email
                                        </a>
                                      </div>
                                    </form>
                                  ) : (
                                    <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                      <div className="login-logo">
                                        <div className="text-center">
                                          <img
                                            src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/signIn-pop/login_logo.png"
                                            loading="lazy"
                                            alt="logo"
                                          />
                                        </div>
                                        <form
                                          className="digit-group text-center otp-form"
                                          name="otpvarfy_new"
                                          id="otpvarfy_new"
                                          data-group-name="digits"
                                          data-autosubmit="false"
                                          autoComplete="off"
                                          onSubmit={handleOtpVerification}
                                        >
                                          <div className="login-logo_text">
                                            <h2>
                                              Please Enter OTP Sent To Your{" "}
                                              <span className="phone_and_email"></span>
                                              <br />
                                              <span
                                                style={{ color: "#00A651" }}
                                                id="number_here"
                                              ></span>
                                              <span
                                                style={{ color: "#00A651" }}
                                                id="email_here"
                                              ></span>
                                              <span
                                                style={{ color: "#3c8ad4" }}
                                              >
                                                <a
                                                  href="#"
                                                  onClick={(e) =>
                                                    e.preventDefault()
                                                  }
                                                  style={{
                                                    marginLeft: "12px",
                                                    color: "#f15a22",
                                                  }}
                                                >
                                                  <em className="fa fa-pencil"></em>
                                                </a>
                                              </span>
                                            </h2>
                                          </div>
                                          <div className="form-group">
                                            <input
                                              type="text"
                                              id="codeBox1"
                                              name="codeBox1"
                                              value={otpDigits[0]}
                                              onChange={(e) =>
                                                handleOtpChange(
                                                  0,
                                                  e.target.value
                                                )
                                              }
                                              maxLength="1"
                                            />
                                            <input
                                              type="text"
                                              id="codeBox2"
                                              name="codeBox2"
                                              value={otpDigits[1]}
                                              onChange={(e) =>
                                                handleOtpChange(
                                                  1,
                                                  e.target.value
                                                )
                                              }
                                              maxLength="1"
                                            />
                                            <input
                                              type="text"
                                              id="codeBox3"
                                              name="codeBox3"
                                              value={otpDigits[2]}
                                              onChange={(e) =>
                                                handleOtpChange(
                                                  2,
                                                  e.target.value
                                                )
                                              }
                                              maxLength="1"
                                            />
                                            <input
                                              type="text"
                                              id="codeBox4"
                                              name="codeBox4"
                                              value={otpDigits[3]}
                                              onChange={(e) =>
                                                handleOtpChange(
                                                  3,
                                                  e.target.value
                                                )
                                              }
                                              maxLength="1"
                                            />
                                          </div>
                                          <div id="error_message_here"></div>
                                          <div className="form-group">
                                            <input
                                              type="hidden"
                                              name="mobile"
                                              className="form-control"
                                              required=""
                                              placeholder="Mobile"
                                              value="mobile"
                                              id="mobile"
                                              maxLength="1"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <input
                                              type="hidden"
                                              name="eb_details_id"
                                              className="form-control"
                                              required=""
                                              value="number"
                                              maxLength="1"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <a
                                              href="#"
                                              onClick={(e) =>
                                                e.preventDefault()
                                              }
                                              className="resend"
                                              id="otp_resend"
                                            >
                                              RESEND OTP
                                            </a>
                                          </div>
                                          <div className="form-group verify-btn">
                                            <button
                                              type="submit"
                                              name="submit"
                                              value="submit"
                                              className="common-bottom-btn"
                                              onClick={handleOtpVerification}
                                            >
                                              Verify and Proceed
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  )}
                                  <div className="login-permission">
                                    <img
                                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/signIn-pop/lock_assets.png"
                                      className="login-permisson-icon"
                                      loading="lazy"
                                      alt="icon image"
                                    />
                                    We never post without your permission
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* OTP popup 
      {isOtpModalOpen && (
        <section className="modal otp-sent-pop" id="myModal_otp">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header close_btn" style={{ borderBottom: '0px' }}>
                <button type="button" className="close" onClick={closeOtpModal} data-dismiss="modal" style={{ display: 'none' }}>×</button>
              </div>
              <div className="modal-body login_area">
                <div className="row">
                  <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                    <div className="login_text">
                      <h2>Get Comprehensive Study Material</h2>
                      <p>Complete Preparation With Videos, <br />Lesson &amp; Unlimited Practice Test</p>
                    </div>
                    <div className="login_img">
                      <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/signIn-pop/login-img.svg" loading="lazy" alt="img" />
                    </div>
                  </div>
                  <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                    <div className="login-logo">
                      <div className="text-center">
                        <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/signIn-pop/login_logo.png" loading="lazy" alt="logo" />
                      </div>
                      <form className="digit-group text-center otp-form" name="otpvarfy_new" id="otpvarfy_new" data-group-name="digits" data-autosubmit="false" autoComplete="off" onSubmit={handleOtpVerification}>
                        <div className="login-logo_text">
                          <h2>
                            Please Enter OTP Sent To Your{' '}
                            <span className="phone_and_email"></span>
                            <br />
                            <span style={{ color: '#00A651' }} id="number_here"></span>
                            <span style={{ color: '#00A651' }} id="email_here"></span>
                            <span style={{ color: '#3c8ad4' }}>
                              <a href="javascript:;" style={{ marginLeft: '12px', color: '#f15a22' }}>
                                <em className="fa fa-pencil"></em>
                              </a>
                            </span>
                          </h2>
                        </div>
                        <div className="form-group">
                          <input type="text" id="codeBox1" onKeyPress={(e) => e.charCode === 13 && e.preventDefault()} name="codeBox1" data-next="codeBox2" className="otp-field" maxLength="1" />
                          <input type="text" id="codeBox2" onKeyPress={(e) => e.charCode === 13 && e.preventDefault()} name="codeBox2" data-next="codeBox3" data-previous="codeBox1" className="otp-field" maxLength="1" />
                          <input type="text" id="codeBox3" onKeyPress={(e) => e.charCode === 13 && e.preventDefault()} name="codeBox3" data-next="codeBox4" data-previous="codeBox2" className="otp-field" maxLength="1" />
                          <input type="text" id="codeBox4" maxLength="1" onKeyPress={(e) => e.charCode === 13 && e.preventDefault()} name="codeBox4" data-next="codeBox5" data-previous="codeBox3" className="otp-field" />
                        </div>
                        <div id="error_message_here"></div>
                        <div className="form-group">
                          <input type="hidden" name="mobile" className="form-control" required="" placeholder="Mobile" value="mobile" id="mobile" maxLength="1" />
                        </div>
                        <div className="form-group">
                          <input type="hidden" name="eb_details_id" className="form-control" required="" value="number" maxLength="1" />
                        </div>
                        <div className="form-group">
                          <a href="javascript:;" className="resend" id="otp_resend">
                            RESEND OTP
                          </a>
                        </div>
                        <div className="form-group verify-btn">
                          <button type="submit" name="submit" value="submit" className="common-bottom-btn">
                            Verify and Proceed
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
        */}
                <li>
                  <a href="help-and-support" className="manumarg">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/courses/help_black_24dp.svg"
                      className="help-img-a"
                      loading="lazy"
                      alt="icon image"
                    />
                  </a>
                </li>
              </ul>
              <div className="nav-social-link">
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <em className="fa fa-facebook"></em>
                </a>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <em className="fa fa-google-plus"></em>
                </a>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <em className="fa fa-linkedin"></em>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
