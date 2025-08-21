import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Ensure useParams is imported
import { Button, Col, Modal, Row } from "react-bootstrap";
import Hls from "hls.js";
import {
  FaClipboard,
  FaComment,
  FaEye,
  FaPlay,
  FaShare,
  FaThumbsUp,
} from "react-icons/fa";
import { notification, Avatar, Spin } from "antd";
import axiosInstance from "../../API/axiosConfig";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const YoutubeModal = ({
  show,
  onHide,
  videoUrl,
  title,
  likes,
  views,
  vid,
  catid,
  isLikeStatus,
}) => {
  const user_id = sessionStorage.getItem("id");
  const [showCom, setshowCom] = useState(false);
  const [comtext, setcomText] = useState(""); // Initialize with an empty string
  const [comList, setcomList] = useState([]);
  const [likeStatus, setLikeStatus] = useState(isLikeStatus);
  const [likeCount, setLikeCount] = useState(likes);

  useEffect(() => {
    if (isLikeStatus !== null) {
      setLikeStatus(isLikeStatus);
    }
  }, [isLikeStatus]);

  useEffect(() => {
    if (likes !== 0) {
      setLikeCount(Number(likes));
    }
  }, [likes]);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const toggleLike = async () => {
    try {
      const newLikeStatus = likeStatus == "1" ? 0 : 1;

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
        setLikeCount((likeCount) =>
          newLikeStatus == "1" ? likeCount + 1 : likeCount - 1
        );

        notification.open({
          message: (
            <span>
              <FaClipboard style={{ marginRight: "8px" }} />
              <span>
                {newLikeStatus === 1
                  ? "Liked the video!"
                  : "Disliked the video!"}
              </span>
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
          user_id: user_id,
          comment: comtext,
          pc_id: vid, // Use the video ID from props
          pvideo_id: catid, // Use the category ID from props
        }
      );

      if (res.status === 200) {
        // Update comment list with the new comment
        setcomList(res?.data?.data?.comment_list.reverse());
        notification.success({
          message: "Comment sent!",
          duration: 2,
          placement: "bottom",
        });
        setcomText(""); // Clear the input box
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

  const handleCommentOpen = async () => {
    setshowCom(!showCom);
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.DOCTOR_LOUNGE.ADDUPDATE_VIDEO_COMMENT,
        {
          user_id: user_id,
          comment: null,
          pc_id: vid, // Use the video ID to fetch comments
          pvideo_id: catid, // Use the category ID
        }
      );

      if (res.status === 200) {
        setcomList(res?.data?.data?.comment_list.reverse());
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
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
              <FaClipboard style={{ marginRight: "8px" }} />
              <span>Link copied to clipboard!</span>
            </span>
          ),
          duration: 2,
          placement: "bottom",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

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

      // Refresh comment list
      fetchCommentList();

      setEditCommentId(null);
      setEditCommentText("");
    } catch (err) {
      toast.error("Failed to update comment");
      console.error(err);
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
    } catch (err) {
      toast.error("Failed to delete comment");
      console.error(err);
    }
  };

  const fetchCommentList = async () => {
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.DOCTOR_LOUNGE.ADDUPDATE_VIDEO_COMMENT,
        {
          user_id: user_id,
          comment: null,
          pc_id: vid,
          pvideo_id: catid,
        }
      );

      if (res.status === 200) {
        setcomList(res?.data?.data?.comment_list.reverse());
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [playerKey, setPlayerKey] = useState(0);

  useEffect(() => {
    if (!show) return; // only init when modal is open
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    if (videoUrl.endsWith(".m3u8") && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      hlsRef.current = hls;
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (
      videoUrl.endsWith(".m3u8") &&
      video.canPlayType("application/vnd.apple.mpegurl")
    ) {
      video.src = videoUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    } else {
      video.src = videoUrl;
      video.play();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [videoUrl, show, playerKey]);

  const handleClose = () => {
    setPlayerKey((prev) => prev + 1); // force new video element
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      className="closeBtn videoModalPart"
    >
      <Modal.Header closeButton />
      <Modal.Title
        style={{
          padding: "8px 10px 0px",
          fontSize: "18px",
          textAlign: "center",
        }}
      >
        {title}
      </Modal.Title>
      <Modal.Body>
        <div className="embed-responsive embed-responsive-16by9">
          {videoUrl.endsWith(".m3u8") ? (
            <>
              <video
              key={playerKey}
                controls
                autoPlay
                controlsList="nodownload"
                ref={videoRef}
              />
            </>
          ) : (
            <>
              <video
                controls
                autoPlay
                controlsList="nodownload"
                src={videoUrl}
              />
            </>
          )}
        </div>
        <div className="likeComment">
          <div className="view">
            <h6>{views}</h6>
            <FaEye />
          </div>
          <div className="likeBg">
            <h6>{likeCount}</h6>
            <FaThumbsUp
              style={{
                color: likeStatus == "1" ? "darkblue" : "#3f5395",
                cursor: "pointer",
              }}
              onClick={toggleLike}
            />
          </div>
          <div className="comment">
            <h6></h6>
            <FaComment onClick={handleCommentOpen} />
          </div>
          <div className="share">
            <h6 className=""></h6>
            <FaShare onClick={HandleShare} />
          </div>
        </div>
        {showCom && (
          <>
            <div className="d-flex">
              <input
                value={comtext}
                onChange={(e) => setcomText(e.target.value)}
                className="rounded"
                placeholder="write your comment..."
                style={{ padding: "2px", width: "100%" }}
              />
              <button
                onClick={handleComment}
                className="btn-primary p-2 m-2 rounded"
              >
                Done
              </button>
            </div>
            {comList
              ?.filter((data) => data.pvideo_id === catid)
              .map((data) => (
                <div
                  key={data.podcast_video_comment_id}
                  className="d-flex align-items-start p-1 m-2"
                  style={{ borderTop: "0.5px solid gray" }}
                >
                  <Avatar src={data.profile_picture} />
                  <div className="ms-2 w-100">
                    <div className="d-flex justify-content-between">
                      <strong>{data.username}</strong>
                      {data.user_id === user_id && (
                        <div>
                          <button
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => {
                              setEditCommentId(data.podcast_video_comment_id);
                              setEditCommentText(data.comment);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleDeleteComment(data.podcast_video_comment_id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                    {editCommentId === data.podcast_video_comment_id ? (
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
                      <p style={{ margin: "4px 0" }}>{data.comment}</p>
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

const Lounge = () => {
  const user_id = sessionStorage.getItem("id") || "4";
  const { id } = useParams(); // Get the ID from the URL parameters
  const [videoData, setvidData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setTitle] = useState("");
  const [likes, setlikes] = useState(0);
  const [views, setviews] = useState(0);
  const [Vid, setvid] = useState(null);
  const [CatId, setCatId] = useState(null);
  const [likestatus, setlikestatus] = useState(null);

  useEffect(() => {
    const getAllCat = async () => {
      const response = await axiosInstance.post(
        API_ENDPOINTS.DOCTOR_LOUNGE.PODCAST_VIDEO_LISTV2,
        { user_id: user_id, id: id }
      );

      if (response.status) {
        setvidData(response?.data?.data);
      }
    };
    getAllCat();
  }, [showModal, likestatus]);
  const handleClose = () => setShowModal(false);
  const handleShow = (url, tit, like, view, vid, cid, isliked) => {
    setVideoUrl(url);
    setTitle(tit);
    setShowModal(true);
    setlikes(like);
    setviews(view);
    setvid(vid);
    setCatId(cid);
    setlikestatus(isliked);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="Lounge">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            {/* <ul className="list-inline">
                    <li><a href={'/'}>Home</a></li>
                    <li>Quizzes & Events</li>
                </ul> */}
          </div>
        </div>
      </div>
      <div className="All-LoudgeData">
        <div className="container">
          {videoData === null ? (
            <toast className="error"> No Data </toast>
          ) : (
            <h2>{videoData[0]?.category}</h2>
          )}
          <Row>
            {videoData?.map((itm, index) => (
              <Col key={index} sm={12} md={6} lg={4}>
                <div
                  className="videotextData"
                  onClick={() =>
                    handleShow(
                      itm.video,
                      itm.video_title,
                      itm.total_like,
                      itm.total_views,
                      itm.id,
                      itm.cat_id,
                      itm?.is_like
                    )
                  }
                >
                  <h5>{itm.video_title}</h5>
                  <div className="videoSet">
                    <img
                      className="loudgeImg"
                      src={itm.icon}
                      loading="lazy"
                      alt="Video Banner"
                    />

                    <div className="videoInner">
                      <FaPlay
                        size={20}
                        color="white"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <YoutubeModal
            show={showModal}
            onHide={handleClose}
            videoUrl={videoUrl}
            title={videoTitle}
            vid={Vid}
            catid={CatId}
            likes={likes}
            views={views}
            isLikeStatus={likestatus}
          />
        </div>
      </div>
    </div>
  );
};

export default Lounge;
