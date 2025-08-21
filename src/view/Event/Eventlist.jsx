import "../../assets/css/event/style.css";
import "../../assets/css/event/responsive.css";
import "../../assets/new_design/css/footer.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axiosInstance from "../../API/axiosConfig";
import { Skeleton } from "antd";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

Modal.setAppElement("#root");

const Eventlist = () => {
  const navigate = useNavigate();

  // State variables
  const [catlist, setCatlist] = useState([]); // List of categories
  const [eventlistdata, setEventlistdata] = useState([]); // Filtered event list to display
  const [allEvents, setAllEvents] = useState([]); // Store all events from API
  const [activeCategory, setActiveCategory] = useState(null); // Active category ID
  const [searchTerm, setSearchTerm] = useState(""); // Search input term
  const [spin, setSpin] = useState(false); // Loading state

  // User and default parameters
  const user_id = sessionStorage.getItem("id");
  const city_id = null;
  const cat_id = null;
  const event_name = null;

  // Fetch all events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      setSpin(true);
      try {
        const response = await axiosInstance.post(
          API_ENDPOINTS.EVENT.GET_ALL_EVENTS,
          {
            user_id: user_id,
            city_id: city_id,
            cat_id: cat_id,
            stage_type:1,
            event_name: event_name,
          }
        );
        console.log(response.data.data);
        const data = response?.data?.data;
        setCatlist(data?.cat_wise_event_list || []);
        setAllEvents(data?.cat_wise_event_list || []);
        setEventlistdata(data?.cat_wise_event_list[0]?.event_list || []);
        setActiveCategory(data?.cat_wise_event_list[0]?.id || 0); // Default to first category
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setSpin(false);
      }
    };
    fetchEvents();
  }, []);

  // Handle category click to filter events
  const handleCategoryClick = (categoryId, categoryName) => {
    setActiveCategory(categoryId);
    const selectedCategory = allEvents.find((cat) => cat.id === categoryId);
    setEventlistdata(selectedCategory?.event_list || []);
  };

  // Handle search filtering within the active category
  useEffect(() => {
    if (searchTerm) {
      const filteredData = eventlistdata.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setEventlistdata(filteredData);
    } else {
      // Reset to the active category's events when search is cleared
      const activeCat = allEvents.find((cat) => cat.id === activeCategory);
      setEventlistdata(activeCat?.event_list || allEvents[0]?.event_list || []);
    }
  }, [searchTerm, allEvents, activeCategory]);

  // Search input handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Navigation handlers
  const handleBookOnline = (eventId) => {
    localStorage.setItem("eventId", eventId);
    navigate("/eventcenter");
  };

  const handleEvent = (eventId) => {
    localStorage.setItem("eventId", eventId);
    navigate("/Eventbooking");
  };

  const handleViewDetails = (eventId) => {
    navigate("/event-ticket", { state: { eventId } });
  };

  return (
    <div className="EventList">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li style={{ color: "#424242" }}>Events</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="event_module">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="upcom_event">
                {/* Search Bar */}
                <div className="row position-relative">
                  <div className="col-12 position-relative">
                    <div className="search_btng">
                      <input
                        type="text"
                        className="form-control"
                        id="search"
                        placeholder="Search all events"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                      <i className="fa fa-search"></i>
                    </div>
                  </div>
                </div>

                {/* Event Categories and List */}
                <Skeleton active loading={spin} paragraph={{ rows: 4 }}>
                  <div className="row">
                    {/* Category Tabs */}
                    <div className="col-12 col-lg-12">
                      <ul className="nav nav-pills" role="tablist" id="event">
                        {catlist.map((eventcat) => (
                          <li className="nav-item" key={eventcat.id}>
                            <Link
                              className={`nav-link ${
                                activeCategory === eventcat.id ? "active" : ""
                              }`}
                              data-toggle="pill"
                              href="#dvt"
                              onClick={() =>
                                handleCategoryClick(eventcat.id, eventcat.name)
                              }
                            >
                              {eventcat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Event List */}
                    <div className="col-12 col-lg-12">
                      <div id="eventListAjax">
                        <div className="tab-content" id="add-event">
                          <div id="dvt" className="tab-pane active">
                            <div className="dvt_sec">
                              <div className="row">
                                {eventlistdata.length > 0 ? (
                                  eventlistdata.map((event) => (
                                    <div
                                      className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 sec_pd"
                                      key={event.id}
                                    >
                                      <div className="event_prt">
                                        {/* Event Image */}
                                        <Link to="#">
                                          <div className="img_sec position-relative">
                                            <img
                                              src={
                                                event.cover_image ||
                                                "https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/img1.svg"
                                              }
                                              alt={event.title}
                                              onError={(e) =>
                                                (e.target.src =
                                                  "https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/img1.svg")
                                              }
                                            />
                                            <div className="online">
                                              <p>
                                                {parseInt(
                                                  event.availability_course
                                                ) === 1 && <h6>Online</h6>}
                                                {parseInt(
                                                  event.availability_course
                                                ) === 2 && (
                                                  <h6 className="face-text">
                                                    Face to Face
                                                  </h6>
                                                )}
                                                {parseInt(
                                                  event.availability_course
                                                ) === 3 && (
                                                  <h6 className="blue-text">
                                                    Online | Face to Face
                                                  </h6>
                                                )}
                                              </p>
                                            </div>
                                          </div>
                                        </Link>

                                        {/* Event Details */}
                                        <div className="text_sec">
                                          <Link to="#">
                                            <div className="row m-0">
                                              <div className="col-12">
                                                <div className="SetofDiv">
                                                  <div className="matter">
                                                    <h5>{event.title}</h5>
                                                    <h6>
                                                      {event.event_start_date},{" "}
                                                      {event.event_vanue},{" "}
                                                      {event.event_start_time}
                                                    </h6>
                                                  </div>
                                                  <div className="event-type">
                                                    <h5>
                                                      <span className="text-set">
                                                        {event.mrp == 0 ? (
                                                          <span
                                                            style={{
                                                              color: "green",
                                                            }}
                                                          >
                                                            Free
                                                          </span>
                                                        ) : (
                                                          `₹${event.mrp}`
                                                        )}
                                                      </span>
                                                    </h5>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </Link>

                                          {/* Booking Buttons */}
                                          <div className="row m-0">
                                            <div className="col-12 col-md-12">
                                              <div className="on-btn">
                                                {event.is_purchased == 1 ? (
                                                  <button
                                                    className="btn btn-booked"
                                                    style={{
                                                      backgroundColor: "green",
                                                      color: "white",
                                                    }}
                                                    disabled
                                                  >
                                                    Booked
                                                  </button>
                                                ) : parseInt(
                                                    event.availability_course,
                                                    10
                                                  ) === 3 ? (
                                                  <div>
                                                    <button
                                                      className="btn btn-online"
                                                      onClick={() =>
                                                        handleEvent(event.id)
                                                      }
                                                    >
                                                      Book Online
                                                    </button>
                                                    <button
                                                      className="btn btn-face2face"
                                                      onClick={() =>
                                                        handleBookOnline(
                                                          event.id
                                                        )
                                                      }
                                                      style={{
                                                        backgroundColor:
                                                          "#f15a22",
                                                        color: "white",
                                                      }}
                                                    >
                                                      Book Face to Face
                                                    </button>
                                                  </div>
                                                ) : parseInt(
                                                    event.availability_course,
                                                    10
                                                  ) === 1 &&
                                                  parseInt(event.is_cbt, 10) ===
                                                    1 ? (
                                                  <button
                                                    className="btn btn-cbt"
                                                    onClick={() =>
                                                      handleEvent(event.id)
                                                    }
                                                  >
                                                    CBT
                                                  </button>
                                                ) : parseInt(
                                                    event.availability_course,
                                                    10
                                                  ) === 2 ? (
                                                  <button
                                                    className="btn btn-face2face"
                                                    onClick={() =>
                                                      handleBookOnline(event.id)
                                                    }
                                                    style={{
                                                      backgroundColor:
                                                        "#f15a22",
                                                      color: "white",
                                                    }}
                                                  >
                                                    Book Face to Face
                                                  </button>
                                                ) : (
                                                  <button
                                                    className="btn btn-online"
                                                    onClick={() =>
                                                      handleEvent(event.id)
                                                    }
                                                  >
                                                    Book Online
                                                  </button>
                                                )}
                                              </div>

                                              {/* View Details Button */}
                                              {event.is_purchased === "1" &&
                                                event.availability_course ===
                                                  "2" && (
                                                  <div className="on-btn">
                                                    <button
                                                      className="btn btn-details"
                                                      onClick={() =>
                                                        handleViewDetails(
                                                          event.id
                                                        )
                                                      }
                                                      style={{
                                                        backgroundColor:
                                                          "#007bff",
                                                        color: "white",
                                                      }}
                                                    >
                                                      View Details
                                                    </button>
                                                  </div>
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="col-12">
                                    <p>No events found for this category.</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Skeleton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Eventlist;
