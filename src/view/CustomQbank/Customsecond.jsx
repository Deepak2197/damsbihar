import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { Button } from "antd";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Customsecond = () => {
  const [recents, setrecents] = useState([]);
  const [mostly, setmostly] = useState([]);
  const [invites, setinvites] = useState(0);
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("id");

  useEffect(() => {
    const recentlyattempted = async () => {
      const res = await axiosInstance.post(
        API_ENDPOINTS.CUSTOM_QBANK.ATTEMPT_COMBINE,
        { user_id: user_id }
      );

      setrecents(res?.data?.data?.recent_attempts);
      setmostly(res?.data?.data?.mostly_attempts);
    };

    const getbydefault = async () => {
      const res = await axiosInstance.post(
        API_ENDPOINTS.CUSTOM_QBANK.INVITE_CUSTOM_QBANK,
        { user_id: user_id }
      );
      setinvites(res?.data?.data?.length);
    };

    getbydefault();
    recentlyattempted();
  }, []);

  function formatDateTime(inputDateTime) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(inputDateTime);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day} ${month} ${year} at ${hours}:${minutes} ${period}`;
  }

  return (
    <div className="NewcustomQbank customizeQBank">
      <div className="container">
        <div className="row">
          <div className="boxSectiontopDivSet">
            <div className="boxSection">
              <Link to="/custom-qbank">
                <div className="imgPart">
                  <img
                    src={`${window.IMG_BASE_URL}/custom_qbank/crteate.svg`}
                  />
                </div>
                <div className="textPart">
                  <h3>Create Qbank</h3>
                </div>
              </Link>
            </div>
            <div className="boxSection">
              <Link to={"/attemped-history"}>
                <div className="imgPart">
                  <img
                    src={`${window.IMG_BASE_URL}/custom_qbank/history.svg`}
                  />
                </div>
                <div className="textPart">
                  <h3>Attempted History</h3>
                </div>
              </Link>
            </div>
            <div className="boxSection">
              <Link to="/invited">
                <div className="imgPart position-relative">
                  <img src={`${window.IMG_BASE_URL}/custom_qbank/invite.svg`} />
                  <div className="message">
                    <p>{invites}</p>
                  </div>
                </div>
                <div className="textPart">
                  <h3>Invites</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Most Attempted Section - Show only if data exists */}
        {mostly && mostly.length > 0 && (
          <div className="row">
            <div className="col-md-12">
              <div className="mainHeading">
                <h1>Most Attempted</h1>
              </div>
            </div>
            {mostly.map((data, i) => (
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4"
                key={i}
              >
                <div className="attemptedBoxes">
                  <div className="boximg">
                    <div className="boxenter">
                      <img
                        src={`${window.IMG_BASE_URL}/custom_qbank/biochemistryw.svg`}
                      />
                    </div>
                  </div>
                  <div className="textSec">
                    <h3>{data?.custom_qbank}</h3>
                    <h4>
                      Created by {data?.name}
                      <span>Attempted by {data?.total_attempt}</span>
                    </h4>
                    <ul>
                      {/* <li>Topic<span className='textBLock'>{data?.custom_qbank}</span></li>
                                            <li>Created by<span className='textBLock1'>{data?.name}</span></li>
                                            <li>Attempted by<span className='textBLock1'>{data?.total_attempt} users</span></li> */}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recently Attempted Section - Show only if data exists */}
        {recents && recents.length > 0 && (
          <div className="row">
            <div className="col-md-12">
              <div className="mainHeading mainHeading1">
                <h1>Recently Attempted</h1>
              </div>
            </div>
            {recents.map((data, i) => (
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4"
                key={i}
              >
                <div className="attemptedBoxesNew">
                  <div className="boximg">
                    <div className="boxenter">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/qbank/attempbook.svg`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="textSet">
                    <h3>
                      {data?.custom_qbank} <span>1 week ago</span>
                    </h3>
                    <h4>
                      {data?.no_of_question} Questions{" "}
                      <span className="checkpic">
                        <img
                          src={`${window.IMG_BASE_URL}/custom_qbank/check.svg`}
                        />
                      </span>
                    </h4>
                    <h5>
                      <span className="menpic"></span>Created by {data?.name}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Customsecond;
