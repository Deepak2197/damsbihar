import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/my-payment/style.css";
import "../../assets/css/my-payment/responsive.css";

import axiosInstance from "../../API/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

//paytm
import { CheckoutProvider, Checkout } from "paytm-blink-checkout-react";
import Cookies from "js-cookie";
import InjectedCheckout from "./Injected-checkout";

// Embedded CONFIG

const TxnToken = Cookies.get("Token");
const OrderId = Cookies.get("Order");
const TotalAmount = Cookies.get("Amount");
const mId = "DelhiA83571901952164";
const web = "WEBSTAGING";
const mkey = "5jt552fcui1EYL_@";
// Function to register the user for CBT
const userId = sessionStorage.getItem("id");
const CONFIG = {
  style: {
    bodyBackgroundColor: "#fafafb",
    bodyColor: "",
    themeBackgroundColor: "#dfa231",
    themeColor: "#ffffff",
    headerBackgroundColor: "#284055",
    headerColor: "#ffffff",
    errorColor: "",
    successColor: "",
    card: {
      padding: "",
      backgroundColor: "",
    },
  },
  jsFile: "",
  data: {
    orderId: OrderId,
    amount: TotalAmount,
    token: TxnToken,
    tokenType: "TXN_TOKEN",
    userDetail: {
      mobileNumber: "",
      name: "",
    },
  },
  merchant: {
    mid: "DelhiA83571901952164",
    name: "Delhi Academy of Medical Science Pvt Ltd",
    logo: "https://www.damsdelhi.com/logo.png",
    redirect: false,
  },
  mapClientMessage: {},
  labels: {},
  payMode: {
    labels: {},
    filter: {
      exclude: [],
    },
    order: ["NB", "CARD", "LOGIN"],
  },
  flow: "DEFAULT",
};

const appendHandler = (config) => {
  const newConfig = { ...config };
  newConfig.handler = {
    notifyMerchant: notifyMerchantHandler,
    transactionStatus,
  };
  return newConfig;
};
const listCookie = Cookies.get("list");

async function transactionStatus(paymentStatus) {
  if (paymentStatus?.STATUS == "TXN_SUCCESS") {
    const res = await axiosInstance.post(
      API_ENDPOINTS.MY_PAYMENT.COMPLETE_TRANSACTION_CART,
      {
        list: listCookie,
        redeem_amount: 0,
        pre_transaction_id: preTransactionId,
        post_transaction_id: paymentStatus?.TXNID,
        affiliate_referral_code_by: "",
        earn_point_course_purchase: "",
        transaction_status_data: paymentStatus?.STATUS,
        user_id: userId,
        pay_via: "PAYTM",
      }
    );

    if (res?.data?.status === true) {
      toast.success(res.data.message);
      const paymentStatus = res.data.data;
      const url = `/success/PT${paymentStatus.payble_amount}D${paymentStatus.payment_date}TI${paymentStatus.transaction_status}OI${paymentStatus.order_id}`;
      window.location.href = url;
    }
  } else {
    window.location.href = `/failed/PT${paymentStatus?.TXNAMOUNT}D${paymentStatus?.TXNDATE}TI${paymentStatus?.TXNID}OI${paymentStatus?.ORDERID}`;
    window.Paytm.CheckoutJS.close();
  }
}

const notifyMerchantHandler = (eventType, data) => {};

