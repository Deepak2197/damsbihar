import React, { useEffect, useState } from "react";
import axiosInstance from "../../API/axiosConfig";
import "../MyAttentdance/style.css";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

import { Image } from "react-bootstrap";
import { Spin } from "antd";

const Attendence = () => {
  const [loading, setLoading] = useState(false);
  const [attendData, setAttendData] = useState([]);
  const [selectBtn, setSelectBtn] = useState("1");

  const userID = sessionStorage.getItem("id");

  const spanStyle = {};

  const btnTitle = [
    { id: "1", title: "Today" },
    { id: "2", title: "Weekly" },
    { id: "3", title: "Monthly" },
    { id: "4", title: "Yearly" },
  ];

  const getAllAttendance = async (id) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        API_ENDPOINTS.My_ATTENDANCE.GET_USER_ATTENDANCE,
        {
          user_id: userID,
          filter_by: id,
          page: 1,
        }
      );
      setAttendData(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAttendance(selectBtn);
  }, [selectBtn]);
  return (
    <div className="Attendence">
      <div className="container">
        <div className="myAttendance">
          <div className="AttendanceChild">
            {btnTitle.map((val, i) => (
              <span
                style={{
                  ...spanStyle,
                  backgroundColor: selectBtn === val.id ? "#FFFFFF" : "#EEEEEE",
                  color: selectBtn === val.id ? "#007aff" : "#757575",
                }}
                key={i}
                onClick={() => setSelectBtn(val.id)}
              >
                {val.title}
              </span>
            ))}
          </div>
          {loading ? (
            <div
              style={{
                height: "56vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            <div className="groupSetDiv">
              {attendData.length === 0 ? (
                <div className="attendenceDataShow&Found">
                  <img src="https://i.ibb.co/TkRCGdR/file-issue1.png" />
                  <h2 className="notFound">No data found!</h2>
                </div>
              ) : (
                attendData.map((item, i) => (
                  <div className="groupSec">
                    <div className="groupChild">
                      <b>{item?.event_name}</b>
                      <span>{item?.event_type}</span>
                    </div>
                    <div className="childText" style={{}} />
                    <div className="belowText">
                      <span>
                        <b>Date & Time :</b> {item?.date_time}
                      </span>
                      <span style={{ color: "red" }}>
                        {item?.attendence && "Absent"}
                      </span>
                    </div>
                    <div className="belowText">
                      <span>
                        <b>Location :</b> {item?.event_vanue}
                      </span>
                    </div>
                    <div className="belowText">
                      <span>
                        <b>Attendance Date :</b> {item?.attendence_date}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendence;
