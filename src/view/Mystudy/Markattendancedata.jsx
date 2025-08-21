import React from "react";
import "../Mystudy/style.css";
import "../Mystudy/responsive.css";
import {useNavigate } from "react-router-dom";


const Markattendancedata = () => {

  // const navigate = useNavigate();
  // const handleClick = () => {
  //   navigate("/scanqr-data");
  // };
 
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate within the app
    navigate("/scanqr-data");

    // Open additional URLs in new tabs
    window.open("/self-attendance", "_self");
    //window.open("/page2", "_blank");
  };

  return (
    <div className="Markattendancedata">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Mark Attendance</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="Markattendance">
        <div className="container">
            <div className="profile-card">
              <div className="headertop">
                <div className="proImg">
                  <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/profilePic.svg' className="profile-pic" />
                </div>
                <div className="prodetail">
                  <h2 className="name">Aman Kumar</h2>
                  <p>+91 9876543210</p>
                  <p>aman@damsdelhi.com</p>
                  <p>ID: DAMS0595012</p>
                </div>
              </div>

              <div className="details">
                <table>
                  <tr>
                    <td><strong>Address:</strong></td>
                    <td>4141, Weld Cor House, Gali Shahara, Ajmeri Gate, Delhi</td>
                  </tr>
                  <tr>
                    <td><strong>Center Name:</strong></td>
                    <td>AMS Karol Bagh</td>
                  </tr>
                  <tr>
                    <td><strong>Center Location:</strong></td>
                    <td>4B, Grover's Chamber Pusa Road, New Delhi-110 005</td>
                  </tr>
                  <tr>
                    <td><strong>Registration Date:</strong></td>
                    <td>25-05-2024</td>
                  </tr>
                  <tr>
                    <td><strong>Expiry Date:</strong></td>
                    <td>24-05-2025</td>
                  </tr>
                </table>
              </div>
              <div className="qr-section">
                <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/qrCode.svg' />
              </div>
              <div className="btnData">
                <button type="button" className="selfAtte" onClick={handleClick}>Mark Attendance By Self</button>

                <button type="button" className="qrAtt" onClick={handleClick}>Mark AttendanceBy QR Scanner</button>
              </div>
            </div>
           
        </div>
      </div>
    </div>
  );
};

export default Markattendancedata;
