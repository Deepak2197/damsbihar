import { useEffect, useState } from "react";
import { Col, Row, Spin, Input, Button, Avatar, Dropdown, Menu } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import moment from "moment";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Dailycaseread = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};
  const [dailyCase, setDailyCase] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  // Improved user state handling
  const userId = sessionStorage.getItem("id");
  const userName = sessionStorage.getItem("name");
  const isLoggedIn = !!userId && userId !== "4"; // Check if real user is logged in

  useEffect(() => {
    if (!item?.id) {
      navigate("/dailycase", { replace: true });
      return;
    }

    const getDailyCase = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.post(
          API_ENDPOINTS.DAILYCASES.GETDAILYCASESBYID,
          { user_id: userId || "4", id: item.id } // Handle null userId
        );

        if (response.data?.status === true && response.data.data) {
          setDailyCase(response.data.data);
          if (response.data.data.comment_list) {
            setComments(response.data.data.comment_list);
          }
        } else {
          const msg = response.data?.message || "No data found";
          setError(msg);
          toast.error(msg);
        }
      } catch (err) {
        console.error("Error fetching daily case:", err);
        setError("Failed to load daily case.");
        toast.error("Failed to load daily case. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getDailyCase();
  }, [item?.id, navigate]);

  // Fixed like functionality with proper state management
  const handleLikeUnlike = async () => {
    if (!userId) {
      toast.info("Please login to like cases");
      return;
    }

    try {
      setLikeLoading(true);
      const currentLikeStatus = dailyCase.is_liked === "1";
      const newLikeStatus = currentLikeStatus ? "0" : "1";
      const currentLikes = parseInt(dailyCase.likes || "0");

      // Optimistic UI update
      setDailyCase((prev) => ({
        ...prev,
        is_liked: newLikeStatus,
        likes: currentLikeStatus
          ? (currentLikes - 1).toString()
          : (currentLikes + 1).toString(),
      }));
      const isLikedToSend = item.is_liked == "1" ? item.is_liked : "0";
      const response = await axiosInstance.post(
        API_ENDPOINTS.DAILYCASES.CASE_LIKE_BOOKMARK_STATUS,
        {
          user_id: userId,
          daily_cases_id: item.id,
          is_liked: dailyCase.is_liked,
          is_bookmarked: dailyCase.is_bookmarked,
          type: "like",
        }
      );

      if (!response.data?.status) {
        // Revert on failure
        setDailyCase((prev) => ({
          ...prev,
          is_liked: currentLikeStatus ? "1" : "0",
          likes: currentLikes.toString(),
        }));
        toast.error(response.data?.message || "Failed to update like status");
      }
    } catch (err) {
      console.error("Error updating like status:", err);
      toast.error("Failed to update like status. Please try again.");
      // Revert on error
      setDailyCase((prev) => ({
        ...prev,
        is_liked: dailyCase.is_liked,
        likes: dailyCase.likes,
      }));
    } finally {
      setLikeLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.warning("Please enter a comment");
      return;
    }

    try {
      setCommentLoading(true);
      const response = await axiosInstance.post(
        API_ENDPOINTS.DAILYCASES.ADD_COMMENT_DAILY_CASES,
        {
          user_id: userId,
          daily_cases_id: item.id,
          comment: newComment.trim(),
        }
      );

      if (response.data?.status === true) {
        toast.success("Comment added successfully");
        setNewComment("");

        const newCommentObj = {
          id: Date.now().toString(),
          user_id: userId,
          daily_cases_id: item.id,
          created_date: new Date().toISOString(),
          comment: newComment.trim(),
          is_pin: "0",
          name: userName,
          is_pinned: "0",
          profile_picture: "",
        };

        setComments((prev) => [newCommentObj, ...prev]);
        setDailyCase((prev) => ({
          ...prev,
          comment_count: (parseInt(prev.comment_count) || 0) + 1,
        }));

        const updatedResponse = await axiosInstance.post(
          API_ENDPOINTS.DAILYCASES.GETDAILYCASESBYID,
          { user_id: userId, id: item.id }
        );
        if (
          updatedResponse.data?.status === true &&
          updatedResponse.data.data
        ) {
          if (updatedResponse.data.data.comment_list) {
            setComments(updatedResponse.data.data.comment_list);
          }
        }
      } else {
        toast.error(response.data?.message || "Failed to add comment");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setCommentLoading(false);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handlePinComment = async (commentId, dailyCaseId, isPin) => {
    try {
      const is_pin = isPin === "1" ? "0" : "1";
      const response = await axiosInstance.post(
        API_ENDPOINTS.DAILYCASES.COMMENT_PIN_STATUS,
        {
          daily_cases_id: dailyCaseId,
          is_pin: is_pin,
          user_id: userId,
          comment_id: commentId,
        }
      );

      if (response.data?.status === true) {
        const updatedResponse = await axiosInstance.post(
          API_ENDPOINTS.DAILYCASES.GETDAILYCASESBYID,
          { user_id: userId, id: item.id }
        );
        if (
          updatedResponse.data?.status === true &&
          updatedResponse.data.data
        ) {
          setDailyCase(updatedResponse.data.data);
          if (updatedResponse.data.data.comment_list) {
            setComments(updatedResponse.data.data.comment_list);
          }
        }
        toast.success(
          is_pin === "1"
            ? "Comment pinned successfully"
            : "Comment unpinned successfully"
        );
      } else {
        toast.error(
          response.data?.message ||
            (is_pin === "1"
              ? "Failed to pin comment"
              : "Failed to unpin comment")
        );
      }
    } catch (err) {
      console.error("Error updating pin status:", err);
      toast.error(
        is_pin === "1"
          ? "Failed to pin comment. Please try again."
          : "Failed to unpin comment. Please try again."
      );
    }
  };

  const handleDeleteComment = async (commentId, dailyCaseId) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.DAILYCASES.DELETE_COMMENT_DAILYCASE,
        {
          user_id: userId,
          comment_id: commentId,
          daily_cases_id: dailyCaseId,
        }
      );

      if (response.data?.status === true) {
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId)
        );
        setDailyCase((prev) => ({
          ...prev,
          comment_count: (parseInt(prev.comment_count) || 0) - 1,
        }));
        toast.success("Comment deleted successfully");
      } else {
        toast.error(response.data?.message || "Failed to delete comment");
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
      toast.error("Failed to delete comment. Please try again.");
    }
  };

  const handleEditComment = (commentId, currentComment) => {
    setNewComment(currentComment);
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? { ...comment, is_editing: true } : comment
      )
    );
  };

  const handleUpdateComment = async (commentId, dailyCaseId) => {
    if (!newComment.trim()) {
      toast.warning("Please enter a comment");
      return;
    }

    try {
      setCommentLoading(true);
      const response = await axiosInstance.post(
        API_ENDPOINTS.DAILYCASES.UPDATE_COMMENT_DAILY_CASES,
        {
          user_id: userId,
          daily_cases_id: dailyCaseId,
          comment_id: commentId,
          comment: newComment.trim(),
        }
      );

      if (response.data?.status === true) {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId
              ? { ...comment, comment: newComment.trim(), is_editing: false }
              : comment
          )
        );
        setNewComment("");
        toast.success("Comment updated successfully");
      } else {
        toast.error(response.data?.message || "Failed to update comment");
      }
    } catch (err) {
      console.error("Error updating comment:", err);
      toast.error("Failed to update comment. Please try again.");
    } finally {
      setCommentLoading(false);
    }
  };

  const commentMenu = (comment) => {
    const menuItems = [];

    // Always show Edit and Delete for comment owner
    if (comment.user_id === userId) {
      menuItems.push(
        <Menu.Item
          style={{
            border: "1px solid blue",
            marginBottom: "5px",
            padding: "4px 10px",
          }}
          key="edit"
          onClick={() => handleEditComment(comment.id, comment.comment)}
        >
          <EditOutlined style={{ marginRight: "3px", color: "blue" }} />
        </Menu.Item>,
        <Menu.Item
          style={{ border: "1px solid red", padding: "4px 10px" }}
          key="delete"
          onClick={() => handleDeleteComment(comment.id, item.id)}
        >
          <DeleteOutlined style={{ marginRight: "3px", color: "red" }} />
        </Menu.Item>
      );
    }
    if (comment.user_id === userId && comment.is_pinned === "1") {
      menuItems.push(
        <Menu.Item
          key="pin"
          onClick={() => handlePinComment(comment.id, item.id, comment.is_pin)}
        >
          {comment.is_pin === "1" ? "Unpin" : "Pin"}
        </Menu.Item>
      );
    }

    return <Menu>{menuItems}</Menu>;
  };

  if (loading) {
    return (
      <div
        className="loadingCenter"
        style={{ textAlign: "center", marginTop: 50 }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="errorCenter"
        style={{ textAlign: "center", marginTop: 50 }}
      >
        <p>{error}</p>
      </div>
    );
  }

  if (!dailyCase) {
    return null;
  }

  return (
    <>
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Case of the day</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="ReadDailyCase">
        <div className="container">
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="FullBox">
                <div className="readCaseBox">
                  <h2>{dailyCase.title || "Untitled Case"}</h2>
                  {dailyCase.image_video && (
                    <img
                      src={dailyCase.image_video}
                      alt={dailyCase.title || "daily case"}
                      style={{
                        width: "100%",
                        maxHeight: "400px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.src = `${window.IMG_BASE_URL}/emdpublic/dailycases/dailycase.png`;
                      }}
                    />
                  )}
                  <div className="case-description">
                    {parse(dailyCase.description || "")}
                  </div>
                </div>

                <div className="CommentSection">
                  <div className="CommentPart">
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        display: "flex",
                        gap: "15px",
                      }}
                    >
                      <li
                        onClick={handleLikeUnlike}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={
                            dailyCase.is_liked == "1"
                              ? "/web/daily-case/likes.svg"
                              : // ? `${window.IMG_BASE_URL}/emdpublic/dailycases/likes.svg`
                                `${window.IMG_BASE_URL}/emdpublic/dailycases/like.svg`
                          }
                          alt="likes"
                          style={{ marginRight: "5px" }}
                        />
                        {dailyCase.likes || 0}
                      </li>
                      <li>
                        {/* <img
                          src={`${window.IMG_BASE_URL}/emdpublic/dailycases/view.svg`}
                          alt="views"
                        /> */}
                        <img src="/web/daily-case/view.svg" />
                        {dailyCase.views || 0}
                      </li>
                      <li
                        onClick={toggleComments}
                        style={{ cursor: "pointer" }}
                      >
                        {dailyCase.comment_count || 0} Comments
                      </li>
                    </ul>
                  </div>
                </div>

                {showComments && (
                  <div
                    className="CommentsContainer"
                    style={{
                      marginTop: "20px",
                      padding: "20px",
                      background: "#eeeeee",
                      backgroundImage:
                        "linear-gradient(0deg, rgba(238, 238, 238, 1) 0%, rgba(250, 250, 250, 1) 52%, rgba(255, 255, 255, 1) 100%)",
                      borderRadius: "8px",
                      border: "none",
                    }}
                  >
                    <h3
                      style={{
                        marginBottom: "20px",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      All Comments
                    </h3>

                    <div style={{ marginBottom: "20px" }}>
                      <Input.TextArea
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment..."
                        maxLength={500}
                        style={{ marginBottom: "10px" }}
                      />
                      <Button
                        type="primary"
                        onClick={handleAddComment}
                        loading={commentLoading}
                        style={{
                          background: "#007aff",
                          borderColor: "#007aff",
                        }}
                      >
                        Post Comment
                      </Button>
                    </div>

                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                      {comments.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#999" }}>
                          No comments yet
                        </p>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                          }}
                        >
                          {comments.map((comment) => (
                            <div
                              key={comment.id}
                              style={{
                                display: "flex",
                                gap: "12px",
                                padding: "12px",
                                background: "#fff",
                                borderRadius: "8px",
                              }}
                            >
                              <Avatar
                                size={40}
                                src={
                                  comment.profile_picture ||
                                  "https://joesch.moe/api/v1/random"
                                }
                                style={{
                                  backgroundColor: "#eeeeee",
                                  backgroundImage:
                                    "linear-gradient(184deg, #eeeeee 15%, #ffffff 100%)",
                                  flexShrink: 0,
                                }}
                              />
                              <div style={{ flex: 1 }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "4px",
                                  }}
                                >
                                  <div className="">
                                    <span style={{ fontWeight: "600" }}>
                                      {comment.name || "Anonymous"}
                                    </span>
                                    {comment.user_id === userId &&
                                      comment.is_pin === "1" && (
                                        <span
                                          style={{
                                            color: "#007aff",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          📌
                                        </span>
                                      )}
                                  </div>
                                  {comment.user_id === userId && (
                                    <Dropdown
                                      overlay={commentMenu(comment)}
                                      trigger={["click"]}
                                    >
                                      <span
                                        style={{
                                          cursor: "pointer",
                                          color: "#007aff",
                                          fontSize: "25px",
                                        }}
                                      >
                                        ⋮
                                      </span>
                                    </Dropdown>
                                  )}
                                </div>
                                <div
                                  style={{
                                    margin: "4px 0",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {comment.is_editing ? (
                                    <>
                                      <Input.TextArea
                                        rows={2}
                                        value={newComment}
                                        onChange={(e) =>
                                          setNewComment(e.target.value)
                                        }
                                        autoFocus
                                        style={{ marginBottom: "10px" }}
                                      />
                                      <Button
                                        type="primary"
                                        onClick={() =>
                                          handleUpdateComment(
                                            comment.id,
                                            item.id
                                          )
                                        }
                                        loading={commentLoading}
                                        style={{
                                          background: "#007aff",
                                          borderColor: "#007aff",
                                        }}
                                      >
                                        Update
                                      </Button>
                                    </>
                                  ) : (
                                    comment.comment
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default Dailycaseread;
