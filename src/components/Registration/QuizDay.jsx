import React, { useRef, useState } from "react";
import Testimg from "../Registration/img/tests.svg";
import Qbankimg from "../Registration/img/qbanks.svg";
import Videoimg from "../Registration/img/videos.svg";
import Bookimg from "../Registration/img/openbook.svg";
import Stationeryimg from "../Registration/img/stationery.svg";
import Hoodieimg from "../Registration/img/hoodie.svg";
import Toothimg from "../Registration/img/tooth.svg";
import slide1 from "../Registration/img/slide1.svg";
import profile from "../Registration/img/profile.svg";
import heart from "../Registration/img/heart.svg";
import like from "../Registration/img/like.svg";
import podcast from "../Registration/img/podcast.svg";
import nobelprize from "../Registration/img/nobelprize.svg";
import liken from "../Registration/img/liken.svg";
import heartn from "../Registration/img/heartn.svg";
import earn from "../Registration/img/earn.svg";
import tech from "../Registration/img/tech.svg";
const QuizDay = ({ setformstate }) => {
  const scrollContainerRef = useRef(null);
  const scrollContainerRef1 = useRef(null);
  const scrollContainerRef2 = useRef(null);
  const images = [
    "https://via.placeholder.com/300x200?text=Image+1",
    "https://via.placeholder.com/300x200?text=Image+2",
    "https://via.placeholder.com/300x200?text=Image+3",
    "https://via.placeholder.com/300x200?text=Image+4",
  ];

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300, // Adjust scroll distance
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300, // Adjust scroll distance
      behavior: "smooth",
    });
  };

  const scrollLeft1 = () => {
    scrollContainerRef1.current.scrollBy({
      left: -300, // Adjust scroll distance
      behavior: "smooth",
    });
  };

  const scrollRight1 = () => {
    scrollContainerRef1.current.scrollBy({
      left: 300, // Adjust scroll distance
      behavior: "smooth",
    });
  };

  const scrollLeft2 = () => {
    scrollContainerRef2.current.scrollBy({
      left: -300, // Adjust scroll distance
      behavior: "smooth",
    });
  };

  const scrollRight2 = () => {
    scrollContainerRef2.current.scrollBy({
      left: 300, // Adjust scroll distance
      behavior: "smooth",
    });
  };

  return (
    <div className="">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>NEET PG NEXT</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="neetPGnext">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              {/* SLIDER */}
              <div className="bannerSec">
                <div className="leftSide">
                  <p>
                    <span>Congratulations!</span> you have free to the course
                    NEET PG NEXT
                  </p>
                </div>
                <div className="rytSide">
                  <p>
                    To Get Premium Access
                    <span>
                      <button className="btn">Go Pro</button>
                    </span>
                  </p>
                </div>
              </div>
              {/* TABS */}
              <div className="testSec">
                <div className="tabpart">
                  <div className="tab">
                    <img src={Testimg} />
                  </div>
                  <p>Tests</p>
                </div>
                <div className="tabpart">
                  <div className="tab">
                    <img src={Qbankimg} />
                  </div>
                  <p>QBank</p>
                </div>
                <div className="tabpart">
                  <div className="tab">
                    <img src={Videoimg} />
                  </div>
                  <p>Videos</p>
                </div>
              </div>
              {/* QUIZ OF THE DAY */}
              <div className="qUizofDay">
                <div className="quiZpart">
                  <h1>Quiz of the day</h1>
                  <h2>View all</h2>
                </div>
                <div className="textPart">
                  <p>
                    What is the most common clinical presentation of membranous
                    glomerulonephritis? What is the most common clinical
                    presentation of membranous glomerulonephritis? What is the
                    most common clinical presentation of membranous
                    glomerulonephritis?
                  </p>

                  <button className="btn">Start Quiz</button>
                </div>
              </div>
              {/* MEDIMART */}
              <div className="mediMart">
                <h4>MediMart</h4>
                <div className="mediSec">
                  <input
                    type="checkbox"
                    hidden
                    className="read-more-state"
                    id="read-more"
                  />
                  <div className="read-more-wrap">
                    <div className="mediPart">
                      <div className="tab">
                        <img src={Bookimg} />
                      </div>
                      <p>Books</p>
                    </div>
                    <div className="mediPart">
                      <div className="tab">
                        <img src={Stationeryimg} />
                      </div>
                      <p>Stationery</p>
                    </div>
                    <div className="mediPart">
                      <div className="tab">
                        <img src={Hoodieimg} />
                      </div>
                      <p>Hoodie</p>
                    </div>
                    <div className="mediPart">
                      <div className="tab">
                        <img src={Toothimg} />
                      </div>
                      <p>Dental</p>
                    </div>
                    <div className="mediPart">
                      <div className="tab">
                        <img src={Bookimg} />
                      </div>
                      <p>Books</p>
                    </div>
                    <div className="mediPart">
                      <div className="tab">
                        <img src={Stationeryimg} />
                      </div>
                      <p>Stationery</p>
                    </div>
                    <div className="mediPart">
                      <div className="tab">
                        <img src={Hoodieimg} />
                      </div>
                      <p>Hoodie</p>
                    </div>
                    <div className="read-more-target">
                      <div className="mediPart">
                        <div className="tab">
                          <img src={Toothimg} />
                        </div>
                        <p>Dental</p>
                      </div>
                    </div>
                  </div>
                  <label for="read-more" className="read-more-trigger_closed">
                    More
                  </label>
                  <label for="read-more" className="read-more-trigger_opened">
                    Less
                  </label>
                </div>
              </div>
              {/* DOCTOR LOUNGE */}
              <div className="doctorLounge">
                <h5>Doctor's Lounge</h5>
                <div className="image-gallery-container">
                  <button className="scroll-btn left" onClick={scrollLeft}>
                    &#8592;
                  </button>
                  <div className="image-gallery" ref={scrollContainerRef}>
                    {images.map((image, index) => (
                      <div
                        className="gallery-image"
                        style={{
                          backgroundImage: `url(${slide1})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          position: "relative",
                        }}
                      >
                        <div className="slideText">
                          <div className="textnewPart">
                            <div className="imgSec">
                              <img src={profile} />
                            </div>
                            <div className="textSec">
                              <h4>DR. Sumer Sethi</h4>
                              <p>EP24-Your know the BEST for Yourself</p>
                            </div>
                          </div>
                          <div className="likeSec">
                            <div className="partLike">
                              <img src={like} />
                              <img src={heart} />
                              <p>204</p>
                            </div>
                            <div className="date">
                              <p>13 Jan 2024</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="scroll-btn right" onClick={scrollRight}>
                    &#8594;
                  </button>
                </div>
              </div>
              {/* PODCAST */}
              <div className="doctorLounge podCastSec">
                <h5>Podcast</h5>
                <div className="image-gallery-container">
                  <button className="scroll-btn left" onClick={scrollLeft1}>
                    &#8592;
                  </button>
                  <div className="image-gallery" ref={scrollContainerRef1}>
                    {images.map((image, index) => (
                      <div
                        className="gallery-image"
                        style={{
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          position: "relative",
                        }}
                      >
                        <img src={podcast} />
                      </div>
                    ))}
                  </div>
                  <button className="scroll-btn right" onClick={scrollRight1}>
                    &#8594;
                  </button>
                </div>
              </div>
              {/* NEWS & ARTICAL */}
              <div className="doctorLounge newsArtical">
                <h5>News & Articles</h5>
                <div className="image-gallery-container">
                  <button className="scroll-btn left" onClick={scrollLeft2}>
                    &#8592;
                  </button>
                  <div className="image-gallery" ref={scrollContainerRef2}>
                    {images.map((image, index) => (
                      <div
                        className="gallery-image"
                        style={{
                          backgroundImage: `url(${nobelprize})`,
                          backgroundRepeat: "no-repeat",
                          position: "relative",
                        }}
                      >
                        <div className="nobelPrize">
                          <h2>2021 Nobel Prize in Physiology or Medicine</h2>
                          <p>
                            I joined pre-final year. The notes are very useful.
                            Tests, faculties & discussions .
                          </p>
                          <div className="datePart">
                            <div className="dateSec">
                              <p>8 May 2024</p>
                            </div>
                            <div className="imgSec">
                              <ul>
                                <li>
                                  <img src={liken} />
                                </li>
                                <li>
                                  <img src={heartn} />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="scroll-btn right" onClick={scrollRight2}>
                    &#8594;
                  </button>
                </div>
              </div>
              {/* EARN FREE */}
              <div className="earnFree">
                <div className="imgSec">
                  <img src={earn} />
                </div>
                <div className="textSec">
                  <h2>
                    <span>Earn Free</span> Coins & 1 Month Course
                  </h2>
                  <p>
                    For every new user you refer For any account you connect
                  </p>
                  <button className="btn">Refer Now</button>
                </div>
              </div>
              {/* TECHNICAL SUPPORT */}
              <div className="technicalSupport">
                <img src={tech} />
                <p>
                  Technical Support <span>(Only for technical queries)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuizDay;
