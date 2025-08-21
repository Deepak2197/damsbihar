import React from "react";
import { Col, Row } from "antd";
import "../../assets/css/publish-book/style.css";

const PublishProductViewDetail = () => {
  const products = [
    {
      name: "Amit",
      date: "11-03-2024",
      phone: "9876543210",
      qty: "1",
      price: "₹ 200",
    },
    {
      name: "Amit Kumar",
      date: "11-03-2024",
      phone: "9876543210",
      qty: "1",
      price: "₹ 200",
    },
    {
      name: "Sumit Jain",
      date: "11-03-2024",
      phone: "9876543210",
      qty: "1",
      price: "₹ 200",
    },
    {
      name: "Anita garg",
      date: "11-03-2024",
      phone: "9876543210",
      qty: "1",
      price: "₹ 200",
    },
  ];
  return (
    <div>
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>Anatomy</li>
              <li>View Detail</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <section className="myProductSales productViewDetail">
          <Row>
            <Col md={24}>
              {/* View Details*/}
              {/* Product Sold*/}
              <div className="soldPart">
                <div className="productSold">
                  <h3>40</h3>
                  <h4>Total Sold</h4>
                  <h5>Anatomy Sold</h5>
                </div>
                <div className="productSold">
                  <h3>₹ 20,000</h3>
                  <h4>Your Total Earning</h4>
                  <h5>Your Earning</h5>
                </div>
              </div>

              <div
                className="tableSec"
                style={{ overflowX: "auto", whiteSpace: "nowrap" }}
              >
                <table className="w-full border-collapse">
                  <thead className="bg-blue-50">
                    <tr>
                      {["Name", "Date", "Phone", "Qty", "Price"].map(
                        (heading) => (
                          <th
                            key={heading}
                            className="p-3 border border-gray-300 text-blue-600"
                          >
                            {heading}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                      >
                        <td className="p-3 border border-gray-300">
                          {product.name}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {product.date}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {product.phone}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {product.qty}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {product.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </section>
      </div>
    </div>
  );
};

export default PublishProductViewDetail;
