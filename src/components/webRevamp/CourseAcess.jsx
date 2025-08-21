import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DoctorLounge from "../DoctorLounge/DoctorLounge";
import LatestNewsArticles from "../LatestNews/LatestNewsArticles";
import axiosInstance from "../../API/axiosConfig";
import Dailyquiz from "../DailyQuiz/Dailyquiz";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Login from "../Login/Login";
import "../../components/header/responsive.css";
import { Modal, Carousel } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Ovalpodcast from "../../view/OvalwindowPodcast/Ovalpodcast";
import Podcast from "../podcast/Podcast";
import Opportunity from "../opportunity/Opportunity";
import Opportunityhome from "../opportunity/Opportunityhome";
import Dailycases from "../dailycases/Dailycases";
import { addCatId, addCourseId } from "../../network/testSlice";
import {
  addproductId,
  addproductTitle,
  addsubId,
} from "../../network/medimartSlice";
import News from "../LatestNews/News";
import Topperszone from "../ToppersZone/ToppersZone";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
import ImageBanner from "./coursePlan/ImageBanner";
const CourseAcess = ({ setIsAuthenticated }) => {
  const { catId } = useSelector((state) => state.testseries);
  const location = useLocation();
  const userId = sessionStorage.getItem("id") || "4";
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [dailyCases, setDailyCases] = useState([]);

  const [allData, setAllData] = useState({
    videoData: null,
    homeData: null,
    inspire: null,
    dailyQuiz: [],
    medimartCt: [],
    podcast: [],
  });
  const quizofdayID = allData?.dailyQuiz?.[0]?.id || null;
  const contentStyle = {
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    margin: 0,
  };

  const slideStyle = {
    height: "160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#364d79",
  };

  const [medData, setMedData] = useState([]);
  const [qizData, setQuiData] = useState();
  const [banData, setBanData] = useState([]);
  const [filterMedData, setFilterMedData] = useState([]);
  const [tabsData, setTabsData] = useState([]);
  const [toggleMediMart, setToggleMediMart] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isTabsLoading, setIsTabsLoading] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isCategoryid, setSelectedCourseId] = useState(false);
  const [isCategoryLoading, setCategoryLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [quizofday, setQuizofday] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCatID, setSelectedCourseID] = useState("");
  const [selecat, setSelectedTabCat] = useState("");
  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const selectedCategory = userData?.SelectedCat || {};
  const [dailyCasesData, setDailyCasesData] = useState(null);
  const [NewsArticle, setNewsArticle] = useState(null);
  // Fetch initial data
  const fetchInitialData = useCallback(async () => {
    try {
      setIsInitialLoading(true);

      const [videoRes, homeRes, bannerRes, podcastRes, tabsRes] =
        await Promise.all([
          axiosInstance.post(API_ENDPOINTS.HOMEPAGE_INDEX.WEB_VIDEO, {
            user_id: userId,
          }),

          axiosInstance.post(API_ENDPOINTS.HOMEPAGE_INDEX.HOMESCREEN_MYPLANE_V2, {
            user_id: userId,
            //cat_id: selectedCatID || selectedCategory?.id || "",
            cat_id: catId || selectedCatID || selectedCategory?.id || "",
          }),
          axiosInstance.post(API_ENDPOINTS.HOMEPAGE_INDEX.GET_BANNER),
          axiosInstance.post(API_ENDPOINTS.PODCAST.DATA, {
            user_id: userId,
          }),
          axiosInstance.post(API_ENDPOINTS.COURSEACESS_HOMEPAGE.GET_HOMESCREEN_TAB, {
            user_id: userId,
            cat_id: selectedCategory?.id,
          }),
        ]);
      setQuizofday(homeRes?.data?.data?.quizofday);
      setAllData({
        videoData: videoRes?.data?.data,
        homeData: homeRes?.data?.data,
        inspire: bannerRes?.data?.data,
        dailyQuiz: homeRes?.data?.data?.daily_quiz || [],
        medimartCt: homeRes?.data?.data?.ecommerce_cat_list || [],
        podcast: podcastRes?.data?.data?.my_podcast || [],
      });
      setMedData(homeRes?.data?.data?.ecommerce_cat_list.slice(0, 9) || []);
      setQuiData(homeRes?.data?.data?.quizofday?.question_bank[0]?.question);
      setBanData(homeRes?.data?.data?.banner);
      setFilterMedData(homeRes?.data?.data?.ecommerce_cat_list || []);
      setTabsData(tabsRes?.data?.data?.course_list || []);
      setSelectedCourse(selectedCategory?.name || "");
      setSelectedCourseID(selectedCategory?.id || "");
      setSelectedTabCat(selectedCategory?.id || "");
    } catch (error) {
      console.error("Error fetching initial data:", error);
      //toast.error("Failed to load initial data. Please try again.");
    } finally {
      setIsInitialLoading(false);
    }
  }, [userId, selectedCategory?.id]);

  // Fetch categories for modal
  const fetchCategories = useCallback(async () => {
    try {
      setCategoryLoading(true);
      const res = await axiosInstance.post(
        API_ENDPOINTS.COURSEACESS_HOMEPAGE.GET_HOMESCREEN_CATEGORYDATA,
        {
          stream_id: 1,
          user_id: userId,
        }
      );
      const categoryData = res?.data?.data || [];
      setCategories(categoryData);
      if (!categoryData.length) {
        toast.warn("No categories available. Please try again later.");
        setCategoryModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories.");
      setCategoryModalOpen(true);
    } finally {
      setCategoryLoading(false);
    }
  }, [userId]);

  // Check for new user and open category modal only if no category is selected
  useEffect(() => {
    const initialize = async () => {
      await fetchInitialData();
      // Open category modal only if no category is selected
      if (!selectedCategory?.name) {
        await fetchCategories();
        setCategoryModalOpen(true);
      }
    };
    initialize();
  }, [fetchInitialData, fetchCategories, selectedCategory?.name]);

  const fetchCategoryData = useCallback(
    async (tabType) => {
      try {
        setIsTabsLoading(true);

        if (tabType === "test" || tabType === "qbank") {
          const courseType = tabType === "test" ? "2" : "3";
          const course = tabsData.find(
            (course) => course.course_type === courseType
          );
          const courseId = course?.course_id;

          if (courseId) {
            return courseId;
          } else {
            toast.warn(
              `No course with course_type ${courseType} available for ${tabType}.`
            );
            return selectedCategory?.id || null;
          }
        }

        if (tabType === "video" || tabType === "note") {
          const res = await axiosInstance.post(
            API_ENDPOINTS.COURSEACESS_HOMEPAGE.GET_HOMESCREEN_CATEGORYDATA,
            {
              stream_id: 1,
              user_id: userId,
            }
          );
          const categoryList = res?.data?.data || [];

          const selectedCat = categoryList.find(
            (cat) =>
              cat.name === selectedCourse || cat.id === selectedCategory?.id
          );
          const categoryId = selectedCat?.id;

          if (categoryId) {
            const courseList = selectedCat.course_list || [];
            let courseId;

            if (tabType === "video") {
              const videoCourse = courseList.find(
                (course) =>
                  course.course_type === "1" || course.course_type === "6"
              );
              courseId = videoCourse?.course_id;
            } else if (tabType === "note") {
              const noteCourse = courseList.find(
                (course) => course.course_type === "1"
              );
              courseId = noteCourse?.course_id;
            }

            if (courseId) {
              const navigationData = {
                categoryId,
                id: courseId,
              };

              if (tabType === "video") {
                toast.info("This feature is available in app");
              } else if (tabType === "note") {
                toast.info("This feature is available in app");
              }

              return navigationData;
            } else {
              toast.warn(`No ${tabType} course available for this category.`);
              return null;
            }
          } else {
            toast.error("Selected category not found in response.");
            return null;
          }
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
        toast.error("Failed to fetch category data.");
        return null;
      } finally {
        setIsTabsLoading(false);
      }
    },
    [userId, selectedCourse, selectedCategory?.id, tabsData, navigate]
  );

  // Tab visibility logic
  const tabConditions = {
    video: tabsData.some(
      (course) =>
        (course.course_type === "1" && course.is_live === "1") ||
        course.course_type === "6"
    ),
    note: tabsData.some(
      (course) => course.course_type === "1" && course.is_nots === "1"
    ),
    test: tabsData.some((course) => course.course_type === "2"),
    qbank: tabsData.some((course) => course.course_type === "3"),
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const handleMoreMediMart = () => {
    setToggleMediMart(true);
    setMedData(filterMedData);
  };

  const handleMinMediMart = () => {
    setToggleMediMart(false);
    setMedData(filterMedData.slice(0, 9));
  };

  const handleReferNow = () => {
    if (sessionStorage.getItem("id")) {
      navigate("/refer-earn");
      window.location.reload();
    } else {
      setSignInModalOpen(true);
    }
  };

  const handleSignInClose = () => setSignInModalOpen(false);
  const handleSignInSuccess = () => setSignInModalOpen(false);

  const handleCategorySelect = async (course) => {
    // Update sessionStorage and local state
    const updatedData = {
      ...userData,
      SelectedCat: { id: course.id, name: course.name },
    };
    sessionStorage.setItem("userData", JSON.stringify(updatedData));
    setSelectedCourse(course.name);
    setSelectedCourseId(course.id);

    // Dispatch to update Redux store
    dispatch(addCatId(course.id)); // Corrected spelling from dispach to dispatch

    // Close the category modal
    setCategoryModalOpen(false);

    try {
      const tabsRes = await axiosInstance.post(
        API_ENDPOINTS.COURSEACESS_HOMEPAGE.GET_HOMESCREEN_TAB,
        {
          user_id: userId,
          cat_id: course.id,
        }
      );
      setTabsData(tabsRes?.data?.data?.course_list || []);
    } catch (error) {
      console.error("Error refreshing tabs data:", error);
      toast.error("Failed to refresh course data.");
      // Optional: Revert Redux state if API call fails
      // dispatch(clearCatId());
    }
  };
  const dispatch = useDispatch(); // Get dispatch function
  const fetchNews = async () => {
    const newsArticle = await axiosInstance.post(
      API_ENDPOINTS.HOMEPAGE_INDEX.GET_HOME_NEWS_AI_NEWSARTICLE_V2,
      {
        user_id: userId,
      }
    );
    setNewsArticle(newsArticle?.data?.data);
  };

  useEffect(() => {
    fetchNews();
  }, []);
  const handleGoProClick = async () => {
    const catId = selectedCategory?.id;
    if (!catId) {
      toast.error("No category selected. Please choose a category.");
      setCategoryModalOpen(true);
      await fetchCategories();
      return;
    }

    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.COURSEACESS_HOMEPAGE.GET_HOMESCREEN_TAB,
        {
          user_id: userId,
          cat_id: catId,
        }
      );

      const planType = response?.data?.data?.plan_type;
      if (planType === "2") {
        navigate("/course_category", { state: { courseId: catId } });
      } else {
        navigate("/courses", { state: { courseId: catId } });
      }
    } catch (error) {
      console.error("Error fetching plan_type from GetHomeScreenTab:", error);
      toast.error("Failed to fetch plan details. Please try again.");
    }
  };

  const handleTabClick = async (tabType) => {
    if (!selectedCourse) {
      toast.error("Please select a category first.");
      setCategoryModalOpen(true);
      await fetchCategories();
      return;
    }
    const id = await fetchCategoryData(tabType);
    if (id) {
      if (tabType === "test") {
        dispatch(addCourseId(id));
        navigate("/test-series", {
          state: {
            id: id,
            isCategoryid: selecat || isCategoryid,
          },
        });
      } else if (tabType === "qbank") {
        dispatch(addCourseId(id));
        navigate("/my-course/course-dqb", {
          state: {
            id: id,
            isCategoryid: selecat ?? isCategoryid,
          },
        });
      }
    }
  };

  const renderTabs = () =>
    isTabsLoading ? (
      <div style={{ display: "flex", gap: 20 }}>
        <Skeleton width={80} height={80} count={3} />
      </div>
    ) : (
      <>
        {tabConditions.video && (
          <div
            className="tabpart"
            style={{ cursor: "pointer" }}
            onClick={() => handleTabClick("video")}
          >
            <div className="tab">
              <img
                src={`${window.IMG_BASE_URL}/revamp-web/videos.svg`}
                alt="videos"
                className="newmg"
                loading="lazy"
              />
            </div>
            <p>Videos</p>
          </div>
        )}
        {tabConditions.note && (
          <div
            className="tabpart"
            style={{ cursor: "pointer" }}
            onClick={() => handleTabClick("note")}
          >
            <div className="tab">
              <img
                src={`${window.IMG_BASE_URL}/revamp-web/tests.svg`}
                alt="notes"
                className="newmg"
                loading="lazy"
              />
            </div>
            <p>Notes</p>
          </div>
        )}
        {tabConditions.test && (
          <div
            className="tabpart"
            style={{ cursor: "pointer" }}
            onClick={() => handleTabClick("test")}
          >
            <div className="tab">
              <img
                src={`${window.IMG_BASE_URL}/revamp-web/tests.svg`}
                alt="tests"
                className="newmg"
                loading="lazy"
              />
            </div>
            <p>Tests</p>
          </div>
        )}
        {tabConditions.qbank && (
          <div
            className="tabpart"
            style={{ cursor: "pointer" }}
            onClick={() => handleTabClick("qbank")}
          >
            <div className="tab">
              <img
                src={`${window.IMG_BASE_URL}/revamp-web/qbanks.svg`}
                alt="qbanks"
                className="newmg"
                loading="lazy"
              />
            </div>
            <p>QBank</p>
          </div>
        )}
      </>
    );

  const handleClick = (subId) => {
    dispatch(addsubId(subId));
    //navigate("/medimart/damspublication", { state: { id } });
    navigate("/medimart/damspublication");
  };

  const handleNavigation = () => {
    navigate(`/raise-query/${userId}DTweb`);
  };

  const handleClickQuiz = (id) => {
    navigate("/all-daily-quiz", { state: { id, selectedCatID } });
  };
  const handleStart = (id) => {
    try {
      const width = screen.availWidth;
      const height = screen.availHeight;
      const left = 0;
      const top = 0;
      const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;
      window.open(`/test-home/dqb/${id}s${quizofdayID}`, "_blank", features);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchDailyCases = async () => {
      try {
        const response = await axiosInstance.post(
          API_ENDPOINTS.COURSEACESS_HOMEPAGE.GET_HOMESCREEN_CATEGORYDATA,
          { user_id: userId }
        );
        const responseData = response.data.data;
        if (Array.isArray(responseData) && responseData.length > 0) {
          setDailyCasesData(responseData);
        } else {
          setDailyCasesData(null);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchDailyCases();
  }, []);

  const filterArticle = () => {
    const articleData = NewsArticle?.filter((item) => item.type == "articles");
    return (
      <LatestNewsArticles
        newzData={articleData}
        title="Articles"
        breadValue={3}
      ></LatestNewsArticles>
    );
  };

  const filterNews = () => {
    const newsData = NewsArticle?.filter((item) => item.type == "news");
    const breadValue = 2;
    return <News newzData={newsData} breadValue={breadValue}></News>;
  };

  useEffect(() => {
    dispatch(addCatId(selectedCategory.id));
    // dispatch(addCourseId(id));
  }, []);

  return (
    <div className="">
      {/* Breadcrumb */}
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            {isInitialLoading ? (
              <Skeleton width={200} height={20} />
            ) : (
              <ul className="list-inline">
                <li>
                  <a href="/">Home</a>
                </li>
                <li className="btNofSet" style={{ position: "relative" }}>
                  <button
                    className="btn SelectCat"
                    onClick={async () => {
                      setCategoryModalOpen(true);
                      await fetchCategories();
                    }}
                  >
                    {selectedCourse || "Select a Category"}
                    <ArrowDownOutlined style={{ marginLeft: "10px" }} />
                  </button>
                  {/* <span className="arrowsign">
                      <ArrowDownOutlined />
                    </span> */}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Category Modal */}
      <Modal
        footer={null}
        open={isCategoryModalOpen}
        onCancel={() => setCategoryModalOpen(false)}
      >
        {isCategoryLoading ? (
          <Skeleton count={5} height={40} />
        ) : categories.length === 0 ? (
          <p>No categories available. Please try again later.</p>
        ) : (
          <div className="educationDetails coUrse">
            <div className="reqDetails">
              <p>Please select your Course</p>
              <div className="yourCourse">
                {categories.map((course) => (
                  <div className="inputSection" key={course.id}>
                    <p>
                      <input
                        type="radio"
                        id={`course-${course.id}`}
                        name="radio-group"
                        value={course.name}
                        onChange={() => handleCategorySelect(course)}
                        checked={selectedCourse === course.name}
                      />
                      <label htmlFor={`course-${course.id}`}>
                        <span>{course.name}</span>
                      </label>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Main Content */}
      <div className="container">
        <div className="neetPGnext">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              {isInitialLoading ? (
                <div>
                  <Skeleton height={100} style={{ marginBottom: 20 }} />
                  <div className="testSec" style={{ display: "flex", gap: 20 }}>
                    <Skeleton width={80} height={80} count={3} />
                  </div>
                  <Skeleton height={20} width={150} style={{ marginTop: 20 }} />
                  <Skeleton height={60} style={{ marginBottom: 20 }} />
                  <Skeleton height={20} width={150} />
                  <div style={{ display: "flex", gap: 20 }}>
                    <Skeleton width={80} height={80} count={3} />
                  </div>
                  <Skeleton height={20} width={150} style={{ marginTop: 20 }} />
                  <div style={{ display: "flex", gap: 20 }}>
                    <Skeleton width={150} height={100} count={3} />
                  </div>
                  <Skeleton height={100} style={{ marginTop: 20 }} />
                  <Skeleton height={50} />
                </div>
              ) : (
                <>
                  {/* Banner */}
                  <div className="bannerSec">
                    <div className="leftSide">
                      <p>
                        You have <span>free</span> access
                        <span className="streamSpan">{selectedCourse}</span>
                      </p>
                    </div>
                    <div className="rytSide">
                      <button className="btn" onClick={handleGoProClick}>
                        Get <span className="premium">Premium</span> Access
                        <strong>Go Pro</strong>
                      </button>
                    </div>
                  </div>
                  <div className="SlideNewPart">
                    <ImageBanner banData={banData}/>
                  </div>

                  {/* Tabs */}
                  <div className="testSec">{renderTabs()}</div>

                  {/* Quiz */}

                  {quizofday && (
                    <div className="qUizofDay">
                      <div className="setFlextHeding">
                        <h2>Quiz of the day</h2>
                        <a
                          href=""
                          onClick={() => handleClickQuiz(userId, selectedCatID)}
                        >
                          View All
                        </a>
                      </div>
                      <div className="textPart">
                        <h2
                          dangerouslySetInnerHTML={{
                            __html: qizData?.split("</p>")[0],
                          }}
                        />
                        {qizData?.includes("src=") ? (
                          <img
                            src={qizData.match(/src="([^"]+)"/)?.[1]}
                            alt="Incision"
                          />
                        ) : null}
                        <div className="choiceQsnBtn">
                          <button>A: Subclavian</button>
                          <button>B: Carotid</button>
                          <button>C: Vertebral</button>
                          <button>D: Coronary</button>
                        </div>

                        {allData.dailyQuiz[0]?.segment_id == "0" ? (
                          <button
                            className="btn"
                            onClick={() => handleStart(userId)}
                          >
                            Start Quiz
                          </button>
                        ) : (
                          <button
                            style={{
                              background: "#3f5395",
                              color: "white",
                              padding: "0px 14px",
                              borderRadius: "4px",
                            }}
                          >
                            Already Attempted
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* <Dailycases /> */}
                  {dailyCasesData && dailyCasesData.length > 0 && (
                    <Dailycases />
                  )}

                  {/* MediMart */}
                  <div className="mediMart">
                    <div className="setFlextHeding">
                      <h2>MediMart</h2>
                    </div>
                    <div className="mediSec">
                      <input
                        type="checkbox"
                        hidden
                        id="read-more"
                        className="read-more-state"
                      />
                      <div className="read-more-wrap">
                        <div className="setDivReadMore">
                          {medData.map((item) => (
                            <div className="mediPart" key={item.category}>
                              <div
                                className="tab"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  src={item?.cat_img}
                                  alt="category"
                                  className="newmg"
                                  onClick={() => handleClick(item.id)}
                                  loading="lazy"
                                />
                              </div>
                              <p>{item?.category}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <DoctorLounge />

                  {/* Podcast section */}
                  <div className="doctorLounge podCastSec">
                    <div className="setFlextHedingNew">
                      <h2>Podcast</h2>
                      <Link to="/Podcast">See all </Link>
                    </div>
                    <div className="image-gallery-container">
                      <div className="image-gallery" ref={scrollContainerRef}>
                        <Podcast userId={userId} />
                      </div>
                    </div>
                  </div>
                  {filterNews()}
                  <LatestNewsArticles/>
                  {/* Opportunity section */}
                  {/* <div className="oppoHead">
                    <div className="opportunityPartNew">
                      <div className="topSecHead">
                        <h2>Opportunity</h2>
                        <Link to="/opportunity">View all </Link>
                      </div>
                      <div className="setBoxWidth">
                        <Opportunityhome />
                      </div>
                    </div>
                  </div> */}

                  {/* <LatestNewsArticles
                    newzData={allData?.homeData?.latest_article_and_news}
                  /> */}
                  {/* <Topperszone alldata={allData} /> */}
                  <Topperszone allData={allData} />
                  {/* Earn Free */}
                  <div className="row">
                    <div className="md-12">
                      <div className="earnFree">
                        <div className="imgSec">
                          <img
                            src={`${window.IMG_BASE_URL}/revamp-web/earn.svg`}
                            alt="earn"
                            className="newmg"
                            loading="lazy"
                          />
                        </div>
                        <div className="setSideSec">
                          <div className="textSec">
                            <h2>Refer & Earn Free Course For One Month</h2>
                            {/* <p>For every new user you refer</p>
                            <p>For any account you connect</p> */}
                          </div>
                          <div className="butnNewsec">
                            <button className="btn" onClick={handleReferNow}>
                              Refer Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Support */}
                  <div
                    className="technicalSupport"
                    onClick={handleNavigation}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={`${window.IMG_BASE_URL}/revamp-web/tech.svg`}
                      alt="tech"
                      className="newmg"
                      loading="lazy"
                    />
                    <p>
                      Technical Support{" "}
                      <span>(Only for technical queries)</span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      {isSignInModalOpen && (
        <Login
          handlerClose={handleSignInClose}
          setIsAuthenticated={setIsAuthenticated}
          handleSignInSuccess={handleSignInSuccess}
          setSignInModalOpen={setSignInModalOpen}
        />
      )}
    </div>
  );
};

export default CourseAcess;
