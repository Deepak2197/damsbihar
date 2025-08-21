import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../../ulits/apiConstant";
const CbtModel = ({ handleClose }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");
  const CbtType = JSON.parse(localStorage.getItem("CbtType"));
  const Cbtid = JSON.parse(localStorage.getItem("Cbtid"));
  const [CbtUser, setCbtuser] = useState([]);
  const user_id = sessionStorage.getItem("id");
  const handleBuymodalClick = (handleClose) => {
    const Req = {
      user_id: user_id,
    };
    if (!selectedOption) {
      setError("Please select an exam type");
      return;
    }
    localStorage.setItem("CbtType", JSON.stringify(selectedOption));
    if (selectedOption === "1") {
      navigate("/select-location");
    } else if (selectedOption === "2") {
      axiosInstance
        .post(API_ENDPOINTS.CBT.GET_CBT_USER, Req)
        .then((response) => {
          setCbtListData(response.data.data);
        })
        .then((response) => {
          setCbtuser(response.data.data);
          if (CbtUser.reg_cbt === "0") {
            navigate("/profile-update");
          }
          if (CbtUser.reg_cbt === "1") {
          }
        })
        .catch((error) => {
          console.error("Error fetching list data:", error);
        });
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setError("");
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header mb-4">
          <h4 className="modal-title">Select Exam Type</h4>
          {error && <div className="error">{error}</div>}
          <button type="button" className="close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        {CbtType === "0" && (
          <div className="popup-body" id="both">
          <form>
            <div className="radioSet" id="ibt_hide">
              <input type="hidden" id="c_id" value="" />
              <input type="hidden" id="cbt_type" value="" />
              <input
                type="radio"
                id="IBT"
                name="fav_language"
                value="2"
                checked={selectedOption === "2"}
                onChange={handleOptionChange}
              />
              <label
                htmlFor="IBT"
                style={{
                  color: selectedOption === "2" ? "blue" : "black", // Change color based on selection
                }}
              >
                IBT (Internet Based Test)
              </label>
              <br />
            </div>
            <div className="radioSet" id="cbt_hide">
              <input
                type="radio"
                id="CBT"
                name="fav_language"
                value="1"
                checked={selectedOption === "1"}
                onChange={handleOptionChange}
              />
              <label
                htmlFor="CBT"
                style={{
                  color: selectedOption === "1" ? "#ED633D" : "#ED633D", // Change color based on selection
                }}
              >
                CBT (Center Based Test)
              </label>
              <br />
            </div>
          </form>
        </div>
        )}
        {CbtType === "2" && (
          <div className="popup-body" id="both">
            <form>
              <div className="radioSet" id="ibt_hide">
                <input type="hidden" id="c_id" value="" />
                <input type="hidden" id="cbt_type" value="" />
                <input
                  type="radio"
                  id="IBT"
                  name="fav_language"
                  value="2"
                  checked={selectedOption === "2"}
                  onChange={handleOptionChange}
                />
                <label htmlFor="IBT">IBT (Internet Based Test)</label>
                <br />
              </div>
            </form>
          </div>
        )}
        {CbtType === "1" && (
          <div className="radioSet" id="cbt_hide">
            <input
              type="radio"
              id="CBT"
              name="fav_language"
              value="1"
              checked={selectedOption === "1"}
              onChange={handleOptionChange}
            />
            <label htmlFor="CBT">CBT (Center Based Test)</label>
            <br />
          </div>
        )}
        <div className="mt-5 text-center">
          {/* <a href="#" className="btn btn-danger">Buy Now</a> */}
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleBuymodalClick}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default CbtModel;
