import { Button, Radio } from "antd";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../API/axiosConfig";
import "../../assets/css/bookmark/style.css";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const CreateTest = () => {
  const [noque, setnoque] = useState(10);
  const [level, setlevel] = useState("1");
  const [from, setfrom] = useState(1);
  const [step, setstep] = useState(1);
  const [allselected, setallselected] = useState(true);
  const [allsub, setallsub] = useState([]);
  const [visibleSubjectId, setVisibleSubjectId] = useState(null);
  // const course_id =localStorage.getItem("course_Id");
  const course_id = 385;
  const user_id = sessionStorage.getItem("id");

  const [selectedIds, setSelectedIds] = useState("");
  const [myselectid, setmyselectid] = useState("");
  const [myselectid1, setmyselectid1] = useState("");
  const [topid, settopid] = useState("");
  const [mode, setmode] = useState(1);
  const Navigate = useNavigate();
  const getAllTopicIds = (subjects) => {
    // Flatten all topic IDs into a single array
    const allTopicIds = subjects.flatMap((subject) =>
      subject.topics.map((topic) => topic.id)
    );

    // Join the IDs into a comma-separated string
    return allTopicIds.join(",");
  };

  useEffect(() => {
    const getsubjects = async () => {
      const res = await axiosInstance.post(
        API_ENDPOINTS.CUSTOM_QBANK.SUBJECT_V2,
        { user_id: user_id }
      );
      setallsub(res?.data?.data);

      const allIds = res?.data?.data?.map((subject) => subject.id).join(",");
      const alltopid = res?.data?.data
        ?.map((subject) => subject.topicid)
        .join(",");
      setSelectedIds(allIds);
      settopid(alltopid);
    };
    getsubjects();
    // When the component mounts, check all checkboxes and store their IDs
  }, [allselected]);

  const handleCheckboxChange1 = (id) => {
    setmyselectid((prev) => {
      if (!prev) {
        // If `prev` is empty, just return the `id` as the first value
        return id;
      }
      const idsArray = prev.split(",");
      if (idsArray.includes(id)) {
        // Remove the ID if it's already in the list
        return idsArray.filter((item) => item !== id).join(",");
      } else {
        // Add the new ID
        return [...idsArray, id].join(",");
      }
    });
  };

  const handleCheckboxChange2 = (id) => {
    setmyselectid1((prev) => {
      if (!prev) {
        // If `prev` is empty, just return the `id` as the first value
        return id;
      }
      const idsArray = prev.split(",");
      if (idsArray.includes(id)) {
        // Remove the ID if it's already in the list
        return idsArray.filter((item) => item !== id).join(",");
      } else {
        // Add the new ID
        return [...idsArray, id].join(",");
      }
    });
  };

  const handleCheckboxChange = (id, tid) => {
    setSelectedIds((prev) => {
      if (!prev) {
        return id;
      }
      const idsArray = prev.split(",");
      if (idsArray.includes(id)) {
        return idsArray.filter((item) => item !== id).join(",");
      } else {
        return [...idsArray, id].join(",");
      }
    });

    settopid((prev) => {
      if (!prev) {
        return tid;
      }
      const idsArray = prev.split(",");
      if (idsArray.includes(tid)) {
        return idsArray.filter((item) => item !== tid).join(",");
      } else {
        return [...idsArray, tid].join(",");
      }
    });
  };

  const handleSeeTopics = (subjectId, topics) => {
    setVisibleSubjectId((prev) => (prev === subjectId ? null : subjectId));
    // const allIds = ?.map(subject => subject.id).join(',');
  };

  // console.log("subjects--",myselectid);
  // console.log("topics--",myselectid1);

  const handleCreate = async () => {
    if (allselected) {
      const res = await axiosInstance.post(API_ENDPOINTS.CUSTOM_QBANK.CREATE_QBANK_NEW, {
        user_id: user_id,
        no_of_ques: noque,
        defficulty_lvl: level,
        ques_from: from,
        subject: selectedIds,
        topics: getAllTopicIds(allsub),
        mode: mode,
        tags: "",
        course_id: JSON.parse(course_id),
      });
      if (res?.data?.data?.id) {
        Navigate(`/topic-share/${res?.data?.data?.id}`);
      } else {
        alert("test not found!");
      }
    } else {
      const res = await axiosInstance.post(API_ENDPOINTS.CUSTOM_QBANK.CREATE_QBANK_NEW, {
        user_id: user_id,
        no_of_ques: noque,
        defficulty_lvl: level,
        ques_from: from,
        subject: myselectid,
        topics: myselectid1,
        mode: mode,
        tags: "",
        course_id: JSON.parse(course_id),
      });
      if (res?.data?.data?.id) {
        Navigate(`/topic-share/${res?.data?.data?.id}`);
      } else {
        alert("test not found!");
      }
    }
  };

  const [difficulty, setDifficulty] = useState("all");
  const [questionSource, setQuestionSource] = useState("all-qbank");

  return (
    <div className="customQBank">
      <div className="container">
        <div className="qbankInnerNew">
          {step == 1 && (
            <div className="qBankOptionPart">
              {/* <h3 style={{marginTop:'5px'}}>Create Custom Test</h3> */}
              <div className="qsnNumber">
                <h4>Question 1 of 20</h4>
                <select onChange={(e) => setnoque(e.target.value)}>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              {/* <div className="naPillsTab">
                <div className="setdiffiLevel">
                  <div className="difLevel">
                    <h2>
                      <img
                        src={`${window.IMG_BASE_URL}/custom_qbank/level.svg`}
                      />{" "}
                      Difficulty Level
                    </h2>
                    <h2>
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/qbank/diff.svg`}
                      />{" "}
                      Difficulty Level
                    </h2>
                  </div>

                  <div className="inputSection">
                    <p>
                      <input
                        type="radio"
                        id="test1"
                        name="difficulty-group"
                        checked={difficulty === "all"}
                        onChange={() => setDifficulty("all")}
                      />
                      <label htmlFor="test1">
                        <span>All</span>
                      </label>
                    </p>
                    <p>
                      <input
                        type="radio"
                        id="test2"
                        name="difficulty-group"
                        checked={difficulty === "easy"}
                        onChange={() => setDifficulty("easy")}
                      />
                      <label htmlFor="test2">
                        <span>Easy</span>
                      </label>
                    </p>
                    <p>
                      <input
                        type="radio"
                        id="test3"
                        name="difficulty-group"
                        checked={difficulty === "medium"}
                        onChange={() => setDifficulty("medium")}
                      />
                      <label htmlFor="test3">
                        <span>Medium</span>
                      </label>
                    </p>
                    <p>
                      <input
                        type="radio"
                        id="test4"
                        name="difficulty-group"
                        checked={difficulty === "hard"}
                        onChange={() => setDifficulty("hard")}
                      />
                      <label htmlFor="test4">
                        <span>Hard</span>
                      </label>
                    </p>
                  </div>

                  <ul className="nav nav-pills">
                    <li className="nav-item" onClick={() => setlevel(1)}>
                      <button
                        className="nav-link active"
                        data-bs-toggle="pill"
                        data-bs-target="#easy"
                      >
                        <img
                          src={`${window.IMG_BASE_URL}/custom_qbank/easy.svg`}
                          style={{ marginRight: "10px" }}
                        />
                        Easy
                      </button>
                    </li>
                    <li className="nav-item" onClick={() => setlevel(2)}>
                      <button
                        style={{ backgroundColor: level == 2 ? "#ED633D" : "" }}
                        className="nav-link"
                        data-bs-toggle="pill"
                        data-bs-target="#medium"
                      >
                        <img
                          src={`${window.IMG_BASE_URL}/custom_qbank/medium.svg`}
                          style={{ marginRight: "10px" }}
                        />
                        Medium
                      </button>
                    </li>
                    <li className="nav-item" onClick={() => setlevel(3)}>
                      <button
                        style={{ backgroundColor: level == 3 ? "#ED633D" : "" }}
                        className="nav-link"
                        data-bs-toggle="pill"
                        data-bs-target="#hard"
                      >
                        <img
                          src={`${window.IMG_BASE_URL}/custom_qbank/hard.svg`}
                          style={{ marginRight: "10px" }}
                        />
                        Hard
                      </button>
                    </li>
                  </ul>
                </div>
              </div> */}

              <div className="setdiffiLevel">
                <div className="difLevel">
                  <div className="difImgSet">
                    <img
                      src={`${window.IMG_BASE_URL}/emdpublic/qbank/question.svg`}
                    />
                  </div>
                  <h2>Choose Question From</h2>
                </div>
                <div className="inputSection inputSectionNew">
                  <p>
                    <input
                      type="radio"
                      id="test5"
                      name="question-group"
                      checked={questionSource === "all-qbank"}
                      onChange={() => setQuestionSource("all-qbank")}
                    />
                    <label htmlFor="test5">
                      <span>All QBank MCQs</span>
                    </label>
                  </p>
                  <p>
                    <input
                      type="radio"
                      id="test6"
                      name="question-group"
                      checked={questionSource === "bookmarked-qbank"}
                      onChange={() => setQuestionSource("bookmarked-qbank")}
                    />
                    <label htmlFor="test6">
                      <span>Bookmarked QBank MCQs</span>
                    </label>
                  </p>
                  <p>
                    <input
                      type="radio"
                      id="test7"
                      name="question-group"
                      checked={questionSource === "incorrect-qbank"}
                      onChange={() => setQuestionSource("incorrect-qbank")}
                    />
                    <label htmlFor="test7">
                      <span>Incorrect QBank MCQs</span>
                    </label>
                  </p>
                  <p>
                    <input
                      type="radio"
                      id="test8"
                      name="question-group"
                      checked={questionSource === "attempted-qbank"}
                      onChange={() => setQuestionSource("attempted-qbank")}
                    />
                    <label htmlFor="test8">
                      <span>Attempted QBank MCQs</span>
                    </label>
                  </p>
                  <p>
                    <input
                      type="radio"
                      id="test9"
                      name="question-group"
                      checked={questionSource === "unattempted-qbank"}
                      onChange={() => setQuestionSource("unattempted-qbank")}
                    />
                    <label htmlFor="test9">
                      <span>Unattempted QBank MCQs</span>
                    </label>
                  </p>
                  <p>
                    <input
                      type="radio"
                      id="test10"
                      name="subject-wise"
                      checked={questionSource === "subject-wise"}
                      onChange={() => setQuestionSource("subject-wise")}
                    />
                    <label htmlFor="test10">
                      <span>Subject Wise MCQs</span>
                    </label>
                  </p>
                  <p>
                    <input
                      type="radio"
                      id="test11"
                      name="pyq"
                      checked={questionSource === "pyq"}
                      onChange={() => setQuestionSource("pyq")}
                    />
                    <label htmlFor="test11">
                      <span>PYQ MCQs</span>
                    </label>
                  </p>
                </div>
              </div>

              {/* <div className='formPartNew'>
                                <h4>Question From:</h4>
                                <select className='selct' onChange={(e) => setfrom(e.target.value)} >
                                    <option value={1}>All Qbank MCQs</option>
                                    <option value={2}>Bookmarked QBank MCQs</option>
                                    <option value={3}>Incorrect qBank MCQs</option>
                                    <option value={4}>Attempted QBank MCQs</option>
                                    <option value={5}>UnAttempted QBank MCQs</option>
                                    <option value={6}>Previous Year QBank MCQs</option>
                                </select>
                            </div> */}
            </div>
          )}

          {step == 2 && (
            <div className="groupbtndata setdiffiLevel">
              {/* <div className="difLevel">
                <h2>
                  {" "}
                  <img
                    src={`${window.IMG_BASE_URL}/emdpublic/qbank/diff.svg`}
                  />{" "}
                  Difficulty Level{" "}
                </h2>
                <h3>All</h3>
              </div> */}

              <div className="btndataset inputSection inputSectionNew1">
                <p>
                  <input
                    type="radio"
                    id="test12"
                    name="pyq"
                    // checked={questionSource === "pyq"}
                    checked={allselected}
                    onClick={() => setallselected(true)}
                  />
                  <label htmlFor="test12">
                    <span> All Subjects</span>
                  </label>
                </p>
                <p>
                  <input
                    type="radio"
                    id="test13"
                    name="pyq"
                    // checked={questionSource === "pyq"}
                    checked={!allselected}
                    onClick={() => setallselected(false)}
                  />
                  <label htmlFor="test13">
                    <span> Choose Subject</span>
                  </label>
                </p>

                {/* <button
                  className="selectedBtn"
                  onClick={() => setallselected(true)}
                  style={{
                    backgroundColor: allselected ? "#3F5395" : "#E0E0E0",
                    color: allselected ? "white" : "#757575",
                  }}
                >
                  All Subjects
                </button> */}
                {/* <button
                  className="nonselectedBtn"
                  onClick={() => setallselected(false)}
                  style={{
                    backgroundColor: allselected ? "#E0E0E0" : "#3F5395",
                    color: !allselected ? "#E0E0E0" : "#757575",
                  }}
                >
                  Choose Subject
                </button> */}
              </div>
              {/* <h3 style={{marginTop:'5px'}}>Create Custom Test</h3> */}

              {allselected ? (
                <div className="allSelectedData">
                  {allsub?.map((subject) => (
                    <div className="allSubMap">
                      <div className="allSubInner" key={subject.id}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedIds?.includes(subject?.id)}
                          onChange={() =>
                            handleCheckboxChange(subject?.id, subject?.topicid)
                          }
                        />
                        <span className="selectName">{subject.name}</span>
                        <button
                          style={{ backgroundColor: "", color: "#757575" }}
                          className="btndefinedata"
                          onClick={() =>
                            handleSeeTopics(subject.id, subject.topics)
                          }
                        >
                          {visibleSubjectId === subject.id
                            ? "Hide Topics"
                            : "All Topics"}
                        </button>
                      </div>

                      {visibleSubjectId === subject.id ? (
                        <div className="leftData">
                          {subject?.topics.map((top) => (
                            <div className="allSubInner" key={top.id}>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={topid.includes(top.subject_id)}

                                //  onChange={() => handleCheckboxChange3(top.id)}
                              />
                              <span
                                style={{ color: "#424242" }}
                                className="selectName"
                              >
                                {top.topic}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="allSelectedData">
                  {allsub?.map((subject) => (
                    <div className="allSubMap">
                      <div className="allSubInner" key={subject.id}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={myselectid.includes(subject.id)}
                          onChange={() => handleCheckboxChange1(subject.id)}
                        />
                        <span className="selectName">{subject.name}</span>
                        <button
                          className="btndefinedata"
                          onClick={() =>
                            handleSeeTopics(subject.id, subject.topics)
                          }
                        >
                          {visibleSubjectId === subject.id
                            ? "Hide Topics"
                            : "All Topics"}
                        </button>
                      </div>

                      {visibleSubjectId === subject.id ? (
                        <div className="allSelectedData1">
                          {subject?.topics.map((top) => (
                            <div className="allSubInner" key={top.id}>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={myselectid1.includes(top.id)}
                                onChange={() => handleCheckboxChange2(top.id)}
                              />
                              <span
                                style={{ color: "#424242" }}
                                className="selectName"
                              >
                                {top.topic}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step == 3 && (
            <div className="chooseLevel selectMode groupbtndata setdiffiLevel setdiffiLevel1">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="difLevel">
                      <h2>
                        {/* <img
                          src={`${window.IMG_BASE_URL}/custom_qbank/level.svg`}
                        /> */}
                        Choose Your Preferences
                      </h2>
                    </div>
                  </div>
                  <div className="SetBoxBgMode">
                    <div className="col-md-12">
                      <div className="headmain">
                        <h2>Select Mode:</h2>
                      </div>
                    </div>
                    <div className="ModeSetBox inputSection inputSectionNew2">
                      <div
                        className="modeDiv"
                        // style={{
                        //   backgroundColor: mode == 1 ? "#FFF9F7" : "",
                        //   cursor: "pointer",
                        //   borderRadius: "20px",
                        // }}
                        onClick={() => setmode(1)}
                      >
                        <div className="modeOption">
                          {/* <div className="modeimg">
                            <img
                              src={`${window.IMG_BASE_URL}/custom_qbank/exam.svg`}
                            />
                          </div>
                          <div className="modetext">
                            <h3>Exam Mode</h3>
                            <p>
                              Solutions and References will be visible after
                              completion of the QBank.
                            </p>
                          </div> */}
                          <p>
                            <input
                              type="radio"
                              id="test15"
                              name="question-group"
                              checked={questionSource === "all-qbank"}
                              onChange={() => setQuestionSource("all-qbank")}
                            />
                            <label htmlFor="test15">
                              <span>
                                <div className="SetCirleOfMode">
                                  <div className="modeimg">
                                    <img
                                      src={`${window.IMG_BASE_URL}/custom_qbank/exam.svg`}
                                    />
                                  </div>
                                  <div className="modetext">
                                    <h3>Exam Mode</h3>
                                    <p>
                                      Solutions and References will be visible
                                      after completion of the QBank.
                                    </p>
                                  </div>
                                </div>
                              </span>
                            </label>
                          </p>
                        </div>
                      </div>
                      <div
                        className="modeDiv"
                        // style={{
                        //   backgroundColor: mode == 2 ? "#FFF9F7" : "",
                        //   cursor: "pointer",
                        //   borderRadius: "20px",
                        // }}
                        onClick={() => setmode(2)}
                      >
                        <div className="modeOption">
                          {/* <div className="modeimg">
                            <img
                              src={`${window.IMG_BASE_URL}/custom_qbank/guide.svg`}
                            />
                          </div>
                          <div className="modetext">
                            <h3>Guide Mode</h3>
                            <p>
                              Solutions and References will be visible while the
                              question is being attempted.
                            </p>
                          </div> */}

                          <p>
                            <input
                              type="radio"
                              id="test16"
                              name="question-group"
                              checked={questionSource === "all-qbank"}
                              onChange={() => setQuestionSource("all-qbank")}
                            />
                            <label htmlFor="test16">
                              <span>
                                <div className="SetCirleOfMode">
                                  <div className="modeimg">
                                    <img
                                      src={`${window.IMG_BASE_URL}/custom_qbank/guide.svg`}
                                    />
                                  </div>
                                  <div className="modetext">
                                    <h3>Guide Mode</h3>
                                    <p>
                                      Solutions and References will be visible
                                      while the question is being attempted.
                                    </p>
                                  </div>
                                </div>
                              </span>
                            </label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            // <div className='choosepredata'>
            //     <h4>Choose Your Preferences</h4>
            //     <h6>Select Mode:</h6>
            //     <div className='examModeData'>
            //         <div className='modeInner' >
            //             <h5>Exam Mode</h5>
            //             <p>Review answer only after completing the module</p>
            //         </div>
            //         <input checked={mode==1} onChange={()=>setmode(1)}  type='checkbox' value={1}/>
            //     </div>
            //     <div className='examModeData'>
            //         <div className='modeInner'>
            //             <h5>Regular</h5>
            //             <p>See answer and explanations after solving each MCQ</p>
            //         </div>
            //         <input checked={mode==2} onChange={()=>setmode(2)}  type='checkbox' value={2}/>
            //     </div>
            // </div>
          )}

          <div className="bottomNext">
            {step != 1 && (
              <Button
                style={{ backgroundColor: "#007aff", color: "white" }}
                onClick={() => setstep((prev) => prev - 1)}
              >
                Prev
              </Button>
            )}
            {step < 3 ? (
              <Button
                style={{ backgroundColor: "#007aff", color: "white" }}
                onClick={() => setstep((prev) => prev + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "#007aff", color: "white" }}
                onClick={handleCreate}
              >
                Create Test
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
