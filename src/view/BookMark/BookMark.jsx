import "../../assets/css/bookmark/style.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { RightOutlined, DownOutlined } from "@ant-design/icons";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Bookmarklist = () => {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");
  const user_id = sessionStorage.getItem("id");
  const [status, setStatus] = useState("Q");
  const [loading, setLoading] = useState(false);
  const [arrowToggle, setArrowToggle] = useState(null);
  const [audioToggle, setAudioToggle] = useState(false);
  const [audioData, setAudioData] = useState({});

  const [bookmarkData, setBookmarkData] = useState({
    daily_quiz_count: "",
    podcast_count: "",
    video_count: "",
    wishlist_count: "",
    video_bookmark_count: "",
    test_count: "",
    quiz_count: "",
  });
  const [qbListData, setQbListData] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);
  const [podcastData, setPodcastData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [mybookmarkList, setMybookmarkList] = useState([]);

 
  



  const getCalled = async () => {
    try {
      const res = await axiosInstance.post(API_ENDPOINTS.BOOKMARK.MY_BOOKMARKS, {
        user_id: user_id,
        stream_id: "1",
      });
      
      setBookmarkData({
        daily_quiz_count: res?.data?.data?.daily_quiz_count || 0,
        podcast_count: res?.data?.data?.podcast_count || 0,
        video_count: res?.data?.data?.video_count || 0,
        wishlist_count: res?.data?.data?.wishlist_count || 0,
        video_bookmark_count: res?.data?.data?.video_bookmark_count || 0,
        test_count: res?.data?.data?.test_count || 0,
        quiz_count: res?.data?.data?.quiz_count || 0,
      });

      const response = await axiosInstance.post(
        API_ENDPOINTS.BOOKMARK.BOOKMARK_CATEGORY_LIST,
        { user_id: user_id, stream: "1", q_type_dqb: "2", type: "QUIZ" }
      );

      const data = response?.data?.data
        ? response.data.data.filter((itm) => itm.total > 0)
        : [];
      setQbListData(data);
    } catch (err) {
      setQbListData([]);
      setBookmarkData({
        daily_quiz_count: 0,
        podcast_count: 0,
        video_count: 0,
        wishlist_count: 0,
        video_bookmark_count: 0,
        test_count: 0,
        quiz_count: 0,
      });
    }
  };

  const getCalledWishListRequest = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "v2_data_model/get_user_courses_wishlist",
        {
          user_id: id,
        }
      );
      setWishlistData(res?.data?.data?.course_list || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setWishlistData([]);
    }
  };
  const getCalledPodcastRequest = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "v2_data_model/get_bookmarked_podcast",
        {
          user_id: id,
        }
      );
      setPodcastData(res?.data?.data || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setPodcastData([]);
    }
  };
  const getCalledVideoRequest = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "v2_data_model/get_video_bookmark_list",
        {
          user_id: id,
        }
      );
      setVideoData(res?.data?.data?.vedio_list || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setVideoData([]);
    }
  };

  const getCalledToggle = async (id) => {
    try {
      const response = await axiosInstance.post("v2_data_model/bookmark_list_fanwall", {
        user_id: user_id,
        steam: "",
        last_post_id: "",
        tag_id: id,
        test_series_id: "",
        q_type_dqb: "2",
        type: "QUIZ",
        search_text: "",
      });
      setMybookmarkList(response.data.data || []);
    } catch (err) {
      setMybookmarkList([]);
    }
  };

  const handleSectionClick = (index) => {
    setArrowToggle(arrowToggle === index ? null : index);
    getCalledToggle(index);
  };

  useEffect(()=>{
    getCalled();
  },[])


  useEffect(() => {
    if (status === "W") {
      getCalledWishListRequest();
    } else if (status === "P") {
      getCalledPodcastRequest();
    } else if (status === "V") {
      getCalledVideoRequest();
    }
  }, [status]);

  const handlerAudio = (data) => {
    setAudioToggle(true);
    setAudioData(data);
  };
  const removebookmark = async (id) => {
    const res = await axiosInstance.post("/v2_data_model/bookmarked_podcast", {
      user_id: user_id,
      podcast_id: id,
      is_remove_bookmark: 1,
    });

    getCalledPodcastRequest();
  };

  const removebookq = async (id) => {
    const res = await axiosInstance.post(
      "/v2_data_model/remove_fanwal_bookmark",
      { user_id: user_id, question_id: id }
    );

    getCalled();
    window.location.reload();
  };

  const rmbookv = async (id) => {
    const res = await axiosInstance.post(
      "/v2_data_model/recorded_video_bookmark",
      { user_id: user_id, vedio_id: id, status: 0 }
    );
    getCalledVideoRequest();
  };

  return (
    <div className="Bookmarklist ">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li style={{ color: "#434343" }}>My Bookmark</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="content-block BookMarkdata">
        <div className="container book_cont">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="setDivBookmark">
                <div className="tab-content">
                  <div className="tab-pane active">
                    <div className="test-curriculum my-bookmark">
                      <div className="profile-head">
                        <h3>My Bookmark</h3>
                      </div>
                      <ul className="nav nav-tabs curriculum-tab">
                        {bookmarkData.daily_quiz_count > 0 && (
                          <li
                            className={`nav-item ${
                              status === "Q" ? "active" : ""
                            }`}
                            onClick={() => setStatus("Q")}
                          >
                            <Link className="nav-link bookmark_tab_btn">
                              Bookmarked
                              <div className="ttbf">
                                <p>
                                  Q Bank
                                  <span className="roundbg float-right">
                                    {bookmarkData.daily_quiz_count}
                                  </span>
                                </p>
                              </div>
                            </Link>
                          </li>
                        )}
                        {bookmarkData.podcast_count > 0 && (
                          <li
                            className={`nav-item ${
                              status === "P" ? "active" : ""
                            }`}
                            onClick={() => setStatus("P")}
                          >
                            <Link className="nav-link bookmark_tab_btn">
                              Oval Window Podcast
                              <div className="ttbf">
                                <p>
                                  Bookmarked
                                  <span className="roundbg float-right">
                                    {bookmarkData.podcast_count}
                                  </span>
                                </p>
                              </div>
                            </Link>
                          </li>
                        )}
                        {bookmarkData.video_count > 0 && (
                          <li
                            className={`nav-item ${
                              status === "V" ? "active" : ""
                            }`}
                            onClick={() => setStatus("V")}
                          >
                            <Link className="nav-link bookmark_tab_btn">
                              Videos
                              <div className="ttbf">
                                <p>
                                  Bookmarked
                                  <span className="roundbg float-right">
                                    {bookmarkData.video_bookmark_count}
                                  </span>
                                </p>
                              </div>
                            </Link>
                          </li>
                        )}
                        {bookmarkData.wishlist_count > 0 && (
                          <li
                            className={`nav-item ${
                              status === "W" ? "active" : ""
                            }`}
                            onClick={() => setStatus("W")}
                          >
                            <Link className="nav-link bookmark_tab_btn">
                              Wishlist
                              <div className="ttbf">
                                <p>
                                  Bookmarked
                                  <span className="roundbg float-right">
                                    {bookmarkData.wishlist_count}
                                  </span>
                                </p>
                              </div>
                            </Link>
                          </li>
                        )}
                      </ul>

                      {/* Condition based */}
                      {[
                        bookmarkData.daily_quiz_count,
                        bookmarkData.podcast_count,
                        bookmarkData.video_count,
                        bookmarkData.wishlist_count,
                        bookmarkData.video_bookmark_count,
                        bookmarkData.test_count,
                        bookmarkData.quiz_count,
                      ].some((count) => count > 0) ? (
                        <>
                          {status === "Q" &&
                            bookmarkData.daily_quiz_count > 0 && (
                              <>
                                {Array.isArray(qbListData) &&
                                qbListData.length > 0 ? (
                                  <>
                                    {qbListData.map((itm, i) => (
                                      <div
                                        key={i}
                                        className="tab-content1"
                                        style={{ position: "relative" }}
                                      >
                                        <div
                                          className="loaderajax"
                                          style={{ display: "none" }}
                                        >
                                          <img
                                            loading="lazy"
                                            alt="loader"
                                            src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/Double Ring-1s-200px.svg"
                                          />
                                        </div>

                                        <div className="tab-pane fade show active">
                                          <div id="post_list">
                                            <div
                                              className="widget curriculum-emez"
                                              style={{ marginBottom: "12px" }}
                                            >
                                              <div className="widget-post-bx">
                                                <div className="widget-post clearfix posttitleSet">
                                                  <div className="listbox_bookmark text-center">
                                                    <h1>
                                                      {itm.text.charAt(0)}
                                                    </h1>
                                                  </div>
                                                  <div className="ttr-post-header">
                                                    <h6 className="post-title">
                                                      <a className="feeddetails">
                                                        {itm.text}
                                                        <span>
                                                          ({itm.total})
                                                        </span>
                                                      </a>
                                                    </h6>
                                                    <span
                                                      className=""
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                      onClick={() =>
                                                        handleSectionClick(
                                                          itm.id
                                                        )
                                                      }
                                                    >
                                                      {arrowToggle ===
                                                      itm.id ? (
                                                        <DownOutlined />
                                                      ) : (
                                                        <RightOutlined />
                                                      )}
                                                    </span>
                                                  </div>
                                                </div>
                                                {arrowToggle === itm?.id && (
                                                  <ul>
                                                    {Array.isArray(
                                                      mybookmarkList
                                                    ) &&
                                                    mybookmarkList.length >
                                                      0 ? (
                                                      mybookmarkList.map(
                                                        (it, i) => (
                                                          <li key={i}>
                                                            <div
                                                              dangerouslySetInnerHTML={{
                                                                __html:
                                                                  it.question,
                                                              }}
                                                            />
                                                            <div className="bookmarkiconSet">
                                                              <FaBookmark
                                                                cursor={
                                                                  "pointer"
                                                                }
                                                                onClick={() =>
                                                                  removebookq(
                                                                    it?.id
                                                                  )
                                                                }
                                                              />
                                                            </div>
                                                          </li>
                                                        )
                                                      )
                                                    ) : (
                                                      <li>
                                                        No questions bookmarked
                                                      </li>
                                                    )}
                                                  </ul>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  <div className="col-12 text-center">
                                    No data found
                                  </div>
                                )}
                              </>
                            )}
                          {status === "P" && bookmarkData.podcast_count > 0 && (
                            <>
                              <div className="row">
                                {audioToggle && (
                                  <>
                                    <div
                                      className="col-lg-12 col-sm-12 col-md-12 col-12 plyr"
                                      style={{
                                        display: "block",
                                        marginTop: "30px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <div className="allpodcast-group-big-music-plyr menu1">
                                        <div className="row">
                                          <div className="col-lg-1 col-sm-2 col-md-2 col-2">
                                            <div className="audio-img-big-m-ply">
                                              <img
                                                src={audioData.thumbnail_image}
                                                loading="lazy"
                                                alt="icon image"
                                                style={{}}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-lg-9 col-sm-8 col-md-8 col-8">
                                            <div className="audio-mid-big-m-ply">
                                              <h3>{audioData.title}</h3>
                                              <p>Dr Sumer Sethi </p>
                                            </div>
                                          </div>

                                          <div className="col-lg-2 col-sm-2 col-md-2 col-2 text-right">
                                            <ul>
                                              <li>
                                                <a
                                                  onClick={() =>
                                                    setAudioToggle(false)
                                                  }
                                                >
                                                  <i className="fa fa-close"></i>
                                                </a>
                                              </li>
                                            </ul>
                                          </div>

                                          <div className="col-lg-12 col-sm-12 col-md-12 col-12">
                                            <div className="player paused">
                                              <div className="row"></div>
                                              <audio
                                                className="audio182"
                                                src={audioData.audio_url}
                                                // autoPlay
                                                controls
                                              ></audio>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                                {Array.isArray(podcastData) &&
                                podcastData.length > 0 ? (
                                  podcastData.map((pod, i) => (
                                    <div
                                      className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4"
                                      key={i}
                                    >
                                      <div className="course_type position-relative">
                                        <div className="row">
                                          <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                            <div className="imgPart">
                                              <img
                                                src={pod?.thumbnail_image}
                                                style={{ width: "80%",cursor: "pointer"  }}
                                                loading="lazy"
                                                alt="icon image"
                                                onClick={() => handlerAudio(pod)}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                            <div className="textPart">
                                              <FaBookmark
                                                cursor={"pointer"}
                                                onClick={() =>
                                                  removebookmark(pod?.id)
                                                }
                                              />
                                              <h2 style={{ cursor: "pointer" }}
                                                onClick={() => handlerAudio(pod)}>{pod?.title}</h2>
                                              <h3 style={{ cursor: "pointer" }}
                                                onClick={() => handlerAudio(pod)} >{`${pod?.created_at} -  ${pod?.views} Plays`}</h3>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="col-12 text-center">
                                    No data found
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                          {status === "V" && bookmarkData.video_count > 0 && (
                            <>
                              <div className="row">
                                {Array.isArray(videoData) &&
                                videoData.length > 0 ? (
                                  videoData.map((video, i) => (
                                    <div
                                      className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4"
                                      key={i}
                                      onClick={() =>
                                        toast.warning(
                                          "If you want to play this video, please go to the mobile app..."
                                        )
                                      }
                                    >
                                      <div className="course_type">
                                        <div className="row">
                                          <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                            <div className="imgPart">
                                              <img
                                                className="videosvg"
                                                src="video.svg"
                                                style={{
                                                  width: "80%",
                                                  height: "35px",
                                                }}
                                                loading="lazy"
                                                alt="icon image"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                            <div className="textPart">
                                              <h2>{video?.video_title}</h2>
                                              <h3>
                                                Video Length: {video?.duration}
                                              </h3>
                                              <FaBookmark
                                                cursor={"pointer"}
                                                onClick={() =>
                                                  rmbookv(video?.id)
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="col-12 text-center">
                                    No data found
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                          {status === "W" &&
                            bookmarkData.wishlist_count > 0 && (
                              <>
                                <div className="row">
                                  {Array.isArray(wishlistData) &&
                                  wishlistData.length > 0 ? (
                                    wishlistData.map((wishData, i) => (
                                      <div
                                        onClick={() =>
                                          toast.warning(
                                            "If you want play this video then go to mobile app..."
                                          )
                                        }
                                        className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4"
                                        key={i}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <div className="course_type">
                                          <div className="row">
                                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                              <img
                                                src={wishData?.cover_image}
                                                loading="lazy"
                                                alt="icon image"
                                              />
                                            </div>
                                            <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                              <h2>{wishData.title}</h2>
                                              <h3>
                                                Enrolled:{wishData?.learner}
                                              </h3>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="col-12 text-center">
                                      No data found
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                        </>
                      ) : (
                        <div className="col-12 text-center">
                          <p>No data found</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarklist;
