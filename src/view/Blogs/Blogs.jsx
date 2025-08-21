import React from "react";
const Blogs = () => {
  return (
    <div className="Blogs">
      <header className="">
        <div className="page-content bg-white">
          <div
            className="aboutbg"
            style={{
              backgroundImage: `url(${"../assets/newjs/img/footerbg.png"})`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <ul
                    className="list-inline"
                    style={{ fontsize: "15px", marginbottom: "5px" }}
                  >
                    <li>
                      <a href={"/"}>Home</a>
                    </li>
                    <li>
                      <a href={""}> &gt; </a>
                    </li>
                    <li>
                      <a href={""}>Blogs</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <link
            href={
              "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.7/css/select2.min.css"
            }
            rel="stylesheet"
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.7/js/select2.min.js"></script>
          <div className="content-block">
            <div className="section-area section-sp1">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-xl-8 col-md-7">
                    <div id="masonry" className="ttr-blog-grid-3 row">
                      <div className="loaderajax">
                        <img
                          src="../assets/images/Double Ring-1s-200px.svg"
                          loading="lazy" alt="loader"
                        />
                      </div>
                      <div className="post action-card col-xl-6 col-lg-6 col-md-12 col-xs-12 m-b40">
                        <div className="recent-news">
                          <div className="info-bx">
                            <ul className="media-post">
                              <li>
                                <a href={""}>
                                  <em className="fa fa-calendar"></em>2019-08-23
                                </a>
                              </li>
                            </ul>
                            <h5 className="post-title">
                              <a href={"/blogs-detail"}>MCI SCREENING</a>
                            </h5>
                            <div className="post-extra">
                              <a href={"/blogs-detail"} className="btn-link">
                                READ MORE
                              </a>
                              <a
                                onclick="myFunction(18)"
                                style={{ cursor: "pointer" }}
                                className="comments-bx"
                              >
                                <em className="fa fa-comments-o"></em>6 Comment
                              </a>
                            </div>

                            <div id="myDIV18" style={{ display: "none" }}>
                              <div className="post-extra">
                                <h5>
                                  <strong>Comments:-</strong>
                                </h5>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>1.</strong>
                                <p style={{ marginbottom: "0px" }}>hello</p>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>2.</strong>
                                <p style={{ marginbottom: "0px" }}>hh</p>
                              </div>
                              <a
                                className="btn-link"
                                onclick="mySeemore(18)"
                                style={{ cursor: "pointer" }}
                              >
                                SEE MORE
                              </a>
                            </div>

                            <div id="seemore18" style={{ display: "none" }}>
                              <div className="post-extra">
                                <h5>
                                  <strong>Comments:-</strong>
                                </h5>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>1.</strong>
                                <p style={{ marginbottom: "0px" }}>hello</p>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>2.</strong>
                                <p style={{ marginbottom: "0px" }}>hh</p>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>3.</strong>
                                <p style={{ marginbottom: "0px" }}>test</p>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>4.</strong>
                                <p style={{ marginbottom: "0px" }}>hi</p>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>5.</strong>
                                <p style={{ marginbottom: "0px" }}>hiiiiiiii</p>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>6.</strong>
                                <p style={{ marginbottom: "0px" }}>test</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="post action-card col-xl-6 col-lg-6 col-md-12 col-xs-12 m-b40">
                        <div className="recent-news">
                          <div className="info-bx">
                            <ul className="media-post">
                              <li>
                                <a href="#">
                                  <em className="fa fa-calendar"></em>2019-08-23
                                </a>
                              </li>
                            </ul>
                            <h5 className="post-title">
                              <a href={"/blogs-detail"}>MD/MS ENTRANCE</a>
                            </h5>
                            <div className="post-extra">
                              <a href={"/blogs-detail"} className="btn-link">
                                READ MORE
                              </a>
                              <a
                                onclick="myFunction(22)"
                                style={{ cursor: "pointer" }}
                                className="comments-bx"
                              >
                                <em className="fa fa-comments-o"></em>6 Comment
                              </a>
                            </div>
                            <div id="myDIV22" style={{ display: "none" }}>
                              <div className="post-extra">
                                <h5>
                                  <strong>Comments:-</strong>
                                </h5>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>1.</strong>
                                <p style={{ marginbottom: "0px" }}>
                                  hello
                                </p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>2.</strong>
                                <p style={{ marginbottom: "0px" }}>hh</p>{" "}
                              </div>
                              <a
                                className="btn-link"
                                onclick="mySeemore(22)"
                                style={{ cursor: "pointer" }}
                              >
                                SEE MORE
                              </a>
                            </div>

                            <div id="seemore22" style={{ display: "none" }}>
                              <div className="post-extra">
                                <h5>
                                  <strong>Comments:-</strong>
                                </h5>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>1.</strong>
                                <p style={{ marginbottom: "0px" }}>
                                  hello
                                </p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>2.</strong>
                                <p style={{ marginbottom: "0px" }}>hh</p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>3.</strong>
                                <p style={{ marginbottom: "0px" }}>test</p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>4.</strong>
                                <p style={{ marginbottom: "0px" }}>hi</p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>5.</strong>
                                <p style={{ marginbottom: "0px" }}>
                                  hiiiiiiii
                                </p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>6.</strong>
                                <p style={{ marginbottom: "0px" }}>test</p>{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="post action-card col-xl-6 col-lg-6 col-md-12 col-xs-12 m-b40">
                        <div className="recent-news">
                          <div className="info-bx">
                            <ul className="media-post">
                              <li>
                                <a href="#">
                                  <em className="fa fa-calendar"></em>2019-08-24
                                </a>
                              </li>
                            </ul>
                            <h5 className="post-title">
                              <a href={"/blogs-detail"}>MDS QUEST/NBDE</a>
                            </h5>
                            <div className="post-extra">
                              <a href={"/blogs-detail"} className="btn-link">
                                READ MORE
                              </a>
                              <a
                                onclick="myFunction(23)"
                                style={{ cursor: "pointer" }}
                                className="comments-bx"
                              >
                                <em className="fa fa-comments-o"></em>6 Comment
                              </a>
                            </div>
                            <div id="myDIV23" style={{ display: "none" }}>
                              <div className="post-extra">
                                <h5>
                                  <strong>Comments:-</strong>
                                </h5>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>1.</strong>
                                <p style={{ marginbottom: "0px" }}>
                                  hello
                                </p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>2.</strong>
                                <p style={{ marginbottom: "0px" }}>hh</p>{" "}
                              </div>
                              <a
                                className="btn-link"
                                onclick="mySeemore(23)"
                                style={{ cursor: "pointer" }}
                              >
                                SEE MORE
                              </a>
                            </div>

                            <div id="seemore23" style={{ display: "none" }}>
                              <div className="post-extra">
                                <h5>
                                  <strong>Comments:-</strong>
                                </h5>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>1.</strong>
                                <p style={{ marginbottom: "0px" }}>
                                  hello
                                </p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>2.</strong>
                                <p style={{ marginbottom: "0px" }}>hh</p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>3.</strong>
                                <p style={{ marginbottom: "0px" }}>test</p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>4.</strong>
                                <p style={{ marginbottom: "0px" }}>hi</p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>5.</strong>
                                <p style={{ marginbottom: "0px" }}>
                                  hiiiiiiii
                                </p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>6.</strong>
                                <p style={{ marginbottom: "0px" }}>test</p>{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="post action-card col-xl-6 col-lg-6 col-md-12 col-xs-12 m-b40">
                        <div className="recent-news">
                          <div className="info-bx">
                            <ul className="media-post">
                              <li>
                                <a href={""}>
                                  <em className="fa fa-calendar"></em>2019-08-24
                                </a>
                              </li>
                            </ul>
                            <h5 className="post-title">
                              <a href={"/blogs-detail"}>USMLE EDGE</a>
                            </h5>
                            <div className="post-extra">
                              <a href={"/blogs-detail"} className="btn-link">
                                READ MORE
                              </a>
                              <a
                                onclick="myFunction(24)"
                                style={{ cursor: "pointer" }}
                                className="comments-bx"
                              >
                                <em className="fa fa-comments-o"></em>6 Comment
                              </a>
                            </div>
                            <div id="myDIV24" style={{ display: "none" }}>
                              <div className="post-extra">
                                <h5>
                                  <strong>Comments:-</strong>
                                </h5>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>1.</strong>
                                <p style={{ marginbottom: "0px" }}>
                                  hello
                                </p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>2.</strong>
                                <p style={{ marginbottom: "0px" }}>hh</p>{" "}
                              </div>
                              <a
                                className="btn-link"
                                onclick="mySeemore(24)"
                                style={{ cursor: "pointer" }}
                              >
                                SEE MORE
                              </a>
                            </div>

                            <div id="seemore24" style={{ display: "none" }}>
                              <div className="post-extra">
                                <h5>
                                  <strong>Comments:-</strong>
                                </h5>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>1.</strong>
                                <p style={{ marginbottom: "0px" }}>
                                  hello
                                </p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>2.</strong>
                                <p style={{ marginbottom: "0px" }}>hh</p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>3.</strong>
                                <p style={{ marginbottom: "0px" }}>test</p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>4.</strong>
                                <p style={{ marginbottom: "0px" }}>hi</p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>5.</strong>
                                <p style={{ marginbottom: "0px" }}>
                                  hiiiiiiii
                                </p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>6.</strong>
                                <p style={{ marginbottom: "0px" }}>test</p>{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="post action-card col-xl-6 col-lg-6 col-md-12 col-xs-12 m-b40">
                        <div className="recent-news">
                          <div className="info-bx">
                            <ul className="media-post">
                              <li>
                                <a href="#">
                                  <em className="fa fa-calendar"></em>2019-08-24
                                </a>
                              </li>
                            </ul>
                            <h5 className="post-title">
                              <a href={"/blogs-detail"}>NEET SS</a>
                            </h5>
                            <div className="post-extra">
                              <a href={"/blogs-detail"} className="btn-link">
                                READ MORE
                              </a>
                              <a
                                onclick="myFunction(25)"
                                style={{ cursor: "pointer" }}
                                className="comments-bx"
                              >
                                <em className="fa fa-comments-o"></em>6 Comment
                              </a>
                            </div>
                            <div id="myDIV25" style={{ display: "none" }}>
                              <div className="post-extra">
                                <h5>
                                  <strong>Comments:-</strong>
                                </h5>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>1.</strong>
                                <p style={{ marginbottom: "0px" }}>
                                  hello
                                </p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>2.</strong>
                                <p style={{ marginbottom: "0px" }}>hh</p>{" "}
                              </div>
                              <a
                                className="btn-link"
                                onclick="mySeemore(25)"
                                style={{ cursor: "pointer" }}
                              >
                                SEE MORE
                              </a>
                            </div>

                            <div id="seemore25" style={{ display: "none" }}>
                              <div className="post-extra">
                                <h5>
                                  <strong>Comments:-</strong>
                                </h5>
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>1.</strong>
                                <p style={{ marginbottom: "0px" }}>
                                  hello
                                </p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>2.</strong>
                                <p style={{ marginbottom: "0px" }}>hh</p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>3.</strong>
                                <p style={{ marginbottom: "0px" }}>test</p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>4.</strong>
                                <p style={{ marginbottom: "0px" }}>hi</p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>5.</strong>
                                <p style={{ marginbottom: "0px" }}>
                                  hiiiiiiii
                                </p>{" "}
                              </div>
                              <div
                                className="post-extra"
                                style={{
                                  marginleft: " 8px",
                                  bordertop: "0px solid #eee",
                                  paddingtop: " 0px",
                                }}
                              >
                                <strong style={{ margintop: "2px" }}>6.</strong>
                                <p style={{ marginbottom: "0px" }}>test</p>{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xl-4 col-md-5 sticky-top">
                    <aside className="side-bar sticky-top">
                      <div className="widget">
                        <h6 className="widget-title">Search</h6>
                        <div className="search-bx style-1">
                          <div className="input-group">
                            <input
                              name="keywords_value"
                              className="keywords_value form-control"
                              placeholder="Enter your keywords..."
                              type="text"
                            />
                            <span className="input-group-btn">
                              <button className="click_search fa fa-search text-primary"></button>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="widget widget_tag_cloud">
                        <h6 className="widget-title">Category</h6>
                        <div className="tagcloud">
                          <a
                            className="blog_category_name"
                            name-tab="0"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            All
                          </a>
                          <a
                            className="blog_category_name"
                            name-tab="10"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            MDMS
                          </a>
                          <a
                            className="blog_category_name"
                            name-tab="17"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            MCI
                          </a>
                          <a
                            className="blog_category_name"
                            name-tab="18"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            USMLE EDGE
                          </a>
                          <a
                            className="blog_category_name"
                            name-tab="19"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            NEET SS
                          </a>
                          <a
                            className="blog_category_name"
                            name-tab="20"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            MDS QUEST/NBDE
                          </a>
                          <a
                            className="blog_category_name"
                            name-tab="21"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            Radiology
                          </a>
                        </div>
                      </div>
                      <div className="widget recent-posts-entry">
                        <h6 className="widget-title">Recent Posts</h6>
                        <div className="widget-post-bx">
                          <div className="widget-post clearfix">
                            <div className="ttr-post-media">
                              {" "}
                              <img
                                src=""
                                width="200"
                                height="143"
                                loading="lazy" alt="icon image"
                              />{" "}
                            </div>
                            <div className="ttr-post-info">
                              <div className="ttr-post-header">
                                <h6 className="post-title">
                                  <a href={"/blogs-detail"}></a>
                                </h6>
                              </div>
                              <ul className="media-post">
                                <li>
                                  <a href="#">
                                    <em className="fa fa-calendar"></em>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="widget widget_tag_cloud">
                        <h6 className="widget-title">Tags</h6>
                        <div className="tagcloud">
                          <a
                            className="tag-click-value"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            name-tab="0"
                          >
                            All
                          </a>
                          <a
                            className="tag-click-value"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            name-tab="1"
                          >
                            medical
                          </a>
                          <a
                            className="tag-click-value"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            name-tab="2"
                          >
                            dental
                          </a>
                          <a
                            className="tag-click-value"
                            name-tab="6"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            Radiology{" "}
                          </a>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Blogs;
