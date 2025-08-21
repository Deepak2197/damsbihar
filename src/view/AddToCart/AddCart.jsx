import React, { useEffect, useRef, useState, useMemo } from "react";
import { getCurrentDateTime } from "../../ulits/dateTime";
import axiosInstance from "../../API/axiosConfig";
import { CiTrash } from "react-icons/ci";
import "../../assets/css/cart-page/style.css";
import { CheckoutProvider, Checkout } from "paytm-blink-checkout-react";
import { toast } from "react-toastify";

import { addToCart, clearCart, removeFromCart } from "../../network/cartSlice";
import {
  Button,
  Radio,
  Checkbox,
  List,
  Modal,
  Popconfirm,
  Skeleton,
  Spin,
  Switch,
} from "antd";
import Price from "./PriceDetail/Price";
import Address from "./Address/Address";
import Coupan from "./Coupon/Coupan";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import InjectedCheckout from "./Injected-checkout";
import { Spinner } from "react-bootstrap";
import { TbCoinRupee } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
import MY_BASE_RZP from "../../API/MY_BASE_RZP";
import getPaytmMerchantUrl from "../../API/MY_PAYTM_MERCHANTPG";
const currentDateTime = getCurrentDateTime();
// Embedded CONFIG
const TxnToken = Cookies.get("TxnToken");
const OrderId = Cookies.get("OrderId");
const TotalAmount = Cookies.get("TotalAmount");

