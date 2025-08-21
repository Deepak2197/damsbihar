import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCircle, FaPause, FaPlay } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { Button, ModalBody, ModalHeader, Spinner } from "react-bootstrap";
import axiosInstance from "../../API/axiosConfig";
import "./TestPanel.css";
import { notification, Modal as AntModal, Radio, Input, Form } from "antd"; // for report error
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "20%",
    transform: "translate(-50%, -50%)",
  },
};

const customStyles1 = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "10%",
    transform: "translate(-50%, -50%)",
  },
};
const customStyles2 = {
  content: {
    top: "70%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "500px",
    width: "600px",
    transform: "translate(-50%, -20%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const TestPanelDQB = () => {
  const { id } = useParams();
  const user_id = id.split("t")[0];
  const test_series_id = id.split("t")[1];
  const [subjectId, setSubjectid] = useState();
  const [subjectName, setSubjetname] = useState();
  const navigate = useNavigate();
  const [testData, setTestData] = useState(null);
  const [tab, setTab] = useState(1);
  const [totaltime, settotaltime] = useState(0);

  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const [markedQuestions, setMarkedQuestions] = useState([]);
  const [disableNav, setDisableNav] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [allmarked, setallmarked] = useState([]);

  const [quesArray, setQuesArray] = useState([]);
  const [Attempted, setattempted] = useState(null);
  const [UnAttempted, setunatempted] = useState(null);
  const [marked, setmarked] = useState(null);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen1, setIsOpen1] = React.useState(false);

  const [resultload, setresultload] = useState(true);

  const fetchdata = async () => {
    try {
      const response = await axiosInstance.post(
        `/v2_data_model/get_test_series_with_id/`,
        { user_id: user_id, test_series_id: test_series_id }
      );

      setTestData(response?.data?.data);
      setSubjectid(response.data.data.question_bank[0].subject_id);
      setSubjetname(response.data.data.question_bank[0].subject_name);
      settotaltime(Number(response?.data?.data?.basic_info?.time_in_mins));
      setTimeLeft(Number(response?.data?.data?.basic_info?.time_in_mins) * 60);
      const questionsArray = Object.values(
        response?.data?.data?.question_bank || {}
      ).map((question) => question.question);
      setQuesArray(questionsArray);
    } catch (err) {}
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const [userSelections, setUserSelections] = useState([]);

  const handleNext = () => {
    if (tab < testData?.question_bank.length) {
      setTab((prevTab) => prevTab + 1);
    }
  };

  const handlePrev = () => {
    if (tab > 1) {
      setTab((prevTab) => prevTab - 1);
    }
  };

  const handleOptionClick = (option, optionNo, qid, correctAns) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [tab]: option,
    }));

    // const removeElementFromArrayMutate = (array, elementToRemove) => {
    //   const index = array.indexOf(elementToRemove);
    //   if (index !== -1) {
    //     array.splice(index, 1);
    //   }
    // };

    // removeElementFromArrayMutate(allmarked, tab);

    const existingIndex = userSelections.findIndex(
      (selection) => selection.qid === qid
    );

    if (optionNo == correctAns) {
    }
    // Prepare the new selection object
    const newSelection = {
      is_correct: optionNo == correctAns ? 1 : 0,
      optionTicked: optionNo,
      qid: qid,
    };

    // If the question ID already exists, update the existing selection
    if (existingIndex !== -1) {
      const updatedSelections = [...userSelections];
      updatedSelections[existingIndex] = newSelection;
      setUserSelections(updatedSelections);
    } else {
      // If the question ID does not exist, add the new selection to the array
      setUserSelections([...userSelections, newSelection]);
    }
  };

  const handleMark = (questionNumber) => {
    if (markedQuestions.includes(questionNumber)) {
      // Unmark if already marked
      setMarkedQuestions((prev) => prev.filter((q) => q !== questionNumber));
    } else {
      // Mark if not marked
      setMarkedQuestions((prev) => [...prev, questionNumber]);
    }
  };

  useEffect(() => {
    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    const preventInspect = (event) => {
      if (
        (event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl+Shift+I
        (event.ctrlKey && event.keyCode === 73)
      ) {
        // Ctrl+I
        event.preventDefault();
      }
    };

    window.addEventListener("contextmenu", preventContextMenu);
    window.addEventListener("keydown", preventInspect);

    return () => {
      window.removeEventListener("contextmenu", preventContextMenu);
      window.removeEventListener("keydown", preventInspect);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) =>
          prevTimeLeft > 0 ? prevTimeLeft - 1 : 0
        );
      }, 1000);
    }

    if (timeLeft == 0) {
      setIsOpen1(true);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {}, [userSelections]);

  const handleSubmit = async () => {
    setattempted(userSelections.length);
    setunatempted(testData?.question_bank.length - userSelections.length);
    setmarked(markedQuestions.length);
    setIsOpen(true);
  };

  let subtitle;

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const attemptedMap = userSelections.reduce((acc, ans) => {
    acc[ans.qid] = ans;
    return acc;
  }, {});

  const newArr = testData?.question_bank.map((question, index) => ({
    order: index + 1,
    question_id: question.id,
    answer: attemptedMap[question.id]
      ? attemptedMap[question.id].optionTicked.toString()
      : "",
    onscreen: 5, // Assuming default value is 5
    guess: 0, // Assuming default value is 0
    review: 0, // Assuming default value is 0
    part: "", // Assuming default value is an empty string
    section_id: 0, // Assuming default value is 0
    unanswered: attemptedMap[question.id] ? "1" : "",
  }));

  const handlefinal = async () => {
    setresultload(false);

    // Create a new FormData object
    const formData = new FormData();

    // Append key-value pairs to the FormData object
    formData.append("user_id", user_id);
    formData.append("question_dump", JSON.stringify(newArr));
    formData.append("test_series_id", test_series_id);
    formData.append("time_spent", Number(totaltime * 60 - timeLeft).toFixed(0));
    formData.append("state", "0");
    formData.append("last_view", "171945");

    // Send a POST request with the FormData object
    const response = await axiosInstance.post(
      "/v2_data_model/save_aiims_1",
      formData
    );

    if (response?.status) {
      toast.success("Test completed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setresultload(true);

      navigate(`/testresult/dqb/${user_id}s${response.data.data.id}`);
    }
  };

  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [imgurl, setimgurl] = useState("");

  const HandleImg = (e) => {
    if (e.target.tagName == "IMG") {
      setimgurl(e.target.src);
      setIsOpen2(true);
    }
  };

  //error report

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmitreport = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/v2_data_model/submit_query", {
        user_id: user_id,
        title: test_series_id,
        description: feedback,
        category: selectedCategory,
        test_type: 2,
        subject_name: subjectName,
        subject_id: subjectId,
        test_series_name: testData?.basic_info?.test_series_name,
        test_series_id: test_series_id,
      });

      if (response.data.status) {
        setLoading(false);
        setIsModalOpen(false);
        setSuccessMessage(response.data.message);
        setIsSuccessModalOpen(true);
        setFeedback("");
        setSelectedCategory(null);

        setTimeout(() => {
          setIsSuccessModalOpen(false);
        }, 4000);
      }
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Submission failed",
      });
    }
  };
  // Reset form data when modal is closed
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedCategory(null); // Clear radio button selection
    setFeedback(""); // Clear text box
  };

  return (
    <>
      <div className="TestPanel">
        <div className="container">
          <div className="testcont">
            <div className="quecont">
              <div className="stopwatch">
                <div>{formatTime(timeLeft)}</div>
              </div>

              <h4 style={{}}>{testData?.basic_info?.test_series_name}</h4>
              {testData?.question_bank?.map((que, index) => (
                <>
                  {tab === index + 1 && (
                    <>
                      <div className="groupwith">
                        <div style={{ width: "70%" }}>
                          <h5>Q.{index + 1}</h5>
                          {/* <div dangerouslySetInnerHTML={{ __html: que.question }} /> */}
                          <div className="question-container">
                            <div
                              onClick={HandleImg}
                              title="Click to zoom!"
                              dangerouslySetInnerHTML={{ __html: que.question }}
                            />
                          </div>

                          {[
                            que.option_1,
                            que.option_2,
                            que.option_3,
                            que.option_4,
                          ].map((option, i) => (
                            <div
                              key={i + 1}
                              className="optionlist"
                              style={{
                                backgroundColor:
                                  selectedOptions[tab] === option
                                    ? "skyblue"
                                    : "white",
                              }}
                              onClick={() =>
                                handleOptionClick(
                                  option,
                                  i + 1,
                                  que.id,
                                  que.answer
                                )
                              }
                            >
                              <h5 className="optionNo">
                                {String.fromCharCode(65 + i)}
                              </h5>
                              <div
                                dangerouslySetInnerHTML={{ __html: option }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Modal
                          isOpen={modalIsOpen}
                          onAfterOpen={afterOpenModal}
                          onRequestClose={closeModal}
                          style={customStyles}
                          contentLabel="Example Modal"
                        >
                          <ModalHeader>
                            {" "}
                            {testData?.basic_info?.test_series_name}
                          </ModalHeader>
                          <div className="table-responsive">
                            <table className="table">
                              <thead style={{ backgroundColor: "skyblue" }}>
                                <tr>
                                  <th>Attempted</th>
                                  <th>Not Attempted</th>
                                  <th>Marked</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{Attempted}</td>
                                  <td>{UnAttempted}</td>
                                  <td>{marked}</td>
                                </tr>
                              </tbody>
                            </table>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <button
                                className="modal-but"
                                onClick={closeModal}
                              >
                                Cancel
                              </button>
                              <button
                                className="modal-but"
                                onClick={handlefinal}
                              >
                                {resultload ? "Submit" : <Spinner />}
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                      {/* Report Error Modal */}
                      <div
                        onClick={() => setIsModalOpen(true)}
                        style={{ cursor: "pointer", color: "red" }}
                      >
                        ! report errore
                      </div>

                      <AntModal
                        title="Feedback/Report Error"
                        open={isModalOpen}
                        onCancel={handleCancel} // Use custom handler to reset form
                        footer={null}
                      >
                        <Radio.Group
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          value={selectedCategory}
                          style={{ marginBottom: 16 }}
                        >
                          <Radio value="Factual error">Factual error</Radio>
                          <Radio value="Confusing Question">
                            Confusing Question
                          </Radio>
                          <Radio value="Inadequate Explanation">
                            Inadequate Explanation
                          </Radio>
                        </Radio.Group>

                        <Input.TextArea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Your Feedback here (minimum 5 characters)"
                          rows={4}
                          style={{ marginBottom: 16 }}
                        />

                        {selectedCategory && feedback.length >= 5 && (
                          <Button
                            type="primary"
                            onClick={handleSubmitreport}
                            disabled={loading}
                          >
                            {loading ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              "Submit"
                            )}
                          </Button>
                        )}
                      </AntModal>

                      {/* Success Message Modal */}
                      <AntModal
                        open={isSuccessModalOpen}
                        footer={null}
                        closable={false}
                        centered
                        bodyStyle={{ textAlign: "center", padding: "20px" }}
                        maskClosable={false}
                      >
                        <p>{successMessage}</p>
                      </AntModal>

                      <div>
                        <Modal
                          isOpen={modalIsOpen1}
                          onAfterOpen={afterOpenModal}
                          style={customStyles1}
                          contentLabel="Example Modal"
                        >
                          <h2 style={{ textAlign: "center", padding: "10px" }}>
                            Test submitted successfully!
                          </h2>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <button className="modal-but" onClick={handlefinal}>
                              {resultload ? "review" : <Spinner />}
                            </button>
                          </div>
                        </Modal>
                      </div>

                      <div className="bottom-nav">
                        {tab > 1 && (
                          <Button onClick={handlePrev} disabled={disableNav}>
                            Prev
                          </Button>
                        )}

                        <button onClick={() => handleMark(index + 1)}>
                          {markedQuestions.includes(index + 1)
                            ? "Unmark for review"
                            : "Mark for review"}
                        </button>

                        {tab < testData?.question_bank?.length && (
                          <Button onClick={handleNext} disabled={disableNav}>
                            Next
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </>
              ))}
            </div>

            <div className="que-status-cont">
              <div style={{ flexGrow: 1 }}>
                <h4>Review Questions</h4>
                <div className="reviewQues">
                  {testData?.question_bank.map((que, index) => (
                    <button
                      className="que-no-box"
                      key={que.qid}
                      style={{
                        backgroundColor: markedQuestions.includes(index + 1)
                          ? "blue"
                          : selectedOptions && selectedOptions[index + 1]
                          ? "green"
                          : "#d3d3d3",
                        textAlign: "center",
                        padding: "5px",
                        minWidth: "40px",
                        color: "white",
                        borderRadius: "4px",
                      }}
                      disabled={disableNav}
                      onClick={() => setTab(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div className="mb-2">
                  <FaCircle size={8} color="green" />
                  <span> Attempted</span>
                </div>

                <div className="mb-3">
                  <FaCircle size={8} color="#d3d3d3" />
                  <span> Skipped</span>
                </div>

                <div className="mb-3">
                  <FaCircle size={8} color="blue" />
                  <span> Marked</span>
                </div>
              </div>

              <span className="submitBtn" onClick={handleSubmit}>
                Submit
              </span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen2}
        onAfterOpen={afterOpenModal}
        style={customStyles2}
        contentLabel="Example Modal"
      >
        <ModalBody>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              style={{ width: "fit-content" }}
              onClick={() => setIsOpen2(false)}
            >
              X
            </Button>
            <img src={imgurl} style={{ height: "400px", width: "100%" }} />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TestPanelDQB;
