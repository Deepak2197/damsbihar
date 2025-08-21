import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { isDesktop, isMobile, isTablet } from "react-device-detect";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Nav from "./components/Navbar/Nav";
import { Attendence } from "../index";

import { Spinner } from "react-bootstrap";
import NewCustomQ from "./view/CustomQbank/NewCustomQ";
import Customsecond from "./view/CustomQbank/Customsecond";
import Levels from "./view/CustomQbank/Levels";
import Attemphistory from "./view/CustomQbank/Attemphistory";
import Invite from "./view/CustomQbank/Invite";
import Numberofquestion from "./view/CustomQbank/Numberofquestion";
import ChooseSubject from "./view/CustomQbank/ChooseSubject";
import SelectMode from "./view/CustomQbank/SelectMode";
import TopicShare from "./view/CustomQbank/TopicShare";
import Leaderboard from "./view/CustomQbank/Leaderboard";
import Attemp from "./view/CustomQbank/Attemp";
import Qbanklist from "./view/CustomQbank/Qbanklist";
import PausedExamMode from "./view/CustomQbank/PausedExamMode";
import PausedRegularMode from "./view/CustomQbank/PausedRegularMode";
import UserRegNew from "./components/header/UserRegNew";
import Eventticket from "./view/Event/Component/Eventticket";
import CourseAcess from "./components/webRevamp/CourseAcess";
import Addpodcast from "./view/OvalwindowPodcast/Addpodcast";
import CoursePalnBuy from "./components/webRevamp/coursePlan/CoursePalnBuy";
import CourseNewPlan from "./components/webRevamp/coursePlan/CourseNewPlan";
import Recordpodcast from "./view/OvalwindowPodcast/Recordpodcast";
import PublishedProduct from "./view/MyBookSale/PublishedProduct";
import AddProduct from "./view/MyBookSale/AddProduct";
import UnpublishedProduct from "./view/MyBookSale/UnpublishedProduct";
import PublishProductViewDetail from "./view/MyBookSale/PublishProductViewDetail";
import SignAgreement from "./view/MyBookSale/SignAgreement";
import Orderdetail from "./view/Myorder/Orderdetail";
import Faq from "./view/faq/Faq";
import FairUsagePolicy from "./view/FairUsagePolicy/FairUsagePolicy";
import DamsCare from "./view/damsCare/DamsCare";
import Opportunity from "./components/opportunity/Opportunity";
import Mypostopportunity from "./components/opportunity/Mypostopportunity";
import Createpost from "./components/opportunity/Createpost";
import Dailycaseview from "./components/dailycases/Dailycaseview";
import Dailycaseread from "./components/dailycases/Dailycaseread";
import AiStudy from "./view/Mycourse/AiStudy";
import Viewprofile from "./components/editProfile/Viewprofile";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import SelectSubject from "./view/Mycourse/SelectSubject";
import QbankReview from "./view/Mycourse/QbankReview";
// Lazy loaded components
const Homepage = lazy(() => import("./view/Homepage/Index"));
const OurTeam = lazy(() => import("./view/OurTeam/OurTeam"));
const About = lazy(() => import("./view/About/About"));
const CoursePlan = lazy(() => import("./components/course/CoursePlan"));
const Contactus = lazy(() => import("./view/Contact/Cotactus"));
const Career = lazy(() => import("./view/Career/Career"));
const Helpandsupport = lazy(() => import("./view/Helpsupport/Helpandsupport"));
const RaiseQuery = lazy(() => import("./view/Helpsupport/RaiseQuery"));
const QueueTicket = lazy(() => import("./view/Helpsupport/QueueTicket"));
const FindCenter = lazy(() => import("./view/FindCenter/Findcenter"));
const Franchise = lazy(() => import("./view/Franchise/Franchise"));
const Csr = lazy(() => import("./view/CSR/Csr"));
const Sitemap = lazy(() => import("./view/Sitemap/Sitemap"));
const Privacypolicy = lazy(() => import("./view/PrivacyPolicy/Privacypolicy"));
const Disclaimer = lazy(() => import("./view/Disclaimer/disclaimer"));
const Termsconditions = lazy(() =>
  import("./view/Termsconditions/Termsconditions")
);
const Newsandarticle = lazy(() =>
  import("./view/Newsandarticle/Newsandarticle")
);
const Educator = lazy(() => import("./view/Educator/Educator"));
const Studentinfo = lazy(() => import("./view/Studentinfo/Studentinfo"));
const Blogs = lazy(() => import("./view/Blogs/Blogs"));
const Eventlist = lazy(() => import("./view/Event/Eventlist"));
const Eventbooking = lazy(() => import("./view/Event/Component/Eventbooking"));
const PublishBook = lazy(() => import("./view/PublishBook/PublishBook"));
const PublishbookForm = lazy(() =>
  import("./view/PublishBook/PublishbookForm")
);
const EbookSale = lazy(() => import("./view/MyBookSale/EbookSale"));

