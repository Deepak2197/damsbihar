import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Badge, Image, Col } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import Login from "../Login/Login";
import Hls from "hls.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
import {
  FaThumbsUp,
  FaComment,
  FaShare,
  FaEye,
  FaClipboard,
} from "react-icons/fa";
import { notification, Avatar } from "antd";

const YoutubeModal = ({
  show,
  onHide,
  videoUrl,
  title,
  isLive,
  likes,
  views,
  vid,
  catid,
  isLikeStatus,
}) => {
  const user_id = sessionStorage.getItem("id");

  const [showCom, setShowCom] = useState(false);
  const [comtext, setComText] = useState("");
  const [comList, setComList] = useState([]);

  const [likeStatus, setLikeStatus] = useState(isLikeStatus);
  const [likeCount, setLikeCount] = useState(Number(likes) || 0);

  const toggleLike = async () => {
    try {
      const newLikeStatus = String(likeStatus) === "1" ? "0" : "1";

      const res = await axiosInstance.post(
        API_ENDPOINTS.DOCTOR_LOUNGE.ADD_UPDATE_LIKE,
        {
          user_id,
          is_like: newLikeStatus,
          video_id: vid,
        }
      );

      if (res.status === 200) {
        setLikeStatus(newLikeStatus);
        setLikeCount((prev) =>
          newLikeStatus === "1" ? prev + 1 : Math.max(prev - 1, 0)
        );

        notification.open({
          message: (
            <span>
              <FaClipboard style={{ marginRight: 8 }} />
              {newLikeStatus === "1"
                ? "Liked the video!"
                : "Disliked the video!"}
            </span>
          ),
          duration: 2,
          placement: "bottom",
        });
      }
    } catch (error) {
      console.error("Failed to update like status:", error);
    }
  };

  const handleCommentOpen = async () => {
    setShowCom((v) => !v);
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.DOCTOR_LOUNGE.ADDUPDATE_VIDEO_COMMENT,
        {
          user_id,
          comment: null,
          pc_id: vid,
          pvideo_id: catid,
        }
      );
      if (res.status === 200) {
        setComList(res?.data?.data?.comment_list?.reverse?.() || []);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handleComment = async () => {
    if (!comtext.trim()) {
      notification.error({
        message: "Comment cannot be empty!",
        duration: 2,
        placement: "bottom",
      });
      return;
    }
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.DOCTOR_LOUNGE.ADDUPDATE_VIDEO_COMMENT,
        {
          user_id,
          comment: comtext,
          pc_id: vid,
          pvideo_id: catid,
        }
      );
      if (res.status === 200) {
        setComList(res?.data?.data?.comment_list?.reverse?.() || []);
        notification.success({
          message: "Comment sent!",
          duration: 2,
          placement: "bottom",
        });
        setComText("");
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
      notification.error({
        message: "Failed to send comment!",
        duration: 2,
        placement: "bottom",
      });
    }
  };

  const HandleShare = () => {
    const textToCopy = `https://damsdelhi.com/video/${encodeURIComponent(
      videoUrl
    )}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        notification.open({
          message: (
            <span>
              <FaClipboard style={{ marginRight: 8 }} />
              Link copied to clipboard!
            </span>
          ),
          duration: 2,
          placement: "bottom",
        });
      })
      .catch(console.error);
  };

  // (Optional) Edit/Delete helpers as in your working code:
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const fetchCommentList = async () => {
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.DOCTOR_LOUNGE.ADDUPDATE_VIDEO_COMMENT,
        {
          user_id,
          comment: null,
          pc_id: vid,
          pvideo_id: catid,
        }
      );
      if (res.status === 200)
        setComList(res?.data?.data?.comment_list?.reverse?.() || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditComment = async () => {
    if (!editCommentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    try {
      await axiosInstance.post(
        API_ENDPOINTS.DOCTOR_LOUNGE.UPDATE_VIDEO_COMMENT,
        {
          podcast_video_comment_id: editCommentId,
          user_id,
          comment: editCommentText,
          pvideo_id: catid,
        }
      );
      toast.success("Comment updated successfully!");
      fetchCommentList();
      setEditCommentId(null);
      setEditCommentText("");
    } catch (e) {
      toast.error("Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.post(
        API_ENDPOINTS.DOCTOR_LOUNGE.DELETE_VIDEO_COMMENT,
        {
          podcast_video_comment_id: commentId,
          user_id,
        }
      );
      toast.success("Comment deleted successfully!");
      fetchCommentList();
    } catch (e) {
      toast.error("Failed to delete comment");
    }
  };

  useEffect(() => {
    if (isLikeStatus !== null && isLikeStatus !== undefined) {
      setLikeStatus(isLikeStatus);
    }
  }, [isLikeStatus]);

  useEffect(() => {
    setLikeCount(Number(likes) || 0);
  }, [likes]);

  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    const preventInspect = (event) => {
      if (
        (event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl+Shift+I
        (event.ctrlKey && event.keyCode === 73)
      ) {
        // Ctrl+I
        event.preventDefault();
      }
    };

    window.addEventListener("contextmenu", preventContextMenu);
    window.addEventListener("keydown", preventInspect);

    return () => {
      window.removeEventListener("contextmenu", preventContextMenu);
      window.removeEventListener("keydown", preventInspect);

      // Clean up HLS instance
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!show || !videoUrl) return;

    const video = videoRef.current;
    if (!video) return;

    if (isLive === "1") {
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.error("Autoplay failed:", e));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // For Safari
      video.src = videoUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((e) => console.error("Autoplay failed:", e));
      });
    }
  }, [show, videoUrl, isLive]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      style={{ zIndex: 100000 }}
      size="lg"
      className="closeBtn"
    >
      <Modal.Header closeButton />
      <Modal.Title style={{ padding: "10px 10px 0px" }}>{title}</Modal.Title>
      <Modal.Body>
        <div className="embed-responsive embed-responsive-16by9">
          <video
            src={videoUrl}
            ref={videoRef}
            controls
            autoPlay
            controlsList="nodownload"
            style={{ width: "100%" }}
          />
        </div>
        <div
          className="likeComment"
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            paddingTop: 8,
          }}
        >
          <div
            className="view"
            style={{ display: "flex", gap: 6, alignItems: "center" }}
          >
            <h6 style={{ margin: 0 }}>{views}</h6>
            <FaEye />
          </div>

          <div
            className="likeBg"
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <h6 style={{ margin: 0 }}>{likeCount}</h6>
            <FaThumbsUp
              onClick={toggleLike}
              style={{
                color: String(likeStatus) === "1" ? "darkblue" : "#3f5395",
              }}
            />
          </div>

          <div
            className="comment"
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <FaComment onClick={handleCommentOpen} />
          </div>

          <div
            className="share"
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <FaShare onClick={HandleShare} />
          </div>
        </div>

        {showCom && (
          <>
            <div className="d-flex">
              <input
                value={comtext}
                onChange={(e) => setComText(e.target.value)}
                className="rounded"
                placeholder="write your comment..."
                style={{ padding: 6, width: "100%" }}
              />
              <button
                onClick={handleComment}
                className="btn-primary p-2 m-2 rounded"
              >
                Done
              </button>
            </div>

            {comList
              ?.filter((c) => c.pvideo_id === catid)
              .map((c) => (
                <div
                  key={c.podcast_video_comment_id}
                  className="d-flex align-items-start p-1 m-2"
                  style={{ borderTop: "0.5px solid #ccc" }}
                >
                  <Avatar src={c.profile_picture} />
                  <div className="ms-2 w-100">
                    <div className="d-flex justify-content-between">
                      <strong>{c.username}</strong>
                      {String(c.user_id) === String(user_id) && (
                        <div>
                          <button
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => {
                              setEditCommentId(c.podcast_video_comment_id);
                              setEditCommentText(c.comment);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleDeleteComment(c.podcast_video_comment_id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                    {editCommentId === c.podcast_video_comment_id ? (
                      <>
                        <input
                          className="form-control mt-2"
                          value={editCommentText}
                          onChange={(e) => setEditCommentText(e.target.value)}
                        />
                        <div className="d-flex mt-1">
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={handleEditComment}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              setEditCommentId(null);
                              setEditCommentText("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <p style={{ margin: "4px 0" }}>{c.comment}</p>
                    )}
                  </div>
                </div>
              ))}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

function DoctorLounge({ need }) {
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [vid, setVid] = useState(0);
  const [catId, setcatId] = useState(0);
  const [isLikeStatus, setisLikeStatus] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [targeturl, settargeturl] = useState(null);
  const [videoData, setvidData] = useState([]);
  const [videoTitle, setTitle] = useState("");
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLive, setIsLive] = useState("0");
  const userID = sessionStorage.getItem("id");

  const arr = [
    {
      title: "MediMart",
      id: "1",
      img: `${window.IMG_BASE_URL}/medimart.png`,
      bacground: "medimart",
      byDefault: "store",
    },
    {
      title: "CBT",
      id: "2",
      img: `${window.IMG_BASE_URL}/cbt.png`,
      bacground: "medimart cbt",
      byDefault: "cbt",
    },
    {
      title: "Event",
      id: "3",
      img: `${window.IMG_BASE_URL}/medimart.png`,
      bacground: "medimart event",
      byDefault: "event",
    },
    {
      title: "Podcast",
      id: "4",
      img: `${window.IMG_BASE_URL}/cbt.png`,
      bacground: "medimart podacast",
      byDefault: "podcast",
    },
    {
      title: "News & Article",
      id: "5",
      img: `${window.IMG_BASE_URL}/medimart.png`,
      bacground: "medimart newsdata",
      byDefault: "/news-and-article",
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const getHomeVideo = async () => {
      const response = await axiosInstance.post(
        API_ENDPOINTS.HOMEPAGE_INDEX.PODCAST_HOME_LIST_NEW,
        {}
      );
      if (response.status) {
        setvidData(response?.data?.data);
      }
    };
    getHomeVideo();
  }, []);

  const handleShow = (url, tit, liveStatus, like, view, vId, cId, liked) => {
    if (liveStatus === "1" || liveStatus === 1) {
      toast.info("This feature is available in the app", {
        position: "top-center",
        autoClose: 3000,
        
      });
      return;
    }
    setVideoUrl(url);
    setTitle(tit);
    setIsLive(liveStatus);

    setLikes(Number(like) || 0);
    setViews(Number(view) || 0);
    setVid(vId);
    setcatId(cId);
    setisLikeStatus(liked ?? null);

    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? videoData.length - 1 : prevIndex - 1
      );
    }
  };

  const nextSlide = () => {
    if (currentIndex < videoData.length / 3 - 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videoData.length);
    }
  };

  const handlerClose = () => {
    setSignInModalOpen(false);
  };

  const handleSignInSuccess = () => {
    setSignInModalOpen(false);
  };
  const handlerCheckstore = (itm) => {
    settargeturl(itm);
    if (userID != null) {
      setIsAuthenticated(true);
      navigate(itm);
    } else {
      setSignInModalOpen(true);
    }
  };

  return (
    <section className="doctorLodge position-relative">
      <div className="container staticcontainer">
        <div className="row">
          <div className="col-8 col-sm-8 col-md-9 col-lg-10 col-xl-10">
            <div className="globe_heading">
              <h2 className="font-weight-bold text-left newcolrHeading">
                Doctor' <span>Lounge </span>
              </h2>
            </div>
          </div>
          <div className="col-4 col-sm-4  col-md-3 col-lg-2 text-right">
            <Link to="/all-lounge" className="see-btn newseebtn">
              See all
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="video_area">
              <div id="demo" className="carousel slide" data-ride="carousel">
                {videoData && (
                  <div>
                    {[...Array(Math.ceil(videoData?.length / 4)).keys()].map(
                      (index) => (
                        <div
                          key={index}
                          className={`carousel-item mobileWrap ${
                            index === currentIndex ? "active" : ""
                          }`}
                        >
                          <div className="row video-row-scroll">
                            {videoData
                              ?.slice(index * 4, (index + 1) * 4)
                              .map((itm, i) => (
                                <Col
                                  key={i}
                                  md={3}
                                  className="hoverVideo video-col-scroll"
                                >
                                  <div className="videHeightbg ">
                                    {itm.is_live == 1 && (
                                      <div className="liveImg">
                                        <img
                                          src={`${window.IMG_BASE_URL}/emdpublic/etcimg/live.svg`}
                                          alt=""
                                        />
                                      </div>
                                    )}
                                    <img
                                      src={itm.icon}
                                      loading="lazy"
                                      alt="Video Banner"
                                    />

                                    <div className="titleVideo">
                                      <FaPlay
                                        onClick={(video) =>
                                          handleShow(
                                            itm.video,
                                            itm.video_title,
                                            itm.is_live,
                                            itm.total_like, // NEW
                                            itm.total_views, // NEW
                                            itm.id, // NEW (video id)
                                            itm.cat_id, // NEW (category id)
                                            itm.is_like
                                          )
                                        }
                                        size={22}
                                      />
                                    </div>

                                    <div className="slideText">
                                      <div className="textnewPart">
                                        <div className="imgSec">
                                          <img
                                            src={`${window.IMG_BASE_URL}/revamp-web/dlounge/profile.svg`}
                                          />
                                        </div>
                                        <div className="textSec">
                                          <h4>DR. Sumer Sethi</h4>
                                          <p>{itm.video_title}</p>
                                        </div>
                                      </div>
                                      <div className="likeSec">
                                        <div className="partLike">
                                          <img
                                            src={`${window.IMG_BASE_URL}/revamp-web/dlounge/like.svg`}
                                          />
                                          <img
                                            src={`${window.IMG_BASE_URL}/revamp-web/dlounge/heart.svg`}
                                          />
                                          <p>{itm.total_like}</p>
                                        </div>
                                        <div className="date">
                                          <p>{itm.video_date}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                              ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <YoutubeModal
        show={showModal}
        onHide={handleClose}
        videoUrl={videoUrl}
        title={videoTitle}
        isLive={isLive}
        likes={likes} // NEW
        views={views} // NEW
        vid={vid} // NEW
        catid={catId} // NEW
        isLikeStatus={isLikeStatus} // NEW
      />

      {/* {need && (
        <div className="LinkCategories">
          <div className="container">
            <h2>Categories</h2>
            <div className="Linkdata">
              {arr.map((itm, i) => (
                <div className="catImg" key={i} style={{ cursor: "pointer" }}>
                  <span
                    onClick={() => handlerCheckstore(itm.byDefault)}
                    defaultValue={itm.byDefault}
                  >
                    <div className={itm.bacground}>
                      <img src={itm.img} loading="lazy" alt="store" />
                    </div>
                    <h3>{itm.title}</h3>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}
      {isSignInModalOpen && (
        <Login
          targeturl={targeturl}
          handlerClose={handlerClose}
          setIsAuthenticated={setIsAuthenticated}
          handleSignInSuccess={handleSignInSuccess}
          setSignInModalOpen={setSignInModalOpen}
        />
      )}
    </section>
  );
}

export default DoctorLounge;
