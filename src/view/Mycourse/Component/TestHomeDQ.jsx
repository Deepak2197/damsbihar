import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import axiosInstance from "../../../API/axiosConfig";
import '../../../components/Test_Series/Testpanel.css'
const TestHomeDQ = () => {
  const { id } = useParams();
  const user_id = id.split("t")[0];
  const test_series_id = id.split("t")[1];
  const [checkstatus, setcheckstatus] = useState(false);
  const [ShowWarn, setShowWarn] = useState(false);

  const navigate = useNavigate();
  const [testdata, settestdata] = useState(null);
  useEffect(() => {
    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    const preventInspect = (event) => {
      if ((event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl+Shift+I
          (event.ctrlKey && event.keyCode === 73)) { // Ctrl+I
        event.preventDefault();
      }
    };

    window.addEventListener('contextmenu', preventContextMenu);
    window.addEventListener('keydown', preventInspect);

    return () => {
      window.removeEventListener('contextmenu', preventContextMenu);
      window.removeEventListener('keydown', preventInspect);
    };
  }, []);


  useEffect(() => {
    const fetchdata = async () => {
      const response = await axiosInstance.post(
        `/v2_data_model/get_test_series_with_id_app/`,
        { user_id: user_id, test_series_id: test_series_id }
      );
      console.log(response?.data?.data);
      settestdata(response?.data?.data);
    };
    fetchdata();
  }, []);

  const handleStart = () => {
    if (checkstatus) {
      navigate(`/test-panel/dq/${user_id}t${test_series_id}`);
    } else {
      setShowWarn(true);
    }
  };

  const TickCheck = () => {
    if (checkstatus) {
      setcheckstatus(false);
    } else {
      setcheckstatus(true);
    }
  };
  console.log(checkstatus);
  return (
    <div className="TestHome">
      <div className="container">
        <div className="testSeriesdata">
          <h1>{testdata?.basic_info?.test_series_name}</h1>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Test Code</th>

                  <th>Total Questions</th>
                  <th>Total Time</th>
                  <th>Maximum Marks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{testdata?.basic_info?.test_series_name}</td>

                  <td>{testdata?.basic_info?.total_questions}</td>
                  <td>{testdata?.basic_info?.time_in_mins} min</td>
                  <td>{testdata?.basic_info?.total_marks}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="instruction">
            <h5>Please read the following instructions very carefully:</h5>
            <h5 className="mb-3">General Instructions:</h5>
            <ol style={{ marginLeft: "20px" }}>
              <li>
                Total duration of examination is{" "}
                {testdata?.basic_info?.time_in_mins} min.
              </li>
              <li>
                Paper Contain {testdata?.basic_info?.total_questions} questions.
              </li>
              <li>
                The Question Palette displayed on the right side of screen will
                show the status of each question using one of the following
                symbols:{" "}
              </li>
              <ul>
                <li className="li1 common">
                  You have not visited the question yet.{" "}
                </li>
                <li className="li2 common">
                  You have not answered the question.
                </li>
                <li className="li3 common">You have answered the question.</li>
                <li className="li4 common">
                  You have NOT answered the question but have marked the
                  question for review.
                </li>
                <li className="li4 common">
                  You have answered the question, but marked it for review.
                </li>
              </ul>
            </ol>
            <h4>Navigating to a question</h4>
            <h5>To answer a question, do the following:</h5>
            <ol>
              <li>
                Click on the question number in the Question Palette to go to
                that question directly.
              </li>
              <li>
                Select an answer for a multiple choice type question. Use the
                virtual numeric keypad to enter a number as answer for a
                numerical type question.
              </li>
              <li>
                Click on Save &amp; Next to save your answer for the current
                question and then go to the next question.
              </li>
              <li>
                Click on Mark for Review &amp; Next to save your answer for the
                current question, mark it for review, and then go to the next
                question.
              </li>
            </ol>
          </div>

          <div className="startButton">
            <p className="m-0">
              <input
                type="checkbox"
                id="checkboxStatus"
                checked={checkstatus}
                onChange={TickCheck}
              />{" "}
              I have read and understood the instructions. I agree that in case
              of not adhering to the exam instructions. I will be disqualified
              from giving the exam.
            </p>
            <span
              className="btn btn-primary"
              id="startest"
              onClick={handleStart}
            >
              START TEST
            </span>
            <input type="hidden" name="" id="timer" value="1" />
          </div>
          {ShowWarn && (
            <span
              style={{
                backgroundColor: "GrayText",
                color: "white",
                padding: "4px",
                borderRadius: "5px",
              }}
            >
              <FaInfoCircle style={{ marginRight: "5px" }} />
              Tick on terms and condition checkbox
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestHomeDQ;
