import React, { useState, useEffect } from "react";
import axiosInstance from "../../API/axiosConfig";
import { Skeleton } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../assets/css/performance/style.css";
import "../../assets/css/performance/responsive.css";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const MyStudyAnalysis = ({ userID, planID }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [weeklyLoader, setWeeklyLoader] = useState(false);
  const [arrLoader, setArrLoader] = useState(false);
  const [selectData, setSelectData] = useState([]);

  const [selectOptionValue, setSelectOptionValue] = useState(planID);
  const [qBankID, setQBankID] = useState("");
  const [testSeriesID, setTestSeriesID] = useState("");
  const [filterArray, setFilterArray] = useState([]);
  const [
    qBankAndTestSeriesTotalAtemptData,
    setQBankAndTestSeriesTotalAtemptData,
  ] = useState({});
  const [weeklyData, setWeeklyData] = useState([]);
  const [topperData, setTopperData] = useState({});

  const videoData = weeklyData.map((value) => ({
    test_practiced: value.recorded_video_attended_hour,
  }));
  const qbankData = weeklyData.map((value) => ({
    qBank_practiced: value.qbank_practiced,
  }));
  const tSeriesData = weeklyData.map((value) => ({
    tSeries_practiced: value.test_practiced,
  }));
  const liveData = weeklyData.map((value) => ({
    live_practiced: value.live_class_attended_hour,
  }));

  const getSelectOptionApi = async (id) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        API_ENDPOINTS.MY_STUDY.GET_LIST_OF_MY_PLANE_COURSES,
        {
          user_id: userID,
        }
      );
      setSelectData(res?.data?.data?.plan_list);
      getQBankAndTestSeriesExistOrNot(id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getQBankAndTestSeriesExistOrNot = async (id) => {
    try {
      setArrLoader(true);
      const res = await axiosInstance.post(
        API_ENDPOINTS.MY_STUDY.GET_PLANE_CHILD_COURSE,
        {
          user_id: userID,
          plan_id: id,
        }
      );
      const existOrNot = res?.data?.data?.filter(
        (val) => val.course_type === "2" || val.course_type === "3"
      );
      const testSeries = res?.data?.data?.filter(
        (val) => val.course_type === "2"
      );
      const qBank = res?.data?.data?.filter((val) => val.course_type === "3");

      setTestSeriesID(testSeries[0]?.id);
      setQBankID(qBank[0]?.id);
      setFilterArray(existOrNot);
      if (testSeries[0]?.id || qBank[0]?.id) {
        getTotalAttemptRequest(id, testSeries[0]?.id, qBank[0]?.id);
        getTopperStudent(id, testSeries[0]?.id, qBank[0]?.id);
      } else {
        return;
      }
      setArrLoader(false);
    } catch (err) {
      console.log(err);
      setArrLoader(false);
    }
  };

  const getTotalAttemptRequest = async (id, tID, qID) => {
    try {
      const res = await axiosInstance.post(
        "/v2_data_model/getUserAttemptData",
        {
          user_id: userID,
          plan_id: id,
          course_id_qbank: qID,
          course_id_testseries: tID,
        }
      );
      setQBankAndTestSeriesTotalAtemptData(res?.data?.data);
      getMaintainWeeklyStreak(id);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaintainWeeklyStreak = async (id) => {
    try {
      setWeeklyLoader(true);
      const res = await axiosInstance.post(
        "/v2_data_model/get_user_streak_weekly",
        {
          user_id: userID,
          plan_id: id,
          duration: "",
        }
      );
      setWeeklyData(res?.data?.data);
      setWeeklyLoader(false);
    } catch (error) {
      console.log(error);
      setWeeklyLoader(false);
    }
  };

  const getTopperStudent = async (id, tID, qID) => {
    try {
      const res = await axiosInstance.post("v2_data_model/get_topper_attempt", {
        user_id: userID,
        plan_id: id,
        course_id_qbank: qID,
        course_id_testseries: tID,
      });
      setTopperData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSelectOptionApi(selectOptionValue);
  }, [selectOptionValue]);

  return (
    <div id="study" className="tab-pane active show">
      <div className="content-sec myStudyData">
        <div className="row">
          <div className="col-md-12">
            {/* <div className="header-banner position-relative">
              <p className="text_bg">
                Hi Doctor Shubham, Welcome to the DAMS family, now you can track
                your daily activity and performance from this section. Let's do
                it!
              </p>
            </div> */}
            <h1 style={{ textAlign: "center", marginTop: "12px" }}>
              My Course & Analytics
            </h1>
          </div>
        </div>

        {loading ? (
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="dropMargin">
                <p>Choose Plan</p>
                <div className="form-group">
                  <select className="form-control">
                    <option>Select option</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {selectData && selectData.length > 0 ? (
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="dropMargin">
                    <p>Choose Plan</p>
                    <div className="form-group">
                      <select
                        className="form-control"
                        onChange={(e) => setSelectOptionValue(e.target.value)}
                        value={selectOptionValue}
                      >
                        {selectData?.map((plan, i) => (
                          <option
                            key={i}
                            value={plan.id}
                            disabled={weeklyLoader ? true : false}
                          >
                            {plan.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}

        {filterArray.length > 0 ? (
          <div id="str_list">
            <div className="row scrolling">
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div className="class-schedule class-scheduleNew">
                  {loading ? (
                    <Skeleton
                      paragraph={{
                        rows: 6,
                      }}
                    />
                  ) : (
                    <>
                      <img
                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/performance/grand-test.svg"
                        alt="anatomy class"
                      />
                      <p>Total Attempt</p>
                      <h5>{`${qBankAndTestSeriesTotalAtemptData?.test_attempted}/${qBankAndTestSeriesTotalAtemptData?.total_test}`}</h5>
                    </>
                  )}
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div className="class-schedule class-scheduleNew">
                  {loading ? (
                    <Skeleton
                      paragraph={{
                        rows: 6,
                      }}
                    />
                  ) : (
                    <>
                      <img
                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/performance/dqb.svg"
                        alt="anatomy class"
                      />
                      <p>Q Bank Module Practice</p>
                      <h5 className="Txt">{`${qBankAndTestSeriesTotalAtemptData?.qbank_practiced}/${qBankAndTestSeriesTotalAtemptData?.qbank_total}`}</h5>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              {weeklyLoader || loading ? (
                <Skeleton
                  active
                  paragraph={{
                    rows: 8,
                  }}
                />
              ) : (
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="catchup-streak">
                    <h2>Maintain Your Streak</h2>
                    <div className="table m-0">
                      <table className="table-responsive m-0">
                        <tbody>
                          <tr>
                            <th className="text-1">Attempts</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                            <th>Sun</th>
                          </tr>
                          <tr>
                            <td>
                              <div className="round text-2">Test Series</div>
                            </td>
                            {tSeriesData?.map((value, i) => (
                              <td key={i}>
                                <div className="rectangle outside outside3">
                                  <div
                                    className="inside"
                                    style={{
                                      background:
                                        value?.tSeries_practiced === "0"
                                          ? ""
                                          : "#793FDF",
                                    }}
                                  ></div>
                                </div>
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td>
                              <div className="round text-3">QBank</div>
                            </td>
                            {qbankData?.map((value, i) => (
                              <td key={i}>
                                <div className="rectangle outside ">
                                  <div
                                    className="inside"
                                    style={{
                                      background:
                                        value?.qBank_practiced === "0"
                                          ? ""
                                          : "#0096FF",
                                    }}
                                  ></div>
                                </div>
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td>
                              <div className="round text-4">Live Videos</div>
                            </td>
                            {liveData?.map((value, i) => (
                              <td key={i}>
                                <div className="rectangle outside outside2">
                                  <div
                                    className="inside"
                                    style={{
                                      background:
                                        value?.live_practiced === "0"
                                          ? ""
                                          : "#332FD0",
                                    }}
                                  ></div>
                                </div>
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td>
                              <div className="round text-5">
                                Recorded Videos
                              </div>
                            </td>
                            {videoData.map((value, i) => (
                              <td key={i}>
                                <div className="rectangle outside outside3">
                                  <div
                                    className="inside"
                                    style={{
                                      background:
                                        value?.test_practiced === "0"
                                          ? ""
                                          : "#FFB900",
                                    }}
                                  ></div>
                                </div>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="ConsisStudent">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <h2>Most Consistent Student</h2>
                </div>
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <h3>Test Series</h3>
                  <img
                    src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/performance/con-a.svg"
                    alt=""
                  />
                  <p>
                    {topperData?.testseries === null
                      ? "0"
                      : topperData?.testseries?.name}
                  </p>
                  <h4>
                    {topperData?.testseries === null
                      ? "0/0"
                      : `${topperData?.testseries?.total_attempt}/${topperData?.testseries?.total_testseries}`}
                  </h4>
                </div>
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <h3>Q Bank Module</h3>
                  <img
                    src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/performance/con-b.svg"
                    alt=""
                  />
                  <p>
                    {topperData?.qbank === null ? "0" : topperData?.qbank?.name}{" "}
                  </p>
                  <h4>
                    {topperData?.qbank === null
                      ? "0/0"
                      : `${topperData?.qbank?.total_attempt}/${topperData?.qbank?.total_qbank}`}
                  </h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <a id="redirectButton">
                  <div
                    className="detailAnalysis position-relative"
                    style={{
                      cursor: "pointer",
                      background: weeklyLoader && "#9DB2BF",
                    }}
                    onClick={
                      weeklyLoader
                        ? () => toast.warning("Please wait...")
                        : () =>
                            navigate("/performance", {
                              state: {
                                filterArray,
                                qBankID,
                                testSeriesID,
                                userID,
                                selectOptionValue,
                              },
                            })
                    }
                  >
                    <p>
                      <span className="chart">
                        <em className="fa fa-line-chart"></em>
                      </span>
                      {weeklyLoader
                        ? "Please Wait..."
                        : "View Detailed Analysis"}
                    </p>
                  </div>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="header-banner position-relative">
                  <p className="text_bg">
                    Hi Doctor Shubham, Welcome to the DAMS family, now you can
                    track your daily activity and performance from this section.
                    Let's do it!
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="not_genrate_rep">
                <img
                  src="https://i.ibb.co/TkRCGdR/file-issue1.png"
                  alt="file-issue1"
                  border="0"
                />
                <h3>
                  Your Report is not generated, Due to Q-Bank and Test Series
                  not available in selected plan
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStudyAnalysis;
