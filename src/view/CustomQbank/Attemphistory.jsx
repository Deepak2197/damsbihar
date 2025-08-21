import React, { useEffect, useState } from "react";
import axiosInstance from "../../API/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Attemphistory = () => {
  const [qdata, setqdata] = useState(null);
  const user_id = sessionStorage.getItem("id");
  const [pagenumber, setpagenumber] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const checkqbank = async () => {
      const res = await axiosInstance.post(
        API_ENDPOINTS.CUSTOM_QBANK.CUSTOM_QBANK_HISTORY,
        {
          user_id: user_id,
          page_size: 10,
          page_number: pagenumber,
        }
      );
      setqdata(res?.data?.data?.record);
    };
    checkqbank();
  }, [pagenumber]);

  const handleStartExam = (mode, test_series_id) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;
      if (mode == 1) {
        window.open(
          `/exam-mode/${user_id}t${test_series_id}`,
          "_blank",
          features
        );
      } else {
        window.open(
          `/reg-mode/${user_id}t${test_series_id}`,
          "_blank",
          features
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResume = (mode, test_series_id) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;
      if (mode == 1) {
        window.open(
          `/paused-exam-mode/${user_id}t${test_series_id}`,
          "_blank",
          features
        );
      } else {
        window.open(
          `/paused-reg-mode/${user_id}t${test_series_id}`,
          "_blank",
          features
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReview = (id) => {
    navigate(`/testresultcustom/${id}`);
  };

  return (
    <div className="attemptHistory">
      <div className="container">
        <div className="row">
          {qdata && qdata.length > 0 ? (
            qdata.map((data, i) => (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
                key={i}
              >
                <div className="historyBox">
                  <div className="boximg">
                    <div className="boxenter">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/qbank/attempbook.svg`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="attemptPeriod position-relative">
                    <h1>{data?.custom_qbank}</h1>
                    <h2>
                      <span className="examModetext">
                        {data?.mode == 1 ? "Exam mode" : "Regular"}
                      </span>
                      <em className="fa fa-circle"></em> {data?.no_of_question}{" "}
                      Questions
                    </h2>
                    <div className="btnSet">
                      <Link to={`/topic-share/${data?.id}`}>
                        <Button
                          style={{ backgroundColor: "#BDBDBD", color: "white" }}
                        >
                          Invite
                        </Button>
                      </Link>
                      <Button
                        onClick={
                          !data?.status
                            ? () => handleStartExam(data?.mode, data?.id)
                            : data?.status == 1
                            ? () => handleResume(data?.mode, data?.id)
                            : () => handleReview(data?.id)
                        }
                        style={{
                          backgroundColor: !data?.status
                            ? "#54B434" // Start button color
                            : data?.status == 1
                            ? "#ED633D" // Resume button color
                            : "#3F5395", // Review button color
                          color: "white",
                        }}
                      >
                        {!data?.status
                          ? "Start"
                          : data?.status == 1
                          ? "Resume"
                          : "Review"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No data available</p>
            </div>
          )}
        </div>
        {/* Show pagination buttons only if qdata exists and is not empty */}
        {qdata && qdata.length > 0 && (
          <div className="bottomNextNew">
            <button
              className="btn"
              onClick={() => pagenumber > 1 && setpagenumber(pagenumber - 1)}
              disabled={pagenumber === 1} // Disable Prev button on first page
            >
              Prev
            </button>
            <button
              className="btn"
              onClick={() =>
                qdata?.length >= 10 && setpagenumber(pagenumber + 1)
              }
              disabled={qdata?.length < 10} // Disable Next button if less than 10 items
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attemphistory;
