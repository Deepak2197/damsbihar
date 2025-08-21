import "../../assets/css/ecommerce/responsive.css";
import "../../assets/css/ecommerce/style.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { Skeleton } from "antd";
import { useDispatch } from "react-redux";
import {
  addproductId,
  addproductSlug,
  addproductTitle,
  addsubId,
} from "../../network/medimartSlice";
import SearchProduct from "./Component/SearchProduct";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Store = () => {
const dispatch = useDispatch();

  const scrollContainerRef = useRef(null);
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300, // Adjust scroll distance
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300, // Adjust scroll distance
      behavior: "smooth",
    });
  };

  const scrollContainerRef1 = useRef(null);

  const scrollLeft1 = () => {
    scrollContainerRef1.current.scrollBy({
      left: -300, // Adjust scroll distance
      behavior: "smooth",
    });
  };
  const scrollRight1 = () => {
    scrollContainerRef1.current.scrollBy({
      left: 300, // Adjust scroll distance
      behavior: "smooth",
    });
  };

  const navigate = useNavigate();
  const handleProduct = (productId, title, slug) => {
    
    if (!title) {
      // console.error("Error: title is undefined");
      return;
    } else {
      dispatch(addproductId(productId));
      dispatch(addproductTitle(title));
      dispatch(addproductSlug(slug));

      slug== null ? navigate(`/damspublication/h_${encodeURIComponent(title.trim()).replaceAll("%20", "-")}`) : navigate(`/damspublication/s_${slug}`)
     ;
}
  };
  const handleSubCategory = (subId) => {
dispatch(addsubId(subId));
    navigate("/medimart/damspublication");
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categorylist, setcategorylist] = useState([]);
  const [product_list, setproduct_list] = useState([]);
  const [bannerlist, setbannerlist] = useState([]);
  const [toptrendinglist, settoptrendinglist] = useState([]);
  const [bestsellerlist, setbestsellerlist] = useState([]);
  const [withoutcategorylist, setwithoutcategorylist] = useState([]);
  const user_id = sessionStorage.getItem("id");
  const [spin, setspin] = useState(false);

  useEffect(() => {
    setspin(true);
    axiosInstance
      .post(API_ENDPOINTS.MEDIMART.GET_ECOMM_CATEGORY_LIST, {
        user_id: user_id || "4",
      })
      .then((response) => {
        setbannerlist(response.data.banner);
        setcategorylist(response.data.data.category_list);
        setproduct_list(response.data.data.all_product_list);
        settoptrendinglist(response.data.data.top_trending);
        setbestsellerlist(response.data.data.best_seller);
        setwithoutcategorylist(response.data.data.without_category);
        setspin(false);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === bannerlist.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [bannerlist]);

  useEffect(() => {
    setTimeout(() => {
      scrollRight();
    }, 1000);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === bannerlist.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [bannerlist.length]);

  return (
    <div className="Store">
      <div className="page-content position-relative">
        <div className="breadcrumb-row d-none">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Store</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="book-mod-page">
        <div className="container">
          <div className="tagoth_section" id="remove">
            <div className="row">
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <h3 className="tt_x">Category</h3>
              </div>
            </div>
          </div>
          <SearchProduct handleProduct={handleProduct} />
          <div className="category_detail">
            <div id="bookAjaxList">
              <Skeleton active loading={spin} paragraph={{ rows: 4 }}>
                <div className="sectionSelect">
                  {categorylist?.map((category) => (
                    <div className="boxPart">
                      <a onClick={() => handleSubCategory(category.id)}>
                        <div className="img_bg">
                          <img src={category.cat_img} alt="" />
                        </div>
                        <div className="link_bg">{category.category}</div>
                      </a>
                    </div>
                  ))}
                </div>
              </Skeleton>
              <div
                id="bannerCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {bannerlist.map((banner, index) => (
                    <div
                      className={`carousel-item ${
                        index === activeIndex ? "active" : ""
                      }`}
                      key={banner.id}
                    >
                      <img
                        src={banner.image_link}
                        className="d-block w-100"
                        alt={banner.title_uniqid}
                      />
                    </div>
                  ))}
                </div>
                {/* Optional controls */}
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#bannerCarousel"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#bannerCarousel"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              {/* {console.log(product_list)} */}
              <div className="RecentlyViewed">
                <div className="HeadinG">
                  <h5>Product List</h5>
                  <Link to={"/product-list"}>View all </Link>
                </div>
                <div className="image-gallery-container">
                  <button className="scroll-btn left" onClick={scrollLeft}>
                    &#8592;
                  </button>
                  <div className="image-gallery" ref={scrollContainerRef}>
                    {product_list?.map(
                      (product, index) =>
                        product?.title ? (
                          <div
                            key={index}
                            className="gallery-image"
                            style={{ position: "relative" }}
                          >
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleProduct(product.id, product.title, product.slug);
                              }}
                            >
                              <div className="imgSec">
                                <img
                                  src={product.featured_image}
                                  alt={product.title}
                                />
                                {product.title.length > 15
                                  ? `${product.title.substring(0, 15)}...`
                                  : product.title}
                              </div>
                            </a>
                          </div>
                        ) : null // skip rendering if title is missing
                    )}
                  </div>

                  <button className="scroll-btn right" onClick={scrollRight}>
                    &#8594;
                  </button>
                </div>
              </div>

              {/* <div className="DealsforYou">
                <h5>Deals For You</h5>

                <div className="limitedTime">
                  {product_list?.map((product) => (
                    <div className="offBox">
                      <a
                        href="#:void(0)"
                        onClick={() => handleProduct(product.id, product.title)}
                      >
                        <div className="deal">
                          <img src={product.featured_image} />
                        </div>
                      </a>
                      <div className="textPart">
                        <p>
                          <span>
                            <button className="btn">
                              {product.discount_paper} % OFF
                            </button>
                          </span>
                          Limited time deal
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

              <div className="RecommendedItems">
                <div className="HeadinG">
                  <h5>Quick Buy</h5>
                  <Link to={"/quick-buy"}>View all </Link>
                </div>
                <div className="fullBox">
                  <div className="setBox">
                    {toptrendinglist?.map((toptrending) => (
                      <div className="setWidthBox">
                        <a

                          onClick={() =>
                            handleProduct(
                             toptrending?.id,
                              toptrending?.title,
                              toptrending?.slug
                            )
                        }
                        >
                          <div className="topSection">
                            <img src={toptrending.featured_image} />
                          </div>
                        </a>
                        <div className="bottomSection">
                          <h2>
                            {toptrending.title.length > 15
                              ? `${toptrending.title.substring(0, 30)}...`
                              : toptrending.title}
                          </h2>
                          <h3>
                            <del>₹ {toptrending.paper_book_price}</del>{" "}
                            <span>₹ {toptrending.paper_display_price== null ?  toptrending.discount_paper_price : toptrending.paper_display_price}{" "}</span>
                            {/* <span>₹ {toptrending.slug}</span> */}
                          </h3>
                          {/* <h4>Free delivery</h4> */}
                          <button className="btn">
                            <em class="fa fa-star"></em>
                            {toptrending.rating}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* <div className="RecommendedItems SuggestedYou">
                <div className="HeadinG">
                  <h5>Suggested For You</h5>
                  <a href="#">View all</a>
                </div>
                <div className="fullBox">
                  <div className="setBox">
                    {product_list?.map((product) => (
                      <div className="setWidthBox setWidthBoxNew">
                        <a
                          href="#"
                          onClick={() =>
                            handleProduct(product.id, product.title)
                          }
                        >
                          <div className="topSection">
                            <img src={product.featured_image} />
                          </div>
                        </a>
                        <div className="bottomSection">
                          <h2>
                            {product.title.length > 15
                              ? `${product.title.substring(0, 30)}...`
                              : product.title}
                          </h2>
                          <h3>
                            <del>₹ {product.paper_book_price} </del>{" "}
                            <span>₹ {product.discount_paper_price}</span>
                          </h3>
                          <h4>Free delivery</h4>
                          <button className="btn">
                            <em class="fa fa-star"></em> {product.rating}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div> */}
              {/* <div className="AddBanner">
                <div className="carousel-inner">
                  {bannerlist.map((banner, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={banner.id}
                    >
                      <img
                        src={banner.image_link}
                        className="d-block w-100"
                        alt={banner.banner_title}
                      />
                    </div>
                  ))}
                </div>
              </div> */}

              {/* <div className="BestSelling">
                <div className="HeadinG">
                  <h5>Best Selling</h5>
                  <a href="#">View all</a>
                </div>
                <div className="image-gallery-container">
                  <button className="scroll-btn left" onClick={scrollLeft1}>
                    &#8592;
                  </button>
                  <div className="image-gallery" ref={scrollContainerRef1}>
                    {product_list?.map((product) => (
                      <div
                        className="gallery-image"
                        style={{ position: "relative" }}
                      >
                        <div className="BoxFull">
                          <div className="imgSecNew">
                            <img src={product.featured_image} />
                          </div>
                          <div className="textSecNew">
                            <h3>
                              {product.title.length > 15
                                ? `${product.title.substring(0, 30)}...`
                                : product.title}
                            </h3>
                            <h4>
                              {[...Array(5)].map((_, index) => (
                                <em
                                  key={index}
                                  className={`fa fa-star ${
                                    index < product.rating ? "" : "non"
                                  }`}
                                ></em>
                              ))}
                            </h4>
                            <h5>
                              ₹ {product.discount_paper_price}{" "}
                              <span>{product.discount_paper}% Off</span>
                            </h5>

                            <button
                              className="btn"
                              onClick={() =>
                                handleProduct(product.id, product.title)
                              }
                            >
                              Buy Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="scroll-btn right" onClick={scrollRight1}>
                    &#8594;
                  </button>
                </div>
              </div> */}
              <div className="tabbing_data_oth m-0 p-0 bestselling">
                <div className="bestSellingFlex">
                  <h5>Best Selling</h5>
                  <Link to={"/best-selling"}>View all </Link>
                </div>

                <div className="tab-content">
                  <div className="tab-pane active">
                    <div
                      className="owl-carousel owl-theme mt-4 owl-loaded owl-drag"
                      id="best-selling"
                    >
                      <Skeleton active loading={spin} paragraph={{ rows: 4 }}>
                        <div className="owl-stage-outer">
                          {bestsellerlist?.map((bestseller) => (
                            <div
                              className="owl-item active"
                              style={{ width: "259.5px", marginRight: "10px" }}
                            >
                              <div className="item position-relative">
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleProduct(
                                      bestseller.id,
                                      bestseller.title,
                                      bestseller?.slug
                                    );
                                  }}
                                >
                                  <div className="back_bg">
                                    <img
                                      src={bestseller.featured_image}
                                      alt=""
                                      onerror="this.src='https://damsdelhi.com/assets/image_not_found.webp'"
                                    />
                                  </div>
                                  <h3>
                                    {bestseller.title}{" "}
                                    <span className="d-block"> </span>
                                  </h3>
                                </a>
                                <p>{bestseller.auther}</p>
                                <div className="price-img position-relative">
                                  <h4 className="price">
                                    <em className="fa fa-rupee"></em>
                                    {bestseller.paper_display_price== null ?  bestseller.discount_paper_price : bestseller.paper_display_price}{" "}
                                    <span>
                                      ({bestseller.discount_paper} % OFF)
                                    </span>
                                  </h4>
                                  <div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                      <del>
                                        <em className="fa fa-rupee"></em>
                                        {bestseller.paper_book_price}{" "}
                                      </del>
                                    </div>
                                    <div className="col-6 col-md-6 col-xl-6 text-right">
                                      <div className="rating">
                                        <em className="fa fa-star"></em>
                                        {bestseller.rating}{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Skeleton>
                      <div className="owl-nav disabled">
                        <button
                          type="button"
                          role="presentation"
                          className="owl-prev disabled"
                        >
                          <span aria-label="Previous">‹</span>
                        </button>
                        <button
                          type="button"
                          role="presentation"
                          className="owl-next disabled"
                        >
                          <span aria-label="Next">›</span>
                        </button>
                      </div>
                      <div className="owl-dots disabled"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Store;