const LiveQuiz = lazy(() => import("./view/LiveQuiz/LiveQuiz"));
const HostChallenge = lazy(() => import("./view/LiveQuiz/HostChallenge"));
const Eventcenter = lazy(() => import("./view/Event/Component/Eventcenter"));
const Cbtlist = lazy(() => import("./view/Cbt/Cbtlist"));
const TestInstruction = lazy(() => import("./view/Cbt/TestInstruction"));
const ProfileUpdate = lazy(() => import("./view/Cbt/ProfileUpdate"));
const SelectLocation = lazy(() => import("./view/Cbt/SelectLocation"));
const Mypayment = lazy(() => import("./view/Mypayment/Mypayment"));
const Myorder = lazy(() => import("./view/Myorder/Myorder"));
const MyAddress = lazy(() => import("./view/MyAddress/MyAddress"));

// const UserReg = lazy(() => import("./components/header/UserReg"));
const UserReg = lazy(() => import("./components/header/UserRegNew"));
const Store = lazy(() => import("./view/Ecommerce/Store"));
const Detail = lazy(() => import("./view/Ecommerce/Component/Details"));
const ProductList = lazy(() =>
  import("./view/Ecommerce/Component/ProductList")
);
const QuickBuy = lazy(() =>
  import("./view/Ecommerce/Component/QuickBuySellAllList")
);
const BestSellingSell = lazy(() =>
  import("./view/Ecommerce/Component/BestSellingSeeAllList")
);
const SubCategory = lazy(() => import("./view/Ecommerce/SubCategoryList"));
const SubSubCategory = lazy(() =>
  import("./view/Ecommerce/SubSubCategoryList")
);
const SubCategoryProduct = lazy(() =>
  import("./view/Ecommerce/SubCategoryProductList")
);
const CategoryProductList = lazy(() =>
  import("./view/Ecommerce/CategoryProductList")
);
const Ovalpodcast = lazy(() => import("./view/OvalwindowPodcast/Ovalpodcast"));
const Sidebar = lazy(() =>
  import("./view/OvalwindowPodcast/components/Sidebar")
);
const CourseCategory = lazy(() => import("./components/course/CourseCategory"));
const CourseCategoryList = lazy(() =>
  import("./components/course/CourseCategoryList")
);
const AddNewAddress = lazy(() =>
  import("./view/MyAddress/component/AddNewAddress")
);
const EditNewAddress = lazy(() =>
  import("./view/MyAddress/component/EditNewAddress")
);
const NewsArticledetails = lazy(() =>
  import("./components/LatestNews/NewsArticledetails")
);
const ArticlesTitleDetails = lazy(() =>
  import("./components/LatestNews/ArticlesTitleDetails")
);
const Bookmarklist = lazy(() => import("./view/BookMark/BookMark"));
const ScoreCard = lazy(() => import("./view/MyScorecard/ScoreCardList"));
const MyCourse = lazy(() => import("./view/Mycourse/MyCourse"));

