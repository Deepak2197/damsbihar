import React from "react";

const Acur = ({ step }) => {
  return (
    <div className="page-content position-relative">
      <div className="breadcrumb-row">
        <div className="container">
          <ul className="list-inline">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              {step === "personal"
                ? "Personal Detail"
                : step === "stream"
                ? "Choose Your Stream"
                : step === "educate"
                ? "Education Details"
                : "Registration Success"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Acur;