// Function to register the user for CBT
const userId = sessionStorage.getItem("id");
const get_user_cbt_reg = async () => {
  const Cbtid = JSON.parse(localStorage.getItem("Cbtid"));

  try {
    const res = await axiosInstance.post("/v2_data_model/get_user_cbt_reg", {
      user_id: userId,
      cbt_id: Cbtid,
      //region_id: location?.state?.isRegionID,
      region_id: sessionStorage.getItem("cbtregionId")?.replace(/"/g, ""),
      // mode: location?.state?.isCbtID == "1" ? "CBT" : "IBT",
      mode: "CBT",
    });
    // console.log(res);

    const paymentData = JSON.parse(sessionStorage.getItem("paymentData"));

    const url = `/sucess_cbt/PT${paymentData.payble_amount}D${paymentData.payment_date}TI${paymentData.transaction_status}OI${paymentData.order_id}`;
    window.location.href = url;
  } catch (err) {
    console.log(err);
  }
};

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
    logo: "https://emed-student-qa.damsdelhi.com/logo.png",
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

async function transactionStatus(paymentStatus) {
  const userid = sessionStorage.getItem("id");
  if (paymentStatus?.STATUS == "TXN_SUCCESS") {
    const res = await axiosInstance.post(
      "v2_data_model/complete_transaction_cart",
      {
        list: sessionStorage.getItem("courselist"),

        redeem_amount: 0,
        pre_transaction_id: paymentStatus?.ORDERID,
        post_transaction_id: paymentStatus?.TXNID,
        affiliate_referral_code_by: "",
        earn_point_course_purchase: "",
        transaction_status_data: paymentStatus?.STATUS,
        user_id: userid,
        pay_via: "PAYTM",
      }
    );
    // window.location.href = `/success/PT${paymentStatus?.TXNAMOUNT}D${paymentStatus?.TXNDATE}TI${paymentStatus?.TXNID}OI${paymentStatus?.ORDERID}`;
    // window.Paytm.CheckoutJS.close();
    // console.log("res--------", res.data);

    // if (res.data.status == true) {
    //   toast.success(res.data.message);
    //   sessionStorage.setItem("paymentData", res.data.data);
    //   const is_cbt_type = JSON.parse(localStorage.getItem("CbtType"));

    //   if (is_cbt_type === "1") {
    //     get_user_cbt_reg();
    //   } else {
    //     console.log("else 108 => ", res.data.status);
    //     window.location.href = `/success/PT${paymentStatus?.TXNAMOUNT}D${paymentStatus?.TXNDATE}TI${paymentStatus?.TXNID}OI${paymentStatus?.ORDERID}`;
    //     window.Paytm.CheckoutJS.close();
    //   }
    // }
    if (res?.data?.status === true) {
      toast.success(res.data.message);

      // Convert the response data to a JSON string before saving it in session storage
      sessionStorage.setItem("paymentData", JSON.stringify(res.data.data));

      // Retrieve the CBT type from local storage and parse it
      const is_cbt_type = JSON.parse(localStorage.getItem("CbtType"));

      if (is_cbt_type === "1") {
        // Call the function to register the user for CBT
        get_user_cbt_reg();
      } else {
        // Construct the URL with the appropriate parameters
        const paymentStatus = res.data.data;
        const url = `/success/PT${paymentStatus.payble_amount}D${paymentStatus.payment_date}TI${paymentStatus.transaction_status}OI${paymentStatus.order_id}`;

        // Redirect to the success page
        window.location.href = url;

        // Close the Paytm CheckoutJS if it's open
        if (window.Paytm && window.Paytm.CheckoutJS) {
          window.Paytm.CheckoutJS.close();
        }
      }
    }
  } else {
    window.location.href = `/failed/PT${paymentStatus?.TXNAMOUNT}D${paymentStatus?.TXNDATE}TI${paymentStatus?.TXNID}OI${paymentStatus?.ORDERID}`;
    window.Paytm.CheckoutJS.close();
  }
}

const notifyMerchantHandler = (eventType, data) => {};

const AddCart = () => {
  const { cbtregionId } = useSelector((state) => state.cart);

  if (cbtregionId) {
    sessionStorage.setItem("cbtregionId", cbtregionId);
  }

  const cValue = sessionStorage.getItem("coupanV");
  const userid = sessionStorage.getItem("id");
  const subId = localStorage.getItem("subID");
  const nav = useNavigate();

  const [selectedGateway, setSelectedGateway] = useState(null);
  const location = useLocation();

  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoCoupleToggle, setAutoCoupleToggle] = useState();
  const [cartData, setCartData] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [coupanValue, setCoupanValue] = useState("");
  const [afterDeductionData, setAfterDeductionData] = useState({});

  const [refreldata, setReferal] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [coupanLoading, setCoupanLoading] = useState(false);
  const [coupanListData, setCoupanListData] = useState([]);
  const [coupanToogle, setCoupanToogle] = useState(false);
  const [gstTotalData, setGstTotalData] = useState({});
  const [shipingValue, setShipingValue] = useState("");
  const [productType, setProductType] = useState("");
  const [shipingData, setShipingData] = useState({});
  const mConfigTextAreaRef = useRef();
  const [showAddress, setShowAddress] = useState({});
  const [defaultAddressModal, setDefaultAddressModal] = useState(false);
  const [coupanInp, setCoupanInp] = useState("");
  const [comLoading, setComLoading] = useState(false);
  const [payToggle, setPayToggle] = useState(false);

  {
    /*  */
  }
  const [totalCourselAmount, setTotalCourselAmount] = useState(0);
  useEffect(() => {
    if (cartData.length > 0) {
      const total = cartData.reduce(
        (sum, course) => sum + Number(course?.final_amount || 0),
        0
      );
      setTotalCourselAmount(total);
    }
    payToggle && console.log("total payment");
  }, [payToggle]);
  {
    /*  */
  }

  const [payModeArr, setPayModeArr] = useState([]);

  const [coinLoading, setCoinLoading] = useState(false);
  const [coin, setCoin] = useState({});
  const [coinSwitch, setCoinSwitch] = useState();
  const [coinAfterApplyData, setCoinAfterApplyData] = useState({});
  const [notApplyCoin, setNotApplyCoin] = useState(null);
  const [rmship, setrmship] = useState(null);
  const [bookship, setbookship] = useState(null);
  const [mConfig, setMConfig] = useState(appendHandler(CONFIG));
  const [checkoutJsInstance, setCheckoutJsInstance] = useState(null);
  const mConfigTextAreaVal = JSON.stringify(mConfig, null, 4);

  const userData = sessionStorage.getItem("userData");
  const [showSpin, setShowSpin] = useState(false);

  const [counter, setCounter] = useState("");
  const dispatch = useDispatch();

  const iscomb = sessionStorage.getItem("combo_course_id");
  const setOneMinuteCookie = (key, value) => {
    const expires = new Date(new Date().getTime() + 20 * 1000); // 1 minute from now
    Cookies.set(key, value, { expires });
  };
  const referralData = useMemo(
    () => ({
      refer_code:
        refreldata === 1
          ? Object.keys(afterDeductionData).length > 0
            ? afterDeductionData.coupon_code
            : ""
          : "",
      coupon_applied:
        refreldata === 2
          ? Object.keys(afterDeductionData).length > 0
            ? afterDeductionData.coupon_code
            : ""
          : "",
    }),
    [refreldata, afterDeductionData]
  );

  // when render component the call first time
  const getCartData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        API_ENDPOINTS.MEDIMART.GET_USER_CART_DATA,
        {
          user_id: userid,
        }
      );
      setrmship(res?.data?.data?.is_shipping_charge_include);
      setbookship(res?.data?.data?.is_multiorder_shipping_charge);

      if (res.data.status === false) {
        setCartData([]);
        setLoading(false);
      } else {
        if (
          res?.data?.data?.list[0]?.is_shipping === "1" ||
          res?.data?.data?.list[0]?.product_type === "2"
        ) {
          setShipingValue(res?.data?.data?.list[0]?.is_shipping);
          setProductType(res?.data?.data?.list[0]?.product_type);
        }
        setCoupanValue(res?.data?.data?.walletBalanceAmount);
        setCartData(res?.data?.data?.list);
        setAllData(res?.data?.data);
        getAddressListRequest();
        dispatch(addToCart(res?.data?.data?.list));
        setLoading(false);

        // getAddressList();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  let is_multiorder = 0;

  if (cartData.length === 1) {
    is_multiorder = 0;
  } else if (cartData.length > 1) {
    const hasMultiOrder2 = cartData.some(
      (item) => item.is_multiorder === "2" || item.is_multiorder === 2
    );

    is_multiorder = hasMultiOrder2 ? 2 : 1;
  }

  //console.log("is_multiorder:", is_multiorder);

  //if allData has a coupan_code the this api call
  const handlerCoupanApply = async (itm) => {
    const cart = itm?.list[0];

    let flag;
    if (cart?.product_type === "1" || cart?.product_type === "2") {
      flag = "book";
    } else if (cart?.product_type === "0" && cart?.course_type === "9") {
      if (cart?.availability_course == "2") {
        flag = "facetoface";
      } else {
        flag = "online";
      }
    } else {
      flag = "online";
    }

    const arrPrice = itm.list.map((it) => it.final_amount);
    const arrId = itm.list.map((it) => it.id);

    const res = {
      user_id: userid,
      coupon_code: itm?.coupon_code,
      is_part_payment: "",
      coupon_for: "",
      coupon_value: "",
      coupon_type: "",
      is_new: "",

      capping_value: "",
      maximum_discount_value: "",
      minimum_value: "",
      coupon_max_use: "",
      flage: flag,
      qty: 1,
      course_price: arrPrice.join(", "),
      is_manual: "is_manual",
      user_use: "",
      eMedicoz_user: "2",
      new_coupon: "1",
      course_subscription_id: "0",
      check_iscombo: iscomb ? "1" : "0",
      check_ismultiorder: 1,
      course_id: arrId.join(", "),
    };

    try {
      setAutoCoupleToggle(true);
      const resp = await axiosInstance.post(
        API_ENDPOINTS.ADD_TO_CART.APPLY_CART_COUPON,
        res
      );

      if (resp.data.status === true) {
        setReferal(resp?.data?.data?.is_referal);
        setCoupanInp(res.data.data.coupon_code);
        setAfterDeductionData(resp?.data?.data);
        toast.success(resp?.data?.message);
        setAutoCoupleToggle(false);
      } else {
        toast.error(resp.data.message);
        setAutoCoupleToggle(false);
      }
    } catch (error) {
      console.log(error);
      setAutoCoupleToggle(false);
    }
  };

  const getAddressListRequest = async () => {
    try {
      const resp = await axiosInstance.post(
        API_ENDPOINTS.ADD_TO_CART.GET_ADDRESS,
        {
          user_id: userid,
        }
      );
      setAddressData(resp?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoupanListFetch = async () => {
    try {
      setCoupanLoading(true);
      const res = await axiosInstance.post(
        API_ENDPOINTS.ADD_TO_CART.GET_COUPON_LIST,
        {
          user_id: userid,
          course_id: cartData[0]?.id,
          flage: cartData[0]?.product_type === "0" ? "online" : "book",
          partner_id: "",
        }
      );
      setCoupanListData(res.data.data);
      setCoupanLoading(false);
      setCoupanToogle(true);
    } catch (err) {
      console.log(err);
      setCoupanLoading(false);
    }
  };

  const getGstCalculate = async (data) => {
    const cName = localStorage.getItem("coupan");
    const cart = cartData[0];
    //let flag;
    // if (cart?.product_type === "1" || cart?.product_type === "2") {
    //   flag = "book";
    // } else {
    //   flag = "online";
    // }
    let flag = "";
    if (
      (cart?.product_type === "1" &&
        (cart?.course_type === "1" || cart?.course_type === "0")) ||
      (cart?.product_type === "2" && cart?.course_type === "0")
    ) {
      flag = "Book";
    } else if (cart?.product_type === "2" && cart?.course_type === "1") {
      flag = "ecommerce";
    } else if (
      cart?.product_type === "0" &&
      ["7", "1", "9", "10"].includes(cart?.course_type)
    ) {
      flag = "Online";
    }
    const list = [];
    cartData.forEach((val) => {
      list.push({
        course_id: val.id,
        net_amount: val.final_amount,
      });
    });

    const isDefaultId = data?.filter((val) => val.is_default === "1");
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.ADD_TO_CART.CALCULATE_GST,
        {
          course_list: JSON.stringify(list),
          user_id: userid,
          user_address_id: isDefaultId[0]?.id,
          partner_id: "",
          is_shipping_charge_include: iscomb ? rmship : bookship,
          offer_discount_amount: afterDeductionData?.discount_amount
            ? afterDeductionData?.discount_amount
            : "0",
          reward_discount_amount: 0,
          is_apply_reward_all: 0,
          coupon_code: coupanInp,
          flag: flag,
          is_refral_code: refreldata ?? "",
          availability_course: 0,
          product_type: cartData[0].product_type ?? "",
          facetoface_center_id: cartData[0].facetoface_center_id ?? "",
        }
      );
      const filterData = cartData.filter((itm) => itm.is_shipping === "1");
      setGstTotalData(res?.data?.data);
      if (
        (cartData[0]?.is_shipping === "1" && data.length > 0) ||
        cartData[0]?.productType === "2" ||
        filterData.length > 0
      ) {
        if (iscomb && rmship == 1) {
          getFetchShippingCharges(cartData, data);
        } else if (!iscomb && bookship == 1) {
          getFetchShippingCharges(cartData, data);
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  useEffect(() => {
    if (allData?.coupon_code) {
      handlerCoupanApply(allData);
    }
  }, [allData]);

  const handleRemoveCourse = async (id) => {
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.ADD_TO_CART.REMOVE_COURSE_FROM_CART,
        {
          user_id: userid,
          course_id: id,
        }
      );
      toast.success(res.data.message);
      getCartData();
    } catch (error) {
      console.log(error);
    }
  };

  const handlerCoupanApplyByUser = async (val) => {
    localStorage.setItem("coupan", val.coupon_tilte);
    const cart = cartData[0];

    let flag;
    if (cart.product_type === "1" || cart.product_type === "2") {
      flag = "book";
    } else if (cart.product_type === "0" && cart.course_type === "9") {
      if (cart.availability_course === "2") {
        flag = "facetoface";
      } else {
        flag = "online";
      }
    } else {
      flag = "online";
    }
    const arrPrice = cartData.map((it) => it.final_amount);
    const arrId = cartData.map((it) => it.id);

    const res = {
      user_id: userid,
      coupon_code: val?.coupon_tilte,
      is_part_payment: "",
      coupon_for: val.coupon_for,
      coupon_value: val.coupon_value,
      coupon_type: val.coupon_type,
      is_new: val.is_new,

      capping_value: val?.capping_value,
      maximum_discount_value: val?.maximum_discount_value,
      minimum_value: val?.minimum_value,
      coupon_max_use: val?.coupon_max_use,
      flage: flag,
      qty: 1,
      course_price: arrPrice.join(", "),
      //course_price: flag === "book" ? cart?.final_amount : "",
      // course_price: cart.price * cart.qty,
      is_manual: "",
      user_use: "",
      eMedicoz_user: "",
      new_coupon: "",
      course_subscription_id: cart?.subscription_data.id,
      check_iscombo: val?.check_iscombo,
      check_ismultiorder: val?.check_ismultiorder,
      //course_id: cart?.id,
      course_id: arrId.join(", "),
      //check_ismultiorder: cartData?.length > 1 ? "1" : "0",
    };
    try {
      setAutoCoupleToggle(true);
      const resp = await axiosInstance.post(
        API_ENDPOINTS.ADD_TO_CART.APPLY_CART_COUPON,
        res
      );
      if (resp.data.status === true) {
        setAfterDeductionData(resp?.data?.data);
        setReferal(resp?.data?.data?.is_referal);
        setCoupanInp(resp?.data?.data?.coupon_code);
        toast.success(resp.data.message);
        setAutoCoupleToggle(false);
        setCoinSwitch(false);
      } else {
        toast.error(resp.data.message);
        setAutoCoupleToggle(false);
      }
    } catch (error) {
      setAutoCoupleToggle(false);
    }
    setIsChecked(false);
    setCoupanToogle(false);
  };

  useEffect(() => {
    if (isChecked) {
      handlerClear();
    }
  }, [isChecked]);
  const handlerClear = async () => {
    setCoupanInp("");
    // handlerCoupanApply(allData);
    const cart = cartData[0];

    let flag;
    if (cart?.product_type === "1" || cart?.product_type === "2") {
      flag = "book";
    } else if (cart?.product_type === "0" && cart?.course_type === "9") {
      if (cart?.availability_course === "2") {
        flag = "facetoface";
      } else {
        flag = "online";
      }
    } else {
      flag = "online";
    }

    const res = {
      user_id: userid,
      coupon_code: "",
      is_part_payment: "",
      coupon_for: "",
      coupon_value: "",
      coupon_type: "",
      is_new: "",

      capping_value: "",
      maximum_discount_value: "",
      minimum_value: "",
      coupon_max_use: "",
      flage: flag,
      qty: 1,
      course_price: cart?.final_amount,
      is_manual: "is_manual",
      user_use: "",
      eMedicoz_user: "2",
      new_coupon: "1",
      course_subscription_id: "0",
      check_iscombo: "0",
      check_ismultiorder: 0,
      course_id: cart?.id,
    };

    try {
      setAutoCoupleToggle(true);
      const resp = await axiosInstance.post(
        API_ENDPOINTS.ADD_TO_CART.APPLY_CART_COUPON,
        res
      );
      setReferal(resp?.data?.data?.is_referal);
      setCoupanInp(resp.data.data.coupon_code);
      setAfterDeductionData(resp?.data?.data);
      // setIsChecked(false);
      setAutoCoupleToggle(false);
      setCoinSwitch(false);
    } catch (error) {
      console.log(error);
      setAutoCoupleToggle(false);
    }
  };

  const handlerApplyCoupan = async () => {
    const fAmount = cartData.map((itm) => itm.final_amount);
    const cId = cartData.map((itm) => itm.id);

    if (!coupanInp) {
      toast.error("Please enter coupon");
    } else {
      const cart = cartData[0];
      let flag;
      if (cart?.product_type === "1" || cart?.product_type === "2") {
        flag = "book";
      } else if (cart?.product_type === "0" && cart?.course_type === "9") {
        if (cart?.availability_course === "2") {
          flag = "facetoface";
        } else {
          flag = "online";
        }
      } else {
        flag = "online";
      }
      try {
        setAutoCoupleToggle(true);
        const res = await axiosInstance.post(
          API_ENDPOINTS.ADD_TO_CART.APPLY_CART_COUPON,
          {
            user_id: userid,
            coupon_code: coupanInp,
            is_part_payment: "",
            coupon_for: null,
            coupon_value: null,
            coupon_type: null,
            is_new: null,
            capping_value: null,
            maximum_discount_value: null,
            minimum_value: null,
            coupon_max_use: null,
            flage: flag,
            qty: "1",
            course_price:
              cartData.length > 1
                ? fAmount.join(" ,")
                : cartData[0]?.final_amount,
            is_manual: "is_manual",
            user_use: "",
            eMedicoz_user: " 2",
            new_coupon: "1",
            course_subscription_id: cart?.subscription_data.id,
            check_iscombo: "0",
            check_ismultiorder: cartData.length > 0 ? "1" : "0",
            course_id: cartData.length > 1 ? cId.join(" ,") : cart?.id,
          }
        );

        // console.log(res.data);
        if (res.data.status === true) {
          setReferal(res?.data?.data?.is_referal);
          setCoupanInp(res.data.data.coupon_code);
          setAfterDeductionData(res?.data?.data);
          setIsChecked(false);
          toast.success(res?.data?.message);
          setAutoCoupleToggle(false);
        } else {
          toast.error("Invalid Coupan");

          setCoupanInp("");
          setIsChecked(false);
          setAutoCoupleToggle(false);
        }
      } catch (error) {
        console.log(error);
        setAutoCoupleToggle(false);
      }
      setCoupanToogle(false);
    }
  };

  const handleOk = async (data) => {
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.MY_ADDRESS.SET_DEFAULT_ADDRESS,
        {
          user_id: userid,
          address_id: data.id,
        }
      );
      toast.success("Default Addess Selected");
      setDefaultAddressModal(false);
      getCartData();
    } catch (err) {
      console.log(err);
    }
  };

  const handlerSelectedAddress = (data) => {
    setShowAddress(data);
    setDefaultAddressModal(data);
  };

  // const handleCheckboxChange = (event) => {
  //   console.log(
  //     coupanValue > gstTotalData?.total_payble_amount
  //       ? Number(gstTotalData?.total_payble_amount).toFixed(2)
  //       : coupanValue
  //   );
  //   setIsChecked(event.target.checked);
  // };
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      const walletValue =
        coupanValue > gstTotalData?.total_payble_amount
          ? Number(gstTotalData?.total_payble_amount).toFixed(2)
          : coupanValue;
      localStorage.setItem("walletValue", walletValue);
    } else {
      localStorage.removeItem("walletValue");
    }
    setIsChecked(isChecked);
  };

  var i = 1;
  const incrementCount = (val) => {
    const filter = cartData.filter((itms) => itms.id === val.id);
    var qty = parseFloat(filter[0].qty) + i;
    update_book_qty_to_cart(qty, val);
  };

  var i = 1;
  const decrementCount = (val) => {
    const filter = cartData.filter((itms) => itms.id === val.id);
    if (counter !== 1) {
      var qty = parseFloat(filter[0].qty) - i;

      update_book_qty_to_cart_minus(qty, val);
    }
  };

  const update_book_qty_to_cart = async (qty, d) => {
    try {
      const responce = await axiosInstance.post(
        `/v2_data_model/updateBookQtyToCart`,
        {
          user_id: userid,
          book_id: d.id,
          variant: d.variant,
          qty: qty,
        }
      );
      if (responce) {
        getCartData();
        if (responce.data.message == "Book Qty has been added to cart.") {
          setCouponData("");
          // setCouponStatus(true);
          toast.success("Item Qty has been added");
        } else {
          handlerClear();
          toast.success("Item has been added to your cart");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const update_book_qty_to_cart_minus = async (qty, d) => {
    try {
      const responce = await axiosInstance.post(
        `/v2_data_model/updateBookQtyToCart`,
        {
          user_id: userid,
          book_id: d.id,
          variant: d.variant,
          qty: qty,
        }
      );
      if (responce) {
        getCartData();
        // setCouponStatus(true);
        if (responce.data.message == "Book Qty has been added to cart.") {
          setCouponData("");
          toast.success("Item Qty has been removed");
        } else {
          handlerClear();
          toast.success("Item has been removed from your cart");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPaymentModeFetch = async () => {
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.ADD_TO_CART.GET_PAYMENT_GATEWAY
      );

      // Filter only Paytm from API response
      const paytmGateway = res?.data?.data?.filter(
        (itm) => itm.payment_gateway_name === "Paytm"
      );

      // Check conditions for availability_course
      if (
        cartData[0]?.availability_course === "2" ||
        cartData[0]?.availability_course === "3"
      ) {
        setPayModeArr(paytmGateway);
      } else {
        setPayModeArr(res?.data?.data); // Show all payment methods
      }
    } catch (error) {
      console.log(error);
    }
  };

  var fina =
    Object.keys(shipingData).length > 0
      ? shipingData?.shipping_charge + gstTotalData?.total_payble_amount
      : gstTotalData?.total_payble_amount;

  const handlerOpenPayModal = () => {
    if (isChecked == true && fina <= 0) {
      handleinitialize();
    } else {
      setPayToggle(true);
    }
  };

  useEffect(() => {
    if (autoCoupleToggle === false) {
      getGstCalculate(addressData);
    }
  }, [autoCoupleToggle]);

  useEffect(() => {
    if (payToggle) {
      getPaymentModeFetch();
    }
  }, [payToggle]);

  const [payreload, setReload] = useState(false);

  const handlePopUpmodal = async (type, gst) => {
    let installmentExpiry =
      cartData.length > 0
        ? cartData[0]?.subscription_data?.amount_description?.expiry
        : "0";
    const arrayLength = cartData.length;
    const courselist = cartData.map((item) => {
      return {
        course_id: item.id,
        product_type: item.product_type,
        qty: item.qty,
        payment_mode: item.is_subscription,
        expiry: installmentExpiry ? installmentExpiry : "",
        is_cbt: !item.is_cbt ? "0" : item.is_cbt,
        pending_amount: !item.pending_amount ? "0" : item.pending_amount,
        size_name: "",
        subscription_code: "",

        payment_meta: cartData[0].subscription_data,
        payment_id: !item.payment_id ? "0" : item.payment_id,
        course_price: item?.price,
        is_shipping_charge_include: iscomb ? rmship : bookship,
        // item.is_part_payment === "3"
        //   ? item.price
        //   : item.final_amount,
        upgrade_course_price:
          item.is_part_payment === "3" ? item.upgrade_course_price : "",
        transaction_id: item.is_part_payment === "3" ? item.transaction_id : "",
        partner_member_id: !item.partner_member_id
          ? "0"
          : item.partner_member_id,
        id_fr_learning_center_detail: !item.id_fr_learning_center_detail
          ? "0"
          : item.id_fr_learning_center_detail,
        is_part_payment: !item.is_part_payment ? "0" : item.is_part_payment,
        full_amount: !item.full_amount ? "0" : item.full_amount,
        // facetoface_center_id: !item.facetoface_center_id
        //   ? "0"
        //   : item.facetoface_center_id,
        facetoface_center_id:
          item?.availability_course === 1 ? "0" : item.facetoface_center_id,
        slot_id: "0",
        batch_id: "",
        booking_type: !item.booking_type ? "0" : item.booking_type,
        availability_course: !item.availability_course
          ? "0"
          : item.availability_course,
        course_start_date: !item.course_start_date
          ? ""
          : item.course_start_date,
        course_discount: "",
        child_courses: "",
        color_name: "",
        net_amount: "",
        // is_multiorder: 0,
      };
    });
    sessionStorage.setItem("courselist", JSON.stringify(courselist));
    const isDefaultAdd = addressData.filter((itm) => itm.is_default === "1");
    {
      /* amount mis match check */
    }
    const walletValue = Number(localStorage.getItem("walletValue")) || 0;
    const totalFinalAmount =
      Object.keys(shipingData).length > 0
        ? Number(
            (shipingData?.shipping_charge || 0) +
              totalCourselAmount +
              (gstTotalData?.platform_fee || 0) +
              (gstTotalData?.total_gst_amount || 0) -
              (afterDeductionData?.discount_amount || 0) -
              walletValue
          ).toFixed(2)
        : Number(
            totalCourselAmount +
              (gstTotalData?.platform_fee || 0) +
              (gstTotalData?.total_gst_amount || 0) -
              (afterDeductionData?.discount_amount || 0) -
              walletValue
          ).toFixed(2);
    try {
      const calculatedTotal =
        Object.keys(shipingData).length > 0
          ? Number(
              shipingData?.shipping_charge +
                gstTotalData?.total_payble_amount +
                (gstTotalData?.platform_fee || 0)
            ).toFixed(2)
          : Number(
              gstTotalData?.total_payble_amount +
                (gstTotalData?.platform_fee || 0)
            ).toFixed(2);
      // Check if totalFinalAmount matches the calculated total
      if (Number(totalFinalAmount).toFixed(2) !== calculatedTotal) {
        // Create log entry
        const logData = {
          timestamp: new Date().toISOString(),
          errorCode: "E001",
          message: "E001M",
          totalFinalAmount: totalFinalAmount,
          calculatedTotal: calculatedTotal,
          shippingData: shipingData,
          gstTotalData: gstTotalData,
          user_id: userid,
        };
        //console.error("Amount Mismatch:", logData);
        setReload(false);
        toast.error("MESSAGE E001 WITH TEXT-002");
        return; // This stops execution before the payment API call
      }
      // If amounts match, proceed with the API call
      setReload(true);
      const res = await axiosInstance.post(
        API_ENDPOINTS.ADD_TO_CART.INITIALIZE_COURSE_TRANSECTION_CART,
        {
          user_id: userid,
          list: JSON.stringify(courselist),
          address_id: isDefaultAdd[0].id,
          redeem_amount: coinSwitch ? coin?.reward_points / 100 : 0,
          // total_price:
          //   Object.keys(shipingData).length > 0
          //     ? Number(
          //         shipingData?.shipping_charge +
          //           gstTotalData?.total_payble_amount
          //       ).toFixed(2)
          //     : Number(gstTotalData?.total_payble_amount).toFixed(2),
          total_price: calculatedTotal,
          coupon_applied: referralData.coupon_applied,
          refer_code: referralData.refer_code,
          penalty: "",
          pay_via: type === "Paytm" ? "PAY_TM" : "RAZORPAY",
          points_rate: "",
          tax: gst?.total_gst_amount,
          platform_fee: gst?.platform_fee,
          platform_fee_gst: gst?.platform_fee_gst,
          payment_method: "1",
          is_shipping_charge_include: iscomb ? rmship : bookship,
          points_used: coinSwitch ? coin?.reward_points : "",

          coin_used: JSON.stringify([
            {
              course_id: "0",
              redeem_point: coinSwitch ? coin?.reward_points : "",
              reward_discount: coinSwitch ? coin?.reward_points / 100 : "0.0",
            },
          ]),
          coin_earn: 0,
          partner_type: "1",
          is_apply_reward_all: coinSwitch ? 1 : 0,
          subcenter_id: "",
          course_start_date: getCurrentDateTime,
          referral_user_by_partner: "",
          coupon_applied_partial: "",
          //is_multiorder: iscomb ? 2 : 0,  anuj code
          // is_multiorder:
          //   iscomb === null || iscomb === "" ? (arrayLength > 1 ? 1 : 0) : 2,
          is_multiorder: is_multiorder,
          emi_month: "",
          is_emi_payment: 0,
          emi_installment_id: "",
          emi_due_date: "",
          is_referal: coinSwitch ? "" : "2",
          region_id: cartData[0]?.course_type == 10 ? cbtregionId : "",
          delivery_postcode: 201301,
          shipping_charge:
            Object.keys(shipingData).length > 0
              ? shipingData?.shipping_charge
              : "",
          flag:
            (cartData[0]?.product_type === "1" &&
              ["0", "1"].includes(cartData[0]?.course_type)) ||
            (cartData[0]?.product_type === "2" &&
              cartData[0]?.course_type === "0")
              ? "Book"
              : cartData[0]?.product_type === "2" &&
                cartData[0]?.course_type === "1"
              ? "ecommerce"
              : cartData[0]?.product_type === "0" &&
                ["7", "1", "9", "10"].includes(cartData[0]?.course_type)
              ? "Online"
              : "",
        }
      );
      if (res?.data?.data?.razorpay_orderid === null) {
        getPaytmCalled(res?.data?.data);
        // if (fina !== 0) {
        //   getPaytmCalled(res?.data?.data);
        //   setReload(false);
        // } else {
        //   openWallet(res?.data?.data);
        //   setReload(false);
        // }
        setReload(false);
      } else {
        openTrab(res.data.data);
        setReload(false);
        setPayToggle(false);
      }
    } catch (error) {
      console.log(error);
      setReload(false);
    }
  };

  const handleinitialize = async (gst) => {
    let installmentExpiry =
      cartData.length > 0
        ? cartData[0]?.subscription_data?.amount_description?.expiry
        : "0";
    const payment_meta = cartData[0]?.subscription_data;
    const courselist = cartData.map((item) => {
      return {
        course_id: item.id,
        product_type: item.product_type,
        qty: item.qty,
        child_courses: "",
        color_name: "",
        course_discount: "",
        net_amount: "",
        payment_mode: item.is_subscription,
        expiry: installmentExpiry ? installmentExpiry : "0",
        is_cbt: !item.is_cbt ? "0" : item.is_cbt,
        course_price:
          item.is_part_payment === "3"
            ? item.price
            : coinSwitch
            ? item?.final_amount
            : item.final_amount,
        upgrade_course_price:
          item.is_part_payment === "3" ? item.upgrade_course_price : "",
        transaction_id: item.is_part_payment === "3" ? item.transaction_id : "",
        pending_amount: !item.pending_amount ? "0" : item.pending_amount,
        size_name: "",
        subscription_code: "",
        payment_meta: {},
        payment_id: !item.payment_id ? "0" : item.payment_id,
        partner_member_id: !item.partner_member_id
          ? "0"
          : item.partner_member_id,
        id_fr_learning_center_detail: !item.id_fr_learning_center_detail
          ? "0"
          : item.id_fr_learning_center_detail,
        is_part_payment: !item.is_part_payment ? "0" : item.is_part_payment,
        full_amount: !item.full_amount ? "0" : item.full_amount,
        // facetoface_center_id: !item.facetoface_center_id
        //   ? "0"
        //   : item.facetoface_center_id,
        facetoface_center_id:
          item?.availability_course === 1 ? "0" : item.facetoface_center_id,
        slot_id: "0",
        batch_id: "",
        booking_type: !item.booking_type ? "0" : item.booking_type,
        availability_course: !item.availability_course
          ? "0"
          : item.availability_course,
        course_start_date: !item.course_start_date
          ? ""
          : item.course_start_date,
      };
    });
    sessionStorage.setItem("courselist", JSON.stringify(courselist));

    const isDefaultAdd = addressData.filter((itm) => itm.is_default === "1");
    const fin =
      Object.keys(shipingData).length > 0
        ? shipingData?.shipping_charge + gstTotalData?.total_payble_amount
        : gstTotalData?.total_payble_amount;

    try {
      //console.group("caleeddd");
      const res = await axiosInstance.post(
        API_ENDPOINTS.ADD_TO_CART.INITIALIZE_COURSE_TRANSECTION_CART,
        {
          user_id: userid,
          list: JSON.stringify(courselist),
          address_id: isDefaultAdd[0].id,
          total_price: fin,
          is_shipping_charge_include: iscomb ? rmship : bookship,
          coupon_applied: referralData.coupon_applied,
          refer_code: referralData.refer_code,
          earn_point_course_purchase: "",
          penalty: "",
          pay_via:
            fin === 0
              ? isChecked == true
                ? "PAY_WALLET"
                : "PAY_COUPON"
              : type === "Paytm"
              ? "PAY_TM"
              : "RAZORPAY",
          points_rate: "",
          tax: gst?.total_gst_amount,
          platform_fee: gst?.platform_fee,
          platform_fee_gst: gst?.platform_fee_gst,
          payment_method: "1",
          points_used: coinSwitch ? coin?.reward_points : "",

          coin_used: JSON.stringify([
            {
              course_id: "0",
              redeem_point: coinSwitch ? coin?.reward_points : "",
              reward_discount: coinSwitch ? coin?.reward_points / 100 : "0.0",
            },
          ]),
          coin_earn: 0,
          partner_type: "1",
          is_apply_reward_all: coinSwitch ? "1" : "",
          subcenter_id: "",
          course_start_date: getCurrentDateTime,
          referral_user_by_partner: "",
          coupon_applied_partial: "",
          is_referal: "",
          shipping_charge: 0,
          product_type: cartData[0].product_type,
          region_id: cartData[0].product_type === 10 ? cbtregionId : "",
          flag:
            (cartData[0]?.product_type === "1" &&
              ["0", "1"].includes(cartData[0]?.course_type)) ||
            (cartData[0]?.product_type === "2" &&
              cartData[0]?.course_type === "0")
              ? "Book"
              : cartData[0]?.product_type === "2" &&
                cartData[0]?.course_type === "1"
              ? "ecommerce"
              : cartData[0]?.product_type === "0" &&
                ["7", "1", "9", "10"].includes(cartData[0]?.course_type)
              ? "Online"
              : "",
          emi_month: "",
          is_emi_pyment: 0,
          emi_due_date: "",
          delivery_postcode: 201301,
          // is_multiorder: iscomb ? 2 : 0,
          is_multiorder: is_multiorder,
          emi_installment_id: "",
          redeem_amount: coinSwitch ? coin?.reward_points / 100 : 0.0,
        }
      );
      if (res?.data?.data?.razorpay_orderid === null) {
        getPaytmCalled(res?.data?.data);
        if (fina !== 0) {
          getPaytmCalled(res?.data?.data);
        } else {
          openWallet(res?.data?.data);
        }
      } else {
        openTrab(res.data.data);
        setPayToggle(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openWallet = async (data) => {
    setComLoading(true);
    let installmentExpiry =
      cartData.length > 0
        ? cartData[0]?.subscription_data?.amount_description?.expiry
        : "0";
    const payment_meta = cartData[0]?.subscription_data;

    const courselist = cartData.map((item) => {
      return {
        course_id: item.id,
        product_type: item.product_type,
        qty: item.qty,
        payment_mode: item.is_subscription,
        expiry: "",
        // expiry: installmentExpiry ? installmentExpiry : "0",
        is_cbt: !item.is_cbt ? "0" : item.is_cbt,
        course_price:
          item.is_part_payment === "3"
            ? item.price
            : coinSwitch
            ? item?.final_amount
            : item.final_amount,
        upgrade_course_price:
          item.is_part_payment === "3" ? item.upgrade_course_price : "",
        transaction_id: item.is_part_payment === "3" ? item.transaction_id : "",
        pending_amount: !item.pending_amount ? "0" : item.pending_amount,
        size_name: "",
        subscription_code: "",
        payment_meta: {},
        payment_id: !item.payment_id ? "0" : item.payment_id,
        partner_member_id: !item.partner_member_id
          ? "0"
          : item.partner_member_id,
        id_fr_learning_center_detail: !item.id_fr_learning_center_detail
          ? "0"
          : item.id_fr_learning_center_detail,
        is_part_payment: !item.is_part_payment ? "0" : item.is_part_payment,
        full_amount: !item.full_amount ? "0" : item.full_amount,
        facetoface_center_id: !item.facetoface_center_id
          ? "0"
          : item.facetoface_center_id,
        booking_type: !item.booking_type ? "0" : item.booking_type,
        availability_course: !item.availability_course
          ? "0"
          : item.availability_course,
        course_start_date: !item.course_start_date
          ? ""
          : item.course_start_date,
        course_discount: "",
        child_courses: "",
        color_name: "",
        net_amount: "",
      };
    });

    const res = await axiosInstance.post(
      "/v2_data_model/complete_transaction_cart",
      {
        list: JSON.stringify(courselist),
        redeem_amount: 0,
        pre_transaction_id: data?.pre_transaction_id,
        post_transaction_id: new Date().getTime(),
        affiliate_referral_code_by: "",
        earn_point_course_purchase: "",
        transaction_status_data: JSON.stringify([
          {
            STATUS: "TXN_SUCCESS",
            CHECKSUMHASH: "",
            BANKNAME: "",
            ORDERID: data?.pre_transaction_id,
            TXNAMOUNT: "0",
            TXNDATE: "2024-07-17",
            MID: "",
            TXNID: new Date().getTime(),
            RESPCODE: 1,
            PAYMENTMODE: "FREE",
            BANKTXNID: "",
            CURRENCY: "",
            GATEWAYNAME: "",
            RESPMSG: "TXN_SUCCESS_FREE",
          },
        ]),
        user_id: userid,
        pay_via: "PAY_TM",
        walletBalanceAmount: cValue,
      }
    );

    // if (res.data.status === true) {
    //   nav(
    //     `/success/${res.data.data.order_id}-${res.data.data.payble_amount}`
    //   );
    // }
    dispatch(clearCart());
    nav("/complete", { state: data?.pre_transaction_id });
    setComLoading(false);
  };

  const getPaytmCalled = async (data) => {
    try {
      const response2 = await axiosInstance.post(
        `/v2_data_model/generate_paytm_checksum_new`,
        {
          MID: data?.paytm_mid,
          ORDER_ID: data?.pre_transaction_id,
          PAYTM_MERCHANT_WEBSITE: "WEBSTAGING",
          CHANNEL_ID: "WEB",
          CUST_ID: userid,
          WEBSITE: "DEFAULT",
          user_id: userid,
          TXN_AMOUNT:
            Object.keys(shipingData).length > 0
              ? (
                  shipingData?.shipping_charge +
                  gstTotalData?.total_payble_amount +
                  gstTotalData?.platform_fee
                ).toFixed(2)
              : (
                  gstTotalData?.total_payble_amount + gstTotalData?.platform_fee
                ).toFixed(2),
        }
      );

      if (response2?.data?.status === false) {
        toast.error(
          "There is issue with paytm configution please contact support team."
        );
      } else {
        const { txnToken, order_id, TXN_AMOUNT } = response2.data;

        setOneMinuteCookie("TxnToken", txnToken);
        setOneMinuteCookie("OrderId", order_id);
        setOneMinuteCookie(
          "TotalAmount",
          Object.keys(shipingData).length > 0
            ? shipingData?.shipping_charge + gstTotalData?.total_payble_amount
            : gstTotalData?.total_payble_amount
        );

        // Update mConfig with new order details
        setMConfig((prevConfig) => ({
          ...prevConfig,
          data: {
            ...prevConfig.data,
            orderId: order_id,
            amount:
              Object.keys(shipingData).length > 0
                ? shipingData?.shipping_charge +
                  gstTotalData?.total_payble_amount
                : gstTotalData?.total_payble_amount,
            token: txnToken,
          },
        }));
        getThirdCalled();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getThirdCalled = async () => {
    const scriptElement = document.createElement("script");
    const paytmUrl = getPaytmMerchantUrl();
    scriptElement.async = true;
    scriptElement.src = paytmUrl.concat(mConfig.merchant.mid);
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

  const openTrab = (data) => {
    let installmentExpiry =
      cartData.length > 0
        ? cartData[0]?.subscription_data?.amount_description?.expiry
        : "0";
    const payment_meta = cartData[0]?.subscription_data;
    const courselist = cartData.map((item) => {
      return {
        course_id: item.id,
        product_type: item.product_type,
        qty: item.qty,
        payment_mode: item.is_subscription,
        expiry: "",
        is_cbt: !item.is_cbt ? "0" : item.is_cbt,
        course_price:
          item.is_part_payment === "3"
            ? item.price
            : coinSwitch
            ? item?.final_amount
            : item.final_amount,
        upgrade_course_price:
          item.is_part_payment === "3" ? item.upgrade_course_price : "",
        transaction_id: item.is_part_payment === "3" ? item.transaction_id : "",
        pending_amount: !item.pending_amount ? "0" : item.pending_amount,
        size_name: "",
        subscription_code: "",
        payment_meta: coinSwitch
          ? {
              id: cartData[0]?.subscription_data?.id,
              name: cartData[0]?.subscription_data?.name,
              count: cartData[0]?.subscription_data?.count,
              cycle: cartData[0]?.subscription_data?.cycle,
              amount_description: {
                cycle:
                  cartData[0]?.subscription_data?.amount_description?.cycle,
                payment:
                  cartData[0]?.subscription_data?.amount_description?.payment,
                expiry:
                  cartData[0]?.subscription_data?.amount_description?.expiry,
                for_sub_id_ios: "undefined",
                loan_amt:
                  cartData[0]?.subscription_data?.amount_description?.loan_amt,
                grace:
                  cartData[0]?.subscription_data?.amount_description?.grace,
                panelty_type:
                  cartData[0]?.subscription_data?.amount_description
                    ?.panelty_type,
                panelty:
                  cartData[0]?.subscription_data?.amount_description?.panelty,
                before_discount_mrp:
                  cartData[0]?.subscription_data?.amount_description
                    ?.before_discount_mrp,
                emi_paid_count:
                  cartData[0]?.subscription_data?.amount_description
                    ?.emi_paid_count,
                subscription_code:
                  cartData[0]?.subscription_data?.amount_description
                    ?.subscription_code,
              },
            }
          : {},
        payment_id: !item.payment_id ? "0" : item.payment_id,
        partner_member_id: !item.partner_member_id
          ? "0"
          : item.partner_member_id,
        id_fr_learning_center_detail: !item.id_fr_learning_center_detail
          ? "0"
          : item.id_fr_learning_center_detail,
        is_part_payment: !item.is_part_payment ? "0" : item.is_part_payment,
        full_amount: !item.full_amount ? "0" : item.full_amount,
        facetoface_center_id: !item.facetoface_center_id
          ? "0"
          : item.facetoface_center_id,
        booking_type: !item.booking_type ? "0" : item.booking_type,
        availability_course: !item.availability_course
          ? "0"
          : item.availability_course,
        course_start_date: !item.course_start_date
          ? ""
          : item.course_start_date,
        course_discount: "",
        child_courses: "",
        color_name: "",
        net_amount: "",
      };
    });
    const amountInPaise = Math.round(
      parseFloat(gstTotalData?.total_payble_amount) * 100
    );
    const finalAmount = Math.max(amountInPaise, 100);
    const options = {
      key: MY_BASE_RZP,
      order_id: data?.razorpay_orderid,
      amount: finalAmount,
      name: "Delhi Academy of Medical Sciences Pvt Ltd",
      description: "some description",
      image: "https://emed-student-qa.damsdelhi.com/logo.png",
      handler: async function (response) {
        try {
          setShowSpin(true);
          const res = await axiosInstance.post(
            "/v2_data_model/complete_transaction_cart",
            {
              list: JSON.stringify(courselist),
              redeem_amount: 0,
              pre_transaction_id: data?.pre_transaction_id,
              post_transaction_id: response?.razorpay_payment_id,
              affiliate_referral_code_by: "",
              earn_point_course_purchase: "",
              transaction_status_data: JSON.stringify([
                {
                  STATUS: "TXN_SUCCESS",
                  CHECKSUMHASH: "",
                  BANKNAME: "",
                  ORDERID: data?.pre_transaction_id,
                  TXNAMOUNT:
                    Object.keys(shipingData).length > 0
                      ? shipingData?.shipping_charge +
                        gstTotalData?.total_payble_amount
                      : gstTotalData?.total_payble_amount,
                  TXNDATE: "2024-07-17",
                  MID: "",
                  TXNID: new Date().getTime(),
                  RESPCODE: 1,
                  PAYMENTMODE: "Paid",
                  BANKTXNID: "",
                  CURRENCY: "",
                  GATEWAYNAME: "",
                  RESPMSG: "Txn Success",
                },
              ]),
              user_id: userid,
              pay_via: "RAZORPAY",
              walletBalanceAmount: cValue,
            }
          );

          if (res.data.status === true) {
            dispatch(clearCart());
            toast.success(res.data.message);
            sessionStorage.setItem("paymentData", res.data.data);
            const is_cbt_type = JSON.parse(localStorage.getItem("CbtType"));

            if (is_cbt_type == "1") {
              get_user_cbt_reg();
              setShowSpin(false);
            } else {
              nav(
                `/success/${res.data.data.order_id}-${(
                  Number(gstTotalData?.total_payble_amount || 0) +
                  Number(gstTotalData?.platform_fee || 0) +
                  Number(shipingData?.shipping_charge || 0)
                ).toFixed(2)}`
              );
              setShowSpin(false);
            }
          }
        } catch (err) {
          console.log(err);
          setShowSpin(false);
        }
      },
      modal: {
        escape: false,
        confirm_close: true,
        ondismiss: async function () {
          console.warn("User exited the payment gateway.");

          const paymentStatus = {
            TXNAMOUNT: gstTotalData?.total_payble_amount || 0,
            TXNDATE: new Date().toISOString().split("T")[0],
            TXNID: `TXN${new Date().getTime()}`,
            ORDERID: data?.pre_transaction_id || "UNKNOWN",
          };

          // ✅ Run the failure API call before redirecting
          try {
            await axiosInstance.post(
              "/v2_data_model/complete_transaction_cart",
              {
                list: JSON.stringify(courselist),
                redeem_amount: 0,
                pre_transaction_id: data?.pre_transaction_id,
                post_transaction_id: null, // No payment ID since it's a failure
                transaction_status_data: JSON.stringify([
                  {
                    STATUS: "TXN_FAILURE",
                    ORDERID: data?.pre_transaction_id,
                    TXNAMOUNT: paymentStatus.TXNAMOUNT,
                    TXNDATE: paymentStatus.TXNDATE,
                    TXNID: paymentStatus.TXNID,
                    PAYMENTMODE: 0,
                    RESPCODE: 141,
                    RESPMSG: "User has not completed transaction.",
                  },
                ]),
                user_id: userid,
                pay_via: "RAZORPAY",
              }
            );
            clg;
            console.log("Failed transaction recorded.");
          } catch (error) {
            console.error("Failed to log transaction:", error);
          }

          // ✅ Redirect user to failed payment page
          window.location.href = `/failed/PT${paymentStatus.TXNAMOUNT}D${paymentStatus.TXNDATE}TI${paymentStatus.TXNID}OI${paymentStatus.ORDERID}`;
        },
      },
      method: {
        upi: false, // 🔴 This disables UPI and removes the QR code
        netbanking: true,
        card: true,
        wallet: true,
      },
      prefill: {
        name: userData.name,
        contact: userData.mobile,
        email: userData.email,
      },
      notes: {
        address: "some address",
      },
      theme: {
        color: "#f15a22",
        hide_topbar: false,
      },
    };
    openPayModal(options);
  };

  const openPayModal = (options) => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const getFetchShippingCharges = async (cartData, addressData) => {
    const isPin = addressData.filter((itm) => itm.is_default === "1");
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.ADD_TO_CART.GET_SHIPPING_CHARGE,
        {
          user_id: userid,
          delivery_postcode: isPin[0]?.pincode,
          course_id: cartData.map((product) => product.id).join(","),
        }
      );
      setShipingData(data?.data);
      // setShipingCartData(response2.data?.data?.shipping_charge);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      (shipingValue === "1" && addressData.length > 0) ||
      productType === "2"
    ) {
      if (iscomb && rmship == 1) {
        getFetchShippingCharges();
      } else if (!iscomb && bookship == 1) {
        getFetchShippingCharges();
      }
    }
  }, [shipingValue, addressData, productType]);

  const getWalletAmountDeduction = async () => {
    try {
      const c =
        coupanValue > gstTotalData?.total_payble_amount
          ? Number(gstTotalData?.total_payble_amount).toFixed(2)
          : coupanValue;
      sessionStorage.setItem("coupanV", c);
      const res = await axiosInstance.post(
        API_ENDPOINTS.ADD_TO_CART.APPLY_WALLET_REFOUND_CART,
        {
          user_id: userid,
          course_id: cartData[0]?.id,
          walletBalanceAmount:
            isChecked == false
              ? ""
              : coupanValue > gstTotalData?.total_payble_amount
              ? Number(gstTotalData?.total_payble_amount).toFixed(2)
              : coupanValue,
          // walletBalanceAmount: isChecked ? coupanValue : "",
        }
      );
      if (res.data.data.wallet_status === 1) {
        getGstCalculate(addressData);
      } else {
        getGstCalculate(addressData);
        setIsChecked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWalletAmountDeduction();
  }, [isChecked]);

  useEffect(() => {
    // if(Object.keys(addressData).length >)
    if (addressData.length > 0) {
      getGstCalculate(addressData);
    }
  }, [addressData]);

  const getCheckoutJsObj = () => {
    if (window && window.Paytm && window.Paytm.CheckoutJS) {
      return window.Paytm.CheckoutJS;
    } else {
      console.error("Checkout instance not found!");
      return null;
    }
  };

  const getCoinFunction = async () => {
    try {
      setCoinLoading(true);
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.ADD_TO_CART.GET_USER_REWARD,
        {
          user_id: userid,
        }
      );
      if (data.status === true) {
        setCoin(data.data);
        setCoinLoading(false);
      } else {
        setCoin({});
        setCoinLoading(false);
      }
    } catch (error) {
      console.log(error);
      setCoinLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getCoinFunction();
    }, 1500);
  }, []);

  const onChange = (checked) => {
    if (Number(coin?.reward_points) > 0) {
      setCoinSwitch(checked);
    } else {
      toast.warning("Coin amount ₹0");
      setCoinSwitch(false);
    }
  };

  const coinApplyFunction = async () => {
    try {
      const { data } = await axiosInstance.post(
        "/v2_data_model/calculate_offer_inamount",
        {
          user_id: userid,
          course_mrp: allData?.course_price,
          one_point_in_rupee: 1 / Number(allData?.points_conversion_rate),
          available_point: coin?.reward_points,
          grand_total:
            Object.keys(shipingData).length > 0
              ? shipingData?.shipping_charge + gstTotalData?.total_payble_amount
              : gstTotalData?.total_payble_amount,
          flag: 1,
          course_id: 0,
          offer_id: 0,
        }
      );
      if (data.status === true) {
        setCoinAfterApplyData(data.data);
        getCalclatedGST(data.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCalclatedGST = async (dataa) => {
    const cart = cartData[0];
    let flag = "";
    if (
      (cart?.product_type === "1" &&
        (cart?.course_type === "1" || cart?.course_type === "0")) ||
      (cart?.product_type === "2" && cart?.course_type === "0")
    ) {
      flag = "Book";
    } else if (cart?.product_type === "2" && cart?.course_type === "1") {
      flag = "ecommerce";
    } else if (
      cart?.product_type === "0" &&
      ["7", "1", "9", "10"].includes(cart?.course_type)
    ) {
      flag = "Online";
    }
    const isDefaultId = addressData?.filter((val) => val.is_default === "1");

    const list = [];
    cartData.forEach((val) => {
      list.push({
        course_id: val.id,
        net_amount: val.final_amount,
      });
    });

    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.ADD_TO_CART.CALCULATE_GST,
        {
          course_list: JSON.stringify(list),
          user_id: userid,
          user_address_id: isDefaultId[0]?.id,
          is_shipping_charge_include: iscomb ? rmship : bookship,
          partner_id: "",
          offer_discount_amount: afterDeductionData?.discount_amount
            ? afterDeductionData?.discount_amount
            : 0,
          reward_discount_amount: dataa?.discount_amount,
          is_apply_reward_all: 1,
          coupon_code: "",
          flag: flag,
          is_refral_code: refreldata ?? "",
          availability_course: 0,
          product_type: cartData[0].product_type ?? "",
          facetoface_center_id: cartData[0].facetoface_center_id ?? "",
        }
      );
      if (data.status === true) {
        setGstTotalData(data?.data);
      } else {
        // setCoinSwitch(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    coinSwitch ? coinApplyFunction() : getGstCalculate(addressData);
  }, [coinSwitch, allData]);

  const confirm = (itm) => {
    dispatch(removeFromCart(itm.id));
    sessionStorage.removeItem("combo_course_id");
    handleRemoveCourse(itm.id);
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  const handlePayFunction = () => {
    setSelectedGateway(null);
    setPayToggle(false);
  };

  useEffect(() => {
    if (addressData.length > 0) {
      getGstCalculate();
    }
  }, []);

  const iscomb1 = sessionStorage.getItem("combo_course_id");
  useEffect(() => {
    if (cartData?.length == 0) {
      dispatch(clearCart());
    }
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            height: "30vh",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div className="Cart">
          <div className="page-content position-relative">
            <div className="aboutbg"></div>
          </div>

          {/* Main Section Starts Here */}
          <section className="shoping-cart position-relative">
            <div className="container">
              {cartData?.length == 0 ? (
                <h2>No item found....</h2>
              ) : (
                <>
                  {/* <h2>My Cart</h2> */}
                  {showSpin ? (
                    <div
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        height: "30vh",
                      }}
                    >
                      <Spin />
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
                        {/* ----------------------------------Main Details ---------------------------------- */}
                        {cartData?.map((itm, i) => (
                          <div className="ibox" key={i}>
                            <div className="group-item">
                              <div className="row">
                                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-2">
                                  <div className="cart-product-img">
                                    <a>
                                      <img
                                        src={(
                                          itm.cover_image ||
                                          itm.featured_image ||
                                          "https://d2enu63wt1sf3u.cloudfront.net/course_file_meta/b2cb5482ec838ddcd082749b3ad98f51"
                                        )?.replace(/\\\//g, "/")}
                                        alt="Image"
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-8">
                                  <div className="product-title">
                                    {itm?.title}
                                    <h3>
                                      <a href="https://emedicoz.com/courses/detail?title=ULTIMATE LIVE &amp;category_id=980&amp;combo=0&amp;course_type=7"></a>
                                    </h3>
                                    <div className="small-ratings">
                                      <em className="fa fa-star "></em>
                                      <em className="fa fa-star "></em>
                                      <em className="fa fa-star "></em>
                                      <em className="fa fa-star "></em>
                                      <em className="fa fa-star "></em>
                                      <span className="rating ml-2">
                                        <strong>{itm?.learner}</strong> |
                                        Enrolled
                                      </span>
                                    </div>
                                  </div>

                                  {itm?.product_type == 1 ? (
                                    <>
                                      <span className="rating ml-2">
                                        <strong>Course Type :</strong>{" "}
                                        {itm?.product_type === "1" ||
                                        itm?.course_type === "1"
                                          ? "Book"
                                          : ""}
                                      </span>
                                      <div className="row">
                                        <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                          <div className="icon_add">
                                            <div className="input-group">
                                              {itm?.is_combo_master != "1" && (
                                                <>
                                                  <span className="input-group-btn">
                                                    <button
                                                      type="button"
                                                      className="btn btn-number minus"
                                                      data-type="minus"
                                                      id="cart_row_id-77"
                                                      onClick={() =>
                                                        decrementCount(itm)
                                                      }
                                                      disabled={
                                                        itm.qty == 1
                                                          ? true
                                                          : false
                                                      }
                                                    >
                                                      <span className="fa fa-minus"></span>
                                                    </button>
                                                  </span>
                                                  <input
                                                    type="text"
                                                    name="quant[2]"
                                                    className="form-control input-number"
                                                    id="getvalue"
                                                    value={
                                                      counter
                                                        ? counter
                                                        : itm.qty
                                                    }
                                                    min={parseInt(itm.qty)}
                                                    max="5"
                                                    fdprocessedid="vc9w0s"
                                                  />
                                                  <span className="input-group-btn">
                                                    <button
                                                      type="button"
                                                      className="btn btn-number plus"
                                                      onClick={() =>
                                                        incrementCount(itm)
                                                      }
                                                      value={counter}
                                                    >
                                                      <span className="fa fa-plus"></span>
                                                    </button>
                                                  </span>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    itm?.product_type == 2 && (
                                      <>
                                        <span className="rating ml-2">
                                          <strong>Course Type:</strong>{" "}
                                          {itm?.product_type === "2" ||
                                          itm?.course_type === "1"
                                            ? "Ecommerce"
                                            : ""}
                                        </span>
                                        <br></br>
                                        {itm?.size_name?.trim() !== "" && (
                                          <span className="rating ml-2">
                                            <strong>Size:</strong>{" "}
                                            {itm?.product_type === "2" ||
                                            itm?.course_type === "1"
                                              ? itm?.size_name
                                              : ""}
                                          </span>
                                        )}
                                        <div className="row">
                                          <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                            <div className="icon_add">
                                              <div className="input-group">
                                                <>
                                                  {itm?.is_combo_master !=
                                                    "1" && (
                                                    <>
                                                      <span className="input-group-btn">
                                                        <button
                                                          type="button"
                                                          className="btn btn-number minus"
                                                          data-type="minus"
                                                          id="cart_row_id-77"
                                                          onClick={() =>
                                                            decrementCount(itm)
                                                          }
                                                          disabled={
                                                            itm.qty == 1
                                                              ? true
                                                              : false
                                                          }
                                                        >
                                                          <span className="fa fa-minus"></span>
                                                        </button>
                                                      </span>
                                                      <input
                                                        type="text"
                                                        name="quant[2]"
                                                        className="form-control input-number"
                                                        id="getvalue"
                                                        value={
                                                          counter
                                                            ? counter
                                                            : itm.qty
                                                        }
                                                        min={parseInt(itm.qty)}
                                                        max="5"
                                                        fdprocessedid="vc9w0s"
                                                      />
                                                      <span className="input-group-btn">
                                                        <button
                                                          type="button"
                                                          className="btn btn-number plus"
                                                          onClick={() =>
                                                            incrementCount(itm)
                                                          }
                                                          value={counter}
                                                        >
                                                          <span className="fa fa-plus"></span>
                                                        </button>
                                                      </span>
                                                    </>
                                                  )}
                                                </>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )
                                  )}
                                </div>
                                <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                  {/* <div className="delbg text-right">
                                    <>
                                      {itm?.is_combo_master != "1" && (
                                        <Popconfirm
                                          title={itm?.title}
                                          placement="leftTop"
                                          description="Are you sure want to delete this course/book from cart?"
                                          onConfirm={() => confirm(itm)}
                                          onCancel={cancel}
                                          okText="Yes"
                                          cancelText="No"
                                        >
                                          <CiTrash
                                            style={{
                                              cursor: "pointer",
                                              fontSize: "25px",
                                            }}
                                          />
                                        </Popconfirm>
                                      )}
                                    </>
                                  </div> */}
                                  <div className="price-listing text-right">
                                    <ul>
                                      <li>
                                        <em className="fa fa-rupee mr-1"></em>
                                        {itm.course_type == 1 ||
                                        itm.course_type == 0
                                          ? itm.final_amount
                                          : itm.price}
                                        {/* <span className="d-block">
                                                Product Type:{" "}
                                                <b>
                                                  {itm?.product_type === "0"
                                                    ? "Ecom"
                                                    : "Book"}
                                                </b>
                                              </span> */}
                                        {/* <span className="d-block">
                                                Exclusive of all taxes
                                              </span> */}
                                      </li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="monthly-price">
                                    <div className="row">
                                      <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                        <div
                                          className="heading"
                                          style={{ marginTop: "22px" }}
                                        >
                                          <span>
                                            {itm?.subscription_data.name}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                        <div className="delbg text-right">
                                          <>
                                            {itm?.is_combo_master != "1" && (
                                              <Popconfirm
                                                title={itm?.title}
                                                placement="leftTop"
                                                description="Are you sure want to delete this course/book from cart?"
                                                onConfirm={() => confirm(itm)}
                                                onCancel={cancel}
                                                okText="Yes"
                                                cancelText="No"
                                              >
                                                <CiTrash
                                                  style={{
                                                    cursor: "pointer",
                                                    fontSize: "25px",
                                                  }}
                                                />
                                              </Popconfirm>
                                            )}
                                          </>
                                        </div>
                                        {/* <div className="price-listing text-right">
                                          <ul>
                                            <li>
                                              <em className="fa fa-rupee mr-1"></em>
                                              {itm.course_type == 1 ||
                                              itm.course_type == 0
                                                ? itm.final_amount
                                                : itm.price}
                                              <span className="d-block">
                                                Product Type:{" "}
                                                <b>
                                                  {itm?.product_type === "0"
                                                    ? "Ecom"
                                                    : "Book"}
                                                </b>
                                              </span>
                                              <span className="d-block">
                                                Exclusive of all taxes
                                              </span>
                                            </li>
                                          </ul>
                                        </div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* ----------------------------------Wallet Discount---------------------------------- */}
                        {/* {!iscomb1 && (
                          <div className="walletBalance">
                            <input
                              type="checkbox"
                              id=""
                              name=""
                              value="Wallet"
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                            />
                            <label>
                              Use your
                              <span>
                                <em className="fa fa-rupee"></em>{" "}
                                {coupanValue > gstTotalData?.total_payble_amount
                                  ? Number(
                                      gstTotalData?.total_payble_amount
                                    ).toFixed(2)
                                  : coupanValue}
                                eMedicoz Wallet Balance
                              </span>
                            </label>
                          </div>
                        )} */}
                        {/* <div
                          className="walletBalance"
                          style={{
                            margin: "24px 0px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "#fafafa",
                          }}
                        >
                          {coinLoading ? (
                            <Skeleton active paragraph={{ rows: 1 }} />
                          ) : (
                            <>
                              <span>
                                <TbCoinRupee
                                  style={{ fontSize: "25px", color: "#D1B000" }}
                                />
                                <i> Pay using points</i>{" "}
                                <span className="balCoin">
                                  Balance Coin{" "}
                                  {coinSwitch ? "0" : coin?.reward_points}
                                </span>
                              </span>
                              <Switch
                                value={coinSwitch}
                                defaultChecked={false}
                                onChange={onChange}
                              />
                            </>
                          )}
                        </div> */}

                        {/* ----------------------------------Coupan ---------------------------------- */}
                        <Coupan
                          getCoupanListFetch={getCoupanListFetch}
                          coupanLoading={coupanLoading}
                          afterDeductionData={afterDeductionData}
                          setCoupanInp={setCoupanInp}
                          coupanInp={coupanInp}
                          handlerClear={handlerClear}
                          handlerApplyCoupan={handlerApplyCoupan}
                        />

                        {/* ----------------------------------Address ---------------------------------- */}
                        <Address
                          addressData={addressData}
                          handlerSelectedAddress={handlerSelectedAddress}
                        />
                      </div>

                      {/* ----------------------------------Price Detaols ---------------------------------- */}
                      <Price
                        cartData={cartData}
                        allData={allData}
                        afterDeductionData={afterDeductionData}
                        gstTotalData={gstTotalData}
                        isChecked={isChecked}
                        coupan={coupanValue}
                        handlerOpenPayModal={handlerOpenPayModal}
                        shipingData={shipingData}
                        addressData={addressData}
                        comLoading={comLoading}
                        coinSwitch={coinSwitch}
                        coin={coin}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
          {/* Main Section End Here */}
        </div>
      )}

      {/* coupan modal */}
      <Modal
        className="couponModalApply"
        title="Coupan List"
        open={coupanToogle}
        onOk={() => setCoupanToogle(false)}
        onCancel={() => setCoupanToogle(false)}
      >
        <List
          size="small"
          bordered
          dataSource={coupanListData}
          renderItem={(item, i) => (
            <List.Item
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
              }}
            >
              <span>
                {item.coupon_tilte} &nbsp;
                <b style={{ color: "#f16136" }}>{item.coupon_discription}</b>
              </span>
              <Button
                size="small"
                type="primary"
                onClick={() => handlerCoupanApplyByUser(item)}
              >
                Apply
              </Button>
            </List.Item>
          )}
        />
      </Modal>

      {/* Default Address Pop up */}
      <Modal
        open={defaultAddressModal}
        onOk={() => handleOk(defaultAddressModal)}
        onCancel={() => setDefaultAddressModal(false)}
      >
        <p>Are you sure want to select default address?</p>
        <p>
          Your Address :<b>{showAddress?.address}</b>
        </p>
      </Modal>

      {/* open pay modal */}
      <textarea
        cols="50"
        rows="25"
        defaultValue={mConfigTextAreaVal}
        ref={mConfigTextAreaRef}
        style={{ display: "none" }}
      />

      <Modal
        className="CartPopData"
        title="Payment Mode"
        footer={null}
        open={payToggle}
        onOk={() => setPayToggle(false)}
        onCancel={handlePayFunction}
      >
        <div className="cartModelBody">
          <Radio.Group
            onChange={(e) => setSelectedGateway(e.target.value)}
            value={selectedGateway}
          >
            {payModeArr?.map((itm, i) => {
              const isSelected = selectedGateway === itm.payment_gateway_name;

              // If selectedGateway is set and not this item, skip rendering it
              if (selectedGateway && !isSelected) return null;

              return (
                <Radio key={i} value={itm.payment_gateway_name}>
                  {itm?.payment_gateway_name}
                </Radio>
              );
            })}
          </Radio.Group>
        </div>

        <Button
          block
          type="primary"
          disabled={!selectedGateway}
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 5000);
            handlePopUpmodal(selectedGateway, gstTotalData);
          }}
        >
          {isLoading ? <Spin /> : "Pay Now"}
        </Button>
      </Modal>
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

export default AddCart;
