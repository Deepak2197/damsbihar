import React, { useRef, useState } from "react";
import "./style.css";
import axiosInstance from "../../API/axiosConfig";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const UserPin = ({setStep}) => {
  const [newResetPinDigits, setNewResetPinDigits] = useState(["", "", "", ""]);
  const [newPinConfirmDigits, setNewPinConfirmDigits] = useState(["", "", "", ""]);

  const newPinInputRefs = useRef([]);
  const confirmInputRefs = useRef([]);
  const user_id = sessionStorage.getItem("id");

  // Handle New PIN input
  const handleNewPinChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...newResetPinDigits];
    newDigits[index] = value;
    setNewResetPinDigits(newDigits);
    if (value && index < 3) {
      newPinInputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspaceForNewPin = (index, e) => {
    if (e.key === "Backspace" && !newResetPinDigits[index] && index > 0) {
      newPinInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Confirm PIN input
  const confirmNewPinChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...newPinConfirmDigits];
    newDigits[index] = value;
    setNewPinConfirmDigits(newDigits);
    if (value && index < 3) {
      confirmInputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspaceForConfirmPin = (index, e) => {
    if (e.key === "Backspace" && !newPinConfirmDigits[index] && index > 0) {
      confirmInputRefs.current[index - 1]?.focus();
    }
  };

  // Save PIN (API call)
  const handlePinSave = async (e) => {
    e.preventDefault();

    const user_pin = newResetPinDigits.join("");
    const confirm_pin = newPinConfirmDigits.join("");

    if (!/^\d{4}$/.test(user_pin)) {
      toast.error("PIN must be exactly 4 digits.");
      return;
    }

    if (user_pin !== confirm_pin) {
      toast.error("PINs do not match.");
      return;
    }

    try {
      const res = await axiosInstance.post(API_ENDPOINTS.LOGIN.USER_FORGOTPIN, {
        user_id,
        user_pin,
      });

      if (res?.data?.status === true) {
        toast.success("PIN updated successfully!");
        setStep("success");
        // Optionally redirect or reset inputs here
      } else {
        toast.error(res?.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("PIN Save Error:", error);
      toast.error("Failed to update PIN. Try again.");
    }
  };

  return (
    <div className="container">
      <form className="digit-group text-center otp-form" name="pinvarfy_new">
        <div className="login-logo_text">
          <h2>Enter your New Pin</h2>
          <div className="form-group otp_box">
            {newResetPinDigits.map((digit, index) => (
              <input
                key={index}
                type="text"
                className="otp-field"
                style={{ boxShadow: "1px 1px 2px black", width: "52px" }}
                value={digit}
                maxLength="1"
                onChange={(e) => handleNewPinChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspaceForNewPin(index, e)}
                ref={(el) => (newPinInputRefs.current[index] = el)}
              />
            ))}
          </div>

          <h2>Confirm your New Pin</h2>
          <div className="form-group otp_box">
            {newPinConfirmDigits.map((digit, index) => (
              <input
                key={index}
                type="text"
                className="otp-field"
                style={{ boxShadow: "1px 1px 2px black", width: "52px" }}
                value={digit}
                maxLength="1"
                onChange={(e) => confirmNewPinChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspaceForConfirmPin(index, e)}
                ref={(el) => (confirmInputRefs.current[index] = el)}
              />
            ))}
          </div>
          <button
            className="common-bottom-btn"
            onClick={handlePinSave}
            disabled={
              newResetPinDigits.join("") !== newPinConfirmDigits.join("") ||
              !/^\d{4}$/.test(newResetPinDigits.join(""))
            }
          >
            verify & save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserPin;
