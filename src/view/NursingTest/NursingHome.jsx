import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import "../../../src/components/Test_Series/TestPanel.css";
import "../../components/DailyQuiz/TestPanel.css";
import { FaInfoCircle } from "react-icons/fa";
import axiosInstance from "../../API/axiosConfig";
import { isMobile, isTablet } from "react-device-detect";
const NursingHome = () => {
  const { id } = useParams();
  const user_id = id.split("t")[0];
  const test_series_id = id.split("t")[1];
  const [checkstatus, setcheckstatus] = useState(false);
  const [ShowWarn, setShowWarn] = useState(false);

  const navigate = useNavigate();
  const [testdata, settestdata] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axiosInstance.post(
        `/v2_data_model/nurshing_test_instruction`,
        { user_id: user_id, test_id: test_series_id }
      );

      settestdata(response?.data?.data);
    };
    fetchdata();
  }, []);

  const handleStart = () => {
    if (checkstatus) {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;
      // Open the new window
      if (isMobile || isTablet) {
        window.open(
          `/test-panel/nur/${user_id}t${test_series_id}`,
          "_blank",
          features
        );
      } else {
        navigate(`/test-panel/nur/${user_id}t${test_series_id}`);
      }
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{testdata?.test_series_name}</td>
                  <td>{testdata?.total_questions}</td>
                  <td>{testdata?.time_in_mins} min</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2>Sections</h2>
            <table className="marks">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Total Questions</th>
                  <th>Positive marks per question</th>
                  <th>Negative marks per question</th>
                  <th>Total Time</th>
                </tr>
              </thead>
              <tbody>
                {testdata?.section?.map((data, index) => (
                  <tr>
                    <td>{data.part_name}</td>
                    <td>{data.no_of_questions}</td>
                    <td>{data.marks_per_question}</td>
                    <td>{data.negative_marks}</td>
                    <td>{data.section_timing} mins</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="instruction">
            <h5 className="mb-3">General Instructions:</h5>

            <ul>
              {testdata?.instruction.map((data, index) => (
                <li className="li1 common" key={index}>
                  {data}
                </li>
              ))}
            </ul>
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

export default NursingHome;
