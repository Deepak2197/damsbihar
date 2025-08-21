import React from "react";
import "./style.css";
import "./responsive.css";
//import Logoimg from "../Registration/img/logo.svg";
import { useNavigate } from "react-router-dom";
const Registration = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/personal-detail");
  };
  return (
    <div className="newRegistration">
      <div className="container">
        <div className="regisSecTion">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              {/* LOGO SECTION */}
              <div className="logoPart">
                <div className="part">
                  {/* <img src={Logoimg} alt="" /> */}
                  <h1>India’s First</h1>
                  <p>Live Medical Education Platform</p>
                </div>
              </div>
              {/* FIELD SECTION */}
              <div className="loginPart">
                <form>
                  <div className="form-group">
                    <label htmlFor="usr">Signup or Login</label>
                    <input
                      type="number"
                      className="form-control"
                      id="usr"
                      name="username"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClick}
                  >
                    Continue
                  </button>
                  <p>
                    Login with Email <em class="fa fa-angle-right"></em>
                  </p>
                  <h2>
                    By login, I agree to the{" "}
                    <span className="term">
                      <a href="">Term & Conditions</a>
                    </span>
                  </h2>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Registration;
