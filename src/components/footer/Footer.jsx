import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
//import "../../assets/css/footer/style.css";
import { FaWhatsapp } from "react-icons/fa";
import Login from "../Login/Login";
function Footer({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [targeturl, settargeturl] = useState(null);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const userid = sessionStorage.getItem("id");
  const isreg = sessionStorage.getItem("userData");
  const isreqdata = JSON.parse(isreg);

  const sess_id = sessionStorage.getItem("id");
  const handlerClose = () => {
    setSignInModalOpen(false);
  };

  const handleSignInSuccess = () => {
    setSignInModalOpen(false);
  };

  const handlerCheck = () => {
    settargeturl(`/raise-query/${userid}DTweb`);
    if (sess_id) {
      navigate(`/raise-query/${userid}DTweb`);
    } else {
      setSignInModalOpen(true);
    }
  };
  return (
    <>
      <div className="footer-top position-relative">
        <div className="setbg"></div>
        <div className="borderbgright"></div>
        <div className="pt-exebar"></div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-9 col-sm-12 col-md-9">
              <div className="row footerlinks">
                <div className="col-6 col-sm-3 col-md-3">
                  <div className="widget footer_widget ftlogobg">
                    {/* <img src={`${window.IMG_BASE_URL}/login_logo.png`} alt="" /> */}
                    <img src="/logo.png" />
                  </div>

                  <div className="pt-btn-join">
                    <p>Follow us on:-</p>
                  </div>
                  <div className="pt-social-link socialIcon ftsocial">
                    <ul className="list-inline m-a0 fab-social">
                      <li>
                        <Link
                          to={"https://www.facebook.com/damsdelhiho/"}
                          className="btn-link"
                          target="_blank"
                        >
                          <img
                            src={`${window.IMG_BASE_URL}/Fb.png`}
                            alt="facebok"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"https://www.instagram.com/dams_delhi/"}
                          className="btn-link"
                          target="_blank"
                        >
                          <img
                            src={`${window.IMG_BASE_URL}/Insta.png`}
                            alt="Instagram"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"https://www.linkedin.com/school/dams-emedicoz/"}
                          className="btn-link"
                          target="_blank"
                        >
                          <img
                            src={`${window.IMG_BASE_URL}/Lin.png`}
                            alt="Linkdin"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"https://twitter.com/damsdelhi"}
                          className="btn-link"
                          target="_blank"
                        >
                          <img
                            src={`${window.IMG_BASE_URL}/X.png`}
                            alt="Twitter"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"https://www.youtube.com/damsdelhi"}
                          className="btn-link"
                          target="_blank"
                        >
                          <img
                            src={`${window.IMG_BASE_URL}/youtube.png`}
                            alt="youtube"
                          />
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="appImgbg">
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      to={
                        "https://itunes.apple.com/us/app/emedicoz/id1263112084?mt=8"
                      }
                    >
                      <img
                        src={`${window.IMG_BASE_URL}/appstor.png`}
                        alt="app"
                      />
                    </Link>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      to={
                        "https://play.google.com/store/apps/details?id=com.emedicoz.app&amp;hl=en"
                      }
                    >
                      <img
                        src={`${window.IMG_BASE_URL}/playstor.png`}
                        alt="playstore"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-6 col-sm-3 col-md-3">
                  <div className="footer_widget">
                    <h5 className="footer-title">Quick Links</h5>
                    <ul className="footersublinks">
                      <li>
                        <Link to={"/career"}>Career</Link>
                      </li>
                      <li>
                        <Link to={"/help-and-support"}>Help &amp; Support</Link>
                      </li>
                      <li>
                        <Link to={"/find_center"}>Find Centres</Link>
                      </li>
                      <li>
                        <Link to={"/franchise-opportunity"}>
                          Franchise Opportunity
                        </Link>
                      </li>
                      <li>
                        <Link to={"/csr"}>CSR</Link>
                      </li>
                      <li>
                        <Link to={"/dams-care"}>Dams Care</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-6 col-sm-3 col-md-3">
                  <div className="footer_widget">
                    <h5 className="footer-title">Policy</h5>
                    <ul className="footersublinks">
                      <li>
                        <Link to={"/sitemap"}>Sitemap</Link>
                      </li>
                      <li>
                        <Link to={"/privacy-policy"}>Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to={"/disclaimer"}>Disclaimer</Link>
                      </li>
                      <li>
                        <Link to={"/terms_conditions"}>
                          Terms &amp; Conditions
                        </Link>
                      </li>
                      <li>
                        <Link to={"/faq"}>FAQ</Link>
                      </li>
                      <li>
                        <Link to={"/fair-usage-policy"}>Fair Usage Policy</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-6 col-sm-3 col-md-3">
                  <div className="footer_widget">
                    <h5 className="footer-title">Other Links</h5>
                    <ul className="footersublinks">
                      <li>
                        <Link to={"/our-team"}>Our Team</Link>
                      </li>
                      <li>
                        <Link to={"/about"}>About us</Link>
                      </li>
                      <li>
                        <Link to={"/contact"}>Contact us</Link>
                      </li>
                      <li>
                        <Link to={"/Articles"}>News &amp; Articles</Link>
                      </li>
                      <li>
                        <Link to={"/Studentinfo"}>Student Info</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3 col-sm-12 col-md-3">
              <div className="footer_widget" style={{ position: "relative" }}>
                <h5 className="footer-title">Contact</h5>
                <ul className="flex-bg">
                  <li>
                    <i className="fa fa-map-marker"></i>{" "}
                  </li>
                  <li>
                    <p>
                      Plot No. 3, Green Park Extension, Green Park, Delhi,
                      110016 (India)
                    </p>
                  </li>
                </ul>
                <ul className="flex-bg">
                  <li>
                    <img
                      src={`${window.IMG_BASE_URL}/Whatsicon.png`}
                      alt="whatsApp"
                    />
                  </li>
                  <li>
                    <p>+91 9899664533</p>
                  </li>
                </ul>
                <ul className="flex-bg">
                  <li>
                    <i className="fa fa-phone"></i>
                  </li>
                  <li>
                    <p>011 4009 4009</p>
                  </li>
                </ul>
                <ul className="flex-bg">
                  <li>
                    <i className="fa fa-envelope"></i>
                  </li>
                  <li>
                    <p>info@damsdelhi.com</p>
                  </li>
                </ul>
                {isreqdata?.name && (
                  <div className="Techtbtn">
                    <button onClick={handlerCheck} className="techdata">
                      Technical Support
                    </button>
                    <Link to={`/raise-query/${userid}DTweb`}></Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div
            className="rectangle-1218-kNzq5P"
            data-id="f5f65866-d24e-4fe6-85ad-cb97cbe3da7a"
          ></div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 text-center ">
              <div className="copyright">
                <b style={{ color: "#111" }}> Copyright@2025,</b>{" "}
                <span style={{ color: "#2e90cf" }}>
                  Delhi Academy of Medical Sciences Pvt. Ltd. All Rights
                  Reserved
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="whatsapp-icon-container">
          <ul>
            <li>
              <Link
                to={"https://wa.me/9899664533"}
                className="whatsapp-icon-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`${window.IMG_BASE_URL}/icon-whats.png`}
                  alt="whatsApp"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="AppIcon">
        <Link
          to={
            "https://d2enu63wt1sf3u.cloudfront.net/androidapp/eMedicoz_release_4.3.60.apk"
          }
          className=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Download App
        </Link>
      </div> */}
      {isSignInModalOpen && (
        <Login
          handlerClose={handlerClose}
          setIsAuthenticated={setIsAuthenticated}
          handleSignInSuccess={handleSignInSuccess}
          setSignInModalOpen={setSignInModalOpen}
          targeturl={targeturl}
        />
      )}
    </>
  );
}
export default Footer;
