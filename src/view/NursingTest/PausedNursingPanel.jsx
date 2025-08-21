import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCircle, FaLock, FaLockOpen, FaPause, FaPlay } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { Button, ModalBody, Spinner, Tab } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { notification, Modal as AntModal, Radio, Input } from "antd";
import axiosInstance from "../../API/axiosConfig";
import ResetTest from "./ResetTest";
import NoSleep from "nosleep.js";
import "../../components/DailyQuiz/TestPanel.css";

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

Modal.setAppElement("#root");

const PausedNursingPanel = () => {
  const { id } = useParams();
  const user_id = id.split("t")[0];
  const test_series_id = id.split("t")[1];

  const navigate = useNavigate();
  const [testData, setTestData] = useState(null);
  const [tab, setTab] = useState(1);
  const [totaltime, settotaltime] = useState(0);

  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(true);

  const [disableNav, setDisableNav] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [allmarked, setallmarked] = useState([]);

  const [quesArray, setQuesArray] = useState([]);
  const [Attempted, setattempted] = useState(null);
  const [UnAttempted, setunatempted] = useState(null);
  const [marked, setmarked] = useState(null);
  const [sectionArr, setSecArr] = useState([]);
  const [TimeInSec, setTimeInSec] = useState(null);

  const [modalIsOpen1, setIsOpen1] = useState(false);
  const [totQue, settotQue] = useState(0);
  const [LastView, setLastView] = useState(null);
  const [qdump, setquedump] = useState([]);
  const [count, setCount] = useState(0);
  const [quepersec, setquepersec] = useState(0);
  const [DeviceId, setDeviceID] = useState(null);
  const [resultload, setresultload] = useState(true);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selecttestquid, setTestqid] = useState();
  const [subjectName, setSubjetname] = useState();
  const [subjectId, setSubjectid] = useState();

  const [queLoad,setQueload] = useState(true);

  
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setFeedback("");
  };

  const handleSubmitreport = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/v2_data_model/submit_query",
        {
          user_id: user_id,
          title: selecttestquid,
          description: feedback,
          category: selectedCategory,
          test_type: 0,
          subject_name: subjectName,
          subject_id: subjectId,
          test_series_id: test_series_id,
        }
      );

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
      console.log(error)
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  const isNetwork = async () => {
    try {
      // Try to request a lightweight file
      const response = await fetch("https://www.gstatic.com/generate_204", {
        method: "GET",
        mode: "no-cors",
      });
      return true; // No error = online
    } catch (error) {
      return false; // Error = offline or blocked
    }
  };

  const fetchdata = async () => {
    try {
      const response = await axiosInstance.post(
        `/v2_data_model/get_test_question_data/`,
        { user_id: user_id, test_series_id: test_series_id }
      );

      const response1 = await axiosInstance.post(
        `/v2_data_model/nurshing_test_instruction`,
        { user_id: user_id, test_id: test_series_id }
      );
      setSubjetname(response?.data?.data?.question_bank[0]?.subject_name);
      setSubjectid(response?.data.data?.question_bank[0]?.subject_id);
      setTestData(response?.data?.data);
      setTab(Number(response?.data?.data?.active_ques));
      setLastView(response?.data?.data?.active_ques);
      setCount(Number(response?.data?.data?.section_time_spent));
      settotaltime(Number(response?.data?.data?.basic_info?.time_in_mins));
      setQueload(false)
      setTimeLeft(Number(response?.data?.data?.time_spent));
      const questionsArray = Object.values(
        response?.data?.data?.question_bank || {}
      ).map((question) => question.question);
      setQuesArray(questionsArray);
      setquedump(response?.data?.data?.question_dump);

      const multiple = Math.floor(
        Number(response?.data?.data?.active_ques) /
          Number(response1?.data?.data?.section[0]?.no_of_questions)
      );

      if (
        Number(response?.data?.data?.active_ques) %
          Number(response1?.data?.data?.section[0]?.no_of_questions) ==
        0
      ) {
        setTimeInSec(
          Number(response?.data?.data?.basic_info?.time_in_mins) * 60 -
            Number(response1?.data?.data?.section[0].section_timing) *
              60 *
              (multiple - 1)
        );
      } else {
        setTimeInSec(
          Number(response?.data?.data?.basic_info?.time_in_mins) * 60 -
            Number(response1?.data?.data?.section[0].section_timing) *
              60 *
              multiple
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getSec = async () => {
    const response = await axiosInstance.post(
      `/v2_data_model/nurshing_test_instruction`,
      { user_id: user_id, test_id: test_series_id }
    );

    setSecArr(response?.data?.data?.section);
    setquepersec(Number(response?.data?.data?.section[0]?.no_of_questions));
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
    getSec();
  }, []);

  const [userSelections, setUserSelections] = useState([]);

  const [skip, setSkip] = useState([]);

  const handleNext = (opt) => {
    setSkip((skip) => [...skip, opt]);
    const currentPartName = testData?.question_bank[tab - 1]?.part_name;
    const nextPartName = testData?.question_bank[tab]?.part_name;
    if (currentPartName == nextPartName) {
      if (tab < testData?.question_bank.length) {
        if (currentPartName != nextPartName) {
          setTimeLeft(
            Number(testData?.question_bank[tab - 1]?.section_timing) * 60
          );
        }
        setTab((prevTab) => prevTab + 1);
      }
    } else {
      notification.open({
        message:
          "All questions from this sections are attempted, once the timer of this section completes you will be taken to the next section.",
        duration: 2,
      });
    }
  };

  useEffect(() => {
    setLastView(tab);
  }, [tab]);

  const getNumberOfQuestions = (partName) => {
    const section = sectionArr?.find((sec) => sec.part_name === partName);
    return section ? section.no_of_questions : null;
  };

  useEffect(() => {
    if (tab <= testData?.question_bank.length) {
      if (timeLeft == 0) {
        setCount(0);
        const currentPartName = testData?.question_bank[tab - 1]?.part_name;
        const numberOfQuestions = getNumberOfQuestions(currentPartName);
        const PrevPartName =
          testData?.question_bank[tab - (Number(numberOfQuestions) + 1)]
            ?.part_name;
        const NextPartName =
          testData?.question_bank[tab + (Number(numberOfQuestions) - 1)]
            ?.part_name;
        const numberOfQuestionsPrev = getNumberOfQuestions(PrevPartName);
        if (PrevPartName) {
          settotQue((prevq) => prevq + Number(numberOfQuestionsPrev));
        }

        setTimeInSec(
          (prevtime) =>
            prevtime -
            Number(testData?.question_bank[tab - 1]?.section_timing) * 60
        );

        if (PrevPartName && NextPartName) {
          if (NextPartName == "SEC C" || NextPartName == "Sec C") {
            setTab(Number(quepersec) * 2 + 1);
            setTimeLeft(
              Number(testData?.question_bank[tab - 1]?.section_timing) * 60
            );
          } else if (NextPartName == "SEC D" || NextPartName == "Sec D") {
            setTab(Number(quepersec) * 3 + 1);
            setTimeLeft(
              Number(testData?.question_bank[tab - 1]?.section_timing) * 60
            );
          } else if (NextPartName == "SEC E" || NextPartName == "Sec E") {
            setTab(Number(quepersec) * 4 + 1);
            setTimeLeft(
              Number(testData?.question_bank[tab - 1]?.section_timing) * 60
            );
          }
        } else if (!NextPartName) {
          setTimeLeft(0);
        } else {
          settotQue((prevq) => prevq + Number(numberOfQuestions));
          setTab(Number(numberOfQuestions) + 1);
          setTimeLeft(
            Number(testData?.question_bank[tab - 1]?.section_timing) * 60
          );
        }
      }
    }
  }, [timeLeft]);

  const handlePrev = () => {
    const currentPartName = testData?.question_bank[tab - 1]?.part_name;
    const PrevPartName = testData?.question_bank[tab - 2]?.part_name;

    if (currentPartName == PrevPartName) {
      if (tab > 1) {
        setTab((prevTab) => prevTab - 1);
      }
    } else {
      notification.open({
        message: "Section change is not valid!",
        duration: 2,
      });
    }
  };

  const handleOptionClick = (option, optionNo, qid, correctAns) => {
    setTestqid(qid)

    // If the option is already selected, unselect it
    if (selectedOptions[tab] === option) {
      setSelectedOptions((prev) => {
        const newOptions = { ...prev };
        delete newOptions[tab];
        return newOptions;
      });

      // Remove from userSelections
      setUserSelections((prev) =>
        prev.filter((selection) => selection.qid !== qid)
      );
      return;
    }

    // Otherwise, select the option
    setSelectedOptions((prev) => ({
      ...prev,
      [tab]: option,
    }));

    const existingIndex = userSelections.findIndex(
      (selection) => selection.qid === qid
    );

    const newSelection = {
      is_correct: optionNo == correctAns ? 1 : 0,
      optionTicked: optionNo,
      qid: qid,
    };

    if (existingIndex !== -1) {
      setUserSelections((prev) => {
        const newSelections = [...prev];
        newSelections[existingIndex] = newSelection;
        return newSelections;
      });
    } else {
      setUserSelections((prev) => [...prev, newSelection]);
    }
  };

  const handleUnselectOption = (qid) => {
    setSelectedOptions((prev) => {
      const newOptions = { ...prev };
      delete newOptions[tab];
      return newOptions;
    });

    setUserSelections((prev) =>
      prev.filter((selection) => selection.qid !== qid)
    );
  };

  useEffect(() => {
    if (testData && testData.question_dump) {
      const updatedSelectedOptions = {};

      testData.question_dump.forEach((question) => {
        const { question_id, answer } = question;
        const questionIndex = testData.question_bank.findIndex(
          (que) => que.qid === question_id
        );

        if (questionIndex !== -1) {
          updatedSelectedOptions[questionIndex + 1] =
            testData.question_bank[questionIndex][`option_${answer}`];
        }
      });

      setSelectedOptions(updatedSelectedOptions);
    }
  }, [testData]);

  const handleMark = (opt) => {
    if (!allmarked.includes(opt)) {
      setallmarked((prev) => [...prev, opt]);
    } else {
      setallmarked((prev) => prev.filter((item) => item !== opt));
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

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleSubmit = async () => {
    if (!isOnline)return  notification.open({
      message: "You are offline!",
      duration: 3,
    });
    if (timeLeft <= 0) {
      setattempted(userSelections.length);
      setunatempted(testData?.question_bank.length - userSelections.length);
      setmarked(allmarked.length);
      setIsOpen1(true);
    } else {
      notification.open({
        message: "Test could not be submit before time!",
        duration: 2,
      });
    }
  };

  let subtitle;

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  const attemptedMap = userSelections.reduce((acc, ans) => {
    acc[ans.qid] = ans;
    return acc;
  }, {});

  const newArr = testData?.question_bank?.map((question, index) => ({
    order: index + 1,
    question_id: question.id,
    answer: attemptedMap[question.id]
      ? attemptedMap[question.id].optionTicked.toString()
      : "",
    onscreen: 5,
    guess: 0,
    review: 0,
    part: question?.part,
    section_id: question?.section_id,
    unanswered: attemptedMap[question.id] ? "1" : "",
  }));

  testData?.question_bank?.forEach((item) => {
    let section = sectionArr?.find((section) => section.id == item.part);
    if (section) {
      item.part_name = section.part_name;
      item.section_timing = section.section_timing;
    }
  });

  

  newArr?.forEach((item) => {
    const foundItem = qdump.find((q) => q.question_id === item.question_id);
    if (foundItem && foundItem.answer) {
      item.answer = foundItem.answer;
    }
  });

  useEffect(() => {
    let nonEmptyAnswerCount = 0;
    newArr?.forEach((obj) => {
      if (obj.answer !== "") {
        nonEmptyAnswerCount++;
      }
    });
    setattempted(nonEmptyAnswerCount);
  }, [newArr]);

  const handlefinal = async () => {
    setresultload(false);
    const formData = new FormData();

    formData.append("user_id", user_id);
    formData.append("question_dump", JSON.stringify(newArr));
    formData.append("test_series_id", test_series_id);
    formData.append("time_spent", totaltime * 60);
    formData.append("state", "0");
    formData.append("last_view", "171945");
    formData.append("section_time_spent", "0");
    formData.append("section_part_id", "0");

    const response = await axiosInstance.post(
      "/v2_data_model/save_test_series",
      formData
    );

    setresultload(true);
    if (response?.data?.data?.result_time == "") {
      navigate(`/testresult/nur/${user_id}s${response?.data?.data?.id}`);
    } else {
      navigate(`/testwait/${response?.data?.data?.result_time}`);
    }
  };

  const preventSelection = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (TimeInSec == 0) {
      setIsOpen1(true);
    }
  }, [TimeInSec]);

  const HandleDirectJump = (ind) => {
    const currentPartName = testData?.question_bank[tab - 1]?.part_name;
    const jumpPartName = testData?.question_bank[ind]?.part_name;
    if (currentPartName == jumpPartName) {
      setTab(ind + 1);
    } else {
      notification.open({
        message:
          "All questions from this sections are attempted, once the timer of this section completes you will be taken to the next section.",
        duration: 2,
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (DeviceId != "1211") {
      return;
    }

    const handleUnload = async (event) => {
      event.preventDefault();
      event.returnValue =
        "Your test has been paused here! come back to resume..";
      await saveTestData();
      return "";
    };

    const saveTestData = async () => {
      try {
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("question_dump", JSON.stringify(newArr));
        formData.append("test_series_id", test_series_id);
        formData.append(
          "time_spent",
          Number(testData?.question_bank[0]?.section_timing) * 60 - count
        );
        formData.append("state", 1);
        formData.append("last_view", LastView);
        formData.append("section_time_spent", count);
        formData.append("section_part_id", LastView);
        formData.append("cbt_device_type", "1211");

        await axiosInstance.post("/v2_data_model/save_test_series", formData);
      } catch (error) {
        console.error("Error saving test data:", error);
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [user_id, test_series_id, newArr, count, LastView]);

  const saveFormDataToLocalStorage = (formData) => {
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    localStorage.setItem("testdata", JSON.stringify(formObject));
  };

  //--------save test--------

  const saveTestData = async () => {
    if (!isNetwork) {
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("question_dump", JSON.stringify(newArr));
      formData.append("test_series_id", test_series_id);
      formData.append(
        "time_spent",
        Number(testData?.question_bank[0]?.section_timing) * 60 - count
      );
      formData.append("state", 1);
      formData.append("last_view", LastView);
      formData.append("section_time_spent", count);
      formData.append("section_part_id", LastView);
      formData.append("cbt_device_type", "1211");
      saveFormDataToLocalStorage(formData);
    } else {
      try {
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("question_dump", JSON.stringify(newArr));
        formData.append("test_series_id", test_series_id);
        formData.append(
          "time_spent",
          Number(testData?.question_bank[0]?.section_timing) * 60 - count
        );
        formData.append("state", 1);
        formData.append("last_view", LastView);
        formData.append("section_time_spent", count);
        formData.append("section_part_id", LastView);
        formData.append("cbt_device_type", "1211");
        saveFormDataToLocalStorage(formData);
        await axiosInstance.post("/v2_data_model/save_test_series", formData);
      } catch (error) {
        console.error("Error saving test data:", error);
      }
    }
  };

  //--------save test--------
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

  const handleSecBar = (currentSec, compareSec) => {
    if (currentSec != compareSec) {
      notification.open({
        message:
          "All questions from this sections are attempted, once the timer of this section completes you will be taken to the next section.",
        duration: 5,
      });
    }
  };

  useEffect(() => {
    const noSleep = new NoSleep();
    noSleep.enable();

    return () => {
      noSleep.disable();
    };
  }, []);

  //---save test------

  useEffect(() => {
    saveTestData();
  }, [userSelections]);

  //-----save test-------

  useEffect(() => {
    const CheckDevice = async () => {
      const res = await axiosInstance.post(
        "v2_data_model/get_check_device_type",
        { user_id: user_id, test_series_id: test_series_id }
      );
      setDeviceID(res?.data?.data?.cbt_device_type);
    };

    CheckDevice();
  }, []);

  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [imgurl, setimgurl] = useState("");

  const HandleImg = (e) => {
    if (e.target.tagName == "IMG") {
      setimgurl(e.target.src);
      setIsOpen2(true);
    }
  };

  if (DeviceId != "1211") {
    return <ResetTest user_id={user_id} test_series_id={test_series_id} />;
  } else {
    return (
      <>
        <div className="TestPanel">
          <div className="container">
            <div className="testcont">
              <div className="quecont">
                <h3 style={{ color: "red" }} className="redText">
                  ALERT: Don't click reload/refresh{" "}
                  <img
                    src="/reficon.png"
                    alt=""
                    style={{ margin: "0 3px", width: "28px" }}
                  />{" "}
                  this page otherwise your test will be restarted
                </h3>
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
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              {sectionArr?.map((data) => (
                                <Button
                                  style={{
                                    backgroundColor:
                                      que?.part_name == data.part_name
                                        ? "#071952"
                                        : "gray",
                                  }}
                                  onClick={() =>
                                    handleSecBar(
                                      que?.part_name,
                                      data?.part_name
                                    )
                                  }
                                >
                                  {" "}
                                  {que?.part_name == data.part_name ? (
                                    <FaLockOpen />
                                  ) : (
                                    <FaLock />
                                  )}{" "}
                                  {data.part_name}
                                </Button>
                              ))}
                            </div>
                            <h5>Q.{index + 1}</h5>
                            <h4 style={{ color: "red" }} className="redText">
                              {isOnline ? "" : "You are Offline!"}
                            </h4>
                            <div
                              className="question-container"
                              onClick={HandleImg}
                              title="Click to zoom!"
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: que.question,
                                }}
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
                        <div className="report">
                        <button
                          onClick={() =>{ setIsModalOpen(true); setTestqid(que.id); }}
                          style={{ cursor: "pointer", color: "red", }}
                        >
                          ! report error
                        </button>
                      <AntModal
                        title="Feedback/Report Error"
                        open={isModalOpen}
                        onCancel={handleCancel}
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


                      <AntModal
                        open={isSuccessModalOpen}
                        footer={null}
                        closable={false}
                        centered
                        styles={{body:{ textAlign: "center", padding: "20px" }}}
                        maskClosable={false}
                      >
                        <p>{successMessage}</p>
                      </AntModal>

                        </div>
                        <div>
                          <Modal
                            isOpen={modalIsOpen1}
                            onAfterOpen={afterOpenModal}
                            style={customStyles1}
                            contentLabel="Example Modal"
                          >
                            <h2
                              style={{ textAlign: "center", padding: "10px" }}
                            >
                              Exam Over!
                            </h2>
                            <h4 style={{ textAlign: "center" }}>
                              You have successfully completed the EXAM
                            </h4>

                            <div style={{ width: "100%", textAlign: "center" }}>
                              <button
                                style={{ width: "40%" }}
                                disabled={!isOnline}
                                className="modal-but"
                                onClick={handlefinal}
                              >
                                {isOnline ? (
                                  resultload ? (
                                    "Review Result"
                                  ) : (
                                    <Spinner />
                                  )
                                ) : (
                                  "Connect to Internet!"
                                )}
                              </button>
                            </div>
                          </Modal>
                        </div>

                        <div className="bottom-nav">
                          <Button onClick={handlePrev} disabled={disableNav}>
                            Prev
                          </Button>

                          <button onClick={() => handleMark(index + 1)}>
                            {allmarked.includes(index + 1)
                              ? "UnMark"
                              : " Mark for review"}
                          </button>

                          <Button
                            onClick={() =>{ handleNext(index + 1)
                            }}
                            disabled={disableNav}
                          >
                            {testData?.question_bank.length > tab
                              ? "Next"
                              : "Finish"}
                          </Button>
                          {/* Unselect button - only shows when an option is selected */}
                          {selectedOptions[tab] && (
                            <div
                              style={{
                                marginTop: "10px",
                                textAlign: "center",
                              }}
                            >
                              <Button
                                className="unselectOptBtn"
                                variant="danger"
                                onClick={() => handleUnselectOption(que.id)}
                              >
                                Unselect Option
                              </Button>
                            </div>
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
                  <div
                    className={
                      testData?.question_bank.length > 50
                        ? "reviewQues"
                        : "revisionTest"
                    }
                  >
                    {testData?.question_bank.map((que, index) => (
                      <button
                        className={
                          selectedOptions &&
                          selectedOptions[index + 1] &&
                          allmarked.includes(index + 1)
                            ? "attemp-selected"
                            : "que-no-box"
                        }
                        key={que.id}
                        style={{
                          backgroundColor:
                            !allmarked.includes(index + 1) &&
                            selectedOptions &&
                            selectedOptions[index + 1] === undefined &&
                            skip.includes(index + 1)
                              ? "#FF0F17"
                              : selectedOptions &&
                                selectedOptions[index + 1] &&
                                allmarked.includes(index + 1)
                              ? "#0c7e0c"
                              : allmarked.includes(index + 1)
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
                        onClick={() => HandleDirectJump(index)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexFlow: "wrap",
                  }}
                >
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

                <span
                role="button"
              aria-disable={queLoad}
                className={
                  isOnline &&
                  testData?.question_bank.length < tab &&
                  timeLeft === 0
                    ? `submitBtn`
                    : `offlineBtn`
                }
                onClick={!queLoad ? handleSubmit:undefined}
              >
                {isOnline
                  ? testData?.question_bank.length < tab &&
                    timeLeft === 0
                    ? `SUBMIT`
                    : `Complete All Sections`
                  : `You are Offline`}
              </span>
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
        </div>
      </>
    );
  }
};

export default PausedNursingPanel;
