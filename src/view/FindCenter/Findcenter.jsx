import React, { useState, useEffect } from "react";
import "../../assets/newjs/style.css";
import "../../assets/css/shortcodes/shortcodes.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
// import maskbg from './image/mask.png'

const FindCenter = () => {
  const locations = useLocation();
  var allLocationData = locations?.state?.data;
  const [stateData, setStateData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [stateValue, setStateValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [citiesValue, setCitiesValue] = useState("");
  const [contentData, setContentData] = useState([
    { name: "Content type", value: "0" },
    { name: "Face to face", value: "1" },
  ]);
  const [selectedValue, setSelectedValue] = useState("1");

  var [allLocationData, setAllLocationData] = useState(
    allLocationData ? allLocationData : []
  );

  const getStates = async () => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.FIND_CENTER.FIND_STATE,
        {
          country_id: 1,
          center_type: selectedValue,
        }
      );
      setStateData(response?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeState = (e) => {
    setCitiesValue("");
    setStateValue(e.target.value);
  };

  useEffect(() => {
    getStates();
  }, []);

  const getCities = async () => {
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.FIND_CENTER.FIND_CITY,
        {
          state_id: stateValue,
          center_type: selectedValue,
        }
      );
      setCitiesData(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (stateValue) {
      getCities();
    }
  }, [stateValue]);

  useEffect(() => {
    if (contentData.length > 0) {
      setSelectedValue(contentData[1]?.value);
    }
  }, [contentData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stateValue || !citiesValue) {
      toast.error(
        !stateValue
          ? "please select the the state"
          : "please select the the city"
      );
    } else {
      try {
        setAllLocationData([]);
        setLoading(true);
        const res = await axiosInstance.post(
          API_ENDPOINTS.FIND_CENTER.FIND_CENTER,
          {
            center_type: selectedValue,
            state_id: stateValue,
            city_id: citiesValue,
          }
        );

        const filter = res.data.data.filter((itm) => itm.ACTIVE === "1");

        setAllLocationData(filter);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="FindCenter">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>Find Center</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="FindCenterdata">
        <div className="searchTextcenter">
          {/* <div className="bgbackg" style={{backgroundImage: "url(../images/mask.png)"}}> */}
          <div className="bgbackg"></div>
          <div className="container">
            <h5 className="searchhead sblue" style={{ marginBottom: "35px" }}>
              Find DAMS Learning Centre
            </h5>
            <div className="row">
              <div className="col-6 col-md-3">
                <div className="input-group md-form form-sm form-2">
                  <select
                    name="c"
                    className="form-control"
                    onChange={(e) => setSelectedValue(e.target.value)}
                    value={selectedValue}
                  >
                    {contentData?.map((itm, i) => (
                      <option key={i} value={itm.value}>
                        {" "}
                        {itm.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="input-group md-form form-sm form-2">
                  <select name="country" className="form-control" value="1">
                    <option selected="" value="0">
                      Select Country
                    </option>
                    <option value="1">India</option>
                  </select>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="input-group md-form form-sm form-2">
                  <select
                    name="state"
                    className="form-control"
                    onChange={handleChangeState}
                    value={stateValue}
                  >
                    <option value="0">Select State</option>
                    {stateData &&
                      stateData?.map((itm, i) => (
                        <option key={i} value={itm.STATE_ID}>
                          {itm.STATE_NAME}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="input-group md-form form-sm form-2">
                  <select
                    name="city"
                    className="form-control my-0 py-1 amber-border"
                    value={citiesValue}
                    onChange={(e) => setCitiesValue(e.target.value)}
                  >
                    <option>Select City</option>
                    {citiesData &&
                      citiesData?.map((itm, i) => (
                        <option value={itm.CITY_ID}>{itm.CITY_NAME}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-12">
                <div
                  className="input-group md-form form-sm form-2"
                  id="search"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #1976D2, #00A651)",
                    borderRadius: "42px",
                  }}
                >
                  <input
                    type="submit"
                    name="submit"
                    value="Search"
                    onClick={handleSubmit}
                    className="form-control my-0 py-1 amber-border"
                    style={{}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <section className="course-section-center">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 ">
                  <div className="text-center corsmargin mb-5">
                    <h2 className="sblue">DAMS Learning Centres Near You</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="container1 customcontaier" id="centers">
              <div className="row rowbg">
                {/* {allLocationData.length < 1 && "no data found..."} */}
                {loading && (
                  <div
                    style={{
                      height: "30vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Spinner />
                  </div>
                )}
                {allLocationData.length <= 0}
                {allLocationData?.map((itm, i) => (
                  <div className="col-12 col-md-4 col-lg-3">
                    <div className="item courses bordr-right">
                      <div className="single-item thumb">
                        <div className="thumb-box">
                          <iframe
                            frameborder="0"
                            style={{
                              overflow: "hidden",
                              pointerEvents: "none",
                            }}
                            src={`https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=DAMS+is+one+of+the+Best+Coaching+Institute+in+${encodeURIComponent(
                              itm?.CITY_NAME
                            )}+for+the+PG+Medical+Entrance+Examinations+AIPG+(NBE)+NEET+AIIMS+PGI+UPSC+and+DNB.&z=14&output=embed`}
                            width="100%"
                            height="140px"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      </div>
                      <div className="center_text">
                        <h2
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            padding: "0px 5px",
                          }}
                        >
                          {decodeURIComponent(itm.CENTRE_NAME)}
                        </h2>

                        <p>
                          <span>
                            <img src={`${window.IMG_BASE_URL}/ab.png`} />
                          </span>
                          <span className="text">
                            {decodeURIComponent(itm.ADDRESS_LINE1) +
                              decodeURIComponent(itm.ADDRESS_LINE2) +
                              decodeURIComponent(itm.ADDRESS_LINE3)}
                          </span>
                        </p>
                        <p>
                          <span>
                            <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/courses/email_black_24dp.svg" />
                          </span>
                          <span className="text">
                            {decodeURIComponent(itm.EMAIL)}
                          </span>
                        </p>
                        <p style={{ marginBottom: "14px" }}>
                          <span>
                            <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/courses/phone_black_24dp.svg" />
                          </span>
                          <span className="text">
                            {" "}
                            {itm.MOBILE ? itm.MOBILE : itm.PHONE}
                          </span>
                        </p>
                      </div>
                      <div className="center_btn">
                        <a
                          className="btncourse"
                          href={`https://maps.google.com/maps?q=${
                            decodeURIComponent(itm.ADDRESS_LINE1) +
                            decodeURIComponent(itm.ADDRESS_LINE2) +
                            decodeURIComponent(itm.ADDRESS_LINE3)
                          }`}
                          target="_blank"
                        >
                          {" "}
                          Get Directions
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div
        className="section-area section-sp1 gallery-bx why-choose-bg has-white-bg"
        style={{
          backgroundImage:
            "url('https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/newjs/img/about/why-bg.png')",
        }}
      >
        <div className="container">
          <div className="row" style={{ background: "#fff" }}>
            <div className="col-lg-12  car">
              <div className="row align-center">
                <div className="col-lg-8 offset-lg-2"></div>
                <div className="col-lg-4 col-md-4 carthumb thumb">
                  {/* <img
                    src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/newjs/img/about/ab.png"
                    alt="Thumb"
                  /> */}
                  <img src="./web/ab.png" />
                </div>
                <div className="col-lg-8 col-md-8 info ">
                  <p>
                    Since 1999 Delhi Academy of Medical Sciences (DAMS) has
                    nurtured and led hundreds of students to PG Medical Entrance
                    Success. At DAMS, we are working toward a future where
                    everyone's potential can be fulfilled and we're growing fast
                    through our impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FindCenter;
