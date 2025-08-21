import "../../assets/css/order-tracking/style.css";
import "../../assets/css/order-tracking/responsive.css";
//import "../../assets/css/order-tracking/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
const Ordertracking = () => {
  const userid = sessionStorage.getItem("id");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(
          API_ENDPOINTS.My_ORDER.OLDER_HISTORY,
          {
            user_id: userid,
            transaction_id: localStorage.getItem("transaction_id"),
          }
        );
        SetTrack(response.data.track_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [userid]);
  const [steps, setSteps] = useState([
    { id: 1, label: "Ordered Placed", complete: true },
    { id: 2, label: "Ordered Confirmed", complete: false },
    { id: 3, label: "Packed", complete: false },
    { id: 4, label: "Shipped", complete: false },
    { id: 5, label: "Out of Delivery", complete: false },
    { id: 6, label: "Delivery", complete: false },
  ]);
  const handleStepClick = (clickedStepId) => {
    const updatedSteps = steps.map((step) => ({
      ...step,
      complete: step.id <= clickedStepId,
    }));
    setSteps(updatedSteps);
  };

  return (
    <>
      <div className="Myorder">
        <div className="page-content position-relative">
          <div className="breadcrumb-row">
            <div className="container">
              <ul className="list-inline">
                <li>
                  <a href={"/"}>Home</a>
                </li>
                <li>My Order</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="order-tracking">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2 order-book">
                <img src={localStorage.getItem("cover_image")} />
              </div>
              <div className="col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10">
                <div className="order-text">
                  <h3>
                    {localStorage.getItem("title")
                      ? localStorage.getItem("title")
                      : ""}
                  </h3>
                  <p>Seller : Delhi Academy of Medical Sciences</p>
                  <h4>
                    <span className="price">Price:</span>
                    <span className="offer">
                      ₹{" "}
                      {parseFloat(localStorage.getItem("net_amt")) +
                        parseFloat(localStorage.getItem("gst"))}
                      &nbsp;&nbsp;(
                      {localStorage.getItem("net_amt")
                        ? localStorage.getItem("net_amt")
                        : ""}
                      +
                      {localStorage.getItem("gst")
                        ? localStorage.getItem("gst")
                        : ""}
                      (GST))
                    </span>
                  </h4>
                  <h4>
                    <span className="price">Order ID: </span>
                    <span className="offer">
                      {"EMED00000" + localStorage.getItem("transaction_id")}
                    </span>{" "}
                    <span className="StatusSet">
                      <span className="price">Status: </span>

                      {localStorage.getItem("transaction_status") == 0 ? (
                        <span className="rating" style={""}>
                          Pending
                        </span>
                      ) : localStorage.getItem("transaction_status") == 1 ? (
                        <span className="rating" style={{ color: "#54B434" }}>
                          Successful
                        </span>
                      ) : (
                        <span className="rating" style={{ color: "red" }}>
                          Failed
                        </span>
                      )}
                    </span>
                  </h4>
                </div>
              </div>
            </div>
            <div className="row tracking">
              <div className="col-md-12">
                <div className="orderTrak">
                  <div>
                    <ul className="timeline" id="timeline">
                      {steps.map((step) => (
                        <li
                          key={step.id}
                          className={`${
                            step.complete ? "complete" : ""
                          } clickable`}
                          // onClick={() => handleStepClick(step.id)}
                        >
                          <div className="status clickable">
                            <label>{step.label}</label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-0">
                <div className="track-status">
                  <h3>Status</h3>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td className="bold size">
                            <span>
                              <img
                                src="http://localhost/live-emedicoz/ci_4/assets/images/order-tracking/order.svg"
                                alt=""
                              />
                            </span>
                            Ordered Placed
                          </td>
                          <td>{localStorage.getItem("creation_time")}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Ordertracking;
