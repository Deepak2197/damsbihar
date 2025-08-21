import React from "react";
import { useNavigate } from "react-router-dom";
const Registrationsuccess = ({ setformstate, handlerSuccess }) => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="container">
        <div className="personalDetail regisSeuccess">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="conGraute">
                {/* <img src={`${window.IMG_BASE_URL}/new_login/success.svg`} /> */}
                <img src="/succesful.svg"></img>
                <h1>Congratulations!</h1>
                <h2>Hurrah! your registration has successfully</h2>
                <p>Before we start we need some of your details</p>
                <div style={{ display: "flex" }}>
                  <button
                    class="btn btn-primary"
                    onClick={handlerSuccess}
                    // onClick={() => setStep("stream")}
                    // onClick={() => setformstate(3)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Registrationsuccess;
