import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCircle, FaLock, FaLockOpen } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { Button, ModalBody, Spinner } from "react-bootstrap";
import { notification, Modal as AntModal, Radio, Input } from "antd";
import axiosInstance from "../../API/axiosConfig";
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

// Bind modal to appElement
Modal.setAppElement("#root");

const NursingPanel = () => {
  const { id } = useParams();
  const user_id = id.split("t")[0];
  const test_series_id = id.split("t")[1];
  const [subjectId, setSubjectid] = useState();
  const [subjectName, setSubjetname] = useState();
  const navigate = useNavigate();
  const [testData, setTestData] = useState(null);
  const [tab, setTab] = useState(() => {
    return (
      parseInt(localStorage.getItem(`currentQuestion_${test_series_id}`)) || 1
    );
  });
  const [totaltime, settotaltime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const [disableNav, setDisableNav] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const saved = localStorage.getItem(`selectedOptions_${test_series_id}`);
    return saved ? JSON.parse(saved) : {};
  });
  const [selecttestquid, setTestqid] = useState();
  const [allmarked, setallmarked] = useState([]);
  const [quesArray, setQuesArray] = useState([]);
  const [sectionArr, setSecArr] = useState([]);
  const [modalIsOpen1, setIsOpen1] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [resultload, setresultload] = useState(true);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(() => {
    return (
      parseInt(localStorage.getItem(`currentSection_${test_series_id}`)) || 0
    );
  });
  
  const [sectionTimes, setSectionTimes] = useState(() => {
    const saved = localStorage.getItem(`sectionTimes_${test_series_id}`);
    return saved ? JSON.parse(saved) : {};
  });
  // console.log(sectionTimes[currentSectionIndex]);
  const localtimeSpent = sectionTimes[currentSectionIndex];

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSaving, setIsSaving] = useState(false);
  const [count, setCount] = useState(0);

  const toggleFullScreen = () => {
    const docElm = document.documentElement;
    if (!document.fullscreenElement) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullscreen) {
        docElm.webkitRequestFullscreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

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
        "/v2_data_model/get_test_question_data/",
        { user_id: user_id, test_series_id: test_series_id }
      );
      setSubjectid(response?.data.data?.question_bank[0]?.subject_id);
      setSubjetname(response?.data?.data?.question_bank[0]?.subject_name);
      setTestData(response?.data?.data);
      settotaltime(Number(response?.data?.data?.basic_info?.time_in_mins));
      const questionsArray = Object.values(
        response?.data?.data?.question_bank || {}
      ).map((question) => question.question);
      setQuesArray(questionsArray);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const getSec = async () => {
    try {
      const response = await axiosInstance.post(
        "/v2_data_model/nurshing_test_instruction",
        { user_id: user_id, test_id: test_series_id }
      );
      const sections = response?.data?.data?.section || [];
      setSecArr(sections);

      // Initialize section times
      const initialSectionTimes = sections.reduce((acc, section, index) => {
        const savedTime = localStorage.getItem(
          `sectionTimes_${test_series_id}`
        );
        const parsedTimes = savedTime ? JSON.parse(savedTime) : {};
        acc[index] =
          parsedTimes[index] !== undefined
            ? parsedTimes[index]
            : Number(section.section_timing) * 60;
        return acc;
      }, {});
      setSectionTimes(initialSectionTimes);

      // Set initial timeLeft for the current section
      setTimeLeft(
        initialSectionTimes[currentSectionIndex] ||
          Number(sections[0]?.section_timing) * 60
      );
    } catch (err) {
      console.error("Error fetching sections:", err);
    }
  };

  useEffect(() => {
    fetchdata();
    getSec();
    toggleFullScreen();
  }, []);

  // Save tab and section to local storage
  useEffect(() => {
    localStorage.setItem(`currentQuestion_${test_series_id}`, tab);
    localStorage.setItem(
      `currentSection_${test_series_id}`,
      currentSectionIndex
    );
  }, [tab, currentSectionIndex, test_series_id]);

  // Save selectedOptions to local storage
  useEffect(() => {
    localStorage.setItem(
      `selectedOptions_${test_series_id}`,
      JSON.stringify(selectedOptions)
    );
  }, [selectedOptions, test_series_id]);

  // Save section times to local storage
  useEffect(() => {
    localStorage.setItem(
      `sectionTimes_${test_series_id}`,
      JSON.stringify(sectionTimes)
    );
  }, [sectionTimes, test_series_id]);

  const [userSelections, setUserSelections] = useState(() => {
    const saved = localStorage.getItem(`userSelections_${test_series_id}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [skip, setSkip] = useState([]);

  const getNumberOfQuestions = (partName) => {
    const section = sectionArr?.find((sec) => sec.part_name === partName);
    return section ? Number(section.no_of_questions) : 0;
  };

  const getSectionStartIndex = (sectionIndex) => {
    return sectionArr
      .slice(0, sectionIndex)
      .reduce((acc, sec) => acc + getNumberOfQuestions(sec.part_name), 0);
  };

  const handleNext = (opt) => {
    setTestqid();
    setSkip((skip) => [...skip, opt]);
    const currentPartName = testData?.question_bank[tab - 1]?.part_name;
    const nextPartName = testData?.question_bank[tab]?.part_name;

    if (
      currentPartName === nextPartName &&
      tab < testData?.question_bank.length
    ) {
      setTab((prevTab) => prevTab + 1);
    } else {
      notification.open({
        message:
          "Please wait until the section timer expires to move to the next section.",
        duration: 3,
      });
    }
  };

  const handlePrev = () => {
    const currentPartName = testData?.question_bank[tab - 1]?.part_name;
    const prevPartName = testData?.question_bank[tab - 2]?.part_name;

    if (currentPartName === prevPartName && tab > 1) {
      setTab((prevTab) => prevTab - 1);
    } else {
      notification.open({
        message: "Cannot move to previous section!",
        duration: 3,
      });
    }
  };

  const HandleDirectJump = (ind) => {
    const currentPartName = testData?.question_bank[tab - 1]?.part_name;
    const jumpPartName = testData?.question_bank[ind]?.part_name;

    if (currentPartName === jumpPartName) {
      setTab(ind + 1);
    } else {
      notification.open({
        message:
          "Cannot jump to another section until the current section timer expires.",
        duration: 5,
      });
    }
  };

  const handleOptionClick = (option, optionNo, qid, correctAns) => {
    setTestqid(qid);
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [tab]: option,
    }));

    const existingIndex = userSelections.findIndex(
      (selection) => selection.qid === qid
    );

    const newSelection = {
      is_correct: optionNo === correctAns ? 1 : 0,
      optionTicked: optionNo.toString(), // Ensure string for consistency
      qid: qid,
    };

    let updatedSelections;
    if (existingIndex !== -1) {
      updatedSelections = [...userSelections];
      updatedSelections[existingIndex] = newSelection;
    } else {
      updatedSelections = [...userSelections, newSelection];
    }
    setUserSelections(updatedSelections);
    localStorage.setItem(
      `userSelections_${test_series_id}`,
      JSON.stringify(updatedSelections)
    );

    // Update testdata with new question_dump
    const newArr = constructNewArr(updatedSelections);
    updateTestDataInLocalStorage(newArr);
  };

  const handleUnselect = () => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = { ...prevSelectedOptions };
      delete newSelectedOptions[tab];
      return newSelectedOptions;
    });

    const currentQid = testData?.question_bank[tab - 1]?.id;
    const updatedSelections = userSelections.filter(
      (selection) => selection.qid !== currentQid
    );
    setUserSelections(updatedSelections);
    localStorage.setItem(
      `userSelections_${test_series_id}`,
      JSON.stringify(updatedSelections)
    );

    // Update testdata with new question_dump
    const newArr = constructNewArr(updatedSelections);
    updateTestDataInLocalStorage(newArr);
  };

  const handleMark = (opt) => {
    if (!allmarked.includes(opt)) {
      setallmarked([opt, ...allmarked]);
    } else {
      setallmarked(allmarked.filter((item) => item !== opt));
    }
  };

  // Timer logic for sections
  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          setSectionTimes((prev) => ({
            ...prev,
            [currentSectionIndex]: newTimeLeft,
          }));
          return newTimeLeft;
        });
      }, 1000);
    } else if (sectionTimes[currentSectionIndex] === 0 && !isSaving) {
      // Save data when section timer expires
      setIsSaving(true);
      saveTestData().then(() => {
        if (currentSectionIndex < sectionArr.length - 1) {
          // Move to next section
          const nextSectionIndex = currentSectionIndex + 1;
          const nextSectionStartIndex =
            getSectionStartIndex(nextSectionIndex) + 1;
          setCurrentSectionIndex(nextSectionIndex);
          setTab(nextSectionStartIndex);
          setTimeLeft(
            Number(sectionArr[nextSectionIndex]?.section_timing) * 60
          );
          setSectionTimes((prev) => ({
            ...prev,
            [nextSectionIndex]:
              Number(sectionArr[nextSectionIndex]?.section_timing) * 60,
          }));
        } else {
          // Last section completed
          setIsOpen1(true);
        }
        setIsSaving(false);
      });
    }

    return () => clearInterval(interval);
  }, [
    isRunning,
    timeLeft,
    currentSectionIndex,
    sectionArr,
    testData,
    isSaving,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  // Periodic auto-save every 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (testData?.question_bank && !isSaving) {
        setIsSaving(true);
        saveTestData().then(() => setIsSaving(false));
      }
    }, 60 * 1000); // 1 minute

    return () => clearInterval(interval);
  }, [testData, isSaving]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleSubmit = async () => {
    if (!isOnline) {
      notification.open({
        message: "You are offline!",
        duration: 3,
      });
      return;
    }
    if (currentSectionIndex < sectionArr.length - 1 || timeLeft > 0) {
      notification.open({
        message:
          "Test cannot be submitted until all section timers are complete!",
        duration: 3,
      });
      return;
    }
    setIsOpen1(true);
  };

  let subtitle;

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  const constructNewArr = (selections = userSelections) => {
    if (!testData?.question_bank) {
      //console.warn("testData.question_bank is not available");
      return [];
    }
    const attemptedMap = selections.reduce((acc, ans) => {
      acc[ans.qid] = ans;
      return acc;
    }, {});

    return testData.question_bank.map((question, index) => ({
      order: index + 1,
      question_id: question.id,
      answer: attemptedMap[question.id]
        ? attemptedMap[question.id].optionTicked
        : "",
      onscreen: 5,
      guess: 0,
      review: allmarked.includes(index + 1) ? 1 : 0,
      part: question?.part,
      section_id: question?.section_id,
      unanswered: attemptedMap[question.id] ? "1" : "",
    }));
  };

  const updateTestDataInLocalStorage = (newArr) => {
    const formData = constructFormData(newArr);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    localStorage.setItem(
      `testdata_${test_series_id}`,
      JSON.stringify(formObject)
    );
  };

  testData?.question_bank?.forEach((item) => {
    let section = sectionArr?.find((section) => section.id == item.part);
    if (section) {
      item.part_name = section.part_name;
      item.section_timing = section.section_timing;
    }
  });

  const handlefinal = async () => {
    setresultload(false);
    const formData = new FormData();
    const newArr = constructNewArr();

    formData.append("user_id", user_id);
    formData.append("question_dump", JSON.stringify(newArr));
    formData.append("test_series_id", test_series_id);
    formData.append("time_spent", totaltime * 60);
    formData.append("state", "0");
    formData.append("last_view", "");
    formData.append("section_time_spent", "0");
    formData.append("section_part_id", "0");

    try {
      const response = await axiosInstance.post(
        "/v2_data_model/save_test_series",
        formData
      );
      // toast.success("Test completed successfully!", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });

      setresultload(true);
      if (response?.data?.data?.result_time === "") {
        navigate(`/testresult/nur/${user_id}s${response?.data?.data?.id}`);
      } else {
        navigate(`/testwait/${response?.data?.data?.result_time}`);
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      setresultload(true);
      notification.error({
        message: "Failed to submit test",
        duration: 3,
      });
    }

    // Clear local storage on test submission
    localStorage.removeItem(`currentQuestion_${test_series_id}`);
    localStorage.removeItem(`selectedOptions_${test_series_id}`);
    localStorage.removeItem(`sectionTimes_${test_series_id}`);
    localStorage.removeItem(`userSelections_${test_series_id}`);
    localStorage.removeItem(`currentSection_${test_series_id}`);
    localStorage.removeItem(`testdata`);
  };

  const saveTestData = async () => {
    if (!isOnline || isSaving) return;

    try {
      const savedFormData = localStorage.getItem(`testdata_${test_series_id}`);
      let formData = new FormData();
      const newArr = constructNewArr();

      if (savedFormData) {
        try {
          const parsedFormData = JSON.parse(savedFormData);
          if (parsedFormData && typeof parsedFormData === "object") {
            Object.keys(parsedFormData).forEach((key) => {
              formData.append(key, parsedFormData[key]);
            });
            // Correct invalid question_dump
            if (
              !parsedFormData.question_dump ||
              parsedFormData.question_dump === "[]" ||
              parsedFormData.question_dump === "undefined"
            ) {
              formData.set("question_dump", JSON.stringify(newArr));
            }
            // Correct time_spent
            if (
              isNaN(parsedFormData.time_spent) ||
              parsedFormData.time_spent === "0"
            ) {
              formData.set("time_spent",           Number(testData?.question_bank[0]?.section_timing) * 60 - count
              );
              // formData.set(
              //   "time_spent",
              //   Number(sectionArr[currentSectionIndex]?.section_timing || 0) *
              //     60 -
              //     timeLeft
              // );
            }
            // Correct section_time_spent
            if (
              parsedFormData.section_time_spent === "null" ||
              isNaN(parsedFormData.section_time_spent)
            ) {
              formData.set("section_time_spent", count);
            }
            // Correct section_part_id
            if (!parsedFormData.section_part_id) {
              formData.set(
                "section_part_id",
                sectionArr[currentSectionIndex]?.id || ""
              );
            }
          } else {
            throw new Error("Invalid testdata format");
          }
        } catch (error) {
          console.error("Error parsing testdata:", error);
          formData = constructFormData(newArr);
        }
      } else {
        formData = constructFormData(newArr);
      }

      saveFormDataToLocalStorage(formData);
      await axiosInstance.post("/v2_data_model/save_test_series", formData);
      notification.success({
       // message: "Section data saved successfully",
        duration: 2,
      });
    } catch (error) {
      console.error("Error saving test data:", error);
      notification.error({
        message: "Failed to save section data",
        duration: 3,
      });
    }
  };

  const constructFormData = (newArr) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("question_dump", JSON.stringify(newArr));
    formData.append("test_series_id", test_series_id);
    formData.append("time_spent",           Number(testData?.question_bank[0]?.section_timing) * 60 - count);
    // formData.append(
    //   "time_spent",
    //   Number(sectionArr[currentSectionIndex]?.section_timing || 0) * 60 -
    //     timeLeft
    // );
    formData.append("state", "1");
    formData.append("last_view", tab.toString());
    formData.append("section_time_spent", count)
    formData.append(
      "section_part_id",
      sectionArr[currentSectionIndex]?.id || ""
    );
    formData.append("cbt_device_type", "1211");
    return formData;
  };

  const saveFormDataToLocalStorage = (formData) => {
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    localStorage.setItem(
      `testdata_${test_series_id}`,
      JSON.stringify(formObject)
    );
  };

  useEffect(() => {
    const handleUnload = async (event) => {
      event.preventDefault();
      event.returnValue =
        "Your test has been paused here! come back to resume..";
      if (testData?.question_bank && !isSaving) {
        setIsSaving(true);
        await saveTestData();
        setIsSaving(false);
      }
      return "";
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [testData, timeLeft, tab, currentSectionIndex, userSelections, isSaving]);

  const handleSecBar = (currentSec, compareSec) => {
    if (currentSec !== compareSec) {
      notification.open({
        message:
          "Cannot switch sections until the current section timer expires.",
        duration: 2,
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

  const [imgurl, setimgurl] = useState("");

  const HandleImg = (e) => {
    if (e.target.tagName === "IMG") {
      setimgurl(e.target.src);
      setIsOpen2(true);
    }
  };

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
        title: selecttestquid,
        description: feedback,
        category: selectedCategory,
        test_type: 0,
        subject_name: subjectName,
        subject_id: subjectId,
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
        duration: 3,
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setFeedback("");
  };

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

              <h4>{testData?.basic_info?.test_series_name}</h4>
              {testData?.question_bank?.map((que, index) => (
                <React.Fragment key={que.id}>
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
                            {sectionArr?.map((data, idx) => (
                              <Button
                                key={data.id}
                                style={{
                                  backgroundColor:
                                    que?.part_name === data.part_name
                                      ? "#071952"
                                      : "gray",
                                }}
                                onClick={() =>
                                  handleSecBar(que?.part_name, data.part_name)
                                }
                                disabled={idx !== currentSectionIndex}
                              >
                                {que?.part_name === data.part_name ? (
                                  <FaLockOpen />
                                ) : (
                                  <FaLock />
                                )}{" "}
                                {data.part_name}
                              </Button>
                            ))}
                          </div>
                          <h5>Q.{index + 1}</h5>
                          <h4 style={{ color: "red" }}>
                            {isOnline ? "" : "You are Offline!"}
                          </h4>

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
                          contentLabel="Exam Over Modal"
                        >
                          <h2 style={{ textAlign: "center", padding: "10px" }}>
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
                        <Button
                          onClick={handlePrev}
                          disabled={disableNav || tab === 1}
                        >
                          Prev
                        </Button>

                        <button onClick={() => handleMark(index + 1)}>
                          {allmarked.includes(index + 1)
                            ? "UnMark"
                            : "Mark for review"}
                        </button>

                        {selectedOptions[tab] && (
                          <button onClick={handleUnselect}>Unselect</button>
                        )}

                        <Button
                          onClick={() => handleNext(index + 1)}
                          disabled={
                            disableNav || tab === testData?.question_bank.length
                          }
                        >
                          {testData?.question_bank.length > tab
                            ? "Next"
                            : "Finish"}
                        </Button>
                      </div>
                    </>
                  )}
                </React.Fragment>
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
                      disabled={
                        disableNav ||
                        que.part_name !==
                          testData?.question_bank[tab - 1]?.part_name
                      }
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
                className={
                  isOnline &&
                  currentSectionIndex === sectionArr.length - 1 &&
                  timeLeft === 0
                    ? `submitBtn`
                    : `offlineBtn`
                }
                onClick={handleSubmit}
                style={{cursor:"pointer"}}
              >
                {isOnline
                  ? currentSectionIndex === sectionArr.length - 1 &&
                    timeLeft === 0
                    ? `SUBMIT`
                    : `Complete All Sections`
                  : `You are Offline`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen2}
        onAfterOpen={afterOpenModal}
        style={customStyles2}
        contentLabel="Image Zoom Modal"
      >
        <ModalBody>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button className="closeCUrsor" onClick={() => setIsOpen2(false)}>
              X
            </Button>
            <img src={imgurl} style={{ height: "400px", width: "100%" }} />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default NursingPanel;
