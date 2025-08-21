import "../../assets/css/home-page/style.css";
import "../../assets/css/home-page/responsive.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Topperszone = ({ allData }) => {
  const user_id = sessionStorage.getItem("id") || 4;
  const [activeTab, setActiveTab] = useState(
    allData?.homeData?.topper_zone?.category?.[0]?.id
      ? parseInt(allData.homeData.topper_zone.category[0].id)
      : 1
  );
  const [topperData, setTopperData] = useState([]);
  const [ModelData, setSelectedModeVal] = useState(false);
  const [show, setShow] = useState(false);

  const scrollContainerRef = useRef(null);

  const handleClose = () => setShow(false);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 500,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 500,
        behavior: "smooth",
      });
    }
  };

  const handleShow = (mode) => {
    setSelectedModeVal(mode);
    setShow(true);
  };

  const getTopperHandler = async () => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.HOMEPAGE_INDEX.TOPPER_ZONE_LIST_BY_ID,
        { user_id: user_id, topper_cat_id: activeTab }
      );
      setTopperData(data?.data);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    getTopperHandler();
  }, [activeTab]);

  return (
    <section
      className={`HometopperZone ${
        user_id != "4" ? "HometopperZone1" : ""
      } position-relative`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="zonetext">
              <h3 className="font-weight-bold">
                Toppers <span>Zone</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <div>
              {/* Tab buttons */}
              <div className="btn_tabbing">
                <div className="row">
                  <div className="col-9 col-md-9 col-lg-9 scrolling">
                    {allData?.homeData?.topper_zone?.category?.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(parseInt(item.id))}
                        className={
                          activeTab === parseInt(item.id) ? "active" : ""
                        }
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                  <div className="col-3 col-md-3 col-lg-3 text-right">
                    <Link
                      to="/topper-zone"
                      className="see-btn"
                      state={{ allData }}
                    >
                      See all
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tab content */}
              <div className="Tabbing_data scroll-group">
                <div>
                  <div className="row" ref={scrollContainerRef}>
                    {topperData?.map((result, index) => {
                      const displayValue = result.rank?.trim()
                        ? result.rank
                        : result.score;

                      const label = result.rank?.trim() ? "Rank" : "Score";

                      return (
                        <div
                          className="col-12 col-md-6 col-lg-3 article-img"
                          key={index}
                        >
                          <div className="testimonial">
                            <div className="pictesti">
                              <img src={result.image_url} alt={result.name} />
                            </div>
                            <div className="testimonial-profile">
                              <h3 className="title">{result.name}</h3>
                              <div className="post">
                                {label}:{" "}
                                <span className="badge badge-secondary">
                                  {displayValue || "N/A"}
                                </span>
                              </div>
                            </div>
                            <p className="description111">
                              <span>{result.message} </span>
                              <Link
                                data-name={result.name}
                                data-src={result.image_url}
                                className="reed"
                                onClick={() => handleShow(result)}
                              >
                                Read More
                              </Link>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Arrows */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "25px 10px 0",
                color: "#bdbdbd",
              }}
            >
              <FaArrowAltCircleLeft
                onClick={handleScrollLeft}
                size={32}
                style={{ marginRight: "25px", width: "25px" }}
              />
              <FaArrowAltCircleRight
                onClick={handleScrollRight}
                size={32}
                style={{ width: "25px" }}
              />
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal show={show} onHide={handleClose} className="readModel">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="content">
            <img
              className="expandedImg"
              src={ModelData.image_url}
              alt={ModelData.name}
            />
            <h3 className="text-center name-title">{ModelData.name}</h3>
            <p className="text-center">
              {ModelData.rank?.trim() ? (
                <div>
                  <span className="green-text">Rank</span>{" "}
                  <span>{ModelData.rank}</span>
                </div>
              ) : (
                <div>
                  <span className="green-text">Score</span>{" "}
                  <span>{ModelData.score}</span>
                </div>
              )}
            </p>
            <h5>{ModelData.message}</h5>
          </Modal.Body>
        </Modal>
      </div>
    </section>
  );
};

export default Topperszone;