const TopperszoneList = lazy(() => import("./view/TopperZone/TopperZoneList"));
const CoursesDqb = lazy(() => import("./view/Mycourse/CoursesDqb"));
const DqbTestAll = lazy(() => import("./view/Mycourse/Component/DqbTestAll"));
const TestSeries = lazy(() => import("./view/Mycourse/TestSeries"));
const CourseDetail = lazy(() => import("./view/Mycourse/CourseDetail"));
const ClassSchedulesDetails = lazy(() =>
  import("./view/Mycourse/Component/ClassSchedulesDetails")
);
const RecordedSession = lazy(() => import("./view/Mycourse/RecordedSession"));
const RecordedTopic = lazy(() => import("./view/Mycourse/RecordedTopic"));
const ReferenceList = lazy(() => import("./view/PublishBook/PublishReference"));
const ProfileEditFile = lazy(() =>
  import("./components/ProfileEdit/EditProfile")
);
const TestHome = lazy(() => import("./components/Test_Series/TestHome"));
const TestPanel = lazy(() => import("./components/Test_Series/TestPanel"));
const TestResult = lazy(() => import("./components/Test_Series/TestResult"));
const PaymentSucess = lazy(() => import("./view/Paymentstatus/PaymentSucess"));
const TestHomeDQB = lazy(() => import("./components/DailyQuiz/TestHomeDQB"));
const TestPanelDQB = lazy(() => import("./components/DailyQuiz/TestPanelDQB"));
const TestResultDQB = lazy(() =>
  import("./components/DailyQuiz/TestResultDQB")
);
const PausedTestPanel = lazy(() =>
  import("./components/Test_Series/PausedTestPanel")
);
const TestHomeCHO = lazy(() => import("./view/Mycourse/Component/TestHomeCHO"));
const TestPanelCHO = lazy(() =>
  import("./view/Mycourse/Component/TestPanelCHO")
);
const TestResultCHO = lazy(() =>
  import("./view/Mycourse/Component/TestResultCHO")
);
const TestHomeDQ = lazy(() => import("./view/Mycourse/Component/TestHomeDQ"));
const TestResultDQ = lazy(() =>
  import("./view/Mycourse/Component/TestResultDQ")
);
const TestPanelDQ = lazy(() => import("./view/Mycourse/Component/TestPanelDQ"));
const PausedTestPanelDQ = lazy(() =>
  import("./view/Mycourse/Component/PausedTestPanelDQ")
);
const TestWait = lazy(() => import("./view/Mycourse/TestWait"));
const AllLounge = lazy(() => import("./components/DoctorLounge/AllLounge"));
const Lounge = lazy(() => import("./components/DoctorLounge/Lounge"));
const Ordertracking = lazy(() => import("./view/Myorder/OrderTracking"));
const Invoice = lazy(() => import("./view/Myorder/Invoice"));
const CbtComboList = lazy(() => import("./view/Cbt/CbtComboList"));
const CbtComboReport = lazy(() => import("./view/Cbt/CbtComboReport"));
const AdmitCard = lazy(() => import("./view/Cbt/AdmitCard"));
const AdmitCardDetail = lazy(() => import("./view/Cbt/AdmitCardDetail"));
const NursingHome = lazy(() => import("./view/NursingTest/NursingHome"));
const NursingPanel = lazy(() => import("./view/NursingTest/NursingPanel"));
const NursingResult = lazy(() => import("./view/NursingTest/NursingResult"));
const Scheduler = lazy(() => import("./view/Mycourse/Scheduler"));

