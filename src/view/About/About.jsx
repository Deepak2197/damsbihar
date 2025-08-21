import React, { useState } from "react";
import "../About/style.css";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";

const YoutubeModal = ({ show, onHide, videoUrl }) => {
  return (
    <Modal className="storiesModel" show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton />
      <Modal.Body>
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

const About = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleShow = (url) => {
    setVideoUrl(url);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div
      className="About position-relative"
      style={{ width: "100%", float: "left" }}
    >
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>About Us </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="commanColor"></div>
      <div className="container">
        <div className="row">
          <div className="aboutBanner">
            <div className="textSection">
              <h1>About us</h1>
              <h2>
                (We are <span>DAMS the Name of success</span> in preparation for
                Medical entrance Exams)
              </h2>
              <p>
                Since 1999, DAMS (Delhi Academy of Medical Sciences) has been
                one of India's top-ranked postgraduate medical and dental exam
                preparation institutions.
              </p>
            </div>
            <div className="imgSec">
              <img src={`${window.IMG_BASE_URL}/about-left.png`} alt="about" />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="aboutText">
          <div className="TextPart">
            <p>
              For over two decades, DAMS has provided India's best preparation
              for the Medical Entrance Exam to doctors, and over half a million
              doctors and medical students have studied with us. For almost two
              decades, the Delhi Academy of Medical Sciences (DAMS) has been a
              well-known name in the field of PG Medical Entrance Education.
              Today, under the direction of Dr. Sumer Sethi, a radiologist and
              prior AIPG/AIIMS topper, DAMS is known for its uncanny foresight,
              unmatched knowledge, and inherent wisdom. We are the top-ranked
              coaching center for NEET PG Pattern, AIIMS, PGI, UPSC, DNB, and
              MCI screening for PG medical entrance examinations. DAMS offers
              specialized courses created by professionals in their disciplines,
              led by Dr. Sumer Sethi, a renowned radiologist who was formerly a
              top student at AIPG and AIIMS. With our earnest effort, we promise
              to deliver the finest tutoring for NEET PG Pattern, AIIMS PG
              entrance, and PGI Chandigarh. Joining DAMS offers you access to
              dams, the most popular software for PG entrance exams, which
              includes features such as DAMS Q-Bank, Test series, and DAMS
              DECKS. The Delhi Academy of Medical Sciences has raged with the
              vitality of a torrent that never stops renewing itself while
              remaining unwavering in its determination to achieve its final
              goal.
            </p>
          </div>
          <div className="TextPart">
            <p>
              The institute's goal is to instill a drive in students not only to
              give particular information and enhance their foundation in PG
              Medical Entrance but also to crack the entrance exams at the
              post-graduate level. We, at DAMS, have established through
              scientific teaching and assessment techniques to assist students
              to discover their potential and grasp the topic. DAMS has been
              awarded the South Asia E-Health Summit Award 2014 for excellence
              in medical education. Dr. Sumer Sethi, director of Delhi Academy
              of Medical Science Pvt. Ltd., received the award from e-learning
              expert, Professor Vaidyanathan Balasubramanyam, of St. John’s
              Medical College, Bengaluru.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="about-area reverse">
          <div className="categories-box m-0 p-0">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7">
                <h2 className="font-weight-bold">Who We Are </h2>
                <p>
                  The Delhi Academy of Medical Sciences has been a well-known
                  name in the field of PG Medical Entrance Education. Under the
                  direction of Dr. Sumer Sethi, a renowned radiologist, and
                  previous AIPG/AIIMS topper, DAMS is renowned as the country's
                  most specialized institution of its kind, constantly reaching
                  high levels of performance and holding the uncommon
                  distinction of having the greatest success percentage in the
                  PG Medical Entrance Exam. DAMS is an institution for PG
                  medical entrance exams (AIPG (NBE/NEET) Pattern), AIIMS, PGI,
                  UPSC, DNB, and MCI screening. The Delhi Academy of Medical
                  Sciences (DAMS) was established as a pioneer institution for
                  success in the country's most rigorous competitive exam, the
                  Postgraduate Medical Entrance Exam. The DAMS has evolved over
                  the years into a unique fraternity of instructors and students
                  who work together year after year toward a shared goal.
                </p>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5">
                <div className="thumb weAre">
                  <img
                    src={`${window.IMG_BASE_URL}/whoWe-img.jpg`}
                    alt="whoWe"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="about-area reverseNew">
          <div className="categories-box m-0 p-0">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-5">
                <div className="thumb weDo">
                  <img src={`${window.IMG_BASE_URL}/whatwe.jpg`} alt="whatwe" />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-7">
                <div className="abcontent">
                  <h2 className="font-weight-bold">What We Do </h2>
                  <p>
                    Our aim is not only to provide specific knowledge and
                    strengthen the foundation of the students in PG Medical
                    Entrance but also to infuse them with the determination to
                    crack the entrance exams at the post-graduation level. To
                    explore the potential of the students and to help them
                    master the subject, we at DAMS have developed extensive
                    scientific teaching as well as testing methods. It's known
                    for its impeccable foresight, enviable expertise, and innate
                    acumen. The application will give students pursuing a PG
                    medical degree and relying on the number one coaching
                    institute wings.
                  </p>
                  <p>
                    DAMS' Standardized Education Delivery system assures that
                    our faculty members provide flawless and consistent
                    coaching. Because of the unique and holistic nature of our
                    teaching technique, we produce not only exceptional
                    classNameroom discussions but also insightful study
                    material.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="about-area reverse">
          <div className="categories-box m-0 p-0">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-7">
                <div className="abcontent">
                  <p>
                    Every effort is made to ensure that the concepts are
                    completely understood by the students. The faculty members'
                    remarkable qualifications and extensive expertise assist in
                    making difficult problems simple for pupils. Our
                    comprehensive teaching method not only makes you shine but
                    also assures that you are ranked among the best performers
                    in competitive tests. Our Online Platform DAMS is an
                    e-learning application that has the below-sated features:
                  </p>

                  <ol style={{ liststyletype: "circle" }}>
                    <li>
                      Extensive subject-wise teaching by experts and authors of
                      popular books.
                    </li>
                    <li> Detailed Notes</li>
                    <li>MCQ-based Brainstorming Sessions</li>
                    <li>Pioneers in the test and discussion course</li>
                    <li>Online Medical Case Discussion</li>
                    <li>Sharing of knowledge</li>
                  </ol>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-5">
                <div className="thumb effort">
                  <img
                    src={`${window.IMG_BASE_URL}/effort.jpg`}
                    alt="effort"
                    className="m-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="about-area reverseNew">
          <div className="categories-box m-0 p-0">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-5">
                <div className="thumb mission-img">
                  <img
                    src={`${window.IMG_BASE_URL}/mission.jpg`}
                    alt="mission"
                    className="m-0"
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-7">
                <h2 className="font-weight-bold">Our Mission </h2>
                <p>
                  Our mission is to ensure that every single student who joins
                  us benefits to the extent that they come out of the PG medical
                  entrance exam with flying colors. In all our efforts and
                  ideas, we sincerely try to ensure that you get the branch and
                  institute of your choice. The mission behind the DAMS app’s
                  development is to ensure that the students who join us can
                  leverage the most of it for their dream institutions for
                  admission. With all our efforts and ideas with this app, we
                  sincerely strive to ensure that you get the education of your
                  choice and that it is fruitful for the future too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="about-area reverse">
          <div className="categories-box m-0 p-0">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-7">
                <h2 className="font-weight-bold">Our Vision </h2>
                <p>
                  DAMS has a broad vision to provide education and guidance that
                  transforms students through rigorous coursework and by
                  providing an understanding of the needs of society and the
                  medical industry. With a vision to provide more value to
                  students' learning, the Delhi Academy of Medical Sciences
                  (DAMS) works with a vision to provide more value to students'
                  learning, with an entrance success rate of up to 85%.
                </p>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-5">
                <div className="thumb visionImg">
                  <img
                    src={`${window.IMG_BASE_URL}/vision.jpg`}
                    alt="vision"
                    className="m-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="about-area reverseNew">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-left">
                <h2 className="font-weight-bold mb-4">About DAMS</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="single-item col-12 col-sm-12 col-md-12 col-lg-5">
              <div className="thumb-box " style={{ float: "right" }}>
                <video
                  width="500"
                  height="260"
                  controls
                  controlsList="nodownload"
                  //  poster={`${window.IMG_BASE_URL}/7-layers-7.png`}
                >
                  <source
                    src="https://d2enu63wt1sf3u.cloudfront.net/course_file_meta/52743401754377016.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                {/* <a
                  onClick={() =>
                    handleShow(
                      "https://www.youtube.com/embed/2Qo2IroaUe4?autoplay=1"
                    )
                  }
                  className="popup-youtube light video-play-button item-center newvedio"
                  data-toggle="modal"
                  data-target="#Geeks2"
                >
                  <i className="fa fa-play"></i>
                </a> */}
              </div>
            </div>
            <div className="item-box col-12 col-sm-12 col-md-12 col-lg-7">
              <p>
                The Delhi Academy of Medical Sciences (DAMS), a well-known name
                in the field of PG Medical Entrance Education, has created the
                dams application. It is now known for its excellent vision,
                outstanding competence, and intuitive wisdom under the guidance
                of Dr. Sumer Sethi, radiologist and previous topper of
                AIPG/AIIMS. Students pursuing a PG medical degree who rely on
                the number one coaching center for the PG medical entrance
                examinations like AIPG (NBE/NEET) Pattern, AIIMS, PGI, UPSC,
                DNB, and MCI screening would benefit from the application. The
                software was created to assist students in learning more
                conveniently and effectively. Thousands of verified physicians,
                healthcare workers, and medical students share knowledge and
                learn from one another in their private environment using this
                app.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="about-area reverse mb-5">
          <div className="categories-box m-0 p-0">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                <h2 className="font-weight-bold">
                  About Dr. Sumer Sethi, MD (DAMS){" "}
                </h2>
                <p>
                  Dr. Sumer Sethi, MD (DAMS), is a renowned radiologist,
                  entrepreneur, blogger, innovator, TedX speaker, and
                  motivational speaker who has not only pioneered work in his
                  profession but also taught thousands of medical students. His
                  father, Dr. SC Sethi, was stationed in Libya on deputation
                  when he was born in 1976. Dr. Sumer K. Sethi received an AIR 4
                  in the All India Undergraduate Medical Entrance Examination
                  and completed his MBBS at the prestigious Maulana Azad Medical
                  College. In the All India Postgraduate Medical Entrance
                  Examination, he received rank 12 in AIIMS PG, 2000, and 4th
                  rank in the All India Postgraduate Medical Entrance
                  Examination. He had chosen a post-graduate residency programme
                  in MD radiodiagnosis at Lady Hardinge Medical College because
                  he was driven by his passion and vision. He worked as a
                  registrar at Lady Hardinge Medical College and was affiliated
                  with Smt. Sucheta Kriplani Saran Hospital in New Delhi, India.
                  He also served as a consultant radiologist for a variety of
                  Delhi institutions, including the Indian Spinal Injuries
                  Centre and VIMHANS.
                </p>
                <p>
                  In 2015, Dr. Sethi was awarded the Digital Bharat Award for
                  his website, Telerad Providers. In 2007, RT Image magazine
                  named him one of the top 25 most significant people in
                  radiology. The Daily Rounds (2016) included him in their list
                  of iconic doctors. In 2016, Curofy named him to their Doctor
                  of the Year list. In 2004, he received the Shri ML Garg
                  Memorial Medal for Best Senior Resident in Radiology. He was a
                  visiting foreign faculty member at Libyan universities in
                  Tripoli. He was invited to talk on entrepreneurship in
                  radiology at the IRIA in 2012. He spoke on the improvements in
                  radiology education needed for the future generation at the
                  2019 and 2020 IRIA conferences. The Internet Journal of
                  Radiology is edited by Dr. Sethi as Editor-in-Chief of the
                  journal.
                </p>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-4 abdirect">
                <img
                  src={`${window.IMG_BASE_URL_OLD}/images/newjs/img/about/sumersir.JPG`}
                  className="abdirectimg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="Geeks2" className="modal fade">
        <div className="modal-dialog modalv">
          <div className="modal-content">
            <div className="modal-body mbody">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
                onclick="gettouch_hide()"
              >
                ×
              </button>
              <iframe
                id="Geeks3"
                width="100%"
                height="500px"
                src=""
                frameborder="0"
                allowfullscreen=""
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <YoutubeModal show={showModal} onHide={handleClose} videoUrl={videoUrl} />
    </div>
  );
};

export default About;
