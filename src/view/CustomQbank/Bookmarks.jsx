import React, { useEffect, useState } from "react";
import axiosInstance from "../../API/axiosConfig";
import "../../assets/css/bookmark/style.css";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import BookMarkSkeleton from "./BookmarkSkeleton";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Bookmarks = () => {
  const user_id = sessionStorage.getItem("id");
  const [qbListData, setQbListData] = useState([]);
  const [arrowToggle, setArrowToggle] = useState(null);
  const [mybookmarkList, setMybookmarkList] = useState([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axiosInstance.post(
          API_ENDPOINTS.BOOKMARK.BOOKMARK_CATEGORY_LIST,
          { user_id: user_id, stream: "1", q_type_dqb: "2", type: "QUIZ" }
        );
        setLoading(false)
        const data = response?.data?.data.filter((itm) => itm.total > 0) || [];
        setQbListData(data);
      } catch (err) {
        console.log(err);
        setQbListData([]); // Set empty array on error
      }
    };
    getdata();
  }, []);

  const handleSectionClick = (index) => {
    setArrowToggle(arrowToggle === index ? null : index);
    if (arrowToggle !== index) {
      getCalledToggle(index);
    }
  };

  const getCalledToggle = async (id) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.CUSTOM_QBANK.BOOKMARK_LIST, {
        user_id: user_id,
        steam: "",
        last_post_id: "",
        tag_id: id,
        test_series_id: "",
        q_type_dqb: "2",
        type: "QUIZ",
        search_text: "",
      });
      setMybookmarkList(response?.data?.data || []);
    } catch (err) {
      console.log(err);
      setMybookmarkList([]);
    }
  };

  return (
    <div className="DqbBookmarkData">
      
      <div className="container">
        <ul className="list-inline">
          <li>
            <a href="/">Home </a> Book Mark
          </li>
        </ul>
        {loading?(<BookMarkSkeleton/>):(
        qbListData.length === 0 ? (
          <div className="no-bookmark">
            <h3>No Bookmark Available </h3>
          </div>
        ) : (
          
          <div>
            {qbListData.map((itm, i) => (
              <div
                key={i}
                className="tab-content1"
                style={{ position: "relative" }}
              >
                <div className="loaderajax" style={{ display: "none" }}>
                  <img
                    loading="lazy"
                    alt="loader"
                    src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/Double Ring-1s-200px.svg"
                  />
                </div>

                <div className="tab-pane fade show active">
                  <div id="post_list">
                    <div className="widget curriculum-emez">
                      <div className="widget-post-bx">
                        <div className="setofDiv">
                          <div className="widget-post clearfix">
                            <div className="listbox_bookmark text-center">
                              <h1>{itm.text.charAt(0)}</h1>
                            </div>
                            <div className="ttr-post-info">
                              <div className="ttr-post-header flex-grow-1">
                                <span
                                  className="arrowSet"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleSectionClick(itm.id)}
                                >
                                  {arrowToggle === itm.id ? (
                                    <FaAngleDown size={20} />
                                  ) : (
                                    <FaAngleRight size={20} />
                                  )}
                                </span>
                                <h6 className="post-title">
                                  <a className="feeddetails">
                                    {itm.text}{" "}
                                    <span>{itm.total} Questions</span>
                                  </a>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        {arrowToggle === itm.id && (
                          <div className="questionBoxSet">
                            {mybookmarkList.length === 0 ? (
                              <p>No bookmarks in this category</p>
                            ) : (
                              <ul>
                                {mybookmarkList.map((it, i) => (
                                  <li key={i}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: it.question,
                                      }}
                                    />
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        )
      )}
      </div>
    </div>
  );
};

export default Bookmarks;
