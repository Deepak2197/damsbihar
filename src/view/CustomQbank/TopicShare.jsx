import React, { useEffect, useState } from "react";
import axiosInstance from "../../API/axiosConfig";
import { Link, useParams } from "react-router-dom";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
const TopicShare = () => {
  const user_id = sessionStorage.getItem("id");
  const { id } = useParams();
  const [testdata, settestdata] = useState(null);
  const [searchterm, setsearch] = useState(null);

  const [users, setusers] = useState([]);
  const gettestdata = async () => {
    const response = await axiosInstance.post(
      `/v2_data_model/get_test_series_with_id_app_new`,
      { user_id: user_id, test_id: id }
    );
    settestdata(response?.data?.data?.basic_info);
  };
  const getusers = async (searchttext) => {
    const response = await axiosInstance.post(
      `/v2_data_model/get_active_user`,
      { user_id: user_id, test_id: id, searchkey: searchttext, course_id: 385 }
    );
    setusers(response?.data?.data);
  };
  useEffect(() => {
    gettestdata();
  }, []);

  useEffect(() => {
    getusers(searchterm);
  }, [searchterm]);

  const handlechallenge = async (gid) => {
    const res = await axiosInstance.post(API_ENDPOINTS.CUSTOM_QBANK.INVITE_CUSTOM_QBANK, {
      test_id: id,
      invited_by: user_id,
      invited_to: gid,
    });

    getusers(searchterm);
  };

  return (
    <div className="topicShare">
      <div className="container">
        <div className="joinCustomQbank">
          <div className="row">
            <div className="col-md-12">
              <div className="liveChallenge">
                <div className="startingSoon">
                  {/* <p>Live Challenge Starting Soon<span className='time'>15m 41s</span></p> */}
                  <Link to={"/attemped-history"}>
                    <button className="btn custonBtn">Join Custom QBank</button>
                  </Link>
                </div>
                <div
                  className="fulllBox"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="topicBox">
                    <div className="imgPart">
                      <img
                        src={`${window.IMG_BASE_URL}/custom_qbank/anatomy.svg`}
                      />
                    </div>
                    <div className="textPart">
                      <p>Topic</p>
                      <h3>{testdata?.test_series_name}</h3>
                    </div>
                  </div>
                  <div className="topicBox">
                    <div className="imgPartNew">
                      <img
                        src={`${window.IMG_BASE_URL}/custom_qbank/question.svg`}
                      />
                    </div>
                    <div className="textPart">
                      <p>Total questions</p>
                      <h3>{testdata?.total_questions}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="searchSec position-relative">
                <div className="form-group has-search">
                  <span className="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange={(e) => setsearch(e.target.value)}
                  />
                </div>
                <div className="cList">
                  <img src={`${window.IMG_BASE_URL}/custom_qbank/clist.svg`} />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="Players">
                <h4>Available Player</h4>
              </div>
            </div>
            <div className="col-md-12">
              <div className="playerScroll">
                {users?.map((data, i) => (
                  <div className="availabelPlayer">
                    <p>
                      <img
                        className="profile"
                        src={
                          data?.profile_picture == ""
                            ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s`
                            : data?.profile_picture
                        }
                      />
                      {data?.name}
                    </p>
                    {data?.invited == 0 ? (
                      <button
                        className="btn challengeBtn"
                        style={{ backgroundColor: "#F5F5F5", color: "#757575" }}
                        onClick={() => handlechallenge(data?.id)}
                      >
                        Challenge
                      </button>
                    ) : (
                      <button
                        className="btn challengeBtn"
                        style={{ cursor: "default" }}
                      >
                        Invited
                      </button>
                    )}
                  </div>
                ))}
                {/* <div className='butnPart'>
                            <button className='btn attempt'>Attempt Now</button>
                            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopicShare;
