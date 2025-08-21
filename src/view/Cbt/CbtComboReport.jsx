import React, { useState, useEffect } from "react";
import "../../assets/css/cbt_select_exam/style.css";
import "../../assets/css/cbt_select_exam/responsive.css";
//import "../../assets/css/cbt_select_exam/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import ReactApexChart from "react-apexcharts";
import Modal from "react-modal";
import { Spinner } from "react-bootstrap";
import { FaAngleDown, FaAngleUp, FaArrowDown, FaArrowUp } from "react-icons/fa";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "20% !important",
    transform: "translate(-50%, -50%)",
  },
};
const CbtComboReport = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [filterSubjectReport, setFilterSubjectReport] = useState([]);
  const [cbtResult, setCbtResult] = useState(null);
  const [cbtSubjectReport, setCbtSubjectReport] = useState([]);
  const [cbtLeaderBoard, setCbtLeaderBoard] = useState([]);
  const [cbtQuestReport, setCbtQuestReport] = useState([]);
  const test_id = JSON.parse(localStorage.getItem("test_id"));
  const user_id = sessionStorage.getItem("id");
  const [modalIsOpen, setIsOpen] = useState(false);
  const getresultreport = async () => {
    try {
      setLoader(true);
      const res = await axiosInstance.post(
        "/v2_data_model/get_cbt_test_wise_report",
        { test_id: test_id, user_id: user_id }
      );

      if (res?.data?.status === true) {
        setCbtResult(res?.data?.data);

        get_cbt_leader_board(
          res?.data?.data.test_id,
          res?.data?.data?.testType
        );
        setLoader(false);
        get_topic_report();
        get_cbt_subject_wise_report();
      } else {
        setCbtResult(null);
      }
    } catch (error) {
      setCbtResult(null);
      setLoader(false);
    }
  };

  const get_cbt_leader_board = async (test_id, testType) => {
    try {
      const res = await axiosInstance.post(
        "/v2_data_model/get_cbt_leader_board",
        {
          test_id: test_id,
          testType: testType == "mergeTest" ? testType : "",
        }
      );

      if (res?.data?.status === true) {
        setCbtLeaderBoard(res?.data?.data);
      } else {
        setCbtLeaderBoard(null);
      }
    } catch (error) {
      setCbtLeaderBoard(null);
    }
  };
  const get_topic_report = async () => {
    try {
      const res = await axiosInstance.post("/v2_data_model/get_topic_report", {
        user_id: user_id,
        test_id: test_id,
      });
    } catch (error) {}
  };

  const get_cbt_subject_wise_report = async () => {
    try {
      const res = await axiosInstance.post(
        "/v2_data_model/get_cbt_subject_wise_report",
        { test_id: test_id, user_id: user_id }
      );

      if (res?.data?.status === true) {
        setCbtSubjectReport(res?.data?.data);
        get_cbt_question_wise_report();
      } else {
        setCbtSubjectReport(null);
      }
    } catch (error) {
      setCbtSubjectReport(null);
    }
  };

  const get_cbt_question_wise_report = async () => {
    try {
      const res = await axiosInstance.post(
        "/v2_data_model/get_cbt_question_wise_report",
        { test_id: test_id, user_id: user_id }
      );

      if (res?.data?.status === true) {
        setCbtQuestReport(res?.data?.data);
      } else {
        setCbtQuestReport(null);
      }
    } catch (error) {
      setCbtQuestReport(null);
    }
  };

  useEffect(() => {
    getresultreport();
  }, [user_id]);

  const subjects = cbtSubjectReport.map((subject) => subject.subjectName);
  const totalMarks = cbtSubjectReport.map((subject) =>
    parseFloat(subject.totalMark).toFixed(2)
  );

  // Chart options
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: subjects,
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "",
      },
    },
    fill: {
      colors: ["#018af2"], // You can customize the color here
    },
    dataLabels: {
      enabled: false,
    },
    toolbar: {
      show: false, // Disable the toolbar
    },
  };

  // Chart series
  const series = [
    {
      name: "Total Marks",
      data: totalMarks,
    },
  ];

  const handleCourseType = () => {
    navigate("/class-schedules-details");
  };
  const handleSubmit = async () => {
    setIsOpen(true);
  };
  function closeModal() {
    setIsOpen(false);
  }
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }
  const handlefinal = async () => {
    navigate("/class-schedules-details");
    setIsOpen(false);
  };

  const [visibleRows, setVisibleRows] = useState([]);
  const [visibleRows1, setVisibleRows1] = useState([]);
  const [showList, setshowList] = useState(false);
  const toggleVisibility = (index) => {
    setVisibleRows((prevVisibleRows) => {
      const updatedVisibleRows = [...prevVisibleRows];
      updatedVisibleRows[index] = !updatedVisibleRows[index];
      // Close all other rows
      for (let i = 0; i < updatedVisibleRows.length; i++) {
        if (i !== index) {
          updatedVisibleRows[i] = false;
        }
      }
      return updatedVisibleRows;
    });
  };

  const get_subject_report = async (subject_id, student_id) => {
    try {
      const res_subject_report = await axiosInstance.post(
        "/v2_data_model/get_subject_report",
        { subject_id: subject_id, student_id: student_id }
      );

      setFilterSubjectReport(res_subject_report?.data?.data);
    } catch (error) {}
  };

  const ShowData = (index, subject_id, student_id) => {
    toggleVisibility(index);
    get_subject_report(subject_id, student_id);
  };

  return (
    <div className="cbtList">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>{JSON.parse(localStorage.getItem("Cbt_title"))} </li>
            </ul>
          </div>
        </div>
      </div>
      <section className="CbtComboReport">
        {loader ? (
          <div
            style={{
              height: "66vh",
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
        ) : cbtResult !== null &&
          cbtLeaderBoard &&
          cbtQuestReport &&
          cbtSubjectReport ? (
          <div className="container">
            {cbtResult?.testType == null ||
            cbtResult?.testType == "singleTest" ? (
              <div className="RankGroup">
                <div className="yourRank">
                  <h2>Your Rank</h2>
                  <h3>{cbtResult?.rank}</h3>
                  <p>of {cbtResult?.totalStudent}</p>
                </div>
                <div className="questinAnswer">
                  <div className="row">
                    <div className="col-6 col-md-6 col-lg-6">
                      <div
                        className="rightWrong"
                        style={{ borderRight: "3px solid #ccc" }}
                      >
                        <h3>Correct Question</h3>
                        <h2>{cbtResult?.rightQue}</h2>
                      </div>
                    </div>
                    <div className="col-6 col-md-6 col-lg-6">
                      <div className="rightWrong">
                        <h3>Wrong Question</h3>
                        <h2 className="text-danger">{cbtResult?.wrongQue}</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="YourMarks">
                  <div className="row">
                    <div className="col-6 col-md-6 col-lg-4">
                      <div
                        className="rightWrong"
                        style={{ borderRight: "3px solid #ccc" }}
                      >
                        <h3>Your Marks</h3>
                        <h2>
                          {cbtResult?.score}/{cbtResult?.maxMarks}
                        </h2>
                      </div>
                    </div>
                    <div className="col-6 col-md-6 col-lg-4">
                      <div
                        className="rightWrong"
                        style={{ borderRight: "3px solid #ccc" }}
                      >
                        <h3>Topper Marks</h3>
                        <h2>
                          {cbtResult?.topperScore}/{cbtResult?.maxMarks}
                        </h2>
                      </div>
                    </div>
                    <div className="col-6 col-md-6 col-lg-4">
                      <div className="rightWrong">
                        <h3>50th Percentile</h3>
                        {cbtResult && (
                          <h2>
                            {cbtResult?.percentile_fifty === null ||
                            cbtResult?.percentile_fifty === ""
                              ? "65.25"
                              : cbtResult?.percentile_fifty}
                          </h2>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="RankGroup">
                <div className="yourRank">
                  <h2>Your Marks</h2>
                  <h3 style={{ color: "#000" }}>
                    <span style={{ color: "#018af2" }}>
                      {cbtResult?.mergeTestScoredMarks}/
                    </span>
                    {cbtResult?.margeTotalMarks}
                  </h3>
                </div>
              </div>
            )}

            <div className="LeaderBoard subjectWiseDetail">
              <h3>Leaderboard</h3>
              <div className="table-responsive">
                <table className="table">
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Mark</th>
                  </tr>
                  {cbtLeaderBoard?.map((item, Index) => (
                    <tr>
                      <td>{item?.ranks}</td>
                      <td>
                        <img
                          src={
                            item.profile_picture
                              ? item.profile_picture
                              : "https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/emedicoz-logo.png"
                          }
                          loading="lazy"
                          alt="icon image"
                        />
                        {item?.name}
                      </td>
                      <td>
                        {item?.score}/{item?.maxMarks}
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
            {cbtResult?.testType !== "mergeTest" && (
              <div className="CharArea">
                <h3>Result With Subject Wise Analysis</h3>
                <div>
                  <div id="chart">
                    <ReactApexChart
                      options={options}
                      series={series}
                      type="bar"
                      height={350}
                    />
                  </div>
                </div>
              </div>
            )}
            {cbtResult?.testType !== "mergeTest" && (
              <div className="subjectWiseDetail">
                <h3>Subject Wise Detail Report</h3>
                <div className="table-responsive">
                  <table className="table">
                    <tr>
                      <th style={{ borderRadius: "10px 0px 0px 10px" }}>
                        Subject Name
                      </th>
                      <th>Total Marks</th>
                      <th>Right Questions</th>
                      <th>Wrong Questions</th>
                      <th style={{ borderRadius: "0px 10px 10px 0px" }}>
                        Left Questions
                      </th>
                    </tr>
                    {cbtSubjectReport?.map((item, index) => (
                      <tbody>
                        <tr
                          style={{ backgroundColor: "blue", color: "white" }}
                          className="columColor"
                          key={index}
                          onClick={() =>
                            ShowData(index, item?.subjectId, item?.student_id)
                          }
                        >
                          <td style={{ color: "white" }}>
                            {item?.subjectName}
                          </td>
                          <td style={{ color: "white" }}>{item?.totalMark}</td>
                          <td style={{ color: "white" }}>{item?.rightQn}</td>
                          <td style={{ color: "white" }}>{item?.wrongQn}</td>
                          <td style={{ color: "white" }}>
                            {item?.leftQn}
                            <span style={{ marginLeft: "20px" }}>
                              {visibleRows[index] ? (
                                <FaAngleUp size={28} />
                              ) : (
                                <FaAngleDown size={28} />
                              )}
                            </span>
                          </td>
                        </tr>
                        {visibleRows[index] && (
                          <>
                            {filterSubjectReport?.map((topic, topicIndex) => (
                              <tr>
                                <td>{topic?.topic_name}</td>
                                <td>
                                  {parseFloat(topic?.total_marks).toFixed(2)}
                                </td>
                                <td>{topic?.correct_question}</td>
                                <td>{topic?.wrong_question}</td>

                                <td>{topic?.left_question}</td>
                              </tr>
                            ))}
                          </>
                        )}
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            )}
            {cbtResult?.testType !== "mergeTest" && (
              <div className="ResponseReport subjectWiseDetail">
                <h3>Response Report</h3>
                <div className="table-responsive">
                  <table className="table">
                    <tr>
                      <th style={{ borderRadius: "10px 0px 0px 10px" }}>
                        S.No
                      </th>

                      <th>Correct Questions</th>
                      <th>Your Answer</th>
                      <th>Status</th>
                      <th style={{ borderRadius: "0px 10px 10px 0px" }}>
                        Time (in min)
                      </th>
                    </tr>
                    {cbtQuestReport?.map((items, indexReport) => (
                      <tr key={indexReport}>
                        <td>{indexReport + 1}</td>
                        <td>{items?.testResponse}</td>
                        <td>{items?.studentResponse}</td>
                        {items?.studentStatus === "w" ? (
                          <td className="text-danger">Wrong</td>
                        ) : items?.studentStatus === "l" ? (
                          <td className="text-warning">Not Attempted</td>
                        ) : (
                          <td className="text-success">Correct</td>
                        )}

                        <td>{items?.studentTime}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            )}

            <div className="viewSolution text-center">
              <button type="button" onClick={() => handleCourseType()}>
                View Solutions
              </button>
            </div>
          </div>
        ) : (
          <div className="viewSolution text-center attemptTest">
            <button type="button" onClick={handleSubmit}>
              ATTEMPT TEST
            </button>
          </div>
        )}
      </section>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="notePop text-center">
            <h3>Note</h3>
            <div className="deviceTest">
              <p>Device-based tests won't generate CBT results.</p>
            </div>
            <div
              className="mt-5"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <button className="modal-but bg-danger" onClick={closeModal}>
                Cancel
              </button>
              <button className="modal-but bg-success" onClick={handlefinal}>
                Ok
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default CbtComboReport;
