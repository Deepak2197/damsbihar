import React, { useEffect } from "react";
import { Col, Row } from "antd";
import "../../assets/css/Opportunity/style.css";
import "../../assets/css/Opportunity/responsive.css";
const Opportunityhome = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <section className="OppOrtunity OppOrtunityNew">
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className="opportunityPart opportunityPartNew">
            {/* <div className="topSecHead">
                <h2>Opportunity</h2>
                <a href="">View All</a>
              </div> */}
            <div className="setBoxWidth">
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
                  </div>
                </div>
                <div className="textPart">
                  <h4>Hello Everyone,</h4>
                  <p>
                    "I am looking for an honest, kind, and family-oriented
                    partner. Education and career are important, so I prefer an
                    ambitious, hardworking, and financially stable partner. I
                    value good communication and emotional intelligence in a
                    partner, and I want to find someone who can express their
                    feelings and listen to mine. Physical appearance is not my
                    top priority, but I appreciate a partner who takes care of
                    themselves and is physically fit. Above all, I seek a
                    compatible partner who respects my values and beliefs and is
                    ready to build a happy and fulfilling life together."
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
                    partner. Education and career are important, so I prefer an
                    ambitious, hardworking, and financially stable partner. I
                    value good communication and emotional intelligence in a
                    partner, and I want to find someone who can express their
                    feelings and listen to mine. Physical appearance is not my
                    top priority, but I appreciate a partner who takes care of
                    themselves and is physically fit. Above all, I seek a
                    compatible partner who respects my values and beliefs and is
                    ready to build a happy and fulfilling life together."
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
                    partner. Education and career are important, so I prefer an
                    ambitious, hardworking, and financially stable partner. I
                    value good communication and emotional intelligence in a
                    partner, and I want to find someone who can express their
                    feelings and listen to mine. Physical appearance is not my
                    top priority, but I appreciate a partner who takes care of
                    themselves and is physically fit. Above all, I seek a
                    compatible partner who respects my values and beliefs and is
                    ready to build a happy and fulfilling life together."
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
    </section>
  );
};

export default Opportunityhome;
