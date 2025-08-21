import React, { useEffect, useState } from "react";
//import "../../assets/newjs/style.css"
import "../../assets/css/student-info/style.css";
import "../../assets/css/student-info/responsive.css";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
const Studentinfo = () => {
  const [showZoom, setShowZoom] = useState(false);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="Studentinfo">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>Student Information </li>
            </ul>
          </div>
        </div>
      </div>
      <section className="Student-info">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="imgSec">
                {/* <img src={`${window.IMG_BASE_URL}/student-banner.png`} alt="" /> */}
                <h3>Welcome to the Student Information</h3>
                <img
                  src={`${window.IMG_BASE_URL}/revamp-web/helpsupport/studentinfo.svg`}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="info-text">
                <h1>Important Notice for Students</h1>
                <p>
                  Please be informed that receipts downloaded through the dams
                  application or{" "}
                  <Link style={{ color: "#007aFF" }}>www.damsdelhi.com</Link>.
                  will be considered valid. Manual receipts or any other
                  receipts will not be accepted in case of disputes, discounts,
                  or other benefits from DAMS in the future.
                </p>
                <p>
                  As a policy, DAMS encourages students to make payments using
                  the dams application or{" "}
                  <Link style={{ color: "#007aFF" }}>www.damsdelhi.com</Link>.
                  We only accept online payments through our application and
                  website. Receipts can be downloaded via email,
                  www.damsdelhi.com, or the DAMS application.
                </p>
                <p>
                  <strong>Please note:</strong> Cash payments or payments made
                  outside the application are strictly not accepted.
                </p>
              </div>
            </div>
          </div>
          {/* <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div className="info-text">
                                <h1>STUDENT INFORMATION</h1>
                                <p>Students please insist on seeking a fees receipt for every payment. DAMS genuine fees receipts can only be in the following format:</p>
                                <h4>DAMS ERP Generated Fee Receipt:</h4>
                                <p>Student please be informed that any receipt other than, the ERP generated format and generated from DAMS ERP software is not valid and shall not be considered in case of any disputes or for any discounts and other benefits from DAMS in future. Also, after your enrolment please login to cloud.damsdelhi.com and check if your profile and personal details are correctly entered in our database.</p>
                                <p>Please note as a policy DAMS encourages students to pay using demand draft/pay in favor of Delhi Academy of Medical Sciences Pvt. Ltd. or DAMS Sky Pvt. Ltd. whichever applicable.</p>
                            </div>
                        </div>
                    </div> */}

          <div className="dams-img">
            <div className="row">
              <div className="col-md-12">
                <div className="generatedRecipt">
                  <h2>ERP Generated Receipt</h2>
                  <p>
                    The ERP generated receipt is the above format is the only
                    valid receipt. Receipt is any other format / Manual receipts
                    are INVALID and will not be Honoured.
                  </p>
                  <img
                    src="/erp.png"
                    alt="erp receipt"
                    onClick={() => setShowZoom(true)}
                    style={{
                      cursor: "zoom-in",
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Image Zoom Modal */}
          <Modal
            show={showZoom}
            onHide={() => setShowZoom(false)}
            centered
            size="lg"
          >
            <Modal.Body style={{ padding: 0 }}>
              <img
                src="/erp.png"
                alt="Zoomed receipt"
                style={{ width: "100%", height: "auto" }}
              />
            </Modal.Body>
          </Modal>
          {/* <div className="get-touch">
            <a
              href={
                "https://api.whatsapp.com/send?phone=919899664533&amp;text=Hello,%20I%20have%20a%20question"
              }
              target="_blank"
            >
              <img
                src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/student-info/whats-app.png"
                alt="whatsApp"
              />
            </a>
          </div> */}
        </div>
      </section>
    </div>
  );
};
export default Studentinfo;
