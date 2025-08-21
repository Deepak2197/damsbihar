import React, { useEffect, useState } from "react";
import axiosInstance from "../../API/axiosConfig";
import "./joinStyle.css";
import { Button, Col, Divider, Drawer, Input, Row, Steps, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  validatePAN,
  validateAadhar,
  validateIFSC,
} from "../../ulits/validatePan";
import { toast } from "react-toastify";
import Dashboard from "./Dashboard";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const { Step } = Steps;

const Join = () => {
  const joinIds = JSON.parse(sessionStorage.getItem("userData"));

  const [fetchLoading, setFetchLoading] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const ID = sessionStorage.getItem("id");
  const userData = JSON.parse(localStorage.getItem("allData"));

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectBtn, setSelectBtn] = useState("");
  const [allInstuctor, setAllInstuctor] = useState([]);
  const [current, setCurrent] = useState(0);
  const [userInfo, setUserInfo] = useState({
    pan: "",
    aadhar: "",
    accHolder: "",
    bankName: "",
    branchName: "",
    accNumber: "",
    ifsc: "",
  });
  const [panList, setPanList] = useState([]);
  const [aadharList, setAadharList] = useState([]);

  // _________________________Dash Data
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [btnValue, setBtnValue] = useState("1");
  const [dashData, setDashData] = useState({
    menu: [],
    performance: [],
    banner: [],
    not_sale: "",
    rupees: "",
    student: "",
    earn: "0",
    course: "0",
  });
  // _________________________

  const handleChangeImage = ({ fileList }) => setPanList(fileList);
  const handleAadharImage = ({ fileList }) => setAadharList(fileList);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const getAllInstuctor = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.JOIN_AFFILIATE.AFFILIATE_ROLE,
        {
          user_id: ID,
        }
      );
      if (data.status == true) {
        setAllInstuctor(data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Personal Details",
      content: "Personal Details",
    },
    {
      title: "Kyc",
      content: "Kyc",
    },
    {
      title: "Address",
      content: "Address",
    },
    {
      title: "Bank Details",
      content: "Bank Details",
    },
  ];

  const next = () => {
    if (validatePAN(userInfo.pan) && validateAadhar(userInfo.aadhar)) {
      setCurrent(current + 1);
    } else if (validateIFSC(userInfo.ifsc)) {
      setCurrent(current + 1);
    } else {
      if (!validatePAN(userInfo.pan)) {
        toast.error("Please enter a valid valid PAN number ");
      } else if (!validateAadhar(userInfo.aadhar)) {
        toast.error("Please enter a valid aadhar number");
      } else {
        toast.error("Please enter a valid ifsc coder");
      }
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const autoFetch = () => {
    navigator.geolocation.getCurrentPosition(showPosition);
    const userConsent = window.confirm(
      "We use your location to show the nearest landmark. Do you want to share it?"
    );
  };

  const showPosition = async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    if (lat !== "" && lon !== "") {
      try {
        setFetchLoading(true);
        const latlon = `latlng=${lat},${lon}&sensor=true&key=AIzaSyCLbStEu7-F25Xw2B46ciyaagAPk-IpYkY`;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?${latlon}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setLocationData(data?.results);
        setFetchLoading(false);
        // localStorage.setItem(
        //   "accurate",
        //   data.results[2]?.address_components[1]?.long_name
        // );
        // localStorage.setItem("location", data.results[0]?.formatted_address);
        // setIsAllLocationModalOpen(false);
        // setFetchLocationToggle(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setFetchLoading(false);
        // setFetchLocationToggle(false);
      }
    }
  };

  const finalSuccessApiCalled = async () => {
    if (
      !userInfo.accHolder ||
      !userInfo?.accNumber ||
      !userInfo.bankName ||
      !userInfo.branchName ||
      !userInfo.ifsc
    ) {
      toast.error("Please fill the all field..");
    } else {
      try {
        const { data } = await axiosInstance.post(
          API_ENDPOINTS.JOIN_AFFILIATE.SIGNUP_AFFILIATE,
          {
            user_id: 382753,
            first_name: userData?.name,
            last_name: "",
            email: userData?.email,
            phone: userData?.mobile,
            pancard: userInfo?.pan,
            aadhar: userInfo?.aadhar,
            address: locationData[0]?.formatted_address,
            postal_code: locationData[0]?.address_components[8]?.long_name,
            country: locationData[0]?.address_components[7]?.long_name,
            state: locationData[0]?.address_components[6]?.long_name,
            city: locationData[0]?.address_components[3]?.long_name,
            account_holder_name: userInfo?.accHolder,
            bank_name: userInfo?.bankName,
            bank_branch_name: userInfo?.branchName,
            account_number: userInfo?.accNumber,
            ifsc_code: userInfo?.ifsc,
            pan_image: panList[0]?.name,
            aadhar_image: aadharList[0]?.name,
            bank_image: aadharList[0]?.name,
            profile_type: selectBtn,
          }
        );

        if (data.status === true) {
          sessionStorage.setItem("joinId", Number(data.data.id));
          // getDashboard()
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    getAllInstuctor();
  }, [
    userInfo.aadhar,
    userInfo.accHolder,
    userInfo.accNumber,
    userInfo.bankName,
    userInfo.ifsc,
  ]);

  // _______________________method
  const getDashboard = async () => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.JOIN_AFFILIATE.DASHBOARD_AFFILIATE,
        {
          affiliate_id: joinIds.affiliate_user_id,
          start_date: dateRange?.start,
          end_date: dateRange?.end,
        }
      );
      if (data.status === true) {
        setDashData({
          banner: data.data.banner,
          menu: data.data.menu,
          course: data.data.total_purchasing,
          not_sale: data.data.net_sale,
          rupees: data.data.total_eraning_float,
          student: data.data.students,
          earn: data.data.total_eraning,
        });
      } else {
        setDashData({});
      }
    } catch (error) {}
  };

  const handleTodayClick = () => {
    setBtnValue("1");
    const today = dayjs().format("DD-MM-YYYY");
    setDateRange({ start: today, end: today });

    // setTimeout(()=>{

    //   getDashboard();
    // },1000)
  };

  const handleWeeklyClick = () => {
    const startOfWeek = dayjs().startOf("week").format("DD-MM-YYYY");
    const endOfWeek = dayjs().endOf("week").format("DD-MM-YYYY");
    setDateRange({ start: startOfWeek, end: endOfWeek });
    setBtnValue("2");

    getDashboard();
  };

  const handleMonthlyClick = () => {
    const startOfMonth = dayjs().startOf("month").format("DD-MM-YYYY");
    const endOfMonth = dayjs().endOf("month").format("DD-MM-YYYY");
    setDateRange({ start: startOfMonth, end: endOfMonth });
    setBtnValue("3");

    getDashboard();
  };

  const handleYearlyClick = () => {
    const startOfYear = dayjs().startOf("year").format("DD-MM-YYYY");
    const endOfYear = dayjs().endOf("year").format("DD-MM-YYYY");
    setDateRange({ start: startOfYear, end: endOfYear });
    setBtnValue("4");

    getDashboard();
  };

  useEffect(() => {
    setBtnValue("1");
    const today = dayjs().format("DD-MM-YYYY");
    setDateRange({ start: today, end: today });
  }, []);

  useEffect(() => {
    if (Object.keys(dateRange).length > 0) {
      getDashboard();
    }
  }, [dateRange]);

  return (
    <>
      {/* {userData.affiliate_user_id > 0 ? ( */}
      {joinIds?.affiliate_user_id > 0 ? (
        <Dashboard
          all={userData}
          dashData={dashData}
          dateRange={dateRange}
          btnValue={btnValue}
          handleTodayClick={handleTodayClick}
          handleWeeklyClick={handleWeeklyClick}
          handleMonthlyClick={handleMonthlyClick}
          handleYearlyClick={handleYearlyClick}
        />
      ) : (
        <div className="container">
          <div className="joinGroup">
            <div className="joinBanner">
              {/* <img
                src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/join-cor.png"
                src="/web/join-affiliate/banner.png"
                loading="lazy"
                alt="icon image"
              /> */}
              <h2>
                Join Affiliate <span>Program</span>{" "}
              </h2>
            </div>
            <h2>Please let us know your few details</h2>
            <div className="grid-container">
              {allInstuctor.map((item) => (
                <div
                  key={item.id}
                  className={`grid-item ${
                    selectBtn === item.id ? "selected-card" : ""
                  }`}
                  onClick={() => setSelectBtn(item.id)}
                >
                  <img
                    src={
                      item.role === "Marketing"
                        ? "web/join-affiliate/marketing.svg"
                        : item.role === "Marketing"
                        ? "web/join-affiliate/marketing.svg"
                        : item.role === "Instructor"
                        ? "web/join-affiliate/instructor.svg"
                        : item.role === "Marketing Staff"
                        ? "web/join-affiliate/marketing-staff.svg"
                        : item.role === "Ambassador Bronze"
                        ? "web/join-affiliate/partner-bronze.svg"
                        : item.role === "Partner Silver"
                        ? "web/join-affiliate/partner-silver.svg"
                        : item.role === "Partner Bronze"
                        ? "web/join-affiliate/partner-bronze.svg"
                        : item.role === "Ambassador Silver"
                        ? "web/join-affiliate/partner-silver.svg"
                        : "web/join-affiliate/marketing.svg"
                    }
                    alt={item.role}
                    className="grid-image"
                  />
                  <h3 className="grid-title">{item.role}</h3>
                </div>
              ))}
            </div>
            <div className="btnMix">
              <Row gutter={16}>
                <Col span={12}>
                  <Button type="primary" block onClick={() => navigate("/")}>
                    Back
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    style={{
                      background: selectBtn ? "#007AFF" : "#9E9E9E",
                      color: "white",
                      borderColor: selectBtn ? "#007AFF" : "#9E9E9E",
                    }}
                    type={selectBtn ? "primary" : "default"}
                    block
                    disabled={!selectBtn}
                    onClick={() => setVisible(true)}
                  >
                    Continue
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )}

      <Drawer
        title="Full Height Drawer"
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        height="100%"
        width="100%"
        padding="0px"
      >
        <div className="container">
          <div className="joinAffiliatePro">
            <div className="joinBanner">
              <h2>Join Affiliate Program</h2>
              {/* <img
                src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/join-cor.png"
                loading="lazy"
                alt="icon image"
              /> */}
            </div>
            <div className="clickNext">
              <Steps current={current}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content">
                {steps[current].content === "Personal Details" ? (
                  <>
                    <h4>Join Affiliate Program</h4>
                    <h6>Please let us know your few personal details</h6>
                    <div className="formField">
                      <div className="row">
                        <div className="col-12 col-md-6 col-lg-4">
                          <Input
                            size="large"
                            placeholder="Name"
                            style={{ margin: "2px" }}
                            value={userData?.name}
                            disabled
                          />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                          <Input
                            size="large"
                            placeholder="Email"
                            style={{ margin: "2px" }}
                            value={userData?.email}
                            disabled
                          />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                          <Input
                            size="large"
                            placeholder="Mobile"
                            disabled
                            style={{ margin: "2px" }}
                            value={userData?.mobile}
                          />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                          <Input
                            size="large"
                            name="pan"
                            placeholder="Pancard number"
                            style={{ margin: "2px" }}
                            onChange={handleChange}
                            value={userInfo.pan.toUpperCase()}
                          />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                          <Input
                            size="large"
                            placeholder="Aadhar number"
                            name="aadhar"
                            style={{ margin: "2px" }}
                            value={userInfo.aadhar}
                            onChange={handleChange}
                            type="number"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : steps[current].content === "Kyc" ? (
                  <div className="uploadFilesdata">
                    <div className="uploadData">
                      <Upload
                        listType="picture"
                        fileList={panList}
                        onChange={handleChangeImage}
                        beforeUpload={() => false}
                      >
                        <Button type="primary" icon={<UploadOutlined />}>
                          Pan Upload
                        </Button>
                      </Upload>
                    </div>
                    <div className="uploadData">
                      <Upload
                        listType="picture"
                        fileList={aadharList}
                        onChange={handleAadharImage}
                        beforeUpload={() => false}
                      >
                        <Button type="primary" icon={<UploadOutlined />}>
                          Aadhar Upload
                        </Button>
                      </Upload>
                    </div>
                  </div>
                ) : steps[current].content === "Address" ? (
                  <div className="formField">
                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-4">
                        <Button
                          style={{ marginBottom: "10px" }}
                          loading={fetchLoading && true}
                          type="primary"
                          onClick={autoFetch}
                        >
                          Auto fetch from google
                        </Button>
                      </div>
                      <Divider />
                      <div className="col-12 col-md-6 col-lg-4">
                        <Input
                          size="large"
                          placeholder="Pincode"
                          style={{ margin: "2px" }}
                          disabled
                          value={
                            locationData[0]?.address_components[8]?.long_name
                          }
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-4">
                        <Input
                          size="large"
                          placeholder="Address 1"
                          style={{ margin: "2px" }}
                          disabled
                          value={locationData[0]?.formatted_address}
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-4">
                        <Input
                          size="large"
                          placeholder="Address 1"
                          style={{ margin: "2px" }}
                          disabled
                          value={locationData[0]?.formatted_address}
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-4">
                        <Input
                          size="large"
                          name="pan"
                          placeholder="Country"
                          style={{ margin: "2px" }}
                          disabled
                          value={
                            locationData[0]?.address_components[7]?.long_name
                          }
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-4">
                        <Input
                          size="large"
                          placeholder="State"
                          name="aadhar"
                          style={{ margin: "2px" }}
                          disabled
                          value={
                            locationData[0]?.address_components[6]?.long_name
                          }
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-4">
                        <Input
                          size="large"
                          placeholder="City"
                          name="aadhar"
                          style={{ margin: "2px" }}
                          disabled
                          value={
                            locationData[0]?.address_components[3]?.long_name
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  steps[current].content === "Bank Details" && (
                    <div className="formField">
                      <div className="row">
                        <h5>Bank Details</h5>
                        <Divider />
                        <div className="col-12 col-md-6 col-lg-4">
                          <Input
                            size="large"
                            name="accHolder"
                            value={userInfo.accHolder}
                            onChange={handleChange}
                            placeholder="Account Holder Name"
                            style={{ margin: "2px" }}
                          />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                          <Input
                            size="large"
                            placeholder="Bank Name"
                            style={{ margin: "2px" }}
                            name="bankName"
                            value={userInfo.bankName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                          <Input
                            size="large"
                            placeholder="Bank Branch Name"
                            style={{ margin: "2px" }}
                            name="branchName"
                            value={userInfo.branchName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                          <Input
                            type="number"
                            size="large"
                            name="accNumber"
                            placeholder="Account number"
                            style={{ margin: "2px" }}
                            value={userInfo.accNumber}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                          <Input
                            size="large"
                            placeholder="ifsc"
                            name="ifsc"
                            style={{ margin: "2px" }}
                            value={userInfo.ifsc.toUpperCase()}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="steps-action">
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" onClick={finalSuccessApiCalled}>
                    Done
                  </Button>
                )}
                {current > 0 && (
                  <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                    Previous
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Join;
