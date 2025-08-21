import React, { useState, useRef, useEffect } from "react";
import "../../assets/newjs/style.css";
import "../../assets/new_design/css/style.css";
import "../../assets/css/home-page/responsive.css";
import "../../assets/css/shortcodes/shortcodes.css";
import "../../assets/css/mega-menu.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../API/axiosConfig";
import { clearCart } from "../../network/cartSlice";
import { LogoutOutlined } from "@ant-design/icons";
import { clearCatId } from "../../network/testSlice";
function Myprofile({ setIsAuthenticated }) {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState(null);
  const userid = sessionStorage.getItem("id");
  const usersData = sessionStorage.getItem("userData");
  const userpin = userData ? JSON.parse(usersData).user_pin : null;
  const navigate = useNavigate();
  const [targeturl, settargeturl] = useState(null);
  const sess_id = sessionStorage.getItem("id");
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const getCartData = async () => {
    try {
      const res = await axiosInstance.post(API_ENDPOINTS.MEDIMART.GET_USER_CART_DATA, {
        user_id: userid,
      });
      setCartData(res?.data?.data?.list);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const closeNav = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const resdata = sessionStorage.getItem("userData");
    const userDataObj = JSON.parse(resdata);
    sessionStorage.setItem("jwt_token", userDataObj.jwt_token);
    setUserData(userDataObj);
  }, []);

  const handleLogout = async () => {
    try {
      const { id, device_tokken } = userData;
      // await axiosInstance.post(
      //   `/v2_data_model/logout_old_deveices`,
      //   {
      //     user_id: id,
      //   }
      // );
      sessionStorage.clear();
      localStorage.clear();
      dispatch(clearCart());
      dispatch(clearCatId());
      setIsAuthenticated(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const openNav = () => {
    setIsOpen(true);
  };

  const handlerBookSale = () => {
    navigate("/ebooksale");
    closeNav();
  };

  const handlerPublishBook = () => {
    navigate("/publishbook");
    closeNav();
  };
  const handlerOval = () => {
    navigate("/podcast");
    closeNav();
  };
  const handlerMyCourse = () => {
    navigate("/my-course");
    closeNav();
  };
  const handlerMyScorecard = () => {
    navigate(`/score-card/${userid}`);
    closeNav();
  };
  const handlerBookmark = () => {
    navigate("/bookmark");
    closeNav();
  };
  const handlerMyAddress = () => {
    navigate("/myaddress");
    closeNav();
  };
  const handlerMyOrder = () => {
    navigate("/myorder");
    closeNav();
  };
  const handlerMyPayment = () => {
    navigate("/my-payment");
    closeNav();
  };
  const handlerStore = () => {
    navigate("/medimart");
    closeNav();
  };
  const handlerCbt = () => {
    navigate("/cbt");
    closeNav();
  };
  const handlerEvent = () => {
    navigate("/event");
    closeNav();
  };
  const handlerDoc = () => {
    navigate("/all-lounge");
    closeNav();
  };
  const handlerMyAtt = () => {
    navigate("/attendance");
    closeNav();
  };

  const handleCash = () => {
    navigate("/cashrefund");
    closeNav();
  };
  const handleEarn = () => {
    navigate("/refer-earn");
    closeNav();
  };

  const handleHelp = () => {
    navigate("/help-and-support");
    closeNav();
  };
  const handlerProfile = () => {
    navigate(`/profilenew/${userid}/${userpin}`);
    closeNav();
  };
  const handleEarnList = () => {
    navigate("/refer-list");
    closeNav();
  };

  const handleJoin = () => {
    navigate("/join-affiliate");
    closeNav();
  };

  const handlerMyStudy = () => {
    navigate("/my-study");
    closeNav();
  };

  //default menu(side nav) open when user login
  useEffect(() => {
    const isFirstLogin = sessionStorage.getItem("menuopen");
    const hasMenuBeenShown = sessionStorage.getItem("menuShown");

    // Only open menu if it's first login and hasn't been shown before
    if (userData && isFirstLogin === "1" && hasMenuBeenShown !== "true") {
      setIsOpen(true);
      sessionStorage.setItem("menuShown", "true");
      sessionStorage.removeItem("menuopen");
    }
  }, [userData]);
  // default menu open end
  const handlerCheck = () => {
    settargeturl(`/raise-query/${userid}DTweb`);
    if (sess_id) {
      navigate(`/raise-query/${userid}DTweb`);
    } else {
      setSignInModalOpen(true);
    }
  };

  return (
    <>
      <li>
        <div id="main">
          <span
            className="humburgerIcon"
            onClick={openNav}
            style={{ cursor: "pointer" }}
          >
            <img
              src={
                // userData?.profile_picture
                //   ? userData.profile_picture
                //   :

                "https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/icons.png"
              }
              className="onclck-prfl-a"
            />
            {/* &nbsp; <em className="caret fa fa-caret-down"></em> */}
          </span>
        </div>
      </li>

      {cart.length > 0 && (
        <li>
          <Link to={"/addToCart"}>
            <img
              src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/cart.svg"
              className="locate-img-b"
            />
          </Link>
          <span className="wcart" id="cart_length">
            {cart.length}
          </span>
        </li>
      )}
      <li>
        <div onClick={handlerCheck} className="techdata">
          <img style={{cursor:'pointer'}}
            src={`${window.IMG_BASE_URL}/emdpublic/etcimg/technical-support.svg`}
          />
        </div>
        <Link to={`/raise-query/${userid}DTweb`}></Link>
      </li>
      {isOpen && (
        <div
          ref={profileRef}
          id="mySidenav"
          className="sidenav w-340"
          style={{ width: "400px" }}
          // onMouseLeave={closeNav}
        >
          <div className="profileNewSection">
            <a className="closeIcon" onClick={() => setIsOpen(false)}>
              ×
            </a>

            <div className="new-mega-menu">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 lp1">
                  <div className="new-profile-name">
                    <h1>{userData?.name}</h1>
                    <ul>
                      <li>{`${userData?.c_code} ${userData?.mobile}`}</li>
                      <li>{userData?.email}</li>
                    </ul>
                    <h3 style={{cursor:'pointer'}} onClick={handlerProfile}>
                      Edit Profile <em class="fa fa-angle-right"></em>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="college-detail"
            id="divMsg"
            style={{ display: "none" }}
          >
            <h2>Find Your College Details</h2>
            <form method="post">
              <div className="form-group">
                <em className="fa fa-university"></em>{" "}
                <label for="">College Name</label>
                <select className="form-control" id="college"></select>
              </div>
              <div className="form-group">
                <em className="fa fa-globe"></em>
                <label for="">Degree</label>
                <select className="form-control" id="degree">
                  <option>Select Degree</option>
                  <option data-degree_program="Others">Others</option>
                  <option data-degree_program="AIIMS PG ">AIIMS PG </option>
                  <option data-degree_program="PGI Chandigarh">
                    PGI Chandigarh
                  </option>
                  <option data-degree_program="JIMPER PG">JIMPER PG</option>
                  <option data-degree_program="NIMHANS">NIMHANS</option>
                  <option data-degree_program="NEET PG">NEET PG</option>
                </select>
              </div>
              <div className="form-group">
                <em className="fa fa-calendar"></em>
                <label for="">Year</label>
                <select className="form-control" id="year">
                  <option>Select Year</option>
                  <option data-year="2020">2020</option>
                  <option data-year="2021">2021</option>
                  <option data-year="2022">2022</option>
                  <option data-year="2023">2023</option>
                  <option data-year="2024">2024</option>
                </select>
              </div>
              <button
                type="button"
                className="btn subbtn text-center"
                onclick="profile_update()"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="backNewMenuColor">
            <div className="quick-links">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="quick-links-txt">
                    <h2>Categories</h2>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="quick-links-box">
                    {/* <div
                      className="menunewSection"
                      onClick={handlerPublishBook}
                    >
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/pubbooks.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          Publish Book{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div> */}
                    {/* <div className="menunewSection" onClick={handlerBookSale}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/bsale.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          My Product Sales{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div> */}
                    <div className="menunewSection" onClick={handlerStore}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/medimart.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          MediMart{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div className="menunewSection" onClick={handlerEvent}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/event.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          Event{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div className="menunewSection" onClick={handlerCbt}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/cbt.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          CBT{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div className="menunewSection" onClick={handlerOval}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/podcast.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          Podcast{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>

                    <div className="menunewSection" onClick={handlerDoc}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/dlounge.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          Doctor Lounge{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                    {/* <div className="menunewSection" onClick={handlerProfile}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/profile.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          Profile{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="quick-links">
              <div className="row brdr-btm">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="quick-links-txt">
                    <h2>Information</h2>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="quick-links-box">
                    <div className="menunewSection" onClick={handlerMyCourse}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/course.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          My Study{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                    {/* <div className="menunewSection" onClick={handlerMyStudy}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/study.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          My Study{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div> */}
                    {/* <div
                      className="menunewSection"
                      onClick={handlerMyScorecard}
                    >
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/score.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          My Score Card{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div> */}
                    <div className="menunewSection" onClick={handlerBookmark}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/bookmark.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          My Bookmark{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div className="menunewSection" onClick={handlerMyAddress}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/address.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          My Address{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div className="menunewSection" onClick={handlerMyOrder}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/order.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          My Orders{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div className="menunewSection" onClick={handlerMyPayment}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/payment.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          My Payments{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div className="menunewSection" onClick={handlerMyAtt}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/attendance.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          My Attendance{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div className="menunewSection" onClick={handleCash}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/wallet.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          Wallet{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div className="menunewSection" onClick={handleEarn}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/refer.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          Refer & Earn{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div className="menunewSection" onClick={handleEarnList}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/userdetail.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          Refer User Details{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div className="menunewSection" onClick={handleJoin}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/join.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          Join Affiliate{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="quick-links">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="quick-links-txt">
                    <h2>More</h2>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="quick-links-box">
                    <div className="menunewSection" onClick={handleHelp}>
                      <div className="imegSec">
                        <div className="imagPart">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/support.svg`}
                          />
                        </div>
                      </div>
                      <div className="textPart">
                        <h2>
                          Help & Support{" "}
                          <span className="">
                            <em class="fa fa-angle-right"></em>
                          </span>
                        </h2>
                      </div>
                    </div>
                    {userData && (
                      <div className="menunewSection" onClick={handleLogout}>
                        <div className="imegSec">
                          <div className="imagPart">
                            {/* <img
                              src={`${window.IMG_BASE_URL}/revamp-web/logout.svg`}
                            /> */}
                            <LogoutOutlined />
                          </div>
                        </div>
                        <div className="textPart">
                          <h2>Log Out</h2>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Myprofile;
