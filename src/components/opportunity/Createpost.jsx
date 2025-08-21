import React, { useRef, useState } from "react";
import { Col, Row } from "antd";

import { Card } from "antd";
import { Input, Button, Upload, message, List, Typography } from "antd";
import {
  SmileOutlined,
  PictureOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { MdAttachFile } from "react-icons/md";
import { FaAngleLeft, FaPencil } from "react-icons/fa6";
import {
  FaPaperclip,
  FaPaperPlane,
  FaShare,
  FaShareAlt,
  FaTrash,
} from "react-icons/fa";
const { Text } = Typography;
const Createpost = () => {
  const photoVideoInputRef = useRef(null);
  const docInputRef = useRef(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [docFiles, setDocFiles] = useState([]);

  const handlePhotoVideoClick = () => {
    photoVideoInputRef.current?.click();
  };

  const handleAttachFileClick = () => {
    docInputRef.current?.click();
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const handleDocChange = (e) => {
    const files = Array.from(e.target.files);
    setDocFiles((prev) => [...prev, ...files]);
  };

  const [options, setOptions] = useState(["", ""]);

  const handleChange = (idx, value) => {
    setOptions((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions((prev) => [...prev, ""]);
    }
  };

  const handlePost = () => {
    //console.log("Posting options:", options);
  };
  return (
    <>
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Opportunity Create Post</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="createPost">
        <div className="container">
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="tabbingPart">
                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#book"
                    >
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/book.svg`}
                      />
                    </button>
                    <p>Books</p>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#jobs"
                    >
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/job.svg`}
                      />
                    </button>
                    <p>Jobs</p>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#marriage"
                    >
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/ring.svg`}
                      />
                    </button>
                    <p>Marriage</p>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#mobiles"
                    >
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/mobile.svg`}
                      />
                    </button>
                    <p>Mobiles</p>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      data-bs-toggle="pill"
                      data-bs-target="#post"
                    >
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/post.svg`}
                      />
                    </button>
                    <p>Create Post</p>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#poll"
                    >
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/poll.svg`}
                      />
                    </button>
                    <p>Start Poll</p>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#event"
                    >
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/event.svg`}
                      />
                    </button>
                    <p>Host Event</p>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#appliances"
                    >
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/appliances.svg`}
                      />{" "}
                    </button>
                    <p>Electronics & Appliances</p>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#furniture"
                    >
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/furniture.svg`}
                      />
                    </button>
                    <p>Furniture</p>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#pets"
                    >
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/pets.svg`}
                      />
                    </button>
                    <p>Pets</p>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#fashion"
                    >
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/fashion.svg`}
                      />
                    </button>
                    <p>Fashion</p>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade" id="book">
                    Books
                  </div>
                  <div className="tab-pane fade" id="jobs">
                    Jobs
                  </div>
                  <div className="tab-pane fade" id="marriage">
                    marriage
                  </div>
                  <div className="tab-pane fade" id="mobiles">
                    mobiles
                  </div>
                  <div className="tab-pane fade show active" id="post">
                    <div className="createPostPart">
                      <div className="topPart">
                        <div className="imgpart">
                          <img
                            src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                          />
                        </div>
                        <div className="imgtext">
                          <h3>Jyoti Verma</h3>
                          <Text type="secondary">
                            Sector 5, Noida, Uttar Pradesh · 2 hr
                          </Text>
                        </div>
                      </div>

                      <div className="textAreaPart">
                        <Input.TextArea
                          placeholder="What do you want to talk about?"
                          autoSize={{ minRows: 1, maxRows: 4 }}
                          style={{ borderRadius: 12, padding: "8px 16px" }}
                        />
                      </div>

                      {mediaFiles.length > 0 && (
                        <div>
                          {mediaFiles.map((file, index) => {
                            const url = URL.createObjectURL(file);
                            return file.type.startsWith("video") ? (
                              <video
                                key={index}
                                controls
                                style={{ width: "100%", borderRadius: 8 }}
                              >
                                <source src={url} type={file.type} />
                              </video>
                            ) : (
                              <img
                                key={index}
                                src={url}
                                alt="preview"
                                style={{
                                  width: "auto",
                                  height: 200,
                                  borderRadius: 8,
                                }}
                              />
                            );
                          })}
                        </div>
                      )}

                      {docFiles.length > 0 && (
                        <div style={{ marginBottom: 16 }}>
                          <Text strong>Attached Files:</Text>
                          <List
                            size="small"
                            bordered
                            dataSource={docFiles}
                            renderItem={(item) => (
                              <List.Item>{item.name}</List.Item>
                            )}
                            style={{ marginTop: 8 }}
                          />
                        </div>
                      )}
                      <div className="btnSec">
                        <div className="btnSecNew">
                          <Button
                            type="text"
                            icon={<PictureOutlined />}
                            onClick={handlePhotoVideoClick}
                          >
                            <span className="photVido">Photo/Video</span>
                          </Button>
                          <input
                            type="file"
                            ref={photoVideoInputRef}
                            onChange={handleMediaChange}
                            style={{ display: "none" }}
                            multiple
                            accept="image/*,video/*"
                          />

                          <Button
                            type="text"
                            icon={<MdAttachFile />}
                            onClick={handleAttachFileClick}
                          >
                            <span className="attafile">Attach File</span>
                          </Button>
                          <input
                            type="file"
                            ref={docInputRef}
                            onChange={handleDocChange}
                            style={{ display: "none" }}
                            multiple
                            accept=".doc,.docx,.pdf,.txt,.xls,.xlsx,.ppt,.pptx,.csv"
                          />
                        </div>

                        <Button className="post" type="primary">
                          Post <FaPaperPlane />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="poll">
                    <div className="pollSection">
                      <div className="topPart">
                        <div className="imgpart">
                          <img
                            src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                          />
                        </div>
                        <div className="imgtext">
                          <h3>Jyoti Verma</h3>
                          <Text type="secondary">
                            Sector 5, Noida, Uttar Pradesh · 2 hr
                          </Text>
                        </div>
                      </div>
                      <p>Add a description to your poll</p>
                      <div className="pollQuestion">
                        <Row>
                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className="form-group">
                              <input
                                className="form-control setOfinput"
                                type="type"
                                name=""
                                placeholder="Write your poll question here..."
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                          {options.map((value, idx) => (
                            <Col
                              key={idx}
                              xs={24}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={6}
                            >
                              <div className="form-group">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder={`Option ${idx + 1}`}
                                  value={value}
                                  onChange={(e) =>
                                    handleChange(idx, e.target.value)
                                  }
                                />
                              </div>
                            </Col>
                          ))}

                          <Col xs={24} md={24}>
                            <div className="Options">
                              <Button
                                type="link"
                                className="optionAdd"
                                onClick={handleAddOption}
                                disabled={options.length >= 4}
                              >
                                + Add Option
                              </Button>

                              <Button className="btnPost" onClick={handlePost}>
                                Post&nbsp;
                                <FaPaperPlane />
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="event">
                  Host Event
                </div>
                <div className="tab-pane fade" id="appliances">
                  Electronics & Appliances
                </div>
                <div className="tab-pane fade" id="furniture">
                  Furniture
                </div>
                <div className="tab-pane fade" id="pets">
                  Pets
                </div>
                <div className="tab-pane fade" id="fashion">
                  Fashion
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default Createpost;
