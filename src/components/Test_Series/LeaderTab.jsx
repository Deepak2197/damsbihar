import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";

const LeaderTab = ({ getdata, test_series_id }) => {
  const { id } = useParams();
  const user_id = id.split("s")[0];
  const test_segment_id = id.split("s")[1];

  const [topthree, setTopThree] = useState([]);
  const [toplist, setToplist] = useState([]);
  const [topAlist, setTopAlist] = useState([]);

  const [visibleRows, setVisibleRows] = useState([]);
  const [visibleRows1, setVisibleRows1] = useState([]);
  const [showList, setshowList] = useState(false);

  const toggleVisibility = (index) => {
    setVisibleRows((prevVisibleRows) => {
      const updatedVisibleRows = [...prevVisibleRows];
      updatedVisibleRows[index] = !updatedVisibleRows[index];
      return updatedVisibleRows;
    });
  };

  const toggleVisibility1 = (index) => {
    setVisibleRows1((prevVisibleRows) => {
      const updatedVisibleRows = [...prevVisibleRows];
      updatedVisibleRows[index] = !updatedVisibleRows[index];
      return updatedVisibleRows;
    });
  };

  const [isDetailListVisible1, setIsDetailListVisible1] = useState(false);

  const toggleDetailList1 = () => {
    setIsDetailListVisible1(!isDetailListVisible1);
  };

  const [isDetailListVisible2, setIsDetailListVisible2] = useState(false);

  const toggleDetailList2 = () => {
    setIsDetailListVisible2(!isDetailListVisible2);
  };

  const [isDetailListVisible3, setIsDetailListVisible3] = useState(false);

  const toggleDetailList3 = () => {
    setIsDetailListVisible3(!isDetailListVisible3);
  };

  const [isDetailListVisible4, setIsDetailListVisible4] = useState(false);

  const toggleDetailList4 = () => {
    setIsDetailListVisible4(!isDetailListVisible4);
  };

  useEffect(() => {
    const top_three = [
      getdata?.top_ten_list[0],
      getdata?.top_ten_list[1],
      getdata?.top_ten_list[2],
    ];
    setTopThree(top_three);
    const getList = async () => {
      const response = await axiosInstance.post(
        `/v2_data_model/get_testseries_top_100`,
        { user_id: user_id, test_series_id: test_series_id }
      );
      if (response?.data?.status) {
        setTopAlist(response.data.data.slice(0, 3));
        setToplist(response?.data?.data);
      } else {
        const response1 = await axiosInstance.post(
          `/v2_data_model/get_top_100`,
          { user_id: user_id, test_series_id: test_series_id }
        );
        setTopAlist(response1?.data.data.slice(0, 3));
        setToplist(response1?.data?.data);
      }
    };

    getList();
  }, []);

  const convertMillisecondsToTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}min ${remainingSeconds}sec`;
  };
  const handleList = () => {
    showList ? setshowList(false) : setshowList(true);
  };

  return (
    <>
      <section className="leaderSection">
        <div className="">
          <div className="row DivScroll">
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
              <div className="leaderDetail">
                <div className="positionTest">
                  <h2>2</h2>
                </div>
                {topAlist[1]?.profile_picture ? (
                  <Image
                    src={topAlist[1]?.profile_picture}
                    className="imgIcons"
                  />
                ) : (
                  <div className="imgIcons">
                    <h4>{topAlist[1]?.name.charAt(0)}</h4>
                  </div>
                )}
                <div className="nameIcon">
                  <h5>{topAlist[1]?.name}</h5>
                  <h6>
                    {topAlist[1]?.marks}{" "}
                    <span className="outFont">
                      Out of {getdata?.total_marks}
                    </span>
                  </h6>
                </div>
                <div className="details">
                  <h2 onClick={toggleDetailList3}>
                    Detail{" "}
                    <i
                      className={`fa ${
                        isDetailListVisible3
                          ? "fa fa-angle-down"
                          : "fa fa-angle-up"
                      }`}
                    ></i>
                  </h2>
                </div>
                {isDetailListVisible3 && (
                  <div className="detailList">
                    <h3>
                      Right{" "}
                      <span className="alpha">
                        {topAlist[1]?.correct_count}
                      </span>
                    </h3>
                    <h3>
                      Wrong{" "}
                      <span className="alpha">
                        {topAlist[1]?.incorrect_count}
                      </span>
                    </h3>
                    <h3>
                      Skipped{" "}
                      <span className="alpha">{topAlist[1]?.non_attempt}</span>
                    </h3>
                    <h3>
                      Time Taken{" "}
                      <span className="alpha">
                        {convertMillisecondsToTime(topAlist[1]?.time_spent)}
                      </span>
                    </h3>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
              <div className="leaderDetail">
                <div className="positionTest bg">
                  <h2 className="first">1</h2>
                </div>
                {topAlist[0]?.profile_picture ? (
                  <Image
                    src={topAlist[0]?.profile_picture}
                    className="imgIcons"
                  />
                ) : (
                  <div className="imgIcons">
                    <h4>{topAlist[0]?.name.charAt(0)}</h4>
                  </div>
                )}
                <div className="nameIcon">
                  <h5>{topAlist[0]?.name}</h5>
                  <h6>
                    {topAlist[0]?.marks}
                    <span className="outFont">
                      Out of {getdata?.total_marks}
                    </span>
                  </h6>
                </div>
                <div className="details">
                  <h2 onClick={toggleDetailList1}>
                    Detail{" "}
                    <i
                      className={`fa ${
                        isDetailListVisible1
                          ? "fa fa-angle-down"
                          : "fa fa-angle-up"
                      }`}
                    ></i>
                  </h2>
                </div>
                {isDetailListVisible1 && (
                  <div className="detailList">
                    <h3>
                      Right{" "}
                      <span className="alpha">
                        {topAlist[0]?.correct_count}
                      </span>
                    </h3>
                    <h3>
                      Wrong{" "}
                      <span className="alpha">
                        {topAlist[0]?.incorrect_count}
                      </span>
                    </h3>
                    <h3>
                      Skipped{" "}
                      <span className="alpha">{topAlist[0]?.non_attempt}</span>
                    </h3>
                    <h3>
                      Time Taken{" "}
                      <span className="alpha">
                        {convertMillisecondsToTime(topAlist[0]?.time_spent)}
                      </span>
                    </h3>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
              <div className="leaderDetail">
                <div className="positionTest">
                  <h2>3</h2>
                </div>
                {topAlist[2]?.profile_picture ? (
                  <Image
                    src={topAlist[2]?.profile_picture}
                    className="imgIcons"
                  />
                ) : (
                  <div className="imgIcons">
                    <h4>{topAlist[2]?.name.charAt(0)}</h4>
                  </div>
                )}

                <div className="nameIcon">
                  <h5>{topAlist[2]?.name}</h5>
                  <h6>
                    {topAlist[2]?.marks}
                    <span className="outFont">
                      Out of {getdata?.total_marks}
                    </span>
                  </h6>
                </div>
                <div className="details">
                  <h2 onClick={toggleDetailList2}>
                    Detail{" "}
                    <i
                      className={`fa ${
                        isDetailListVisible2
                          ? "fa fa-angle-down"
                          : "fa fa-angle-up"
                      }`}
                    ></i>
                  </h2>
                </div>
                {isDetailListVisible2 && (
                  <div className="detailList">
                    <h3>
                      Right{" "}
                      <span className="alpha">
                        {topAlist[2]?.correct_count}
                      </span>
                    </h3>
                    <h3>
                      Wrong{" "}
                      <span className="alpha">
                        {topAlist[2]?.incorrect_count}
                      </span>
                    </h3>
                    <h3>
                      Skipped
                      <span className="alpha">{topAlist[2]?.non_attempt}</span>
                    </h3>
                    <h3>
                      Time Taken{" "}
                      <span className="alpha">
                        {convertMillisecondsToTime(topAlist[2]?.time_spent)}
                      </span>
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="LeaderRank">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div className="tableSection">
                  <h2>Leaderboard</h2>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr className="fstth">
                          <th>Rank</th>
                          <th>Name</th>
                          <th>Marks</th>
                          <th>Right</th>
                        </tr>
                      </thead>
                      {getdata?.top_ten_list?.slice(3).map((lis, index) => (
                        <tbody>
                          <tr className="fstthh">
                            <th>{index + 4}</th>
                            <th>{lis.name}</th>
                            <th>{lis.marks}</th>
                            <th>
                              {lis.correct_count}
                              <div
                                className="position-relative"
                                onClick={() => toggleVisibility(index)}
                              >
                                <i
                                  className={`fa ${
                                    visibleRows[index]
                                      ? "fa-angle-up"
                                      : "fa-angle-down"
                                  }`}
                                ></i>
                              </div>
                            </th>
                          </tr>
                          {visibleRows[index] && (
                            <tr>
                              <td>
                                <span className="fontdisb">
                                  {lis.correct_count}
                                </span>{" "}
                                Correct
                              </td>
                              <td>
                                <span className="fontdisb1">
                                  {lis.incorrect_count}
                                </span>
                                Incorrect
                              </td>
                              <td>
                                <span className="fontdisb2">
                                  {lis.non_attempt}
                                </span>
                                Skipped
                              </td>
                              <td>
                                <span className="fontdisb3">
                                  {" "}
                                  {(lis.time_spent / 60).toFixed(1)} (min)
                                </span>
                                Time Taken
                              </td>
                            </tr>
                          )}
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div className="tableSection">
                  <h2>Your Rank</h2>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr className="fstth">
                          <th>Rank</th>
                          <th>Name</th>
                          <th>Marks</th>
                          <th>Right</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="fstthh">
                          <th>{getdata?.user_rank}</th>
                          <th>{getdata?.user_name}</th>
                          <th>
                            {(
                              getdata?.correct_count *
                                getdata?.marks_per_question -
                              getdata?.incorrect_count *
                                getdata?.negative_marking
                            ).toFixed(0)}
                          </th>
                          <th>
                            {getdata?.correct_count}
                            <div
                              className="position-relative"
                              onClick={toggleDetailList4}
                            >
                              <i
                                className={`fa ${
                                  isDetailListVisible4
                                    ? "fa-angle-down"
                                    : "fa-angle-up"
                                }`}
                              ></i>
                            </div>
                          </th>
                        </tr>
                        {isDetailListVisible4 && (
                          <tr>
                            <td>
                              <span className="fontdisb">
                                {getdata?.correct_count}
                              </span>{" "}
                              Correct
                            </td>
                            <td>
                              <span className="fontdisb1">
                                {getdata?.incorrect_count}
                              </span>
                              Incorrect
                            </td>
                            <td>
                              <span className="fontdisb2">
                                {getdata?.total_questions - getdata?.attempted}
                              </span>
                              Skipped
                            </td>
                            <td>
                              <span className="fontdisb3">
                                {getdata?.time_spent} (min)
                              </span>
                              Time Taken
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Button onClick={handleList}>
                    {showList ? "Close" : "Expand"}
                  </Button>
                  {showList && (
                    <div style={{ marginTop: "10px" }}>
                      {toplist?.map((getdata, index) => (
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr className="fstth">
                                <th>Profile</th>
                                <th>Name</th>
                                <th>Marks</th>
                                <th>Right</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="fstthh">
                                <th>
                                  {getdata.profile_picture ? (
                                    <Image
                                      src={getdata.profile_picture}
                                      height={36}
                                      width={36}
                                      roundedCircle
                                    />
                                  ) : (
                                    <FaUserCircle size={28} />
                                  )}
                                </th>

                                <th>{getdata?.name}</th>
                                <th>{getdata?.marks}</th>
                                <th>
                                  {getdata?.correct_count}
                                  <div
                                    className="position-relative"
                                    onClick={() => toggleVisibility1(index)}
                                  >
                                    <i
                                      className={`fa ${
                                        visibleRows1[index]
                                          ? "fa-angle-down"
                                          : "fa-angle-up"
                                      }`}
                                    ></i>
                                  </div>
                                </th>
                              </tr>
                              {visibleRows1[index] && (
                                <tr>
                                  <td>
                                    <span className="fontdisb">
                                      {getdata?.correct_count}
                                    </span>{" "}
                                    Correct
                                  </td>
                                  <td>
                                    <span className="fontdisb1">
                                      {getdata?.incorrect_count}
                                    </span>
                                    Incorrect
                                  </td>
                                  <td>
                                    <span className="fontdisb2">
                                      {getdata?.non_attempt}
                                    </span>
                                    Skipped
                                  </td>
                                  <td>
                                    <span className="fontdisb3">
                                      {(getdata?.time_spent / 60).toFixed(1)}{" "}
                                      (min)
                                    </span>
                                    Time Taken
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeaderTab;
