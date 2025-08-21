import React from "react";
const ProgressCircle = ({ radius, strokeWidth, progress, total, marks }) => {
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
        stroke="#EEEEEE"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke="#ffc54a"
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
        fontSize="18"
      >
        {marks}
      </text>
      <line
        x1={radius - 20}
        y1={radius + 10}
        x2={radius + 20}
        y2={radius + 10}
        stroke="#000"
        strokeWidth="1"
      />
      <text
        x={radius}
        y={radius + 30}
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="18"
      >
        {total}
      </text>
    </svg>
  );
};

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
        stroke="#EEEEEE"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke="#fe655d"
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
        fontSize="18"
      >
        {progress}%
      </text>
    </svg>
  );
};

const ResultTab = ({ getdata }) => {
  return (
    <div className="resultbox">
      <div className="progressPart">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="resultPart">
              <div className="proOne">
                <ProgressCircle
                  radius={50}
                  strokeWidth={10}
                  progress={30}
                  total={getdata?.total_marks}
                  marks={(
                    getdata?.correct_count * getdata?.marks_per_question -
                    getdata?.incorrect_count * getdata?.negative_marking
                  ).toFixed(0)}
                />
              </div>
              <div className="proTwo">
                <div className="midcircle">
                  <h3>
                    {getdata?.user_rank}{" "}
                    <span className="d-block">My Rank</span>
                  </h3>
                </div>
              </div>
              <div className="proThree">
                <ProgressCircleright
                  radius={50}
                  strokeWidth={10}
                  progress={getdata?.percentage ? getdata.percentage : 0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="anscard">
            <h5 className="ya">Your Answers</h5>
            <div className="ans-status">
              <div className="ans-status-card">
                <h3>{getdata?.correct_count}</h3>
                <h6 className="bg-success text-white">Right</h6>
              </div>
              <div className="ans-status-card">
                <h3>{getdata?.incorrect_count}</h3>
                <h6 className="bg-danger text-white">Wrong</h6>
              </div>
              <div className="ans-status-card">
                <h3>{getdata?.total_questions - getdata?.attempted}</h3>
                <h6>Skipped</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div className="bottom-left-card">
            <h5 className="ya">Pediatrics FMGE CT-2024</h5>
            <div className="two-card">
              <div className="bottom-status-card">
                <h3>{getdata?.total_user_attempt}</h3>
                <h6>Candidates</h6>
              </div>
              <div className="bottom-status-card">
                <h3>{getdata?.total_questions}</h3>
                <h6>Total Questions</h6>
              </div>
            </div>
            <div className="two-card">
              <div className="bottom-status-card">
                <h3>{getdata?.total_marks}</h3>
                <h6>Marks</h6>
              </div>
              <div className="bottom-status-card">
                <h3>{getdata?.total_test_series_time} (min)</h3>
                <h6>Duration</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div className="bottom-right-card">
            <h5 className="ya">My Report</h5>
            <div className="two-card">
              <div className="pill">
                <h6>{getdata?.user_rank}</h6>
                <h6>My Rank</h6>
              </div>
              <div className="pill">
                <h6>
                  {(
                    getdata?.correct_count * getdata?.marks_per_question -
                    getdata?.incorrect_count * getdata?.negative_marking
                  ).toFixed(0)}
                </h6>
                <h6>My Score</h6>
              </div>
            </div>
            <div className="two-card">
              <div className="pill">
                <h6>{getdata?.time_spent}</h6>
                <h6>Time Taken</h6>
              </div>
              <div className="pill">
                <h6>{getdata?.attempted}</h6>
                <h6>Attempted</h6>
              </div>
            </div>
            <div className="two-card">
              <div className="pill">
                <h6>{getdata?.percentile}</h6>
                <h6>Percentile</h6>
              </div>
              <div className="pill">
                <h6>{getdata?.guess_count}</h6>
                <h6>Guess</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultTab;
