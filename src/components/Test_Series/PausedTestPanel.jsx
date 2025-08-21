import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCircle, FaPause, FaPlay } from "react-icons/fa";
import "./Testpanel.css";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { Button, ModalBody, Spinner } from "react-bootstrap";
import axiosInstance from "../../API/axiosConfig";
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

Modal.setAppElement("#root");

const PausedTestPanel = () => {
  const { id } = useParams();
  const [subjectId, setSubjectid] = useState();
  const [subjectName, setSubjetname] = useState();
  const navigate = useNavigate();
  const user_id = id.split("t")[0];
  const test_series_id = id.split("t")[1];
  const [testData, setTestData] = useState(null);
  const [tab, setTab] = useState(0); // change 1 to 0 (because data are not showing in 1)
  const [totaltime, settotaltime] = useState(0);

  const [timeLeft, setTimeLeft] = useState(1);
  const [isRunning, setIsRunning] = useState(true);

  const [disableNav, setDisableNav] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [allmarked, setallmarked] = useState([]);

  const [quesArray, setQuesArray] = useState([]);
  const [Attempted, setattempted] = useState(null);
  const [UnAttempted, setunatempted] = useState(null);
  const [marked, setmarked] = useState(null);
  const [LastQid, setLastQid] = useState(null);
  const [LastView, setLastView] = useState(null);
  const [qdump, setquedump] = useState([]);

  const [isOnline, setIsOnline] = useState(navigator.onLine);


  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const fetchdata = async () => {
    try {
      const response = await axiosInstance.post(
        `/v2_data_model/get_test_question_data/`,
        { user_id: user_id, test_series_id: test_series_id }
      );

      setTestData(response?.data?.data);
      setSubjectid(response.data.data.question_bank[0].subject_id);
      setSubjetname(response.data.data.question_bank[0].subject_name);
      setLastQid(response?.data?.data?.active_ques);
      setLastView(response?.data?.data?.active_ques);
      settotaltime(Number(response?.data?.data?.basic_info?.time_in_mins));
      setTimeLeft(
        Number(response?.data?.data?.basic_info?.time_in_mins) * 60 -
          Number(response?.data?.data?.time_spent)
      );
      const questionsArray = Object.values(
        response?.data?.data?.question_bank || {}
      ).map((question) => question.question);
      setQuesArray(questionsArray);

      setquedump(response?.data?.data?.question_dump);
    } catch (err) {
      console.log(err);
    }
  };


  const toggleFullScreen = () => {
    const docElm = document.documentElement;

    if (!document.fullscreenElement) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        // Firefox
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullscreen) {
        // Chrome, Safari, Opera
        docElm.webkitRequestFullscreen();
      } else if (docElm.msRequestFullscreen) {
        // IE/Edge
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };


  useEffect(() => {
    const preventContextMenu = (event) => event.preventDefault();
    const preventInspect = (event) => {
      if (
        (event.ctrlKey && event.shiftKey && event.keyCode === 73) ||
        (event.ctrlKey && event.keyCode === 73 ) ||
        (event.ctrlKey && event.shiftKey && event.keyCode === 82) ||
        (event.ctrlKey && event.keyCode === 82)||
        (event.keyCode ===116)
      ) {
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
    fetchdata();
    toggleFullScreen();
  }, []);

  const [userSelections, setUserSelections] = useState([]);

  const [skip, setSkip] = useState([]);

  const handleNext = (opt) => {
    setSkip((skip)=>[...skip,opt])
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

    let lastview = qid;
    setLastView(lastview);
    const existingIndex = userSelections.findIndex(
      (selection) => selection.qid === qid
    );

    // Prepare the new selection object
    const newSelection = {
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

  useEffect(() => {
    if (testData && testData.question_dump) {
      const updatedSelectedOptions = {};

      testData.question_dump.forEach((question) => {
        // Extract the question ID and the selected option
        const { question_id, answer } = question;

        // Find the corresponding question in testData.question_bank
        const questionIndex = testData.question_bank.findIndex(
          (que) => que.qid === question_id
        );

        if (questionIndex !== -1) {
          // Select the option based on the answer from question_dump
          updatedSelectedOptions[questionIndex + 1] =
            testData.question_bank[questionIndex][`option_${answer}`];
        }
      });

      const index = testData?.question_dump?.findIndex(
        (obj) => obj.question_id == LastQid
      );
      setTab(index === -1 ? 1 : index + 1);
      //setTab(index + 1);
      setSelectedOptions(updatedSelectedOptions);
    }
  }, [testData]);

  const handleMark = (opt) => {
    if (!allmarked.includes(opt)) {
      allmarked.unshift(opt);
    }
  };

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
      window.alert("Session Expired!");
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    saveTestData();
  }, [userSelections]);

  const handleSubmit = async () => {
    if (!isOnline)return  notification.open({
      message: "You are offline!",
      duration: 3,
    });
    setunatempted(testData?.question_bank.length - userSelections.length);
    setmarked(allmarked.length);
    setIsOpen(true);

    // navigate('/testresult')
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

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
    question_id: question.qid,
    answer: attemptedMap[question.qid]
      ? attemptedMap[question.qid].optionTicked.toString()
      : "",
    onscreen: 5, // Assuming default value is 5
    guess: 0, // Assuming default value is 0
    review: 0, // Assuming default value is 0
    part: "", // Assuming default value is an empty string
    section_id: 0, // Assuming default value is 0
    unanswered: attemptedMap[question.qid] ? "1" : "",
  }));

  newArr?.forEach((item) => {
    const foundItem = qdump.find((q) => q.question_id === item.question_id);
    if (foundItem && foundItem.answer) {
      item.answer = foundItem.answer;
    }
  });

  let nonEmptyAnswerCount = 0;

  useEffect(() => {
    let nonEmptyAnswerCount = 0;
    newArr?.forEach((obj) => {
      // Check if the 'answer' field is not empty
      if (obj.answer !== "") {
        // Increment the counter
        nonEmptyAnswerCount++;
      }
    });

    setattempted(nonEmptyAnswerCount);
  }, [newArr]);

  const handlefinal = async () => {
    // Create a new FormData object
    const formData = new FormData();

    // Append key-value pairs to the FormData object
    formData.append("user_id", user_id);
    formData.append("question_dump", JSON.stringify(newArr));
    formData.append("test_series_id", test_series_id);
    formData.append("time_spent", Number(totaltime * 60 - timeLeft).toFixed(0));
    formData.append("state", 0);
    formData.append("last_view", "171945");

    // Send a POST request with the FormData object
    const response = await axiosInstance.post(
      "/v2_data_model/save_test_series",
      formData
    );

    if (response.status) {
      toast.success("Test completed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate(`/testresult/${user_id}s${response.data.data.id}`);
    }
  };

  useEffect(() => {
    const handleUnload = async (event) => {
      event.preventDefault();
      event.returnValue = ""; // Prompt the user with a confirmation dialog

      // Save test data when the user closes the window or the system shuts down
      await saveTestData();

      return ""; // Required for Chrome
    };

    const saveTestData = async () => {
      try {
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("question_dump", JSON.stringify(newArr));
        formData.append("test_series_id", test_series_id);
        formData.append(
          "time_spent",
          Number(totaltime * 60 - timeLeft).toFixed(0)
        );
        formData.append("state", 1); // Assuming '1' represents an incomplete state
        formData.append("last_view", LastView);

        // Send a POST request with the FormData object
        await axiosInstance.post("/v2_data_model/save_test_series", formData);
      } catch (error) {
        console.error("Error saving test data:", error);
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [user_id, test_series_id, totaltime, timeLeft, newArr]);

  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [imgurl, setimgurl] = useState("");

  const HandleImg = (e) => {
    if (e.target.tagName == "IMG") {
      setimgurl(e.target.src);
      setIsOpen2(true);
    }
  };

  const saveFormDataToLocalStorage = (formData) => {
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    localStorage.setItem("testdata", JSON.stringify(formObject));
  };

    //-----save-data------
    const saveTestData = async () => {
      try {
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("question_dump", JSON.stringify(newArr));
        formData.append("test_series_id", test_series_id);
        formData.append(
          "time_spent",
          Number(totaltime * 60 - timeLeft).toFixed(0)
        );
        formData.append("state", 1); // Assuming '1' represents an incomplete state
        formData.append("last_view", LastView);
  
        // Send a POST request with the FormData object
        await axiosInstance.post("/v2_data_model/save_test_series", formData);
        saveFormDataToLocalStorage(formData);
      } catch (error) {
        console.error("Error saving test data:", error);
      }
    };
    //-----save-data------


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
                          <h4 style={{ color: "red" }}>
                            {isOnline ? "" : "You are Offline!"}
                          </h4>
                          <div
                            onClick={HandleImg}
                            title="Click to zoom!"
                            dangerouslySetInnerHTML={{ __html: que.question }}
                          />
                          {[
                            que.option_1,
                            que.option_2,
                            que.option_3,
                            que.option_4,
                          ].map((option, i) => (
                            <div
                              key={`${que.qid}-${i}`} // 🔐 Unique key for each option of each question
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
                                  que.qid,
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
                                Submit
                              </button>
                            </div>
                          </div>
                        </Modal>
                        {/* Report Error Modal */}
                        <div
                          onClick={() => setIsModalOpen(true)}
                          style={{ cursor: "pointer", color: "red" }}
                        >
                          ! report error
                        </div>

                        <AntModal
                          title="Feedback/Report Error"
                          open={isModalOpen}
                          onCancel={handleCancel} // Use custom handler to reset form
                          footer={null}
                        >
                          <Radio.Group
                            onChange={(e) =>
                              setSelectedCategory(e.target.value)
                            }
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
                      </div>
                      <div className="bottom-nav">
                        <Button
                          style={{}}
                          onClick={handlePrev}
                          disabled={disableNav}
                        >
                          Prev
                        </Button>

                        <button
                          style={{}}
                          onClick={() => handleMark(index + 1)}
                        >
                          Mark for review
                        </button>

                        <Button
                          style={{}}
                          onClick={()=>handleNext(index + 1)}
                          disabled={disableNav}
                        >
                          Next
                        </Button>
                      </div>
                    </>
                  )}
                </>
              ))}
            </div>

            <div className="que-status-cont">
              <div style={{ flexGrow: 1 }}>
                <h4 style={{}}>Review Questions</h4>
                <div
                  className={
                    testData?.question_bank.length > 50
                      ? "reviewQues"
                      : "revisionTest"
                  }
                >
                {testData?.question_bank.map((que, index) => (
                    <button
                    className={selectedOptions && selectedOptions[index + 1] && allmarked.includes(index + 1) ?"attemp-selected":"que-no-box"}
                      key={que.id}
                      style={{backgroundColor:!allmarked.includes(index + 1) && selectedOptions && selectedOptions[index + 1] ===undefined  && skip.includes(index + 1) 
                        ? "#FF0F17"
                        : selectedOptions && selectedOptions[index + 1] && allmarked.includes(index + 1)
                          ? "#0c7e0c"
                         :allmarked.includes(index + 1)
                          ? "#7b037f"
                          : selectedOptions && selectedOptions[index + 1]
                          ? "#0c7e0c"
                          : "#777777",
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

              <div style={{ display: "flex", justifyContent: "space-around" , flexFlow:"wrap"}}>
                <div className="mb-2">
                  <FaCircle size={6} color="green" />
                  <span> Attempted</span>
                </div>

                <div className="mb-2">
                  <FaCircle size={6} color="#777777" />
                  <span> Skipped</span>
                </div>

                <div className="mb-2">
                  <FaCircle size={6} color="purple" />
                  <span> Marked</span>
                </div>

                <div className="mb-2">
                  <FaCircle size={6} color="red" />
                  <span> UnAttempted</span>
                </div>

              </div>

              <span className={isOnline ? `submitBtn`: `offlineBtn`}  onClick={handleSubmit}>
                {isOnline ? `SUBMIT`:`You are Offline`}
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

export default PausedTestPanel;
