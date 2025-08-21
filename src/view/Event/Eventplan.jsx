import React from "react";
import "../../assets/css/event/style.css";
import "../../assets/new_design/css/footer.css";
const Eventplan = () => {
  return (
    <div className="Eventplan">
      <div className="page-content position-relative">
          <div className="breadcrumb-row">
            <div className="container">
              <ul className="list-inline">
                <li><a href={'/'}>Home</a></li>
                <li>Event plan</li>
              </ul>
            </div>
          </div>
        </div>
      <section className="subscription-data">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="slider">
                <img
                  src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/face-to-face/subscription-img.svg"
                  loading="lazy" alt="icon image"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="show-center">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="dams-center active" data-id="40">
                      <div className="row">
                        <input
                          type="hidden"
                          className="subcenter_id"
                          data-id=""
                        />
                        <input
                          type="hidden"
                          className="allowcourse"
                          data-id="1"
                        />
                        <input
                          type="hidden"
                          className="course_id"
                          data-id="1256"
                        />
                        <input
                          type="hidden"
                          className="availability"
                          data-id="1"
                        />
                        <div className="col-1 col-sm-2 col-md-1 col-lg-1 col-xl-1 map">
                          <div className="round"></div>
                          <div className="active-img">
                            <span>
                              <img
                                src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/face-to-face/check-circle.svg"
                                loading="lazy" alt="icon image"
                              />
                            </span>
                          </div>
                        </div>
                        <div className="col-4 col-sm-2 col-md-4 col-lg-3 col-xl-3">
                          <div className="month-text">
                            <h5>10 Days</h5>
                          </div>
                        </div>
                        <div className="col-7 col-sm-7 col-md-7 col-lg-8 col-xl-8 dams-text">
                          <p>
                            {" "}
                            <strong> 100</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  type="hidden"
                  value=""
                  name="is_reg_amount_show"
                  id="is_reg_amount_show"
                />
                <input
                  type="hidden"
                  value=""
                  name="course_registration_amount"
                  id="course_registration_amount"
                />
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="continuebtn">
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#my-date"
                        onclick="append()"
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="my-date" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered"
              style="max-width: 90%;"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <section className="select-datebg">
                    <hidden
                      type="hidden"
                      name="start_date_set"
                      id="start_date_set"
                    >
                      <div className="container">
                        <div className="row">
                          <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mobile-pd">
                            <div className="select-imgbg">
                              <img
                                src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/face-to-face/selectd-img.svg"
                                loading="lazy" alt="icon image"
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mobile-pd">
                            <h3 className="m-0 text-left">
                              Choose your course start date
                            </h3>
                            <div className="row">
                              <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 mobile-pd">
                                <a href="#">
                                  <div className="date-group active position-relative">
                                    <h2>Today</h2>
                                    <em className="fa fa-check"></em>
                                  </div>
                                </a>
                              </div>
                              <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 mobile-pd">
                                <div className="or">
                                  <h2>OR</h2>
                                </div>
                              </div>
                              <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 mobile-pd">
                                <a href="#">
                                  <div
                                    className="date-group position-relative fechadate"
                                    id="datepicker"
                                  >
                                    <div className="datepicker date input-group">
                                      <input
                                        type="text"
                                        placeholder="Select Date"
                                        className="form-control jey"
                                        id="fecha1"
                                        value=""
                                        data-date-format="dd-mm-yyyy"
                                      />
                                      <div className="input-group-append"></div>
                                    </div>
                                    <em className="fa fa-check"></em>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="col-12 col-sm-12 col-ms-12"
                                id="appendcources"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </hidden>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Eventplan;
