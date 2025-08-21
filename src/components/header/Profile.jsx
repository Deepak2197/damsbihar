import React from "react";
import ReactDOM from 'react-dom';
function Profile(){
  return (
    <div id="mySidenav" className="sidenav w-340" style={{ width: "400px" }}>
      <a
        href="#"
        className="closebtn megamnu"
        onclick={(e) => {
          e.preventDefault();
          closeNav();
        }}
      >
        ×
      </a>
      <div className="new-mega-menu" style={{ borderBottom: "none" }}>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4 col-3 rp1">
            <div className="new-user-profile">
              <img
                src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/Affiliate-Web/account_circle_black_24dp.svg"
                loading="lazy"
                alt="My Prolfile"
                title="My Prolfile"
              />
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-8 col-9 lp1">
            <div className="new-profile-name">
              <h1>Dherandra Bisht</h1>
              <h2>dherandrabisht@damsdelhi.com</h2>
              <h3>9990958633</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="profile_complete position-relative">
        <div className="row">
          <div className="col-3 col-lg-3 col-xl-3">
            <div className="circlechart" data-percentage="90">
              <svg
                className="circle-chart"
                viewBox="0 0 33.83098862 33.83098862"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="circle-chart__background"
                  cx="16.9"
                  cy="16.9"
                  r="15.9"
                ></circle>
                <circle
                  className="circle-chart__circle success-stroke"
                  stroke-dasharray="87,100"
                  cx="16.9"
                  cy="16.9"
                  r="15.9"
                ></circle>
                <g className="circle-chart__info">
                  <text className="circle-chart__percent" x="17.9" y="15.5">
                    87%
                  </text>
                </g>
              </svg>
            </div>
          </div>
          <div className="col-5 col-lg-5 col-xl-5">
            <div className="textbg">
              <h3 className="m-0">
                Complete your profile &amp; <span className="d-block"></span>
                earn rewards
              </h3>
            </div>
          </div>
          <button type="button" className="btn">
            <a
              href="https://damsdelhi.com/profiles/532127"
              style={{ color: "#4dc247" }}
            >
              Complete Now{" "}
            </a>
            <a
              href="#"
              className="closebtn megamnu"
              onclick={(e) => {
                e.preventDefault();
                closeNavs();
              }}
              style={{
                backgroundColor: "#4dc247",
                right: "10px",
                top: "36%",
                position: "absolute",
              }}
            >
              ×
            </a>
          </button>
        </div>
      </div>
      <div className="college-detail" id="divMsg" style={{ display: "none" }}>
        <h2>Find Your College Details</h2>
        <form method="post">
          <div className="form-group">
            <em className="fa fa-university"></em>{" "}
            <label for="">College Name</label>
            <select className="form-control" id="college"></select>
          </div>
          <div className="form-group">
            <em className="fa fa-globe"></em>
            <label for="">Degree</label>
            <select className="form-control" id="degree">
              <option>Select Degree</option>
              <option data-degree_program="Others">Others</option>
              <option data-degree_program="AIIMS PG ">AIIMS PG </option>
              <option data-degree_program="PGI Chandigarh">
                PGI Chandigarh
              </option>
              <option data-degree_program="JIMPER PG">JIMPER PG</option>
              <option data-degree_program="NIMHANS">NIMHANS</option>
              <option data-degree_program="NEET PG">NEET PG</option>
              <option data-degree_program="DNB PD">DNB PD</option>
              <option data-degree_program="CET FNB">CET FNB</option>
              <option data-degree_program="Fellowship outside India">
                Fellowship outside India
              </option>
              <option data-degree_program="PLAB">PLAB</option>
              <option data-degree_program="MRCP">MRCP</option>
              <option data-degree_program="MRCS">MRCS</option>
              <option data-degree_program="EUROPEAN DIPLOMA">
                EUROPEAN DIPLOMA
              </option>
              <option data-degree_program="IELTS">IELTS</option>
              <option data-degree_program="Step 1">Step 1</option>
              <option data-degree_program="CSIR">CSIR</option>
              <option data-degree_program="Step 1 CS">Step 1 CS</option>
              <option data-degree_program="TOEFL">TOEFL</option>
              <option data-degree_program="CANADA">CANADA</option>
              <option data-degree_program="AMC CAT MCQ Examination">
                AMC CAT MCQ Examination
              </option>
              <option data-degree_program="AMC Clinical Examination">
                AMC Clinical Examination
              </option>
              <option data-degree_program="HAAD">HAAD</option>
              <option data-degree_program="Dubai">Dubai</option>
              <option data-degree_program="testCompleted">testCompleted</option>
              <option data-degree_program="Manager-Sr">Manager-Sr</option>
              <option data-degree_program="Minor Test">Minor Test</option>
              <option data-degree_program="DBT-BET">DBT-BET</option>
              <option data-degree_program="DBT-BET">DBT-BET</option>
              <option data-degree_program="CSIR NET/JRF">CSIR NET/JRF</option>
              <option data-degree_program="ICMR JRF">ICMR JRF</option>
              <option data-degree_program="GATE BT ">GATE BT </option>
              <option data-degree_program="IIT-JAM">IIT-JAM</option>
              <option data-degree_program="TIFR- JGEEBILS ">
                TIFR- JGEEBILS{" "}
              </option>
              <option data-degree_program="PhD Entrance of Universities/Institutes ">
                PhD Entrance of Universities/Institutes{" "}
              </option>
              <option data-degree_program="M.Sc. Entrance of DU/JNU/BHU/JAMIA/PU/AIIMS ">
                M.Sc. Entrance of DU/JNU/BHU/JAMIA/PU/AIIMS{" "}
              </option>
              <option data-degree_program="Mains">Mains</option>
            </select>
          </div>

          <div className="form-group">
            <em className="fa fa-calendar"></em>
            <label for="">Year</label>
            <select className="form-control" id="year">
              <option>Select Year</option>
              <option data-year="2010">2010</option>
              <option data-year="2011">2011</option>
              <option data-year="2012">2012</option>
              <option data-year="2013">2013</option>
              <option data-year="2014">2014</option>
              <option data-year="2015">2015</option>
              <option data-year="2016">2016</option>
              <option data-year="2017">2017</option>
              <option data-year="2018">2018</option>
              <option data-year="2019">2019</option>
              <option data-year="2020">2020</option>
              <option data-year="2021">2021</option>
              <option data-year="2022">2022</option>
              <option data-year="2023">2023</option>
              <option data-year="2024">2024</option>
              <option data-year="2025">2025</option>
              <option data-year="2026">2026</option>
              <option data-year="2027">2027</option>
              <option data-year="2028">2028</option>
              <option data-year="2029">2029</option>
              <option data-year="2030">2030</option>
              <option data-year="2031">2031</option>
              <option data-year="2032">2032</option>
              <option data-year="2033">2033</option>
              <option data-year="2034">2034</option>
              <option data-year="2035">2035</option>
              <option data-year="2036">2036</option>
              <option data-year="2037">2037</option>
              <option data-year="2038">2038</option>
              <option data-year="2039">2039</option>
            </select>
          </div>
          <button
            type="button"
            className="btn subbtn text-center"
            onclick="profile_update()"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="quick-links">
        <div className="row brdr-btm">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="quick-links-txt">
              <h2>Quick Links</h2>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="quick-links-box">
              <ul>
                <li>
                  <a href="https://damsdelhi.com/book">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/books.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">Books</span>
                  </a>
                </li>
                <li>
                  <a href="https://damsdelhi.com/publish-book">
                    <img
                      className="designimg"
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/publish-book/book-img.svg"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">Publish Book</span>
                  </a>
                </li>
                <li>
                  <a href="https://damsdelhi.com/ebooksales">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/publish-book/book_sale.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">My Book Sales</span>
                  </a>
                </li>

                <li>
                  <a href="https://damsdelhi.com/live-quiz-home">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/d-challenge.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">Live Quiz</span>
                  </a>
                </li>
                <li>
                  <a href="https://damsdelhi.com/podcast" className="upr">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/podcast.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">Oval Window Podcast</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="quick-links">
        <div className="row brdr-btm">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="quick-links-txt">
              <h2>My Profile</h2>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="quick-links-box">
              <ul>
                <li>
                  <a href="https://damsdelhi.com/Performance">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/my-course.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">My Course</span>
                  </a>
                </li>
                <li>
                  <a href="https://damsdelhi.com/my_scorecard">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/my-scorecard.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">My Score Card</span>
                  </a>
                </li>
                <li>
                  <a href="https://damsdelhi.com/my_notes">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/my-bookmarks.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">My Bookmark</span>
                  </a>
                </li>
                <li>
                  <a href="https://damsdelhi.com/my-address">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/my-address.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">My Address</span>
                  </a>
                </li>
                <li>
                  <a href="https://damsdelhi.com/my_order">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/my-order.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">My Orders</span>
                  </a>
                </li>
                <li>
                  <a href="https://damsdelhi.com/events">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/event.svg"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">Event</span>
                  </a>
                </li>
                <li>
                  <a href="https://damsdelhi.com/face-to-face">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/my-course.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">Face to Face</span>
                  </a>
                </li>
                <li>
                  <a href="https://damsdelhi.com/My_payment">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/my-course.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">My Payment</span>
                  </a>
                </li>
                <li>
                  <a href="https://damsdelhi.com/category-list">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/books.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">Store</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="errow-box">
        <div className="row brdr-btm">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="errow-div">
              <ul>
                <li>
                  <a href="#">
                    <img
                      src="https://damsdelhi.com/assets/images/mega-menu/app-setting.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">
                      App Setting{" "}
                      <i className="fa fa-chevron-circle-right fafa"></i>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="https://damsdelhi.com/assets/images/mega-menu/invite-earn.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">
                      Invite & Earn{" "}
                      <i className="fa fa-chevron-circle-right fafa"></i>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="https://damsdelhi.com/assets/images/mega-menu/join-affilate.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">
                      Join Afiliate{" "}
                      <i className="fa fa-chevron-circle-right fafa"></i>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="https://damsdelhi.com/edit_profile">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/edit.jpg"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">
                      Edit Profile{" "}
                      <i className="fa fa-chevron-circle-right fafa"></i>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="https://damsdelhi.com/join_referral_program">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/join-affilate.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">
                      Join Affiliate
                      <i className="fa fa-chevron-circle-right fafa"></i>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href="https://damsdelhi.com/help-and-support"
                    className="upr"
                  >
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/mega-menu/help-support.png"
                      loading="lazy"
                      alt="icon image"
                      title=""
                    />
                    <span className="d-block">
                      Help &amp; <br />
                      Support
                      <i className="fa fa-chevron-circle-right fafa-scnd"></i>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="app-set app-set-a">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="log-btn">
              <a href="https://damsdelhi.com/logout_">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile