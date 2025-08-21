import React from "react";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";

const UnpublishedProduct = () => {
  return (
    <div>
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>Unpublished Product</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="publishProduct">
          <Row>
            <Col md={24}>
              {/* Tabbing*/}
              <div className="heading">
                <h1>Unpublished Product</h1>
              </div>
              <div className="productSection">
                <div className="productPart">
                  <div className="picPart">
                    <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/publish-book/book-img1.svg" />
                  </div>
                  <div className="textPart">
                    <h3>
                      <span>Product Name:</span> Anatomy
                    </h3>
                    <h3>
                      <span>Product Price:</span> ₹ 200
                    </h3>
                    <h3>
                      <span>Published Date:</span> April 3rd 2025
                    </h3>
                    <h3>
                      <span>Status:</span>{" "}
                      <Link className="review">Under Review</Link>
                    </h3>
                    <Link
                      to="/publishproduct-viewdetail"
                      className="btn detail"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="productPart">
                  <div className="picPart">
                    <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/publish-book/book-img1.svg" />
                  </div>
                  <div className="textPart">
                    <h3>
                      <span>Product Name:</span> Anatomy
                    </h3>
                    <h3>
                      <span>Product Price:</span> ₹ 200
                    </h3>
                    <h3>
                      <span>Published Date:</span> April 3rd 2025
                    </h3>
                    <h3>
                      <span>Status:</span> Can not be published
                    </h3>
                    <p>STETHOSCOP not appropriate</p>
                    <Link
                      to="/publishproduct-viewdetail"
                      className="btn detail"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="productPart">
                  <div className="picPart">
                    <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/publish-book/book-img1.svg" />
                  </div>
                  <div className="textPart">
                    <h3>
                      <span>Product Name:</span> Anatomy
                    </h3>
                    <h3>
                      <span>Product Price:</span> ₹ 200
                    </h3>
                    <h3>
                      <span>Published Date:</span> April 3rd 2025
                    </h3>
                    <h3>
                      <span>Status:</span>{" "}
                      <Link to="/sign-agreement" className="sign">
                        Sign Agreement
                      </Link>
                    </h3>
                    <Link
                      to="/publishproduct-viewdetail"
                      className="btn detail"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="productPart">
                  <div className="picPart">
                    <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/publish-book/book-img1.svg" />
                  </div>
                  <div className="textPart">
                    <h3>
                      <span>Product Name:</span> Anatomy
                    </h3>
                    <h3>
                      <span>Product Price:</span> ₹ 200
                    </h3>
                    <h3>
                      <span>Published Date:</span> April 3rd 2025
                    </h3>
                    <h3>
                      <span>Status:</span>{" "}
                      <Link className="review">Under Review</Link>
                    </h3>
                    <Link
                      to="/publishproduct-viewdetail"
                      className="btn detail"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="productPart">
                  <div className="picPart">
                    <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/publish-book/book-img1.svg" />
                  </div>
                  <div className="textPart">
                    <h3>
                      <span>Product Name:</span> Anatomy
                    </h3>
                    <h3>
                      <span>Product Price:</span> ₹ 200
                    </h3>
                    <h3>
                      <span>Published Date:</span> April 3rd 2025
                    </h3>
                    <h3>
                      <span>Status:</span>{" "}
                      <Link className="review">Under Review</Link>
                    </h3>
                    <Link
                      to="/publishproduct-viewdetail"
                      className="btn detail"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </section>
      </div>
    </div>
  );
};

export default UnpublishedProduct;
