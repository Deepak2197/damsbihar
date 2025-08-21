import React from "react";

const ProgressBar = ({ progresStatus }) => {
  return (
    <div className="progress-container">
      {/* <label>Registration Progress</label> */}
      <div className="progress">
        <div className="progress-bar" style={{ width: `${progresStatus}%` }}>
          {/* {progresStatus}% */}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
