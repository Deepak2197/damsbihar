import { Col, Row } from "antd";
import "../../assets/css/dailycases/style.css";
import "../../assets/css/dailycases/responsive.css";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa6";
import axiosInstance from "../../API/axiosConfig";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from "dompurify";
import htmlTruncate from "html-truncate";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Dailycases = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("id") || "4";
  const [dailyCases, setDailyCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDailyCases = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.post(
        API_ENDPOINTS.COURSEACESS_HOMEPAGE.GET_DAILY_CASESE_LIST,
        { user_id: userId }
      );
      if (response.data && response.data.status === true) {
        setDailyCases(response.data.data || []);
      } else {
        throw new Error(response.data.message || "Failed to fetch daily cases");
      }
    } catch (err) {
      console.error("Error fetching daily cases:", err);
      // setError("Failed to load daily cases. Please try again.");
      // toast.error("Failed to load daily cases. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDailyCases();
  }, []);

  return (
    <section className="dailyCAses">
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className="dailyCasesSection">
            <div className="HeadingTop">
              <h2>Case of the Day</h2>
              <Link to="/dailycaseview">View all</Link>
            </div>
            <div className="dailycAsePart">
              {loading ? (
                <div className="text-center">
                  <Spin size="large" />
                </div>
              ) : error ? (
                <div className="text-center text-danger">{error}</div>
              ) : dailyCases.length === 0 ? (
                <div className="text-center">No daily cases available.</div>
              ) : (
                dailyCases.map((caseItem) => (
                  <div className="BoxSection" key={caseItem.id}>
                    <h2>{caseItem.title || "Untitled Case"}</h2>

                    <div
                      className="position-relative"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={
                          caseItem.image_video ||
                          `${window.IMG_BASE_URL}/emdpublic/dailycases/dailycase.png`
                        }
                        alt="dailycase"
                        onError={(e) =>
                          (e.target.src = `${window.IMG_BASE_URL}/emdpublic/dailycases/dailycase.png`)
                        }
                      />
                      {/* <div className="videoIcon">
                        <FaPlay />
                      </div> */}
                    </div>

                    {/* ✅ Safely render HTML content */}
                    {/* <div
                      className="descriptionContent"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(caseItem.description),
                      }}
                    ></div> */}
                    {/* <div className="descriptionContent">
                      {(() => {
                        const plainText = DOMPurify.sanitize(
                          caseItem.description,
                          { ALLOWED_TAGS: [] }
                        );
                        const shortText =
                          plainText.length > 700
                            ? plainText.substring(0, 700) + "..."
                            : plainText;
                        return shortText;
                      })()}
                    </div> */}
                    <div
                      className="descriptionContent"
                      dangerouslySetInnerHTML={{
                        __html: (() => {
                          const cleanHTML = DOMPurify.sanitize(
                            caseItem.description,
                            {
                              ALLOWED_TAGS: [
                                "b",
                                "i",
                                "em",
                                // "strong",
                                "a",
                                "p",
                                "ul",
                                "li",
                                "h1",
                                "h2",
                                "h3",
                                "img",
                                "span",
                                "div",
                              ],
                              ALLOWED_ATTR: [
                                "href",
                                "src",
                                "alt",
                                "width",
                                "height",
                              ],
                            }
                          );

                          const truncatedHTML = htmlTruncate(cleanHTML, 100, {
                            ellipsis: "...",
                          });
                          return truncatedHTML;
                        })(),
                      }}
                    ></div>

                    <div className="coMMentSec">
                      <p>
                        <span className="likeSet">
                          <img
                            src={`${window.IMG_BASE_URL}/emdpublic/dailycases/likes.svg`}
                            alt="likes"
                          />
                        </span>
                        {caseItem.likes || 0}
                      </p>
                      <p>
                        <span className="commentSet">
                          <img
                            src={`${window.IMG_BASE_URL}/emdpublic/dailycases/view.svg`}
                            alt="views"
                          />
                        </span>
                        {caseItem.views || 0}
                      </p>
                      {/* <p>{caseItem.comments || 0} comments</p> */}
                    </div>

                    <div
                      className="readMore"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("/dailycaseread", {
                          state: { item: caseItem }, // you can just pass id if preferred
                        })
                      }
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
                ))
              )}
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Dailycases;
