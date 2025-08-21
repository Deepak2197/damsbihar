const TxnToken = localStorage.getItem("TxnToken");
const OrderId = localStorage.getItem("OrderId");
const TotalAmount = localStorage.getItem("TotalAmount");

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

export default CONFIG;