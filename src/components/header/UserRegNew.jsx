import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import "./style.css";
import Acur from "./Acur";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import Selectstream from "./Selectstream";
import Educationdetails from "./Educationdetails";
import Registrationsuccess from "./Registrationsuccess";
import ProgressBar from "./ProgressBar";
import UserPin from "./UserPin";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const UserRegNew = () => {
  const navigate = useNavigate();

  const sessionCCode = sessionStorage.getItem("c_code") || "+91";
  const sessionMobile = sessionStorage.getItem("mobile") || "";
  const sessionEmail = sessionStorage.getItem("email") || "";
  const sessionName = sessionStorage.getItem("name") || "";
  const user_id = sessionStorage.getItem("id");

  const [userName, setUserName] = useState(sessionName);
  const [email, setEmail] = useState(sessionEmail);
  const [mobile, setMobile] = useState(sessionMobile);
  const [countryCode, setCountryCode] = useState(sessionCCode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState("");
  const [streamList, setStreamList] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null);
  const [progresStatus, setProgressBarStatus] = useState(null);

  const isEmailValid = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isMobileValid = (mobile) => /^[0-9]{10,15}$/.test(mobile);
  const isNameValid = () => userName.trim().length > 0;

  const userData = sessionStorage.getItem("userData") || "";
  const Parseddata = userData === "" ? "" : JSON.parse(userData);

  const handlePhoneChange = (value, data) => {
  console.log(data)
    setCountryCode(value);
    console.log('Country Code:', data.countryCode);
};


  useEffect(() => {
    // const userData = sessionStorage.getItem("userData") || "";
    // const Parseddata = userData==="" ?(""):( JSON.parse(userData));
    if (Parseddata.user_pin === "0") {
      setStep("userpin");
    }
    if (Parseddata.length < 10 || userData === "null") {
      setStep("personal");
    }
  }, []);

  useEffect(() => {
    const progressbarstatus = async () => {
      try {
        const { data } = await axiosInstance.post(
          API_ENDPOINTS.NEW_REGISRATION.USER_PROGRESS_BARSTATUS,
          { user_id: user_id }
        );
        setProgressBarStatus(data?.data?.progress_bar_percent || 25);
        if (
          data?.data?.progress_bar_percent == 50 &&
          Parseddata.user_pin === "1"
        ) {
          setStep("stream");
        }
        if (data?.data?.progress_bar_percent == 75) {
          setStep("educate");
        }
      } catch (error) {
        console.error("Error fetching progress bar status", error);
      }
    };
    progressbarstatus();
  }, [user_id]);

  const handleSubmit = async (e) => {
    console.log("here")
    console.log(countryCode)
    e.preventDefault();
    if (!isNameValid()) return toast.error("Name cannot be empty.");
    if (!isEmailValid(email)) return toast.error("Invalid email address.");
    if (!isMobileValid(mobile)) return toast.error("Invalid mobile number.");

    setIsSubmitting(true);
    try {
      const payload = {
        name: userName,
        email,
        mobile,
        c_code: countryCode,
      };

      const response = await axiosInstance.post(
       API_ENDPOINTS.NEW_REGISRATION.CONTACT_REGISTRATION_V4,
        payload
      );

      if (response?.data?.status === true) {
        sessionStorage.setItem("jwt_token", response.data.data.jwt_token);
        sessionStorage.setItem("id", response.data.data.id);
        sessionStorage.setItem("userData", JSON.stringify(response.data.data));
        setStep("userpin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Error: Unable to submit the form. Please try again.");
    }
    setIsSubmitting(false);
  };

  const handlerSuccess = () => {
    setStep("stream");
  };

  const handlerPinSaved = () => {
    setStep("stream");
  };

  const handlerStreamGetID = async (id) => {
    setSelectedStream(id);
  };

  const getStreamHandler = async () => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.NEW_REGISRATION.STUDENT_COURSE_STREAM,
      );
      if (data.status === true) {
        const filterData = data.data.filter((itm) => itm.text !== "TVAPP");
        setStreamList(filterData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Error: Unable to fetch stream data.");
    }
  };

  useEffect(() => {
    if (step === "stream") getStreamHandler();
  }, [step]);

  const handlerNext = async () => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.NEW_REGISRATION.CONTACT_REGISTRATION_COMPLETED_V4,
        {
          user_id: user_id,
          stream_id: "1",
          year: "",
          state_name: "",
          college_name: "",
          mbbs_from: "",
          UserReg_tab: "1",
        }
      );
      if (data.status === true) {
        setStep("educate");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerPrevious = () => {
    setStep("personal");
  };

  const handlerBackInEducate = () => {
    setStep("stream");
  };

  return (
    <div>
      <Acur step={step} />
      {step === "success" ? (
        <Registrationsuccess handlerSuccess={handlerSuccess} />
      ) : (
        <div className="container">
          <div className="personalDetail">
            <div className="row">
              <div className="col-12">
                <div className="reqDetails">
                  <h1>
                    {step === "personal"
                      ? "Personal Details"
                      : step === "stream"
                      ? "Choose Your Stream"
                      : step === "educate"
                      ? "Education Details"
                      : "Set user Pin"}
                  </h1>
                  <p>Please enter required details</p>
                  <ProgressBar progresStatus={progresStatus} />
                  <div className="fieldPart">
                    {step === "personal" && (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group position-relative numberShow">
                          <label htmlFor="phone">Your phone number</label>
                          <div  style={{ display: "flex", gap: "8px", alignItems: "center" }}>
  {/* Country Code Input */}
  <PhoneInput
    international
    defaultCountry="in"
    value={`+${countryCode}`} // Always keep "+" prefix
    onChange={handlePhoneChange}
    disabled={!!sessionMobile}
    inputStyle={{
      width: "100%",
      height: "50px",
      borderRadius: "16px",
      borderRight: "none",
      padding: "8px",
    }}
    style={{
      width: "50px",
      flexShrink: 0,
    }}
  />

  {/* Mobile Number Input */}
  <input
    type="tel"
    value={mobile}
    onChange={(e) => {
      const numberOnly = e.target.value.replace(/\D/g, "");
      setMobile(numberOnly);
    }}
    placeholder="Enter mobile number"
    disabled={!!sessionMobile}
    style={{
      flex: 1,
      height: "50px",
      borderRadius: "16px",
      padding: "8px",
      marginLeft:"25px",
      borderLeft:"none"
    }}
  />
</div>

                        </div>

                        <div className="form-group">
                          <label htmlFor="name">Your name?</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="mail">Your email?</label>
                          <input
                            type="email"
                            className="form-control"
                            id="mail"
                            name="mail"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!!sessionEmail}
                            required
                          />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <button
                            className="btn btn-primary"
                            type="submit"
                            style={{
                              display:
                                sessionMobile ||
                                (countryCode === "91" &&
                                  mobile.length === 10) ||
                                (countryCode !== "91" && mobile.length >= 6)
                                  ? "block"
                                  : "none",
                            }}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Next"}
                          </button>
                        </div>
                      </form>
                    )}

                    {step === "stream" && (
                      <Selectstream
                        handlerNext={handlerNext}
                        handlerPrevious={handlerPrevious}
                        streamList={streamList}
                        handlerStreamGetID={handlerStreamGetID}
                        selectedstream={selectedStream}
                      />
                    )}

                    {step === "educate" && (
                      <Educationdetails
                        handlerBackInEducate={handlerBackInEducate}
                        selectedStream={selectedStream}
                        user_id={user_id}
                      />
                    )}

                    {step === "userpin" && <UserPin setStep={setStep} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegNew;
