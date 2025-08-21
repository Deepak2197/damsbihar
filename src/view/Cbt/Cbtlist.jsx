import React, { useState, useEffect } from "react";
import "../../assets/css/cbt_select_exam/style.css";
import "../../assets/css/cbt_select_exam/responsive.css";
// import "../../assets/css/cbt_select_exam/bootstrap.min.css";
import { Link } from "react-router-dom";
import CbtModel from "../Cbt/Component/CbtModel";
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Cbtlist = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [cbtCatData, setCbtCatData] = useState([]);
  const [cbtListData, setCbtListData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  // const [buyCbtid, setbuyCbtid] = useState([]);
  // const [Cbttype, setcbtType] = useState([]);
  const [Search, setsearch] = useState("");
  const [filterlist, setfilterlist] = useState([]);
  const [comingSoon, setComingSoon] = useState(false);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axiosInstance.post(
          API_ENDPOINTS.CBT.GET_CBT_CAT_LIST,
          {
            user_id: sessionStorage.getItem("id"),
          }
        );
        setCbtCatData(response.data.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, []);

  useEffect(() => {
    const fetchListData = async () => {
      try {
        const response = await axiosInstance.post(
          API_ENDPOINTS.CBT.GET_CBT_LIST,
          {
            user_id: sessionStorage.getItem("id"),
            cbt_id: activeTab === "all" ? null : activeTab,
          }
        );

        const data = response.data.data;
        if (data === null) {
          // toast.error("No data found");
          setCbtListData([]);
        } else {
          setCbtListData(data);
        }

        // Check if the active category status is false
        const activeCategory = cbtCatData.find((cat) => cat.id === activeTab);
        setComingSoon(activeCategory?.status === false);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };

    fetchListData();
  }, [activeTab, cbtCatData]);

  useEffect(() => {
    const filteredData = cbtListData.filter((item) =>
      item.title.toLowerCase().includes(Search.toLowerCase())
    );
    setfilterlist(filteredData);
  }, [cbtListData, Search]);

  const handleBuyClick = (cbtId, Types) => {
    setShowPopup(true);
    localStorage.setItem("Cbtid", JSON.stringify(cbtId));
    localStorage.setItem("CbtType", JSON.stringify(Types));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const handleClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="cbtList">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>CBT List</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="CbtSelectexam">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="search_btng position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search.."
                  onChange={(e) => setsearch(e.target.value)}
                />
                <i className="fa fa-search"></i>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="selectExamTab">
                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <a
                      className={`cbt_cat nav-link ${
                        activeTab === "all" ? "active show" : ""
                      }`}
                      onClick={() => handleClick("all")}
                    >
                      All
                    </a>
                  </li>
                  {cbtCatData.map((cbtcat) => (
                    <li key={cbtcat.id} className="nav-item">
                      <a
                        href="#"
                        className={`cbt_cat nav-link ${
                          activeTab === cbtcat.id ? "active show" : ""
                        }`}
                        onClick={() => handleClick(cbtcat.id)}
                      >
                        {cbtcat.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="tab-content">
                  <div id="4" className="tab-pane active">
                    {comingSoon ? (
                      <div className="coming-soon-message">Coming Soon</div>
                    ) : (
                      <div className="row" id="getCbt">
                        {filterlist.length > 0 ? (
                          filterlist.map((cbtlist, index) => (
                            <div
                              key={index}
                              className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 cbt-item"
                            >
                              <div className="damsSec">
                                <div className="row">
                                  <div className="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                    {cbtlist.cover_image && (
                                      <img
                                        src={cbtlist.cover_image}
                                        loading="lazy"
                                        alt="icon image"
                                      />
                                    )}
                                    {!cbtlist.cover_image && (
                                      <img
                                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/login_logo.png"
                                        loading="lazy"
                                        alt="icon image"
                                      />
                                    )}
                                  </div>
                                  <div className="col-8 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                    <div className="textSec">
                                      <h1>{cbtlist.title}</h1>
                                      <h2>
                                        ₹ {cbtlist.mrp}
                                        <span className="rupees">
                                          <del>
                                            {cbtlist?.before_discount_mrp
                                              ? `₹${cbtlist?.before_discount_mrp}`
                                              : null}
                                          </del>
                                        </span>
                                      </h2>
                                      <h3>
                                        {"Registration Last Date: "}
                                        <span className="date">
                                          {formatDate(cbtlist.last_date)}
                                        </span>
                                      </h3>
                                      <h3>
                                        {"Exam Date:"}
                                        <span className="date">
                                          {formatDate(cbtlist.exam_date)}
                                        </span>
                                      </h3>
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="btnGroup set">
                                      <Link
                                        to={`/cbt-instruction/${cbtlist.id}`}
                                        className="butBtn test"
                                      >
                                        Test Instructions
                                      </Link>
                                      {cbtlist.is_purchase === 1 ? (
                                        <a className="butBtn success">Booked</a>
                                      ) : (
                                        <a
                                          className="butBtn modal_show"
                                          onClick={() =>
                                            handleBuyClick(
                                              cbtlist.id,
                                              cbtlist.types
                                            )
                                          }
                                        >
                                          Buy Now
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="comingSoon">
                            {/* Coming Soon */}
                            {/* <img src="../comingsoon.svg" alt="sazved" /> */}
                            {"No Result"}
                          </div>
                        )}
                      </div>
                    )}
                    {showPopup && <CbtModel handleClose={handleClosePopup} />}
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

export default Cbtlist;
