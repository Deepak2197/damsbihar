import "../../assets/css/podcast/style.css";
import "../../assets/css/podcast/responsive.css";
import "../../assets/css/shortcodes/shortcodes.css";
import React, { useState, useEffect } from "react";
import Sidebar from "../OvalwindowPodcast/components/Sidebar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "antd";
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Ovalpodcast = () => {
  const userid = sessionStorage.getItem("id");
  const [TopTrending, setTrending] = useState([]);
  const [MyLibrary, setMyLibrary] = useState([]);
  const [MostPlayed, setMostPlayed] = useState([]);
  const [AudioData, setAudioData] = useState(null); // Initialize as null
  const [Audiostatus, setAudioStatus] = useState(false);
  const [PodcastId, setPodcastId] = useState(0);
  const [latestdata, setLatest] = useState([]);
  const [AuthorChanneldata, setAuthorChannel] = useState([]);
  const [podCastdata, setPodCastData] = useState([]);
  const [Podcast, setPodcast] = useState("podcast");
  const [isdata, setIsData] = useState(null);

  // Loading states for each section
  const [loadingPodcast, setLoadingPodcast] = useState(true);
  const [loadingChannels, setLoadingChannels] = useState(true);
  const [loadingMyLibrary, setLoadingMyLibrary] = useState(true);
  const [loadingMostPlayed, setLoadingMostPlayed] = useState(true);

  // Add pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getdata = async (result, page = 1) => {
    setLoadingChannels(true);
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.PODCAST.DATA,
        {
          user_id: userid,
          author_id: result?.id,
          sort_by: "",
          page: page,
        }
      );
      const newData = response?.data?.data?.my_podcast || [];
      const totalRecords = response?.data?.data?.total_records || 0;
      const perPage = response?.data?.data?.per_page_total || 10;

      // Set podcast data for the current page
      setPodCastData(newData);

      // Calculate and set total pages
      setTotalPages(Math.ceil(totalRecords / perPage));

      // Update current page
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching podcast data:", error);
    } finally {
      setLoadingChannels(false);
    }
  };

  const toggleIsActive = (result) => {
    setPodcast("channelstatus");
    setIsData(result);
    setPodCastData([]); // Clear previous data
    setCurrentPage(1); // Reset to page 1
    setTotalPages(1); // Reset total pages
    setAudioStatus(false); // Reset audio status when switching
    setAudioData(null); // Clear audio data when switching
    getdata(result, 1); // Fetch first page
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      getdata(isdata, page);
    }
  };

  const bookmarkEvent = (id, isBookmarked, result) => {
    const isRemoveBookmark = isBookmarked ? 1 : 0;
    axiosInstance
      .post(API_ENDPOINTS.PODCAST.BOOKMARKED, {
        user_id: userid,
        podcast_id: id,
        is_remove_bookmark: isRemoveBookmark,
      })
      .then((response) => {
        if (response.data.message === "Podcast bookmarked successfully") {
          setPodcastId(id);
          getlibdata();
          fetchData();
          mostplayeddata();
          if (isdata) getdata(isdata);
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else if (
          response.data.message ===
          "Podcast removed from bookmarked successfully"
        ) {
          setPodcastId(0);
          fetchData();
          getlibdata();
          mostplayeddata();
          if (isdata) getdata(isdata);
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }

        setTrending((prev) =>
          prev.map((podcast) =>
            podcast.id === id
              ? { ...podcast, is_bookmarked: !isBookmarked }
              : podcast
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAudioData = (result) => {
    setAudioStatus(true);
    setAudioData(result);
  };

  const arraySidebarData = [
    {
      name: "All Podcast",
      value: "podcast",
      image:
        "https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/podcast/episodes.png",
      class: "nav-link active show",
    },
    {
      name: "Channels",
      value: "channels",
      image:
        "https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/podcast/channels.png",
      class: "nav-link",
    },
    {
      name: "My Library",
      value: "mylibrary",
      image:
        "https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/podcast/bookmarks.png",
      class: "nav-link",
    },
    {
      name: "Most Played",
      value: "mostplayed",
      image:
        "https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/podcast/most-view.png",
      class: "nav-link",
    },
  ];

  const fetchData = async () => {
    setLoadingPodcast(true);
    try {
      const response = await axiosInstance.post(
       API_ENDPOINTS.PODCAST.FRONT_PAGE,
        { user_id: userid }
      );
      setTrending(response.data.data[0].data || []);
      setLatest(response.data.data[1].data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPodcast(false);
    }
  };

  const mostplayeddata = async () => {
    setLoadingMostPlayed(true);
    axiosInstance
      .post(API_ENDPOINTS.PODCAST.DATA, {
        user_id: userid,
        sort_by: "mostviewed",
      })
      .then((response) => setMostPlayed(response?.data?.data?.my_podcast || []))
      .catch((error) => console.error(error))
      .finally(() => setLoadingMostPlayed(false));
  };

  const getlibdata = async () => {
    setLoadingMyLibrary(true);
    axiosInstance
      .post(API_ENDPOINTS.PODCAST.BOOKMARKED, {
        user_id: userid,
        sort_by: "",
        page: 1,
      })
      .then((response) => setMyLibrary(response?.data?.data || []))
      .catch((error) => console.error(error))
      .finally(() => setLoadingMyLibrary(false));
  };

  useEffect(() => {
    // Reset audio status and data when component mounts or Podcast changes
    setAudioStatus(false);
    setAudioData(null);

    fetchData();
    mostplayeddata();
    getlibdata();
    axiosInstance
      .post(API_ENDPOINTS.PODCAST.AUTHOR_CHANNEL, {
        user_id: userid,
        stream_id: 1,
      })
      .then((response) => setAuthorChannel(response.data.data || []))
      .catch((error) => console.error(error))
      .finally(() => setLoadingChannels(false));
  }, [userid, Podcast]); // Add Podcast to dependency array to reset on tab change

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00:00";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours > 0 ? `${pad(hours)}:` : ""}${pad(minutes)}:${pad(secs)}`;
  };

  const pad = (value) => (value < 10 ? `0${value}` : value);

  // Skeleton Component
  const SkeletonLoader = () => (
    <div className="row">
      {Array(6)
        .fill()
        .map((_, index) => (
          <div
            key={index}
            className="col-lg-6 col-xl-4 col-sm-6 col-md-6 col-12"
          >
            <div className="allpodcast-group skeleton">
              <div className="row">
                <div className="podcastNewDesigns">
                  <div className="audioPart">
                    <div
                      className="audio-img skeleton-box"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                  <div className="midPart">
                    <div className="audio-mid">
                      <h4
                        className="skeleton-box"
                        style={{ width: "80%", height: "20px" }}
                      ></h4>
                      <h3
                        className="skeleton-box"
                        style={{ width: "60%", height: "25px" }}
                      ></h3>
                      <p
                        className="skeleton-box"
                        style={{ width: "50%", height: "15px" }}
                      ></p>
                      <ul>
                        <li
                          className="skeleton-box"
                          style={{ width: "40px", height: "20px" }}
                        ></li>
                        <li
                          className="skeleton-box"
                          style={{ width: "60px", height: "20px" }}
                        ></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <>
      <div className="Ovalpodcast">
        <div className="page-content position-relative">
          <div className="breadcrumb-row">
            <div className="container">
              <ul className="list-inline">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>Oval Podcast</li>
              </ul>
            </div>
          </div>
        </div>
        <section className="podacst-episodes-tbing">
          <div className="container clearfix">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <Sidebar
                  sidebarData={arraySidebarData}
                  setPodcast={setPodcast}
                />
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="rightside">
                  <div className="tab-content" id="v-pills-tabContent">
                    {/* All Podcast Tab */}
                    {Podcast === "podcast" && (
                      <div className="tab-pane show active">
                        {loadingPodcast ? (
                          <SkeletonLoader />
                        ) : (
                          <>
                            <div className="tab-content">
                              <h3>Latest</h3>
                              <div className="row" id="append_podcast">
                                {Audiostatus && AudioData && (
                                  <div
                                    className="col-lg-12 col-sm-12 col-md-12 col-12 plyr"
                                    style={{ display: "block" }}
                                  >
                                    <div
                                      className="allpodcast-group-big-music-plyr menu1"
                                      style={{ display: "block" }}
                                    >
                                      <div className="row">
                                        <div className="col-lg-1 col-sm-2 col-md-2 col-2">
                                          <div className="audio-img-big-m-ply">
                                            <img
                                              src={AudioData.thumbnail_image}
                                              loading="lazy"
                                              alt="icon image"
                                              style={{ borderRadius: "50%" }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-9 col-sm-8 col-md-8 col-8">
                                          <div className="audio-mid-big-m-ply">
                                            <h3>{AudioData.title}</h3>
                                            <p>Dr Sumer Sethi</p>
                                          </div>
                                        </div>
                                        <div className="col-lg-2 col-sm-2 col-md-2 col-2 text-right">
                                          <ul>
                                            <li>
                                              <a
                                                onClick={() =>
                                                  setAudioStatus(false)
                                                }
                                              >
                                                <i className="fa fa-close"></i>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-12 col-sm-12 col-md-12 col-12">
                                          <div className="player paused">
                                            <audio
                                              className="audio182"
                                              src={AudioData.audio_url}
                                              controls
                                              controlsList="nodownload"
                                            >
                                              Your browser does not support the
                                              audio element.
                                            </audio>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {TopTrending.length === 0 ? (
                                  <p>No podcasts found</p>
                                ) : (
                                  TopTrending.map((podcast) => (
                                    <div
                                      key={podcast.id}
                                      className="col-lg-6 col-xl-4 col-sm-6 col-md-6 col-12"
                                    >
                                      <div className="allpodcast-group">
                                        <div className="row">
                                          <div className="podcastNewDesigns">
                                            <div className="audioPart">
                                              <div className="audio-img">
                                                <img
                                                  src={`${window.IMG_BASE_URL}/emdpublic/podcast/mike.svg`}
                                                  loading="lazy"
                                                  alt="icon image"
                                                  style={{
                                                    borderRadius: "50%",
                                                  }}
                                                />
                                              </div>
                                            </div>
                                            <div className="midPart">
                                              <div className="audio-mid">
                                                <h4>
                                                  {/* Feb 12, 2025 */}
                                                  <span className="bookmarkSet">
                                                    <Link
                                                      to={""}
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                    >
                                                      <i
                                                        className={
                                                          podcast.is_bookmarked
                                                            ? "fa fa-bookmark bokmrk"
                                                            : "fa fa-bookmark-o bokmrk2"
                                                        }
                                                        onClick={() =>
                                                          bookmarkEvent(
                                                            podcast.id,
                                                            podcast.is_bookmarked
                                                          )
                                                        }
                                                      ></i>
                                                    </Link>
                                                  </span>
                                                </h4>
                                                <h3>{podcast.title}</h3>
                                                <p>{podcast.created_by}</p>
                                                <ul>
                                                  <li className="playBtnSet">
                                                    <a
                                                      onClick={() =>
                                                        handleAudioData(podcast)
                                                      }
                                                      className="ppbutton fa fa-play ply182"
                                                    >
                                                      Play
                                                    </a>
                                                  </li>
                                                  <li>
                                                    {formatTime(
                                                      podcast.duration
                                                    )}
                                                  </li>
                                                  <li className="toplay">
                                                    <span className="play1">
                                                      Total Plays{" "}
                                                    </span>
                                                    {podcast.views}
                                                  </li>
                                                  <li>
                                                    <Tooltip title="This feature is only available in the App">
                                                      <a
                                                        href="#"
                                                        onClick={(e) =>
                                                          e.preventDefault()
                                                        }
                                                      >
                                                        {/* <img
                                                          src={`${window.IMG_BASE_URL}/emdpublic/podcast/download.svg`}
                                                          loading="lazy"
                                                          alt="Download Icon"
                                                          style={{
                                                            cursor: "pointer",
                                                            marginLeft: "1px",
                                                          }}
                                                        /> */}
                                                      </a>
                                                    </Tooltip>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                            <div className="tab-content">
                              <h3>Top</h3>
                              <div className="row" id="append_podcast">
                                {latestdata.length === 0 ? (
                                  <p>No podcasts found</p>
                                ) : (
                                  latestdata.map((podcast) => (
                                    <div
                                      key={podcast.id}
                                      className="col-lg-6 col-xl-4 col-sm-6 col-md-6 col-12"
                                    >
                                      <div className="allpodcast-group">
                                        <div className="row">
                                          <div className="podcastNewDesigns">
                                            <div className="audioPart">
                                              <div className="audio-img">
                                                <img
                                                  src={`${window.IMG_BASE_URL}/emdpublic/podcast/mike.svg`}
                                                  loading="lazy"
                                                  alt="icon image"
                                                  style={{
                                                    borderRadius: "50%",
                                                  }}
                                                />
                                              </div>
                                            </div>
                                            <div className="midPart">
                                              <div className="audio-mid">
                                                <h4>
                                                  {/* Feb 12, 2025 */}
                                                  <span className="bookmarkSet">
                                                    <Link
                                                      to={""}
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                    >
                                                      <i
                                                        className={
                                                          podcast.is_bookmarked
                                                            ? "fa fa-bookmark bokmrk"
                                                            : "fa fa-bookmark-o bokmrk2"
                                                        }
                                                        onClick={() =>
                                                          bookmarkEvent(
                                                            podcast.id,
                                                            podcast.is_bookmarked
                                                          )
                                                        }
                                                      ></i>
                                                    </Link>
                                                  </span>
                                                </h4>
                                                <h3>{podcast.title}</h3>
                                                <p>{podcast.created_by}</p>
                                                <ul>
                                                  <li className="playBtnSet">
                                                    <a
                                                      onClick={() =>
                                                        handleAudioData(podcast)
                                                      }
                                                      className="ppbutton fa fa-play ply182"
                                                    >
                                                      Play
                                                    </a>
                                                  </li>
                                                  <li>
                                                    {formatTime(
                                                      podcast.duration
                                                    )}
                                                  </li>
                                                  <li className="toplay">
                                                    <span className="play1">
                                                      Total Plays{" "}
                                                    </span>
                                                    {podcast.views}
                                                  </li>
                                                  <li>
                                                    <Tooltip title="This feature is only available in the App">
                                                      <a
                                                        href="#"
                                                        onClick={(e) =>
                                                          e.preventDefault()
                                                        }
                                                      >
                                                        {/* <img
                                                          src={`${window.IMG_BASE_URL}/emdpublic/podcast/download.svg`}
                                                          loading="lazy"
                                                          alt="Download Icon"
                                                          style={{
                                                            cursor: "pointer",
                                                            marginLeft: "1px",
                                                          }}
                                                        /> */}
                                                      </a>
                                                    </Tooltip>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* Most Played Tab */}
                    {Podcast === "mostplayed" && (
                      <div className="tab-content" id="mostviewed">
                        <div className="tab-pane show active">
                          {loadingMostPlayed ? (
                            <SkeletonLoader />
                          ) : (
                            <div className="tab-content">
                              <h3>Most Played</h3>
                              <div className="row" id="append_podcast">
                                {Audiostatus && AudioData && (
                                  <div
                                    className="col-lg-12 col-sm-12 col-md-12 col-12 plyr"
                                    style={{ display: "block" }}
                                  >
                                    <div
                                      className="allpodcast-group-big-music-plyr menu1"
                                      style={{ display: "block" }}
                                    >
                                      <div className="row">
                                        <div className="col-lg-1 col-sm-2 col-md-2 col-2">
                                          <div className="audio-img-big-m-ply">
                                            <img
                                              src={AudioData.thumbnail_image}
                                              loading="lazy"
                                              alt="icon image"
                                              style={{ borderRadius: "50%" }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-9 col-sm-8 col-md-8 col-8">
                                          <div className="audio-mid-big-m-ply">
                                            <h3>{AudioData.title}</h3>
                                            <p>Dr Sumer Sethi</p>
                                          </div>
                                        </div>
                                        <div className="col-lg-2 col-sm-2 col-md-2 col-2 text-right">
                                          <ul>
                                            <li>
                                              <a
                                                onClick={() =>
                                                  setAudioStatus(false)
                                                }
                                              >
                                                <i className="fa fa-close"></i>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-12 col-sm-12 col-md-12 col-12">
                                          <div className="player paused">
                                            <audio
                                              className="audio182"
                                              src={AudioData.audio_url}
                                              controls
                                              controlsList="nodownload"
                                            >
                                              Your browser does not support the
                                              audio element.
                                            </audio>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {MostPlayed.length === 0 ? (
                                  <p>No podcasts found</p>
                                ) : (
                                  MostPlayed.map((podcast) => (
                                    <div
                                      key={podcast.id}
                                      className="col-lg-6 col-xl-4 col-sm-6 col-md-6 col-12"
                                    >
                                      <div className="allpodcast-group">
                                        <div className="row">
                                          <div className="podcastNewDesigns">
                                            <div className="audioPart">
                                              <div className="audio-img">
                                                <img
                                                  src={`${window.IMG_BASE_URL}/emdpublic/podcast/mike.svg`}
                                                  loading="lazy"
                                                  alt="icon image"
                                                  style={{
                                                    borderRadius: "50%",
                                                  }}
                                                />
                                              </div>
                                            </div>
                                            <div className="midPart">
                                              <div className="audio-mid">
                                                <h4>
                                                  {/* Feb 12, 2025 */}
                                                  <span className="bookmarkSet">
                                                    <Link
                                                      to={""}
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                    >
                                                      <i
                                                        className={
                                                          podcast.is_bookmarked ===
                                                          "1"
                                                            ? "fa fa-bookmark bokmrk"
                                                            : "fa fa-bookmark-o bokmrk2"
                                                        }
                                                        onClick={() =>
                                                          bookmarkEvent(
                                                            podcast.id,
                                                            podcast.is_bookmarked
                                                          )
                                                        }
                                                      ></i>
                                                    </Link>
                                                  </span>
                                                </h4>
                                                <h3>{podcast.title}</h3>
                                                <p>{podcast.created_by}</p>
                                                <ul>
                                                  <li className="playBtnSet">
                                                    <a
                                                      onClick={() =>
                                                        handleAudioData(podcast)
                                                      }
                                                      className="ppbutton fa fa-play ply182"
                                                    >
                                                      Play
                                                    </a>
                                                  </li>
                                                  <li>
                                                    {formatTime(
                                                      podcast.duration
                                                    )}
                                                  </li>
                                                  <li className="toplay">
                                                    <span className="play1">
                                                      Total Plays{" "}
                                                    </span>
                                                    {podcast.views}
                                                  </li>
                                                  <li>
                                                    <Tooltip title="This feature is only available in the App">
                                                      <a
                                                        href="#"
                                                        onClick={(e) =>
                                                          e.preventDefault()
                                                        }
                                                      >
                                                        {/* <img
                                                          src={`${window.IMG_BASE_URL}/emdpublic/podcast/download.svg`}
                                                          loading="lazy"
                                                          alt="Download Icon"
                                                          style={{
                                                            cursor: "pointer",
                                                            marginLeft: "1px",
                                                          }}
                                                        /> */}
                                                      </a>
                                                    </Tooltip>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* My Library Tab */}
                    {Podcast === "mylibrary" && (
                      <div className="tab-content" id="mostviewed">
                        <div className="tab-pane show active">
                          {loadingMyLibrary ? (
                            <SkeletonLoader />
                          ) : (
                            <div className="tab-content">
                              <div className="row" id="append_podcast">
                                {Audiostatus && AudioData && (
                                  <div
                                    className="col-lg-12 col-sm-12 col-md-12 col-12 plyr"
                                    style={{ display: "block" }}
                                  >
                                    <div
                                      className="allpodcast-group-big-music-plyr menu1"
                                      style={{ display: "block" }}
                                    >
                                      <div className="row">
                                        <div className="col-lg-1 col-sm-2 col-md-2 col-2">
                                          <div className="audio-img-big-m-ply">
                                            <img
                                              src={AudioData.thumbnail_image}
                                              loading="lazy"
                                              alt="icon image"
                                              style={{ borderRadius: "50%" }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-9 col-sm-8 col-md-8 col-8">
                                          <div className="audio-mid-big-m-ply">
                                            <h3>{AudioData.title}</h3>
                                            <p>Dr Sumer Sethi</p>
                                          </div>
                                        </div>
                                        <div className="col-lg-2 col-sm-2 col-md-2 col-2 text-right">
                                          <ul>
                                            <li>
                                              <a
                                                onClick={() =>
                                                  setAudioStatus(false)
                                                }
                                              >
                                                <i className="fa fa-close"></i>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-12 col-sm-12 col-md-12 col-12">
                                          <div className="player paused">
                                            <audio
                                              className="audio182"
                                              src={AudioData.audio_url}
                                              controls
                                              controlsList="nodownload"
                                            >
                                              Your browser does not support the
                                              audio element.
                                            </audio>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {MyLibrary.length === 0 ? (
                                  <p>No Library Available</p>
                                ) : (
                                  MyLibrary.map((podcast) => (
                                    <div
                                      key={podcast.id}
                                      className="col-lg-6 col-xl-4 col-sm-6 col-md-6 col-12"
                                    >
                                      <div className="allpodcast-group">
                                        <div className="row">
                                          <div className="podcastNewDesigns">
                                            <div className="audioPart">
                                              <div className="audio-img">
                                                <img
                                                  src={`${window.IMG_BASE_URL}/emdpublic/podcast/mike.svg`}
                                                  loading="lazy"
                                                  alt="icon image"
                                                  style={{
                                                    borderRadius: "50%",
                                                  }}
                                                />
                                              </div>
                                            </div>
                                            <div className="midPart">
                                              <div className="audio-mid">
                                                <Tooltip
                                                  placement="top"
                                                  title={podcast.title}
                                                >
                                                  <h4>
                                                    {/* Feb 12, 2025 */}
                                                    <span className="bookmarkSet">
                                                      <Link
                                                        to={""}
                                                        style={{
                                                          cursor: "pointer",
                                                        }}
                                                      >
                                                        <i
                                                          className="fa fa-bookmark bokmrk"
                                                          onClick={() =>
                                                            bookmarkEvent(
                                                              podcast.id,
                                                              1
                                                            )
                                                          }
                                                        ></i>
                                                      </Link>
                                                    </span>
                                                  </h4>
                                                  <h3
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                  >
                                                    {podcast.title}
                                                  </h3>
                                                </Tooltip>
                                                <p>{podcast.created_by}</p>
                                                <ul>
                                                  <li className="playBtnSet">
                                                    <a
                                                      onClick={() =>
                                                        handleAudioData(podcast)
                                                      }
                                                      className="ppbutton fa fa-play ply182"
                                                    >
                                                      Play
                                                    </a>
                                                  </li>
                                                  <li>
                                                    {formatTime(
                                                      podcast.duration
                                                    )}
                                                  </li>
                                                  <li className="toplay">
                                                    <span className="play1">
                                                      Total Plays{" "}
                                                    </span>
                                                    {podcast.views}
                                                  </li>
                                                  <li>
                                                    <Tooltip title="This feature is only available in the App">
                                                      <a
                                                        href="#"
                                                        onClick={(e) =>
                                                          e.preventDefault()
                                                        }
                                                      >
                                                        {/* <img
                                                          src={`${window.IMG_BASE_URL}/emdpublic/podcast/download.svg`}
                                                          loading="lazy"
                                                          alt="Download Icon"
                                                          style={{
                                                            cursor: "pointer",
                                                            marginLeft: "1px",
                                                          }}
                                                        /> */}
                                                      </a>
                                                    </Tooltip>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Channels Tab */}
                    {Podcast === "channels" && (
                      <div className="tab-pane active show">
                        {loadingChannels ? (
                          <SkeletonLoader />
                        ) : (
                          <div className="row">
                            <div className="channelPodcast">
                              {AuthorChanneldata.map((result) => (
                                <Link
                                  key={result.id}
                                  to={""}
                                  style={{ cursor: "pointer" }}
                                  className="chanelwaise"
                                  onClick={() => toggleIsActive(result)}
                                >
                                  <div className="channel-grp">
                                    <div className="chnl-img">
                                      <img
                                        src={result.image}
                                        loading="lazy"
                                        alt="icon image"
                                      />
                                    </div>

                                    <h4>Podcast by: {result.name}</h4>
                                    <h3>
                                      No. of Podcast:{result?.podcast_count}{" "}
                                    </h3>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Channel Status (Sub-tab of Channels) */}
                    {Podcast === "channelstatus" && (
                      <div className="tab-content" id="mostviewed">
                        <div className="tab-pane show active">
                          {loadingChannels ? (
                            <SkeletonLoader />
                          ) : (
                            <div className="tab-content">
                              <h3>Channel Podcasts</h3>
                              <div className="row" id="append_podcast">
                                {Audiostatus && AudioData && (
                                  <div
                                    className="col-lg-12 col-sm-12 col-md-12 col-12 plyr"
                                    style={{ display: "block" }}
                                  >
                                    <div
                                      className="allpodcast-group-big-music-plyr menu1"
                                      style={{ display: "block" }}
                                    >
                                      <div className="row">
                                        <div className="col-lg-1 col-sm-2 col-md-2 col-2">
                                          <div className="audio-img-big-m-ply">
                                            <img
                                              src={AudioData?.thumbnail_image}
                                              loading="lazy"
                                              alt="Podcast thumbnail"
                                              style={{ borderRadius: "50%" }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-9 col-sm-8 col-md-8 col-8">
                                          <div className="audio-mid-big-m-ply">
                                            <h3>{AudioData?.title}</h3>
                                            <p>{AudioData?.created_by}</p>
                                          </div>
                                        </div>
                                        <div className="col-lg-2 col-sm-2 col-md-2 col-2 text-right">
                                          <ul>
                                            <li>
                                              <a
                                                onClick={() =>
                                                  setAudioStatus(false)
                                                }
                                              >
                                                <i className="fa fa-close"></i>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="col-lg-12 col-sm-12 col-md-12 col-12">
                                          <div className="player paused">
                                            <audio
                                              className="audio182"
                                              src={AudioData?.audio_url}
                                              controls
                                              controlsList="nodownload"
                                            >
                                              Your browser does not support the
                                              audio element.
                                            </audio>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {podCastdata.length === 0 ? (
                                  <p>No podcasts found</p>
                                ) : (
                                  podCastdata.map((podcast) => (
                                    <div
                                      key={podcast.id}
                                      className="col-lg-6 col-xl-4 col-sm-6 col-md-6 col-12"
                                    >
                                      <div className="allpodcast-group">
                                        <div className="row">
                                          <div className="podcastNewDesigns">
                                            <div className="audioPart">
                                              <div className="audio-img">
                                                <img
                                                  src={`${window.IMG_BASE_URL}/emdpublic/podcast/mike.svg`}
                                                  loading="lazy"
                                                  alt="Podcast icon"
                                                  style={{
                                                    borderRadius: "50%",
                                                  }}
                                                />
                                              </div>
                                            </div>
                                            <div className="midPart">
                                              <div className="audio-mid">
                                                <Tooltip
                                                  placement="top"
                                                  title={podcast.title}
                                                >
                                                  <h4>
                                                    {new Date(
                                                      podcast.created_at
                                                    ).toLocaleDateString(
                                                      "en-US",
                                                      {
                                                        month: "short",
                                                        day: "2-digit",
                                                        year: "numeric",
                                                      }
                                                    )}
                                                    <span className="bookmarkSet">
                                                      <Link
                                                        to={""}
                                                        style={{
                                                          cursor: "pointer",
                                                        }}
                                                      >
                                                        <i
                                                          className={
                                                            podcast.is_bookmarked ===
                                                            "1"
                                                              ? "fa fa-bookmark bokmrk"
                                                              : "fa fa-bookmark-o bokmrk2"
                                                          }
                                                          onClick={() =>
                                                            bookmarkEvent(
                                                              podcast.id,
                                                              podcast.is_bookmarked
                                                            )
                                                          }
                                                        ></i>
                                                      </Link>
                                                    </span>
                                                  </h4>
                                                  <h3>{podcast.title}</h3>
                                                </Tooltip>
                                                <p>{podcast.created_by}</p>
                                                <ul>
                                                  <li className="playBtnSet">
                                                    <a
                                                      onClick={() =>
                                                        handleAudioData(podcast)
                                                      }
                                                      className="ppbutton fa fa-play ply182"
                                                    >
                                                      Play
                                                    </a>
                                                  </li>
                                                  <li>
                                                    {formatTime(
                                                      podcast.duration
                                                    )}
                                                  </li>
                                                  <li className="toplay">
                                                    <span className="play1">
                                                      Total Plays{" "}
                                                    </span>
                                                    {podcast.views}
                                                  </li>
                                                  <li>
                                                    <Tooltip title="This feature is only available in the App">
                                                      <a
                                                        href="#"
                                                        onClick={(e) =>
                                                          e.preventDefault()
                                                        }
                                                      >
                                                        {/* <img
                                                          src={`${window.IMG_BASE_URL}/emdpublic/podcast/download.svg`}
                                                          loading="lazy"
                                                          alt="Download Icon"
                                                          style={{
                                                            cursor: "pointer",
                                                            marginLeft: "1px",
                                                          }}
                                                        /> */}
                                                      </a>
                                                    </Tooltip>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                              {/* Pagination Controls */}
                              {totalPages > 1 && (
                                <div
                                  className="pagination"
                                  style={{
                                    marginTop: "20px",
                                    textAlign: "center",
                                  }}
                                >
                                  <button
                                    onClick={() =>
                                      handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                    style={{
                                      margin: "0 5px",
                                      padding: "8px 12px",
                                      cursor:
                                        currentPage === 1
                                          ? "not-allowed"
                                          : "pointer",
                                      backgroundColor:
                                        currentPage === 1
                                          ? "#e0e0e0"
                                          : "#3f5395",
                                      color: "#fff",
                                      border: "none",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    Previous
                                  </button>
                                  {Array.from(
                                    { length: totalPages },
                                    (_, index) => index + 1
                                  ).map((page) => (
                                    <button
                                      key={page}
                                      onClick={() => handlePageChange(page)}
                                      style={{
                                        margin: "0 5px",
                                        padding: "4px 12px",
                                        cursor:
                                          page === currentPage
                                            ? "default"
                                            : "pointer",
                                        backgroundColor:
                                          page === currentPage
                                            ? "#3f5395"
                                            : "#fff",
                                        color:
                                          page === currentPage
                                            ? "#fff"
                                            : "#3f5395",
                                        border: "1px solid #3f5395",
                                        borderRadius: "4px",
                                      }}
                                    >
                                      {page}
                                    </button>
                                  ))}
                                  <button
                                    onClick={() =>
                                      handlePageChange(currentPage + 1)
                                    }
                                    disabled={currentPage === totalPages}
                                    style={{
                                      margin: "0 5px",
                                      padding: "4px 12px",
                                      cursor:
                                        currentPage === totalPages
                                          ? "not-allowed"
                                          : "pointer",
                                      backgroundColor:
                                        currentPage === totalPages
                                          ? "#e0e0e0"
                                          : "#3f5395",
                                      color: "#fff",
                                      border: "none",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    Next
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Inline CSS for Skeleton */}
      <style jsx>{`
        .skeleton-box {
          background: #e0e0e0;
          animation: pulse 1.5s infinite;
        }
        .skeleton {
          padding: 15px;
        }
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Ovalpodcast;
