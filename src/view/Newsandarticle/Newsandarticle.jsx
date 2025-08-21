import "../../assets/css/News-Article/responsive.css";
import "../../assets/css/News-Article/style.css";
import "../../assets/css/shortcodes/shortcodes.css";
import "../../assets/new_design/css/style.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaBookmark, FaHeart, FaThumbsUp, FaFilter } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
import NewArticledetailSkeleton from "./NewsarticleSkelton/NewArticledetails";

import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

import { Button, Image, Spinner } from "react-bootstrap";
import axiosInstance from "../../API/axiosConfig";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";

const Newsandarticle = ({ title }) => {
  const paras = useParams(title);
  const containerRef = useRef(null);

  const navigate = useNavigate();
  const [NewsArticle, setNewsArticle] = useState([]);
  const [NewsArticleWeb, setNewsArticleweb] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [activeTile, setActiveTile] = useState(0);
  const [activeTopic, setActiveTopic] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // const [filterData, setFilterData] = useState([]);
  const [Search, setSearch] = useState("");
  const userid = sessionStorage.getItem("id")
    ? sessionStorage.getItem("id")
    : 4;
  const fetchData = async () => {
    try {
      if (paras.title === "Articles") {
        const response = await axiosInstance.post(
          API_ENDPOINTS.NEWS_AND_ARTICLES.CAT_LIST,
          { user_id: userid }
        );
        setNewsArticle(response.data.data);
        setLoading(false)
      } else {
        const response = await axiosInstance.post(
          API_ENDPOINTS.NEWS_AND_ARTICLES.TAG_LIST,
          { user_id: userid }
        );
        setNewsArticle(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const NewsArticleweb = async () => {
    try {
      const response = await axiosInstance.post(
      
      API_ENDPOINTS.NEWS_AND_ARTICLES.GET_ARTICLES_NEW,
        { user_id: userid, type: paras.title.toLowerCase() }
      );
      if (response.status) {
        setLoading(false);
      }
      setNewsArticleweb(response.data.data);
      setLoading(false)
      const ContentData = response.data.data;
      const Title = paras.title.toLowerCase();
      const FilteredData = ContentData.filter((item) => item.type === Title);
      setfilterdata(FilteredData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
    NewsArticleweb();
    // console.log("yty", NewsArticleWeb);
  }, []);

  const handleLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 400; // Adjust the scroll amount as needed
    }
  };

  const handleRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 400; // Adjust the scroll amount as needed
    }
  };

  const handlecat = async (data, index) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.NEWS_AND_ARTICLES.GET_ARTICLE_BY_TAG_ID,
      {
        type: paras.title.toLowerCase(),
        type_id: data,
        user_id: userid,
      }
    );

    setfilterdata(response?.data?.data);

    setActiveTile(index);
  };
  const handleAll = () => {
    setfilterdata(NewsArticleWeb);
    setActiveTile(0);
    // console.log("asadsfew",NewsArticleWeb);
    // console.log("asas",filterdata);
  };

  const filterData = () => {
    const data = NewsArticleWeb.filter((itm) =>
      itm.title.toLowerCase().includes(Search.toLowerCase())
    );
    setfilterdata(data);
  };

  // Function to handle input change for search
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    filterData(); // Call filterData whenever search input changes
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const totalPages = Math.ceil(filterdata.length / 10);

  // Calculate the index of the first and last items to display on the current page
  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, filterdata.length);

  // Get the current page's data
  const currentItems = filterdata.slice(startIndex, endIndex);

  // Handle pagination button click to change the current page
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // console.log(currentItems);

  function formatSecondsToDate(seconds) {
    // Create a new Date object using the seconds
    const date = new Date(Number(seconds));

    // Define options for formatting the date
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    // Format the date
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    // Return the formatted date string
    return formattedDate;
  }

  const handleLike = async (aid, type, status) => {
    if (status == 0) {
      const res = await axiosInstance.post(
        API_ENDPOINTS.NEWS_AND_ARTICLES.LIKE_AND_BOOKMARK_STATUS,
        { user_id: userid, article_id: aid, is_liked: "0", type: type }
      );
      fetchData();
      NewsArticleweb();
    } else {
      const res = await axiosInstance.post(
       API_ENDPOINTS.NEWS_AND_ARTICLES.LIKE_AND_BOOKMARK_STATUS,
        { user_id: userid, article_id: aid, is_liked: "1", type: type }
      );
      fetchData();
      NewsArticleweb();
    }
  };

  const handleFav = async (aid, type, status) => {
    if (status == 0) {
      const res = await axiosInstance.post(
       API_ENDPOINTS.NEWS_AND_ARTICLES.LIKE_AND_BOOKMARK_STATUS,
        { user_id: userid, article_id: aid, is_bookmarked: 0, type: type }
      );
      fetchData();
      NewsArticleweb();
    } else {
      const res = await axiosInstance.post(
       API_ENDPOINTS.NEWS_AND_ARTICLES.LIKE_AND_BOOKMARK_STATUS,
        { user_id: userid, article_id: aid, is_bookmarked: 1, type: type }
      );
      fetchData();
      NewsArticleweb();
    }
  };

  {
    /* filter Button*/
  }

  const [filterType, setFilterType] = useState(null);
  const [filterLabel, setFilterLabel] = useState("");

  const applyFilter = (type) => {
    setFilterType(type);
    let filtered = [...NewsArticleWeb];

    if (type === "fav") {
      filtered = NewsArticleWeb.filter((item) => item.is_bookmarked == true);
      setFilterLabel("My Favorite");
    } else if (type === "liked") {
      filtered = NewsArticleWeb.sort((a, b) => b.likes - a.likes);
      setFilterLabel("Most Liked");
    } else if (type === "date") {
      filtered = NewsArticleWeb.sort(
        (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
      );
      setFilterLabel("By Date");
    } else {
      setFilterLabel("");
    }

    setfilterdata(filtered);
  };
  {
    /*date selector*/
  }
  const [dateRange, setDateRange] = useState(null);

  const handleDateSearch = () => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      const [start, end] = dateRange;

      const filtered = NewsArticleWeb.filter((item) => {
        const itemDate = dayjs(Number(item.creation_date)); // Convert timestamp to Dayjs

        return (
          (itemDate.isAfter(start, "day") || itemDate.isSame(start, "day")) &&
          (itemDate.isBefore(end, "day") || itemDate.isSame(end, "day"))
        );
      });

      setfilterdata(filtered);
      setFilterLabel(
        `From ${start.format("DD MMM")} to ${end.format("DD MMM")}`
      );
      console.log(filtered);
    }
  };

  const [isFilterOn, setisFilterOn] = useState(false);

  const slugify = (title) => {
   
    return encodeURIComponent(title)
    .replace(/%20/g, '-')       // spaces → dashes
    .replace(/%3A/g, '-')       // colon → dash
    .replace(/%26/g, 'and')     // & → and
    .replace(/%27/g, '')        // apostrophe → remove
    .replace(/%2F/g, '-')       // slash → dash (optional)
    .replace(/%/g, '')          // final safety net
   
};


  return (
    <div className="Newsarticle">
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <ul className="list-inline">
                <li>
                  <a href={"/"}>Home</a>
                </li>
                <li>{paras.title}</li>
              </ul>
            </div>
          </div>
          {loading?(<NewArticledetailSkeleton/>):(
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="search-box">
                <div className="form-group has-search position-relative">
                  <span className="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    className="form-control searchTheKey"
                    id="searchTheKey"
                    placeholder="search articles and news"
                    value={Search}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
        <div className="news-full">
          <div className="container">
            <div className="news-artcile-area">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="tab-content mt-3" id="matchKey">
                    <div id="news" className="tab-pane active">
                      <div className="like-author-area">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="latest-tab">
                              <div className="col">
                                <div className="owl-item cloned" style={{display:"flex"}} >
                                  {/* Filter Button Added */}
                                  <FaFilter
                                    style={{ cursor: "pointer"}}
                                    onClick={() => {
                                      isFilterOn
                                        ? setisFilterOn(false)
                                        : setisFilterOn(true);
                                    }}
                                  />
                                  {isFilterOn ? (
                                    <>
                                      <div>
                                      <div style={{ display: 'flex', gap: '20px', padding: '10px 0' }}>
  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
    <input
      type="radio"
      name="filter"
      value="liked"
      checked={filterType === "liked"}
      onChange={() => applyFilter("liked")}
      style={{ cursor: 'pointer' }}
    />
    Most Liked
  </label>

  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
    <input
      type="radio"
      name="filter"
      value="fav"
      checked={filterType === "fav"}
      onChange={() => applyFilter("fav")}
      style={{ cursor: 'pointer' }}
    />
    My Favorite
  </label>

  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
    <input
      type="radio"
      name="filter"
      value="date"
      checked={filterType === "date"}
      onChange={() => applyFilter("date")}
      style={{ cursor: 'pointer' }}
    />
    By Date
  </label>
</div>
                                      </div>
                                      {filterType === "date" && (
                                        <div style={{ display: "flex" }}>
                                          <RangePicker
                                            onChange={(value) =>
                                              setDateRange(value)
                                            }
                                            style={{
                                              display: "flex",
                                              width: "50%",
                                              margin: "5px 2px",
                                            }}
                                            disabledDate={(current) => current && current > dayjs().endOf('day')}
                                          />
                                          <button
                                            className="btn btn-primary"
                                            style={{ margin: "5px 2px" }}
                                            onClick={handleDateSearch}
                                          >
                                            Search
                                          </button>
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className="bbb_viewed_title_container">
                                  <div className="bbb_viewed_nav_container">
                                    <div className="bbb_viewed_nav bbb_viewed_prev">
                                      <i
                                        className="fa fa-chevron-left"
                                        onClick={handleLeft}
                                      ></i>
                                    </div>
                                    <div className="bbb_viewed_nav bbb_viewed_next">
                                      <i
                                        className="fa fa-chevron-right"
                                        onClick={handleRight}
                                      ></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="bbb_viewed_slider_container">
                                  <ul className="nav nav-tabs owl-carousel owl-theme bbb_viewed_slider owl-loaded owl-drag">
                                    <div className="owl-stage-outer">
                                      <div
                                        className="owl-stage"
                                        ref={containerRef}
                                      >
                                        <div
                                          className="owl-item cloned"
                                          onClick={handleAll}
                                        >
                                          <li
                                            className={`owl-item tag ${
                                              activeTile === 0 ? "active" : ""
                                            }`}
                                          >
                                            <a
                                              data-toggle="tab"
                                              href="#latestall"
                                            >
                                              {/* <img
                                                src="https://dams-apps-production.s3.ap-south-1.amazonaws.com/course_file_meta/4805616notif-c.png"
                                                alt="img-1"
                                              /> */}
                                              <span className="d-block">
                                                All
                                              </span>
                                            </a>
                                          </li>
                                        </div>
                                        {NewsArticle?.map((item, index) => (
                                          <div
                                            className="owl-item cloned"
                                            onClick={() =>
                                              handlecat(item.id, index + 1)
                                            }
                                          >
                                            <li
                                              className={`owl-item tag ${
                                                activeTile === index + 1
                                                  ? "active"
                                                  : ""
                                              }`}
                                            >
                                              <a
                                                data-toggle="tab"
                                                href="#latest16"
                                              >
                                                {/* <img
                                                  src={
                                                    item.image ===
                                                    "Not Selected"
                                                      ? "https://dams-apps-production.s3.ap-south-1.amazonaws.com/course_file_meta/4805616notif-c.png"
                                                      : item.image
                                                  }
                                                  alt="img-1"
                                                /> */}
                                                <span className="d-block">
                                                  {item.text}
                                                </span>
                                              </a>
                                            </li>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="owl-nav disabled">
                                      <div className="owl-prev">prev </div>
                                      <div className="owl-next">next </div>
                                    </div>
                                    <div className="owl-dots disabled"></div>
                                  </ul>
                                </div>
                              </div>
                              <div className="tab-content">
                                <div
                                  id="latestall"
                                  className="tab-pane fade  active show"
                                >
                                  <div className="row">
                                    {!loading ? (
                                      currentItems.length != 0 ? (
                                        currentItems?.map((items) => (
                                          <div className="col-12 col-md-6 col-sm-6 col-lg-6 col-xl-3">
                                            <a
                                              style={{
                                                color: "#3b3b3c",
                                                cursor: "pointer",
                                              }}
                                            >
                                              <div className="setOftoP">
                                                <div className="row">
                                                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="imgPart">
                                                      <a
                                                        style={{
                                                          cursor: "pointer",
                                                        }}
                                                      >
                                                        <div
                                                          className="publish-img position-relative"
                                                          onClick={() =>
  navigate(
    `/news-article/${paras.title}&${items.id}=${slugify(items.title)}`
  )
}

                                                        >
                                                          <img
                                                            src={
                                                              items.image ==
                                                              null
                                                                ? "/news.png"
                                                                : items.image
                                                            }
                                                            alt="img-1"
                                                            className="thumbimg"
                                                          />
                                                        </div>
                                                      </a>
                                                    </div>
                                                    <div className="title-des">
                                                      <h2
                                                        onClick={() =>
  navigate(
    `/news-article/${paras.title}&${items.id}=${slugify(items.title)}`
  )
}

                                                      >
                                                        {items.title}
                                                      </h2>
                                                      <p
                                                        onClick={() =>
  navigate(
    `/news-article/${paras.title}&${items.id}=${slugify(items.title)}`
  )
}

                                                      >
                                                        {items.small_content}
                                                      </p>
                                                      <div className="row">
                                                        <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                                                          <div className="publish">
                                                            <ul>
                                                              <li className="orngText">
                                                                {/* <img
                                                              src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/News-Article/publish.png"
                                                              alt="img-1"
                                                              style={{width:'25px'}}
                                                              />{" "} */}
                                                                Published By:{" "}
                                                                {items.isAi == 1
                                                                  ? "Cortex Ai"
                                                                  : "Dams publication"}
                                                              </li>

                                                              <li>
                                                                <li>
                                                                  {formatSecondsToDate(
                                                                    items.creation_date
                                                                  )}
                                                                </li>
                                                                {/* <img
                                                              src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/News-Article/date.png"
                                                              alt="img-1"
                                                              style={{width:'25px'}}
                                                              />
                                                              {formatSecondsToDate(
                                                              Number(
                                                              items?.creation_date
                                                              )
                                                              )} */}
                                                              </li>

                                                              {/* <li onClick={()=>handleFav(items?.id,items?.type,items?.is_bookmarked)}>
                                                              {items?.is_bookmarked==0?<FaHeart color="gray" size={20}/>:<span>
                                                              <FaHeart color="black"  size={20}/>
                                                              &nbsp; 
                                                              </span>}
                                                            </li> */}
                                                            </ul>
                                                          </div>
                                                        </div>
                                                        <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                                          <div className="time-date">
                                                            <ul>
                                                              {/* <li>
                                                              <img
                                                              src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/News-Article/views.png"
                                                              alt="img-1"
                                                              style={{width:'25px'}}
                                                              />
                                                             
                                                            </li> */}
                                                              <li
                                                                onClick={() =>
                                                                  handleLike(
                                                                    items?.id,
                                                                    items?.type,
                                                                    items?.is_liked
                                                                  )
                                                                }
                                                              >
                                                                <span>
                                                                  {/* {items?.is_liked!=0?<FaThumbsUp color="black" size={20}/>:<FaThumbsUp size={20} color="gray"/>} */}
                                                                  <span className="textRight">
                                                                    {
                                                                      items.likes
                                                                    }{" "}
                                                                    likes
                                                                  </span>{" "}
                                                                  {items.views}{" "}
                                                                  views
                                                                </span>
                                                              </li>
                                                              <div className="setLi">
                                                                <li
                                                                  onClick={() =>
                                                                    handleLike(
                                                                      items?.id,
                                                                      items?.type,
                                                                      items?.is_liked
                                                                    )
                                                                  }
                                                                >
                                                                  {items?.is_liked !=
                                                                  0 ? (
                                                                    <FaThumbsUp
                                                                      color="#007aff"
                                                                      size={20}
                                                                    />
                                                                  ) : (
                                                                    <FaThumbsUp
                                                                      size={20}
                                                                      color="gray"
                                                                    />
                                                                  )}
                                                                  <span>
                                                                    {/* {items.likes}  */}
                                                                  </span>
                                                                </li>
                                                                <li
                                                                  onClick={() =>
                                                                    handleFav(
                                                                      items?.id,
                                                                      items?.type,
                                                                      items?.is_bookmarked
                                                                    )
                                                                  }
                                                                >
                                                                  {items?.is_bookmarked ==
                                                                  0 ? (
                                                                    <FaHeart
                                                                      color="gray"
                                                                      size={20}
                                                                    />
                                                                  ) : (
                                                                    <span>
                                                                      <FaHeart
                                                                        color="#FF1E1E"
                                                                        size={
                                                                          20
                                                                        }
                                                                      />
                                                                      &nbsp;
                                                                    </span>
                                                                  )}
                                                                </li>
                                                              </div>
                                                            </ul>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </a>
                                          </div>
                                        ))
                                      ) : (
                                        <div
                                          style={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Image
                                            className="imgnotFonud"
                                            src="https://i.ibb.co/TkRCGdR/file-issue1.png"
                                          />
                                          <h2>No data found!</h2>
                                        </div>
                                      )
                                    ) : (
                                      <div
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Spinner
                                          animation="border"
                                          role="status"
                                          style={{
                                            height: "50px",
                                            width: "50px",
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {currentItems.length != 0 ? (
                                  <div
                                    style={{
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "space-around",
                                    }}
                                  >
                                    {currentPage != 1 ? (
                                      <Button
                                        onClick={() =>
                                          handlePageClick(currentPage - 1)
                                        }
                                        disabled={currentPage == 1}
                                      >
                                        Prev
                                      </Button>
                                    ) : (
                                      <Button disabled={true}>Prev</Button>
                                    )}
                                    {/* Page numbers */}
                                    {[...Array(totalPages).keys()].map(
                                      (pageNumber) =>
                                        currentPage == pageNumber ? (
                                          <div>
                                            <Button
                                              className="m-1"
                                              key={pageNumber}
                                              onClick={() =>
                                                handlePageClick(pageNumber)
                                              }
                                            >
                                              {pageNumber}
                                            </Button>
                                            <Button
                                              className="m-1"
                                              variant="secondary"
                                              key={pageNumber}
                                              onClick={() =>
                                                handlePageClick(pageNumber + 1)
                                              }
                                            >
                                              {pageNumber + 1}
                                            </Button>
                                            <Button
                                              className="m-1"
                                              variant="secondary"
                                              key={pageNumber}
                                              onClick={() =>
                                                handlePageClick(pageNumber + 2)
                                              }
                                            >
                                              {pageNumber + 2}
                                            </Button>
                                          </div>
                                        ) : (
                                          <></>
                                        )
                                    )}
                                    {/* Next button */}

                                    <Button
                                      onClick={() =>
                                        handlePageClick(currentPage + 1)
                                      }
                                      disabled={currentPage == totalPages}
                                    >
                                      Next
                                    </Button>
                                  </div>
                                ) : (
                                  <Button
                                    onClick={() => handlePageClick(1)}
                                    disabled={currentPage == 1}
                                  >
                                    Prev
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="articles" className="tab-pane fade">
                        <div className="like-author-area">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="latest-tab">
                                <div className="col">
                                  <div className="bbb_viewed_title_container">
                                    <div className="bbb_viewed_nav_container">
                                      <div className="bbb_viewed_nav bbb_viewed_prev">
                                        <i className="fa fa-chevron-left"></i>
                                      </div>
                                      <div className="bbb_viewed_nav bbb_viewed_next">
                                        <i className="fa fa-chevron-right"></i>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form action="" method="post" id="myForm" style={{ display: "none" }}>
        <input type="hidden" className="nameid" name="page_id" value="" />
        <button type="button" id="submitBtn">
          Submit Form
        </button>
      </form>
    </div>
  );
};
export default Newsandarticle;
