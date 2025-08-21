import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BankOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
const Price = ({
  cartData,
  allData,
  afterDeductionData,
  gstTotalData,
  isChecked,
  coupan,
  handlerOpenPayModal,
  shipingData,
  addressData,
}) => {
  const nav = useNavigate();

  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
      <div className="left-side">
        <div className="ibox-title">
          <h5>Price Summary</h5>
        </div>

        <div className="table-responsive">
          <table className="table" id="result_here_apply">
            <tbody>
              <tr>
                <td>
                  {" "}
                  <ShoppingCartOutlined /> Item Total
                </td>
                <td className="text-right">{allData?.total_item_qty}</td>
              </tr>
              <tr>
                <td>
                  <ShoppingOutlined /> Item(s) Amount
                </td>
                <td className="text-right">
                  <i className="fa fa-rupee mr-1"></i>
                  {allData?.course_type === 7
                    ? allData?.final_amount
                    : allData?.course_price}
                </td>
              </tr>
              {isChecked && (
                <tr>
                  <td style={{ color: "#55b339", fontWeight: "600" }}>
                    dams Wallet
                  </td>
                  <td
                    className="text-right"
                    style={{ color: "#55b339", fontWeight: "600" }}
                  >
                    <i className="fa fa-rupee mr-1"></i>
                    {/* {coupan} */}
                    {localStorage.getItem("walletValue")}
                  </td>
                </tr>
              )}
              {Object?.keys(
                afterDeductionData !== undefined && afterDeductionData
              ).length !== 0 && (
                <tr className="couponcol">
                  <>
                    <td id="couponcode">
                      <b style={{ color: "#f16136" }}>
                        Coupon - {afterDeductionData?.coupon_code}
                      </b>
                    </td>
                    <td
                      className="text-right"
                      id="discount_display"
                      style={{ color: "#f16136" }}
                    >
                      - <em className="fa fa-rupee mr-1"></em>
                      {afterDeductionData?.discount_amount}
                    </td>
                  </>
                </tr>
              )}
              {addressData.length > 0 && (
                <tr>
                  <td>
                    <BankOutlined /> GST Charges{" "}
                  </td>
                  <td className="text-right" id="total_gst_rewardamount">
                    <i className="fa fa-rupee mr-1"></i>
                    {Number(gstTotalData?.total_gst_amount).toFixed(2)}
                  </td>
                </tr>
              )}

              {addressData.length > 0 && (
                <tr>
                  <td>
                    <strong> Total</strong>
                  </td>

                  <td className="text-right" id="grandtotal_display">
                    <strong>
                      <i className="fa fa-rupee mr-1"></i>
                      {/* {afterCoupanData?.total_amount} */}
                      {Number(gstTotalData?.total_payble_amount).toFixed(2)}
                    </strong>
                  </td>
                </tr>
              )}
              {Object.keys(shipingData).length > 0 && (
                <tr>
                  <td className="backBG">
                    <p>Delivery Charges</p>
                  </td>

                  <td className="text-right backBG" id="grandtotal_display">
                    {shipingData?.shipping_charge}
                  </td>
                </tr>
              )}
              {gstTotalData?.platform_fee > 0 && (
                <tr className="dashedborder">
                  <td className="backBG">Platform Fee</td>
                  <td className="text-right backBG" id="total_gst_rewardamount">
                    <i className="fa fa-rupee mr-1"></i>
                    {Number(gstTotalData?.platform_fee).toFixed(2)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div>
          {addressData.length > 0 ? (
            <button
              className="btn btn-danger btn-block"
              onClick={handlerOpenPayModal}
            >
              <h5>
                ₹{" "}
                {(
                  Number(gstTotalData?.total_payble_amount || 0) +
                  Number(gstTotalData?.platform_fee || 0) +
                  Number(shipingData?.shipping_charge || 0)
                ).toFixed(2)}
                <span>Grand Total</span>
              </h5>

              <h6>
                Place Order <FaAngleRight />
              </h6>
            </button>
          ) : (
            <button
              className="btn btn-danger btn-block"
              onClick={() => nav("/addnewaddress")}
            >
              Add Address
            </button>
          )}
          <br />
        </div>
      </div>
    </div>
  );
};

export default Price;
