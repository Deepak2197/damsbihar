import React, { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/newjs/style.css";
import "../../assets/new_design/css/style.css";
import "../../assets/css/home-page/responsive.css";
import "../../assets/css/shortcodes/shortcodes.css";
import "../../assets/css/mega-menu.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/signIn-pop/style.css";
import "../../assets/css/signIn-pop/responsive.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Myprofile from "./Myprofile";
import { useNavigate } from "react-router-dom";
import Location from "../../modals/LocationModal";
import AllLocation from "../../modals/AllLocationModal";
import Login from "../Login/Login";
import axiosInstance from "../../api/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const credId = sessionStorage.getItem("is_course_register");
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAllLocationModalOpen, setIsAllLocationModalOpen] = useState(false);
  const [selectLoc, setSelectLoc] = useState("");
  const [popularCity, setPopularCity] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [fetchLocationToggle, setFetchLocationToggle] = useState(false);

  const creId = localStorage.getItem("idTocredentials");
  const location = localStorage.getItem("location");
  const aLocation = localStorage.getItem("accurate");

  useEffect(() => {
    if (creId === "0") {
      sessionStorage.removeItem("id");
      navigate("/");
    }
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setIsAuthenticated(true);
    }
  }, [creId]);

  const handlerClose = () => {
    setSignInModalOpen(false);
    setCounter(60);
    setPhoneNumber("");
    setOtpDigits(["", "", "", ""]);
    setOtpModalOpen(false);
    setToggleEmailOrPhone("number");
  };

  const handleSignInSuccess = () => {
    setSignInModalOpen(false);
  };
  const locationFun = async () => {
    try {
      const res = await axiosInstance.post(API_ENDPOINTS.HEADER.GET_CITY, {
        user_id: 4,
      });
      setPopularCity(res?.data?.data?.popularcity);
      setAllCity(res?.data?.data?.allcity);
      setFilterData(res?.data?.data?.allcity);

      setIsLocationModalOpen(true);
    } catch (err) {}
  };
  const currentLocationFetch = () => {
    try {
      setFetchLocationToggle(true);
      navigator?.geolocation?.getCurrentPosition(showPosition);
      // setIsAllLocationModalOpen(false)
    } catch (error) {}
  };

  const showPosition = async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    if (lat !== "" && lon !== "") {
      try {
        const latlon = `latlng=${lat},${lon}&sensor=true&key=AIzaSyCLbStEu7-F25Xw2B46ciyaagAPk-IpYkY`;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?${latlon}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        localStorage.setItem(
          "accurate",
          data.results[2]?.address_components[1]?.long_name
        );
        localStorage.setItem("location", data.results[0]?.formatted_address);

        // toast.success(
        //   `You current location is ${data.results[2]?.address_components[1]?.long_name}`
        // );
        setIsAllLocationModalOpen(false);
        setFetchLocationToggle(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setFetchLocationToggle(false);
      }
    }
  };

  useEffect(() => {
    currentLocationFetch();
  }, []);

  useEffect(() => {
    if (window.location.hostname == "damsdelhi.com") {
      window.location.href =
        "https://www.damsdelhi.com" + window.location.pathname;
    }

    if (window.location.hostname == "damsdelhi.com") {
      window.location.href =
        "https://www.damsdelhi.com" + window.location.pathname;
    }
  }, []);

  {
    /* Switch to new and old */
  }

  const [isSwitchedToNew, setIsSwitchedToNew] = useState(false);
  useEffect(() => {
    if (window.location.pathname === "/course-acess") {
      setIsSwitchedToNew(true);
    } else {
      setIsSwitchedToNew(false);
    }
  }, []);

  const handleSwitchClick = () => {
    if (!isSwitchedToNew) {
      window.location.href = "/course-acess";
    } else {
      window.location.href = "/";
    }

    setIsSwitchedToNew(!isSwitchedToNew);
  };
  {
    /* Switch to new and old end */
  }
  return (
    <>
      <header className="headerdata">
        <ToastContainer autoClose={2000} />
        {/* <div className="sticky-header navbar-expand-lg"> */}
        {/* <div className="menu-bar clearfix headbrd topg"> */}
        <div className="container">
          <div className="headerTop">
            <div className="Logosec">
              <Link to={!creId ? "/" : "/"}>
                {/* <img
                  src={`${window.IMG_BASE_URL}/login_logo.png`}
                  loading="lazy"
                  alt="logo"
                  className="loginlogo"
                /> */}
                <img src="/logo.png" />
              </Link>
            </div>
            <div className="menu-links">
              {/* <div className="nav-logo menu-logo">
                    <Link to={"/"}>
                      <img src={logo} loading="lazy" alt="icon image" />
                    </Link>
                  </div> */}

              <ul className="nav">
                <li
                  onClick={locationFun}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link to={"/"}>
                    <img
                      src={`${window.IMG_BASE_URL}/location.svg`}
                      className="locate-img-b"
                    />
                    <span className="select_city">
                      {location ? location.slice(0, 30) : "Noida"}
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://apps.apple.com/us/app/dams-emedicoz-neet-pg-fmge/id1263112084"
                    target="_blank"
                  >
                    <img
                      className="store"
                      src={`${window.IMG_BASE_URL}/appStore.svg`}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.emedicoz.app&amp;hl=en"
                    target="_blank"
                  >
                    <img
                      className="store"
                      src={`${window.IMG_BASE_URL}/googlePlay.svg`}
                    />
                  </a>
                </li>
                {!isAuthenticated || !creId ? (
                  <>
                    <li className="loginbtnSignupbtn">
                      <a onClick={() => setSignInModalOpen(true)}>Sign in</a>
                    </li>
                  </>
                ) : (
                  <Myprofile setIsAuthenticated={setIsAuthenticated} />
                )}
                {/* Switch to new and old */}
                {/* {!isAuthenticated && (
                  <li className="switchToNew">
                    <button className="btn" onClick={handleSwitchClick}>
                      {isSwitchedToNew ? "Switch To Old" : "Switch To New"}
                    </button>
                  </li>
                )} */}
                {/* Switch to new and end */}
              </ul>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </header>
      {/* Sign in popup */}
      {isSignInModalOpen && (
        <Login
          handlerClose={handlerClose}
          setIsAuthenticated={setIsAuthenticated}
          handleSignInSuccess={handleSignInSuccess}
          setSignInModalOpen={setSignInModalOpen}
        />
      )}

      {isLocationModalOpen && (
        <Location
          setIsLocationModalOpen={setIsLocationModalOpen}
          isLocationModalOpen={isLocationModalOpen}
          setIsAllLocationModalOpen={setIsAllLocationModalOpen}
          popularCity={popularCity}
          setSelectLoc={setSelectLoc}
        />
      )}

      {isAllLocationModalOpen && (
        <AllLocation
          setIsAllLocationModalOpen={setIsAllLocationModalOpen}
          isAllLocationModalOpen={isAllLocationModalOpen}
          currentLocationFetch={currentLocationFetch}
          fetchLocationToggle={fetchLocationToggle}
          allLoc={allCity}
          setSelectLoc={setSelectLoc}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      )}
    </>
  );
};

export default Header;
