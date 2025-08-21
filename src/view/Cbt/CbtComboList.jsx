import React, { useState, useEffect } from "react";
import "../../assets/css/cbt_select_exam/style.css";
import "../../assets/css/cbt_select_exam/responsive.css";
//import "../../assets/css/cbt_select_exam/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
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
const CbtComboList = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenResult, setIsOpenResult] = useState(false);
  const courseId = JSON.parse(localStorage.getItem("course_Id"));
  const user_id = sessionStorage.getItem("id");
  const [cbtComboData, setCbtComboData] = useState([]);
  const formatDate = () => {
    const months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${months[monthIndex]}-${
      day < 10 ? "0" + day : day
    }`;
    return formattedDate;
  };
  const CurrentDate = formatDate();

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
  const cbtcombolist = async () => {
    try {
      const user_id = sessionStorage.getItem("id");
      const res = await axiosInstance.post(
        "/v2_data_model/get_list_of_my_cbt",
        { course_id: courseId, user_id: user_id }
      );
      setCbtComboData(res?.data?.data?.plan_list);
    } catch (err) {
      
    }
  };
  useEffect(() => {
    cbtcombolist();
  }, [user_id]);
  const handleCbtExamType = async (
    exam_date,
    test_id,
    Cbt_title,
    ResultDate
  ) => {
    localStorage.setItem("test_id", JSON.stringify(test_id));
    localStorage.setItem("course_Id", JSON.stringify(test_id));
    localStorage.setItem("Cbt_title", JSON.stringify(Cbt_title));
    if (ResultDate != "") {
      if (ResultDate <= CurrentDate) {
        navigate("/cbtcomboreport");
      } else if (exam_date > CurrentDate) {
        navigate("/admit-card");
      } else if (exam_date === CurrentDate) {
        navigate("/admit-card");
      } else if (ResultDate > CurrentDate) {
        localStorage.setItem("Result_date", JSON.stringify(ResultDate));
        setIsOpen(true);
      }
    } else if (exam_date >= CurrentDate) {
      navigate("/admit-card");
    } else {
      setIsOpenResult(true);
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
    <div className="cbtList">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>{JSON.parse(localStorage.getItem("cbt_title"))} Package </li>
            </ul>
          </div>
        </div>
      </div>
      <section className="CbtCombolist">
        <div className="container">
          <div className="row">
            {cbtComboData
              ?.slice()
              .reverse()
              .map((item, index) => (
                <div
                  className="col-12 col-sm-6 col-md-6 col-lg-6"
                  key={index}
                  style={{ cursor: "pointer" }}
                >
                  <a
                    onClick={() =>
                      handleCbtExamType(
                        item.exam_date,
                        item.id,
                        item.title,
                        item.result_date
                      )
                    }
                  >
                    <div className="combocbttest">
                      <p>
                        <span>
                          <img
                            className="mr-3"
                            src={
                              item.cover_image
                                ? item.cover_image
                                : "https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/emedicoz-logo.png"
                            }
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "4px",
                            }}
                          />
                        </span>
                        {item.title}
                      </p>
                      {item.exam_date < CurrentDate ? (
                        <p className="text-right mt-1">
                          Result Date:{" "}
                          {item.result_date != ""
                            ? formatDateChange(item.result_date)
                            : ""}
                        </p>
                      ) : item.exam_date > CurrentDate ? (
                        <p className="text-right mt-1">
                          Exam Date: {formatDateChange(item.exam_date)}
                        </p>
                      ) : item.exam_date === CurrentDate ? (
                        <p className="text-right mt-1">
                          Exam Date: {formatDateChange(item.exam_date)}
                        </p>
                      ) : null}
                    </div>
                  </a>
                </div>
              ))}
          </div>
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
            <h3>Result</h3>
            <div
              className="deviceTest"
              style={{
                background: "rgb(236 174 174 / 38%)",
                padding: "20px 0px",
              }}
            >
              <h5>{JSON.parse(localStorage.getItem("Cbt_title"))}</h5>
              <p style={{ color: "#000", fontSize: "15px" }}>
                {"result expected to declare on"}
              </p>
              <h5>
                {formatDateChange(
                  JSON.parse(localStorage.getItem("Result_date"))
                )}
              </h5>
            </div>
            <div
              className="mt-5"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <button
                className="modal-but bg-success"
                onClick={handlefinal}
                style={{
                  padding: "12px 5px",
                  borderRadius: "5px",
                  width: "212px",
                  fontSize: "17px",
                }}
              >
                View Solution
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpenResult}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="notePop text-center">
            <h3></h3>
            <div className="deviceTest">
              <h5></h5>
              <p style={{ color: "#000", fontSize: "15px" }}></p>
              <h5></h5>
            </div>
            <div
              className="mt-5"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <button
                className="modal-but bg-success"
                onClick={handlefinal}
                style={{
                  padding: "12px 5px",
                  borderRadius: "5px",
                  width: "212px",
                  fontSize: "17px",
                }}
              >
                View Solution
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CbtComboList;
