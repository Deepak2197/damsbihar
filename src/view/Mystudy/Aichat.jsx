import React from "react";
import "../Mystudy/style.css";
import "../Mystudy/responsive.css";

const Aichat = () => {
  return (
    <div className="Aichat">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>DAMS AI</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="AichatData">
        <div className="container">
          <div className="userdata">
            <div className="userimg">
              <img src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/user.svg" />
            </div>
            <div className="nameText">
              <h3>User</h3>
            </div>
          </div>
          <div className="report">
            <h2>Your AI Intelligence Report</h2>
          </div>
          <div className="DamsAi">
            <div className="AIimg">
              <img src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/aiIcon.svg" />
            </div>
            <div className="nameText">
              <h3>DAMS AI</h3>
            </div>
          </div>
          <div className="intelegentReport">
            <h2>Your Intelligence Report</h2>
            <div className="overview">
              <p>Performance Overview:</p>
              <p>Percentile & Accuracy:</p>
            </div>
            <p>
              The scores across the tests show varying levels of performance:
            </p>
            <p>
              Percentiles range from 0.75% to 14%, indicating room for
              improvement.
            </p>
            <p>
              Correct answer rates vary between 1% and 29%, showing inconsistent
              accuracy.
            </p>
            <p>
              Tests such as NEET PG Mock 8 and INICET Mock 6 had very low
              scores, pointing to possible gaps in preparation or understanding.
            </p>
            <p>Skipped Questions:</p>
            <p>
              A significant number of questions were skipped (e.g., 190 skipped
              in NEET PG Mock 8).
            </p>
            <p>This might indicate:</p>
            <p>
              Lack of confidence in certain topics. Time management issues
              during the tests.
            </p>
            <p>Subject-Wise Accuracy:</p>
            <p>
              The accuracy chart shows strengths in certain subjects (e.g.,
              Dermatology - positive score). Weak areas include subjects like
              Anatomy, Biochemistry, and Physiology, which show negative
              accuracy markers. These subjects require immediate attention.
            </p>
            <p>Rank Insights:</p>
            <p>All India Rank: 38,374 out of 67,058 and Delhi Rank: 2,365 out of 2,374.</p>
            <p>You rank in the lower percentile groups in both local and national levels.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aichat;
