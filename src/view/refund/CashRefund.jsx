import "../../assets/css/cart-page/style.css";
import "../../assets/css/cart-page/cart-responsive.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

import Modal from "react-bootstrap/Modal";

const CashRefund = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the panel if it is already open
    } else {
      setActiveIndex(index); // Open the clicked panel
    }
  };

  const panels = [
    { title: "Panel 1", content: "This is the content for Panel 1" },
    { title: "Panel 2", content: "This is the content for Panel 2" },
    { title: "Panel 3", content: "This is the content for Panel 3" },
  ];

  const id = sessionStorage.getItem("id");
  const [data, setData] = useState({});

  const getRefundCalled = async () => {
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.WALLET.USER_CASH_REFOUND,
        {
          user_id: id,
        }
      );

      setData(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    getRefundCalled();
  }, []);

  // Begin: pop up code
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // End: pop up code

  const [favLanguage, setFavLanguage] = useState("");
  const handleChange = (event) => {
    setFavLanguage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="CashRefund">
      <div className="container">
        <div className="CashRefundarea">
          {data?.status === true ? (
            <>
              <div className="refundText">
                <h1>Your Cash Refund</h1>
                <Link to="/">Buy Now</Link>
              </div>
              <div className="refundText">
                <h3>
                  <img src="/web/wallet.svg" />
                  Balance Amount
                </h3>
                <p>
                  <em className="fa fa-rupee"></em> {data?.data?.balance_amount}
                </p>
              </div>

              {/* <div className="row">
                <div className="col-6 col-md-6 col-lg-6">
                  <div className="refundText">
                    <h1>Your Cash Refund</h1>
                  </div>
                </div>
                <div className="col-6 col-md-6 col-lg-6">
                  <div className="refundText text-right">
                    <Link to="/">Buy Now</Link>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="refundText">
                    <h3>
                      Balance Amount{" "}
                      <span>
                        <em className="fa fa-rupee mr-2"></em>
                        {data?.data?.balance_amount}
                      </span>
                    </h3>
                  </div>
                </div>
              </div> */}
            </>
          ) : (
            <h1
              style={{
                color: "white",
                textAlign: "center",
                marginTop: "25px",
                fontSize: "26px",
              }}
            >
              No Data Found....
            </h1>
          )}
        </div>

        <div className="accordion">
          <div className="accordHeading">
            <h5>Your Transactions</h5>
          </div>
          {panels.map((panel, index) => (
            <div key={index} className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => handleClick(index)}
              >
                <div className="qsnBankText">
                  <h3>DAMS Question Bank-II 2nd Year MBBS</h3>
                  <h4>+ ₹4,340</h4>
                </div>
                <div className="arrowSet">
                  <p>18 Jan 2024</p>
                  <span className="accordion-arrow">
                    {activeIndex === index ? "﹤" : "﹥"}
                  </span>
                </div>
              </div>
              {activeIndex === index && (
                <div className="accordion-content">
                  <div className="textSet">
                    <p>Order Number:</p>
                    <p>4145198461841651845</p>
                  </div>
                  <div className="textSet">
                    <h5>Refund Amount:</h5>
                    <h5>₹ 4,340</h5>
                  </div>
                  <div className="textSet">
                    <h6>
                      Return of RS ₹4,340 against DAMS Question Bank-II 2nd Year
                      MBBS
                    </h6>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {data?.data?.List.length > 0 &&
          data?.data?.List?.map((itm, i) => (
            <div className="RefundTable">
              <div className="table-responsive">
                <table className="table m-0">
                  <tr style={{ borderBottom: "1px solid #eee" }}>
                    <td>Order Number: </td>
                    <td>
                      <strong>
                        {!itm?.transaction_id
                          ? itm?.transaction_id1
                          : itm?.transaction_id}
                        <b
                          style={{
                            color: itm?.wallet_refund_amount_used
                              ? "red"
                              : "green",
                            marginLeft: "450px",
                          }}
                        >
                          {!itm?.wallet_refund_amount_used ? "Credit" : "Debit"}
                        </b>
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Date: </td>
                    <td>
                      <strong>
                        {itm?.wallet_refund_amount_used === ""
                          ? itm?.date
                          : itm?.date1}{" "}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Refund description: </td>
                    <td>
                      <strong>
                        {itm?.wallet_refund_amount_used === ""
                          ? itm?.course
                          : itm.title1}
                      </strong>
                      <span className="d-block">
                        {/* {} */}
                        {/* Return of Rs */}
                        {!itm?.refund_amount
                          ? "Used of ₹" +
                            itm?.wallet_refund_amount_used +
                            " against"
                          : "Return of ₹" + itm?.refund_amount + " against"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Refund Amount: </td>
                    <td>
                      <strong>
                        <em className="fa fa-rupee"></em>{" "}
                        {!itm?.refund_amount
                          ? itm?.wallet_refund_amount_used
                          : itm?.refund_amount}
                      </strong>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          ))}
      </div>

      {/* Payment Method Button code */}

      <div className="paymentMethod">
        <Link to={"#"} className="Paymentbtn d-none" onClick={handleShow}>
          Payment Method
        </Link>
      </div>

      {/* Begin: Model Code  */}
      <Modal show={show} onHide={handleClose} className="payMethodModel">
        <Modal.Header closeButton>
          {/*<Modal.Title>Payment Method</Modal.Title>*/}
        </Modal.Header>

        <Modal.Body className="content">
          <h3>
            Item(s) Price :{" "}
            <em className="fa fa-rupee" style={{ marginRight: "5px" }}></em>
            30,000
          </h3>
          <form onSubmit={handleSubmit} className="emiform">
            <div className="chooseData">
              <div className="datarow">
                <input
                  type="radio"
                  id="Pay"
                  name="Pay in Full"
                  value="Pay in Full"
                  checked={favLanguage === "Pay in Full"}
                  onChange={handleChange}
                />
                <label>Pay in Full</label>
              </div>

              <div className="datarow">
                <div className="row">
                  <div className="col-8 col-md-8 col-lg-8">
                    <input
                      type="radio"
                      id="Months"
                      name="Months"
                      value="Months"
                      checked={favLanguage === "Months"}
                      onChange={handleChange}
                    />
                    <label>
                      <em
                        className="fa fa-rupee"
                        style={{ marginRight: "5px" }}
                      ></em>
                      10,000 X 3 Months
                    </label>
                  </div>
                  <div className="col-4 col-md-4 col-lg-4">
                    <div className="totalprice text-right">
                      <h4>
                        <em
                          className="fa fa-rupee"
                          style={{ marginRight: "5px" }}
                        ></em>
                        30,000
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="datarow">
                <div className="row">
                  <div className="col-8 col-md-8 col-lg-8">
                    <input
                      type="radio"
                      id="6Months"
                      name="Months"
                      value="6Months"
                      checked={favLanguage === "6Months"}
                      onChange={handleChange}
                    />
                    <label>
                      <em
                        className="fa fa-rupee"
                        style={{ marginRight: "5px" }}
                      ></em>
                      5,000 X 6 Months
                    </label>
                  </div>
                  <div className="col-4 col-md-4 col-lg-4">
                    <div className="totalprice text-right">
                      <h4>
                        <em
                          className="fa fa-rupee"
                          style={{ marginRight: "5px" }}
                        ></em>
                        30,000
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="datarow">
                <div className="row">
                  <div className="col-8 col-md-8 col-lg-8">
                    <input
                      type="radio"
                      id="9Months"
                      name="Months"
                      value="9Months"
                      checked={favLanguage === "9Months"}
                      onChange={handleChange}
                    />
                    <label>
                      <em
                        className="fa fa-rupee"
                        style={{ marginRight: "5px" }}
                      ></em>
                      3,333 X 9 Months
                    </label>
                  </div>
                  <div className="col-4 col-md-4 col-lg-4">
                    <div className="totalprice text-right">
                      <h4>
                        <em
                          className="fa fa-rupee"
                          style={{ marginRight: "5px" }}
                        ></em>
                        30,000
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="datarow">
                <div className="row">
                  <div className="col-8 col-md-8 col-lg-8">
                    <input
                      type="radio"
                      id="12Months"
                      name="Months"
                      value="12Months"
                      checked={favLanguage === "12Months"}
                      onChange={handleChange}
                    />
                    <label>
                      <em
                        className="fa fa-rupee"
                        style={{ marginRight: "5px" }}
                      ></em>
                      25,00 X 12 Months
                    </label>
                  </div>
                  <div className="col-4 col-md-4 col-lg-4">
                    <div className="totalprice text-right">
                      <h4>
                        <em
                          className="fa fa-rupee"
                          style={{ marginRight: "5px" }}
                        ></em>
                        30,000
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="emiData">
              <table className="table">
                <tr>
                  <td>1st EMI</td>
                  <td className="text-right">
                    <em
                      className="fa fa-rupee"
                      style={{ marginRight: "1px", background: "none" }}
                    ></em>
                    30,000
                  </td>
                </tr>
                <tr>
                  <td>Convenience Charges</td>
                  <td className="text-right">
                    <em
                      className="fa fa-rupee"
                      style={{ marginRight: "1px", background: "none" }}
                    ></em>
                    0
                  </td>
                </tr>
                <tr>
                  <td>Taxes</td>
                  <td className="text-right">
                    <em
                      className="fa fa-rupee"
                      style={{ marginRight: "1px" }}
                    ></em>
                    0
                  </td>
                </tr>
                <tr>
                  <td className="text-danger">Balance</td>
                  <td className="text-right text-danger">
                    <em
                      className="fa fa-rupee text-danger"
                      style={{ marginRight: "1px" }}
                    ></em>
                    20,000
                  </td>
                </tr>
                <tr className="mt-4">
                  <th>Total Amount Pay</th>
                  <th className="text-right">
                    <em
                      className="fa fa-rupee"
                      style={{ marginRight: "1px" }}
                    ></em>
                    10,000
                  </th>
                </tr>
              </table>
            </div>
            <div className="subbtn">
              <button type="submit">Continue</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default CashRefund;
