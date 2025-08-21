import React, { useState, useEffect, Suspense } from "react";
import axiosInstance from "../../API/axiosConfig";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Modal } from "antd";
import { toast } from "react-toastify";
import "../Homepage/style.css";
import leadthanks from "./leadthanks.svg";
import CourseAcess from "../../components/webRevamp/CourseAcess";
import News from "../../components/LatestNews/News";
import MedimartHome from "../Ecommerce/Component/MedimartHome";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const usera_alldata = sessionStorage.getItem("userData");
const isreqdata = usera_alldata ? JSON.parse(usera_alldata) : {}; // Fallback to empty object

// console.log(isreqdata?.SelectedCat?.name);
// Lazy load the components
const Banner = React.lazy(() => import("../../components/banner/Banner"));
const Coursesclassroom = React.lazy(() =>
  import("../../components/classroomCourses/Coursesclassroom")
);
const Findcourses = React.lazy(() =>
  import("../../components/findcourses/Findcourses")
);
const Courses = React.lazy(() => import("../../components/course/Courses"));
const Topperszone = React.lazy(() =>
  import("../../components/ToppersZone/ToppersZone")
);
const GetTheApp = React.lazy(() =>
  import("../../components/getTheApp/GetTheApp")
);
const ImpactAtscale = React.lazy(() =>
  import("../../components/Impactscale/ImpactAtscale")
);
const Storiesinspire = React.lazy(() =>
  import("../../components/StoriesThatInspire/Storiesinspire")
);
const LatestNewsArticles = React.lazy(() =>
  import("../../components/LatestNews/LatestNewsArticles")
);
const EMedicozFeatured = React.lazy(() =>
  import("../../components/eMedicozFeatured/EMedicozFeatured")
);
const Dailyquiz = React.lazy(() =>
  import("../../components/DailyQuiz/Dailyquiz")
);
const DoctorLounge = React.lazy(() =>
  import("../../components/DoctorLounge/DoctorLounge")
);
const SharedItem = React.lazy(() =>
  import("../Ecommerce/Component/SharedItem")
);
const SharedCat = React.lazy(() => import("../../components/course/SharedCat"));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Homepage = ({ isAuthenticated, setIsAuthenticated }) => {
  const query = useQuery();
  const bookId = query.get("book_id");
  const Slug = query.get("slug");

  const user_id = sessionStorage.getItem("id");
  const newUser = sessionStorage.getItem("is_course_register");
  const creId = newUser ? newUser : {};
  const [allData, setAllData] = useState({
    videoData: null,
    homeData: null,
    inspire: null,
    dailyQuiz: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dynamicData, setDynamicData] = useState({
    leaderShip: [],
    multiFeatureApp: [],
    speacialCourse: [],
    premiumAppBase: [],
    omniChannel: [],
    bestRevistion: [],
    panIndiaFace: [],
    category: [],
  });
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [NewsArticle, setNewsArticle] = useState(null);

  const user_data = user_id ? user_id : "4";

  const fetchAllHomeData = async () => {
    try {
      const [resOne, resTwo, resThree, resDynamic] = await Promise.all([
        axiosInstance.post(API_ENDPOINTS.HOMEPAGE_INDEX.WEB_VIDEO, {
          user_id: user_data,
        }),
        axiosInstance.post(API_ENDPOINTS.HOMEPAGE_INDEX.HOMESCREEN_MYPLANE_V2, {
          user_id: user_data,
        }),
        axiosInstance.post(API_ENDPOINTS.HOMEPAGE_INDEX.GET_BANNER),
        axiosInstance.post(API_ENDPOINTS.HOMEPAGE_INDEX.GET_DYNAMICWEBDATA),
      ]);

      const resFour = await axiosInstance.post(
        API_ENDPOINTS.HOMEPAGE_INDEX.GET_HOME_NEWS_AI_NEWSARTICLE_V2,
        { user_id: user_data }
      );

      setAllData({
        videoData: resOne?.data?.data,
        homeData: resTwo?.data?.data,
        inspire: resThree?.data?.data,
        dailyQuiz: resTwo?.data?.data?.daily_quiz,
      });
      setNewsArticle(resFour?.data?.data);
      if (resDynamic.data.status === true) {
        setDynamicData({
          bestRevistion: resDynamic?.data?.data?.bestRevisionCourses,
          leaderShip: resDynamic?.data?.data?.leader_ship,
          multiFeatureApp: resDynamic?.data?.data?.multi_feature_app,
          speacialCourse: resDynamic?.data?.data?.spacel_course_available,
          premiumAppBase: resDynamic?.data?.data?.premium_app_based_learning,
          omniChannel: resDynamic?.data?.data?.omniChannelPresence,
          panIndiaFace: resDynamic?.data?.data?.panIndiafacetoFace,
          category: resDynamic?.data?.data?.Categories,
        });
      } else {
        toast.error("Something went wrong");
      }

      setIsLoading(false); // Set loading to false after all
    } catch (error) {
      //toast.error("Error fetching homepage data.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllHomeData();
  }, []);

  useEffect(() => {
    if (isModalOpen === true) {
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    }
  }, [isModalOpen]);

  useEffect(() => {
    sessionStorage.setItem("menuopen", 1);
  }, []);

  // const filterArticle = () => {
  //   const articleData = NewsArticle.filter((item) => item.type == "articles");

  //   return (
  //     <LatestNewsArticles
  //       newzData={articleData}
  //       breadValue={4}
  //       title="Articles"
  //     ></LatestNewsArticles>
  //   );
  // };
  const filterNews = () => {
    const newsData = NewsArticle?.filter((item) => item.type == "news");

    return <News newzData={newsData} breadValue={3}></News>;
  };

  return (
    <>
      {bookId ? (
        <Suspense fallback={<Spinner animation="border" />}>
          <SharedItem setIsAuthenticated={setIsAuthenticated} bookid={bookId} />
        </Suspense>
      ) : Slug ? (
        <Suspense fallback={<Spinner animation="border" />}>
          <SharedCat setIsAuthenticated={setIsAuthenticated} slug={Slug} />
        </Suspense>
      ) : (
        <div style={{ minHeight: "100vh" }}>
          {isLoading ? (
            <div
              style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner animation="border" />
              <p>Loading homepage...</p>
            </div>
          ) : isreqdata?.is_course_register == 1 || creId == 1 ? (
            <CourseAcess />
          ) : (
            <>
              <Suspense>
                <Banner
                  inspire={allData?.inspire}
                  setIsModalOpen={setIsModalOpen}
                  setIsAuthenticated={setIsAuthenticated}
                  dynamicData={dynamicData}
                />
              </Suspense>

              <Suspense>
                <Coursesclassroom />
              </Suspense>

              <Suspense>
                <Findcourses />
              </Suspense>

              <Suspense>
                <Courses
                  data={allData?.homeData?.category}
                  isAuthenticated={isAuthenticated}
                />
              </Suspense>

              {creId === "1" && (
                <Suspense>
                  <Dailyquiz dailyQuizData={allData} />
                </Suspense>
              )}
              <Suspense>
                <MedimartHome allData={allData} />
              </Suspense>
              <Suspense>
                <DoctorLounge need="need" />
              </Suspense>

              <Suspense>
                <Topperszone allData={allData} />
              </Suspense>

              <Suspense>
                <GetTheApp />
              </Suspense>

              <Suspense>
                <ImpactAtscale />
              </Suspense>

              <Suspense>
                <Storiesinspire videoData={allData?.videoData} />
              </Suspense>

              {filterNews()}
              <LatestNewsArticles/>

              <Suspense>
                <EMedicozFeatured />
              </Suspense>
            </>
          )}
        </div>
      )}

      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div className="leadPopup">
          <img src={leadthanks} loading="lazy" alt="Thank you" />
          <h3>Thank You!</h3>
          <p>Your request has been received.</p>
          <h4>We will be in touch and contact you soon!</h4>
        </div>
      </Modal>
    </>
  );
};

export default Homepage;
