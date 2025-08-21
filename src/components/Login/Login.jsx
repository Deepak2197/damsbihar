import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../../API/axiosConfig";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { useNavigate,useLocation } from "react-router-dom";
import "./login.css";
import { Spinner } from "react-bootstrap";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import ResetPin from "./ResetPin";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
const Login = ({
  handlerClose,
  setIsAuthenticated,
  handleSignInSuccess,
  setSignInModalOpen,
  targeturl,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [counter, setCounter] = useState(62);
  const [error, setError] = useState("");
  const [toggleEmailOrPhone, setToggleEmailOrPhone] = useState("number");
  const [isOtpModalOpen, setOtpModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("");
  const [multi, setmulti] = useState(null);
  const [spin, setspin] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [pinModal, setPinModal] = useState(false);
  const [pinDigits, setPinDigits] = useState(["", "", "", ""]);
  const [userPinStatus, setUserPinStatus] = useState(null);
  const [isForgotPinModalOpen, setIsForgotPinOpen] = useState(false);
  const [pinRecoveryModal, setPinRecoveryModal] = useState(false);
  const [pinForgotModal, setPinForgotModal] = useState(false);
  const [newResetPinDigits, setNewResetPinDigits] = useState(["", "", "", ""]);
  const [newPinConfirmDigits, setNewPinConfirmDigits] = useState([
    "",
    "",
    "",
    "",
  ]);
  const [pinResetModal, setPinResetModal] = useState(false);
  const [oldPinDigits, setOldPinDigits] = useState(["", "", "", ""]);
  const [pinError, setPinError] = useState(true);
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const newPinInputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const confirmInputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const location = useLocation();
  const current = location.pathname;
  const handleNewPinChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newPinDigits = [...newResetPinDigits];
    newPinDigits[index] = value;
    setNewResetPinDigits(newPinDigits);
    // Move focus to the next input field if the current field is filled
    if (value && index < newPinInputRefs.current.length - 1) {
      newPinInputRefs.current[index + 1].current.focus();
    }
  };

  const handlerResetPin = () => {
    setPinResetModal(true);
  };

  const handleNewPinOtp = async () => {
    setPinRecoveryModal(true);
    let numar = phoneNumber.split("");
    let carray = numar.slice(0, 3);
    let c_code = carray.join("");
    numar.splice(0, 3);
    const updatednum = numar.join("");

    if (toggleEmailOrPhone == "number") {
      setspin(true);
      const res = await axiosInstance.post(
        API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION,
        { mobile: updatednum, c_code: c_code, loginStatus: 0 }
      );

      if (res?.data?.status) {
        setspin(false);
        setmulti(null);
        setOtpModalOpen(true);
      }
    } else {
      setspin(true);
      const res = await axiosInstance.post(
        API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION,
        { email: email, loginStatus: 0 }
      );
      if (res?.data?.status) {
        setLoading(false);
        setspin(false);
        setmulti(null);
        setOtpModalOpen(true);
      }
    }
  };

  const confirmNewPinChange = (index, value) => {
    const confirmPin = [...newPinConfirmDigits];
    confirmPin[index] = value;
    setNewPinConfirmDigits(confirmPin);
    if (value && index < confirmInputRefs.current.length - 1) {
      confirmInputRefs.current[index + 1].current.focus();
    }
    const isComplete = confirmPin.every((digit) => digit !== "");
    if (isComplete) {
      if (newResetPinDigits.join("") !== confirmPin.join("")) {
        toast.error("PINs do not match");
      } else {
        toast.success("PINs matched successfully");
      }
    }
    // Move focus to the next input field if the current field is filled
  };

  const handlePinSave = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const user_pin = newPinConfirmDigits.join("");
      const res = await axiosInstance.post(API_ENDPOINTS.LOGIN.USER_FORGOTPIN, {
        user_id: user_id,
        user_pin: user_pin,
      });
      if (res?.data?.status === true) {
        setPinRecoveryModal(false);
        toast.success(res?.data?.message);
        setOtpModalOpen(false);
        setSignInModalOpen(false);
        setCounter(62);
        setPhoneNumber("");
        setEmail("");
        setOtpDigits(["", "", "", ""]);
        setToggleEmailOrPhone("number");
      }
      if (targeturl == null) {
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlerForgotPin = () => {
    setIsForgotPinOpen(true);
    handleNewPinOtp();
  };

  const openOtpModal = async (e) => {
    e.preventDefault();
    if (toggleEmailOrPhone === "number") {
      if (!phoneNumber) {
        toast.error("Please enter your number");
      } else if (phoneNumber.startsWith("+91") && phoneNumber.length <= 9) {
        toast.error("Enter valid number");
      } else {
        try {
          // setLoading(true);
          // let numar = phoneNumber.split("");
          // numar.splice(0, 3);
          let numar = phoneNumber.split("");
          let carray = numar.slice(0, 3);
          let c_code = carray.join("");
          numar.splice(0, 3);
          const updatednum = numar.join("");
          const [PinResponse, loginResponse] = await Promise.all([
            axiosInstance.post(API_ENDPOINTS.LOGIN.USER_PIN_STATUS, {
              mobile: updatednum,
            }),
            axiosInstance.post(API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION, {
              mobile: updatednum,
              c_code: c_code,
            }),
          ]);
          setUserPinStatus(PinResponse);
          localStorage.setItem("user_id", PinResponse?.data?.data?.user_id);
          if (
            loginResponse?.data?.data === null &&
            loginResponse?.data?.message === "1"
          ) {
            sessionStorage.setItem("mobile", updatednum);
            sessionStorage.setItem("c_code", c_code);
            setOtpModalOpen(false);
            setSignInModalOpen(false);
            navigate("/user-registration");
            return;
          }
          if (
            loginResponse?.data?.data == null &&
            loginResponse?.data?.message === `OTP Sent ${updatednum}`
          ) {
            setLoading(false);
            toast.success(`sent otp on your number ${updatednum}`);
            setOtpModalOpen(true);
            return;
          }

          if (loginResponse?.data?.status) {
            setLoading(false);
            toast.success(`sent otp on your number ${updatednum}`);
            setOtpModalOpen(true);
          } else {
            setOtpModalOpen(false);
            setmulti(loginResponse?.data);
          }
        } catch (err) {}
      }
    } else if (toggleEmailOrPhone === "email") {
      if (!email) {
        toast.error("Please enter your email");
      } else if (!isValid) {
        toast.error("Please enter valid email");
      } else {
        try {
          setLoading(true);
          const [PinResponse, loginResponse] = await Promise.all([
            axiosInstance.post(API_ENDPOINTS.LOGIN.USER_PIN_STATUS, {
              email: email,
            }),
            axiosInstance.post(API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION, {
              email: email,
            }),
          ]);
          setUserPinStatus(PinResponse);
          localStorage.setItem("user_id", PinResponse?.data?.data?.user_id);
          if (
            loginResponse?.data?.data == null ||
            loginResponse?.data?.message === "1"
          ) {
            sessionStorage.setItem("email", email);
            setOtpModalOpen(false);
            setSignInModalOpen(false);
            navigate("/user-registration");
            return;
          }
          if (
            loginResponse?.data?.data == null &&
            loginResponse?.data?.message === `OTP Sent ${email}`
          ) {
            setLoading(false);
            toast.success(`sent otp on your number ${email}`);
            setOtpModalOpen(true);
            return;
          }
          if (!loginResponse?.data?.status) {
            setLoading(false);
            toast.success(`sent otp on your email ${email}`);
            setOtpModalOpen(true);
          } else {
            setOtpModalOpen(false);
            setmulti(loginResponse?.data);
          }
        } catch (err) {}
      }
    }
  };

  const handleClick = () => {
    setCounter(62);
  };

  const handlerResetOtp = () => {
    setCounter(60);
    setToggleEmailOrPhone("number");
    setPhoneNumber("");
    setEmail("");
    setOtpModalOpen(false);
    setOtpDigits(["", "", "", ""]);
    // setSignInModalOpen(false);
  };

  const resendOtp = async () => {
    handleClick();
    try {
      setLoading(true);
      let numar = phoneNumber.split("");
      numar.splice(0, 3);
      const updatednum = numar.join("");
      const res = await axiosInstance.post(
        API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION,
        { mobile: updatednum ? updatednum : email }
      );
      setLoading(false);
      toast.success(
        updatednum
          ? `sent otp on your number ${updatednum}`
          : `sent otp on your email ${email}`
      );
      setOtpModalOpen(true);
    } catch (err) {}
  };
  const handlePinChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newPinDigits = [...pinDigits];
    newPinDigits[index] = value;
    setPinDigits(newPinDigits);
    // Move focus to the next input field if the current field is filled
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
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
    if (
      index > 0 &&
      event.key === "Backspace" &&
      !otpDigits[index] &&
      !pinDigits[index]
    ) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleBackspaceForConfirmPin = (index, e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      confirmInputRefs.current[index - 1].current.focus();
    }
  };

  const handleBackspaceForNewPin = (index, e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      newPinInputRefs.current[index - 1].current.focus();
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

  const handlePinVerification = async (e) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(pinDigits.join(""))) {
      toast.error("Please enter valid pin");
      return;
    }
    try {
      let numar = phoneNumber.split("");
      numar.splice(0, 3);
      const updatednum = numar.join("");
      const pinEnterd = pinDigits.join("");
      const demoOne = updatednum
        ? { user_pin: pinEnterd, mobile: updatednum, loginStatus: 0 }
        : { user_pin: pinEnterd, email: email, loginStatus: 0 };
      const response = await axiosInstance.post(
        API_ENDPOINTS.LOGIN.LOGIN_BY_PIN,
        demoOne
      );
      
      if (response?.data?.status == true) {
        sessionStorage.setItem("userData", JSON.stringify(response.data.data));
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
          setSignInModalOpen(false);
          handleSignInSuccess;

          toast.success("User authentication successful!");
          setCounter(62);
          setPhoneNumber("");
          setEmail("");
          setOtpDigits(["", "", "", ""]);
          setToggleEmailOrPhone("number");

          if(current == "/user-registration"){
            navigate("/");
          }

          else if (targeturl == null) {
            window.location.reload();
          }
          // navigate("/");
          else if (targeturl.endsWith("b")) {
            navigate(`/raise-query/${response?.data?.data?.id}DTweb`);
            window.location.reload();
          } else if (targeturl) {
            navigate(targeturl);
            window.location.reload();
          } else {
            window.location.reload();
          }
        } else {
          sessionStorage.setItem(
            "is_course_register",
            response.data.data.is_course_register
          );
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
        toast.error("Please Enter Valid pin.");
        // });
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleOtpVerification = async (e) => {
    let numar = phoneNumber.split("");
    numar.splice(0, 3);
    const updatednum = numar.join("");
    e.preventDefault();
    if (checkEmptyElement(otpDigits)) {
      toast.error("Please enter otp");
    } else {
      try {
        const enteredOtp = otpDigits.join("");
        const demoOne = updatednum
          ? { otp: enteredOtp, mobile: updatednum, loginStatus: 0 }
          : { otp: enteredOtp, email: email, loginStatus: 0 };
        const response = await axiosInstance.post(
          API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION,
          demoOne
        );
        if (pinRecoveryModal && response.data.status == true) {
          setPinForgotModal(true);
          return;
        }
        if (response.data.status == true) {
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
            setSignInModalOpen(false);
            handleSignInSuccess;

            toast.success("User authentication successful!");
            setCounter(62);
            setPhoneNumber("");
            setEmail("");
            setOtpDigits(["", "", "", ""]);
            setToggleEmailOrPhone("number");
            if(current == "/user-registration"){
            navigate("/");
          }

            if (targeturl == null) {
              window.location.reload();
            }
            // navigate("/");
            if (targeturl.endsWith("b")) {
              navigate(`/raise-query/${response?.data?.data?.id}DTweb`);
              window.location.reload();
            } else if (targeturl) {
              navigate(targeturl);
              window.location.reload();
            } else {
              window.location.reload();
            }
          } else {
            sessionStorage.setItem(
              "is_course_register",
              response.data.data.is_course_register
            );
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
        // console.log(error);
      }
    }
  };

  const handleEmail = (e) => {
    const { value } = e.target;
    setEmail(value.toLowerCase());
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setIsValid(isValidEmail);
  };

  const handleNumberValidate = (value) => {
    setPhoneNumber(value);

    try {
      const phoneNumberObj = parsePhoneNumber(value);
      const nationalNumber = phoneNumberObj.nationalNumber;
      const country = phoneNumberObj.country;

      if (country === "IN") {
        if (nationalNumber.length !== 10) {
          setPhoneError("Indian number must be exactly 10 digits.");
        } else {
          setPhoneError("");
        }
      } else {
        if (nationalNumber.length < 8) {
          setPhoneError("Minimum 6 digits required for this country.");
        } else {
          setPhoneError("");
        }
      }
    } catch (error) {
      //setPhoneError("Invalid phone number");
    }
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleLogOut = async () => {
    let numar = phoneNumber.split("");
    let carray = numar.slice(0, 3);
    let c_code = carray.join("");
    numar.splice(0, 3);
    const updatednum = numar.join("");

    if (toggleEmailOrPhone == "number") {
      setspin(true);
      const res = await axiosInstance.post(
        API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION,
        { mobile: updatednum, c_code: c_code, loginStatus: 0 }
      );

      if (res?.data?.status) {
        setspin(false);
        setmulti(null);
        setOtpModalOpen(true);
      }
    } else {
      setspin(true);
      const res = await axiosInstance.post(
       API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION,
        { email: email, loginStatus: 0 }
      );
      if (res?.data?.status) {
        setLoading(false);
        setspin(false);
        setmulti(null);
        setOtpModalOpen(true);
      }
    }
  };

  return (
    <section className="login-popup">
      <div className="modal modal-open show modal-container">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body login_area">
              <div className="row">
                <div className="setOfLogin">
                  <div className="imgSec">
                    <div className="popLeftPart">
                      <img
                        src={
                          multi
                            ? `${window.IMG_BASE_URL}/image_2024_11_14T07_24_48_446Z.png`
                            : `${window.IMG_BASE_URL}/signIn.svg`
                        }
                        loading="lazy"
                        alt="icon image"
                        className={multi ? "logoutImg" : ""}
                      />
                      {/* <img
                      src={'${window.IMG_BASE_URL}/signIn.svg'}
                      loading="lazy" alt="icon image"
                    /> */}
                    </div>
                  </div>

                  <div className="logiNSec">
                    <div className="modal-header close_btn pop-modal">
                      <button
                        type="button"
                        className="close"
                        onClick={handlerClose}
                      >
                        ×
                      </button>
                    </div>
                    {multi ? (
                      <div className="logoutData">
                        <h3 className="pendingText">
                          Login pending, Device limit reached
                        </h3>
                        <div className="backgroundData">
                          <div className="logMsg">
                            <h2>Alert !</h2>
                            <p>
                              Please Note: If you login without saving your
                              current running task in other device Eg: Test
                              Series, Live class, Daily Quiz, it's report will
                              be hampered, you will face difficulty in accessing
                              those task is same state.{" "}
                            </p>
                            {/* {multi?.message} */}
                          </div>
                          <div className="lastLogin">
                            <span className="setImg">
                              <img
                                src={`${window.IMG_BASE_URL}/mobile.png`}
                                loading="lazy"
                                alt="icon image"
                              />
                            </span>
                            <b>Last Login: </b>
                            {multi?.data?.last_login}
                          </div>
                          <div className="btnlogdata">
                            <button
                              style={{ backgroundColor: "lightgray" }}
                              onClick={handlerClose}
                              className="btndata"
                            >
                              Cancel
                            </button>
                            <button
                              style={{
                                backgroundColor: "blue",
                                color: "white",
                              }}
                              onClick={handleLogOut}
                              className="btndata"
                            >
                              {spin ? <Spinner /> : "Logout & Continue"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="login-logo otpLOg">
                        <div className="text-center logoSec"></div>
                        <div className="login-logo_text">
                          {!isOtpModalOpen && (
                            <>
                              <h2>
                                <span classname="welcomText">Welcome!</span>{" "}
                                Sign up or Login
                                {/* <span className="d-block enroll-title">
                                            Application for NEET PG Preparation
                                          </span> */}
                              </h2>
                            </>
                          )}
                        </div>
                        {!isOtpModalOpen ? (
                          <form name="loginFormbyPhone" onSubmit={openOtpModal}>
                            <div className="login-input-holder">
                              <div
                                className="login-input-group position-relative"
                                id="login-email-phone"
                              >
                                {toggleEmailOrPhone === "number" ? (
                                  <>
                                    {/* <img
                                  className="flagbbg"
                                  style={{ height: "15px" }}
                                  src="https://i.ibb.co/Jv4wzpG/indian-flag.jpg"
                                  loading="lazy" alt="icon image"
                                />
                                <input
                                  style={{
                                    padding: "10px 10px 5px 45px",
                                  }}
                                  type="text"
                                  name="phoneNumber"
                                  placeholder="Mobile Number"
                                  onChange={handleNumberValidate}
                                  className="fieldSelectorId inp-title"
                                  value={phoneNumber}
                                /> */}

                                    <PhoneInput
                                      international
                                      defaultCountry="in"
                                      value={phoneNumber}
                                      onChange={handleNumberValidate}
                                      inputStyle={{
                                        width: "100%",
                                        height: "auto",
                                        border: "0px",
                                        paddingBottom: "0px",
                                        borderBottom: "0.5px solid lightgray",
                                      }}
                                      countrySelectorStyleProps={{
                                        width: "100%",
                                        height: "100%",
                                      }}
                                      dialCodePreviewStyleProps={{
                                        width: "100%",
                                        height: "100%",
                                      }}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <img
                                      className="flagbbg"
                                      src="https://i.ibb.co/zZ5SXvt/mail.png"
                                      style={{
                                        width: "20px",
                                        height: "auto",
                                        position: "absolute",
                                        left: "0px",
                                        top: "12px",
                                      }}
                                      loading="lazy"
                                      alt="icon image"
                                    />

                                    <input
                                      style={{
                                        padding: "10px 10px 5px 45px",
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
                              className="common-bottom-btn"
                              onClick={openOtpModal}
                              value={loading ? "Please wait...." : "Continue"}
                              disabled={!!phoneError}
                              type="button"
                            />
                            {phoneError && (
                              <div
                                style={{
                                  color: "red",
                                  fontSize: "13px",
                                  marginTop: "5px",
                                }}
                              >
                                {toggleEmailOrPhone === "number"
                                  ? phoneError
                                  : ""}
                              </div>
                            )}

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
                            <div className="login-logo1">
                              {pinModal ? (
                                pinResetModal ? (
                                  // 🔁 Reset Pin Flow (newly added)
                                  <>
                                    <ResetPin
                                      setPinResetModal={setPinResetModal}
                                    />
                                  </>
                                ) : isForgotPinModalOpen ? (
                                  pinRecoveryModal ? (
                                    pinForgotModal ? (
                                      <div>
                                        <form
                                          className="digit-group text-center otp-form"
                                          name="pinvarfy_new"
                                        >
                                          <div className="login-logo_text">
                                            <h2>Enter your New Pin</h2>
                                            <div className="form-group otp_box">
                                              {newResetPinDigits.map(
                                                (digit, index) => (
                                                  <input
                                                    key={index}
                                                    type={Number}
                                                    className="otp-field"
                                                    style={{
                                                      boxShadow:
                                                        "1px 1px 2px black",
                                                    }}
                                                    value={digit}
                                                    maxLength="1"
                                                    onChange={(e) =>
                                                      handleNewPinChange(
                                                        index,
                                                        e.target.value
                                                      )
                                                    }
                                                    onKeyDown={(e) =>
                                                      handleBackspaceForNewPin(
                                                        index,
                                                        e
                                                      )
                                                    }
                                                    ref={
                                                      newPinInputRefs.current[
                                                        index
                                                      ]
                                                    }
                                                  />
                                                )
                                              )}
                                            </div>{" "}
                                            {/* Closed first form-group div */}
                                            <h2>Confirm your New Pin</h2>
                                            <div className="form-group otp_box">
                                              {newPinConfirmDigits.map(
                                                (digit, index) => (
                                                  <input
                                                    key={index}
                                                    type="number"
                                                    className="otp-field"
                                                    style={{
                                                      boxShadow:
                                                        "1px 1px 2px black",
                                                    }}
                                                    value={digit}
                                                    maxLength="1"
                                                    onChange={(e) =>
                                                      confirmNewPinChange(
                                                        index,
                                                        e.target.value
                                                      )
                                                    }
                                                    onKeyDown={(e) =>
                                                      handleBackspaceForConfirmPin(
                                                        index,
                                                        e
                                                      )
                                                    }
                                                    ref={
                                                      confirmInputRefs.current[
                                                        index
                                                      ]
                                                    }
                                                  />
                                                )
                                              )}

                                              <button
                                                className="common-bottom-btn"
                                                onClick={handlePinSave}
                                                disabled={
                                                  newResetPinDigits.join("") !==
                                                    newPinConfirmDigits.join(
                                                      ""
                                                    ) ||
                                                  !/^\d{4}$/.test(
                                                    newResetPinDigits.join("")
                                                  )
                                                }
                                              >
                                                verify & save
                                              </button>
                                            </div>
                                          </div>
                                        </form>
                                      </div>
                                    ) : (
                                      <div>
                                        <form
                                          className="digit-group text-center otp-form"
                                          name="otpvarfy_new"
                                        >
                                          <div className="login-logo_text">
                                            <h2>
                                              Enter the code sent to your{" "}
                                              {phoneNumber ? "phone" : "email"}
                                              <span className="phone_and_email"></span>
                                              <br />
                                              <span
                                                style={{ color: "#08D002" }}
                                                id="email_here"
                                              >
                                                {phoneNumber
                                                  ? `XXXXX${phoneNumber.substring(
                                                      5
                                                    )}`
                                                  : email}
                                                {/* <CiEdit
                                                onClick={handlerResetOtp}
                                                style={{
                                                  marginLeft: "10px",
                                                  fontSize: "22px",
                                                  cursor: "pointer",
                                                }}
                                                /> */}
                                              </span>
                                            </h2>
                                          </div>
                                          <div className="form-group otp_box">
                                            {otpDigits.map((digit, index) => (
                                              <input
                                                key={index}
                                                type="number"
                                                className="otp-field"
                                                style={{
                                                  boxShadow:
                                                    "1px 1px 2px black",
                                                }}
                                                value={digit}
                                                maxLength="1"
                                                onChange={(e) =>
                                                  handleOtpChange(
                                                    index,
                                                    e.target.value
                                                  )
                                                }
                                                onKeyDown={(e) =>
                                                  handleBackspace(index, e)
                                                }
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
                                              onClick={
                                                counter > 0 ? "" : resendOtp
                                              }
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
                                                // <>
                                                //   {counter > 0
                                                //     ? `Resend OTP in ${counter} seconds`
                                                //     : "Didn't recieve OTP? Resend Now"}
                                                // </>
                                                <>
                                                  {counter > 0 ? (
                                                    `Didn't receive OTP? Resend in ${counter} sec`
                                                  ) : (
                                                    <>
                                                      Didn't receive OTP?
                                                      <span className="resendNow">
                                                        Resend Now
                                                      </span>
                                                    </>
                                                  )}
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
                                              Verify & Proceed
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                    )
                                  ) : (
                                    <div>
                                      {" "}
                                      <form name="loginFormbyPhone">
                                        <div className="login-input-holder">
                                          <div
                                            className="login-input-group position-relative"
                                            id="login-email-phone"
                                          >
                                            {toggleEmailOrPhone === "number" ? (
                                              <>
                                                <PhoneInput
                                                  international
                                                  defaultCountry="in"
                                                  value={phoneNumber}
                                                  onChange={
                                                    handleNumberValidate
                                                  }
                                                  inputStyle={{
                                                    width: "100%",
                                                    height: "auto",
                                                    border: "0px",
                                                    paddingBottom: "0px",
                                                    borderBottom:
                                                      "0.5px solid lightgray",
                                                  }}
                                                  countrySelectorStyleProps={{
                                                    width: "100%",
                                                    height: "100%",
                                                  }}
                                                  dialCodePreviewStyleProps={{
                                                    width: "100%",
                                                    height: "100%",
                                                  }}
                                                />
                                              </>
                                            ) : (
                                              <>
                                                <img
                                                  className="flagbbg"
                                                  src="https://i.ibb.co/zZ5SXvt/mail.png"
                                                  style={{
                                                    width: "20px",
                                                    height: "auto",
                                                    position: "absolute",
                                                    left: "0px",
                                                    top: "12px",
                                                  }}
                                                  loading="lazy"
                                                  alt="icon image"
                                                />

                                                <input
                                                  style={{
                                                    padding:
                                                      "10px 10px 5px 45px",
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
                                          className="common-bottom-btn"
                                          onClick={handleNewPinOtp}
                                          value={
                                            loading
                                              ? "Please wait...."
                                              : "Continue"
                                          }
                                          disabled={!!phoneError}
                                          type="button"
                                        />
                                        {phoneError && (
                                          <div
                                            style={{
                                              color: "red",
                                              fontSize: "13px",
                                              marginTop: "5px",
                                            }}
                                          >
                                            {toggleEmailOrPhone === "number"
                                              ? phoneError
                                              : ""}
                                          </div>
                                        )}

                                        <div className="email-acc">
                                          <a>
                                            {toggleEmailOrPhone === "number" ? (
                                              <span
                                                onClick={() => {
                                                  setPhoneNumber("");
                                                  setToggleEmailOrPhone(
                                                    "email"
                                                  );
                                                }}
                                              >
                                                Login Using Email
                                              </span>
                                            ) : (
                                              <span
                                                onClick={() => {
                                                  setEmail("");
                                                  setToggleEmailOrPhone(
                                                    "number"
                                                  );
                                                }}
                                              >
                                                Login Using Number
                                              </span>
                                            )}
                                          </a>
                                        </div>
                                      </form>
                                    </div>
                                  )
                                ) : (
                                  <form
                                    className="digit-group text-center otp-form"
                                    name="pinvarfy_new"
                                  >
                                    <div className="login-logo_text">
                                      <h2>Enter your Pin</h2>
                                      <div className="form-group otp_box">
                                        {pinDigits.map((digit, index) => (
                                          <input
                                            key={index}
                                            type="text"
                                            className="otp-field"
                                            style={{
                                              boxShadow: "1px 1px 2px black",
                                            }}
                                            value={digit}
                                            maxLength="1"
                                            onChange={(e) =>
                                              handlePinChange(
                                                index,
                                                e.target.value
                                              )
                                            }
                                            onKeyDown={(e) =>
                                              handleBackspace(index, e)
                                            }
                                            ref={inputRefs.current[index]}
                                          />
                                        ))}
                                        <button
                                          type="submit"
                                          name="submit"
                                          value="submit"
                                          className="common-bottom-btn"
                                          onClick={handlePinVerification}
                                        >
                                          Verify & Proceed
                                        </button>
                                      </div>
                                      <div>
                                        <button
                                          style={{
                                            color: "#f15a22",
                                            cursor: "pointer",
                                          }}
                                          onClick={handlerForgotPin}
                                        >
                                          Forgot pin?
                                        </button>
                                      </div>
                                      <div style={{ marginTop: "10px" }}>
                                        <button
                                          style={{
                                            color: "blue",
                                            cursor: "pointer",
                                          }}
                                          onClick={handlerResetPin}
                                        >
                                          Reset pin?
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                )
                              ) : (
                                <form
                                  className="digit-group text-center otp-form"
                                  name="otpvarfy_new"
                                >
                                  <div className="login-logo_text">
                                    <h2>
                                      Enter the code sent to your{" "}
                                      {phoneNumber ? "phone" : "email"}
                                      <span className="phone_and_email"></span>
                                      <br />
                                      <span
                                        style={{ color: "#212121" }}
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

                                        <span className="editCode">Edit</span>
                                      </span>
                                    </h2>
                                  </div>
                                  <div className="form-group otp_box">
                                    {otpDigits.map((digit, index) => (
                                      <input
                                        key={index}
                                        type="number"
                                        className="otp-field"
                                        style={{
                                          boxShadow: "1px 1px 2px black",
                                        }}
                                        // style={{ boxShadow: "1px 1px 2px black" }}
                                        value={digit}
                                        maxLength="1"
                                        onChange={(e) =>
                                          handleOtpChange(index, e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                          handleBackspace(index, e)
                                        }
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
                                        // <>
                                        //   {counter > 0
                                        //     ? `Resend OTP in ${counter} seconds`
                                        //     : "Didn't recieve OTP? Resend Now"}
                                        // </>
                                        <>
                                          {counter > 0 ? (
                                            `Didn't receive OTP? Resend in ${counter} sec`
                                          ) : (
                                            <>
                                              Didn't receive OTP?
                                              <span className="resendNow">
                                                Resend Now
                                              </span>
                                            </>
                                          )}
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
                                      Verify & Proceed
                                    </button>
                                  </div>
                                  <div className="form-group">
                                    {userPinStatus?.data?.data
                                      ?.is_course_register === "1" &&
                                      userPinStatus?.data?.data?.user_pin ===
                                        1 && (
                                        <button
                                          style={{
                                            color: "#f15a22",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => {
                                            setPinModal(true);
                                          }}
                                        >
                                          Login Using Pin{" "}
                                        </button>
                                      )}
                                  </div>
                                </form>
                              )}
                            </div>
                          </div>
                        )}
                        {/* <div className="login-permission">
                                    <img
                                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/signIn-pop/lock_assets.png"
                                      className="login-permisson-icon"
                                      loading="lazy" alt="icon image"
                                    />
                                    We never post without your permission
                                  </div> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
