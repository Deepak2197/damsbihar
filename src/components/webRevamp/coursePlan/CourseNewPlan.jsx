import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, DatePicker, Button, message } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import axiosInstance from "../../../API/axiosConfig";
import "../style.css";
import { API_ENDPOINTS } from "../../../ulits/apiConstant";

const CourseNewPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;
  const [selectedInstallment, setSelectedInstallment] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [useToday, setUseToday] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lastExpiryDate, setLastExpiryDate] = useState(null);
  const userId = sessionStorage.getItem("id");
  const courseId = plan?.id;

  const checkRenewalStatus = async () => {
    if (plan?.is_renew === "1") {
      try {
        const response = await axiosInstance.post(
          "/v2_data_model/checkCourseRenew",
          {
            user_id: userId,
            course_id: courseId,
          }
        );
        if (response.data.status && response.data.data.is_renew === "1") {
          setLastExpiryDate(response.data.data.last_expiry);
          if (plan?.allow_course_date_select === "1") {
            setSelectedDate(
              dayjs(response.data.data.last_expiry).add(1, "day")
            );
            setUseToday(false);
          } else {
            setSelectedDate(dayjs(response.data.data.last_expiry));
          }
        }
      } catch (error) {
        console.error("Error checking renewal status:", error);
        message.error("Failed to check renewal status.");
      }
    } else if (plan?.allow_course_date_select === "1") {
      setSelectedDate(dayjs());
      setUseToday(true);
    }
  };

  useEffect(() => {
    checkRenewalStatus();
  }, [plan]);

  const handleInstallmentSelect = async (index, optionId) => {
    if (isLoading) return;
    setIsLoading(true);
    setSelectedInstallment(index);
    setSubscriptionId(optionId); // Set subscriptionId here

    try {
      const cartResponse = await axiosInstance.post(
        API_ENDPOINTS.MEDIMART.GET_USER_CART_DATA,
        { user_id: userId }
      );
      const shouldClearCart = cartResponse?.data?.status === true;

      if (plan?.allow_course_date_select === "1" && plan?.is_renew === "1") {
        if (shouldClearCart) {
          await handleClearCart(optionId, true);
        } else {
          setIsModalVisible(true);
          setIsLoading(false);
        }
      } else if (
        plan?.allow_course_date_select !== "1" &&
        plan?.is_renew === "1"
      ) {
        const startDate = lastExpiryDate
          ? dayjs(lastExpiryDate).format("DD-MM-YYYY")
          : dayjs().format("DD-MM-YYYY");
        if (shouldClearCart) {
          await handleClearCart(optionId, false, startDate);
        } else {
          await addToCart(startDate, optionId); // Pass optionId explicitly
        }
      } else if (plan?.allow_course_date_select === "1") {
        if (shouldClearCart) {
          await handleClearCart(optionId, true);
        } else {
          setIsModalVisible(true);
          setIsLoading(false);
        }
      } else {
        const startDate = dayjs().format("DD-MM-YYYY");
        if (shouldClearCart) {
          await handleClearCart(optionId, false, startDate);
        } else {
          await addToCart(startDate, optionId); // Pass optionId explicitly
        }
      }
    } catch (error) {
      console.error("Error checking cart data:", error);
      message.error("An error occurred while checking cart data.");
      resetSelection();
    }
  };

  const handleClearCart = async (
    optionId,
    showModal = false,
    presetDate = null
  ) => {
    Modal.confirm({
      title: "Cart Already Contains Items",
      content: "Please delete already added data to add a new one.",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          const clearCartResponse = await axiosInstance.post(
            "/v2_data_model/clearCart",
            { user_id: userId }
          );

          if (clearCartResponse?.data?.status === true) {
            message.success("Cart cleared successfully.");
            if (showModal) {
              setIsModalVisible(true);
              setIsLoading(false);
            } else {
              await addToCart(
                presetDate || dayjs().format("DD-MM-YYYY"),
                optionId
              );
            }
          } else {
            message.error("Failed to clear cart. Please try again.");
            resetSelection();
          }
        } catch (error) {
          console.error("Error clearing cart:", error);
          message.error("An error occurred while clearing the cart.");
          resetSelection();
        }
      },
      onCancel: () => {
        message.info("Action canceled.");
        resetSelection();
      },
    });
  };

  const resetSelection = () => {
    setSelectedInstallment(null);
    setSubscriptionId(null);
    setIsLoading(false);
  };

  const addToCart = async (date, subId = subscriptionId) => {
    if (!subId) {
      message.error("Subscription ID is missing. Please try again.");
      resetSelection();
      setIsLoading(false);
      return;
    }

    try {
      const addToCartResponse = await axiosInstance.post(
        API_ENDPOINTS.CBT.ADD_COURSE_TO_CART,
        {
          user_id: userId,
          course_id: courseId,
          subscription_id: subId, // Use the passed subId or state value
          course_start_date: date,
          facetofacecenter_id: 0,
          is_part_payment: 0,
          course_registration_amount: "",
          pending_amount: "",
          payment_id: "",
          id_fr_learning_center_detail: "",
          partner_member_id: "",
          booking_type: null,
          is_cbt: "",
          stages_type: "",
          stages_amount: "",
          start_date: "",
          end_date: "",
          slot_id: "",
          is_combo_master: plan?.is_combo_master ? plan.is_combo_master : null,
          //is_combo_master: plan.combo_course_id ? 1 : null,
          combo_course_id: plan.combo_course_id.join(","),
        }
      );

      if (addToCartResponse.data.status === true) {
        message.success("Course added to cart successfully!");
        navigate("/addToCart");
      } else {
        message.error("Failed to add course to cart.");
        resetSelection();
      }
    } catch (error) {
      console.error("Error adding course to cart:", error);
      message.error("An error occurred while adding the course to cart.");
      resetSelection();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (date, dateString) => {
    if (date) {
      setSelectedDate(date);
      setUseToday(false);
    }
  };

  const handleSelectToday = () => {
    setSelectedDate(dayjs());
    setUseToday(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    if (subscriptionId) {
      addToCart(dayjs(selectedDate).format("DD-MM-YYYY"), subscriptionId);
    } else {
      message.error("Subscription ID is missing. Please try again.");
      resetSelection();
    }
  };

  const calculateEndDate = () => {
    const durationText =
      plan.installment[selectedInstallment]?.name || "0 Months";
    const months = parseInt(durationText.match(/\d+/)[0]) || 0;
    return selectedDate
      ? dayjs(selectedDate).add(months, "months").format("DD MMM YYYY")
      : "";
  };

  useEffect(() => {
    if (!plan) {
      setIsModalVisible(false);
      setSelectedInstallment(null);
    }
  }, [plan]);

  if (!plan) {
    return <p>No plan data available.</p>;
  }
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
              <li>{plan.title}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="courseNewPlanBG">
        <div className="container">
          <div className="newinclusion">
            <div className="inclusion-section">
              <h3>Inclusion</h3>
              <ul>
                {plan.module_data
                  .filter((module) => module.exist === 1)
                  .map((module) => (
                    <li key={module.id}>
                      <span className="checkmark">✓</span> {module.module_name}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="monthlyPlanRate">
              <div className="row">
                {plan.installment.map((option, index) => (
                  <div
                    className={`boxrate ${
                      selectedInstallment === index ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => handleInstallmentSelect(index, option.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {selectedInstallment === index && (
                      <div className="checked">
                        <em className="fa fa-check"></em>
                      </div>
                    )}
                    <p>₹ {option.amount_description.payment[0]}</p>
                    <h3>{option.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {plan?.allow_course_date_select === "1" && (
        <Modal
          title="Start Date"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={400}
          className="date-picker-modal"
        >
          <div className="date-picker-content">
            {plan?.is_renew !== "1" && (
              <>
                <div
                  className={`today-button position-relative ${
                    useToday ? "selected" : ""
                  }`}
                  onClick={handleSelectToday}
                  style={{ cursor: "pointer" }}
                >
                  <span>Today</span>
                  {useToday && (
                    <CheckCircleFilled style={{ color: "#007aff" }} />
                  )}
                </div>
                <div className="or-divider">OR</div>
              </>
            )}
            <div className="select-date-label position-relative"></div>
            <div className="cekc position-relative">
              {selectedDate && !useToday && (
                <CheckCircleFilled style={{ color: "#007aff" }} />
              )}
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                format="DD MMM YYYY"
                style={{ width: "100%" }}
                disabledDate={(current) =>
                  current &&
                  current <
                    (plan?.is_renew === "1" && lastExpiryDate
                      ? dayjs(lastExpiryDate).add(1, "day")
                      : dayjs().startOf("day"))
                }
              />
            </div>

            <div className="validity-info">
              <strong>
                Validity:{" "}
                {plan.installment[selectedInstallment]?.name || "0 Months"}
              </strong>
              <div className="setofDateDiv">
                <h2>
                  Start Date:{" "}
                  <span>
                    {selectedDate
                      ? dayjs(selectedDate).format("DD MMM YYYY")
                      : "Select a date"}
                  </span>
                </h2>
                {/* <h2>
                  End Date: <span>{calculateEndDate()}</span>
                </h2> */}
                <h2>
                  End Date:{" "}
                  <span>
                    {dayjs(calculateEndDate())
                      .subtract(1, "day")
                      .format("DD MMM YYYY")}
                  </span>
                </h2>
              </div>
            </div>

            <p className="validity-note">
              Validity as per your chosen subscription and start date.
            </p>
            <Button
              type="primary"
              block
              onClick={handleModalClose}
              className="clandrBtnNewCreate"
            >
              {plan?.is_renew === "1" ? "Renew" : "Continue"}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CourseNewPlan;
