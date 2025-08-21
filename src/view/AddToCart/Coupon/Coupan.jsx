import { Spin } from "antd";
import React from "react";
import { FaAngleRight, FaWallet, FaCheckCircle } from "react-icons/fa";

const Coupan = ({
  getCoupanListFetch,
  coupanLoading,
  setCoupanInp,
  coupanInp,
  afterDeductionData,
  handlerClear,
  handlerApplyCoupan,
}) => {
  return (
    <div className="select-code">
      <div className="row">
        <div class="col-md-12">
          <div class="savingCorner">
            <h4>Savings Corner</h4>
            {/* <p>
              <FaCheckCircle /> You Saved ₹ 200 with NEW2025
            </p> */}
          </div>
        </div>
        <div className="col-8 col-sm-4 col-md-6 col-lg-4 col-xl-5 position-relative">
          <input
            value={coupanInp}
            type="text"
            placeholder="Select Coupon code/Referal code"
            name="code"
            onChange={(e) => setCoupanInp(e.target.value)}
            disabled={
              Object?.keys(
                afterDeductionData !== undefined && afterDeductionData
              )?.length > 0
                ? true
                : false
            }
          />
          <span className="cut" id="fa" style={{ display: "none" }}>
            <a>
              <i
                className="fa fa-close close_button"
                style={{ color: "red" }}
              ></i>
            </a>
          </span>
        </div>

        <div className="col-4 col-sm-2 col-md-2 col-lg-2 col-xl-2">
          {Object?.keys(afterDeductionData !== undefined && afterDeductionData)
            ?.length > 0 ? (
            <button
              onClick={handlerClear}
              className="btn btn-primary apply_coupon"
              style={{ width: "100%", background: "green" }}
            >
              Clear
            </button>
          ) : (
            <button
              onClick={handlerApplyCoupan}
              className="btn btn-primary apply_coupon"
              style={{ width: "100%" }}
            >
              Apply
            </button>
          )}
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-5 col-xl-5">
          {/* <button
            onClick={getCoupanListFetch}
            className="btn btn-primary apply_coupon"
            style={{ width: "100%" }}
          >
            {coupanLoading ? <Spin /> : "Coupon List"}
          </button> */}
          <div className="payCoupon">
            <FaWallet />
            <button
              href=""
              onClick={getCoupanListFetch}
              className="apply_coupon"
            >
              {coupanLoading ? <Spin /> : "View All Payment Coupons"}
            </button>
            <FaAngleRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupan;
