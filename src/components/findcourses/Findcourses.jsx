import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Findcourses = () => {
  const nav = useNavigate();
  const [stateData, setStateData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [stateValue, setStateValue] = useState("");
  const [citiesValue, setCitiesValue] = useState("");
  const [contentData, setContentData] = useState([
    { name: "Content type", value: "0" },
    { name: "Face to face", value: "1" },
  ]);
  const [selectedValue, setSelectedValue] = useState("1");

  const coursesData = [
    // course data here
  ];

  const getStates = async () => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.HOMEPAGE_INDEX.FIND_STATE, {
        country_id: 1,
        center_type: selectedValue,
      });
      setStateData(response.data.data);
    } catch (err) {
      
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
      const res = await axiosInstance.post(API_ENDPOINTS.HOMEPAGE_INDEX.FIND_CITY, {
        state_id: stateValue,
        center_type: selectedValue,
      });
      setCitiesData(res.data.data);
    } catch (err) {
     
    }
  };

  const handlerFaceToFace = (e) => {
    setSelectedValue(e.target.value);
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
        !stateValue ? "Please select state first..." : "Please select city"
      );
    } else {
      try {
        const res = await axiosInstance.post(API_ENDPOINTS.HOMEPAGE_INDEX.FIND_CENTER, {
          center_type: selectedValue,
          state_id: stateValue,
          city_id: citiesValue,
        });
        nav("/find_center", { state: { data: res.data.data } });
      } catch (err) {
        
      }
    }
  };

  return (
    <section className="course-section">
      <div className="container">
        <div className="row rowbg">
          {coursesData &&
            coursesData.map((itm, i) => (
              <div className="col-6 col-sm-6 col-md-3 col-lg-3 " key={i}>
                <div className="item courses bordr-right">
                  <div className="single-item thumb">
                    <div
                      className="thumb-box"
                      style={{
                        backgroundColor: i % 2 === 0 ? "#F3E5F5" : "#FFEBEE",
                      }}
                    >
                      <img src={itm.img_url} loading="lazy" alt={itm.heading} />
                    </div>
                  </div>
                  <h2>{itm.heading}</h2>
                  <p>{itm.para}</p>
                  <a className="btncourse cartbtn" href={itm.ref}>
                    <i
                      className="fa fa-whatsapp"
                      aria-hidden="true"
                      style={{ color: "white" }}
                    ></i>{" "}
                    Connect
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="searchText">
        <div className="bgbackg"></div>
        <div className="container">
          <h5 className="searchhead sblue">
            Find DAMS Learning Centre
          </h5>
          <form onSubmit={handleSubmit} className="findcenterBg">
            <div className="row">
              <div className="col-6 col-md-3">
                <div className="input-group md-form form-sm form-2 pl-0">
                  <select
                    name="c"
                    className="form-control my-0 py-1 amber-border"
                    onChange={handlerFaceToFace}
                    value={selectedValue}
                  >
                    {contentData.map((itm, i) => (
                      <option key={i} value={itm.value}>
                        {itm.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="input-group md-form form-sm form-2 pl-0">
                  <select
                    name="country"
                    className="form-control my-0 py-1 amber-border"
                    defaultValue="1"
                    readOnly
                  >
                    <option value="0">Select Country</option>
                    <option value="1">India</option>
                  </select>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="input-group md-form form-sm form-2 pl-0">
                  <select
                    name="state"
                    className="form-control my-0 py-1 amber-border"
                    onChange={handleChangeState}
                    value={stateValue}
                  >
                    <option>Select State</option>
                    {stateData &&
                      stateData.map((itm, i) => (
                        <option key={i} value={itm.STATE_ID}>
                          {itm.STATE_NAME}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="input-group md-form form-sm form-2 pl-0">
                  <select
                    name="city"
                    className="form-control my-0 py-1 amber-border"
                    value={citiesValue}
                    onChange={(e) => setCitiesValue(e.target.value)}
                  >
                    <option>Select City</option>
                    {citiesData &&
                      citiesData.map((itm, i) => (
                        <option key={i} value={itm.CITY_ID}>
                          {itm.CITY_NAME}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-12 search_bar">
                <div className="input-group md-form form-sm form-2 pl-0" id="submit">
                  <input
                    type="submit"
                    value="Search"
                    className="form-control my-0 py-1 amber-border"
                    style={{
                      cursor: "pointer",
                      background: "transparent",
                      color: "#fff",
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Findcourses;
