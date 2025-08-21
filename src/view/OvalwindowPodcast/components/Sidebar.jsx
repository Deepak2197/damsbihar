import "../../../assets/css/shortcodes/shortcodes.css";
import "../../../assets/css/podcast/style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../apiConfig";
import { Link } from "react-router-dom";
import axiosInstance from "../../../API/axiosConfig";
import { API_ENDPOINTS } from "../../../ulits/apiConstant";

const Sidebar = ({ onDataUpdate, sidebarData, setPodcast }) => {
  const userid = sessionStorage.getItem("id");
  const [itemName, setItemName] = useState("podcast");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(
          API_ENDPOINTS.PODCAST.AUTHOR_CHANNEL,
          { user_id: userid, stream_id: 1 }
        );
      } catch (error) {}
    };

    fetchData();
  }, [userid]);

  return (
    <div className="leftside">
      <div className="podcastScreen">
        <div className="bannerLeft">
          Oval <span class="d-block">Window</span>
        </div>
        <div className="bannerRyt">
          The <span className="mobPed">DAMS</span>{" "}
          <span class="d-block">Podcast</span>
        </div>
      </div>
      <div className="nav nav-pills nav-pills-custom leftportion">
        {sidebarData?.map((item, i) => (
          <div class="setOfPodcastBox">
            <Link
              // className={item.class}
              className={
                item.value === itemName ? "nav-link active show" : "nav-link"
              }
              onClick={() => {
                setPodcast(item.value);
                setItemName(item.value);
              }}
            >
              <div class="picPart">
                <span>
                  <img
                    className="imgtab"
                    src={item.image}
                    loading="lazy"
                    alt="icon image"
                  />
                </span>
              </div>

              <div class="textPart">
                <span>{item.name}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
