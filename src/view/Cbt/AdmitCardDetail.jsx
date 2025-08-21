import React, { useState, useEffect } from "react";
import "../../assets/css/cbt_select_exam/style.css";
import "../../assets/css/cbt_select_exam/responsive.css";
//import "../../assets/css/cbt_select_exam/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { Spin } from "antd";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
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

const AdmitCardDetail = () => {
  const navigate = useNavigate();
  const courseId = JSON.parse(localStorage.getItem("course_Id"));
  const user_id = sessionStorage.getItem("id");
  const getadmitcard = JSON.parse(localStorage.getItem("fetchAdmitcard"));
  
  const [admitCardDetail, setAdmitCardDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const get_admit_card_detail = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/v2_data_model/get_admit_card", {
        test_id: getadmitcard?.TEST_ID,
        event_id: getadmitcard?.EVENT_ID,
        user_id: user_id,
        student_id: getadmitcard?.STUDENT_ID,
      });
      setAdmitCardDetail(res?.data?.data);
      setLoading(false);
    } catch (error) {
      
      setLoading(false);
    }
  };
  useEffect(() => {
    get_admit_card_detail();
  }, [user_id]);

  const handleDownload = () => {
    window.open(admitCardDetail?.file, "_blank");
  };

  const formatDateChange = (inputDate) => {
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

    // Parse the input date string
    const parts = inputDate.split("-");
    const year = parseInt(parts[0]);
    const monthIndex = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);

    // Format the date
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
    return formattedDate;
  };

  const test_id = JSON.parse(localStorage.getItem("test_id"));
  const handleAtemptTest = async () => {
    try {
      const res_attempt = await axiosInstance.post(
        "/v2_data_model/get_cbt_check_date",
        { test_id: test_id }
      );
      if (res_attempt.data.status === true) {
        if (res_attempt?.data?.data.cbt_value === "1") {
          setIsOpen(true);
        } else {
          toast.success(
            "Test will start at: " +
              formatDateChange(res_attempt?.data?.data.exam_date) +
              " " +
              res_attempt?.data?.data.event_start_time
          );
        }
      }
    } catch (error) {
      
    }
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

  return (
    <div className="admitcarddetail">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>CBT Admit Card Detail</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="AdmitCardDeatil">
        <div className="container">
          {loading ? (
            <div style={{ width: "100%", textAlign: "center" }}>
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="cardDetail text-center">
                    <h3>ALL INDIA DAMS NEETPG CBT 15 MARCH</h3>
                    <p className="boxbg">Admit Card</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4 col-md-3 col-lg-2">
                  <div className="profileimg">
                    <img
                      src={
                        admitCardDetail?.user_admit_card?.cbt_profilePic
                          ? admitCardDetail?.user_admit_card?.cbt_profilePic
                          : ""
                      }
                      loading="lazy" alt="icon image"
                    />
                  </div>
                </div>
                <div className="col-8 col-md-9 col-lg-9">
                  <div className="admitcardprofile">
                    <table className="table">
                      <tr>
                        <td>Name:</td>
                        <td>
                          {admitCardDetail?.user_admit_card?.candidateName}
                        </td>
                      </tr>
                      <tr>
                        <td>CBT Id:</td>
                        <td>
                          {admitCardDetail?.user_admit_card?.candidateCBTID}
                        </td>
                      </tr>
                      <tr>
                        <td>CBT password:</td>
                        <td>
                          {admitCardDetail?.user_admit_card?.studentPassword}
                        </td>
                      </tr>
                      <tr>
                        <td>Exam Date:</td>
                        <td>
                          {admitCardDetail?.user_admit_card?.examinationDate}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <table className="table">
                    <tr>
                      <td>Exam Time:</td>
                      <td>{admitCardDetail?.user_admit_card?.examTiming}</td>
                    </tr>
                    <tr>
                      <td>Reporting Time:</td>
                      <td>{admitCardDetail?.user_admit_card?.reportingTime}</td>
                    </tr>
                    <tr>
                      <td>Exam Center:</td>
                      <td>{admitCardDetail?.user_admit_card?.centreName}</td>
                    </tr>
                    <tr>
                      <td>Address:</td>
                      <td>{admitCardDetail?.user_admit_card?.centreAddress}</td>
                    </tr>
                    <tr>
                      <td>Landmark:</td>
                      <td>
                        {admitCardDetail?.user_admit_card?.landmark !== null
                          ? admitCardDetail?.user_admit_card?.landmark
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>City:</td>
                      <td>{admitCardDetail?.user_admit_card?.cityName}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="Notes">
                    <h2 className="mb-3">NOTES:</h2>
                    <ol>
                      <li>
                        If a photgraph is Missing: You can paste the color
                        passport- size photograph in the given area.
                      </li>
                      <li>
                        {
                          "The candidates are requested to carry 1 ID proof along with this admit card."
                        }
                      </li>
                      <li>
                        {
                          "Candidates will be allowed to appear for examination after verifying the credentials from the records available for the presiding officer. "
                        }
                      </li>
                      <li>
                        {
                          "Candidates are advised to reach the test center 45 minutes prior to the exam. Candidates coming late at the test center will not be permitted to enter the examination hall."
                        }
                      </li>
                      <li>
                        {
                          "Candidates will not be allowed to give the exam in any other shift time apart from which is allotted to the candidates."
                        }
                      </li>
                      <li>
                        {
                          " The exam will be conducted during the alocated times shown on the admit card.Extra time will not be given to students in any case. "
                        }
                      </li>
                      <li>
                        {
                          "Candidate can not submit the test prior to 60 minutes."
                        }
                      </li>
                      <li>
                        {
                          "Candidate must switch off their mobile phones in the examination hall."
                        }
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="row btnMixed">
                <div className="col-6 col-md-6">
                  <button type="button" onClick={handleAtemptTest}>
                    <em className="fmr-2"></em>ATTEMPT TEST
                  </button>
                </div>
                <div className="col-6 col-md-6 text-center">
                  <button type="button" onClick={handleDownload}>
                    <em className="fa fa-download mr-2"></em>Download Admit Card
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
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

export default AdmitCardDetail;
