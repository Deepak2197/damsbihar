import React from "react";
import "../../assets/new_design/css/footer.css";
import "../../assets/css/shortcodes/shortcodes.css";
import "../../assets/livequiz/css/style.css";
import "../../assets/livequiz/css/responsive.css"
import { Link } from "react-router-dom";

const LiveQuiz = () => {
  setTimeout(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, 0);

  return (
    <div className="LiveQuiz">
        <div className="page-content position-relative">
          <div className="breadcrumb-row">
            <div className="container">
                <ul className="list-inline">
                    <li><a href={'/'}>Home</a></li>
                    <li style={{ color: "#434343" }}>Live Quiz Home</li>
                </ul>
            </div>
          </div>
        </div>
      
        <div className="container">
          <section
            className="live-quiz-banner"
            style={{
              backgroundImage:
                "url(https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/livequiz/images/live-quiz-banner.png)",
            }}
          >
            <div className="row">
              <div className="col-4 col-sm-4 col-md-4 col-lg-4"></div>
              <div className="col-8 col-sm-8 col-md-8 col-lg-8">
                <div className="banner-tt">
                  <h1>Play this challenge and win prizes</h1>
                  <a href="#" id="demo" className="text-center">
                    EXPIRED
                  </a>
                  <p className="text-center">Challenge starting in</p>
                </div>
              </div>
            </div>
          </section>
          <section className="live-quiz-own">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
                <div className="arround-border lqhomecrd">
                  <h3>Create your Own</h3>
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-12">
                      <div className="two-group">
                        <img
                          src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/livequiz/images/live-quiz-people.png"
                          loading="lazy" alt="icon image"
                        />
                        <p>
                          <span style={{ color: "#61a2f7" }}>3471</span>
                          People<span className="d-block">Already Hosted</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link to={"/hostChallenge"}>
                    Host A Challenge
                  </Link>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
                <div className="arround-border lqhomecrd">
                  <h3>Live Quiz</h3>
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-12">
                      <div className="two-group">
                        <img
                          src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/livequiz/images/live-quiz-people.png"
                          loading="lazy" alt="icon image"
                        />
                        <p>
                          <span style={{ color: "#61a2f7" }}>1</span>
                          Upcoming
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link to={"/hostChallenge"}>
                    Play Challenge
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
                <div className="arround-border lqhomelist">
                  <h3>You Are Challenged</h3>
                  <div
                    className="row mb-5-col-md mb-5-col-lg mb-5-col"
                    style={{ margin: "12px 0px" }}
                  >
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                      <div className="challenge">
                        <p>You Have</p>
                      </div>
                    </div>
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                      <div className="challenge">
                        <h3>0</h3>
                      </div>
                    </div>
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                      <div className="challenge">
                        <p>Challenges</p>
                      </div>
                    </div>
                  </div>
                  <Link to={"/"}>
                    Accept Challenge
                  </Link>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
                <div className="arround-border lqhomelist">
                  <h3></h3>
                  <div
                    className="row mb-5-col-md mb-5-col-lg mb-5-col"
                    style={{ margin: "12px 0px" }}
                  >
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                      <div className="boxborder">
                        <h3>0</h3>
                        <p>Attempted</p>
                      </div>
                    </div>
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                      <div className="boxborder">
                        <h3>0</h3>
                        <p>Won</p>
                      </div>
                    </div>
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                      <div className="boxborder">
                        <h3>0</h3>
                        <p>Hosted</p>
                      </div>
                    </div>
                  </div>
                  <Link to={"/"}>
                    My Attempts
                  </Link>
                
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
                <div className="arround-border lqhomecrd">
                  <div className="credit-scrach">
                    <div className="mycredit">
                      <img
                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/livequiz/images/live-quiz-hand.png"
                        loading="lazy" alt="icon image"
                      />
                      <p>My Credits</p>
                      <h3>0</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
                <div className="arround-border lqhomecrd">
                  <div className="credit-scrach">
                    <div className="mycredit">
                      <img
                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/livequiz/images/live-scratch.png"
                        loading="lazy" alt="icon image"
                      />
                      <p>My Scratch Card</p>
                      <h3>0</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
     
    </div>
  );
};
export default LiveQuiz;
