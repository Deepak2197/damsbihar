import "../../assets/css/dams/franchise-opportunity/style.css";
import React, { useState, react, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Franchise = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stateData, setStateData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [stateValue, setStateValue] = useState("");
  const [citiesValue, setCitiesValue] = useState("");
  const [stateTitle, setStateTitle] = useState("");
  const [citiesTitle, setCitiesTitle] = useState("");

  // Begin: pop up code
  const [franchiseModal, setFranchiseModal] = useState(false);
  const handleClose = () => setShow(false);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);
  const [show6, setShow6] = useState(false);
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);
  const [show7, setShow7] = useState(false);
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);
  const [show8, setShow8] = useState(false);
  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);
  const [show9, setShow9] = useState(false);
  const handleClose9 = () => setShow9(false);
  const handleShow9 = () => setShow9(true);
  // End: pop up code

  const getStates = async () => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.FRANCHISE.GET_STATES);
      setStateData(response.data.data);
    } catch (err) {}
  };

  const handleChangeState = (e) => {
    setCitiesValue("");
    setStateValue(e.target.value);
  };

  const getCities = async () => {
    try {
      const res = await axiosInstance.post(API_ENDPOINTS.FRANCHISE.GET_CITIES, {
        user_id: 4,
        state: stateValue,
      });
      setCitiesData(res.data.data);
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(API_ENDPOINTS.FRANCHISE.FRANCHISE_APPLY, {
        name: name,
        email: email,
        mobile: phone,
        state: stateTitle,
        city: citiesTitle,
      });
      if (res.data.status === true) {
        toast.success("Form has been submitted...");
        setName("");
        setEmail("");
        setPhone("");
        setStateValue("");
        setCitiesValue("");
        setFranchiseModal(false);
      } else {
        toast.error(res.data.error.email || res.data.error.mobile);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (stateValue) {
      getCities();
      getStateTitle();
    }
  }, [stateValue]);

  useEffect(() => {
    if (franchiseModal) {
      getStates();
    }
  }, [franchiseModal]);

  // this is the wrong way &   because backend developer need to title and city name instead of value.

  const getStateTitle = () => {
    const a = stateData.find((itm) => itm.id === stateValue);
    setStateTitle(a?.state_name);
  };

  useEffect(() => {
    if (citiesValue) {
      const c = citiesData.find((itm) => itm.id === citiesValue);
      setCitiesTitle(c?.city_name);
    }
  }, [citiesValue]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="Franchise position-relative">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>Franchise Opportunity</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="commanColor"></div>
      <div className="container">
        <section className="franchise-opportunity">
          <div className="row">
            {/* <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div className="header-section">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/franchise-opportunity/header.png"
                      loading="lazy" alt="icon image"
                    />
                  </div>
                </div> */}
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div className="franchisetext">
                <h1>
                  Join hands with No.1 PGME{" "}
                  <span className="d-block">Classes & be a part</span>
                </h1>
                <h3>Of Our Success Story</h3>
                <p>
                  High Return on Investment & best in the Bussiness Franchise
                  support.{" "}
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div className="franchiseImg">
                {/* <img
                  src={`${window.IMG_BASE_URL}/franchise-img.png`}
                  loading="lazy"
                  alt="icon image"
                /> */}
                <img src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/revamp-web/helpsupport/franchise.png"></img>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="container">
        <div className="middle-section">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div className="main-hdng">
                <h1>FRANCHISE OPPORTUNITY</h1>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div className="model-part">
                <div className="btn-grp">
                  <Button onClick={() => setFranchiseModal(true)}>
                    APPLY FOR FRANCHISE
                    <em className="fa fa-angle-double-right ml-2"></em>
                  </Button>
                </div>

                {/* Begin: Model Code  */}
                <Modal
                  show={franchiseModal}
                  onHide={() => setFranchiseModal(false)}
                  className="franchiseModel float-right"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>FRANCHISE</Modal.Title>
                  </Modal.Header>

                  <Modal.Body className="content">
                    <form>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="floating-label-group">
                            <div className="floating-label-group">
                              <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                required
                              />
                            </div>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>

                          <div className="floating-label-group">
                            <input
                              type="number"
                              name="phone"
                              placeholder="Mobile"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-sm-12 form-group position-relative">
                          <em className="fa fa-angle-down down-toggle"></em>
                          <select
                            className="form-control"
                            style={{ color: "#999" }}
                            value={stateValue}
                            onChange={handleChangeState}
                          >
                            <option>Select State</option>
                            {stateData &&
                              stateData?.map((itm, i) => (
                                <option key={i} value={itm.id}>
                                  {itm.state_name}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className="col-sm-12 form-group position-relative">
                          <em className="fa fa-angle-down down-toggle"></em>
                          <select
                            className="form-control"
                            style={{ color: "#999" }}
                            value={citiesValue}
                            onChange={(e) => setCitiesValue(e.target.value)}
                          >
                            <option>Select City</option>
                            {citiesData &&
                              citiesData?.map((itm, i) => (
                                <option value={itm.id}>{itm.city_name}</option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </form>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="franchiseData" style={{ marginBottom: "30px" }}>
                <div className="commonaData">
                  <h5>
                    Join Us in Shaping the Future of Healthcare Education –
                    Become a Franchisee with DAMS!
                  </h5>
                  <p>
                    Are you passionate about education and eager to make a
                    significant impact in the healthcare sector? Do you dream of
                    owning a thriving business that transforms the lives of
                    aspiring doctors and nurses? At DAMS, we are redefining the
                    landscape of healthcare education and we want you to be part
                    of our journey.
                  </p>
                </div>
                <div className="commonaData">
                  <h3>Join the Legacy: </h3>
                  <span style={{ color: "#424242", fontWeight: "500" }}>
                    Franchise Opportunity with DAMS (Delhi Academy of Medical
                    Sciences).
                  </span>

                  <p>
                    We are excited to announce new franchise opportunities for
                    DAMS Face-to-Face (F2F) classes as we expand to Lucknow and
                    Cochin, as well as any other major cities. With a 25-year
                    legacy of excellence in medical education, DAMS has shaped
                    the careers of countless aspiring doctors and healthcare
                    professionals across the country.
                  </p>
                </div>
                <div className="commonaData">
                  <h3>Why Partner with DAMS?: </h3>
                  <ul className="commonaData">
                    <li>
                      1. Proven Success: A 25-year-old academy with a reputation
                      for top-notch medical education.
                    </li>
                    <li>
                      2. Established Brand: Trusted by students across India for
                      NEET PG and other medical entrance exams.
                    </li>
                    <li>
                      3. Comprehensive Support: From faculty to course material
                      and technology, DAMS provides complete support to
                      franchisees.
                    </li>
                    <li>
                      4. Cutting-Edge Curriculum: Continuously updated content
                      aligned with current medical exam patterns.
                    </li>
                    <li>
                      5. Premises Owners: Preference will be given to
                      individuals or organizations with their own premises.
                    </li>
                    <li>
                      6. Medical or Education Background: Candidates with
                      experience in the medical field or education will be
                      prioritized.
                    </li>
                  </ul>
                </div>
                <div className="commonaData">
                  <p>
                    Seize this opportunity to be a part of a legacy of success
                    in medical education!
                  </p>
                  <p>
                    For more information, please reach out to us at{" "}
                    <span style={{ color: "#007AFF" }}>
                      franchise@damsdelhi.com
                    </span>
                  </p>

                  <p>Join DAMS. Shape the future of medical professionals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={show1} onHide={handleClose1} className="articlemsg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="content">
            <div className="text-center">
              <h5 className="tectbg"> High return on investment</h5>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={show2} onHide={handleClose2} className="articlemsg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="content">
            <div className="text-center">
              <h5 className="tectbg">
                Proven track record with successfully running 30+ Face to Face
                classrooms in India.
              </h5>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={show3} onHide={handleClose3} className="articlemsg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="content">
            <div className="text-center">
              <h5 className="tectbg">
                Reputed Brand in this domain since more than two decades.
              </h5>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={show4} onHide={handleClose4} className="articlemsg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="content">
            <div className="text-center">
              <h5 className="tectbg">
                Many Doctors have already benefitted from our Excellent Academic
                Programs.
              </h5>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={show5} onHide={handleClose5} className="articlemsg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="content">
            <div className="text-center">
              <h5 className="tectbg">
                Association with the reputed DAMS brand of a respected business
                house.
              </h5>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={show6} onHide={handleClose6} className="articlemsg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="content">
            <div className="text-center">
              <h5 className="tectbg">
                DAMS is the name that is well established in the PG Medical
                Entrance education world.
              </h5>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={show7} onHide={handleClose7} className="articlemsg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="content">
            <div className="text-center">
              <h5 className="tectbg">Access to a proven business model.</h5>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={show8} onHide={handleClose8} className="articlemsg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="content">
            <div className="text-center">
              <h5 className="tectbg">
                All necessary assistance and training to set up and start off.
              </h5>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={show9} onHide={handleClose9} className="articlemsg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="content">
            <div className="text-center">
              <h5 className="tectbg">
                Effective advertising, promotion and publicity support.
              </h5>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
export default Franchise;
