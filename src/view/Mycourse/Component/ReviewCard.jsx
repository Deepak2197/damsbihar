import React, { useEffect, useState } from "react";
import axiosInstance from "../../../API/axiosConfig";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import { Modal } from "react-bootstrap";
const ReviewCard = () => {
  const user_id = sessionStorage.getItem("id");
  const [questiondata, setquestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // State for current question index
  const [showans, setshow] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const getdata = async () => {
    const res = await axiosInstance.post("/v2_data_model/review_card", {
      user_id: user_id,
      random: 0,
    });
    //console.log(res?.data?.data);
    setquestions(res?.data?.data);
  };

  useEffect(() => {
    getdata();
  }, [user_id]);

  useEffect(() => {
    // Start the timer when the component mounts
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1); // Increment seconds
      console.log(`Timer: ${seconds + 1} seconds`); // Log to the console
    }, 1000); // Runs every second (1000 ms)

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [seconds]);

  // Function to go to the next question
  const handleNext = async (action, cid) => {
    if (currentIndex < questiondata.length - 1) {
      const res = await axiosInstance.post("/v2_data_model/update_flashcard", {
        next_time: action,
        user_id: user_id,
        card_id: cid,
        time_taken: seconds,
      });
      setshow(false);
      setSeconds(0);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleaddbookmark = async (card_id) => {
    const res = await axiosInstance.post("/v2_data_model/card_bookmark", {
      user_id: user_id,
      bookmark: 1,
      card_id: card_id,
    });
    getdata();
  };

  const handleremovebookmark = async (card_id) => {
    const res = await axiosInstance.post("/v2_data_model/card_bookmark", {
      user_id: user_id,
      bookmark: 0,
      card_id: card_id,
    });
    getdata();
  };

  const handleSuspend = async (cid) => {
    const res = await axiosInstance.post("/v2_data_model/card_suspend", {
      user_id: user_id,
      suspend: 1,
      card_id: cid,
    });
    setShow(false);
    if (currentIndex < questiondata.length - 1) {
      setshow(false);
      setSeconds(0);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="ReviewCard">
      <div className="page-content position-relative">
        {/* <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li><a href={'/'}>Home</a></li>
                        <li>Review Card </li>
                    </ul>
                </div>
            </div> */}
      </div>
      <div className="container">
        {questiondata.length > 0 ? (
          <div className="ReviewInner">
            {/* Display the current question */}
            <div className="ReviewChild"
            >
              <MdWarning size={32} onClick={() => setShow(true)} />
              <div
                dangerouslySetInnerHTML={{
                  __html: questiondata[currentIndex]?.question,
                }}
              />
              {questiondata[currentIndex]?.is_bookmarked == 0 ? (
                <FaRegBookmark
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleaddbookmark(questiondata[currentIndex]?.id)
                  }
                />
              ) : (
                <FaBookmark
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleremovebookmark(questiondata[currentIndex]?.id)
                  }
                />
              )}
            </div>

            <button
              onClick={() => setshow(true)}
              className="ReviewShowAns"
            >
              Show Answer
            </button>
            {showans && (
              <div className="showtext"
                dangerouslySetInnerHTML={{
                  __html: questiondata[currentIndex]?.answer,
                }}
              />
            )}
            {showans && (
              <div className="ReviewShowdata">
                <button className="ReviewBtn"
                  style={{
                    backgroundColor: "red"
                  }}
                  onClick={() => handleNext(1, questiondata[currentIndex]?.id)}
                >
                  3 days hard
                </button>
                <button className="ReviewBtn"
                  style={{
                    backgroundColor: "green"
                  }}
                  onClick={() => handleNext(2, questiondata[currentIndex]?.id)}
                >
                  1 day medium
                </button>
                <button className="ReviewBtn"
                  style={{
                    backgroundColor: "violet"
                  }}
                  onClick={() => handleNext(3, questiondata[currentIndex]?.id)}
                >
                  10 min easy
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>Loading questions...</p>
        )}

        <Modal show={show} onHide={handleClose} style={{ marginTop: "20vh" }}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="content bodydata">
            <div style={{ textAlign: "center" }}>
              <MdWarning color="red" size={36} />
              <h3>
                Suspend the card from the deck and move it to the suspended card
                section!
              </h3>
              <div className="poUpbtn">
                <button
                  style={{
                    backgroundColor: "#071952"
                  }}
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  style={{
                    backgroundColor: "red"
                  }}
                  onClick={() => handleSuspend(questiondata[currentIndex]?.id)}
                >
                  Suspend
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ReviewCard;
