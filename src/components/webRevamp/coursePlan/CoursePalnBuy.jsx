import { useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "../../../components/Registration/style.css";
import "../../../components/Registration/responsive.css";
import axiosInstance from "../../../API/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import "../style.css";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../../ulits/apiConstant";

const CoursePalnBuy = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("id");
  const location = useLocation();
  const courseId = location.state?.courseId || location.state?.catId;
  const [activatedTrials, setActivatedTrials] = useState({});

  const [show, setShow] = useState(null);
  const [planData, setPlanData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [prevDataLength, setPrevDataLength] = useState(3);
  const [categoryImage, setCategoryImage] = useState("");
  const handleShow = (index) => {
    setShow(show === index ? null : index);
  };

  const getCategoryData = async () => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.COURSEACESS_HOMEPAGE.GET_HOMESCREEN_CATEGORYDATA,
        {
          stream_id: 1,
          user_id: userId,
        }
      );

      if (response.data.status && response.data.data) {
        const category = response.data.data.find(
          (item) => item.id === courseId.toString()
        );

        if (category) {
          setCategoryImage(category.image || "");
        }
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const getAllPlan = async () => {
    if (!courseId) return;
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        API_ENDPOINTS.COURSEACESS_HOMEPAGE.GET_PLANE_BY_CATEGORY_ID,
        { user_id: userId, cat_id: courseId }
      );
      console.log(response.data.data.plan_list);
      const newData = response?.data?.data?.plan_list || [];
      setPlanData(newData);
      setPrevDataLength(newData.length || 3);
    } catch (error) {
      console.error("Error fetching data:", error);
      setPrevDataLength(3);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFretrial = async (courseId) => {
    try {
      const response = await axiosInstance.post(
        `/v2_data_model/free_trial_apply`,
        {
          user_id: userId,
          course_id: courseId,
        }
      );

      const { data } = response;

      if (data.status === true) {
        // Show success toast
        toast.success(data.message || "Free Trial Activated Successfully.");

        // Update UI state
        setActivatedTrials((prev) => ({
          ...prev,
          [courseId]: true,
        }));

        // Refresh plans
        getAllPlan();
      } else {
        // Handle failure case
        toast.error(data.message || "Free Trial Activation Failed.");
      }
    } catch (error) {
      console.error("Free trial activation failed:", error);
      toast.error("Something went wrong while applying the free trial.");
    }
  };

  const handleBuyNow = (plan) => {
    navigate("/courses-new-plan", { state: { plan } });
  };

  // New handler for Enrolled button click
  const handleEnrolledClick = (plan) => {
    // Example action: Navigate to a course details page or show a message
    navigate("/course-details", { state: { plan } }); // Adjust the route as needed
    // Alternatively, you could show a message:
    // message.info("You are already enrolled in this course!");
  };

  // Function to determine button text and action
  const getButtonConfig = (plan) => {
    const { is_renew, is_purchased, mrp, is_free_trial } = plan;
    //console.log(is_renew, is_purchased, mrp, is_free_trial);
    // Condition 1: Buy Now
    if (is_renew === "1" && is_purchased === "0" && mrp !== 0) {
      return {
        text: "Buy Now",
        onClick: () => handleBuyNow(plan),
        className: "buy-now-btn",
      };
    }

    // Condition 2: Renew
    else if (is_renew === "1" && is_purchased === "2" && mrp !== 0) {
      return {
        text: "Renew",
        onClick: () => handleBuyNow(plan),
        className: "buy-now-btn renew-btn",
      };
    }
    // Condition 3: Enrolled (free course) - Made clickable
    else if (mrp === 0 && is_purchased === "1") {
      return {
        text: "Enrolled",
        onClick: null,
        //onClick: () => handleEnrolledClick(plan), // Added clickable action
        className: "buy-now-btn enrolled-btnn",
      };
    }
    // Condition 4: Renew (purchased)
    else if (is_renew === "1" && is_purchased === "1" && mrp !== 0) {
      return {
        text: "Renew",
        onClick: () => handleBuyNow(plan),
        className: "buy-now-btn renew-btnn",
      };
    }
    // Condition 5: Enrolled (non-renewable) - Made clickable
    else if (is_renew === "0" && mrp !== 0 && is_purchased === "1") {
      return {
        text: "Enrolled",
        // onClick: () => handleEnrolledClick(plan), // Added clickable action
        onClick: null,
        className: "buy-now-btn enrolled-btn",
      };
    }
    // Condition 6: Free trail - Made clickable
    else if (is_purchased == "0" && is_free_trial == true) {
      return {
        text: "Buy Now",
        onClick: () => handleBuyNow(plan),
        className: "buy-now-btn",
      };
    }

    // Default case
    return {
      text: "Buy Now",
      onClick: () => handleBuyNow(plan),
      className: "buy-now-btn",
    };
  };

  useEffect(() => {
    getCategoryData();
    getAllPlan();
  }, [courseId]);

  const SkeletonBox = () => (
    <div className="BoxUi">
      <div className="plan-header plan-headerNew">
        <div className="plan-title">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </div>
        <div className="plan-actions">
          <div className="skeleton skeleton-price"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
      </div>
    </div>
  );
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <div>
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Buy Plan</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="PlanSectionBGAdd">
        <div className="container">
          <div className="neetBuyPlan">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="planSection">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div
                        className="imgsetText"
                        style={{ textAlign: "center", marginBottom: "30px" }}
                      >
                        {categoryImage ? (
                          <img
                            src={categoryImage.replace(/\\/g, "")}
                            alt="Course Banner"
                            style={{ maxWidth: "150%", width: "150px" }}
                          />
                        ) : (
                          <img
                            src="/news.png"
                            alt="Course Banner"
                            style={{ maxWidth: "100%", width: "100px" }}
                          />
                        )}
                        <p>Please select a plan for your studies</p>
                      </div>
                    </div>
                  </div>
                  <div className="newPlan">
                    {isLoading ? (
                      Array.from({ length: prevDataLength }).map((_, index) => (
                        <SkeletonBox key={index} />
                      ))
                    ) : planData.length > 0 ? (
                      planData.map((plan, index) => {
                        const buttonConfig = getButtonConfig(plan);
                        return (
                          <div className="BoxUi" key={plan.id}>
                            <div className="plan-header plan-headerNew">
                              <div className="plan-title">
                                <h2>{plan.title}</h2>
                                <h4
                                  className="view-inclusion-btn"
                                  onClick={() => handleShow(index)}
                                >
                                  View Inclusion{" "}
                                  {show === index ? (
                                    <FaAngleUp />
                                  ) : (
                                    <FaAngleDown />
                                  )}
                                </h4>
                              </div>
                              {show !== index && (
                                <div className="plan-actions">
                                  {/* Hide MRP if button text is "Enrolled" */}
                                  {buttonConfig.text !== "Enrolled" && (
                                    <h3>₹ {plan.mrp}</h3>
                                  )}
                                  <h5
                                    className={buttonConfig.className}
                                    onClick={buttonConfig.onClick}
                                    style={
                                      buttonConfig.onClick
                                        ? { cursor: "pointer" }
                                        : { cursor: "default" }
                                    }
                                  >
                                    {buttonConfig.text}
                                  </h5>
                                </div>
                              )}
                            </div>
                            {show === index && (
                              <>
                                <div className="coursePart">
                                  <ul>
                                    {plan.module_data
                                      .filter((module) => module.exist === 1)
                                      .map((module) => (
                                        <li key={module.id}>
                                          <em className="fa fa-check"></em>
                                          {module.module_name}
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                                <>
                                  <>
                                    {activatedTrials[plan.id] ||
                                    plan.is_purchased === "2" ? (
                                      <button
                                        className="freeTrailbtnactive"
                                        disabled
                                      >
                                        Free Trial Activated
                                        <span
                                          style={{
                                            display: "block",
                                            fontSize: "14px",
                                            fontWeight: "700",
                                            color: "#007aff",
                                          }}
                                        >
                                          ({plan?.remaining_days} Days
                                          Remaining)
                                        </span>
                                      </button>
                                    ) : (
                                      plan.is_purchased === "0" &&
                                      plan.is_free_trial && (
                                        <button
                                          className="freeTrailbtn"
                                          onClick={() =>
                                            handleFretrial(plan.id)
                                          }
                                        >
                                          Activate Free Trial
                                          <span
                                            style={{
                                              display: "block",
                                              fontSize: "14px",
                                              fontWeight: "700",
                                              color: "#007aff",
                                            }}
                                          >
                                            ({plan?.free_trial_duration} Days)
                                          </span>
                                        </button>
                                      )
                                    )}
                                  </>
                                </>

                                <div className="plan-footer">
                                  {/* Hide MRP if button text is "Enrolled" */}
                                  {buttonConfig.text !== "Enrolled" && (
                                    <h3>₹ {plan.mrp}</h3>
                                  )}
                                  <h5
                                    className={buttonConfig.className}
                                    onClick={buttonConfig.onClick}
                                    style={
                                      buttonConfig.onClick
                                        ? { cursor: "pointer" }
                                        : { cursor: "default" }
                                    }
                                  >
                                    {buttonConfig.text}
                                  </h5>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p>No plans available for this course.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePalnBuy;
