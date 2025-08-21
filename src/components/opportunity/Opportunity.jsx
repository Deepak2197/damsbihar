import React, { useEffect, useState } from "react";
import { FaAngleDown, FaMapMarkerAlt } from "react-icons/fa";
import { Col, Row, Button, Modal } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import "../../assets/css/Opportunity/style.css";
import { FaAngleRight } from "react-icons/fa6";
const Opportunity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/createpost");
  };

  return (
    <section className="OppOrtunity">
      <div className="container">
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="createBtn">
              <button className="btn" onClick={handleClick}>
                Create Post
              </button>
            </div>
            <div className="Located">
              <Link to="/postopportunity">
                My Post Opportunity <FaAngleRight />
              </Link>
              <Link onClick={showModal}>
                <FaMapMarkerAlt />
                New Delhi
                <FaAngleDown />
              </Link>
            </div>
            <div className="opportunityPart ">
              {/* <div className="topSecHead">
                <h2>Opportunity</h2>
                <a href="">View All</a>
              </div> */}

              <div className="setBoxWidth">
                <div className="opportunitySec">
                  <div className="topPart">
                    <div className="imgpart">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                      />
                    </div>
                    <div className="imgtext">
                      <h3>Jyoti Verma</h3>
                      <p>Sector 5, Noida, Uttar Pradesh · 2 hr</p>
                    </div>
                  </div>
                  <div className="textPart">
                    <h4>Hello Everyone,</h4>
                    <p>
                      "I am looking for an honest, kind, and family-oriented
                      partner. Education and career are important, so I prefer
                      an ambitious, hardworking, and financially stable partner.
                      I value good communication and emotional intelligence in a
                      partner, and I want to find someone who can express their
                      feelings and listen to mine. Physical appearance is not my
                      top priority, but I appreciate a partner who takes care of
                      themselves and is physically fit. Above all, I seek a
                      compatible partner who respects my values and beliefs and
                      is ready to build a happy and fulfilling life together."
                    </p>
                  </div>
                  <div className="picPart">
                    <img
                      src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                    />
                    <img
                      src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                    />
                  </div>
                  <div className="ulPart">
                    <div className="likeSec">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/like.svg`}
                        alt="Like"
                      />
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/chat.svg`}
                        alt="Chat"
                      />
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/share.svg`}
                        alt="Share"
                      />
                    </div>
                    <div className="viewSec">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/view.svg`}
                      />{" "}
                      152
                    </div>
                  </div>
                </div>
                <div className="opportunitySec">
                  <div className="topPart">
                    <div className="imgpart">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                      />
                    </div>
                    <div className="imgtext">
                      <h3>Jyoti Verma</h3>
                      <p>Sector 5, Noida, Uttar Pradesh · 2 hr</p>
                    </div>
                  </div>
                  <div className="textPart">
                    <h4>Hello Everyone,</h4>
                    <p>
                      "I am looking for an honest, kind, and family-oriented
                      partner. Education and career are important, so I prefer
                      an ambitious, hardworking, and financially stable partner.
                      I value good communication and emotional intelligence in a
                      partner, and I want to find someone who can express their
                      feelings and listen to mine. Physical appearance is not my
                      top priority, but I appreciate a partner who takes care of
                      themselves and is physically fit. Above all, I seek a
                      compatible partner who respects my values and beliefs and
                      is ready to build a happy and fulfilling life together."
                    </p>
                  </div>
                  <div className="picPart">
                    <img
                      src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                    />
                    <img
                      src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                    />
                  </div>
                  <div className="ulPart">
                    <div className="likeSec">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/like.svg`}
                        alt="Like"
                      />
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/chat.svg`}
                        alt="Chat"
                      />
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/share.svg`}
                        alt="Share"
                      />
                    </div>
                    <div className="viewSec">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/view.svg`}
                      />{" "}
                      152
                    </div>
                  </div>
                </div>
                <div className="opportunitySec">
                  <div className="topPart">
                    <div className="imgpart">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                      />
                    </div>
                    <div className="imgtext">
                      <h3>Jyoti Verma</h3>
                      <p>Sector 5, Noida, Uttar Pradesh · 2 hr</p>
                    </div>
                  </div>
                  <div className="textPart">
                    <h4>Hello Everyone,</h4>
                    <p>
                      "I am looking for an honest, kind, and family-oriented
                      partner. Education and career are important, so I prefer
                      an ambitious, hardworking, and financially stable partner.
                      I value good communication and emotional intelligence in a
                      partner, and I want to find someone who can express their
                      feelings and listen to mine. Physical appearance is not my
                      top priority, but I appreciate a partner who takes care of
                      themselves and is physically fit. Above all, I seek a
                      compatible partner who respects my values and beliefs and
                      is ready to build a happy and fulfilling life together."
                    </p>
                  </div>
                  <div className="picPart">
                    <img
                      src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                    />
                    <img
                      src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                    />
                  </div>
                  <div className="ulPart">
                    <div className="likeSec">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/like.svg`}
                        alt="Like"
                      />
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/chat.svg`}
                        alt="Chat"
                      />
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/share.svg`}
                        alt="Share"
                      />
                    </div>
                    <div className="viewSec">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/view.svg`}
                      />{" "}
                      152
                    </div>
                  </div>
                </div>
                <div className="opportunitySec">
                  <div className="topPart">
                    <div className="imgpart">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                      />
                    </div>
                    <div className="imgtext">
                      <h3>Jyoti Verma</h3>
                      <p>Sector 5, Noida, Uttar Pradesh · 2 hr</p>
                    </div>
                  </div>
                  <div className="textPart">
                    <h4>Hello Everyone,</h4>
                    <p>
                      "I am looking for an honest, kind, and family-oriented
                      partner. Education and career are important, so I prefer
                      an ambitious, hardworking, and financially stable partner.
                      I value good communication and emotional intelligence in a
                      partner, and I want to find someone who can express their
                      feelings and listen to mine. Physical appearance is not my
                      top priority, but I appreciate a partner who takes care of
                      themselves and is physically fit. Above all, I seek a
                      compatible partner who respects my values and beliefs and
                      is ready to build a happy and fulfilling life together."
                    </p>
                  </div>
                  <div className="picPart">
                    <img
                      src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                    />
                    <img
                      src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                    />
                  </div>
                  <div className="ulPart">
                    <div className="likeSec">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/like.svg`}
                        alt="Like"
                      />
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/chat.svg`}
                        alt="Chat"
                      />
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/share.svg`}
                        alt="Share"
                      />
                    </div>
                    <div className="viewSec">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/view.svg`}
                      />{" "}
                      152
                    </div>
                  </div>
                </div>
                <div className="opportunitySec">
                  <div className="topPart">
                    <div className="imgpart">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                      />
                    </div>
                    <div className="imgtext">
                      <h3>Jyoti Verma</h3>
                      <p>Sector 5, Noida, Uttar Pradesh · 2 hr</p>
                    </div>
                  </div>
                  <div className="textPart">
                    <h4>Hello Everyone,</h4>
                    <p>
                      "I am looking for an honest, kind, and family-oriented
                      partner. Education and career are important, so I prefer
                      an ambitious, hardworking, and financially stable partner.
                      I value good communication and emotional intelligence in a
                      partner, and I want to find someone who can express their
                      feelings and listen to mine. Physical appearance is not my
                      top priority, but I appreciate a partner who takes care of
                      themselves and is physically fit. Above all, I seek a
                      compatible partner who respects my values and beliefs and
                      is ready to build a happy and fulfilling life together."
                    </p>
                  </div>
                  <div className="picPart">
                    <img
                      src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                    />
                    <img
                      src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                    />
                  </div>
                  <div className="ulPart">
                    <div className="likeSec">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/like.svg`}
                        alt="Like"
                      />
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/chat.svg`}
                        alt="Chat"
                      />
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/share.svg`}
                        alt="Share"
                      />
                    </div>
                    <div className="viewSec">
                      <img src="/opportunity/view.svg" alt="Views" /> 152
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <>
        <Modal
          className="locateModal"
          title="Location"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="searchSec">
            <div class="form-group has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input
                type="text"
                class="form-control"
                placeholder="Search city, area"
              />
            </div>
          </div>
          <div className="currantLocate">
            <div className="iconlocate">
              <AimOutlined />
            </div>
            <div className="textLocate">
              <h3>Use current location</h3>
              <p>Fetching location...</p>
            </div>
          </div>
          <div className="chooseState">
            <h4>Choose State</h4>
            <h5>All in India</h5>
            <ul>
              <li>Andaman and Nicobar</li>
              <li>Andhra Pradesh</li>
              <li>Assam</li>
              <li>Bihar</li>
              <li>Delhi</li>
            </ul>
          </div>
        </Modal>
      </>
    </section>
  );
};

export default Opportunity;
