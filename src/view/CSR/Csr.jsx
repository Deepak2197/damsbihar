import React, { useEffect } from "react";
import "../../assets/css/student-info/style.css";
import "../../assets/css/student-info/responsive.css";
import { Link } from "react-router-dom";

const Csr = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="Csr">
      <div className="page-content bg-white position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>CSR</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="banner-part">
        <div className="container">
          <div className="csrBanner">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div className="textdefine">
                  <h4>Making a positive social impact</h4>
                  <p className="m-0">
                    We have always prioritized providing individuals and
                    communities access to opportunities, to help individuals
                    meet their basic needs, gain skills, or find employment in a
                    digital economy.
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 csrBg">
                {/* <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/student-info/csr-banner.jpg"/> */}
                <img
                  src={`${window.IMG_BASE_URL}/csr-banner.png`}
                  loading="lazy"
                  alt="icon image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="outer-heading-part">
        <div className="container">
          <div className="left-heading">
            <h1>CSR Policy</h1>
          </div>
        </div>
      </div>
      <section className="contact-us-page-data">
        <div className="container">
          <div className="center-wrapper">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <div className="conten-csr">
                  <h3>A Global Commitment to CSR</h3>
                  <p>
                    Corporate Social Responsibility is a management concept
                    whereby companies integrate social and environmental
                    concerns in their business operations and interactions with
                    their stakeholders. CSR is generally understood as being the
                    way through which a company achieves a balance of economic,
                    environmental and social imperatives (“Triple-Bottom-Line-
                    Approach”), while at the same time addressing the
                    expectations of shareholders and stakeholders. In this sense
                    it is important to draw a distinction between CSR, which can
                    be a strategic business management concept, and charity,
                    sponsorships or philanthropy.
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div className="st">
                  <img
                    className="csr-policy"
                    src={`${window.IMG_BASE_URL}/csr.jpg`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-us-page-data">
        <div className="container">
          <div className="center-wrapperNew">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-4">
                <div className="csr-policy">
                  <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/student-info/to_upload.jpg" />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-7 col-xl-8">
                <div className="conten-csr">
                  <h3>CSR</h3>
                  <p>
                    At DAMS, we are committed to powering an inclusive future
                    for all, and creating equitable access to opportunities for
                    people and communities around the world. Explore the global
                    CSR.
                  </p>

                  <span className="errorpage">
                    CORPORATE SOCIAL RESPONSIBILITY (“CSR”) POLICY FOR DELHI
                    ACADEMY OF MEDICAL SCIENCES PRIVATE LIMITED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="table-section">
        <div className="container">
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <th>Sr. No.</th>
                  <th>File Name</th>
                </tr>

                <tr>
                  <td>1.</td>
                  <td>
                    <Link
                      to={
                        "https://d2enu63wt1sf3u.cloudfront.net/web_assets/uploads/CSR_Policy.pdf"
                      }
                      target="_blank"
                      className="linknbg"
                    >
                      CSR Polices
                    </Link>
                  </td>
                </tr>

                <tr>
                  <td>2.</td>
                  <td>
                    <Link
                      to={
                        "https://d2enu63wt1sf3u.cloudfront.net/web_assets/CSR_Project.pdf"
                      }
                      target="_blank"
                      className="linknbg"
                    >
                      CSR Project
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* <div className="get-touch pb-5">
        <div className="container">
          <Link
            to={
              "https://api.whatsapp.com/send?phone=919899664533&text=Hello,%20I%20have%20a%20question"
            }
            target="_blank"
          >
            <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/student-info/whats-app.png" />
          </Link>
        </div>
      </div> */}
    </div>
  );
};
export default Csr;
