import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/css/performance/style.css";
import "../../assets/css/performance/responsive.css";
const MyCourseOneTab = ({
  categoryListShow = [],
  coursecatListShow,
  loading,
}) => {
  const navigate = useNavigate();

  // const [toggles, setToggles] = useState(
  //   Array(categoryListShow.length).fill(false)
  // );

  const [toggles, setToggles] = useState([]);

  // Set the first item to be open when the component mounts
  useEffect(() => {
    if (categoryListShow?.length > 0) {
      setToggles(categoryListShow?.map((_, index) => index === 0));
    }
  }, [categoryListShow]);
  const handleToggle = (index) => {
    const newToggles = [...toggles];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);
  };
  const handleCourseType = (
    course_type,
    course_id,
    title,
    is_cbt,
    cbt_combo
  ) => {
    if (course_type == 2 && course_id != "") {
      localStorage.setItem("course_type", JSON.stringify(course_type));
      localStorage.setItem("course_Id", JSON.stringify(course_id));
      navigate("/test-series");
    }
    if (course_type == 3 && course_id != "") {
      localStorage.setItem("course_type", JSON.stringify(course_type));
      localStorage.setItem("course_Id", JSON.stringify(course_id));
      navigate("/my-course/course-dqb");
    }
    if (course_type == 9) {
      localStorage.setItem("course_type", JSON.stringify(course_type));
      localStorage.setItem("course_Id", JSON.stringify(course_id));
      // localStorage.setItem("courseTitle", JSON.stringify(title));
      // navigate("/course-detail");
      navigate("/class-schedules-details");
    }
    if (course_type == 1) {
      localStorage.setItem("course_type", JSON.stringify(course_type));
      localStorage.setItem("course_Id", JSON.stringify(course_id));
      localStorage.setItem("course_Title", title);
      navigate("/class-schedules-details");
    }
    if (course_type == 6) {
      localStorage.setItem("course_type", JSON.stringify(course_type));
      localStorage.setItem("course_Id", JSON.stringify(course_id));
      navigate("/recorded-session");
    }

    if (course_type == 10 && is_cbt == 1 && cbt_combo == 1) {
      localStorage.setItem("is_cbt", JSON.stringify(is_cbt));
      localStorage.setItem("cbt_title", JSON.stringify(title));
      localStorage.setItem("course_Id", JSON.stringify(course_id));
      navigate("/cbtcombo");
    }
  };

  const handleRefer = () => {
    navigate("/refer-earn");
  };
  //console.log(categoryListShow);

  function dateToMilliseconds(dateString) {
    const [day, month, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    return date.getTime();
  }
  const handleUpgrade = (cd, cp, cid, bp, tid) => {
    navigate(`/plan/${dateToMilliseconds(cd)}CP${cp}CI${cid}BP${bp}TD${tid}`);
  };
  return (
    <div id="course" className="tab-pane active show">
      <div className="content-sec">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <h2>Plan Inclusion</h2>
          </div>
          {loading ? (
            <div
              style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner
                animation="border"
                role="status"
                style={{ height: "100px", width: "100px" }}
              />
            </div>
          ) : (
            <>
              {categoryListShow.length > 0
                ? categoryListShow.map((item, index) => (
                    <div
                      key={index}
                      className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
                    >
                      <div className="accordion">
                        <div className="card mb-0">
                          <div
                            className="card-header position-relative"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleToggle(index)}
                          >
                            <a className="card-title">
                              <img
                                src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/performance/test-series.svg"
                                alt=""
                              />
                              {item.title}
                              <p className="referBtn" onClick={handleRefer}>
                                Refer and Earn
                              </p>
                            </a>

                            {item.validity ? (
                              <div className="vali">
                                Validity on {item.validity}{" "}
                              </div>
                            ) : (
                              <></>
                            )}
                            {item?.course_upgrade_plan == 1 ? (
                              <span
                                className="upgratedBtn"
                                onClick={() =>
                                  handleUpgrade(
                                    item?.course_start_date,
                                    item?.course_price,
                                    item?.id,
                                    item?.course_base_price,
                                    item?.transaction_id
                                  )
                                }
                              >
                                Upgrade
                              </span>
                            ) : (
                              <></>
                            )}
                          </div>

                          {toggles[index] &&
                            item?.attached_module.map((submod, key) =>
                              submod?.module_data.map((moddata, key) => (
                                <div className="card-body collapse show">
                                  <a
                                    // href="#"
                                    className="oth-sec secfullWidth"
                                  >
                                    <div className="boxSubmenu">
                                      <img
                                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/performance/test-series.svg"
                                        alt=""
                                        title=""
                                      />
                                      <div className="setOfErrowp">
                                        <p
                                          className="position-relative"
                                          onClick={() =>
                                            handleCourseType(
                                              moddata.course_type,
                                              moddata.course_id,
                                              localStorage.setItem(
                                                "coursePlanTitle",
                                                JSON.stringify(moddata.title)
                                              )
                                            )
                                          }
                                          style={{ cursor: "pointer"}} 
                                        >
                                          {moddata.title}
                                        </p>
                                        <div className="arow">
                                          <em className="fa fa-angle-right" ></em>
                                        </div>
                                      </div>
                                      {/* <p
                                        style={{
                                          width: "100%",
                                          textAlign: "end",
                                          fontWeight: "500",
                                          color: "#f15a22",
                                          cursor: "pointer",
                                        }}
                                        onClick={handleRefer}
                                      >
                                        Refer and Earn
                                      </p> */}
                                    </div>
                                  </a>
                                </div>
                              ))
                            )}
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </>
          )}

          <div
            className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            style={{ cursor: "pointer" }}
          >
            {coursecatListShow?.map((item, index) => (
              <a
                to={""}
                className="oth-sec"
                onClick={() =>
                  handleCourseType(
                    item.course_type,
                    item.id,
                    item.title,
                    item.is_cbt,
                    item.cbt_combo,
                    localStorage.setItem(
                      "coursePlanTitle",
                      JSON.stringify(item.title)
                    )
                  )
                }
              >
                <div className="boxSubmenu boxSubmenu1">
                  <img
                    src={
                      item.cover_image
                        ? item.cover_image
                        : "https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/emedicoz-logo.png"
                    }
                    alt=""
                    title=""
                  />
                  <div className="setOfErrowp">
                    <p className="position-relative">{item.title}</p>
                    <div className="arow">
                      <em className="fa fa-angle-right"></em>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourseOneTab;
