import React from "react";
import "../../assets/css/educator/edu-style.css"

const Educator =()=>{
    setTimeout(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, 0);
  return (
    <div className="Educator">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>Educator </li>
            </ul>
          </div>
        </div>
      </div>
      <section className="educator-section mt-3 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 pl-md-0">
              <img
                src="https://damsdelhi.com/assets/css/educator/images/welcome-img.png"
                loading="lazy"
                alt="damsdelhi"
                className="img-fluid banner-img"
              />
            </div>
            <div className="col-md-6 pt-3">
              <div className="educator-right-panel">
                <div className="text-center">
                  <a href="https://damsdelhi.com/">
                    <img
                      src="https://damsdelhi.com/assets/images/login_logo.webp"
                      loading="lazy"
                      alt="icon image"
                    />
                  </a>
                  <p className="mt-3">
                    Dams developed by Delhi Academy of Medical Sciences (DAMS)
                    which is a well-established name in the field of PG Medical
                    Entrance Education since 1999. Today under the leadership of
                    Dr. Sumer Sethi, Radiologist and pervious topper in AIPG/
                    AIIMS it's recognized for its impeccable foresight, enviable
                    expertise, and innate acumen.
                  </p>
                  <a
                    href="https://damsdelhi.com/educator/login/"
                    className="edu-lets-strt"
                  >
                    let's start <i className="fa fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Educator