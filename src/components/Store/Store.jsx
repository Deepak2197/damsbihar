import React, { useEffect } from "react";
import "../../assets/css/ecommerce/responsive.css";
import "../../assets/css/ecommerce/style.css";

function Store() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <section className="book-mod-page">
      <div className="container">
        <div className="search_br position-relative">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="input-group position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for Products"
                  id="search"
                />
                <button className="btn" type="button">
                  <img
                    src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/web_assets/images/ecommerce/search-icon.svg"
                    loading="lazy"
                    alt="icon image"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="tagoth_section">
          <div className="row">
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <h3 className="tt_x">Category</h3>
            </div>
          </div>
        </div>

        <div className="category_detail">
          <div id="bookAjaxList">
            <div className="row">
              <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
                <a href="https://damsdelhi.com/sub-category/3">
                  <div className="img_bg">
                    <img
                      src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/image/4942912concept book.jpg"
                      onerror="this.src='https://damsdelhi.com/assets/image_not_found.webp'"
                    />
                  </div>
                  <div className="link_bg">Books</div>
                </a>
              </div>
              <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
                <a href="https://damsdelhi.com/sub-category/4">
                  <div className="img_bg">
                    <img
                      src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/image/301913stationery image.jpg"
                      onerror="this.src='https://damsdelhi.com/assets/image_not_found.webp'"
                    />
                  </div>
                  <div className="link_bg">Stationery</div>
                </a>
              </div>
              <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
                <a href="https://damsdelhi.com/sub-category/5">
                  <div className="img_bg">
                    <img
                      src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/image/3538511IMG_3572 copy.jpg"
                      onerror="this.src='https://damsdelhi.com/assets/image_not_found.webp'"
                    />
                  </div>
                  <div className="link_bg">Hoodies</div>
                </a>
              </div>
            </div>
            <div className="slider-data">
              <div
                id="carousel-example-1z"
                className="carousel slide carousel-fade mb-5"
                data-ride="carousel"
              >
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item ">
                    <img
                      className="d-block w-100"
                      src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/banner_images/1317322Books%20Banner.png"
                      loading="lazy"
                      alt="icon image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="tagoth_section">
              <div className="row">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <h3 className="tt_x">Product List</h3>
                </div>
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right see">
                  <a href="https://damsdelhi.com/without-category">See all</a>
                </div>
              </div>
            </div>
            <div className="tabbing_data_oth">
              <div className="tab-content">
                <div className="tab-pane active">
                  <div
                    className="owl-carousel owl-theme mt-4 owl-loaded owl-drag"
                    id="quick-buy"
                  >
                    <div className="owl-stage-outer">
                      <div
                        className="owl-stage"
                        style={{
                          width: "1078px",
                          transform: "translate3d(0px, 0px, 0px)",
                          transition: "all 0s ease 0s",
                        }}
                      >
                        <div
                          className="owl-item active"
                          style={{ width: "259.5px", marginRight: "10px" }}
                        >
                          <div className="item position-relative">
                            <a href="https://damsdelhi.com/product-detail/1138">
                              <div className="back_bg">
                                <img
                                  src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/banner_images/932990Dairy%201.jpg"
                                  loading="lazy"
                                  alt="icon image"
                                  onerror="this.src='https://damsdelhi.com/assets/image_not_found.webp'"
                                />
                              </div>
                              <h3>
                                DAMS Standard Diary 2024|Daily Planner-Yellow{" "}
                                <span className="d-block"> </span>
                              </h3>
                            </a>
                            <p>By DAMS</p>
                            {/* <div className="edition">
                                                <a href="javascript:;">2023 Edition</a>
                                            </div> */}

                            <div className="price-img position-relative">
                              <h4 className="price">
                                <em className="fa fa-rupee"></em>240{" "}
                                <span>(40.00 % OFF)</span>
                              </h4>
                              <div className="row">
                                <div className="col-6 col-md-6 col-xl-6">
                                  <del>
                                    <em className="fa fa-rupee"></em>400{" "}
                                  </del>
                                </div>
                                <div className="col-6 col-md-6 col-xl-6 text-right">
                                  <div className="rating">
                                    <em className="fa fa-star"></em>5{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "259.5px", marginRight: "10px" }}
                        >
                          <div className="item position-relative">
                            <a href="https://damsdelhi.com/product-detail/779">
                              <div className="back_bg">
                                <img
                                  src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/banner_images/4867500dams-dermatology-2023-concept-book-front.jpg"
                                  loading="lazy"
                                  alt="icon image"
                                  onerror="this.src='https://damsdelhi.com/assets/image_not_found.webp'"
                                />
                              </div>
                              <h3>
                                Dermatology Concept Book for NEETPG NEXT FMGE{" "}
                                <span className="d-block"> </span>
                              </h3>
                            </a>
                            <p>By DAMS</p>
                            {/* <div className="edition">
                                                <a href="javascript:;">2022 Edition</a>
                                            </div> */}

                            <div className="price-img position-relative">
                              <h4 className="price">
                                <em className="fa fa-rupee"></em>450{" "}
                                <span>(36.00 % OFF)</span>
                              </h4>
                              <div className="row">
                                <div className="col-6 col-md-6 col-xl-6">
                                  <del>
                                    <em className="fa fa-rupee"></em>700{" "}
                                  </del>
                                </div>
                                <div className="col-6 col-md-6 col-xl-6 text-right">
                                  <div className="rating">
                                    <em className="fa fa-star"></em>5{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "259.5px", marginRight: "10px" }}
                        >
                          <div className="item position-relative">
                            <a href="https://damsdelhi.com/product-detail/1121">
                              <div className="back_bg">
                                <img
                                  src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/banner_images/5442017dams-dvt-workbook-for-neet-pg-inicet-next-front.jpg"
                                  loading="lazy"
                                  alt="icon image"
                                  onerror="this.src='https://damsdelhi.com/assets/image_not_found.webp'"
                                />
                              </div>
                              <h3>
                                DAMS DVT Workbook for NEET PG INICET NeXT{" "}
                                <span className="d-block"> </span>
                              </h3>
                            </a>
                            <p>By DAMS</p>
                            {/* <div className="edition">
                                                <a href="javascript:;">2023 Edition</a>
                                            </div> */}

                            <div className="price-img position-relative">
                              <h4 className="price">
                                <em className="fa fa-rupee"></em>2100{" "}
                                <span>(12.50 % OFF)</span>
                              </h4>
                              <div className="row">
                                <div className="col-6 col-md-6 col-xl-6">
                                  <del>
                                    <em className="fa fa-rupee"></em>2400{" "}
                                  </del>
                                </div>
                                <div className="col-6 col-md-6 col-xl-6 text-right">
                                  <div className="rating">
                                    <em className="fa fa-star"></em>5{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "259.5px", marginRight: "10px" }}
                        >
                          <div className="item position-relative">
                            <a href="https://damsdelhi.com/product-detail/1050">
                              <div className="back_bg">
                                <img
                                  src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/banner_images/1206873Image%202.jpg"
                                  loading="lazy"
                                  alt="icon image"
                                  onerror="this.src='https://damsdelhi.com/assets/image_not_found.webp'"
                                />
                              </div>
                              <h3>
                                Leap of Faith <span className="d-block"> </span>
                              </h3>
                            </a>
                            <p>By DAMS</p>
                            {/* <div className="edition">
                                                <a href="javascript:;">2023 Edition</a>
                                            </div> */}

                            <div className="price-img position-relative">
                              <h4 className="price">
                                <em className="fa fa-rupee"></em>200{" "}
                                <span>(0.00 % OFF)</span>
                              </h4>
                              <div className="row">
                                <div className="col-6 col-md-6 col-xl-6">
                                  <del>
                                    <em className="fa fa-rupee"></em>200{" "}
                                  </del>
                                </div>
                                <div className="col-6 col-md-6 col-xl-6 text-right">
                                  <div className="rating">
                                    <em className="fa fa-star"></em>5{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="owl-nav disabled">
                      <button
                        type="button"
                        role="presentation"
                        className="owl-prev disabled"
                      >
                        <span aria-label="Previous">‹</span>
                      </button>
                      <button
                        type="button"
                        role="presentation"
                        className="owl-next disabled"
                      >
                        <span aria-label="Next">›</span>
                      </button>
                    </div>
                    <div className="owl-dots disabled"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tagoth_section">
              <div className="row">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <h3 className="tt_x">Quick Buy</h3>
                </div>
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right see">
                  <a href="https://damsdelhi.com/quick-buy">See all</a>
                </div>
              </div>
            </div>
            <div className="tabbing_data_oth">
              <div className="tab-content">
                <div className="tab-pane active">
                  <div
                    className="owl-carousel owl-theme mt-4 owl-loaded owl-drag"
                    id="quick-buy"
                  >
                    <div className="owl-stage-outer">
                      <div
                        className="owl-stage"
                        style={{
                          width: "539px",
                          transform: "translate3d(0px, 0px, 0px)",
                          transition: "all 0s ease 0s",
                        }}
                      >
                        <div
                          className="owl-item active"
                          style={{ width: "259.5px", marginRight: "10px" }}
                        >
                          <div className="item position-relative">
                            <a href="https://damsdelhi.com/product-detail/781">
                              <div className="back_bg">
                                <img
                                  src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/banner_images/1518561dams-obstetrics-and-gynaecology-2023-concept-book-front.jpg"
                                  loading="lazy"
                                  alt="icon image"
                                  onerror="this.src='https://damsdelhi.com/assets/image_not_found.webp'"
                                />
                              </div>
                              <h3>
                                Obstetrics and Gynaecology Concept Book for
                                NEETPG FMGE NEXT{" "}
                                <span className="d-block"> </span>
                              </h3>
                            </a>
                            <p>By DAMS</p>
                            {/* <div className="edition">
                                                <a href="javascript:;">2022 Edition</a>
                                            </div> */}

                            <div className="price-img position-relative">
                              <h4 className="price">
                                <em className="fa fa-rupee"></em>950{" "}
                                <span>(37.00 % OFF)</span>
                              </h4>
                              <div className="row">
                                <div className="col-6 col-md-6 col-xl-6">
                                  <del>
                                    <em className="fa fa-rupee"></em>1500{" "}
                                  </del>
                                </div>
                                <div className="col-6 col-md-6 col-xl-6 text-right">
                                  <div className="rating">
                                    <em className="fa fa-star"></em>5{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "259.5px", marginRight: "10px" }}
                        >
                          <div className="item position-relative">
                            <a href="https://damsdelhi.com/product-detail/1121">
                              <div className="back_bg">
                                <img
                                  src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/banner_images/5442017dams-dvt-workbook-for-neet-pg-inicet-next-front.jpg"
                                  loading="lazy"
                                  alt="icon image"
                                  onerror="this.src='https://damsdelhi.com/assets/image_not_found.webp'"
                                />
                              </div>
                              <h3>
                                DAMS DVT Workbook for NEET PG INICET NeXT{" "}
                                <span className="d-block"> </span>
                              </h3>
                            </a>
                            <p>By DAMS</p>
                            {/* <div className="edition">
                                                <a href="javascript:;">2023 Edition</a>
                                            </div> */}

                            <div className="price-img position-relative">
                              <h4 className="price">
                                <em className="fa fa-rupee"></em>2100{" "}
                                <span>(12.50 % OFF)</span>
                              </h4>
                              <div className="row">
                                <div className="col-6 col-md-6 col-xl-6">
                                  <del>
                                    <em className="fa fa-rupee"></em>2400{" "}
                                  </del>
                                </div>
                                <div className="col-6 col-md-6 col-xl-6 text-right">
                                  <div className="rating">
                                    <em className="fa fa-star"></em>5{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="owl-nav disabled">
                      <button
                        type="button"
                        role="presentation"
                        className="owl-prev disabled"
                      >
                        <span aria-label="Previous">‹</span>
                      </button>
                      <button
                        type="button"
                        role="presentation"
                        className="owl-next disabled"
                      >
                        <span aria-label="Next">›</span>
                      </button>
                    </div>
                    <div className="owl-dots disabled"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tagoth_section best-selling">
              <div className="row">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <h3 className="tt_x">
                    <span>Best Selling</span>
                  </h3>
                </div>
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right see">
                  <a href="https://damsdelhi.com/best-seller">See All</a>
                </div>
              </div>
            </div>
            <div className="tabbing_data_oth">
              <div className="tab-content">
                <div className="tab-pane active">
                  <div
                    className="owl-carousel owl-theme mt-4 owl-loaded owl-drag"
                    id="best-selling"
                  >
                    <div className="owl-stage-outer">
                      <div
                        className="owl-stage"
                        style={{
                          width: "270px",
                          transform: "translate3d(0px, 0px, 0px)",
                          transition: "all 0s ease 0s",
                        }}
                      >
                        <div
                          className="owl-item active"
                          style={{ width: "259.5px", marginRight: "10px" }}
                        >
                          <div className="item position-relative">
                            <a href="https://damsdelhi.com/product-detail/943">
                              <div className="back_bg">
                                <img
                                  src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/banner_images/2560987dams%20dvt%20workbook-neetpg%20ka%20first%20aid-front.jpg"
                                  loading="lazy"
                                  alt="icon image"
                                  onerror="this.src='https://damsdelhi.com/assets/image_not_found.webp'"
                                />
                              </div>
                              <h3>
                                DAMS DVT Workbook-NEETPG Ka First AID{" "}
                                <span className="d-block"> </span>
                              </h3>
                            </a>
                            <p>By DAMS</p>
                            {/* <div className="edition">
                                                <a href="javascript:void(0);">2023 Edition</a>
                                            </div> */}

                            <div className="price-img position-relative">
                              <h4 className="price">
                                <em className="fa fa-rupee"></em>2400{" "}
                                <span>(25.00 % OFF)</span>
                              </h4>
                              <div className="row">
                                <div className="col-6 col-md-6 col-xl-6">
                                  <del>
                                    <em className="fa fa-rupee"></em>3200{" "}
                                  </del>
                                </div>
                                <div className="col-6 col-md-6 col-xl-6 text-right">
                                  <div className="rating">
                                    <em className="fa fa-star"></em>5{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="owl-nav disabled">
                      <button
                        type="button"
                        role="presentation"
                        className="owl-prev disabled"
                      >
                        <span aria-label="Previous">‹</span>
                      </button>
                      <button
                        type="button"
                        role="presentation"
                        className="owl-next disabled"
                      >
                        <span aria-label="Next">›</span>
                      </button>
                    </div>
                    <div className="owl-dots disabled"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Store;
