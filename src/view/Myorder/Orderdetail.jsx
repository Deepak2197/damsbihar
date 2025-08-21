import React, { useState, useEffect } from "react";
import "../../assets/css/my-order/style.css";
import "../../assets/css/my-order/responsive.css";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
const Orderdetail = () => {
  const location = useLocation();
  const userid = sessionStorage.getItem("id");
  const order = location.state?.order;
  const resdata = sessionStorage.getItem("userData");
  const userDataObj = JSON.parse(resdata);
  const [address, setAddress] = useState([]);

  const formattedDate = new Date(order?.updated_date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  {
    formattedDate;
  }

  if (!order) {
    return <p>No order data available</p>;
  }

  const [steps, setSteps] = useState([
    {
      id: 1,
      label: `Ordered Confirmed (${formattedDate || ""})`,
      complete: true,
    },
    { id: 3, label: "Delivered", complete: false },
  ]);

  const handleStepClick = (clickedStepId) => {
    const updatedSteps = steps.map((step) => ({
      ...step,
      complete: step.id <= clickedStepId,
    }));
    setSteps(updatedSteps);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setImageName(file.name); // Set the image name
    }
  };

  const [smileyA, setSmileyA] = useState("/web/smileya.svg");
  const [smileyB, setSmileyB] = useState("/web/smileyb.svg");
  const [smileyC, setSmileyC] = useState("/web/smileyc.svg");
  const [smileyD, setSmileyD] = useState("/web/smileyd.svg");
  const [smileyE, setSmileyE] = useState("/web/smileye.svg");

  const handleClick = (setter, original, changed) => {
    setter((prev) => (prev === original ? changed : original));
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(
          API_ENDPOINTS.My_ORDER.GET_ADDRESS,
          {
            user_id: userDataObj.id,
            last_id: "",
          }
        );
        setAddress(response?.data?.data);
        const defaultAddress = response?.data?.data.find(
          (item) => item.is_default === "1"
        );
        if (defaultAddress) {
          setAddress(defaultAddress);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [userDataObj.id]);

  const handleInvoice = (oid, cid) => {
    navigate(`/invoice/${oid}C${cid}U${userid}`);
  };

  const handleTracking = (
    cover_image,
    title,
    net_amt,
    gst,
    id,
    creation_time,
    transaction_status
  ) => {
    localStorage.setItem("cover_image", cover_image);
    localStorage.setItem("title", title);
    localStorage.setItem("net_amt", net_amt);
    localStorage.setItem("gst", gst);
    localStorage.setItem("transaction_id", id);
    localStorage.setItem("creation_time", creation_time);
    localStorage.setItem("transaction_status", transaction_status);

    navigate("/order-tracking");
  };

  return (
    <div className="ordeRDetailBG">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>Order Details</li>
            </ul>
          </div>
        </div>
      </div>
      <div></div>
      <section className="OrderDetail">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="downloadInvoice">
                <p>
                  Order Date<span>{formattedDate}</span>
                </p>
                <p>
                  Order No.<span>{order.pre_transaction_id}</span>
                </p>
                <p>
                  Order Total
                  <span>
                    Rs.{" "}
                    {(
                      Number(order?.course_net_price || 0) +
                      Number(order?.shipping_charge || 0) +
                      Number(order?.platform_fee || 0) +
                      Number(order?.total_gst_amount || 0)
                    ).toFixed(2)}
                  </span>
                </p>

                {order?.transaction_status == 1 && (
                  <div className="Invoice">
                    <a href="">
                      <h3
                        onClick={() =>
                          handleInvoice(
                            order?.pre_transaction_id,
                            order?.course_id
                          )
                        }
                      >
                        <img
                          src={`${window.IMG_BASE_URL}/revamp-web/etc/invoice.svg`}
                        />
                        Download Invoice{" "}
                        <span>
                          <em class="fa fa-angle-right"></em>
                        </span>
                      </h3>
                    </a>
                  </div>
                )}
              </div>
              {(order?.product_type == 1 || order?.product_type == 2) && (
                <div className="shipmentDetails">
                  <h1>Shipment Details</h1>
                  <div className="Delivered">
                    <h2>Delivered</h2>
                    <h3>Delivery Estimate</h3>
                    {/* <h4>Friday, 12 July, 2024</h4> */}
                    {/* <h4>{order?.updated_date}</h4> */}
                  </div>
                  <div className="workbookUltimate">
                    <div className="Ultimate">
                      <div className="bookSide">
                        <img src={order?.cover_image} />
                      </div>
                      <div className="textSide">
                        <h2>
                          {order.title}
                          <div className="ruppes">
                            ₹{" "}
                            {(
                              Number(order?.course_net_price || 0) +
                              Number(order?.shipping_charge || 0) +
                              Number(order?.platform_fee || 0) +
                              Number(order?.total_gst_amount || 0) -
                              Number(order?.coupon_discount || 0)
                            ).toFixed(2)}
                          </div>
                        </h2>
                        <h3>Qty:{order.quantity}</h3>
                        <h4>Sold By: Delhi Academy of Medical Science</h4>
                      </div>
                    </div>
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
                      <p>
                        {order.is_paper_book == 1 ? (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault(); // Prevents page reload
                              handleTracking(
                                order.cover_image,
                                order.title,
                                order.net_amt,
                                order.gst,
                                order.id,
                                order.creation_time,
                                order.transaction_status
                              );
                            }}
                          >
                            See All Update
                            <span>
                              <em className="fa fa-angle-right"></em>
                            </span>
                          </a>
                        ) : null}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {(order?.product_type == 1 || order?.product_type == 2) && (
                <div className="addressDetail">
                  <h2>Shipment Details</h2>
                  {/* <h3>{userDataObj?.name}</h3> */}
                  <h3>{address.name}</h3>
                  <p>
                    {address.city}, {address.state} - {address.pincode},{" "}
                    {address.country}
                  </p>
                  <h4>{address.phone}</h4>
                </div>
              )}
              <div className="RateYourExperience">
                <h2>Rate Your Experience</h2>
                <h3>Rate the product</h3>
                <div className="seculli">
                  <ul>
                    <li>
                      <img
                        src={smileyA}
                        alt="smileyA"
                        onClick={() =>
                          handleClick(
                            setSmileyA,
                            "/web/smileya.svg",
                            "/web/smileyaa.svg"
                          )
                        }
                      />
                    </li>
                    <li>
                      <img
                        src={smileyB}
                        alt="smileyB"
                        onClick={() =>
                          handleClick(
                            setSmileyB,
                            "/web/smileyb.svg",
                            "/web/smileybb.svg"
                          )
                        }
                      />
                    </li>
                    <li>
                      <img
                        src={smileyC}
                        alt="smileyC"
                        onClick={() =>
                          handleClick(
                            setSmileyC,
                            "/web/smileyc.svg",
                            "/web/smileycc.svg"
                          )
                        }
                      />
                    </li>
                    <li>
                      <img
                        src={smileyD}
                        alt="smileyD"
                        onClick={() =>
                          handleClick(
                            setSmileyD,
                            "/web/smileyd.svg",
                            "/web/smileydd.svg"
                          )
                        }
                      />
                    </li>
                    <li>
                      <img
                        src={smileyE}
                        alt="smileyE"
                        onClick={() =>
                          handleClick(
                            setSmileyE,
                            "/web/smileye.svg",
                            "/web/smileyee.svg"
                          )
                        }
                      />
                    </li>
                  </ul>
                  {/* <button className="btn photoadd">
                    <img src="../myorder/photo.svg" />
                    Add photo
                  </button>
                  <div className="uploadbtn">
                    <div className="addBtn">
                      <label htmlFor="file-upload">
                        {" "}
                        <img src="../myorder/photo.svg" /> Add Photo{" "}
                      </label>
                    </div>
                    <div className="inpucls">
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                      {imageName && (
                        <p style={{ marginTop: "10px" }}>File: {imageName}</p>
                      )}
                    </div>

                    {selectedImage && (
                      <div className="imgupload">
                        <h3>Preview:</h3>
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Preview"
                        />
                      </div>
                    )}
                  </div> */}
                </div>
              </div>

              <div className="orderSummary">
                <h2>Order Summary</h2>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Total Items</td>
                      <td>{order?.quantity}</td>
                    </tr>
                    <tr>
                      <td>Sub Total</td>
                      <td>₹ {order?.course_base_price}</td>
                    </tr>
                    {order?.gst ? (
                      <tr>
                        <td>GST</td>
                        <td>₹ {order?.total_gst_amount}</td>
                      </tr>
                    ) : null}
                    {order?.coupon_discount &&
                    order.coupon_discount !== "0.00" ? (
                      <tr>
                        <td>Coupon</td>
                        <td className="textGrn">- ₹ {order.coupon_discount}</td>
                      </tr>
                    ) : null}

                    {order?.wallet_refund_amount_used != null ? (
                      <tr>
                        <td>Wallet Used</td>
                        <td className="textGrn">
                          - ₹ {order.wallet_refund_amount_used}
                        </td>
                      </tr>
                    ) : null}

                    {order?.shipping_charge !== "0.00" ? (
                      <tr>
                        <td>Delivery Charges</td>
                        <td>₹ {order.shipping_charge}</td>
                      </tr>
                    ) : null}

                    {order?.platform_fee !== "0.00" ? (
                      <tr>
                        <td>Platform Fee</td>
                        <td>₹ {order.platform_fee}</td>
                      </tr>
                    ) : null}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Total</th>
                      <th className="textOrg">
                        ₹{" "}
                        {(
                          Number(order?.course_base_price || 0) +
                          Number(order?.shipping_charge || 0) +
                          Number(order?.platform_fee || 0) +
                          Number(order?.total_gst_amount || 0) -
                          Number(order?.coupon_discount || 0)
                        ).toFixed(2)}
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Orderdetail;
