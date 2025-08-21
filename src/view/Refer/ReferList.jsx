import React, { useEffect, useState } from "react";
import axiosInstance from "../../API/axiosConfig";
import { Button, Spin, Typography, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
const { Paragraph, Text } = Typography;

const ReferList = () => {
  const navigate = useNavigate();
  const [refData, setRefData] = useState({});
  const [loading, setLoading] = useState(false);
  const id = sessionStorage.getItem("id");

  const data = refData?.referral_coupon_code;
  const getApiCalled = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.REFER_USER_DETIALS.REFER_USER_LIST,
        { user_id: id }
      );
      if (data.status === true) {
        setRefData(data?.data);
        setLoading(false);
      } else {
        setRefData([]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiCalled();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="referListBG">
      <div className="container">
        <div className="referList">
          {/* <div className="referBnrPart">
            <div className="imgPart">
              <img src="/web/refer-earn/refer-list.png" />
            </div>
            <div className="textPart">
              <h5>Get Free Course</h5>
              <h6>By refer your friends</h6>
            </div>
          </div> */}
          {/* <div className="referTransactiont">
            <div className="referBox">
              <h2>12</h2>
              <p>Referral Tractions</p>
            </div>
            <div className="referBox">
              <h2>4</h2>
              <p>Total Referrals</p>
            </div>
          </div> */}
          {/* <div className="headINg">
            <h6>Get Your Subscription</h6>
          </div> */}
          <div className="reddemSection">
            {/* Get Your Subscription  */}
            {/* <div className="reddemBox">
              <div className="textSec">
                <div>
                  <h4>ULTIMATE LIVE</h4>
                  <p>Validity on : 10 Nov 2025</p>
                </div>
                <div className="btnSec">
                  <button className="validity" onClick={showModal}>
                    Extend Validity<span className="mnth">1 month</span>
                  </button>
                  <Modal
                    className="extendModalPop"
                    title=""
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    // okText="Confirm"
                    // cancelText="Cancel"
                  >
                    <img src="/web/refer-earn/succesful.svg" />
                    <h3>Wow!</h3>
                    <p>You got 1 Month Free of ULTIMATE LIVE</p>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="reddemBox">
              <div className="textSec">
                <div>
                  <h4>DEADLY COMBO</h4>
                  <p>Validity on : 15 Nov 2025</p>
                </div>
                <div className="btnSec">
                  <button className="validity">
                    Extend Validity<span className="mnth">1 month</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="reddemBox">
              <div className="textSec">
                <div>
                  <h4>TEST SERIES</h4>
                  <p>Validity on : 12 Dec 2025</p>
                </div>
                <div className="btnSec">
                  <button className="validity">
                    Extend Validity<span className="mnth">1 month</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="reddemBox">
              <div className="textSec">
                <div>
                  <h4>ULTIMATE LIVE</h4>
                  <p>Validity on : 10 Nov 2025</p>
                </div>
                <div className="btnSec">
                  <button className="validity">
                    Extend Validity<span className="mnth">1 month</span>
                  </button>
                </div>
              </div>
            </div> */}

            {/* Reddemed BOX  */}
            {/* <div className="reddemBox">
              <div className="imgSec">
                <img src="/web/refer-earn/profile.png" />
              </div>
              <div className="textSec">
                <div>
                  <h4>Ankit Kumar</h4>
                  <p className="redeemed">Back To Basics</p>
                </div>
                <div className="btnSec">
                  <Button className="redeemed">Redeemed</Button>
                </div>
              </div>
            </div> */}
            {/* Expired BOX  */}
            {/* <div className="reddemBox expiredBox">
              <div className="imgSec">
                <img src="/web/refer-earn/profile.png" />
              </div>
              <div className="textSec">
                <div>
                  <h4>Ankit Kumar</h4>
                  <p className="expired">Back To Basics</p>
                </div>
                <div className="btnSec">
                  <Button className="expired">Expired</Button>
                </div>
              </div>
            </div> */}

            {/* <div className="reddemBox">
              <div className="imgSec">
                <img src="/web/refer-earn/profile.png" />
              </div>
              <div className="textSec">
                <div>
                  <h4>Neeraj Gupta</h4>
                  <p>Expire on 10/12/2023</p>
                </div>
                <div className="btnSec">
                  <Button>Redeem</Button>
                </div>
              </div>
            </div>
            <div className="reddemBox">
              <div className="imgSec">
                <img src="/web/refer-earn/profile.png" />
              </div>
              <div className="textSec">
                <div>
                  <h4>Sarvesh Tripathi</h4>
                  <p>Expire on 10/12/2023</p>
                </div>
                <div className="btnSec">
                  <Button>Redeem</Button>
                </div>
              </div>
            </div>
            <div className="reddemBox">
              <div className="imgSec">
                <img src="/web/refer-earn/profile.png" />
              </div>
              <div className="textSec">
                <div>
                  <h4>Nagvendra Choudhary</h4>
                  <p>Expire on 10/12/2023</p>
                </div>
                <div className="btnSec">
                  <Button>Redeem</Button>
                </div>
              </div>
            </div>
            <div className="reddemBox">
              <div className="imgSec">
                <img src="/web/refer-earn/profile.png" />
              </div>
              <div className="textSec">
                <div>
                  <h4>Vikas Pandey</h4>
                  <p>Expire on 10/12/2023</p>
                </div>
                <div className="btnSec">
                  <Button>Redeem</Button>
                </div>
              </div>
            </div> */}
          </div>
          <div className="innerRefer">
            <img src={`${window.IMG_BASE_URL}/referByme.svg`} />
            <div className="referText">
              <h5>Get {refData?.validity} Free Course</h5>
              <h6>By refer your friends</h6>

              {refData?.list?.length > 1 && (
                <>
                  <Paragraph
                    copyable={{
                      text: data,
                    }}
                  >
                    {refData?.referral_coupon_code}
                  </Paragraph>

                  <h4>Total referrals:{refData?.total_referral_user}</h4>
                </>
              )}
            </div>
          </div>

          {loading ? (
            <div
              style={{
                width: "50%",
                margin: "100px auto",
                textAlign: "center",
              }}
            >
              <Spin />
            </div>
          ) : (
            <>
              {refData?.list?.length > 1 ? (
                <>
                  {refData?.list?.map((val, i) => (
                    <>
                      <div className="setdatav">
                        <div style={{ padding: "5px" }}>
                          <img src="/images/course.png" width={"60%"} />
                        </div>
                        <div className="setinner">
                          <span>Course Purchased By {val?.name}</span>
                          <span style={{ color: "#007aff" }}>
                            {val?.course}
                          </span>
                        </div>
                        <div className="setchild">
                          <span className="redeem">Redeemed</span>
                        </div>
                      </div>
                    </>
                  ))}
                  <div
                    style={{
                      width: "50%",
                      margin: "auto",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      onClick={() => navigate("/refer-earn")}
                      style={{ margin: "10px" }}
                      type="primary"
                    >
                      Refer Your Friend
                    </Button>
                  </div>
                </>
              ) : (
                <div className="noRecord">
                  <span>Sorry, no records found</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferList;