const PausedNursingPanel = lazy(() =>
  import("./view/NursingTest/PausedNursingPanel")
);
const ReferEarn = lazy(() => import("./view/Refer/ReferEarn"));
const Cashrefund = lazy(() => import("./view/refund/CashRefund"));
const ProfileNew = lazy(() => import("./view/Profile/ProfileNew"));
const Completed = lazy(() => import("./view/Profile/Completed"));
const AddCart = lazy(() => import("./view/AddToCart/AddCart"));
const CbtEnrolledSuccess = lazy(() =>
  import("./view/Paymentstatus/CbtEnrolledSuccess")
);
const PaymentFailed = lazy(() => import("./view/Paymentstatus/PaymentFailed"));
const ReferCongra = lazy(() => import("./view/Refer/ReferCongra"));
const ReferList = lazy(() => import("./view/Refer/ReferList"));
const Join = lazy(() => import("./view/Affiliate/Join"));
const SharedVideo = lazy(() => import("./components/DoctorLounge/SharedVideo"));
const SharedItem = lazy(() => import("./view/Ecommerce/Component/SharedItem"));
const AllDailyQuiz = lazy(() =>
  import("./components/DailyQuiz/new/AllDailyQuiz")
);
const Bookmarks = lazy(() => import("./view/CustomQbank/Bookmarks"));
const CustomQ = lazy(() => import("./view/CustomQbank/CustomQ"));
const ExamModeTest = lazy(() => import("./view/CustomQbank/ExamModeTest"));
const ExamModeResult = lazy(() => import("./view/CustomQbank/ExamModeResult"));
const RegModeTest = lazy(() => import("./view/CustomQbank/RegModeTest"));
const UpgradePlan = lazy(() => import("./view/Mycourse/UpgradePlan"));
const Performance = lazy(() => import("./view/Performance/Performance"));
const DamsDeck = lazy(() => import("./view/Mycourse/DamsDeck"));
const ReviewCard = lazy(() => import("./view/Mycourse/Component/ReviewCard"));
const AllCards = lazy(() => import("./view/Mycourse/Component/AllCards"));
const ReadCard = lazy(() => import("./view/Mycourse/Component/ReadCard"));
const DeckProgress = lazy(() =>
  import("./view/Mycourse/Component/DeckProgress")
);
const SubjectWiseCard = lazy(() =>
  import("./view/Mycourse/Component/SubjectWiseCard")
);
const SubjwiseProgress = lazy(() =>
  import("./view/Mycourse/Component/SubwiseProgress")
);

