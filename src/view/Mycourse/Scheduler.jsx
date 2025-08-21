import "../../assets/css/performance/style.css";
import "../../assets/css/performance/responsive.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { Spinner } from "react-bootstrap";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "20% !important",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    marginTop: "13%",
    borderBottom: "30px solid #071952",
    boxShadow: "0px 10px 10px #0000003d",
    borderStyle: "hidden",
  },
};
const Scheduler = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [markAttendence, setMarkAttendence] = useState([]);
  const user_id = sessionStorage.getItem("id");
  const [loader, setLoader] = useState(false);
  const [barLoader, setbarLoader] = useState(false);
  const [selectedValue, setSelectedValue] = useState("1");
  const [schedularData, setSchedularData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterlist, setFilterlist] = useState([]);

  const [btnValue, setBtnValue] = useState("TODAY");

  const btnData = [
    { id: 1, title: "TODAY" },
    { id: 2, title: "WEEKLY" },
    { id: 3, title: "MONTHLY" },
    { id: 4, title: "YEARLY" },
  ];

  useEffect(() => {
    const filteredData = schedularData.filter(
      (item) =>
        formatDateChange(item?.start_date)
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.instructer_name?.toLowerCase().includes(search.toLowerCase()) ||
        item.center_name?.toLowerCase().includes(search.toLowerCase()) ||
        item.topic_title?.toLowerCase().includes(search.toLowerCase())
    );
    setFilterlist(filteredData);
  }, [schedularData, search]);

  const formatDateChange = (inputDate) => {
    if (!inputDate) return "";
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const parts = inputDate.split("-");
    const year = parseInt(parts[0]);
    const monthIndex = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);

    // Format the date
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
    return formattedDate;
  };

  const convertToAmPm = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let formattedTime = "";
    let hoursNum = parseInt(hours, 10);

    if (hoursNum === 0) {
      formattedTime = "12";
    } else if (hoursNum > 12) {
      formattedTime = (hoursNum - 12).toString();
    } else {
      formattedTime = hoursNum.toString();
    }

    formattedTime += `:${minutes}`;
    formattedTime += hoursNum >= 12 ? " PM" : " AM";

    return formattedTime;
  };
  const handleAttendence = async (
    schedule_id,
    course_type,
    course_id,
    segment_id,
    start_date,
    end_date,
    start_time,
    end_time
  ) => {
    try {
      let sessionData =
        JSON.parse(sessionStorage.getItem("attendenceData")) || [];
      sessionData.push({
        start_date,
        end_date,
        start_time,
        end_time,
      });
      sessionStorage.setItem("attendenceData", JSON.stringify(sessionData));
      setbarLoader(true);
      const res = await 
      Instance.post(
        "/v2_data_model/markOfflineAttendance",
        {
          user_id: user_id,
          schedule_id: schedule_id,
          course_id: course_id,
          course_type: course_type,
          segment_id: segment_id,
        }
      );
      setMarkAttendence(res?.data?.data);
      setIsOpen(true);
      setbarLoader(false);
    } catch (error) {
      setbarLoader(false);
      console.log(error);
    }
  };
  const sessionDataString = sessionStorage.getItem("attendenceData");
  const sessionData = JSON.parse(sessionDataString);

  function closeModal() {
    setIsOpen(false);
  }
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }
  const handlefinal = async () => {
    setIsOpen(false);
  };

  // -------------------------
  const handlerBtnFun = (value) => {
    // console.log(value);
    setBtnValue(value.title);
  };

  const getCalledFirstAPI = async () => {
    try {
      setLoader(true);
      const res = await axiosInstance.post(
        API_ENDPOINTS.MY_STUDY.GET_COURSE_SCHEDULAR_DATA,
        {
          course_type: selectedValue,
          user_id: user_id,
          duration: btnValue,
        }
      );
      setSchedularData(res.data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getCalledFirstAPI();
  }, [btnValue, selectedValue]);
  const handleEnterClass = async () => {
    toast.success(
      "If you want to join the class, please use the DAMS app. Thank you!"
    );
  };
  return (
    <div className="Scheduler">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li style={{ color: "#434343" }}>Scheduler</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="schdeulerPage">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="searcdata">
                <Link to={"#"}>
                  <em className="fa fa-search mr-3"></em>
                  <input
                    type="text"
                    placeholder="Search by class, Date, Instructor, Center"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Link>
              </div>

              <div className="selectData">
                <select
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                >
                  <option value="1">Class</option>
                  <option value="2">Event</option>
                </select>
              </div>
              <div className="scheduleTabbibg">
                {/* Tab buttons */}
                <div className="tabbingdata" style={{ marginBottom: "20px" }}>
                  {btnData.map((val, i) => (
                    <button
                      onClick={() => handlerBtnFun(val)}
                      className={btnValue === val.title ? "active" : ""}
                    >
                      {val.title}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="tabdataShow">
                  <div className="row">
                    {loader ? (
                      <div
                        style={{
                          height: "56vh",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Spinner
                          animation="border"
                          role="status"
                          style={{ height: "100px", width: "100px" }}
                        />
                      </div>
                    ) : (
                      <>
                        {filterlist != "" ? (
                          filterlist?.map((item, index) => (
                            <div
                              className="col-12 col-sm-12 col-md-6 col-lg-6"
                              key={index}
                            >
                              <div
                                className="tabdata"
                                style={{ marginBottom: "20px" }}
                              >
                                <div className="row">
                                  <div className="col-3 col-sm-2 col-md-3 col-lg-3 col-xl-3">
                                    <div className="dataLogo">
                                      <img
                                        src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/login_logo.png"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6 col-sm-7 col-md-6 col-lg-5 col-xl-5">
                                    <div className="detailData">
                                      <h3>{item?.topic_title}</h3>
                                      {item?.class_type === "2" ? (
                                        <h6>(Face To Face)</h6>
                                      ) : (
                                        <h6>(Online)</h6>
                                      )}

                                      <p>{item?.instructer_name}</p>
                                    </div>
                                  </div>
                                  <div className="col-3 col-sm-3 col-md-3 col-lg-4 col-xl-4">
                                    <div className="prebtn text-right">
                                      {item?.status == 3 ? (
                                        <button
                                          type="button"
                                          className="bg-danger"
                                        >
                                          Cancelled
                                        </button>
                                      ) : item?.class_status == 4 &&
                                        item?.class_type == 2 ? (
                                        <button
                                          type="button"
                                          className="bg-success MarkAttendance"
                                          onClick={() =>
                                            handleAttendence(
                                              item?.id,
                                              item?.course_type,
                                              item?.course_id,
                                              item?.element_fk,
                                              item?.start_date,
                                              item?.end_date,
                                              item?.start_time,
                                              item?.end_time
                                            )
                                          }
                                        >
                                          Mark Attendance
                                        </button>
                                      ) : item?.class_status == 4 &&
                                        item?.class_type != 2 ? (
                                        <button
                                          type="button"
                                          className="bg-success"
                                          onClick={handleEnterClass}
                                        >
                                          Enter classs
                                        </button>
                                      ) : item?.class_status == 1 ? (
                                        <button
                                          type="button"
                                          className="bg-secondary"
                                        >
                                          Upcoming
                                        </button>
                                      ) : item?.class_status == 2 ? (
                                        <button
                                          type="button"
                                          className="bg-danger"
                                        >
                                          Absent
                                        </button>
                                      ) : item?.class_status == 3 ? (
                                        <button
                                          type="button"
                                          className="bg-success"
                                        >
                                          Present
                                        </button>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="belowData">
                                      <h3>
                                        {formatDateChange(item?.start_date)}
                                        <span className="float-right">
                                          {convertToAmPm(item?.start_time)} -
                                          {convertToAmPm(item?.end_time)}
                                        </span>
                                      </h3>
                                      <h4>
                                        {item.class_type === "2"
                                          ? `Center Name - ${item?.center_name}`
                                          : ""}
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div>No Data Found</div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {barLoader ? (
          <div
            style={{
              height: "56vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner
              animation="border"
              role="status"
              style={{ height: "100px", width: "100px" }}
            />
          </div>
        ) : (
          <>
            <div className="notePop text-center">
              <h3>
                {" Mark Attendance "}
                <span
                  className="float-right"
                  style={{ cursor: "pointer" }}
                  onClick={handlefinal}
                >
                  <em className="fa fa-close"></em>
                </span>
              </h3>
              <div className="mainGroup">
                <div className="imgSec">
                  <img
                    src={
                      markAttendence?.profile_picture
                        ? markAttendence?.profile_picture
                        : ""
                    }
                    alt=""
                  />
                </div>
                <div className="contentSec">
                  <h3>{markAttendence?.name}</h3>
                  <p>{markAttendence?.mobile}</p>
                  <p>{markAttendence?.email}</p>
                </div>

                <div className="barcode">
                  <img src={markAttendence?.qrcode} alt="" />
                </div>

                <table className="table">
                  <tr>
                    <td>
                      <strong>Address:</strong>
                    </td>
                    <td>{markAttendence?.address}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Center Name:</strong>
                    </td>
                    <td>{markAttendence?.center_name}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Registration Date:</strong>
                    </td>
                    <td>
                      {sessionData && sessionData.length > 0 && (
                        <>
                          {sessionData[0]?.start_date}{" "}
                          {convertToAmPm(sessionData[0]?.start_time)}
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Expiry Date:</strong>
                    </td>
                    <td>
                      {sessionData && sessionData.length > 0 && (
                        <>
                          {sessionData[0]?.end_date}{" "}
                          {convertToAmPm(sessionData[0]?.end_time)}
                        </>
                      )}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Scheduler;
