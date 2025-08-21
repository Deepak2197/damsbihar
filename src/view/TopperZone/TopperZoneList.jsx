import React, { useState, useEffect } from "react";
import "../TopperZone/style.css";
import axiosInstance from "../../API/axiosConfig";
import { useLocation } from "react-router-dom";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const TopperszoneList = () => {
  const location = useLocation();
  const { allData } = location.state || {};

  const categories = allData?.homeData?.topper_zone?.category || [];

  const [activeTab, setActiveTab] = useState(categories[0]?.id || "1");
  const [topperDataMap, setTopperDataMap] = useState({});

  const user_id = sessionStorage.getItem("id") || 4;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const fetchDataForCategories = async () => {
      try {
        const requests = categories.map((cat) =>
          axiosInstance.post(API_ENDPOINTS.HOMEPAGE_INDEX.TOPPER_ZONE_LIST_BY_ID, {
            user_id,
            topper_cat_id: cat.id,
          })
        );

        const responses = await Promise.allSettled(requests);

        const dataMap = {};
        responses.forEach((res, index) => {
          if (res.status === "fulfilled") {
            dataMap[categories[index].id] = res.value.data.data;
          }
        });

        setTopperDataMap(dataMap);
      } catch (error) {
        console.error("Error fetching topper data:", error);
      }
    };

    if (categories.length > 0) {
      fetchDataForCategories();
    }
  }, [user_id, categories]);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <>
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>Topper Zone</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="topper_zone">
        <div className="container">
          <div className="row">
            {/* Tab buttons */}
            <div className="btn_tabbing mb-3">
              <div className="row">
                <div className="col-12">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleTabClick(cat.id)}
                      className={activeTab === cat.id ? "active" : ""}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab content */}
            <div className="Tabbing_data">
              <div className="row">
                {(topperDataMap[activeTab] || []).map((result, index) => (
                  <div
                    className="col-lg-6 col-md-12 col-sm-12 col-12"
                    key={index}
                  >
                    <div className="testimonialTopper mb-4">
                      <div className="picbg topz">
                        <img
                          src={result.image_url}
                          alt={result.name || "Topper"}
                        />
                      </div>
                      <div className="testimonial-profile">
                        <h3 className="title">{result.name}</h3>
                        <div className="post">
                          {result.rank ? "Rank " : result.score ? "Score " : ""}
                          {(result.rank || result.score) && (
                            <span className="badge badge-secondary">
                              {result.rank || result.score}
                            </span>
                          )}
                        </div>
                      </div>
                      <p>{result.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopperszoneList;
