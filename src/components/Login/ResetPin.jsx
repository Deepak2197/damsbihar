import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";


const ResetPin=({setPinResetModal})=>{

    const [newResetPinDigits, setNewResetPinDigits] = useState(["", "", "", ""]);
    const [newPinConfirmDigits, setNewPinConfirmDigits] = useState([
        "",
        "",
        "",
        "",
      ]);
      const [oldPinDigits, setOldPinDigits] = useState(["", "", "", ""]);
      
      const newPinInputRefs = useRef([
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
      ]);
    
      const oldPinInputRefs = useRef([
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
      ]);
    
      const confirmInputRefs = useRef([
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
      ]);

      const confirmNewPinChange = (index, value) => {
        const confirmPin = [...newPinConfirmDigits];
        confirmPin[index] = value;
        setNewPinConfirmDigits(confirmPin);
        if (value && index < confirmInputRefs.current.length - 1) {
          confirmInputRefs.current[index + 1].current.focus();
        }
        const isComplete = confirmPin.every((digit) => digit !== "");
        if (isComplete) {
          if (newResetPinDigits.join("") !== confirmPin.join("")) {
            toast.error("PINs do not match");
          } else {
            toast.success("PINs matched successfully");
          }
        }
        // Move focus to the next input field if the current field is filled
      };

      const handleBackspaceForOldPin = (index, e) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
          oldPinInputRefs.current[index - 1].current.focus();
        }
      };

      const handleOldPinChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const newPinDigits = [...oldPinDigits];
        newPinDigits[index] = value;
        setOldPinDigits(newPinDigits);
        // Move focus to the next input field if the current field is filled
        if (value && index < oldPinInputRefs.current.length - 1) {
          oldPinInputRefs.current[index + 1].current.focus();
        }
      };

      const handleNewPinChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newPinDigits = [...newResetPinDigits];
        newPinDigits[index] = value;
        setNewResetPinDigits(newPinDigits);
        // Move focus to the next input field if the current field is filled
        if (value && index < newPinInputRefs.current.length - 1) {
          newPinInputRefs.current[index + 1].current.focus();
        }
      };

      const handleBackspaceForConfirmPin = (index, e) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
          confirmInputRefs.current[index - 1].current.focus();
        }
      };

      const handleBackspaceForNewPin = (index, e) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
          newPinInputRefs.current[index - 1].current.focus();
        }
      };

    const handleResetPinSave = async (e) => {
        e.preventDefault();
        try {
          const user_id = localStorage.getItem("user_id");
          const new_pin = newPinConfirmDigits.join("");
          const old_user_pin = oldPinDigits.join("");
          if (new_pin == old_user_pin) {
            toast.error("Old PIN must not match");
            return;
          }
          const res = await axiosInstance.post(
            API_ENDPOINTS.LOGIN.RESET_PIN,
            { user_id: user_id, old_user_pin: old_user_pin, new_pin: new_pin }
          );
          if (res?.data?.status === false) {
            toast.error(res?.data?.message);
          }
          if (res?.data?.status === true) {
            toast.success(res?.data?.message)
            setPinResetModal(false);
            setPinModal(false);
            setOtpModalOpen(false);
            setOldPinDigits([null, null, null, null]);
            setNewPinConfirmDigits([null, null, null, null]);
           
          }
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <form
                                  className="digit-group text-center otp-form"
                                  name="reset_pin"
                                >
                                  <div className="login-logo_text">
                                    <h2>Enter your Old Pin</h2>
                                    <div className="form-group-pin pin_box">
                                      {oldPinDigits.map((digit, index) => (
                                        <input
                                          key={index}
                                          type="number"
                                          className="otp-field"
                                          style={{
                                            boxShadow: "1px 1px 2px black",
                                          }}
                                          value={digit}
                                          maxLength="1"
                                          onChange={(e) =>
                                            handleOldPinChange(
                                              index,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(e) =>
                                            handleBackspaceForOldPin(index, e)
                                          }
                                          ref={oldPinInputRefs.current[index]}
                                        />
                                      ))}
                                    </div>

                                    <h2>Enter your New Pin</h2>
                                    <div className="form-group pin_box">
                                      {newResetPinDigits.map((digit, index) => (
                                        <input
                                          key={index}
                                          type="number"
                                          className="otp-field"
                                          style={{
                                            boxShadow: "1px 1px 2px black",
                                          }}
                                          value={digit}
                                          maxLength="1"
                                          onChange={(e) =>
                                            handleNewPinChange(
                                              index,
                                              e.target.value
                                            )
                                          }
                                          onKeyDown={(e) =>
                                            handleBackspaceForNewPin(index, e)
                                          }
                                          ref={newPinInputRefs.current[index]}
                                        />
                                      ))}
                                    </div>

                                    <h2>Confirm your New Pin</h2>
                                    <div className="form-group-pin pin_box">
                                      {newPinConfirmDigits.map(
                                        (digit, index) => (
                                          <input
                                            key={index}
                                            type="number"
                                            className="otp-field"
                                            style={{
                                              boxShadow: "1px 1px 2px black",
                                            }}
                                            value={digit}
                                            maxLength="1"
                                            onChange={(e) =>
                                              confirmNewPinChange(
                                                index,
                                                e.target.value
                                              )
                                            }
                                            onKeyDown={(e) =>
                                              handleBackspaceForConfirmPin(
                                                index,
                                                e
                                              )
                                            }
                                            ref={
                                              confirmInputRefs.current[index]
                                            }
                                          />
                                        )
                                      )}

                                      <button
                                        type='button'
                                        className="common-bottom-btn-pin"
                                        onClick={handleResetPinSave}
                                        disabled={
                                          newResetPinDigits.join("") !==
                                            newPinConfirmDigits.join("") ||
                                          !/^\d{4}$/.test(
                                            newResetPinDigits.join("")
                                          ) ||
                                          !/^\d{4}$/.test(oldPinDigits.join(""))
                                        }
                                      >
                                        Verify & Save
                                      </button>
                                    </div>
                                  </div>
                                </form>
    )
}



export default ResetPin;