//paytm
const Mypayment = () => {
  const [paymentData, setPaymentData] = useState([]);
  const user_id = sessionStorage.getItem("id");
  useEffect(() => {
    axiosInstance
      .post(API_ENDPOINTS.MY_PAYMENT.PARTIAL_STUDENT_LIST, {
        user_id: user_id,
      })
      .then((response) => {
        setPaymentData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  }, []);
  const handlePaymentRequest = async (
    pre_transaction_id,
    course_price,
    list
  ) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.MY_PAYMENT.PAYMENT_REQUEST_EXP_CHECKED,
        {
          user_id: user_id,
        }
      );
      if (response.data.status === true) {
        setOneMinuteCookie("preTransactionId", pre_transaction_id);
        setOneMinuteCookie("coursePrice", course_price);
        setOneMinuteCookie("list", list);
        getPaytmCalled();
      } else {
        toast.error("Payment Request Expired.");
        setTimeout(() => {
          location.reload(true);
        }, 3000);
      }
    } catch (err) {}
    //toast.error("Currently available on app only!.");
  };

  //paytm
  const mConfigTextAreaRef = useRef();
  const [mConfig, setMConfig] = useState(appendHandler(CONFIG));
  const [checkoutJsInstance, setCheckoutJsInstance] = useState(null);
  const mConfigTextAreaVal = JSON.stringify(mConfig, null, 4);

  const setOneMinuteCookie = (key, value) => {
    const expires = new Date(new Date().getTime() + 20 * 2000); // 1 minute from now
    Cookies.set(key, value, { expires });
  };

  const getPaytmCalled = async (data) => {
    try {
      const response2 = await axiosInstance.post(
        API_ENDPOINTS.MY_PAYMENT.GERNATE_PAYTM_SHECKSUM_SUM,
        {
          MID: mId,
          ORDER_ID: Cookies.get("preTransactionId"),
          PAYTM_MERCHANT_KEY: mkey,
          PAYTM_MERCHANT_WEBSITE: web,
          CHANNEL_ID: "WEB",
          CUST_ID: userId,
          WEBSITE: "DEFAULT",
          user_id: userId,
          TXN_AMOUNT: Cookies.get("coursePrice"),
          CALLBACK_URL: "",
        }
      );
      const { txnToken, order_id, TXN_AMOUNT } = response2.data;

      setOneMinuteCookie("TxnToken", txnToken);
      setOneMinuteCookie("OrderId", order_id);
      setOneMinuteCookie("TotalAmount", TXN_AMOUNT);
      // Update mConfig with new order details
      setMConfig((prevConfig) => ({
        ...prevConfig,
        data: {
          ...prevConfig.data,
          orderId: order_id,
          amount: TXN_AMOUNT,
          token: txnToken,
        },
      }));
      getThirdCalled();
    } catch (err) {}
  };
  const getThirdCalled = async () => {
    const url =
      "https://secure.paytmpayments.com/merchantpgpui/checkoutjs/merchants/";
    const scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = url.concat(mConfig.merchant.mid);
    scriptElement.type = "application/javascript";
    scriptElement.onload = () => {
      const checkoutJsInstance = getCheckoutJsObj();
      if (checkoutJsInstance.onLoad) {
        checkoutJsInstance.onLoad(() => {
          const TxnToken = Cookies.get("TxnToken");
          const OrderId = Cookies.get("OrderId");
          const TotalAmount = Cookies.get("TotalAmount");
          if (!TxnToken || !OrderId || !TotalAmount) {
            // console.error(
            //   "Missing necessary transaction details from localStorage"
            // );
            return;
          }

          const config = {
            ...mConfig,
            handler: {
              notifyMerchant: notifyMerchantHandler,
              transactionStatus,
            },
            data: {
              ...mConfig.data,
              orderId: OrderId,
              amount: TotalAmount,
              token: TxnToken,
            },
          };
          setMConfig(appendHandler(config));
          setCheckoutJsInstance(checkoutJsInstance);
        });
      } else {
        console.error("CheckoutJS onLoad method not available!");
      }
    };
    scriptElement.onerror = (error) => {
      console.error("CheckoutJS script load failed!", error);
    };
    document.body.appendChild(scriptElement);
  };

  const get_user_cbt_reg = async () => {
    let Cbtid = JSON.parse(localStorage.getItem("Cbtid"));
    let is_cbt_type = JSON.parse(localStorage.getItem("is_cbt_type"));
    try {
      const res = await axiosInstance.post(API_ENDPOINTS.MY_PAYMENT.GET_USER_CBT_REG, {
        user_id: user_id,
        cbt_id: Cbtid,
        region_id: JSON.parse(localStorage.getItem("region_id")),
        mode: is_cbt_type === "1" ? "CBT" : "IBT",
      });
    } catch (err) {}
  };
  return (
    <>
      <div className="my-payment">
        <div className="page-content position-relative">
          <div className="breadcrumb-row">
            <div className="container">
              <ul className="list-inline">
                <li>
                  <a href={"/"}>Home</a>
                </li>
                <li>My Payment</li>
              </ul>
            </div>
          </div>
        </div>
        <section className="my-payment" style={{ marginBottom: "15%" }}>
          {/* {paymentData.emedicoz_partial_list?.length > 0 || paymentData.partner_request_list?.length > 0 ? ( */}
          {paymentData.emedicoz_partial_list != "" ||
          paymentData.partner_request_list != "" ? (
            <div className="container">
              {paymentData.emedicoz_partial_list?.length > 0 && (
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <h4>Pay Partial Payment</h4>
                  </div>
                </div>
              )}
              <div className="row">
                {paymentData.emedicoz_partial_list?.map((emedlist, index) => (
                  <div
                    key={index}
                    className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4"
                  >
                    <div className="foundation-live">
                      <div className="row">
                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                          <img
                            src={`${base_url}assets/images/my-payment/neetpg-course.svg`}
                            loading="lazy"
                            alt="image"
                          />
                        </div>
                        <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                          <h2>{emedlist.title}</h2>
                          <h3>
                            Course Type:{" "}
                            <span className="side-text">
                              {emedlist.availability_course === "2"
                                ? "Face to face"
                                : ""}
                            </span>
                          </h3>
                          <h4>
                            Plan Type:{" "}
                            <span className="side-text">
                              {emedlist.subscription_name}
                            </span>
                          </h4>
                          <h5>
                            Course Price:{" "}
                            <span className="side-text2">
                              ₹ {emedlist.full_amount}
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div className="found-table">
                            <div className="table-responsive">
                              <table
                                className="table"
                                summary="New York City Marathon Results 2013"
                              >
                                <tbody>
                                  <tr>
                                    <td>Received Payment</td>
                                    <td className="right-text">
                                      ₹ {emedlist.received_amount}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Taxes</td>
                                    <td className="right-text">
                                      ₹ {emedlist.total_gst_amount}
                                    </td>
                                  </tr>
                                  <tr className="border-bottom">
                                    <td>
                                      <span className="text-weight">
                                        Total Amount
                                      </span>
                                    </td>
                                    <td className="right-text">
                                      <span className="text-weight">
                                        ₹ {emedlist.course_price}
                                      </span>
                                    </td>
                                  </tr>
                                  <tr className="border-top">
                                    <td>
                                      <span className="text-weight2">
                                        Due Amount:
                                      </span>
                                    </td>
                                    <td className="right-text">
                                      <span className="text-weight2">
                                        ₹ {emedlist.pending_amount}+taxes
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <button
                            className="btn pay-btn add_cart"
                            data-course_id={emedlist.course_id}
                            data-user_id={emedlist.id}
                            data-subsid={emedlist.subscription_id}
                            data-course_startdate={emedlist.course_start_date}
                            data-facetoface_center_id={
                              emedlist.facetoface_center_id
                            }
                            data-course_reg_amount={emedlist.received_amount}
                            data-pending_amount={emedlist.pending_amount}
                            data-payment_id={emedlist.payment_id}
                          >
                            PAY NOW
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {paymentData.partner_request_list?.length > 0 && (
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <h4>Pay Payment Request</h4>
                  </div>
                </div>
              )}
              <div className="row">
                {paymentData.partner_request_list?.map((plist, index) => (
                  <div
                    key={index}
                    className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4"
                  >
                    <div className="foundation-live">
                      <div className="row">
                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                          <div className="logoset">
                            <img
                              src="https://www.damsdelhi.com/logo.png"
                              loading="lazy"
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                          <h2>{plist.title}</h2>
                          <h3>
                            Course Type:{" "}
                            {plist.product_type === "1" &&
                            plist.availability_course === "1" ? (
                              <span className="side-text">Book</span>
                            ) : plist.product_type === "1" &&
                              plist.availability_course === "" ? (
                              <span className="side-text">Book</span>
                            ) : plist.product_type === "0" &&
                              plist.availability_course === "1" ? (
                              <span className="side-text">Online</span>
                            ) : plist.product_type === "0" &&
                              plist.availability_course === "2" ? (
                              <span className="side-text">Face to face</span>
                            ) : null}
                          </h3>
                          <h4>
                            Plan Type:{" "}
                            <span className="side-text">
                              {plist.subscription_name}
                            </span>
                          </h4>
                          <h5>
                            Course Price:{" "}
                            <span className="side-text2">
                              ₹{" "}
                              {plist.list[0].is_part_payment === "1"
                                ? plist.full_amount
                                : plist.course_base_price}
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div className="found-table">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>
                                      <span className="text-weight">
                                        Order ID
                                      </span>
                                    </th>
                                    <th className="right-text">
                                      <span className="text-weight">
                                        {plist.pre_transaction_id}
                                      </span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      {plist.list[0].is_part_payment === "1"
                                        ? "Pay Amount"
                                        : "Pay Amount"}
                                    </td>
                                    <td className="right-text">
                                      ₹{" "}
                                      {plist.list[0].is_part_payment === "1"
                                        ? plist.received_amount
                                        : plist.course_base_price}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Taxes</td>
                                    <td className="right-text">
                                      ₹ {plist.tax}
                                    </td>
                                  </tr>
                                  {plist.product_type === "1" &&
                                  plist.availability_course === "1" ? (
                                    <>
                                      <tr
                                        style={{
                                          borderBottom: "1px solid #ccc",
                                        }}
                                      >
                                        <td>
                                          <span className="text-weight">
                                            Total Amount
                                          </span>
                                        </td>
                                        <td className="right-text">
                                          <span className="text-weight">
                                            ₹ {plist.course_base_price}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <span className="text-weight">
                                            Shipping Charge
                                          </span>
                                        </td>
                                        <td className="right-text">
                                          <span className="text-weight">
                                            ₹ {plist.shipping_charge}
                                          </span>
                                        </td>
                                      </tr>
                                    </>
                                  ) : plist.product_type === "1" &&
                                    plist.availability_course === "" ? (
                                    <>
                                      <tr
                                        style={{
                                          borderBottom: "1px solid #ccc",
                                        }}
                                      >
                                        <td>
                                          <span className="text-weight">
                                            Total Amount
                                          </span>
                                        </td>
                                        <td className="right-text">
                                          <span className="text-weight">
                                            ₹ {plist.course_base_price}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <span className="text-weight">
                                            Shipping Charge
                                          </span>
                                        </td>
                                        <td className="right-text">
                                          <span className="text-weight">
                                            ₹ {plist.shipping_charge}
                                          </span>
                                        </td>
                                      </tr>
                                    </>
                                  ) : (
                                    <tr>
                                      <td>
                                        <span className="text-weight">
                                          Total Amount
                                        </span>
                                      </td>
                                      <td className="right-text">
                                        <span className="text-weight">
                                          ₹ {plist.course_price}
                                        </span>
                                      </td>
                                    </tr>
                                  )}
                                  {plist.list[0].is_part_payment === "1" && (
                                    <tr className="border-top">
                                      <td>
                                        <span className="text-weight2">
                                          Due Amount:
                                        </span>
                                      </td>
                                      <td className="right-text">
                                        <span className="text-weight2">
                                          ₹ {plist.pending_amount}+taxes
                                        </span>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <textarea
                        cols="50"
                        rows="25"
                        defaultValue={mConfigTextAreaVal}
                        ref={mConfigTextAreaRef}
                        style={{ display: "none" }}
                      />

                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <button
                            className="btn pay-btn payment-request"
                            onClick={() => {
                              handlePaymentRequest(
                                plist.pre_transaction_id,
                                plist.course_price,
                                JSON.stringify(plist.list)
                              );
                              loadCheckoutScript();
                            }}
                          >
                            PAY NOW
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <center>
              <p>Record Not Found</p>
            </center>
          )}
        </section>
      </div>
      <CheckoutProvider
        config={mConfig}
        checkoutJsInstance={checkoutJsInstance}
        openInPopup={true}
        env="STAGE"
      >
        <InjectedCheckout />
        <Checkout />
      </CheckoutProvider>
    </>
  );
};

export default Mypayment;
