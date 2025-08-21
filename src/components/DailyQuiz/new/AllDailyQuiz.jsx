import { useEffect, useState, useRef } from "react";
import { CiViewList, CiTimer } from "react-icons/ci";
import { RiBodyScanLine } from "react-icons/ri";
import axiosInstance from "../../../API/axiosConfig";
import { Link, useLocation } from "react-router-dom";
import { Button, List, Modal, Spin, Table } from "antd";
import "../new/style.css";
import { FaCheckCircle, FaPlayCircle, FaRegCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AllDailyQuiz = () => {
  const { catId } = useSelector((state) => state.testseries);
  const user_id = sessionStorage.getItem("id");
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState({ daily_quiz: [] });
  const [topFive, setTopFive] = useState([]);
  const [drawerModal, setDrawerModal] = useState(false);
  const [arrModal, setArrModal] = useState(false);
  const [arrLoading, setArrLoading] = useState(false);
  const [arrData, setArrData] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [availableArr, setAvailableArr] = useState([]);

  const listRef = useRef(null);
  const arr = [
    {
      name: "My Attempts",
      img: "/web/daily-challenge/attemp.svg",
      value: "MyAttempt",
    },
    {
      name: "Archives",
      img: "/web/daily-challenge/archieve.svg",
      value: "Archives",
    },
    {
      name: "Scorecard",
      img: "/web/daily-challenge/scorecard.svg",
      value: "Scorecard",
    },
  ];

  const getRankFunction = async (date) => {
    try {
      const { data } = await axiosInstance.post(
        "/v2_data_model/get_test_series_daily_quiz_basic_result_vc_1",
        {
          // user_id: location?.state?.id ?? location?.state,
          user_id: user_id,
          cat_id: catId,
          // cat_id: location?.state?.selectedCatID,
          date,
        }
      );
      setAvailableArr(data?.status ? data.data : []);
    } catch (error) {
      console.error("Error fetching rank:", error);
      toast.error("Failed to fetch rank data");
    }
  };

  // Fetch top 3 leaderboard
  const getTopThree = async (id) => {
    try {
      const { data } = await axiosInstance.post("/v2_data_model/get_top_100", {
        // user_id: location?.state?.id ?? location?.state,
        user_id: user_id,
        test_series_id: id,
      });
      setTopFive(data.data || []);
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      await getRankFunction(`${year}-${month}-${day}`);
    } catch (error) {
      console.error("Error fetching top three:", error);
      toast.error("Failed to fetch leaderboard data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch home screen data
  const getHomeScreenAPI = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        "/v2_data_model/getLiveClassDailyQuiz",
        {
          // user_id: location?.state?.id ?? location?.state,
          user_id: user_id,
          cat_id: catId,
          // cat_id: location?.state?.selectedCatID,
        }
      );
      if (data.status) {
        setAllData({ daily_quiz: data.data.daily_quiz || [] });
        if (data.data.daily_quiz[0]?.id) {
          await getTopThree(data.data.daily_quiz[0].id);
        }
      } else {
        toast.error("Failed to load daily quiz data");
      }
    } catch (error) {
      console.error("Error fetching home screen data:", error);
      toast.error("Failed to load home screen data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch archives or my attempt data with pagination
  const getListData = async (complete = "", append = false) => {
    if (!hasMore || arrLoading) {
      return;
    }
    try {
      setArrLoading(true);
      // console.log("Fetching data with last_id:", lastId, "complete:", complete);
      const { data } = await axiosInstance.post("/v2_data_model/get_list", {
        // user_id: location?.state?.id ?? location?.state,
        user_id: user_id,
        last_id: lastId,
        complete,
      });
      //console.log("API response:", data);
      if (data.status && Array.isArray(data.data)) {
        const newData = data.data;
        setArrData((prev) => (append ? [...prev, ...newData] : newData));
        // console.log("Received items:", newData.length);
        if (newData.length === 0 || newData.length < 30) {
          setHasMore(false);
          //console.log("No more data available, stopping pagination");
        } else {
          setLastId((prev) => {
            const newId = prev + 30;
            //console.log("Incrementing last_id to:", newId);
            return newId;
          });
        }
      } else {
        setHasMore(false);
        if (!append) {
          setArrData([]);
        }
        // console.log("No data or invalid response, stopping pagination");
        toast.error("No more data available");
      }
    } catch (error) {
      console.error("Error fetching list data:", error);
      toast.error("Failed to load list data");
      setHasMore(false);
    } finally {
      setArrLoading(false);
    }
  };

  // Convert timestamp to readable date
  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format time in seconds to HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle start quiz
  const handleStart = (testId) => {
    try {
      const width = window.screen.availWidth;
      const height = window.screen.availHeight;
      const features = `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=${width},height=${height},top=0,left=0`;
      window.open(
        `/test-home/dqb/${location?.state?.id ?? location?.state}s${testId}`,
        "_blank",
        features
      );
    } catch (error) {
      console.error("Error starting quiz:", error);
      toast.error("Failed to start quiz");
    }
  };

  // Handle review quiz
  const handleReview = (segmentId) => {
    try {
      const width = window.screen.availWidth;
      const height = window.screen.availHeight;
      const features = `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=${width},height=${height},top=0,left=0`;
      window.open(
        `/testresult/dqb/${
          location?.state?.id ?? location?.state
        }s${segmentId}`,
        "_blank",
        features
      );
    } catch (error) {
      console.error("Error reviewing quiz:", error);
      toast.error("Failed to review quiz");
    }
  };

  // Handle view report
  const handleCheck = () => {
    if (availableArr[0]?.test_segment_id?.length > 0) {
      handleReview(availableArr[0].test_segment_id);
    } else {
      toast.error("Please attempt today's daily challenge to get the result");
    }
  };

  // Handle scroll for infinite loading
  const handleScroll = () => {
    if (
      listRef.current &&
      arrModal === "Archives" &&
      hasMore &&
      !arrLoading &&
      listRef.current.scrollTop + listRef.current.clientHeight >=
        listRef.current.scrollHeight - 10
    ) {
      // console.log("Reached bottom, fetching more data with last_id:", lastId);
      getListData("", true);
    }
  };

  // Close archives modal
  const closeArr = () => {
    // console.log("Closing modal, resetting pagination");
    setArrData([]);
    setArrModal(false);
    setLastId(0);
    setHasMore(true);
  };

  useEffect(() => {
    getHomeScreenAPI();
  }, []);

  useEffect(() => {
    if (arrModal === "MyAttempt") {
      //console.log("Fetching My Attempt data");
      getListData(1, false);
    } else if (arrModal === "Archives") {
      //console.log("Fetching Archives data");
      getListData("", false);
    } else if (arrModal === "Scorecard") {
      // console.log("Opening Scorecard modal");
      setDrawerModal(true);
      setArrModal(false); // clear so archives modal closes
    }
  }, [arrModal]);

  const columns = [
    {
      title: "Rank",
      render: (text, record, index) => index + 1,
      key: "rank",
    },
    {
      title: "Learner",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Time",
      dataIndex: "time_spent",
      key: "time_spent",
      render: (text) => formatTime(text),
    },
    {
      title: "Right",
      dataIndex: "correct_count",
      key: "correct_count",
      render: (text, record) => (
        <div style={{ width: "150px" }}>
          <div style={{ color: "green" }}>Right: {record.correct_count}</div>
          <div style={{ color: "red" }}>Wrong: {record.incorrect_count}</div>
          <div style={{ color: "grey" }}>Skipped: {record.non_attempt}</div>
        </div>
      ),
    },
  ];

  return (
    <div className="dailYChallenge">
      <div className="container">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40vh",
            }}
          >
            <Spin />
          </div>
        ) : (
          <div className="DailyData">
            <div className="dailyInner">
              <div className="boxadata">
                {arr.map((itm, i) => (
                  <Link key={i}>
                    <div
                      className="boxdataInner"
                      onClick={() => setArrModal(itm.value)}
                    >
                      <img src={itm.img} alt={itm.name} />
                    </div>
                    <p>{itm.name}</p>
                  </Link>
                ))}
              </div>
              <div className="dailyMiddle">
                {allData.daily_quiz.map((itm, i) => (
                  <div className="middleInner" key={i}>
                    <div className="Innersec">
                      <div className="topic">
                        <RiBodyScanLine />
                        <div className="totalTopic">
                          <div className="topicPic">
                            <img src="/web/daily-challenge/topic.svg" />
                          </div>
                          <div>
                            <i>Topic</i>
                            <b>{itm.test_series_name}</b>
                          </div>
                        </div>
                      </div>
                      <span>{convertTimestampToDate(itm.test_start_date)}</span>
                    </div>
                    <div className="belowSec">
                      <div className="bottominner">
                        <CiViewList />
                        <div className="bottomData">
                          <i>{itm.total_questions}</i>
                          <b>Total no of questions</b>
                        </div>
                      </div>
                      <div className="bottomData1">
                        <CiTimer />
                        <div className="para">
                          <p className="m-0" style={{ fontWeight: "600" }}>
                            {itm.time_in_mins} min
                          </p>
                          <h6 className="m-0">Duration</h6>
                        </div>
                      </div>
                    </div>
                    <div className="btnData">
                      {itm.segment_id === "0" ? (
                        <Button
                          onClick={() => handleStart(itm.id)}
                          style={{
                            background: "#BDBDBD",
                            color: "white",
                            padding: "0px 14px",
                            borderRadius: "4px",
                          }}
                        >
                          Start Quiz
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleReview(itm.segment_id)}
                          style={{
                            background: "#007aff",
                            color: "white",
                            padding: "0px 14px",
                            borderRadius: "4px",
                          }}
                        >
                          Already Attempted
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="middleSecData">
                <div className="todaYLeader">
                  <h3>Today's Leaderboard</h3>
                  <p className="TextData" onClick={() => setDrawerModal(true)}>
                    Show All
                  </p>
                </div>
                <div className="middlepart">
                  {topFive.slice(0, 3).map((itm, i) => (
                    <div className={`middleInner position-${i + 1}`} key={i}>
                      <div className="profile-wrapper">
                        {i === 0 && (
                          <div className="crown">
                            <img src="/web/daily-challenge/crown.svg" />
                          </div>
                        )}
                        <img
                          src={
                            itm.profile_picture ||
                            `${window.IMG_BASE_URL}/no.svg`
                          }
                          alt="Profile"
                        />
                        <div className="piCCircle">
                          <p>{i + 1}</p>
                        </div>
                      </div>
                      <h5>{formatTime(itm.time_spent)}</h5>
                      <p>
                        {itm.marks}
                        <span>Out of 20</span>
                      </p>
                      <h4 style={{ fontSize: i === 0 ? "22px" : "16px" }}>
                        {itm.name}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              <div className="Areabanner">
                <div className="imgbb">
                  <img src="/web/daily-challenge/today-report.png" />
                </div>
                <div className="viewReport">
                  <h5>Your Rank</h5>
                  <div
                    className={
                      availableArr[0]?.test_segment_id?.length > 0
                        ? "roundNumber"
                        : ""
                    }
                  >
                    {availableArr[0]?.test_segment_id?.length > 0
                      ? availableArr[0].user_rank
                      : "-"}
                  </div>

                  <p>View Today's Report</p>
                </div>

                <div className="viewAllPart">
                  <span onClick={handleCheck} className="viewAll">
                    View All
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <Modal
          className="detailModel"
          title="Leaderboard"
          open={drawerModal}
          onCancel={() => setDrawerModal(false)}
          footer={null}
        >
          <Table
            columns={columns}
            dataSource={topFive}
            pagination={false}
            rowKey={(record) => record.id || record.key}
          />
        </Modal>

        <Modal
          className="detailModel"
          title={arrModal === "MyAttempt" ? "My Attempt" : "Archives"}
          open={arrModal === "MyAttempt" || arrModal === "Archives"}
          onCancel={closeArr}
          footer={null}
          width={500}
        >
          {arrLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <Spin />
            </div>
          )}
          <List
            ref={listRef}
            itemLayout="horizontal"
            dataSource={arrData}
            onScroll={handleScroll}
            style={{ maxHeight: "400px", overflowY: "auto" }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    onClick={() =>
                      item.segment_id === "0"
                        ? handleStart(item.id)
                        : handleReview(item.segment_id)
                    }
                    style={{
                      border:
                        item.segment_id === "0"
                          ? "1px solid dodgerblue"
                          : "1px solid green",
                      color: item.segment_id === "0" ? "#FFFFFF" : "#FFFFFF",
                      background:
                        item.segment_id === "0" ? "#007AFF" : "#41c300",
                      padding: "0px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    {item.segment_id === "0" ? "Start" : "Completed"}
                  </Button>,
                ]}
                style={{ marginBottom: "10px" }}
              >
                <List.Item.Meta
                  avatar={
                    item.segment_id === "0" ? (
                      <FaPlayCircle />
                    ) : (
                      <FaCheckCircle />
                    )
                  }
                  title={item.test_series_name}
                  description={convertTimestampToDate(item.test_start_date)}
                />
              </List.Item>
            )}
          />
          {!arrLoading && arrData.length === 0 && (
            <div style={{ textAlign: "center", padding: "20px" }}>
              No data available
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AllDailyQuiz;
