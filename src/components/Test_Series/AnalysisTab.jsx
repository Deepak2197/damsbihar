import React, { useState,useRef,useEffect } from "react";
import Chart from 'react-apexcharts'

const AnalysisTab = ({getdata}) => {
  const [activeTab, setActiveTab] = useState("result");
  const chartContainer = useRef(null);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'My Percentage',
        data: [getdata?.percentage===""?0:getdata?.percentage],
      },
      {
        name: 'Topper Percentage',
        data: [((getdata?.top_ten_list[0].marks/getdata?.total_marks)*100).toFixed(2)],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 430,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
          barHeight: '20%',
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: [getdata?.subject_name],
        min: 0,
        max: 100,
        labels: {
          formatter: function(val) {
            return val + '%';
          },
        },
      },
    },
  });

  const convertMillisecondsToTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}min ${remainingSeconds}sec`;
  };

  return (
    <section className="analysisTab">
      <div className="">
        <div className="LeaderRank">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div className="tableSection">
                <h2>Analysis</h2>
                <div className="scoreBox">
                  <div className="row">
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                      <div className="scorePart">
                        <h3>
                        {(getdata?.correct_count*getdata?.marks_per_question-getdata?.incorrect_count*getdata?.negative_marking).toFixed(0)} <span className="fontOut">Out of {getdata?.total_marks} </span>
                        </h3>
                        <h4>My Score</h4>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                      <div className="scorePart">
                        <h3>
                        {getdata?.top_ten_list[0].marks} <span className="fontOut">Out of {getdata?.total_marks}</span>
                        </h3>
                        <h4>Topper's Score</h4>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                      <div className="scorePart">
                        <h3>
                          {getdata?.average_marks?.avg_marks} <span className="fontOut">Out of {getdata?.total_marks}</span>
                        </h3>
                        <h4>Average Score</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr className="fstth">
                        <th>Subject</th>
                        <th>Time</th>
                        <th>Right/Total Q.</th>
                        <th>Score/Total Q.</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="fstthh">
                        <th>{getdata?.subject_name}</th>
                        <th>{getdata?.time_spent}</th>
                        <th>{getdata?.correct_count}/{getdata?.total_questions}</th>
                        <th>{(getdata?.correct_count*getdata?.marks_per_question-getdata?.incorrect_count*getdata?.negative_marking).toFixed(0)}/{getdata?.total_questions}</th>
                        <th>
                         {getdata?.percentage?getdata?.percentage:"0%"}
                          <div className="position-relative">
                            <i className="fa fa-angle-up"></i>
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <td>
                          <span className="fontdisb">{getdata?.guess_count}/{getdata?.total_questions}</span>{" "}
                          <span className="fontSmall">Guess</span>
                        </td>
                        <td>
                          <span className="fontdisb1">{getdata?.incorrect_count}/{getdata?.total_questions} </span>
                          <span className="fontSmall">Wrong</span>
                        </td>
                        <td>
                          <span className="fontdisb2">{getdata?.total_questions-getdata?.attempted}/{getdata?.total_questions} </span>
                          <span className="fontSmall">Skipped</span>
                        </td>
                        <td>
                          <span className="fontdisb2">   {convertMillisecondsToTime(getdata?.top_ten_list[0].time_spent)}</span>
                          <span className="fontSmall">Topper Time</span>
                        </td>
                        <td>
                          <span className="fontdisb3">{((getdata?.top_ten_list[0].marks/getdata?.total_marks)*100).toFixed(2)}%</span>
                          <span className="fontSmall">Topper Percentage</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div className="tableSection">
                <h2>Graph</h2>
                <div className="selectTab">
                  <ul className="nav nav-pills" role="tablist">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "result" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("result")}
                      >
                        My Result
                      </button>
                    </li>
                    {/* <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "topper" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("topper")}
                      >
                        Compare with Topper
                      </button>
                    </li> */}
                  </ul>
                  <div className="tab-content">
                    {activeTab==="result" ? (
                      <div className="">
                        <Chart options={chartData.options} series={chartData.series} type="bar" height={330} />
                      </div>
                    ):
                    <div className="">
                      {/* <p>Compare With Topper</p> */}
                    </div>}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisTab;
