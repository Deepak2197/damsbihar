import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/plain.css";
import { Toast } from "bootstrap";
//import logo from './login_logo.png';
import "../../assets/newjs/style.css";
import "../../assets/new_design/css/style.css";
import "../../assets/css/home-page/responsive.css";
import "../../assets/css/shortcodes/shortcodes.css";
import "../../assets/css/mega-menu.css";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/signIn-pop/style.css";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { CiEdit } from "react-icons/ci";
import axiosInstance from "../../API/axiosConfig";

function SignInModal({
  handlerClose1,
  handleSignInSuccess,
  setIsAuthenticated,
}) {
  const navigate = useNavigate();
  const user_id = Number(sessionStorage.getItem("id"));
  const [counter, setCounter] = useState(62);
  const creId = localStorage.getItem("idTocredentials");
  const [isOtpModalOpen, setOtpModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [isExist, setIsExist] = useState(0);
  const [toggleEmailOrPhone, setToggleEmailOrPhone] = useState("number");
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);

  const [error, setError] = useState("");
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const [loading, setLoading] = useState(false);

  const openOtpModal = async (e) => {
    e.preventDefault();
    if (toggleEmailOrPhone === "number") {
      if (!phoneNumber) {
        toast.error("Please enter your number");
      } else if (phoneNumber.length <= 9) {
        toast.error("Enter valid number");
      } else {
        // toast.success(typeof(phoneNumber.length))
        try {
          setLoading(true);
          const res = await axiosInstance.post(
            API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION,
            { mobile: phoneNumber }
          );
          setLoading(false);
          toast.success(`sent otp on your number ${phoneNumber}`);
          setOtpModalOpen(true);
          
        } catch (err) {
          // console.log(err);
        }
      }
    } else if (toggleEmailOrPhone === "email") {
      if (!email) {
        toast.error("Please enter your email");
      } else if (!isValid) {
        toast.error("Please enter valid email");
      } else {
        try {
          setLoading(true);
          const res = await axiosInstance.post(
            API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION,
            { email: email }
          );
          setLoading(false);

          toast.success(`sent otp on your number ${email}`);
          setOtpModalOpen(true);
        } catch (err) {
          console.log(err);
        }
        // toast.success(`Sent otp on your number ${email} `);
        // setOtpModalOpen(true);
      }
    }
  };

  const handlerResetOtp = () => {
    setCounter(62);
    setPhoneNumber("");
    setOtpDigits(["", "", "", "˚"]);
    setEmail("");
    setOtpModalOpen(false);
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleClickFun = () => {
    setCounter(60);
  };

  const resendOtp = async () => {
    handleClickFun();
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION,
        { mobile: phoneNumber }
      );
      setLoading(false);

      toast.success(`sent otp on your number ${phoneNumber}`);
      setOtpModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    // Move focus to the next input field if the current field is filled
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleBackspace = (index, event) => {
    // Move focus to the previous input field if backspace is pressed in an empty field
    if (index > 0 && event.key === "Backspace" && !otpDigits[index]) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const checkEmptyElement = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].trim().length === 0) {
        return true; // Found an empty element
      }
    }
    return false; // No empty element found
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (checkEmptyElement(otpDigits)) {
      toast.error("Please enter otp");
    } else {
      try {
        const enteredOtp = otpDigits.join("");
        const demoOne = phoneNumber
          ? { otp: enteredOtp, mobile: phoneNumber }
          : { otp: enteredOtp, email: email };
        const response = await axiosInstance.post(
          API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION,
          demoOne
        );

        if (response.data.status === true) {
          sessionStorage.setItem(
            "userData",
            JSON.stringify(response.data.data)
          );
          sessionStorage.setItem("mobile", response.data.data.mobile);
          sessionStorage.setItem("email", response.data.data.email);
          sessionStorage.setItem("id", response.data.data.id);
          if (response.data.data.is_course_register === "1") {
            localStorage.setItem("allData", JSON.stringify(response.data.data));
            sessionStorage.setItem("jwt_token", response.data.data.jwt_token);
            localStorage.setItem(
              "idTocredentials",
              response?.data?.data?.is_course_register
            );
            sessionStorage.setItem(
              "is_course_register",
              response.data.data.is_course_register
            );
            setIsAuthenticated(true);
            setOtpModalOpen(false);
            handleSignInSuccess();
            toast.success("User authentication successful!");
            setCounter(62);
            setPhoneNumber("");
            setEmail("");
            setOtpDigits(["", "", "", ""]);
            setToggleEmailOrPhone("number");
          } else {
            navigate("/user-registration");
            setCounter(62);
            setPhoneNumber("");
            setEmail("");
            setOtpDigits(["", "", "", ""]);
            setSignInModalOpen(false);
            setOtpModalOpen(false);
            setToggleEmailOrPhone("number");
            setIsAuthenticated(true);
          }
        } else {
          setIsAuthenticated(false);
          toast.error("Please Enter Valid OTP.");
          // });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setIsValid(isValidEmail);
  };

  const handleNumberValidate = (e) => {
    const input = e.target.value;
    const numberRegex = /^-?[0-9]{1,10}(?:\.[0-9]{1,10})+$/;

    if (input === "" || (numberRegex.test(input) && input.length <= 10)) {
      setPhoneNumber(input);
      setError("");
    } else {
      toast.error("Please enter a number");
      setTimeout(() => {}, 6000);
    }
  };
  return (
    <section className="login-popup">
      <div className="modal modal-open show modal-container">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header close_btn pop-modal">
              <button type="button" className="close" onClick={handlerClose1}>
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
                      loading="lazy" alt="img"
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                  <div className="login-logo">
                    <div className="text-center">
                      <img
                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/signIn-pop/login_logo.png"
                        loading="lazy" alt="logo"
                      />
                    </div>
                    <div className="login-logo_text">
                      {!isOtpModalOpen && (
                        <>
                          <h2>
                            Enroll Now To Learn Live
                            <span className="d-block enroll-title">
                              Application for NEET PG Preparation
                            </span>
                          </h2>
                        </>
                      )}
                    </div>
                    {!isOtpModalOpen ? (
                      <form name="loginFormbyPhone">
                        <div className="login-input-holder">
                          <div
                            className="login-input-group position-relative"
                            id="login-email-phone"
                          >
                            {toggleEmailOrPhone === "number" ? (
                              <>
                                <img
                                  className="flagbbg"
                                  src="https://i.ibb.co/Jv4wzpG/indian-flag.jpg"
                                  style={{
                                    width: "20px",
                                    height: "15px",
                                    position: "absolute",
                                    left: "0px",
                                    top: "12px",
                                  }}
                                  loading="lazy" alt="icon image"
                                />
                                <input
                                  style={{
                                    padding: "10px 10px 5px 30px",
                                  }}
                                  type="text"
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  placeholder="Please enter your phone no"
                                  onChange={handleNumberValidate}
                                  className="fieldSelectorId inp-title"
                                  value={phoneNumber}
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  className="flagbbg"
                                  src="https://i.ibb.co/zZ5SXvt/mail.png"
                                  style={{
                                    width: "20px",
                                    height: "15px",
                                    position: "absolute",
                                    left: "0px",
                                    top: "12px",
                                  }}
                                  loading="lazy" alt="icon image"
                                />

                                <input
                                  style={{
                                    padding: "10px 10px 5px 30px",
                                  }}
                                  type="email"
                                  name="email"
                                  placeholder="Please enter your email"
                                  className="fieldSelectorId inp-title"
                                  value={email}
                                  onChange={handleEmail}
                                />
                              </>
                            )}
                          </div>
                        </div>
                        {/* {phoneNumber.length >= 10 ? ( */}
                        <input
                          type="button"
                          className="common-bottom-btn"
                          onClick={openOtpModal}
                          value={loading ? "Wait please...." : "Next"}
                        />
                        {/* ) : (
                     <input
                       type="button"
                       className="common-bottom-btn"
                       value={
                         loading ? "Wait please...." : "Next"
                       }
                     />
                   )} */}

                        <div className="email-acc">
                          <a>
                            {toggleEmailOrPhone === "number" ? (
                              <span
                                onClick={() => {
                                  setPhoneNumber("");
                                  setToggleEmailOrPhone("email");
                                }}
                              >
                                Login Using Email
                              </span>
                            ) : (
                              <span
                                onClick={() => {
                                  setEmail("");
                                  setToggleEmailOrPhone("number");
                                }}
                              >
                                Login Using Number
                              </span>
                            )}
                          </a>
                        </div>
                      </form>
                    ) : (
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="login-logo">
                          <form
                            className="digit-group text-center otp-form"
                            name="otpvarfy_new"
                          >
                            <div className="login-logo_text">
                              <h2>
                                Please Enter OTP Sent To Your
                                <span className="phone_and_email"></span>
                                <br />
                                <span
                                  style={{ color: "#00A651" }}
                                  id="email_here"
                                >
                                  {phoneNumber
                                    ? `XXXXX${phoneNumber.substring(5)}`
                                    : email}
                                  <CiEdit
                                    onClick={handlerResetOtp}
                                    style={{
                                      marginLeft: "10px",
                                      fontSize: "22px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </span>
                              </h2>
                            </div>
                            <div className="form-group otp_box">
                              {otpDigits.map((digit, index) => (
                                <input
                                  key={index}
                                  type="text"
                                  className="otp-field"
                                  value={digit}
                                  maxLength="1"
                                  onChange={(e) =>
                                    handleOtpChange(index, e.target.value)
                                  }
                                  onKeyDown={(e) => handleBackspace(index, e)}
                                  ref={inputRefs.current[index]}
                                />
                              ))}
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
                                onClick={counter > 0 ? "" : resendOtp}
                                style={{
                                  color: "grey ",
                                  cursor: "pointer",
                                }}
                                className="resend"
                                id="otp_resend"
                              >
                                {loading ? (
                                  "Sending OTP..."
                                ) : (
                                  <>
                                    {counter > 0
                                      ? `Resend OTP in ${counter} seconds`
                                      : "RESEND OTP"}
                                  </>
                                )}
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
                        loading="lazy" alt="icon image"
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
  );
}

export default SignInModal;
