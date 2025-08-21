import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import axiosInstance from "../../API/axiosConfig";
import "../../components/DailyQuiz/TestPanel.css";
const SectionWise = ({ user_id, result_id }) => {
  const [visibleRows, setVisibleRows] = useState([]);
  const [Report, setReport] = useState([]);

  useEffect(() => {
    const getResult = async () => {
      const response = await axiosInstance.post(
        `/v2_data_model/get_testseries_subject_analysis`,
        { result_id: result_id, user_id: user_id }
      );

      setReport(response?.data?.data?.subject);
    };
    getResult();
  }, []);

  const toggleVisibility = (index) => {
    setVisibleRows((prevVisibleRows) => {
      const updatedVisibleRows = [...prevVisibleRows];
      updatedVisibleRows[index] = !updatedVisibleRows[index];
      return updatedVisibleRows;
    });
  };

  return (
    <div className="table-responsive">
      {Report?.map((data, index) => (
        <table className="table ">
          <thead>
            <div style={{ display: "flex", alignItems: "center" }}>
              {visibleRows[index] ? (
                <FaArrowAltCircleUp
                  onClick={() => toggleVisibility(index)}
                  size={38}
                />
              ) : (
                <FaArrowAltCircleDown
                  onClick={() => toggleVisibility(index)}
                  size={38}
                />
              )}
              <h5>{data.name}</h5>
            </div>

            <tr>
              <th style={{ backgroundColor: "#757575", color: "#FFF" }}>
                <div>Topper Percentage</div>
                <div>{data.topper_percentge}%</div>
              </th>
              <th>
                <div>Total Score</div>
                <div>{data.score}</div>
              </th>
              <th>
                <div>Percentage</div>
                <div>{data.percentge}%</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleRows[index] && (
              <tr>
                <th>
                  <div>Right</div>
                  <div>{data.right}</div>
                </th>
                <th>
                  <div>Wrong</div>
                  <div>{data.wrong}</div>
                </th>
                <th>
                  <div>Skipped</div>
                  <div>{data.skipped}</div>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default SectionWise;
