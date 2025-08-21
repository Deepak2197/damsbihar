import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QBank from "./QBank/QBank";
import axiosInstance from "../../API/axiosConfig";
import TestSeries from "./TestSeries/TestSeries";
import { PiNoteLight } from "react-icons/pi";
import "../Performance/style.css";

const Performance = () => {
  const loc = useLocation();
  const [btnData, setBtnData] = useState([
    { name: "Q-Bank", id: "1" },
    { name: "Test Series", id: "2" },
  ]);
  const [selectBtn, setSelectBtn] = useState("1");
  const { filterArray, qBankID, testSeriesID, userID, selectOptionValue } =
    loc.state;

  const [existDataOrNot, setExistDataOrNot] = useState({});

  const handlerChangeBtnValue = (id) => {
    setSelectBtn(id);
  };

  const getCheckQBankAndTestSeriesExistOrNot = async () => {
    try {
      const res = await axiosInstance.post(
        "/v2_data_model/get_testseries_qbank_check",
        {
          user_id: userID,
          duration: "",
          qbank_id: qBankID ? qBankID : "0",
          testseries_id: testSeriesID ? testSeriesID : "0",
        }
      );
     
      setExistDataOrNot(res.data.data);
    } catch (error) {
     
    }
  };

  useEffect(() => {
    getCheckQBankAndTestSeriesExistOrNot();
  }, [filterArray]);

  return (
    <div className="container">
      <div className="performanceData">
        <div className="performanceInner">
          {btnData?.map((val, i) => (
            <button className="innerBtn"
              key={i}
              style={{
                background: selectBtn === val.id ? "#F16136" : "#FBDBD2",
                color: selectBtn === val.id ? "white" : "black",
                opacity: selectBtn !== val.id && "0.6",
              }}
              onClick={() => handlerChangeBtnValue(val.id)}
            >
              {val.name}
            </button>
          ))}
        </div>
        {selectBtn === "1" && (
          <div className="selectBtn">
            {existDataOrNot?.qbank === "1" ? (
              <QBank
                filterArray={filterArray}
                qBankID={qBankID}
                testSeriesID={testSeriesID}
                existDataOrNot={existDataOrNot}
                userID={userID}
              />
            ) : (
              <div className="selectInner">
                <div>
                  <PiNoteLight style={{ fontSize: "50px" }} />
                </div>
                <span style={{ color: "red" }}>
                  Your report is not generated due to no attempted in any DQB
                </span>
              </div>
            )}
          </div>
        )}
        {selectBtn === "2" && (
          <div className="slectCondition">
            {existDataOrNot?.tsetseries === "1" ? (
              <TestSeries
                filterArray={filterArray}
                qBankID={qBankID}
                testSeriesID={testSeriesID}
                existDataOrNot={existDataOrNot}
                userID={userID}
                selectOptionValue={selectOptionValue}
              />
            ):(
              <div className="selectInner">
                <div>
                  <PiNoteLight style={{ fontSize: "50px" }} />
                </div>
                <span style={{ color: "red" }}>
                  Your report is not generated due to no attempted in any test
                </span>
              </div>
            )}
          </div>
        )}
      </div>
     </div>
  );
};

export default Performance;

