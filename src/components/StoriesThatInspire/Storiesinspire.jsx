import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const YoutubeModal = ({ show, onHide, videoUrl }) => {
  return (
    <Modal className="storiesModel"
    show={show}
    onHide={onHide}
  
    size="lg" 
  
    // Set the size of the modal to large
  >
    <Modal.Header closeButton   />
    <Modal.Body   > {/* Set the height to 70% of viewport height */}
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          className="embed-responsive-item"
          src={videoUrl}
          allowFullScreen
        />
      </div>
    </Modal.Body>
  </Modal>
  );
};


function Storiesinspire({ videoData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleShow = (url) => {
    setVideoUrl(url);
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

  return (
    <section className="stories-inspire position-relative">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
            <div className="globe_heading">
              <h2 className="font-weight-bold">
                Stories <span>that inspire</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="video_area">
          <div id="demo" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              {videoData && (
                <div className="carousel-inner">
                  {[...Array(Math.ceil(videoData?.length / 3)).keys()].map(
                    (index) => (
                      <div
                        key={index}
                        className={`carousel-item ${
                          index === currentIndex ? "active" : ""
                        }`}
                      >
                        <div className="video_textBg position-relative">
                          <div className="row">
                            {videoData
                              ?.slice(index * 3, (index + 1) * 3)
                              .map((itm, i) => (
                                <div
                                  key={i}
                                  className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
                                >
                                  <img src={itm.thumb_image_url} loading="lazy" alt="Thumb" />
                                  <span
                                    onClick={() => handleShow(itm.video_url)}
                                    className="light video-play-button item-center playvideo"
                                  >
                                    <i className="fa fa-play"></i>
                                  </span>
                                  <div className="student_text">
                                    <h3 className="m-0">{itm.video_title}</h3>
                                  </div>
                                  <div className="backRadius"></div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                  <ul className="carousel-indicators">
                    <li data-target="#demo" data-slide-to="13" className="" onClick={prevSlide}>
                      <em className="fa fa-arrow-left" ></em>
                    </li>
                    <li
                      data-target="#demo"
                      data-slide-to="15"
                      className="active"
                      onClick={nextSlide}
                    >
                      <em className="fa fa-arrow-right"></em>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <YoutubeModal show={showModal} onHide={handleClose} videoUrl={videoUrl} />
    </section>
  );
}
export default Storiesinspire;
