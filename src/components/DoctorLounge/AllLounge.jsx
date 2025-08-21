import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { RightOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const AllLounge = () => {
  // const user_id = sessionStorage.getItem("id");
  const [videoData, setvidData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllCat = async () => {
      const response = await axiosInstance.get(
        API_ENDPOINTS.DOCTOR_LOUNGE.PODCAST_CATEGORY_LIST
      );
      if (response.status) {
        setvidData(response?.data?.data);
      }
    };
    getAllCat();
  }, []);
  const handleShow = (id) => {
    navigate(`/lounge/${id}`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="AllLounge">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>Podcast video category</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="LoudgeData">
        <div className="container">
          <Row>
            {videoData?.map((itm, index) => (
              <Col key={index} md={4} style={{ marginBottom: "20px" }}>
                <div
                  className="videoData"
                  style={{}}
                  onClick={() => handleShow(itm.cat_id)}
                >
                  <img
                    src={itm.icon}
                    loading="lazy"
                    alt="Video Banner"
                    style={{}}
                  />
                  <div className="videotext" style={{}}>
                    <p style={{}}>{itm.category}</p>
                    <RightOutlined />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AllLounge;
