import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const LatestNewsArticles = ({ newzData, title, breadValue }) => {
  const userId = sessionStorage.getItem("id") || "4";
  const [selectid, setselectid] = useState(null);
  const navigate = useNavigate();
  const NewsArticle = (id) => {
    // localStorage.setItem("LatestNewsArticlesid", id);
    navigate("/news-article");
  };
  const formatSecondsToDate = (seconds) => {
    if (seconds) {
      // Create a new Date object using the seconds
      const date = new Date(Number(seconds));

      // Define options for formatting the date
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      // Format the date
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );

      // Return the formatted date string
      return formattedDate;
    }
  };
  const [articles, setArticles] = useState([]);
  const [articleLikedId,setArticleLikedId] = useState("");
  const [loading,setLoading]=useState(false)
  const [filteredData,setFilterData] = useState(null)

    const getArticles = async () => {
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.HOMEPAGE_INDEX.GET_HOME_NEWS_AI_NEWSARTICLE_V2,
        { user_id: userId }
      );
      setArticles(res?.data?.data.filter((item) => item.type === "articles"));
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  }

  const handleLike = async (aid, type, status) => {
      // Optimistic UI update
      setArticles((prev) =>
        prev.map((article) =>
          article.id === aid
            ? { ...article, is_liked: status === 1 ? 0 : 1 }
            : article
        )
      );

      // API call
      try {
        await axiosInstance.post(
          API_ENDPOINTS.NEWS_AND_ARTICLES.LIKE_AND_BOOKMARK_STATUS,
          {
            user_id: userId,
            article_id: aid,
            is_liked: status === 1 ? "0" : "1",
            type,
          }
        );
      } catch (err) {
        console.error("Like error:", err);
        // Revert on error
        setArticles((prev) =>
          prev.map((article) =>
            article.id === aid ? { ...article, is_liked: status } : article
          )
        );
      }
    }

  const handleFav = async (aid, type, status) => {
      // Optimistic UI update
      setArticles((prev) =>
        prev.map((article) =>
          article.id === aid
            ? { ...article, is_bookmarked: status === 1 ? 0 : 1 }
            : article
        )
      );

      // API call
      try {
        await axiosInstance.post(
          API_ENDPOINTS.NEWS_AND_ARTICLES.LIKE_AND_BOOKMARK_STATUS,
          {
            user_id: userId,
            article_id: aid,
            is_bookmarked: status === 1 ? 0 : 1,
            type,
          }
        );
      } catch (err) {
        console.error("Fav error:", err);
        // Revert on error
        setArticles((prev) =>
          prev.map((article) =>
            article.id === aid
              ? { ...article, is_bookmarked: status }
              : article
          )
        );
      }
    }

  useEffect(()=>{
    getArticles();
  },[])



  const slugify = (title) => {
    return encodeURIComponent(title)
      .replace(/%20/g, "-") // spaces → dashes
      .replace(/%3A/g, "-") // colon → dash
      .replace(/%26/g, "and") // & → and
      .replace(/%27/g, "") // apostrophe → remove
      .replace(/%2F/g, "-") // slash → dash (optional)
      .replace(/%/g, ""); // final safety net
  };
  return (
    <section
      className={`latest_news homeletestNews ${
        userId === "4" ? "homeletestNews1" : ""
      } position-relative bodredius`}
    >
      <div className="container staticcontainer">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div
              className="globe_heading"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h2 className="font-weight-bold newcolrHeading">Articles</h2>
              <span
                className="seeAll newseebtn"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/articles`)}
              >
                See all
              </span>
            </div>
          </div>
        </div>
        <div className="articalolDSet">
          {articles?.map((resullt) => (
            <div key={resullt.id}>
              {resullt?.isAi == 2 ? (
                <div
                  className="newsBoxSet"
                >
                  <div className="newsPics ">
                    <img
                      src={
                        resullt?.image == null ? "/news.png" : resullt?.image
                      }
                      loading="lazy"
                      alt="img"
                      onClick={() => {
                        if (resullt.slug != undefined) {
                          navigate(`/article-news/${resullt.slug}`);
                        } else {
                          navigate(
                            `/news-article/articles=${slugify(resullt.title)}`
                          );
                        }
                      }}
                    />
                  </div>
                  <div
                    className="article-img  position-relative"
                    style={{ cursor: "pointer" }}
                  >
                    <a>
                      <h4
                      onClick={() => {
                        if (resullt.slug != undefined) {
                          navigate(`/article-news/${resullt.slug}`);
                        } else {
                          navigate(
                            `/news-article/articles=${slugify(resullt.title)}`
                          );
                        }
                      }}
                      >{resullt?.title}</h4>
                    </a>
                    <p
                    onClick={() => {
                      if (resullt.slug != undefined) {
                        navigate(`/article-news/${resullt.slug}`);
                      } else {
                        navigate(
                          `/news-article/articles=${slugify(resullt.title)}`
                        );
                      }
                    }}
                    >{resullt?.small_content}</p>
                    <div className="datePart">
                      <div className="dateSec">
                        <p>{formatSecondsToDate(resullt?.creation_date)}</p>
                      </div>
                      <div className="imgSec">
                        <ul>
                          <li>
                            <img
                              src={
                                resullt.is_liked == 1 ? 
                                 `${window.IMG_BASE_URL}/emdpublic/dailycases/likes.svg`:
                                 `${window.IMG_BASE_URL}/emdpublic/dailycases/like.svg`                            
                              }
                              alt="likes"
                              style={{ marginRight: "5px" }}
                              onClick={() =>{
                                handleLike(
                                  resullt?.id,
                                  resullt?.type,
                                  resullt?.is_liked
                                )

                              }
                              }
                            />
                          </li>
                          <li>
                            {resullt?.is_bookmarked == 0 ? (
                              <FaRegHeart color="gray" size={20}
                              onClick={() =>
                                handleFav(
                                  resullt?.id,
                                  resullt?.type,
                                  resullt?.is_bookmarked
                                )
                              }
                               />
                            ) : (
                              
                                <FaHeart color="#FF1E1E" size={20} 
                                onClick={() =>
                                  handleFav(
                                    resullt?.id,
                                    resullt?.type,
                                    resullt?.is_bookmarked
                                  )
                                }
                                />
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="newsBoxSet"
                  key={resullt.id}
                  onClick={() => {
                    if (resullt?.slug != undefined) {
                      navigate(`/article-news/${resullt?.slug}`);
                    } else {
                      navigate(
                        `/news-article/articles=${encodeURIComponent(
                          resullt?.title
                        ).replaceAll("%20", "-")}`
                      );
                    }
                  }}
                >
                  <div className="newsPics ">
                    <img
                      src={
                        resullt?.image == null ? "/news.png" : resullt?.image
                      }
                      loading="lazy"
                      alt="img"
                    />
                  </div>
                  <div
                    className="article-img  position-relative"
                    style={{ cursor: "pointer" }}
                  >
                    <a>
                      <h4>{resullt?.title}</h4>
                    </a>
                    <p>{resullt?.description}</p>
                    <div className="datePart">
                      <div className="dateSec">
                        <p>{formatSecondsToDate(resullt?.creation_date)}</p>
                      </div>
                      <div className="imgSec">
                        <ul>
                          <li className="thumb">
                            <img
                              src={
                                resullt?.is_liked == 1
                                  ? `${window.IMG_BASE_URL}/emdpublic/dailycases/likes.svg`
                                  : `${window.IMG_BASE_URL}/emdpublic/dailycases/like.svg `
                              }
                              alt="likes"
                              style={{ marginRight: "5px" }}
                            />
                          </li>
                          <li className="heart">
                            {resullt?.is_bookmarked == 0 ? (
                              <FaHeart color="gray" size={20} />
                            ) : (
                              <span>
                                <FaHeart color="#FF1E1E" size={20} />
                                &nbsp;
                              </span>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default LatestNewsArticles;
