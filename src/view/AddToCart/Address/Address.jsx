import React from "react";
import { Link } from "react-router-dom";

const Address = ({ addressData, handlerSelectedAddress }) => {
  return (
    <>
      <div className="address-group">
        <div className="row">
          <div className="col-5 col-sm-5 col-md-6 col-lg-6 col-xl-6">
            <h4>Delivery to this address</h4>
          </div>
          <div className="col-7 col-sm-7 col-md-6 col-lg-6 col-xl-6 text-right">
            <Link to={"/addnewaddress"}>
              <em className="fa fa-map-marker fa-fw"></em>Add New Address
            </Link>
          </div>
        </div>
      </div>
      <div className="no-found text-center">
        <div className="row">
          {addressData?.length > 0 ? (
            <>
              {addressData?.map((itm, i) => (
                <div
                  className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
                  key={i}
                >
                  <div
                    onClick={() => handlerSelectedAddress(itm)}
                    className="testimonial"
                    style={{
                      cursor: "pointer",
                      margin: "0px",
                      textAlign: "left",
                      background:
                        itm.is_default === "1" ? "#007AFF0D " : "#FAFAFA",
                      border:
                        itm.is_default === "1"
                          ? "1px solid #007aff "
                          : "1px solid #FFFFFF",
                      padding: "6px 15px",
                      marginBottom: "15px",
                    }}
                  >
                    <p
                      className="description text-left"
                      style={{ lineHeight: "25px", padding: "0px" }}
                    >
                      <i className="fa fa-user fa-fw"></i>
                      {itm.name}
                    </p>
                    <p>
                      <i className="fa fa-phone fa-fw"></i>
                      {itm.phone}
                    </p>
                    <p>
                      <i className="fa fa-map-marker fa-fw"></i>
                      {itm.address}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No Address Found...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Address;
