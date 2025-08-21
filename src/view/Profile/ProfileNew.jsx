import React, { useState, useEffect, useRef } from "react";
import "../Profile/style.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { useParams } from "react-router-dom";
import { Button, Checkbox, Input, Modal, Select } from "antd";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const { Option } = Select;

const ProfileNew = () => {
  const { id, userpin } = useParams();
  const navigate = useNavigate();
  const [listData, setListData] = useState({});
  const [status, setStatus] = useState({});
  const [yearName, setYearName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [genderName, setGenderName] = useState("");
  const [statusData, setStatusData] = useState({});
  const [visibleDiv, setVisibleDiv] = useState(null); // Changed to null for clarity
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [colName, setColName] = useState([]);
  const [cName, setCName] = useState([]);
  const [sName, setSName] = useState([]);
  const [errorShow, setErrorShow] = useState("");
  const [errorPin, setErrorPin] = useState("");
  const [emailToggle, setEmailToggle] = useState(false);
  const profileupdate = () => {
    navigate("/profile-view");
    closeNav();
  };
  const {
    city_name,
    college_name,
    list,
    state,
    type_college_name,
    type_city_name,
    type_state,
    course_category,
    type_course_category,
    year_of_study,
    type_year_of_study,
    type_gender,
    gender,
  } = listData;

  const arr = course_category?.chield_column?.split(",");
  const categoryCreate = arr?.map((cat, i) => ({
    id: i + 1,
    name: cat,
  }));

  const genderArr = gender?.chield_column?.split(",");
  const yearArr = year_of_study?.chield_column?.split(",");
  const yearCreate = yearArr?.map((cat, i) => ({
    id: i + 1,
    name: cat,
  }));

  const getCalled = async () => {
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.PROFILE.PROFILE_UPDATE,
        { user_id: id }
      );
      setStatusData(res?.data.data);
      if (res?.data.data?.percentage > 100) {
        navigate("/Completed");
      }

      const resp = await axiosInstance.post(
        API_ENDPOINTS.HELP_AND_SUPPORT.DYNAMIC_USER_FIELDS,
        { user_id: id }
      );
      setListData(resp.data.data);
      setStatus(resp?.data?.data?.list);

      const a = resp?.data?.data?.college_name?.table_data?.map((itm) => ({
        label: itm.college_name,
        value: itm.id,
      }));
      const b = resp?.data?.data?.city_name?.table_data?.map((itm) => ({
        label: itm.city_name,
        value: itm.id,
      }));
      const c = resp?.data?.data?.state?.table_data?.map((itm) => ({
        label: itm.state_name,
        value: itm.id,
      }));
      setColName(a);
      setCName(b);
      setSName(c);

      setCollegeName(resp?.data?.data?.list?.college_name);
      setCourseName(resp.data.data.list.course_category);
      setCityName(resp.data.data.list.city);
      setYearName(resp.data.data.list.year_of_study);
      setStateName(resp.data.data.list.state);
      setGenderName(resp.data.data.list.gender);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerUpdate = async () => {
    if (!collegeName) {
      setErrorShow("Please select college");
      setTimeout(() => setErrorShow(""), 1000);
      return;
    } else if (!cityName) {
      setErrorShow("Please select city");
      setTimeout(() => setErrorShow(""), 1000);
      return;
    } else if (!stateName) {
      setErrorShow("Please select state");
      setTimeout(() => setErrorShow(""), 1000);
      return;
    } else if (!courseName) {
      setErrorShow("Please select course");
      setTimeout(() => setErrorShow(""), 1000);
      return;
    } else if (!yearName) {
      setErrorShow("Please select year");
      setTimeout(() => setErrorShow(""), 1000);
      return;
    }

    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.PROFILE.PROFILE_CHANGE,
        {
          user_id: id,
          college_name: collegeName,
          course_category: courseName,
          city_name: cityName,
          state: stateName,
          year_of_study: yearName,
          gender: genderName,
        }
      );
      toast.success("User has been updated");
      getCalled();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const sendOtp = async (id) => {
    const payload =
      id === 1 ? { email: status.email } : { mobile: status.mobile };
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION,
        payload
      );

      // Handle API response
      if (data.status === true) {
        toast.success("OTP sent successfully");
        setEmailToggle(id); // 1 for email, 2 for mobile
        setVisibleDiv(id);
      } else if (data.message.includes("User Already Login")) {
        // Bypass "User Already Login" message and proceed with OTP flow
        toast.info("OTP flow initiated despite existing login");
        setEmailToggle(id);
        setVisibleDiv(id);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.log("Error sending OTP:", error);
      toast.error("Error sending OTP. Please try again.");
    }
  };

  const handlerVerified = async () => {
    const otpNum = otp.join("");
    const payload =
      emailToggle === 1
        ? { email: status.email, otp: otpNum }
        : { mobile: status.mobile, otp: otpNum };

    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.LOGIN.LOGIN_AUTHENTICATION,
        payload
      );

      if (data.status === true) {
        toast.success("OTP verified successfully");
        getVerified(emailToggle);
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.log("Error verifying OTP:", error);
      toast.error("Error verifying OTP. Please try again.");
    }
  };

  const getVerified = async (toggle) => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.LOGIN.STUDENT_VERIFY_STATUS,
        {
          user_id: id,
          verify_status_type: toggle === 1 ? "1" : "2",
        }
      );

      if (data.status === true) {
        toast.success(data.message || "Verification successful");
        setOtp(["", "", "", ""]);
        setEmailToggle(false);
        setVisibleDiv(null);
        getCalled();
      } else {
        toast.error(data.message || "Verification failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error during verification. Please try again.");
    }
  };

  const handlerSelectEmailOrNumber = (id) => {
    setOtp(["", "", "", ""]);
    sendOtp(id);
  };

  const SearchableSelect = ({ options }) => (
    <Select
      showSearch
      style={{ width: "100%" }}
      value={collegeName || undefined}
      onChange={(e) => setCollegeName(e)}
      placeholder="Select College"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
    >
      {options.map((option) => (
        <Option key={option.value} value={option.label}>
          {option.label}
        </Option>
      ))}
    </Select>
  );

  const SearchableSelectCity = ({ options }) => (
    <Select
      showSearch
      style={{ width: "100%" }}
      value={cityName || undefined}
      onChange={(e) => setCityName(e)}
      placeholder="Select City"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
    >
      {options.map((option) => (
        <Option key={option.value} value={option.label}>
          {option.label}
        </Option>
      ))}
    </Select>
  );

  const SearchableSelectState = ({ options }) => (
    <Select
      showSearch
      style={{ width: "100%" }}
      value={stateName || undefined}
      onChange={(e) => setStateName(e)}
      placeholder="Select State"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
    >
      {options.map((option) => (
        <Option key={option.value} value={option.label}>
          {option.label}
        </Option>
      ))}
    </Select>
  );

  // PIN-related states and functions remain unchanged for brevity
  const [visible, setVisible] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [isPinUpdated, setIsPinUpdated] = useState(false);
  const inputRefs = useRef([]);
  const confirmInputRefs = useRef([]);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const handleChanges = (value, index, type) => {
    if (!/^\d?$/.test(value)) return;
    if (type === "pin") {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      if (value && index < 3) inputRefs.current[index + 1]?.focus();
    } else {
      const newConfirmPin = [...confirmPin];
      newConfirmPin[index] = value;
      setConfirmPin(newConfirmPin);
      if (value && index < 3) confirmInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index, type) => {
    if (e.key === "Backspace") {
      if (type === "pin" && !pin[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (type === "confirmPin" && !confirmPin[index] && index > 0) {
        confirmInputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSave = async () => {
    const pinStr = pin.join("");
    const confirmPinStr = confirmPin.join("");

    if (pinStr.length !== 4 || confirmPinStr.length !== 4) {
      setErrorPin("Pin must be 4 digits");
      return;
    }
    if (pinStr !== confirmPinStr) {
      setErrorPin("Pins do not match!");
      toast.error("Pins do not match!");
      setPin(["", "", "", ""]);
      setConfirmPin(["", "", "", ""]);
      return;
    }

    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.PROFILE.USER_UPDATEPIN,
        { user_id: id, new_pin: confirmPinStr }
      );
      if (data?.status === true) {
        toast.success("Pin has been updated");
        setPin(["", "", "", ""]);
        setConfirmPin(["", "", "", ""]);
        //navigate("/Completed");
        getCalled();
        setVisible(false);
        setIsPinUpdated(true); // Update state to hide the button
      } else {
        toast.error(data?.message || "Failed to update PIN");
      }
    } catch (error) {
      console.error("Error updating PIN:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  // Fetch user status initially to determine if the pin is already updated
  useEffect(() => {
    if (userpin !== "0") {
      setIsPinUpdated(true); // If pin exists, hide the button
    }
  }, [userpin]);

  useEffect(() => {
    getCalled();
  }, []);

  return (
    <div className="container">
      <div
        className="ProfileUpdate newProfileUpdate"
        style={{ marginTop: "100px" }}
      >
        {status.email_verify_status == null ||
        status.phone_verify_status == null ? (
          <div className="verifyDiv">
            {/* <h3>Please Verify your Email & Number</h3> */}
            {userpin === "0" ? (
              <h3>Please Update your Profile and set your login PIN</h3>
            ) : (
              <h3>Please Update your Profile</h3>
            )}
            <div className="SetofDivButton">
              <Button
                type="primary"
                className="btnProfile"
                onClick={profileupdate}
              >
                Profile Update
              </Button>
              {/* {status?.email_verify_status == null && (
                <button
                  className="btnProfile"
                  onClick={() => handlerSelectEmailOrNumber(1)}
                >
                  Email
                </button>
              )}
              {status?.phone_verify_status == null && (
                <button
                  className="btnProfile"
                  onClick={() => handlerSelectEmailOrNumber(2)}
                >
                  Number
                </button>
              )} */}
              {userpin == "0" && !isPinUpdated && (
                <Button
                  type="primary"
                  className="btnProfile"
                  onClick={handleOpen}
                >
                  Set Pin
                </Button>
              )}
            </div>

            {visibleDiv === 1 && status.email_verify_status == null && (
              <>
                <div
                  className="numberType"
                  style={{ width: emailToggle === 1 ? "60%" : "40%" }}
                >
                  <Input disabled size="large" placeholder={status.email} />
                </div>
                <div className="typebox">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={value}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleBackspace(e, index)}
                    />
                  ))}
                </div>
                <div className="verifyBtn">
                  <Button type="primary" block onClick={handlerVerified}>
                    Verify OTP
                  </Button>
                </div>
              </>
            )}

            {visibleDiv === 2 && status.phone_verify_status == null && (
              <>
                <div
                  className="numberType"
                  style={{ width: emailToggle === 1 ? "60%" : "40%" }}
                >
                  <Input disabled size="large" placeholder={status?.mobile} />
                </div>
                <div className="typebox">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={value}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleBackspace(e, index)}
                    />
                  ))}
                </div>
                <div className="verifyBtn">
                  <Button type="primary" block onClick={handlerVerified}>
                    Verify OTP
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <section className="verifyDiv">
            {userpin === "0" ? (
              <h3>Please Update your Profile and set your login PIN</h3>
            ) : (
              <h3>Please Update your Profile</h3>
            )}
            <div className="SetofDivButton">
              <Button
                type="primary"
                className="btnProfile"
                onClick={profileupdate}
              >
                Profile Update
              </Button>

              {userpin == "0" && !isPinUpdated && (
                <Button
                  type="primary"
                  className="btnProfile"
                  onClick={handleOpen}
                >
                  Set Pin
                </Button>
              )}
            </div>
            <div className="row">
              {/* <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                  <div className="avatar-upload">
                    <div className="avatar-preview">
                      <img
                        src={list?.profile_picture}
                        style={{ borderRadius: "50%" }}
                      />
                    </div>
                  </div>
                </div> */}

              <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
                {/* <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                      <div className="form-group">
                        <label className="control-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your name"
                          disabled
                          value={list?.name}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                      <div className="form-group">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <label className="control-label">Email</label>
                          <label>
                            <b
                              style={{
                                color:
                                  status?.email_verify_status == null
                                    ? "red"
                                    : "green",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                status?.email_verify_status == null &&
                                sendOtp(1)
                              }
                            >
                              {status?.email_verify_status == null
                                ? "Verify Email"
                                : "Verified"}
                            </b>
                          </label>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your email"
                          disabled
                          value={list?.email}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                      <div className="form-group">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <label className="control-label">Phone Number</label>
                          <label>
                            <b
                              style={{
                                color:
                                  status?.phone_verify_status == null
                                    ? "red"
                                    : "green",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                status?.phone_verify_status == null &&
                                sendOtp(2)
                              }
                            >
                              {status?.phone_verify_status == null
                                ? "Verify Number"
                                : "Verified"}
                            </b>
                          </label>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your Phone Number"
                          disabled
                          value={list?.mobile}
                        />
                      </div>
                    </div>

                    {type_college_name === "selector" && (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        <div className="form-group">
                          <label className="control-label">College</label>
                          <label
                            className="control-label"
                            style={{ color: "red", marginLeft: "5px" }}
                          >
                            {errorShow}
                          </label>
                          <SearchableSelect options={colName} />
                        </div>
                      </div>
                    )}

                    {type_city_name === "selector" && (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        <div className="form-group">
                          <label className="control-label">City</label>
                          <SearchableSelectCity options={cName} />
                        </div>
                      </div>
                    )}

                    {type_state === "selector" && (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        <div className="form-group">
                          <label className="control-label">State</label>
                          <SearchableSelectState options={sName} />
                        </div>
                      </div>
                    )}

                    {type_course_category === "selector" && (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        <div className="form-group">
                          <label className="control-label">Course</label>
                          <select
                            value={courseName || ""}
                            className="form-select"
                            onChange={(e) => setCourseName(e.target.value)}
                          >
                            {!courseName && <option>Select course</option>}
                            {categoryCreate?.map((itm) => (
                              <option key={itm?.id} value={itm?.name}>
                                {itm?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {type_year_of_study === "selector" && (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        <div className="form-group">
                          <label className="control-label">Year</label>
                          <select
                            value={yearName || ""}
                            className="form-select"
                            onChange={(e) => setYearName(e.target.value)}
                          >
                            {!yearName && <option>Select year</option>}
                            {yearCreate?.map((itm) => (
                              <option key={itm?.id} value={itm?.name}>
                                {itm?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {type_gender === "radio" && (
                      <div className="col-12">
                        {genderArr?.map((option, index) => (
                          <Checkbox
                            key={index}
                            checked={genderName === option}
                            onChange={() => setGenderName(option)}
                          >
                            {option}
                          </Checkbox>
                        ))}
                      </div>
                    )}
                  </div> */}

                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    {/* <div className="subbutton">
                        {status?.phone_verify_status &&
                        status?.email_verify_status ? (
                          <button
                            type="submit"
                            className="botn"
                            onClick={handlerUpdate}
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            className="botn"
                            type="submit"
                            onClick={() =>
                              toast.error(
                                "Please verify email and number first"
                              )
                            }
                          >
                            Update
                          </button>
                        )}
                        {userpin === "0" && (
                          <Button
                            type="primary"
                            className="botn"
                            onClick={handleOpen}
                          >
                            Set Pin
                          </Button>
                        )}
                      </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <Modal open={visible} onCancel={handleClose} footer={null}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <p>Choose a PIN of your Choice</p>
          {errorPin && (
            <p style={{ color: "red", marginTop: "10px" }}>{errorPin}</p>
          )}
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            {pin.map((val, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength={1}
                value={val}
                onChange={(e) => handleChanges(e.target.value, index, "pin")}
                onKeyDown={(e) => handleKeyDown(e, index, "pin")}
                type="tel" // ensures numeric keypad
                inputMode="numeric" // enhances compatibility
                pattern="[0-9]*" // optional: restricts to numbers on supported browsers
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 16,
                  textAlign: "center",
                  fontSize: 20,
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 20, marginTop: 40 }}>
          <p>Confirm Login PIN</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            {confirmPin.map((val, index) => (
              <Input
                key={index}
                ref={(el) => (confirmInputRefs.current[index] = el)}
                maxLength={1}
                value={val}
                onChange={(e) =>
                  handleChanges(e.target.value, index, "confirmPin")
                }
                onKeyDown={(e) => handleKeyDown(e, index, "confirmPin")}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 16,
                  textAlign: "center",
                  fontSize: 20,
                }}
              />
            ))}
          </div>
        </div>

        <Button
          className="saveBtnonModal"
          type="primary"
          block
          onClick={handleSave}
          disabled={pin.includes("") || confirmPin.includes("")}
        >
          Save Pin
        </Button>
      </Modal>
    </div>
  );
};

export default ProfileNew;
