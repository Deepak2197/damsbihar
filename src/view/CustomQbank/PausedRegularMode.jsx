import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaBookmark, FaCircle, FaRegBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "react-modal";
import '../../components/Test_Series/Testpanel.css'
import { Button } from "react-bootstrap";
import axiosInstance from "../../API/axiosConfig";




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

Modal.setAppElement("#root");

const PausedRegularMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user_id = id.split("t")[0];
  const test_series_id = id.split("t")[1];
  const [testData, setTestData] = useState(null);
  const [tab, setTab] = useState(1);
  const [totaltime, settotaltime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [disableNav, setDisableNav] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [allmarked, setallmarked] = useState([]);
  const [userSelections, setUserSelections] = useState([]);
  const [Attempted, setAttempted] = useState(null);
  const [UnAttempted, setUnAttempted] = useState(null);
  const [marked, setMarked] = useState(null);
  const [correctOption, setCorrectOption] = useState({});
  const [bookmarked,setbookmark] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [LastQid,setLastQid]= useState(null);
  const [LastView,setLastView] = useState(null);
  const [qdump,setquedump] = useState([]);


  const fetchdata = async () => {
    try {
      const response = await axiosInstance.post(
        `/v2_data_model/get_test_series_with_id_app_new`,
        { user_id: user_id, test_id: test_series_id }
      );
      setTestData(response?.data?.data);
      setLastQid(response?.data?.data?.active_ques);
      setLastView(response?.data?.data?.active_ques);
      settotaltime(Number(response?.data?.data?.basic_info?.time_in_mins));
      setTimeLeft(Number(response?.data?.data?.basic_info?.time_in_mins) * 60);
      setquedump(response?.data?.data?.question_dump)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);


  // console.log(testData);


  const handleOptionClick = (option, optionNo, quesid, correctAns, desc,percent) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [tab]: option,
      [`desc_${tab}`]: desc,
      [`percent_${tab}`]: percent,
    }));

    const existingIndex = userSelections.findIndex(
      (selection) => selection.quesid == quesid
    );
    let lastview = quesid;
    setLastView(lastview);
    // console.log(lastview)

    const newSelection = {
      is_correct: optionNo === correctAns ? 1 : 0,
      optionTicked: optionNo,
      quesid: quesid,
    };

    if (existingIndex !== -1) {
      const updatedSelections = [...userSelections];
      updatedSelections[existingIndex] = newSelection;
      setUserSelections(updatedSelections);
    } else {
      setUserSelections([...userSelections, newSelection]);
    }

    setCorrectOption({ ...correctOption, [tab]: correctAns });
    // console.log(newSelection);
  };

  useEffect(() => {
    if (testData && testData.question_dump) {
      const updatedSelectedOptions = {};

      testData.question_dump.forEach((question) => {
        // Extract the question ID and the selected option
        const { question_id, answer } = question;
        
        // Find the corresponding question in testData.question_bank
        const questionIndex = testData.question_bank.findIndex((que) => que.id == question_id);
        
        if (questionIndex !== -1) {
          // Select the option based on the answer from question_dump
          updatedSelectedOptions[questionIndex + 1] = testData.question_bank[questionIndex][`option_${answer}`];
        }
      });
  // console.log(updatedSelectedOptions);
      setSelectedOptions(updatedSelectedOptions);

      const index = testData?.question_dump?.findIndex(obj => obj.question_id == LastQid);
// console.log(index);
setTab(index+1);
    }
  }, [testData]);
 
