import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaAngleDown, FaAngleUp, FaCheckCircle } from "react-icons/fa";
import { Button } from "antd";
import axiosInstance from "../../API/axiosConfig";
import "./style.css";

const SelectSubject = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  const location = useLocation();
  const { topicList = [] } = location.state || {};
  const [activeIndex, setActiveIndex] = useState(null);
  const [subtopics, setSubtopics] = useState({}); // Store subtopics per topic_id
  const user_id = sessionStorage.getItem("id");
  const newWindowRef = useRef(null); // Ref to track the new window

  // Fetch subtopics when a topic is clicked
  const fetchSubtopics = async (topicId) => {
    try {
      const response = await axiosInstance.post(
        "/v2_data_model/getPredictiveTest",
        {
          user_id,
          topic_id: topicId,
        }
      );
      const data = response?.data?.data || [];
      setSubtopics((prev) => ({ ...prev, [topicId]: data }));
    } catch (error) {
      console.error("Error fetching predictive test data:", error);
      setSubtopics((prev) => ({ ...prev, [topicId]: [] }));
    }
  };

  const toggleAccordion = (index, topicId) => {
    setActiveIndex(activeIndex === index ? null : index);
    if (activeIndex !== index && !subtopics[topicId]) {
      fetchSubtopics(topicId);
    }
  };

  const StartNew = (testid, topicId) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;

      // Open the new window and store the reference
      newWindowRef.current = window.open(
        `/test-home/dq/${user_id}t${testid}`,
        "_blank",
        features
      );

      // Check if the window was successfully opened
      if (newWindowRef.current) {
        // Poll to detect window closure
        const interval = setInterval(() => {
          if (newWindowRef.current && newWindowRef.current.closed) {
            clearInterval(interval); // Stop polling
            refreshSubtopics(topicId); // Refresh API with topicId
            newWindowRef.current = null; // Reset reference
          }
        }, 500); // Check every 500ms

        // Cleanup interval on component unmount or window close
        const cleanup = () => {
          if (interval) clearInterval(interval);
        };
        window.addEventListener("beforeunload", cleanup);
        return () => window.removeEventListener("beforeunload", cleanup);
      } else {
        console.error("Failed to open new window");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to refresh subtopics after test completion
  const refreshSubtopics = async (topicId) => {
    try {
      const response = await axiosInstance.post(
        "/v2_data_model/getPredictiveTest",
        {
          user_id,
          topic_id: topicId,
        }
      );
      const data = response?.data?.data || [];
      setSubtopics((prev) => ({ ...prev, [topicId]: data }));
    } catch (error) {
      console.error("Error refreshing predictive test data:", error);
    }
  };

  return (
    <div className="SelectSubjectTest">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>{location.state?.subject_name || "Subject"}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="predictiveTest">
        <div className="container">
          <div className="heading">
            <h3>Predictive Test</h3>
          </div>

          <div className="accordianPart">
            {topicList.length > 0 ? (
              topicList.map((item, index) => {
                const topicId = item.topic_id;
                const currentSubtopics = subtopics[topicId] || [];

                return (
                  <div key={topicId}>
                    <div
                      className="accordiaNBox"
                      onClick={() => toggleAccordion(index, topicId)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={item.faculty_profile || "/web/anatomy.svg"}
                        alt={`${item.topic_name} icon`}
                        onError={(e) => {
                          e.target.src = "/web/anatomy.svg";
                        }}
                      />
                      <div className="textAngel">
                        <p>{item.topic_name}</p>
                        <span>
                          {activeIndex === index ? (
                            <FaAngleUp />
                          ) : (
                            <FaAngleDown />
                          )}
                        </span>
                      </div>
                    </div>

                    {activeIndex === index && (
                      <div className="accordionContent">
                        {currentSubtopics.length > 0 ? (
                          currentSubtopics.map((subtopic, subIndex) => (
                            <div
                              key={subtopic.id || subIndex}
                              className="startPart"
                            >
                              <div className="teXt">
                                <h4>
                                  {subtopic.title || `Part ${subIndex + 1}`}
                                </h4>
                                {/* <h5>
                                  {subtopic.question_count || 10} Question
                                  {subtopic.question_count !== 1 ? "s" : ""}
                                </h5> */}
                              </div>
                              <div className="buttonPart">
                                {subtopic.report_id !== null ? (
                                  <span
                                    style={{
                                      color: "#08D002",
                                      fontSize: "16px",
                                      display: "flex",
                                      alignItems: "center",
                                      cursor: "default",
                                    }}
                                  >
                                    <FaCheckCircle
                                      style={{ marginRight: "5px" }}
                                    />
                                    Completed
                                  </span>
                                ) : (
                                  <Button
                                    type="primary"
                                    style={{
                                      backgroundColor: "#52c41a",
                                      borderColor: "#52c41a",
                                    }}
                                    onClick={() =>
                                      StartNew(
                                        subtopic.test_series_id || subtopic.id,
                                        topicId
                                      )
                                    }
                                  >
                                    Start
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>Loading subtopics...</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p>No topics available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSubject;
