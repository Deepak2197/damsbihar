import React, { useEffect, useState } from "react";
import { Col, Row, Spin, Pagination } from "antd";
import { Link } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const PAGE_SIZE = 10;

const Dailycaseview = () => {
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("id") || "4";
  const [dailyCases, setDailyCases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const fetchDailyCases = async (pageNo) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.COURSEACESS_HOMEPAGE.DAILY_CASES_ALL,
        {
          user_id: userId,
          page: pageNo - 1, // Assuming API pages are zero indexed
          page_size: PAGE_SIZE, // if API supports page_size (optional)
        }
      );

      // Access cases data and total count from API response
      const fetchedCases = response.data?.data?.data || [];
      const totalPages = response.data?.data?.total_page || 0;
      const totalCount = totalPages * PAGE_SIZE; // calculate total items based on total pages

      if (response.data?.status === true) {
        setDailyCases(fetchedCases);
        setTotalItems(totalCount);
      } else {
        setDailyCases([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Failed to load daily cases", error);
      setDailyCases([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyCases(currentPage);
  }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const truncateHtml = (html, maxLength = 100) => {
    const plainText = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
    if (plainText.length <= maxLength) return html;
    return plainText.slice(0, maxLength) + "...";
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <>
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>View Daily Cases</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="ViewDailyCase">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Spin />
            </div>
          ) : dailyCases.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p>No daily cases available.</p>
            </div>
          ) : (
            <>
              <Row gutter={[16, 16]}>
                {dailyCases.map((item, index) => (
                  <Col
                    xs={24}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={8}
                    key={item.id || index}
                  >
                    <div className="boxPart">
                      <div className="casesBox">
                        <div className="topPart">
                          <div className="imgPart">
                            <img
                              src={
                                item.image_video ||
                                `${window.IMG_BASE_URL}/emdpublic/dailycases/dailycase.png`
                              }
                              alt={item.title || "case"}
                              onError={(e) => {
                                e.target.src = `${window.IMG_BASE_URL}/emdpublic/dailycases/dailycase.png`; // Fallback image on error
                              }}
                            />
                          </div>
                          <div className="textPart">
                            <h3>{item.title || "Untitled"}</h3>
                            <div className="pehrGraph">
                              {parse(truncateHtml(item.description || ""))}
                              {item.description?.length > 100 && (
                                <span
                                  className="readMore"
                                  style={{
                                    color: "#007aff",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    navigate("/dailycaseread", {
                                      state: { item }, // or just { id: item.id }
                                    })
                                  }
                                >
                                  {/* Read More */}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="bottomPart">
                          <div className="likesPart">
                            <p className="like">
                              <img
                                src={`${window.IMG_BASE_URL}/emdpublic/dailycases/likes.svg`}
                                alt="likes"
                              />{" "}
                              {item.likes || 0}
                            </p>
                            <p className="view">
                              <img
                                src={`${window.IMG_BASE_URL}/emdpublic/dailycases/view.svg`}
                                alt="views"
                              />{" "}
                              {item.views || 0}
                            </p>
                            <p>{item.total_comment || 0} comments</p>
                          </div>
                          <div
                            className="buttonPart"
                            onClick={() =>
                              navigate("/dailycaseread", {
                                state: { item }, // or just { id: item.id } if needed
                              })
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <a className="readBtn">
                              Read More{" "}
                              <img
                                src={`${window.IMG_BASE_URL}/emdpublic/dailycases/btnarrow.svg`}
                                alt=""
                              />
                            </a>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>

              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <Pagination
                  current={currentPage}
                  pageSize={PAGE_SIZE}
                  total={totalItems}
                  onChange={onPageChange}
                  showSizeChanger={false}
                  showQuickJumper
                  responsive
                />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Dailycaseview;
