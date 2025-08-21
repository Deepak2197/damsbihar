import "../../assets/css/shortcodes/shortcodes.css";
import "../../assets/css/signIn-pop/style.css";
import "../../assets/newjs/style.css";
import "../../assets/newjs/responsive.css";
import "../../assets/css/News-Article/style.css";
import "../../assets/css/News-Article/responsive.css";
import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axiosInstance from "../../API/axiosConfig";
import { FaClipboard, FaHeart, FaThumbsUp } from "react-icons/fa";
import { Spin, notification } from "antd";
import { Helmet } from "react-helmet-async";
import parse from "html-react-parser";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
import NewArticledetailSkeleton from "../../view/Newsandarticle/NewsarticleSkelton/NewArticledetails";

const NewsArticledetails = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  const { slug } = useParams();
  const articleInfo = slug.split("=", 2);
  const passedId = articleInfo[0].split("&", 2);

  const userid = sessionStorage.getItem("id")
    ? sessionStorage.getItem("id")
    : 4;
  const [newarticel, setnewart] = useState(null);

  // Begin: pop up code
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [countAdd, setCountAdd] = useState(null);
  const [isfav, setisfav] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true)
  const slugify = (title) => {
    return encodeURIComponent(title)
      .replace(/-/g, " ")
      // .replace(/ Discovery /g, " Discovery:")
      // .replace(/ Treatment /g, " Treatment:")
      .replace(/ COVID 19 /g, " COVID-19 ")
      .replace(/ Emerges2C /g, " Emerges, ")
      // .replace(/ Education%3A /g, " Education: ")
      .replace(/_/g,":");
  };

  const getCalled = async () => {
    const checkIsSlug = parseInt(slug, 10);
    if (isNaN(Number(checkIsSlug))) {
      try {
        const articleData = await axiosInstance.post(
         API_ENDPOINTS.NEWS_AND_ARTICLES.GET_ARTICLES_NEW,
          { user_id: userid, type: passedId[0] }
        );
        const selected = articleData?.data?.data?.find(
          (item) => item.title === slugify(articleInfo[1])
        );
        if (!selected) {
          try {
            const response = await axiosInstance.post(
              API_ENDPOINTS.NEWS_AND_ARTICLES.GET_ARTICLE_DETAIL,
              {
                article_id: passedId[1],
                user_id: userid,
              }
            );

            setnewart(response?.data?.data?.article);
            setLoading(false)
            if (response?.data?.data?.article?.isAi == 1) {
              setCountAdd(response?.data?.data?.article?.is_liked);
              setisfav(response?.data?.data?.article?.is_bookmarked);
              setIsLoading(false);
            } else {
              setCountAdd(response?.data?.data?.user_like);
              setisfav(response?.data?.data?.user_bookmark);
              setIsLoading(false);
            }
          } catch (error) {
            console.error("Error fetching article details:", error);
          }
        }
        const response = await axiosInstance.post(
          API_ENDPOINTS.NEWS_AND_ARTICLES.GET_ARTICLE_DETAIL,
          {
            article_id: passedId[1],
            user_id: userid,
            isAi: selected?.isAi,
            type: selected?.type,
            id: selected.id,
          }
        );
        setnewart(response?.data?.data?.article);
        setLoading(false)
        if (response?.data?.data?.article?.isAi === "1") {
          setCountAdd(response?.data?.data?.article?.is_liked);
          setisfav(response?.data?.data?.article?.is_bookmarked);
          setIsLoading(false);
        } else {
          setCountAdd(response?.data?.data?.user_like);
          setisfav(response?.data?.data?.user_bookmark);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching article details:", error);
      }
    } else {
      try {
        const articleData = await axiosInstance.post(
          API_ENDPOINTS.HOMEPAGE_INDEX.GET_HOME_NEWS_AI_NEWSARTICLE_V2,
          { user_id: userid }
        );
        const selected = articleData?.data?.data?.find(
          (item) => item.id === slug
        );
        if (!selected) {
          console.warn("Article not found with id:", slug);
          return;
        }
        const response = await axiosInstance.post(
          API_ENDPOINTS.NEWS_AND_ARTICLES.GET_ARTICLE_DETAIL,
          {
            article_id: slug,
            user_id: userid,
            isAi: selected?.isAi,
            type: selected?.type,
            id: slug,
          }
        );
        setnewart(response?.data?.data?.article);
        setLoading(false)
        if (response?.data?.data?.article?.isAi === "1") {
          setCountAdd(response?.data?.data?.article?.is_liked);
          setisfav(response?.data?.data?.article?.is_bookmarked);
          setIsLoading(false);
        } else {
          setCountAdd(response?.data?.data?.user_like);
          setisfav(response?.data?.data?.user_bookmark);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching article details:", error);
      }
    }
  };

  // End: pop up code

  useEffect(() => {
    if (slug) {
      getCalled();
    }
  }, [userid]);

  const handleLike = async (num) => {
    if (newarticel.isAi == 1) {
      await axiosInstance.post(API_ENDPOINTS.NEWS_AND_ARTICLES.LIKE_AND_BOOKMARK_STATUS, {
        user_id: userid,
        id: newarticel?.id,
        is_liked: num,
        type: newarticel?.type,
        isAi: "1",
      });
      notification.open({
        message: (
          <span>
            <FaThumbsUp style={{ marginRight: "8px" }} />
            <span>{countAdd == 0 ? "Liked" : "Disliked"}</span>
          </span>
        ),
        duration: 2,
        placement: "bottom",
        // Duration in seconds
      });
      getCalled();
    } else {
      await axiosInstance.post(API_ENDPOINTS.NEWS_AND_ARTICLES.LIKE_AND_BOOKMARK_STATUS, {
        user_id: userid,
        id: newarticel?.article_id,
        article_id: newarticel?.article_id,
        is_liked: num,
        type: newarticel?.type,
      });
      notification.open({
        message: (
          <span>
            <FaThumbsUp style={{ marginRight: "8px" }} />
            <span>{countAdd == 0 ? "Liked" : "Disliked"}</span>
          </span>
        ),
        duration: 2,
        placement: "bottom",
        // Duration in seconds
      });
      getCalled();
    }
  };

  const handleFav = async (num) => {
    if (newarticel.isAi == 1) {
      await axiosInstance.post(API_ENDPOINTS.NEWS_AND_ARTICLES.LIKE_AND_BOOKMARK_STATUS, {
        user_id: userid,
        id: newarticel?.id,
        is_bookmarked: num,
        type: newarticel?.type,
        isAi: "1",
      });
      notification.open({
        message: (
          <span>
            <FaHeart style={{ marginRight: "8px" }} />
            <span>
              {isfav == 0 ? "added to favourite" : "removed from favourite"}
            </span>
          </span>
        ),
        duration: 2,
        placement: "bottom",
        // Duration in seconds
      });
      getCalled();
    } else {
      await axiosInstance.post(API_ENDPOINTS.NEWS_AND_ARTICLES.LIKE_AND_BOOKMARK_STATUS, {
        user_id: userid,
        id: newarticel?.article_id,
        article_id: newarticel?.article_id,
        is_bookmarked: num,
        type: newarticel?.type,
      });
      notification.open({
        message: (
          <span>
            <FaHeart style={{ marginRight: "8px" }} />
            <span>
              {isfav == 0 ? "added to favourite" : "removed from favourite"}
            </span>
          </span>
        ),
        duration: 2,
        placement: "bottom",
        // Duration in seconds
      });
      getCalled();
    }
  };

  const HandleShare = () => {
    const textToCopy = `${location.origin}/news-article/${slug}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        notification.open({
          message: (
            <span>
              <FaClipboard style={{ marginRight: "8px" }} />
              <span>Link copied to clipboard!</span>
            </span>
          ),
          duration: 2,
          placement: "bottom",
          // Duration in seconds
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
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

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "instant",
  //   });
  // }, []);

  const meta_description = newarticel?.meta_description;
  const meta_keywords = newarticel?.meta_keywords;
  const meta_title = newarticel?.meta_title;
  const meta_image = newarticel?.image;

  return (
    <div className="NewsArticle">
      <Helmet>
        {/* Basic SEO tags */}
        <title>{meta_title}</title>
        <meta name="description" content={meta_description} />
        <meta name="keywords" content={meta_keywords} />

        {/* Open Graph tags for product sharing */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={meta_title} />
        <meta property="og:description" content={meta_description} />
        <meta
          property="og:url"
          content={`https://damsdelhi.com/news-article/${slug}`}
        />
        <meta property="og:image" content={meta_image} />
        <meta property="og:site_name" content="DAMS" />
      </Helmet>

      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>{newarticel?.type}</li>
            </ul>
          </div>
        </div>
      </div>

    {loading?(<NewArticledetailSkeleton/>):(
      <div className="article-full">
        <div className="container">
          <div className="sectionBorder">
            <div className="row">
              <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                <h1>{newarticel?.title}</h1>
              </div>

              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="articles-share-group">
                  <ul>
                    <p id="p1" style={{ display: "none" }}>
                      news-and-article/375
                    </p>

                    <li>
                      <Link to={"#"} className="reed" onClick={HandleShare}>
                        <em className="fa fa-share"></em> Share
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"#"}
                        className="reed"
                        onClick={() => handleLike(countAdd == 0 ? 0 : 1)}
                      >
                        {countAdd == 1 ? (
                          <span>
                            <FaThumbsUp color="#007aff" /> Liked
                          </span>
                        ) : (
                          <span>
                            <FaThumbsUp /> Like
                          </span>
                        )}
                      </Link>
                    </li>
                    <span style={{ display: "none" }} id="book">
                      375
                    </span>
                    <li>
                      <Link
                        to={"#"}
                        className="reed"
                        onClick={() => handleFav(isfav == 0 ? 0 : 1)}
                      >
                        {" "}
                        {isfav == 1 ? <FaHeart color="red" /> : <FaHeart />}
                        &nbsp; Favourite
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-3 col-6">
                <div className="article-views-group">
                  {/* <img
                    src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/News-Article/total-view.png"
                    loading="lazy" alt="img-1"
                  /> */}
                  <h5>
                    {newarticel?.views}
                    <h6>
                      <span>Total Views</span>
                    </h6>
                  </h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-6">
                <div className="article-views-group">
                  {/* <img
                    className="bg1"
                    src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/News-Article/total-like.png"
                    loading="lazy" alt="img-1"
                  /> */}
                  <h5>
                    {newarticel?.likes}
                    <h6>
                      <span>Total Likes</span>
                    </h6>
                  </h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-6">
                <div className="article-views-group">
                  {/* <img
                    className="bg2"
                    src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/News-Article/publish_by.png"
                    loading="lazy" alt="img-1"
                  /> */}
                  <h5>
                    {newarticel?.created_by || `cortexAi`}
                    <h6>
                      <span>Published By</span>
                    </h6>
                  </h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-6">
                <div className="article-views-group">
                  {/* <img
                    className="bg3"
                    src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/News-Article/publish-on.png"
                    loading="lazy" alt="img-1"
                  /> */}
                  <h5>
                    {formatSecondsToDate(Number(newarticel?.creation_date))}
                    <h6>
                      {" "}
                      <span> published on </span>
                    </h6>
                  </h5>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-lg-12 col-12">
                {isLoading ? (
                  <Spin
                    size="large"
                    tip="Loading..."
                    style={{ width: "100%" }}
                  />
                ) : (
                  <>
                    {newarticel.isAi === "2" ? (
                      <>
                        <div className="article-pehragraph">
                          <h2>summary</h2>
                          <div>{parse(newarticel?.small_content)}</div>
                        </div>
                        <div className="article-pehragraph">
                          <h2>description</h2>
                          <div>{parse(newarticel?.content)}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <>
                          <div className="article-pehragraph">
                            <h2>Summary</h2>
                            <div>{parse(newarticel?.description)}</div>
                            <figure className="image">
                              {/* <img src={newarticel?.image} /> */}
                            </figure>
                          </div>
                          <div className="article-pehragraph">
                            <h2>Description</h2>
                            <div>{parse(newarticel?.news_content)}</div>
                            <figure className="image">
                              {/* <img src={newarticel?.image} /> */}
                            </figure>
                          </div>
                        </>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
      {/* Begin: Model Code  */}
      <Modal show={show} onHide={handleClose} className="articlemsg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="content">
          <p>
            damsdelhi.com says
            <br />
            copyed Url
          </p>
          <button
            className="btn bg-primary text-white float-right"
            onClick={NewsArticledetails}
          >
            OK
          </button>
        </Modal.Body>
      </Modal>
      <Modal show={show1} onHide={handleClose1} className="articlemsg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="content">
          <div className="text-center">
            <img
              src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/login_logo.png"
              loading="lazy"
              alt="icon image"
            />
            <p className="tectbg">THIS FEATURE IS AVAILABLE FOR APP ONLY</p>
          </div>

          <div className="app-imgBg text-center">
            <Link
              target="_blank"
              to={"https://itunes.apple.com/us/app/emedicoz/id1263112084?mt=8"}
            >
              {" "}
              <img
                src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/newjs/img/about/77-layersand.png"
                loading="lazy"
                alt="icon image"
              />
            </Link>
            <Link
              target="_blank"
              to={
                "https://play.google.com/store/apps/details?id=com.emedicoz.app&amp;hl=en"
              }
            >
              {" "}
              <img
                src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/newjs/img/about/77-layers.png"
                loading="lazy"
                alt="icon image"
              />
            </Link>
          </div>
        </Modal.Body>
      </Modal>
      {/* End: Model Code  */}
    </div>
  );
};

export default NewsArticledetails;
