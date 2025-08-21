import React, { useEffect, useState } from "react";
import axiosInstance from "../../../API/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const ProgressCircleright = ({ radius, strokeWidth, progress }) => {
  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * radius;

  // Calculate the dash offset to represent the progress
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <svg width={radius * 2} height={radius * 2}>
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke="#ccc"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke="#F63471"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <text
        x={radius}
        y={radius}
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
      >
        {progress}
      </text>
    </svg>
  );
};

const formatDate = (date) => {
  const options = { day: "numeric", month: "short", weekday: "short" };
  return date.toLocaleDateString("en-US", options);
};

// Helper function to format date to "YYYY-MM-DD"
const formatDateForComparison = (date) => {
  return date.toISOString().split("T")[0]; // Extracts YYYY-MM-DD
};

const DeckProgress = () => {
  const user_id = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const [result, setresult] = useState(null);
  const [data, setdata] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      const res = await axiosInstance.post("/v2_data_model/progress", {
        user_id: user_id,
      });
      //console.log(res?.data?.data);
      setresult(res?.data?.data);
      setdata(res?.data?.data?.progress);
    };
    getdata();
  }, [user_id]);

  const getsubdata = () => {
    navigate("/subwise");
  };

  const today = new Date();
  const [startDate, setStartDate] = useState(new Date(today));

  // Function to generate an array of 7 days from startDate
  const generateDates = (start) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(start);
      nextDate.setDate(start.getDate() + i);
      dates.push(nextDate);
    }
    return dates;
  };

  const dates = generateDates(startDate);

  // Go to the previous week
  const handlePrev = () => {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() - 7);
    setStartDate(newDate);
  };

  // Go to the next week
  const handleNext = () => {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + 7);
    setStartDate(newDate);
  };

  // Function to find read_card value for a date
  const getReadCardValue = (date) => {
    const formattedDate = formatDateForComparison(date);
    const record = data.find((item) => item.date === formattedDate);
    return record ? record.read_card : "0"; // Return read_card if found, else return "0"
  };

  return (
    <div className="DeckProgress">
       <div className="page-content position-relative">
          
        </div>
      <div className="container">
        <div className="DeckProgressData">
          <div className="progressPara">
            <p>
              <b>Daily Average: {result?.avg}</b>
            </p>
            <p>
              Cards Studied:<b>{result?.card_studied}</b>
            </p>
            <p>
              Current Streak: <b>{result?.current_interval}</b>
            </p>
            <p>
              Longest Streak:<b> {result?.long_interval}</b>
            </p>
            <p>
              Total Cards:<b>{result?.total_card}</b>
            </p>
          </div>
          <button className="seeBtndata"
            onClick={getsubdata}
          >
            See Subjectwise Cards
          </button>
        </div>

        <div className="TotalCardData">
          <div className="cardDatainner">
            <p>
              <b>Today Total Cards: {result?.today?.added}</b>
            </p>
            <p>
              <b>Date: {result?.update_date}</b>
            </p>
          </div>
          <div className="childProgress">
            <div style={{ textAlign: "center" }}>
              <ProgressCircleright
                radius={50}
                strokeWidth={10}
                progress={result?.today?.study}
              />
              <p>
                <b>Review</b>
              </p>
            </div>
            <div className="mixbtnData">
              <p>
                <b>Studied {result?.today?.study} cards in Today</b>
              </p>
              <div className="middlesecdata">
                <p className="btnTextColor"
                  style={{
                    backgroundColor: "green",
                  }}
                >
                  Easy {result?.today?.easy}
                </p>
                <p className="btnTextColor"
                  style={{
                    backgroundColor: "yellow",
                    color: "#000",
                  }}
                >
                  Medium {result?.today?.medium}
                </p>
                <p className="btnTextColor"
                  style={{
                    backgroundColor: "red",
                  }}
                >
                  Hard {result?.today?.hard}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="TableProgress">
          <h1>Progress</h1>
          <div className="table-responsive">
            <div className="NextPreBtn">
              <button
                onClick={handlePrev}
              >
                Prev
              </button>
              <button
                onClick={handleNext}
              >
                Next
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  {dates.map((date, index) => (
                    <th key={index}>
                      {formatDate(date)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {dates.map((date, index) => (
                    <td key={index} className="text-center">
                      {getReadCardValue(date)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Link to={"/subwise-progress"}>
          <button className="subjectwisebtn">
            See SubjectWise Progress
          </button>
        </Link>
        </div>
      </div>
  );
};

export default DeckProgress;