const Router = () => {
  const isauth = sessionStorage.getItem("id");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Spinner animation="none" />}>
          <Routes>
            {isMobile ? (
              <Route exact path="/Completed" element={<Completed />}></Route>
            ) : (
              <Route
                exact
                path="/Completed"
                element={
                  <Layout>
                    <Completed />
                  </Layout>
                }
              ></Route>
            )}

            <Route
              exact
              path="/all-daily-quiz"
              element={
                <Layout>
                  <AllDailyQuiz />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/join-affiliate"
              element={
                <Layout>
                  <Join />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/refer-list"
              element={
                <Layout>
                  <ReferList />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/refer-earn-successfully"
              element={
                <Layout>
                  <ReferCongra />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/refer-earn"
              element={
                <Layout>
                  <ReferEarn />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/scheduler"
              element={
                <Layout>
                  <Scheduler setIsAuthenticated={setIsAuthenticated} />
                </Layout>
              }
            ></Route>

            {/* <Route
              exact
              path="/ai-study"
              element={
                <Layout>
                  <AiStudy />
                </Layout>
              }
            ></Route> */}
            <Route exact path="/ai-study" element={<AiStudy />}></Route>

            <Route
              exact
              path="/"
              element={
                <Layout>
                  <Homepage
                    setIsAuthenticated={setIsAuthenticated}
                    isAuthenticated={isAuthenticated}
                  />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/our-team"
              element={
                <Layout>
                  <OurTeam />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/about"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/courseplan/:name"
              element={
                <Layout>
                  <CoursePlan setIsAuthenticated={setIsAuthenticated} />
                </Layout>
              }
            />
            <Route
              exact
              path="/contact"
              element={
                <Layout>
                  <Contactus />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/career"
              element={
                <Layout>
                  <Career />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/course_category"
              element={
                <Layout>
                  <CourseCategory setIsAuthenticated={setIsAuthenticated} />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/course-category-list"
              element={
                <Layout>
                  <CourseCategoryList setIsAuthenticated={setIsAuthenticated} />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/help-and-support"
              element={
                <Layout>
                  <Helpandsupport setIsAuthenticated={setIsAuthenticated} />
                </Layout>
              }
            ></Route>
            {isDesktop ? (
              <Route
                exact
                path="/raise-query/:id"
                element={isauth ? <RaiseQuery /> : <Navigate to="/" />}
              ></Route>
            ) : (
              <Route
                exact
                path="/raise-query/:id"
                element={<RaiseQuery />}
              ></Route>
            )}
            <Route exact path="/ticket/:id" element={<QueueTicket />}></Route>
            <Route
              exact
              path="/my-course"
              element={
                <Layout>
                  <MyCourse />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/find_center"
              element={
                <Layout>
                  <FindCenter />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/franchise-opportunity"
              element={
                <Layout>
                  <Franchise />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/csr"
              element={
                <Layout>
                  <Csr />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/dams-care"
              element={
                <Layout>
                  <DamsCare />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="sitemap"
              element={
                <Layout>
                  <Sitemap />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="privacy-policy"
              element={
                <Layout>
                  <Privacypolicy />
                </Layout>
              }
            ></Route>
            {/*for mobile use*/}
            <Route exact path="privacy" element={<Privacypolicy />}></Route>
            <Route
              exact
              path="privacy-policy-mobile"
              element={<Privacypolicy />}
            ></Route>
            <Route
              exact
              path="/disclaimer"
              element={
                <Layout>
                  <Disclaimer />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/terms_conditions"
              element={
                <Layout>
                  <Termsconditions />
                </Layout>
              }
            ></Route>
            {/*for mobile use*/}
            <Route
              exact
              path="/termsconditions"
              element={<Termsconditions />}
            ></Route>
            <Route
              exact
              path="/terms_conditions-mobile"
              element={<Termsconditions />}
            ></Route>
            {/*for mobile use*/}
            <Route
              exact
              path="/faq"
              element={
                <Layout>
                  <Faq />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/fair-usage-policy"
              element={
                <Layout>
                  <FairUsagePolicy />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/:title"
              element={
                <Layout>
                  <Newsandarticle />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/educator"
              element={
                <Layout>
                  <Educator />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/Studentinfo"
              element={
                <Layout>
                  <Studentinfo />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/blogs"
              element={
                <Layout>
                  <Blogs />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/addToCart"
              element={
                isauth ? (
                  <Layout>
                    <AddCart />
                  </Layout>
                ) : (
                  <Navigate to="/" />
                )
              }
            ></Route>
            <Route
              exact
              path="/event"
              element={
                <Layout>
                  <Eventlist />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/eventcenter"
              element={
                <Layout>
                  <Eventcenter />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/eventbooking"
              element={
                <Layout>
                  <Eventbooking />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/event-ticket"
              element={
                <Layout>
                  <Eventticket />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/publishbook"
              element={
                <Layout>
                  <PublishBook />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/ebooksale"
              element={
                <Layout>
                  <EbookSale />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/add-product"
              element={
                <Layout>
                  <AddProduct />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/published-product"
              element={
                <Layout>
                  <PublishedProduct />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/publishproduct-viewdetail"
              element={
                <Layout>
                  <PublishProductViewDetail />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/unpublished-product"
              element={
                <Layout>
                  <UnpublishedProduct />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/sign-agreement"
              element={
                <Layout>
                  <SignAgreement />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/livequiz"
              element={
                <Layout>
                  <LiveQuiz />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/myorder"
              element={
                <Layout>
                  <Myorder />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/order-detail"
              element={
                <Layout>
                  <Orderdetail />
                </Layout>
              }
            ></Route>
            <Route exact path="/invoice/:id" element={<Invoice />}></Route>
            <Route
              exact
              path="/myaddress"
              element={
                <Layout>
                  <MyAddress />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/addnewaddress"
              element={
                <Layout>
                  <AddNewAddress />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/editaddress"
              element={
                <Layout>
                  <EditNewAddress />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/podcast"
              element={
                <Layout>
                  <Ovalpodcast />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/addpodcast"
              element={
                <Layout>
                  <Addpodcast />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/recordpodcast"
              element={
                <Layout>
                  <Recordpodcast />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/opportunity"
              element={
                <Layout>
                  <Opportunity />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/postopportunity"
              element={
                <Layout>
                  <Mypostopportunity />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/dailycaseview"
              element={
                <Layout>
                  <Dailycaseview />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/dailycaseread"
              element={
                <Layout>
                  <Dailycaseread />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/createpost"
              element={
                <Layout>
                  <Createpost />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/sidebar"
              element={
                <Layout>
                  <Sidebar />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/hostChallenge"
              element={
                <Layout>
                  <HostChallenge />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/publishbookform"
              element={
                <Layout>
                  <PublishbookForm />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/cbt"
              element={
                <Layout>
                  <Cbtlist />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/cbt-instruction/:cbtid"
              element={
                <Layout>
                  <TestInstruction />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/profile-update"
              element={
                <Layout>
                  <ProfileUpdate />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/select-location"
              element={
                <Layout>
                  <SelectLocation />
                </Layout>
              }
            ></Route>

            {isMobile || isTablet ? (
              <Route
                exact
                path="/profilenew/:id/:userpin"
                element={<ProfileNew />}
              ></Route>
            ) : (
              <Route
                exact
                path="/profilenew/:id/:userpin"
                element={
                  <Layout>
                    <ProfileNew />
                  </Layout>
                }
              ></Route>
            )}

            <Route
              exact
              path="/my-payment"
              element={
                <Layout>
                  <Mypayment />
                </Layout>
              }
            ></Route>
            {/* <Route
              exact
              path="/user-registration"
              element={
                <Layout>
                  <UserReg />
                </Layout>
              }
            ></Route> */}

            <Route
              exact
              path="/user-registration"
              element={
                <Layout>
                  <UserRegNew />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/medimart"
              element={
                <Layout>
                  <Store />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/order-tracking"
              element={
                <Layout>
                  <Ordertracking />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/damspublication/:slug"
              element={
                <Layout>
                  <Detail setIsAuthenticated={setIsAuthenticated} />
                </Layout>
              }
            ></Route>
            {/* <Route
            exact
            path="/item/:id"
            element={
              <Layout>
                <SharedItem setIsAuthenticated={setIsAuthenticated}/>
              </Layout>
            }
          ></Route> */}
            <Route
              exact
              path="/product-list"
              element={
                <Layout>
                  <ProductList />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/quick-buy"
              element={
                <Layout>
                  <QuickBuy />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/best-selling"
              element={
                <Layout>
                  <BestSellingSell />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/medimart/damspublication"
              element={
                <Layout>
                  <SubCategory />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/sub-sub-category"
              element={
                <Layout>
                  <SubSubCategory />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/category-product"
              element={
                <Layout>
                  <CategoryProductList />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/sub-category-product"
              element={
                <Layout>
                  <SubCategoryProduct />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/topper-zone"
              element={
                <Layout>
                  <TopperszoneList />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/news-article/:slug"
              element={
                <Layout>
                  <NewsArticledetails />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/article-news/:slug"
              element={
                <Layout>
                  <ArticlesTitleDetails />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/my-course/course-dqb"
              element={
                <Layout>
                  <CoursesDqb />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/new-custom-qbank"
              element={
                <Layout>
                  <NewCustomQ />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/new-custom-qbanksecond"
              element={
                <Layout>
                  <Customsecond />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/choose-levels"
              element={
                <Layout>
                  <Levels />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/attemped-history"
              element={
                <Layout>
                  <Attemphistory />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/invited"
              element={
                <Layout>
                  <Invite />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/creation_qbank"
              element={
                <Layout>
                  <Numberofquestion />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/choose-subject"
              element={
                <Layout>
                  <ChooseSubject />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/select-mode"
              element={
                <Layout>
                  <SelectMode />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/topic-share/:id"
              element={
                <Layout>
                  <TopicShare />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/leader-board"
              element={
                <Layout>
                  <Leaderboard />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/attemp"
              element={
                <Layout>
                  <Attemp />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/qbank-list"
              element={
                <Layout>
                  <Qbanklist />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/dqb-test-all"
              element={
                <Layout>
                  <DqbTestAll />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/bookmark"
              element={
                <Layout>
                  <Bookmarklist />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/score-card/:id"
              element={
                <Layout>
                  <ScoreCard />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/test-series"
              element={
                <Layout>
                  <TestSeries />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/course-detail"
              element={
                <Layout>
                  <CourseDetail />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/class-schedules-details"
              element={
                <Layout>
                  <ClassSchedulesDetails />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/recorded-session"
              element={
                <Layout>
                  <RecordedSession />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/recorded-topic"
              element={
                <Layout>
                  <RecordedTopic />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/reference-list"
              element={
                <Layout>
                  <ReferenceList />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/edit_profile"
              element={
                <Layout>
                  <ProfileEditFile />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/cashrefund"
              element={
                <Layout>
                  <Cashrefund />
                </Layout>
              }
            ></Route>

            {/* <Route
            exact
            path="/profilenew"
            element={
              <Layout>
                <ProfileNew />
              </Layout>
            }
          ></Route> */}

            <Route path="/test-home/:id" element={<TestHome />}></Route>
            <Route path="/test-home/dqb/:id" element={<TestHomeDQB />}></Route>
            <Route path="/test-home/cho/:id" element={<TestHomeCHO />}></Route>
            <Route path="/test-home/nur/:id" element={<NursingHome />}></Route>
            <Route path="/test-home/dq/:id" element={<TestHomeDQ />}></Route>
            <Route path="/test-panel/:id" element={<TestPanel />}></Route>
            <Route
              path="/test-panel/dqb/:id"
              element={<TestPanelDQB />}
            ></Route>
            <Route
              path="/test-panel/cho/:id"
              element={<TestPanelCHO />}
            ></Route>
            <Route
              path="/test-panel/nur/:id"
              element={<NursingPanel />}
            ></Route>
            <Route path="/test-panel/dq/:id" element={<TestPanelDQ />}></Route>
            <Route
              path="/test-panel/paused/:id"
              element={<PausedTestPanel />}
            ></Route>

            <Route
              path="/test-panel/nur/paused/:id"
              element={<PausedNursingPanel />}
            ></Route>

            <Route
              path="/test-panel/dq/paused/:id"
              element={<PausedTestPanelDQ />}
            ></Route>
            <Route
              path="/testresult/dqb/:id"
              element={<TestResultDQB />}
            ></Route>
            <Route
              path="/testresult/cho/:id"
              element={<TestResultCHO />}
            ></Route>
            <Route path="/testresult/dq/:id" element={<TestResultDQ />}></Route>
            <Route path="/testresult/:id" element={<TestResult />}></Route>
            <Route path="/testwait/:id" element={<TestWait />}></Route>
            <Route path="/testresult/dq/:id" element={<TestResultDQ />}></Route>
            <Route
              path="/testresult/nur/:id"
              element={<NursingResult />}
            ></Route>
            <Route path="/scheduler" element={<Scheduler />}></Route>
            <Route path="/sucess/:id" element={<PaymentSucess />} />
            <Route path="/sucess_cbt" element={<CbtEnrolledSuccess />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route
              exact
              path="/all-lounge"
              element={
                <Layout>
                  <AllLounge />
                </Layout>
              }
            ></Route>

            <Route exact path="video/:id" element={<SharedVideo />}></Route>

            <Route
              exact
              path="/lounge/:id"
              element={
                <Layout>
                  <Lounge />
                </Layout>
              }
            ></Route>

            <Route path="/success/:id" element={<PaymentSucess />} />
            <Route path="/failed/:id" element={<PaymentFailed />} />
            <Route path="/sucess_cbt/:id" element={<CbtEnrolledSuccess />} />
            <Route
              exact
              path="/cbtcombo"
              element={
                <Layout>
                  <CbtComboList />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/cbtcomboreport"
              element={
                <Layout>
                  <CbtComboReport />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/admit-card"
              element={
                <Layout>
                  <AdmitCard />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/admit-card-detail"
              element={
                <Layout>
                  <AdmitCardDetail />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/attendance"
              element={
                <Layout>
                  <Attendence />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/bookmarks"
              element={
                <Layout>
                  <Bookmarks />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/performance"
              element={
                <Layout>
                  <Performance />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/custom-qbank"
              element={
                <Layout>
                  <CustomQ />
                </Layout>
              }
            ></Route>
            <Route
              path="/plan/:id"
              element={
                <Layout>
                  <UpgradePlan />
                </Layout>
              }
            ></Route>
            <Route
              path="/damsdeck"
              element={
                <Layout>
                  <DamsDeck />
                </Layout>
              }
            ></Route>
            <Route
              path="/selectsubject"
              element={
                <Layout>
                  <SelectSubject />
                </Layout>
              }
            ></Route>
            <Route
              path="/qbankreview"
              element={
                <Layout>
                  <QbankReview />
                </Layout>
              }
            ></Route>
            <Route
              path="/review-card"
              element={
                <Layout>
                  <ReviewCard />
                </Layout>
              }
            ></Route>
            <Route
              path="/allcards/:id"
              element={
                <Layout>
                  <AllCards />
                </Layout>
              }
            ></Route>
            <Route
              path="/readcard/:id"
              element={
                <Layout>
                  <ReadCard />
                </Layout>
              }
            ></Route>
            <Route
              path="/deckprogress"
              element={
                <Layout>
                  <DeckProgress />
                </Layout>
              }
            ></Route>
            <Route
              path="/subwise"
              element={
                <Layout>
                  <SubjectWiseCard />
                </Layout>
              }
            ></Route>

            <Route
              path="*"
              element={
                <Layout>
                  <Homepage
                    setIsAuthenticated={setIsAuthenticated}
                    isAuthenticated={isAuthenticated}
                  />
                </Layout>
              }
            ></Route>

            <Route
              path="/subwise-progress"
              element={
                <Layout>
                  <SubjwiseProgress />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/exam-mode/:id"
              element={<ExamModeTest />}
            ></Route>
            <Route
              exact
              path="/paused-exam-mode/:id"
              element={<PausedExamMode />}
            ></Route>
            <Route
              exact
              path="/paused-reg-mode/:id"
              element={<PausedRegularMode />}
            ></Route>
            <Route exact path="/reg-mode/:id" element={<RegModeTest />}></Route>
            <Route
              exact
              path="/testresultcustom/:id"
              element={<ExamModeResult />}
            ></Route>
            {/* web Revamp routw */}
            <Route
              exact
              path="/course-acess"
              element={
                <Layout>
                  <CourseAcess />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/courses"
              element={
                <Layout>
                  <CoursePalnBuy />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/courses-new-plan"
              element={
                <Layout>
                  <CourseNewPlan />
                </Layout>
              }
            ></Route>
            <Route
              exact
              path="/profile-view"
              element={
                <Layout>
                  <Viewprofile />
                </Layout>
              }
            ></Route>
            {/* <Route exact path="/course-acess" element={<CourseAcess />}></Route> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div>
      <Header
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />
      {children}
      <Footer setIsAuthenticated={setIsAuthenticated} />
    </div>
  );
}

export default Router;
