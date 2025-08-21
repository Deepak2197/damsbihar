
import "../../assets/css/event/style.css";
import "../../assets/css/event/responsive.css"
import "../../assets/new_design/css/footer.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../apiConfig";
import axiosInstance from "../../../API/axiosConfig";

const Eventlist = () => {
  const navigate = useNavigate();
  const handleBookOnline = (eventId) => {
    localStorage.setItem("eventId", eventId);
    navigate("/eventcenter");
  };

  const [catlist, setallcat] = useState([]);
  const [eventlistdata, seteventlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // State to keep track of active category

  const user_id = sessionStorage.getItem("id");
  const city_id = null;
  const cat_id = null;
  const event_name = null;

  useEffect(() => {
    axiosInstance
      .post(`/v2_data_model/get_all_events`, {
        user_id: user_id,
        city_id: city_id,
        cat_id: cat_id,
        event_name: event_name,
      })
      .then((response) => {
        setallcat(response.data.data.cat_wise_event_list);
        seteventlist(response.data.data.cat_wise_event_list[0].event_list);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  }, []);

  const handleCategoryClick = (categoryId, categoryName) => {
    axiosInstance
      .post(`/v2_data_model/get_all_events`, {
        user_id: user_id,
        city_id: city_id,
        cat_id: categoryId === 0 ? null : categoryId,
        event_name: categoryName === "All" ? null : categoryName,
      })
      .then((response) => {
        seteventlist(response.data.data.cat_wise_event_list[0].event_list);
        setActiveCategory(categoryId); // Set the active category on click
      })
      .catch((error) => {
        console.error(`Error fetching events for ${categoryName}:`, error);
      });
  };

  return (
    <div className="EventList">
        <div className="page-content position-relative">
          <div className="breadcrumb-row">
            <div className="container">
                <ul className="list-inline">
                    <li><a href={'/'}>Home</a></li>
                    <li style={{ color: "#434343" }}>Events</li>
                </ul>
            </div>
          </div>
        </div>
      <section className="event_module">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="row dams-center"
                id="divShowHide"
                style={{ display: "none" }}
              ></div>
              <div className="tab-content" id="addeventtype">
                <div id="new-delhi" className="tab-pane active">
                  <div className="upcom_event">
                    <div className="row position-relative">
                      <div className="col-12 position-relative">
                        <div className="search_btng ">
                          <input
                            type="text"
                            className="form-control"
                            id="search"
                            aria-describedby="filterIt"
                            placeholder="Search all event"
                          />
                          <a href="#">
                            <i className="fa fa-search"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-12">
                        <ul className="nav nav-pills" role="tablist" id="event">
                          {catlist.map((eventcat) => (
                            <li className="nav-item" key={eventcat.id}>
                              <a
                                className={`nav-link ${eventcat.id === 0 && activeCategory === null
                                    ? "active"
                                    : ""
                                  } ${activeCategory === eventcat.id ? "active" : ""
                                  }`}
                                data-toggle="pill"
                                href="#dvt"
                                data-event-id="0"
                                onClick={() =>
                                  handleCategoryClick(eventcat.id, eventcat.name)
                                }
                              >
                                {eventcat.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-12 col-lg-12">
                        <div id="eventListAjax">
                          <div className="tab-content" id="add-event">
                            <div id="dvt" className="tab-pane active">
                              <div className="dvt_sec">
                                <div className="row">
                                  {eventlistdata.map((event) => (
                                    <div
                                      className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 sec_pd"
                                      key={event.id}
                                    >
                                      <a href="#"></a>
                                      <div className="event_prt">
                                        <a href="#">
                                          <div className="img_sec position-relative">
                                            <img src={event.cover_image} alt="" />
                                          </div>
                                        </a>
                                        <div className="text_sec">
                                          <a href="#">
                                            <div className="row m-0">
                                              <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                                <div className="matter">
                                                  <h5>{event.title}</h5>
                                                  <h6>
                                                    {event.event_start_date},
                                                    {event.event_vanue},
                                                    {event.event_start_time}
                                                  </h6>
                                                </div>
                                              </div>
                                              <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                                <div className="event-type">
                                                  <h5>Event Type</h5>
                                                  {parseInt(
                                                    event.availability_course,
                                                    10
                                                  ) === 1 && <h6>Online</h6>}
                                                  {parseInt(
                                                    event.availability_course,
                                                    10
                                                  ) === 2 && (
                                                      <h6 className="face-text">
                                                        Face to Face
                                                      </h6>
                                                    )}
                                                  {parseInt(
                                                    event.availability_course,
                                                    10
                                                  ) === 3 && (
                                                      <h6 className="blue-text">
                                                        Online | Face to Face
                                                      </h6>
                                                    )}
                                                </div>
                                              </div>
                                            </div>
                                          </a>
                                          <div className="row m-0 border-dashed">
                                            <a href="#">
                                              <div className="col-2 position-relative">
                                                <div className="price-text">
                                                  <p>
                                                    <span className="text-set">
                                                      ₹{event.mrp}{" "}
                                                      {event.event_id}
                                                    </span>
                                                  </p>
                                                </div>
                                              </div>
                                            </a>
                                            <div className="col-10">
                                              <div className="on-btn">
                                                <a href="#"></a>
                                                <a href="#">
                                                  <span></span>
                                                </a>

                                                {event.availability_course ===
                                                  "2" ||
                                                  event.availability_course ===
                                                  "3" ? (
                                                  <button
                                                    className="btn"
                                                    onClick={() =>
                                                      handleBookOnline(event.id)
                                                    }
                                                  >
                                                    Book F2F
                                                  </button>
                                                ) : (
                                                  <button className="btn">
                                                    Book Online
                                                  </button>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-12">
                                            <div className="onwrd"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Eventlist;
