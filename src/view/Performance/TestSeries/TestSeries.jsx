import React, { useEffect, useState } from "react";
import axiosInstance from "../../../API/axiosConfig";
import Chart from "react-apexcharts";
import { Avatar, Drawer, List, Skeleton, Slider } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { GoGraph } from "react-icons/go";
import "../../Performance/style.css";
import { IMG_BASE_URL } from "../../../API/images";

function TestSeries({
  filterArray,
  qBankID,
  testSeriesID,
  existDataOrNot,
  userID,
  selectOptionValue,
}) {
  
  //     "Q Bank->",
  //     filterArray,
  //     qBankID,
  //     testSeriesID,
  //     existDataOrNot,
  //     selectOptionValue
  //   );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSecond, setLoadingSecond] = useState(false);
  const [loadingThird, setLoadingThird] = useState(false);
  const [loadingFourth, setLoadingFourth] = useState(false);
  const [generatedID, setGeneratedID] = useState("");
  const [testWiseData, setTestWiseData] = useState([]);

  const [topUserData, setTopUserData] = useState({});
  const [sliderNumber, setSliderNumber] = useState(1);
  const [allTopUserData, setAllTopUserData] = useState([]);
  const [selUserData, setSelUserData] = useState([]);
  const [getPerformanceData, setGetPerformanceData] = useState([]);

  const [btnPerformanceDataValue, setBtnPerformanceDataValue] = useState("1");
  const [btnStatictDynamicData, setBtnStatictDynamicData] = useState([]);
  const [btnDataValue, setBtnDataValue] = useState("0");
  const [lineChartData, setLineChartData] = useState([]);

  const btnData = [
    { name: "Score", id: "1" },
    { name: "Accuracy", id: "4" },
    { name: "Attempted", id: "2" },
    { name: "Correct", id: "3" },
    { name: "Incorrect", id: "5" },
    { name: "Skipped", id: "6" },
  ];

  const handleButtonClickFirst = (id) => {
    setBtnPerformanceDataValue(id); // Set the selected button id
  };

  const optionsTestFirst = {
    chart: {
      type: "bar", // Specifies that this is a bar chart
      height: "10%", // Adjust height as needed
      verticalAlign: "middle", // Align bars vertically in the chart area
      toolbar: {
        show: false, // Hides the toolbar if you don't need it
      },
    },
    xaxis: {
      categories: testWiseData.map((value) => value.test_type_title), // X-axis labels
      labels: {
        style: {
          fontSize: "12px", // Adjust label font size as needed
        },
      },
    },
    yaxis: {
      title: {
        text: "Test Wise Percentile", // Y-axis title
      },
      labels: {
        style: {
          fontSize: "12px", // Adjust label font size as needed
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false, // Set to false for vertical bars
      },
    },
  };

  const seriesTestFiest = [
    {
      name: "Series 1",
      data: testWiseData.map((value) => value.percentile), // Data for the bars
    },
  ];

  const optionsSecond = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: getPerformanceData?.map((val) => val.name),
    },
    yaxis: {
      title: {
        text: "Value",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };
  const seriesSecond = [
    {
      name: "Sales",
      data: getPerformanceData?.map((val) =>
        Math.ceil(val.value?.toString().slice(0, 3))
      ),
    },
  ];

  const series = [
    {
      name: "Desktops",
      data: lineChartData?.test_data?.map((value) => value.percentile),
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: lineChartData?.test_data?.map(
        (value) => value.test_series_name
      ),
    },
  };

  const getFirstTestSeries = async (userId, selectID) => {
 
    try {
      const res = await axiosInstance.post(
        "/v2_data_model/get_plan_child_course",
        {
          plan_id: selectID,
          user_id: userId,
        }
      );

      const selId = res.data.data.filter((val) => val.course_type === "2");
     
      setGeneratedID(selId[0].id);
      getTopPerformance(userId, selId[0].id);
      getTopApiRequest(userId, selId[0].id);
      getTestWiseReport(userId, selId[0].id);
      
    } catch (error) {
    
    }
  };

  const getTestWiseReport = async (id, genId) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "/v2_data_model/get_test_wise_report",
        {
          course_id: genId,
          user_id: id,
          duration: "YEARLY",
        }
      );
      setTestWiseData(res.data.data);

      setLoading(false);
    } catch (error) {
     
      setLoading(false);
    }
  };

  const getTopPerformance = async (id, genId) => {
    try {
      setLoadingSecond(true);
      const res = await axiosInstance.post(
        "/v2_data_model/get_testseries_rank",
        {
          user_id: id,
          course_id: genId,
          duration: "YEARLY",
        }
      );
      setTopUserData(res.data.data);

      setLoadingSecond(false);
    } catch (error) {
     
      setLoadingSecond(false);
    }
  };

  const getTopApiRequest = async (id, gID) => {
    try {
      setLoadingThird(true);
      const res = await axiosInstance.post(
        "/v2_data_model/get_testseries_top_list",
        {
          user_id: id,
          course_id: gID,
          duration: "YEARLY",
        }
      );
      setAllTopUserData(res?.data?.data);
      const f = res.data.data.filter((vsl) => vsl.rank === sliderNumber);
      setSelUserData(f);
      getPerformance(id, gID);
      setLoadingThird(false);
    } catch (err) {
   
      setLoadingThird(false);
    }
  };

  const getPerformance = async (id, cID) => {
    try {
      setLoadingFourth(true);
      const res = await axiosInstance.post(
        "/v2_data_model/get_testseries_graph",
        {
          user_id: id ? id : userID,
          course_id: cID ? cID : generatedID,
          filter_by: btnPerformanceDataValue,
          duration: "YEARLY",
        }
      );
      let arr = [];
      const obj = res?.data?.data?.graph_data;
      for (let key in obj) {
        let value = obj[key].toString();
        if (key === "topper_data") {
          value = value.split(".").join(""); // Remove the decimal point
        }
        arr.push({ name: key.replace("_", " "), value: value });
      }
      setGetPerformanceData(arr);
      getTestName(id, cID);
      setLoadingFourth(false);
    } catch (error) {
   
      setLoadingFourth(false);
    }
  };

  const getTestName = async (id, cID) => {
    try {
      const res = await axiosInstance.post("/v2_data_model/get_test_name", {
        user_id: id,
        duration: "YEARLY",
        course_id: cID ? cID : generatedID,
      });
      let arrOfObject = res.data.data;
      let staticObject = { id: "0", test_type_title: "All Test Report" };
      arrOfObject = [staticObject, ...arrOfObject];
      setBtnStatictDynamicData(arrOfObject);
      getTestWiseAnalysis(id, cID);
    } catch (error) {
   
    }
  };

  const getTestWiseAnalysis = async (id, cID) => {
    try {
      const res = await axiosInstance.post(
        "/v2_data_model/get_test_wise_analysis",
        {
          user_id: id ? id : userID,
          test_id: btnDataValue,
          duration: "",
          course_id: cID ? cID : generatedID,
          page: 1,
        }
      );

      setLineChartData(res.data.data);
    } catch (error) {
     
    }
  };

  const handleButtonClick = (id) => {
    setBtnDataValue(id); // Set the selected button id
  };

  useEffect(() => {
    getFirstTestSeries(userID, selectOptionValue);
  }, [filterArray[0].course_type === "2"]);

  useEffect(() => {
    const filerData = allTopUserData?.filter(
      (val) => val.rank === sliderNumber
    );

    setSelUserData(filerData);
  }, [sliderNumber]);

  useEffect(() => {
    getPerformance();
  }, [btnPerformanceDataValue]);

  useEffect(() => {
    getTestWiseAnalysis();
  }, [btnDataValue]);

  return (
    <>
      <div className="TestPerformset">
        <div className="ChildTest">
          <span>Your Test Performance</span>
        </div>

        <div className="mainChild">
          {loading ? (
            <Skeleton paragraph={{ rows: 6 }} active />
          ) : (
            <>
              {testWiseData.length > 0 ? (
                <Chart
                  options={optionsTestFirst}
                  series={seriesTestFiest}
                  type="bar"
                  height="500"
                />
              ) : (
                "No Data"
              )}
            </>
          )}
        </div>
        {/* Second div */}
        <div className="mainChild">
          {loadingSecond && loadingThird ? (
            <Skeleton active paragraph={{ rows: 6 }} />
          ) : (
            <>
              <h6>Your Test Performance Comparison With Others</h6>
              <span>Your rank</span>
              <div className="dropChild">
                <span>All India</span>
                <span>All India</span>
              </div>
              <div className="spanChild">
                <span>{`${topUserData?.rank} of ${topUserData?.totalStudents}`}</span>
                <span>4 of 5</span>
              </div>

              <div>
                <span style={{ fontWeight: "600" }}>
                  Rank Comparison you vs other
                </span>
              </div>
              <div style={{ marginTop: "50px" }}>
                <Slider
                  defaultValue={sliderNumber}
                  max={
                    topUserData?.totalStudents > 99
                      ? 100
                      : topUserData?.totalStudents
                  }
                  // max={100}
                  min={1}
                  tooltip={{ open: true }}
                  onChange={(e) => setSliderNumber(e)}
                />
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Compare</th>
                    <th>Others</th>
                    <th>You</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rank</td>
                    <td>{selUserData[0]?.rank}</td>
                    <td>{topUserData?.rank}</td>
                  </tr>
                  <tr>
                    <td>Marks</td>
                    <td>
                      {Number.parseFloat(selUserData[0]?.marks).toFixed(2)}
                    </td>
                    <td>{Number.parseFloat(topUserData?.marks).toFixed(1)}</td>
                  </tr>
                  <tr>
                    <td>Correct</td>
                    <td>{selUserData[0]?.correct_count}</td>
                    <td>{topUserData?.correct_count}</td>
                  </tr>
                  <tr>
                    <td>Incorrect</td>
                    <td>{selUserData[0]?.incorrect_count}</td>
                    <td>{topUserData?.incorrect_count}</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>

        {/* Third div */}
        <div className="LeaderData">
          <div className="leaderInner">
            {btnData?.map((val, i) => (
              <span
                key={i}
                style={{
                  border:
                    btnPerformanceDataValue !== val.id && "1px solid grey",
                  background:
                    btnPerformanceDataValue === val.id ? "#F16136" : "",
                  color: btnPerformanceDataValue === val.id ? "white" : "",
                }}
                onClick={
                  loadingFourth
                    ? () => toast.warning("please wait...")
                    : () => handleButtonClickFirst(val.id)
                }
              >
                {val?.name}
              </span>
            ))}
          </div>
          {loadingFourth ? (
            <Skeleton active paragraph={{ rows: 6 }} />
          ) : (
            <Chart
              options={optionsSecond}
              series={seriesSecond}
              type="bar"
              height={350}
            />
          )}
        </div>

        {/* Leaderboard */}
        <div className="LeaderBoardData">
          <div className="innerSec">
            <span>Leaderboard</span>
            <b
              style={{ cursor: "pointer" }}
              onClick={() => setDrawerOpen(true)}
            >
              View All
            </b>
          </div>
          <div style={{ marginTop: "10px" }}>
            {loadingThird ? (
              <Skeleton active paragraph={{ rows: 6 }} />
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={allTopUserData?.slice(0, 5)}
                renderItem={(item, i) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`}
                        />
                      }
                      title={<Link to="">{item.name}</Link>}
                      description={`${Number.parseFloat(item.marks).toFixed(
                        2
                      )} marks - ${item.correct_count} Correct`}
                    />
                  </List.Item>
                )}
              />
            )}
          </div>
        </div>

        <div className="LeaderBoardData">
          <div className="innerSec">
            {btnStatictDynamicData?.map((val, i) => (
              <span
                key={i}
                style={{
                  border: btnDataValue !== val.id && "1px solid grey",
                  background: btnDataValue === val.id ? "#5BBCFF" : "",
                  color: btnDataValue === val.id ? "white" : "",
                }}
                onClick={() => handleButtonClick(val.id)}
              >
                {val?.test_type_title}
              </span>
            ))}
          </div>
          <div>
            {lineChartData?.test_data?.length > 0 ? (
              <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={350}
              />
            ) : (
              <div
                style={{
                  background: "#F5F7F8",
                  padding: "5px",
                  margin: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <GoGraph />{" "}
                <span style={{ marginLeft: "10px" }}>No graph found</span>
              </div>
            )}
          </div>
          <div className="performanceGroup">
            <div className="row">
              {lineChartData?.test_data?.map((val, i) => (
                <div className="col-12 col-sm-6 col-md-6 col-lg-6" key={i}>
                  <div className="groupdata">
                    <h3>{val?.test_series_name}</h3>
                    <h5>
                      Your Scored {val?.marks} out of {val?.total_question}{" "}
                      marks
                    </h5>
                    <div className="percentile">Percentile</div>
                    <div className="numberbg">15.0</div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                    <ul>
                      <li>{val?.correct_count} Correct</li>
                      <li>{val?.incorrect_count} Incorrect</li>
                      <li>{val?.non_attempt} Skipped</li>
                    </ul>

                    <div className="totalQue">
                      <p>
                        <span>Correct Answers {val?.correct_answers_per}%</span>{" "}
                        Total Questions: 100
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="blankData"></div>
      </div>

      <Drawer
        title=""
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={"25%"}
        style={{ marginTop: "85px" }}
      >
        <div>
          {allTopUserData?.map((val, i) => (
            <div className="rightPopdata" key={i}>
              <img
                src={
                  val?.profile_picture
                    ? val.profile_picture
                    : `${IMG_BASE_URL}/login_logo.png`
                }
                width="10%"
                loading="lazy" alt="Profile or Default"
              />
              <div className="rightInner">
                <span>{val?.name}</span>
                <span>{`${Number.parseFloat(val?.marks).toFixed(
                  2
                )} marks ---- ${val?.correct_count} correct`}</span>
              </div>
              <div className="rightChildData">{val?.rank}</div>
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
}

export default TestSeries;
