import React, { useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import {
  FaUserShield,
  FaClock,
  FaDesktop,
  FaBan,
  FaBalanceScale,
} from "react-icons/fa";
import "./style.css"; // make sure this file includes updated styles

const FairUsagePolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const sections = [
    {
      icon: <FaUserShield size={24} />,
      color: "info",
      title: " Single User Policy",
      content: `Each DAMS Pro account is licensed to only one individual. Sharing login credentials, streaming content to others, or using the same account across multiple users is strictly prohibited. Any such activity will be considered a violation of this Fair Usage Policy.`,
    },
    {
      icon: <FaClock size={24} />,
      color: "warning",
      title: " Learning Hour Cap",
      content: `To ensure fair usage and prevent misuse, each account comes with a maximum video watch time cap (e.g., 1500 hours per subscription). This is more than sufficient for genuine preparation and daily usage. Excessive usage beyond this limit may be flagged for review.`,
    },
    {
      icon: <FaDesktop size={24} />,
      color: "success",
      title: " Device & Location Monitoring",
      content: (
        <div>
          <div className="textSet">We monitor:</div>

          <ul>
            <li>
              <strong>Device IDs</strong>
            </li>
            <li>
              <strong>IP addresses</strong>
            </li>
            <li>
              <strong>Login frequency and location shifts</strong>
            </li>
          </ul>
          <div className="">
            Frequent device switching or simultaneous logins from different
            locations may result in account suspension or review.
          </div>
        </div>
      ),
    },
    {
      icon: <FaBan size={24} />,
      color: "danger",
      title: " Prohibited Activities",
      content: (
        <>
          <div className="textSet">
            The following activities are violations of our policy:
          </div>
          <ul>
            <li>Account sharing with peers, coaching centers, or groups </li>
            <li>Screen recording or unauthorized distribution of content </li>
            <li>Logging in from multiple devices excessively </li>
            <li>Using automation tools to scrape or download material </li>
          </ul>
        </>
      ),
    },
    {
      icon: <FaBalanceScale size={24} />,
      color: "dark",
      title: " Violations and Penalties",
      content: (
        <>
          <div className="textSet">
            If any misuse or policy breach is detected:
          </div>
          <ul>
            <li>
              Your account may be{" "}
              <strong> temporarily or permanently blocked</strong>
            </li>
            <li>No refund or transfer will be entertained </li>
            <li>
              Repeat violations will lead to <strong>legal action</strong>
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <Container>
      <div className="fairUsagePolicy">
        <div className="six">
          <h2>DAMS Fair Usage Policy</h2>
        </div>
        <Card.Body>
          {sections.map((sec, idx) => (
            <div key={idx} className="policy-section">
              <div className="d-flex align-items-center">
                <div className={`icon-circle`}>{sec.icon}</div>
                <h4>{sec.title}</h4>
              </div>
              <p>{sec.content}</p>
            </div>
          ))}

          <div className="policy-section">
            <h4 className="text-center">Why This Policy Exists</h4>
            <h5 className="text-center">
              This Fair Usage Policy is in place to:{" "}
            </h5>
            <div className="row g-4">
              {[
                {
                  title: "Protect honest students",
                  desc: "who use the platform ethically",
                  border: "primary",
                },
                {
                  title: "Preserve the value",
                  desc: "of our expert faculty's content",
                  border: "success",
                },
                {
                  title: "Ensure consistent platform performance",
                  desc: "for all users",
                  border: "info",
                },
              ].map((card, index) => (
                <div className="col-md-4" key={index}>
                  <div className="ExistsBox">
                    <h6>{card.title}</h6>
                    <h3>{card.desc}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card.Body>
      </div>
    </Container>
  );
};

export default FairUsagePolicy;