// console.log(selectedOptions);
  const handleMark = (opt) => {
    if (!allmarked.includes(opt)) {
      setallmarked((prev) => [opt, ...prev]);
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

    if (timeLeft === 0) {
      window.alert("Session Expired!");
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleSubmit = async () => {
   
    setUnAttempted(testData?.question_bank.length - userSelections.length);
    setMarked(allmarked.length);
    setIsOpen(true);
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const attemptedMap = userSelections.reduce((acc, ans) => {
    acc[ans.quesid] = ans;
    return acc;
  }, {});

  const newArr = testData?.question_bank.map((question, index) => ({
    order: index + 1,
    question_id: question.id,
    answer: attemptedMap[question.id] ? attemptedMap[question.id].optionTicked.toString() : "",
    onscreen: 5,
    guess: 0,
    review: 0,
    part: "",
    section_id: 0,
    unanswered: attemptedMap[question.id] ? "1" : "",
  }));

  // console.log(newArr);

  newArr?.forEach((item) => {
    const foundItem = qdump.find((q) => q.question_id === item.question_id);

    if (foundItem && foundItem.answer) {
      item.answer = foundItem.answer;
    }
  });
  
  useEffect(()=>{

    let nonEmptyAnswerCount = 0;
    newArr?.forEach(obj => {
      // Check if the 'answer' field is not empty
      if (obj.answer !== "") {
          // Increment the counter
          nonEmptyAnswerCount++;
      }
  });
  
  setAttempted(nonEmptyAnswerCount);
  },[newArr])

  const handleFinal = async () => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("question_dump", JSON.stringify(newArr));
    formData.append("test_series_id", test_series_id);
    formData.append("time_spent", Number(totaltime * 60 - timeLeft).toFixed(0));
    formData.append("state", "0");
    formData.append("last_view", "171945");

    const response = await axiosInstance.post(
      "/v2_data_model/save_quiz_new",
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
      navigate(`/testresult/dq/${user_id}s${response.data.data.id}`);
    }
  };

  

  const handleBookmark = (tabNumber) => {
    if (!bookmarks.includes(tabNumber)) {
      setBookmarks([...bookmarks, tabNumber]);
    } else {
      setBookmarks(bookmarks.filter((bookmark) => bookmark !== tabNumber));
    }
  };



  const handleNext = () => {
    if (tab < testData?.question_bank.length - 1) {
      setTab((prevTab) => prevTab + 1);
    }
  };

  const handlePrev = () => {
    if (tab > 1) {
      setTab((prevTab) => prevTab - 1);
    }
  };



  useEffect(() => {
    const handleUnload = async (event) => {
      event.preventDefault();
      event.returnValue = ''; // Prompt the user with a confirmation dialog

      // Save test data when the user closes the window or the system shuts down
      await saveTestData();

      return ''; // Required for Chrome
    };

    const saveTestData = async () => {
      try {
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("question_dump", JSON.stringify(newArr));
        formData.append("test_series_id", test_series_id);
        formData.append("time_spent", Number(totaltime * 60 - timeLeft).toFixed(0));
        formData.append("state", 1); // Assuming '1' represents an incomplete state
        formData.append("last_view", LastView);

        // Send a POST request with the FormData object
        await axiosInstance.post("v2_data_model/save_quiz_new", formData);
      } catch (error) {
        console.error('Error saving test data:', error);
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [user_id, test_series_id, newArr]);


  return (
    <>
      <div className="TestPanel">
        <div className="container">
          <div className="testcont">
            <div className="quecont">
              <div className="stopwatch">
              </div>

              <h4 style={{}}>
                {testData?.basic_info?.test_series_name}
              </h4>
              {testData?.question_bank?.map((que, index) => (
                <>
                  {tab === index + 1 && (
                    <>
                      <div className="groupwith">
                        
                        <div style={{ width: "70%" }}>
                          <div style={{display:'flex',justifyContent:'space-between'}}>
                          <h5>Q.{index + 1}</h5>
                          {
                            bookmarks.includes(tab)?<FaBookmark  onClick={() => handleBookmark(tab)}/>: <FaRegBookmark  onClick={() => handleBookmark(tab)}/>
                          }
                      
                          
                          </div>
                        
                          <div dangerouslySetInnerHTML={{ __html: que.question }} />
                          {[que.option_1, que.option_2, que.option_3, que.option_4].map((option, i) => (
                            <div
                              key={i + 1}
                              className="optionlist"
                              // style={{
                              //   backgroundColor:
                              //     selectedOptions[tab] == option
                              //       ? "red"
                              //       : correctOption[tab] == i + 1
                              //       ? "green"
                              //       : "white"
                              // }}


                              style={{
                                backgroundColor: (() => {
                                  const options = [que.option_1, que.option_2, que.option_3, que.option_4];
                                  const currentOption = options[correctOption[tab] - 1];
                              
                                  if (selectedOptions[tab] == option && selectedOptions[tab] === currentOption) {
                                    return 'green';
                                  } else if (selectedOptions[tab] == option) {
                                    return 'red';
                                  } else if (currentOption == option) {
                                    return 'green';
                                  } else {
                                    return 'white';
                                  }
                                })()
                              }}
                              onClick={() =>
                                handleOptionClick(
                                  option,
                                  i + 1,
                                  que.id,
                                  que.answer,
                                  que.description,
                                  que.correct_attempt_percentage
                                )
                              }
                            >
                              <h5 className="optionNo">{String.fromCharCode(65 + i)}</h5>
                              <div dangerouslySetInnerHTML={{ __html: option }} />
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
                              <button className="modal-but" onClick={closeModal}>
                                Cancel
                              </button>
                              <button className="modal-but" onClick={handleFinal}>
                                Submit
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    {
                     selectedOptions[`percent_${tab}`] && (
                      <div dangerouslySetInnerHTML={{ __html: `Correct Attempted ${selectedOptions[`percent_${tab}`]}%`}} style={{margin:'10px'}}/> 
                     )
                    }
                     
<div dangerouslySetInnerHTML={{ __html: selectedOptions[`desc_${tab}`] }} style={{maxHeight:'30vh',overflowY:'scroll',marginTop:'10px'}}/> 

                    

                      <div className="bottom-nav">
                        <Button

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
                        
                          onClick={handleNext}
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
                <h4
                  style={{}}
                >
                  Review Questions
                </h4>
                <div className="reviewQues">

                  {testData?.question_bank.map((que, index) => (
                    <button
                      className="que-no-box"
                      key={que.id}
                      style={{
                        backgroundColor: allmarked.includes(index + 1)
                          ? "blue"
                          : selectedOptions && selectedOptions[index + 1]
                          ? "green"
                          : "#d3d3d3",
                        textAlign: "center",
                        padding: "5px",
                        minWidth: "40px",
                        color: "white",
                        borderRadius: "4px"
                      }}
                      disabled={disableNav}
                      onClick={() => setTab(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-around' }}>

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


              <span className="submitBtn"
                style={{}}
                onClick={handleSubmit}
              >
                SUBMIT
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PausedRegularMode;

