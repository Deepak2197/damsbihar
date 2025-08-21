import { Button, Col, Radio, Row, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import "../../assets/css/publish-book/style.css";
import "../../assets/css/publish-book/responsive.css";
const { RangePicker } = DatePicker;

const EbookSale = () => {
  const navigate = useNavigate();
  const productData = [
    { label: "Chair", value: 45, color: "#30C0CD" },
    { label: "Book", value: 15, color: "#F14E62" },
    { label: "Tshirt", value: 15, color: "#F8B415" },
    { label: "Medical Kit", value: 25, color: "#274568" },
  ];
  const cityData = [
    { label: "Delhi", value: 50, color: "#30C0CD" },
    { label: "Noida", value: 20, color: "#F14E62" },
    { label: "Haryana", value: 15, color: "#F8B415" },
    { label: "Punjab", value: 15, color: "#274568" },
  ];
  const renderPieChart = (data) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;
    return (
      <svg width="220" height="220" viewBox="0 0 100 100">
        {data.map((item, index) => {
          const sliceAngle = (item.value / total) * 360;
          const endAngle = startAngle + sliceAngle;
          const x1 = 50 + 45 * Math.cos((Math.PI * startAngle) / 180);
          const y1 = 50 + 45 * Math.sin((Math.PI * startAngle) / 180);
          const x2 = 50 + 45 * Math.cos((Math.PI * endAngle) / 180);
          const y2 = 50 + 45 * Math.sin((Math.PI * endAngle) / 180);
          const largeArcFlag = sliceAngle > 180 ? 1 : 0;
          const pathData = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
          const midAngle = startAngle + sliceAngle / 2;
          const labelX = 50 + 30 * Math.cos((Math.PI * midAngle) / 180);
          const labelY = 50 + 30 * Math.sin((Math.PI * midAngle) / 180);
          const percentage = ((item.value / total) * 100).toFixed(1) + "%";
          startAngle = endAngle;
          return (
            <g key={index}>
              <path
                d={pathData}
                fill={item.color}
                stroke="#fff"
                strokeWidth="0.5"
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                fontSize="4"
                fill="#fff"
              >
                {percentage}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const [activeTab, setActiveTab] = useState("Today");
  const [dateRange, setDateRange] = useState(null);

  const products = [
    {
      name: "Book",
      sold: "25",
      price: "₹ 200",
      selling: "₹ 400",
      earning: "₹ 40,000",
    },
    {
      name: "Stethoscop",
      sold: "74",
      price: "₹ 2000",
      selling: "₹ 3000",
      earning: "₹ 40,000",
    },
    {
      name: "Book",
      sold: "85",
      price: "₹ 200",
      selling: "₹ 400",
      earning: "₹ 40,000",
    },
    {
      name: "Stethoscop",
      sold: "25",
      price: "₹ 2000",
      selling: "₹ 3000",
      earning: "₹ 40,000",
    },
  ];
  const id = sessionStorage.getItem("id");
  const [tabsValue, setTabsValue] = useState("UN");
  const [unpublisedData, setUnpublisedData] = useState([]);
  const [publisedData, setPublisedData] = useState([]);

  const tabs = [
    {
      name: "Unpublised",
      img: "https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/publish-book/book-icon.svg",
      value: "UN",
    },
    {
      name: "Publised",
      img: "https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/publish-book/book-img.svg",
      value: "P",
    },
    {
      name: "Sales Report",
      img: "https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/publish-book/report-img.svg",
      value: "SR",
    },
  ];

  const getTabData = async () => {
    try {
      const res = await axiosInstance.post(
        "/ebook_sales_model/Ebooksales_details",
        {
          user_id: id,
          page_no: 0,
        }
      );
      setUnpublisedData(res.data.data.record);
    } catch (err) {}
  };

  const getPublisedCalled = async () => {
    try {
      const res = await axiosInstance.post(
        "/ebook_sales_model/Ebooksales_details",
        {
          user_id: id,
          page_no: 0,
        }
      );
      const re = res.data.data.record.filter((itm) => itm.status === 1);
      setPublisedData(re);
    } catch (err) {}
  };

  useEffect(() => {
    if (tabsValue === "UN") {
      getTabData();
    }
  }, [tabsValue]);

  useEffect(() => {
    if (tabsValue === "P") {
      getPublisedCalled();
    }
  }, [tabsValue]);

  return (
    <div className="EbookSale">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>My Product Sales</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <section className="myProductSales">
          <Row>
            <Col md={24}>
              {/* Tabbing*/}
              <div className="tabpart">
                <Link to="/add-product">
                  <div className="mainBox">
                    <div className="imgPart">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/podcast/sale.svg`}
                        alt="Add Product"
                      />
                    </div>
                    <h2>Add Product</h2>
                  </div>
                </Link>
                <Link to="/published-product">
                  <div className="mainBox">
                    <div className="imgPart">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/podcast/publish.svg`}
                        alt="Add Product"
                      />
                    </div>
                    <h2>Published</h2>
                  </div>
                </Link>
                <Link to="/unpublished-product">
                  <div className="mainBox">
                    <div className="imgPart">
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/podcast/publish.svg`}
                        alt="Add Product"
                      />
                    </div>
                    <h2>Unpublished</h2>
                  </div>
                </Link>
              </div>
              {/* My Sales Report */}
              <div className="saleReport">
                <div className="mainheading">
                  <h3>My Sales Report</h3>
                </div>
                <div className="tablePart">
                  <div
                    className="tabs scrolling"
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    {["Today", "Weekly", "Monthly", "Yearly", "Date Range"].map(
                      (tab) => (
                        <button
                          key={tab}
                          style={{
                            cursor: "pointer",
                            background:
                              activeTab === tab ? "#3F5395" : "#EEEEEE",
                            color: activeTab === tab ? "#FFFFFF" : "#9E9E9E",
                            borderRadius: "5px",
                          }}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                  <div className="conTent">
                    {activeTab === "Today" && (
                      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                        <table className="w-full border-collapse">
                          <thead className="bg-blue-50">
                            <tr>
                              {[
                                "Book Name",
                                "Unit Sold",
                                "Price",
                                "Selling Price",
                                "Earning",
                              ].map((heading) => (
                                <th
                                  key={heading}
                                  className="p-3 border border-gray-300 text-blue-600"
                                >
                                  {heading}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((product, index) => (
                              <tr
                                key={index}
                                className={
                                  index % 2 === 0 ? "bg-white" : "bg-blue-50"
                                }
                              >
                                <td className="p-3 border border-gray-300">
                                  {product.name}
                                </td>
                                <td className="p-3 border border-gray-300">
                                  {product.sold}
                                </td>
                                <td className="p-3 border border-gray-300">
                                  {product.price}
                                </td>
                                <td className="p-3 border border-gray-300">
                                  {product.selling}
                                </td>
                                <td className="p-3 border border-gray-300">
                                  {product.earning}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {activeTab === "Weekly" && (
                      <div>
                        <h3>Weekly</h3>
                      </div>
                    )}
                    {activeTab === "Monthly" && (
                      <div>
                        <h3>Monthly</h3>
                      </div>
                    )}
                    {activeTab === "Yearly" && (
                      <div>
                        <h3>Yearly</h3>
                      </div>
                    )}
                    {activeTab === "Date Range" && (
                      <Row>
                        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                          <div className="datePart">
                            <h3>Date Range</h3>
                            <RangePicker
                              onChange={(dates) => setDateRange(dates)}
                              style={{ marginTop: "10px" }}
                            />
                          </div>
                        </Col>
                      </Row>
                    )}
                  </div>
                </div>
              </div>
              {/* Product Sold*/}
              <div className="soldPart">
                <div className="productSold">
                  <h3>854</h3>
                  <h4>Total Product Sold</h4>
                  <h5>Product Sold</h5>
                </div>
                <div className="productSold">
                  <h3>₹ 20,000</h3>
                  <h4>Your Total Earning</h4>
                  <h5>Your Earning</h5>
                </div>
              </div>
              {/* Total Sale Product*/}
              <div className="totalSaleproduct">
                <div className="sale">
                  <h4>Total Sales Product</h4>
                  <div className="piePart">
                    <div className="pie-chart-container">
                      {renderPieChart(productData)}
                      <div className="legend">
                        {productData.map((item, index) => (
                          <div key={index} className="legend-item">
                            <span
                              className="legend-color"
                              style={{ backgroundColor: item.color }}
                            ></span>
                            <span className="legend-label">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sale">
                  <h4>Total Sales Citywise</h4>
                  <div className="piePart">
                    <div className="pie-chart-container">
                      {renderPieChart(cityData)}
                      <div className="legend">
                        {cityData.map((item, index) => (
                          <div key={index} className="legend-item">
                            <span
                              className="legend-color"
                              style={{ backgroundColor: item.color }}
                            ></span>
                            <span className="legend-label">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        <section className="publish-books-tab">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <ul className="nav nav-pills">
                {tabs.map((itm, i) => (
                  <li
                    className="nav-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => setTabsValue(itm.value)}
                    key={i}
                  >
                    <a
                      className={`nav-link ${
                        tabsValue === itm.value ? "active" : ""
                      } `}
                    >
                      <span className="d-block">
                        <img src={itm.img} />
                      </span>
                      {itm.name}
                    </a>
                  </li>
                ))}
              </ul>
              {tabsValue === "UN" ? (
                <div className="salesbookTab">
                  <Row gutter={16} className="mobileData">
                    {unpublisedData?.map((itm, i) => (
                      <Col
                        xs={24}
                        md={12}
                        lg={12}
                        xl={8}
                        className="gutter-row"
                        key={i}
                      >
                        <div className="bookChild">
                          <div className="imgSide">
                            <img
                              src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/publish-book/book-img1.svg"
                              width="100%"
                            />
                          </div>
                          <div className="textSide">
                            <span>
                              Book Name:<b>{itm.book_title}</b>
                            </span>
                            <span>
                              Book Price:<b>{itm.book_price}</b>
                            </span>
                            <span>
                              Status:
                              <b style={{ color: "#f15a22" }}>Under Review</b>
                            </span>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              ) : tabsValue === "P" ? (
                <div className="salesbookTab">
                  <Row gutter={16} className="mobileData">
                    {publisedData?.map((itm, i) => (
                      <Col className="gutter-row" span={12} key={i}>
                        <div className="bookChild">
                          <div className="imgSide">
                            <img
                              src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/publish-book/book-img1.svg"
                              width="100%"
                            />
                          </div>
                          <div className="textSide">
                            <span>
                              Book Name:<b>{itm.book_title}</b>
                            </span>
                            <span>
                              Book Price:<b>{itm.book_price}</b>
                            </span>
                            <span>
                              Status:<b style={{ color: "green" }}>Publised</b>
                            </span>
                          </div>
                        </div>
                      </Col>
                    ))}
                    <Col span={24}>Anuj</Col>
                  </Row>
                </div>
              ) : (
                <div className="DaysTab">
                  <div className="tabData">
                    <Radio.Group
                      size="large"
                      // onChange={(e) => setSize(e.target.value)}
                    >
                      <Radio.Button value="today" className="daybtn">
                        Today
                      </Radio.Button>
                      <Radio.Button value="weekly" className="daybtn">
                        Weekly
                      </Radio.Button>
                      <Radio.Button value="monthly" className="daybtn">
                        Monthly
                      </Radio.Button>
                      <Radio.Button value="yearly" className="daybtn">
                        Yearly
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                  <div style={{ marginTop: "40px" }}>
                    <table>
                      <tr>
                        <th>Book Name</th>
                        <th>Unit Sold</th>
                        <th>MRP</th>
                        <th>Selling Price</th>
                        <th>Earning Price</th>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td>No data found....</td>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default EbookSale;
