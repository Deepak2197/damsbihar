import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import "../Helpsupport/style.css";
import React, { useState, useEffect, useRef } from "react";
// import { toast } from "react-toastify";
import { isDesktop } from "react-device-detect";
import Modal from "react-bootstrap/Modal";
import { Button, Spin } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { FaX } from "react-icons/fa6";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const RaiseQuery = () => {
  const [statusData, setStatusData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(10);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItem = statusData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPage = Math.ceil(statusData?.length / rowsPerPage);
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPage));
  };
  const handlePageClick = (PageNumber) => {
    setCurrentPage(PageNumber);
  };
  // const userID = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const [toggleStatus, setToggleStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [list, setlist] = useState(null);
  const [whatsappno, setwhatsapp] = useState(null);
 
  const profilePic = sessionStorage.getItem("profilePic");
  const defaultImageUrl =
    "https://cdn-icons-png.flaticon.com/512/206/206853.png";

  const { id } = useParams();
  const userIdT = id?.endsWith("T") ? id?.slice(0, -1) : id?.split("DT")[0];
  // Begin: form submit code

  useEffect(() => {
    if (id.endsWith("T")) {
      setToggleStatus(false);
    }
  }, []);
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    subject: "",
    phone: "",
    query: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles([...files, ...event.dataTransfer.files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const category = event.currentTarget[0].value;
    const trimmedQuery = formData.query.trim();
    if (
      // !formData.firstname ||
      // !formData.email ||
      // !formData.phone ||
      !trimmedQuery
    ) {
      toast.error("Please fill all the fields....");
      return;
    }

    if (whatsappno && !/^\d{10}$/.test(whatsappno)) {
      toast.error("Whatsapp number format is not correct!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("user_id", userIdT);
    formDataToSend.append("username", list?.name);
    formDataToSend.append("phone_no", list?.mobile);
    formDataToSend.append("whatsapp_no", whatsappno);
    formDataToSend.append("email", list?.email);
    formDataToSend.append("problem_type", category);
    formDataToSend.append("description", formData?.query);
    formDataToSend.append("subject", id?.split("DT")[1]);
    files.forEach((file, index) => {
      formDataToSend.append(`qry_img[${index}]`, file);
    });

    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.HELP_AND_SUPPORT.STUDENT_QUERY,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.status === false) {
        toast.success(data.message);
      } else {
        navigate(`/ticket/${userIdT}`, { state: data.data });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getCheckStatus = async () => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.HELP_AND_SUPPORT.ALL_STUDENT_QUERIES
      );
    
      const filterData = data?.data?.filter((itm) => itm.user_id == userIdT);

      const res = await axiosInstance.post(
       API_ENDPOINTS.HELP_AND_SUPPORT.PROBLEM_TYPES
      );

      // setCategoryList(res.data.message);
      setCategoryList(res.data.data);
      
      setStatusData(filterData?.reverse());
    } catch (error) {
      
    }
  };
  useEffect(() => {
    getCheckStatus();
  }, []);

  // Begin: pop up code
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);

  const [tid, settid] = useState(null);
  const [qid, setqid] = useState(null);
  const [msg, setmsg] = useState(null);
  const [adminmsg, setadminmsg] = useState([]);
  const [usermsg, setusermsg] = useState([]);
  const [userDefalt, setuserDefaltMsg] = useState([]);

 

  const [attachedImage, setAttachedImage] = useState(null);
  const [sat, setsat] = useState(null);
  const handleShow = async (qid, tid, si) => {
    getCheckStatus();
    settid(tid);
    setqid(qid);
    setsat(si);
    // userID

    const res = await axiosInstance.post(API_ENDPOINTS.HELP_AND_SUPPORT.MESSAGE_LIST, {
      user_id: userIdT,
      ticket_id: tid,
      student_query_id: qid,
    });
    
    setuserDefaltMsg(res?.data?.data?.userDefaltMsg);
    setadminmsg(res?.data?.data?.adminMsglist);
    setusermsg(res?.data?.data?.userMsglist);

    setShow(true);
  };

  // End: pop up code

  const handleFileChanges = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedImage(e.target.files[0]); // Store the file object directly
    }
  };

  const handlesubmitmsg = async () => {
    const formData = new FormData();
    formData.append("user_id", userIdT);
    formData.append("ticket_id", tid);
    formData.append("student_query_id", qid);
    formData.append("meassage", msg);
    formData.append("sender", "user");

    if (attachedImage) {
      formData.append("sender_img", attachedImage); // Append file object directly
    }

    if (!attachedImage) {
      if (!msg || msg == "") {
        return;
      }
    }

    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.HELP_AND_SUPPORT.SEND_MESSAGE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status) {
        toast.success(res.data.statuscode);
        // setShow(false);
        handleShow(qid, tid);
        setmsg("");
        setAttachedImage(null);
      } else {
        toast.error(res.data.statuscode);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  function convertDateToHHMM(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const combinedMessages = [
    ...adminmsg.map((msg) => ({ ...msg, isAdmin: true })),
    ...usermsg.map((msg) => ({ ...msg, isAdmin: false })),
  ];
  // combinedMessages.sort(
  //   (a, b) => new Date(a.created_at) - new Date(b.created_at)
  // );
  // const handleClose = () => setShow(false);
  
  const [zoomsrc, setsrc] = useState("");
  const handleshowimg = (src) => {
    setShow1(true);
    setsrc(src);
  };

  const getdata = async () => {
    const resp = await axiosInstance.post(
      API_ENDPOINTS.HELP_AND_SUPPORT.DYNAMIC_USER_FIELDS,
      {
        user_id: userIdT,
      }
    );
    
    // setListData(resp?.data?.data);
    setlist(resp?.data?.data?.list);
  };
  useEffect(() => {
    getdata();
  }, []);

  const handleRaise = () => {
    
    if (toggleStatus) {
      setToggleStatus(false);
    } else {
      if (id?.includes("web") || id?.endsWith("T")) {
        window.location.href = id?.endsWith("T")
          ? `${window.location.href.split("T")[0]}DTweb`
          : `${window.location.href.split("D")[0]}DTweb`;
        setToggleStatus(true);
      } else {
        setToggleStatus(true);
      }
    }
  };
  const handlewhatsapp = (e) => {
    setwhatsapp(e.target.value);
  };

  const sameasMob = () => {
    // setwhatsapp(null)
    
    setwhatsapp(list?.mobile);
  };

  const detectLinks = (text) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = text?.split(urlPattern);

    return parts?.map((part, index) => {
      if (urlPattern?.test(part)) {
        return (
          <a
            key={index}
            href={part}
            style={{ cursor: "pointer" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        );
      } else {
        return part;
      }
    });
  };

  const chatRef = useRef(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  // Use useEffect to scroll to the bottom whenever combinedMessages updates
  useEffect(() => {
    scrollToBottom();
  }, [combinedMessages]);

  return (
    <>
      <Toaster />
      <div className="RaiseQuery" style={{ zIndex: 1000 }}>
        <div className="container">
          <a style={{color:'white'}} className="homebg" href="/">
            Home
          </a>
          <div className="bannerPart">
            <h1>Technical Support</h1>
            {/* <p style={{color:'white', marginTop:'20px',marginBottom:'0px',fontSize:'20px' }}>Please note that this is only for technical support.For other queries, please send an email or WhatsApp message</p> */}
          </div>
        </div>

        <div className="container">
          <div className="QueryForm">
            <div className="mixData">
              {toggleStatus ? (
                <p className="queryText">
                  Please note that this is only for technical support. For other
                  queries, please send an email or WhatsApp message *
                </p>
              ) : (
                <h3>Status</h3>
              )}
              {statusData?.length > 0 && (
                <button
                  onClick={handleRaise}
                  style={{
                    padding: isDesktop ? "10px 20px" : "0px",
                    background: toggleStatus
                      ? "green"
                      : isDesktop
                      ? "red"
                      : "white",
                    color: "white",
                  }}
                >
                  {toggleStatus
                    ? "Ticket Status"
                    : isDesktop
                    ? "Raise Your Query"
                    : ""}
                </button>
              )}
            </div>
            {toggleStatus && (
              <>
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      height: "50vh",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Spin size="large" />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="formData">
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <div className="form-group">
                          <label>Choose Your category *</label>
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                          >
                            {categoryList?.map((itm, i) => (
                              <option key={i} value={itm?.id}>
                                {itm?.problem_type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <div className="form-group">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <label>Name *</label>

                            {/* <label>value={list?.name}</label> */}
                          </div>
                          <input
                            type="text"
                            name="firstname"
                            placeholder="Your name.."
                            value={list?.name}
                            // onChange={handleChange}
                            // required
                            disabled
                            // readOnly
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <div className="form-group">
                          <label>Email Id *</label>
                          <input
                            type="email"
                            name="email"
                            placeholder="Your email id Number.."
                            value={list?.email}
                            // onChange={handleChange}
                            // readOnly
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <div className="form-group">
                          <label>Mobile No *</label>
                          <input
                            type="number"
                            name="phone"
                            placeholder="Your Mobile Number.."
                            value={list?.mobile}
                            // onChange={handleChange}
                            // required
                            // readOnly
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <div className="form-group">
                          <label>Device info</label>
                          <input
                            className="deviceInfo"
                            type="text"
                            name="subject"
                            placeholder="subject.."
                            value={id?.split("DT")[1]}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        <div className="form-group">
                          <label>Whatsapp No</label>
                          <div style={{ display: "flex" }}>
                            <p className="whatsAppData" onClick={sameasMob}>
                              Same as Mobile No
                            </p>
                            <input
                              className="whatsappNumber"
                              type="number"
                              name="subject"
                              placeholder="whatsapp number..."
                              onChange={handlewhatsapp}
                              value={whatsappno}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="form-group">
                          <label>Description of Query *</label>
                          <textarea
                            name="query"
                            placeholder="Enter Details.."
                            value={formData.query}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-3">
                        {attachedImage && (
                          <div className="attached-image">
                            <img
                              src={URL.createObjectURL(attachedImage)}
                              loading="lazy" alt="attachment"
                              style={{ maxWidth: "90%", maxHeight: "60px" }}
                            />
                          </div>
                        )}
                        <div className="form-group uploadGroup">
                          <input
                            type="file"
                            ref={inputRef}
                            name="file"
                            id="fileInput"
                            multiple
                            accept=".png,.jpg,.jpeg"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>

                      {files.length > 0 && (
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                          <div className="form-group">
                            <div
                              className="preview-images"
                              style={{ display: "flex" }}
                            >
                              {files.map((file, index) => (
                                <div key={index} className="preview-image">
                                  <img
                                    style={{ margin: "5px" }}
                                    width="100px"
                                    src={URL.createObjectURL(file)}
                                    loading="lazy" alt="Preview"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <input
                          type="submit"
                          value="Submit"
                          className="subbtn"
                        />
                      </div>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>

          {!toggleStatus && (
            <div className="tableDateshow">
              <table
                style={{ borderCollapse: "collapse", width: "100%" }}
                className="tableResponsive"
              >
                <tr>
                  <th>Name</th>
                  <th>Email Id</th>
                  <th>Contact No.</th>
                  <th>Ticket Description</th>
                  <th>Ticket Id</th>
                  <th>Status</th>
                  <th>View Message</th>
                </tr>
                {currentItem?.map((itm, i) => (
                  <tr key={i}>
                    <td>{itm?.username}</td>
                    <td>{itm?.email}</td>
                    <td>{itm?.phone_no}</td>
                    <td>{itm?.description}</td>
                    <td>{itm?.ticket_id}</td>
                    <td
                      style={{
                        color:
                          itm?.status === "0"
                            ? "#4833FE"
                            : itm?.status === "1"
                            ? "#ff0000"
                            : itm?.status === "2"
                            ? "#f86d6a"
                            : itm?.status === "3"
                            ? "#FFBF00"
                            : "black",
                        fontWeight: "bold",
                        fontFamily: "sans-serif",
                        textAlign: "center",
                      }}
                    >
                      {itm?.status === "0"
                        ? "New"
                        : itm?.status === "1"
                        ? "Close"
                        : itm?.status === "2"
                        ? "Reopen"
                        : itm?.status === "3"
                        ? "In Progress"
                        : "Pending"}
                    </td>

                    <td className="text-center">
                      <button
                        type="button"
                        className="viewPop"
                        onClick={() =>
                          handleShow(itm?.id, itm?.ticket_id, itm?.status)
                        }
                      >
                        View Message
                        {itm?.count_msg > 0 && (
                          <span
                            style={{
                              paddingInlineStart: "5px",
                              paddingInlineEnd: "5px",
                              fontSize: "14px",
                              fontWeight: "700",
                              marginLeft: "5px",
                              backgroundColor: "red",
                              borderRadius: "100%",
                              color: "white",
                              position: "absolute",
                              top: "-10px",
                              right: "-10px",
                              width: "22px",
                              height: "22px",
                            }}
                          >
                            {itm?.count_msg}
                          </span>
                        )}
                      </button>

                      {/* <button type="button" className="SendPop" onClick={handleShow1}>Send</button> */}
                    </td>
                  </tr>
                ))}
              </table>
              <div className="pagination">
                <button onClick={handlePrev} disabled={currentPage === 1}>
                  Prev
                </button>
                {Array.from({ length: totalPage }, (_, index) => (
                  <button
                    onClick={() => handlePageClick(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPage}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Begin: Model Code  */}
          <Modal show={show} onHide={handleClose} className="ViewModel">
            <Modal.Header>
              <div
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  justifyContent: "center",
                  color: "#F16136",
                }}
              >
                Ticket ID: {tid}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <FaX onClick={() => setShow(false)} cursor={"pointer"} />
              </div>
              <div className="msg right-msg staticdata mt-4">
                <div
                  className="msg-img"
                  style={{
                    backgroundImage: `url(${profilePic || defaultImageUrl})`,
                  }}
                ></div>
                <div className="msg-bubble" style={{zIndex:1000}}>
                  <div className="msg-info ">
                    <div className="msg-info-name">
                      {usermsg[0]?.user_name}{" "}
                    </div>
                    <div className="msg-info-time"></div>
                  </div>
                  <div className="description">
                    {detectLinks(userDefalt.description)}
                  </div>
                  <div>
                    {Object.keys(userDefalt)
                      .filter((key) => !isNaN(key))
                      .map((key) => (
                        <>
                          <img
                            key={userDefalt[key].image_id}
                            style={{ margin: "5px" }}
                            width="100px"
                            src={userDefalt[key].image.replace(/\\\//g, "/")}
                            loading="lazy" alt="Sender"
                              onClick={()=>handleshowimg(userDefalt[key].image.replace(/\\\//g, "/"))}
                          />
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </Modal.Header>
            <Modal.Body className="content">
              <section className="msger">
                <main className="msger-chat" ref={chatRef}>
                  {combinedMessages?.map((msg, index) =>
                    msg.isAdmin ? (
                      <div className="msg left-msg" key={index}>
                        <div className="msg-img"></div>
                        <div className="msg-bubble">
                          <div className="msg-info">
                            <div className="msg-info-name">Dams Support</div>
                            <div className="msg-info-time">
                              {convertDateToHHMM(msg?.created_at)}
                            </div>
                          </div>
                          <div className="msg-text">
                            {detectLinks(msg?.meassage)}
                          </div>

                          {msg?.sender_img && (
                            <>
                              <img
                                key={msg?.sender_img}
                                style={{ margin: "5px" }}
                                width="100px"
                                src={msg?.sender_img.replace(/\\\//g, "/")}
                                loading="lazy" alt="Sender"
                              />

                              <button
                                onClick={() =>
                                  handleshowimg(
                                    msg?.sender_img.replace(/\\\//g, "/")
                                  )
                                }
                                style={{
                                  zIndex: 1000,
                                  padding: "30px",
                                  paddingInline: "40px",
                                  marginLeft: "-100px",
                                }}
                              ></button>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="msg right-msg" key={index}>
                        <div
                          className="msg-img"
                          style={{
                            backgroundImage: `url(${
                              profilePic || defaultImageUrl
                            })`,
                          }}
                        ></div>

                        <div className="msg-bubble">
                          <div className="msg-info">
                            <div className="msg-info-name">
                              {msg?.user_name}
                            </div>
                            <div className="msg-info-time">
                              {convertDateToHHMM(msg?.created_at)}
                            </div>
                          </div>
                          <div className="msg-text">
                            {" "}
                            {detectLinks(msg?.meassage)}{" "}
                          </div>
                          {msg?.sender_img && (
                            <img
                              style={{ margin: "5px" }}
                              width="100px"
                              src={msg?.sender_img.replace(/\\\//g, "/")}
                              loading="lazy" alt="Sender"
                              onClick={()=>handleshowimg(msg?.sender_img.replace(/\\\//g, "/"))}
                            />
                          )}
                        </div>
                      </div>
                    )
                  )}
                </main>
                {sat != 1 && (
                  <div className="msger-inputarea">
                    {attachedImage && (
                      <div className="attached-image">
                        <img
                          src={URL.createObjectURL(attachedImage)}
                          loading="lazy" alt="attachment"
                          style={{ maxWidth: "90%", maxHeight: "60px" }}
                        />
                      </div>
                    )}

                    <div className="browseData1">
                      <input
                        type="file"
                        onChange={handleFileChanges}
                        className="msger-file-input"
                        accept="image/*,video/*"
                        // onKeyDown={(e) => {
                        //   if (e.key === 'Enter') {
                        //     e.preventDefault(); // Prevent default behavior like adding a new line
                        //     handlesubmitmsg(); // Call your submit function
                        //   }
                        // }}
                      />
                    </div>
                    <div className="fileUploadData1">
                      <input
                        value={msg}
                        onChange={(e) => {
                          const words = e.target.value.trim().split(/\s+/); // Split the input by whitespace to get words
                          if (words.length <= 300) {
                            setmsg(e.target.value); // Only set the message if it's 100 words or less
                          }
                        }}
                        type="text"
                        className="msger-input"
                        placeholder="Enter your message..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Prevent default behavior like adding a new line
                            handlesubmitmsg(); // Call your submit function
                          }
                        }}
                      />

                      <button onClick={handlesubmitmsg}>Send</button>
                    </div>
                  </div>
                )}
              </section>
            </Modal.Body>
          </Modal>

          <Modal show={show1} onHide={handleClose1} className="imageZoombg">
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <img src={zoomsrc} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default RaiseQuery;
