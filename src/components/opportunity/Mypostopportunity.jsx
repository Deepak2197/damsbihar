import React, { useState, useEffect, useRef } from "react";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";

import "../../assets/css/Opportunity/style.css";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

const Mypostopportunity = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section className="OppOrtunity">
      <div className="container">
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="Located">
              <Link to="/opportunity">
                <FaAngleLeft />
                My Post Opportunity
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
                      <div className="dropdown" ref={dropdownRef}>
                        <ul
                          className="dropbtn icons btn-right showLeft"
                          onClick={toggleDropdown}
                        >
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                        <div
                          className={`dropdown-content ${
                            isDropdownOpen ? "show" : ""
                          }`}
                        >
                          <a href="#">
                            {" "}
                            <FaPencil />
                            Edit
                          </a>
                          <a href="#">
                            {" "}
                            <FaTrash />
                            Delete
                          </a>
                        </div>
                      </div>
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
                      <div className="dropdown" ref={dropdownRef}>
                        <ul
                          className="dropbtn icons btn-right showLeft"
                          onClick={toggleDropdown}
                        >
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                        <div
                          className={`dropdown-content ${
                            isDropdownOpen ? "show" : ""
                          }`}
                        >
                          <a href="#">
                            {" "}
                            <FaPencil />
                            Edit
                          </a>
                          <a href="#">
                            {" "}
                            <FaTrash />
                            Delete
                          </a>
                        </div>
                      </div>
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
                      <div className="dropdown" ref={dropdownRef}>
                        <ul
                          className="dropbtn icons btn-right showLeft"
                          onClick={toggleDropdown}
                        >
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                        <div
                          className={`dropdown-content ${
                            isDropdownOpen ? "show" : ""
                          }`}
                        >
                          <a href="#">
                            {" "}
                            <FaPencil />
                            Edit
                          </a>
                          <a href="#">
                            {" "}
                            <FaTrash />
                            Delete
                          </a>
                        </div>
                      </div>
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
                      />
                    </div>
                  </div>
                </div>
                <div className="opportunitySec">
                  <div className="topPart">
                    <div className="imgpart">
                      {" "}
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/opportunity/profile.png`}
                      />
                    </div>
                    <div className="imgtext">
                      <h3>Jyoti Verma</h3>
                      <p>Sector 5, Noida, Uttar Pradesh · 2 hr</p>
                      <div className="dropdown" ref={dropdownRef}>
                        <ul
                          className="dropbtn icons btn-right showLeft"
                          onClick={toggleDropdown}
                        >
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                        <div
                          className={`dropdown-content ${
                            isDropdownOpen ? "show" : ""
                          }`}
                        >
                          <a href="#">
                            {" "}
                            <FaPencil />
                            Edit
                          </a>
                          <a href="#">
                            {" "}
                            <FaTrash />
                            Delete
                          </a>
                        </div>
                      </div>
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
                      {" "}
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
                      <div className="dropdown" ref={dropdownRef}>
                        <ul
                          className="dropbtn icons btn-right showLeft"
                          onClick={toggleDropdown}
                        >
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                        <div
                          className={`dropdown-content ${
                            isDropdownOpen ? "show" : ""
                          }`}
                        >
                          <a href="#">
                            {" "}
                            <FaPencil />
                            Edit
                          </a>
                          <a href="#">
                            {" "}
                            <FaTrash />
                            Delete
                          </a>
                        </div>
                      </div>
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
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Mypostopportunity;
