import React, { useEffect, useState } from "react";

const ProgressCircle = ({ radius, strokeWidth, progress, mytext, shade }) => {
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress / 100);
  return (
    <svg width={radius * 2} height={radius * 2}>
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke="#EEEEEE"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke={shade}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <text
        x={radius}
        y={radius - 10}
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
      >
        {progress}%
      </text>
      <text
        x={radius}
        y={radius + 10}
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="16"
      >
        {mytext}
      </text>
    </svg>
  );
};

const Leaderboard = ({ data }) => {
  const totalQuestions = Number(data?.no_of_question || 0);
  const [progress, setProgress] = useState(0);
  const [mytext, setMyText] = useState("Correct");
  const [shade, setShade] = useState("#54B435");

  useEffect(() => {
    setProgress(
      Math.round(
        (Number(data?.test_result?.correct_count || 0) / totalQuestions) * 100
      )
    );
  }, [data, totalQuestions]);

  const handleSetProgress = (txt, count, shade) => {
    const calculatedProgress = Math.round((count / totalQuestions) * 100);
    setProgress(calculatedProgress);
    setMyText(txt);
    setShade(shade);
  };

  function convertMillisecondsToDateTime(milliseconds) {
    if (!milliseconds || isNaN(milliseconds)) {
      return "Invalid date";
    }

    const date = new Date(milliseconds);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${day}/${month}/${year} at ${hours}:${minutes} ${ampm}`;
  }

  return (
    <div className="leaderBoard">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="headingSec">
              <h1>Custom QBank Analysis</h1>
              <p>
                Completed on{" "}
                {convertMillisecondsToDateTime(
                  Number(data?.test_result?.creation_time)
                )}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="qsnTotal">
              <h2>Total Questions {totalQuestions}</h2>
              <div className="butnSet">
                <button
                  className="btn"
                  onClick={() =>
                    handleSetProgress(
                      "Correct",
                      Number(data?.test_result?.correct_count || 0),
                      "#54B435"
                    )
                  }
                >
                  Correct
                  <span className="numeric">
                    {data?.test_result?.correct_count}
                  </span>
                </button>
                <button
                  className="btn inco"
                  onClick={() =>
                    handleSetProgress(
                      "Incorrect",
                      Number(data?.test_result?.incorrect_count || 0),
                      "#FF4949"
                    )
                  }
                >
                  Incorrect
                  <span className="numeric fntclr">
                    {data?.test_result?.incorrect_count}
                  </span>
                </button>
                <button
                  className="btn miss"
                  onClick={() =>
                    handleSetProgress(
                      "Missed",
                      Number(data?.test_result?.non_attempt || 0),
                      "#FF9551"
                    )
                  }
                >
                  Missed
                  <span className="numeric fntclra">
                    {data?.test_result?.non_attempt}
                  </span>
                </button>
              </div>
              <div className="correctResult">
                <ProgressCircle
                  radius={100}
                  shade={shade}
                  strokeWidth={15}
                  progress={progress}
                  mytext={mytext}
                />
              </div>
            </div>
          </div>
          {/* Rest of the leaderboard layout */}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
