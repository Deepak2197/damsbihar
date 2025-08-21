import React from "react";
import { use } from "react";

const NewUserRegister = () => {
  const [step, setStep] = useState("personal");
  return (
    <>
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
      {step === "personal" && (
        <>
          <div className="container">
            <div className="personalDetail">
              <div className="row">
                <div className="col-12">
                  <div className="reqDetails">
                    <h1>Personal Details</h1>
                    <p>Please enter required details</p>
                    {/* Progress Bar */}
                    <div className="progress-container">
                      <label>Registration Progress</label>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{ width: `${progresStatus}%` }}
                        >
                          {progresStatus}%
                        </div>
                      </div>
                    </div>
                    <div className="fieldPart">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group position-relative">
                          <label htmlFor="num">Your phone number</label>
                          <input
                            type="number"
                            className="form-control"
                            id="num"
                            name="num"
                            placeholder="+91"
                            value={mobile}
                            onChange={handleMobileChange}
                          />
                          {!isMobileValid && mobile && (
                            <div className="error-message">
                              Please enter a valid mobile number.
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="name">Your name?</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={name}
                            onChange={handleNameChange}
                          />
                          {!isNameValid && name && (
                            <div className="error-message">
                              Name cannot be empty.
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="mail">Your email?</label>
                          <input
                            type="email"
                            className="form-control"
                            id="mail"
                            name="mail"
                            placeholder="Your email"
                            value={email}
                            onChange={handleEmailChange}
                          />
                          {!isEmailValid && email && (
                            <div className="error-message">
                              Please enter a valid email.
                            </div>
                          )}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {/* {!(isMobileValid && isEmailValid && isNameValid) && (
                           <button
                             className="btn btn-primary"
                             type="button"
                             onClick={() => navigate(-1)}
                           >
                             Back
                           </button>
                         )} */}

                          <button
                            className="btn btn-primary"
                            // onClick={() => setStep("stream")}
                          >
                            Next
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NewUserRegister;
