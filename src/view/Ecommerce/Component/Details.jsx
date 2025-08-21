import "../../../assets/css/ecommerce/responsive.css";
import "../../../assets/css/ecommerce/style.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../API/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notification } from "antd";
import { FaClipboard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Spin } from "antd";
import Login from "../../../components/Login/Login";
import DetailSkeleton from "./SkeletonDetails/DetailSkeleton";
import { API_ENDPOINTS } from "../../../ulits/apiConstant";

const Detail = ({ setIsAuthenticated }) => {
  const { slug } = useParams();
  const condition = slug.split("_")[0] === "h" ? "h" : "s";
  const parameter = slug.split("_")[1];
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
const dispatch = useDispatch();
  const { productId, productSlug } = useSelector((state) => state.medimart);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  // const productId = localStorage.getItem("productId");
  const [counter, setCounter] = useState(1);
  const [image, SetImage] = useState("");
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [dcid, setdefaultcolorid] = useState(null);
  const [dattid, setdefaultattid] = useState(null);
  const [atid, setattid] = useState(null);
  const [allData, setAllData] = useState({});
  const [stock, setStock] = useState();
  const [selectedType, setSelectedType] = useState("S");

  {
    /* For Color selector  Start*/
  }
  const handlerClose = () => {
    setSignInModalOpen(false);
  };

  const handleSignInSuccess = () => {
    setSignInModalOpen(false);
  };

  const [selectedColor, setSelectedColor] = useState(() => {
    const pagekey = `${window.location.pathname}_selectedColor`;
    return localStorage.getItem(pagekey) || null;
  });
  const handleClickColor = (colorName) => {
    if (selectedColor === colorName) {
      setSelectedColor(null);
      localStorage.removeItem(pagekey);
    } else {
      setSelectedColor(colorName);
      localStorage.setItem(pagekey, colorName);
    }
  };
  {
    /* End */
  }

  const handleSelect = (val, atid) => {
    setSelectedType(val);
    setattid(atid);
    setdefaultattid(null);
  };

  const incrementCount = () => {
    setCounter(counter + 1);
  };

  const decrementCount = () => {
    if (counter !== 1) {
      setCounter(counter - 1);
    }
  };

  const navigate = useNavigate();
  const userId = sessionStorage.getItem("id");

  const addcart = async (prod) => {
    if (userId) {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.MEDIMART.GET_USER_CART_DATA,
        {
          user_id: userid,
        }
      );

      var book_id = prod.id;
      if (
        prod.is_paper_book == 1 ||
        prod.is_ebook == 0 ||
        prod.is_audiable == 0
      ) {
        var variant = "paper_book_price";
        var attribute_id = atid ? atid : dattid;
        var color_id = dcid;
      } else if (
        prod.is_paper_book == 0 ||
        prod.is_ebook == 1 ||
        prod.is_audiable == 0
      ) {
        var variant = "ebook_price";
      } else if (
        prod.is_paper_book == 0 ||
        prod.is_ebook == 0 ||
        prod.is_audiable == 1
      ) {
        var variant = "audiable_price";
      }
      localStorage.setItem("subID", prod.id);

      const requestData = {
        user_id: userId,
        book_id: book_id,
        variant: variant,
        qty: counter,
        attribute_id: attribute_id,
        color_id: color_id,
        is_combo_master: prod.is_combo_master,
        combo_course_id: Number(prod.combo_course_id),
      };

      if (data.status === false) {
        const { data } = await axiosInstance.post(
          API_ENDPOINTS.MEDIMART.ADD_BOOK_TO_CART,
          requestData
        );
        navigate("/addToCart");
        toast.success("Item has been added successfully...");
      } else {
        if (prod?.product_type === data?.data?.list[0]?.product_type) {
          if (prod?.id === data?.data?.list[0]?.id) {
            toast.warning("This product is already exist in your cart..");
          } else {
            const { data } = await axiosInstance.post(
              API_ENDPOINTS.MEDIMART.ADD_BOOK_TO_CART,
              requestData
            );
            navigate("/addToCart");
            toast.success("Item has been added successfully...");
          }
        } else {
          const res = await axiosInstance.post("/v2_data_model/clearCart", {
            user_id: userid,
          });
          const { data } = await axiosInstance.post(
            API_ENDPOINTS.MEDIMART.ADD_BOOK_TO_CART,
            requestData
          );
          navigate("/addToCart");
        }
      }
    } else {
      setSignInModalOpen(true);
    }
  };

  const addCart = (requestData2) => {
    localStorage.setItem("CbtType", JSON.stringify("0"));
    axiosInstance
      .post(API_ENDPOINTS.MEDIMART.ADD_BOOK_TO_CART, requestData2)
      .then((response) => {
        navigate("/addToCart");
        toast.success(response.message);
      })
      .catch((error) => {
        console.error("Error fetching list data:", error);
      });
  };
  const userid = sessionStorage.getItem("id");
  const [ProductData, setProductDetail] = useState([]);
  const [BannertData, setBanner] = useState([]);


  const getProductDetail = async () => {

    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.MEDIMART.GET_ECOMM_PRODUCT_DETAILE,
        condition  == 'h' ?  
        {
          user_id: userid ? userid : 4,
          book_id: productId,
        }:
        {
          user_id: userid ? userid : 4,
          slug: parameter
        }
      );
      setLoading(false);
      setStock(data.data.detail.quantity);
      setAllData(data.data);
      setSize(data.data.available_size);
      setColor(data.data.color);
      setdefaultcolorid(data?.data?.color[0]?.id);
      setdefaultattid(data?.data?.available_size[0]?.attribute_id);
      setSelectedType(data?.data?.available_size[0]?.attribute_name);
      setProductDetail(data.data.product_faeture);
      setBanner(data.data.banner);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);
  const meta_image = allData?.banner?.[0]?.image;
  const meta_title = ProductData.meta_title;
  const meta_description = ProductData.meta_description;
  const meta_keywords = ProductData.meta_keywords;
  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  // const title = ProductData.slug;
  const currentUrl = window.location.href;
  const textToCopy = `${currentUrl}`;
  const handleShare = () => {
    // const textToCopy = `${videoUrl}`;
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

  const whatsappLink = `https://web.whatsapp.com/send?text=${encodeURIComponent(
    textToCopy
  )}`;

  const handleClickwhatsapp = () => {
    window.open(whatsappLink, "_blank");
  };

  const scrollContainerRef = useRef(null);
  const imgAr = [
    { label: "", img: `${window.IMG_BASE_URL}/emdpublic/store/slide-c.svg` },
    { label: "", img: `${window.IMG_BASE_URL}/emdpublic/store/slide-c.svg` },
    { label: "", img: `${window.IMG_BASE_URL}/emdpublic/store/slide-c.svg` },
    { label: "", img: `${window.IMG_BASE_URL}/emdpublic/store/slide-c.svg` },
    { label: "", img: `${window.IMG_BASE_URL}/emdpublic/store/slide-c.svg` },
  ];
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
  const imgArr = [
    { label: "", img: `${window.IMG_BASE_URL}/emdpublic/store/slide-c.svg` },
    { label: "", img: `${window.IMG_BASE_URL}/emdpublic/store/slide-c.svg` },
    { label: "", img: `${window.IMG_BASE_URL}/emdpublic/store/slide-c.svg` },
    { label: "", img: `${window.IMG_BASE_URL}/emdpublic/store/slide-c.svg` },
    { label: "", img: `${window.IMG_BASE_URL}/emdpublic/store/slide-c.svg` },
  ];

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

  const [pincode, setPincode] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    if (value.length <= 6) {
      setPincode(value);
    }
  };

  const handleChangeClick = () => {
    setPincode(""); // Clear input when "Change" is clicked
  };
  {
    /* For Buy */
  }
  const [isBuying, setIsBuying] = useState(false);
  const handleBuyNow = async () => {
    setIsBuying(true);
    try {
      await addcart(allData?.detail);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsBuying(false);
    }
  };
  const [loading, setLoading] = useState(true);

  return (
    <div className="Detail">
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
          content={`https://damsdelhi.com/damspublication/${slug}`}
        />
        <meta property="og:image" content={meta_image} />
        <meta property="og:site_name" content="DAMS" />
      </Helmet>

      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>Product Description</li>
            </ul>
          </div>
        </div>
      </div>
      {loading ? (
        <DetailSkeleton />
      ) : (
        <section className="product-detail">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                <div className="card m-0 border-0">
                  <div className="img-display position-relative">
                    {image != "" ? (
                      <div className="img-showcase">
                        <img src={image} alt="" />
                      </div>
                    ) : (
                      <div className="img-showcase">
                        {allData?.banner?.map((result, key) =>
                          key == 0 ? <img src={result.images} alt="" /> : ""
                        )}
                      </div>
                    )}
                    <div class="share-icon circle-bg" onClick={handleClick}>
                      {open == true ? (
                        <i class="icon fa fa-times"> </i>
                      ) : (
                        <i class="icon fa fa-share"> </i>
                      )}
                    </div>
                    {open == true && (
                      <div class="outer-icons" style={{ opacity: "1" }}>
                        <span>
                          <i
                            onClick={handleClickwhatsapp}
                            class="three fa fa-whatsapp"
                          ></i>
                        </span>

                        <a>
                          <i
                            class="four fa fa-copy"
                            onClick={handleShare}
                            target="_blank"
                          >
                            {" "}
                          </i>
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="img-select">
                    {allData?.banner?.map((result, index) => (
                      <div className="img-item">
                        <a
                          data-id="1"
                          onClick={() => {
                            SetImage(result.images);
                          }}
                        >
                          <img
                            className={result.images === image ? "active" : ""}
                            src={result.images}
                            alt=""
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                <div className="product-text">
                  <h3></h3>
                  <p className="m-0">{allData?.detail?.title}</p>
                  <div className="rating ratingNew">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="SetOfDiv">
                          <h3>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star"></em>
                            <em class="fa fa-star non"></em>
                          </h3>
                          {/* <h6>Very Good</h6> */}
                          <h5>
                            <em class="fa fa-circle"></em>
                            {allData?.detail?.course_review_count} reviews
                          </h5>
                          {/* <p className="m-0">
                          {ProductData.rating}{" "}
                          <span>
                            <em className="fa fa-star"></em>
                          </span>
                        </p> */}
                        </div>
                      </div>
                      {/* <div className="col-9 col-md-7">
                      <h5>
                        {allData?.detail?.course_review_count} reviews
                      </h5>
                    </div> */}
                      <div className="col-12 col-md-12">
                        <div className="setOfMrp">
                          <h4>
                            <span className="mrpText">MRP</span>
                            {allData?.detail?.discount_ebook > 0 &&<del>
                              ₹ {allData?.detail?.paper_book_price}
                            </del>}
                             ₹  {allData?.detail?.paper_display_price== null ?  allData?.detail?.discount_paper_price : allData?.detail?.paper_display_price}
                            {allData?.detail?.discount_ebook > 0 && <span className="OFF">
                              {allData?.detail?.discount_paper}% OFF
                            </span>}
                          </h4>
                          {/* <h5 className="stock-test">In stock</h5> */}
                        </div>
                        {/* <div className="freeDelivery">
                        <h6>
                          Free delivery by <span>7 June</span>
                        </h6>
                      </div> */}
                      </div>

                      {/* <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12 col-md-12">
                          <h4>
                            MRP
                            <del>
                              ₹ {allData?.detail?.paper_book_price}
                            </del>{" "}
                            ₹ {allData?.detail?.discount_paper_price}
                            <span>
                              ({allData?.detail?.discount_paper}% OFF)
                            </span>
                          </h4>
                        </div>
                        <div className="col-12 col-md-12">
                          
                        </div>
                      </div>
                    </div> */}
                    </div>
                  </div>
                  <div className="row quantity">
                    <div className="col-12 col-md-12">
                      <div className="qty-container">
                        <span className="quantity">Quantity</span>
                        <button
                          className="qty-btn-minus btn-light"
                          type="button"
                          onClick={decrementCount}
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                        <input
                          type="text"
                          name="qty"
                          value={counter}
                          className="input-qty"
                          id="input-qty"
                        />
                        <button
                          className="qty-btn-plus btn-light"
                          type="button"
                          onClick={incrementCount}
                        >
                          <em className="fa fa-plus"></em>
                        </button>
                      </div>
                    </div>
                    {/* <div className="col-12 col-md-12">
                      <p>
                      Subject : <span style={{ color: "#000" }}>MBBS</span>
                    </p>
                      <div className="course-year">
                        <button type="button">MBBS</button>
                        <button type="button">Final Year</button>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="sectionOfSide">
                  <div className="row">
                    <div className="col-md-12">
                      {/* <div className="deliveryServices">
                      <h2>Delivery & Services</h2>
                      <div className="form-group position-relative">
                        <input
                          type="text"
                          className="form-control"
                          value={pincode}
                          onChange={handleInputChange}
                          placeholder="Enter 6-digit pincode"
                        />
                        {pincode.length === 6 && (
                          <div className="change" onClick={handleChangeClick}>
                            Change
                          </div>
                        )}
                      </div>
                      <p>
                        <img src={`${window.IMG_BASE_URL}/emdpublic/store/delivery.svg`} /> Express delivery by
                        Fri, 7 Jun
                      </p>
                      <p>
                        <img src={`${window.IMG_BASE_URL}/emdpublic/store/cash-pay.svg`} /> Pay on Delivery is
                        available{" "}
                      </p>
                      <p>
                        <img src={`${window.IMG_BASE_URL}/emdpublic/store/exchange.svg`}/> Hassle free 10 days
                        Return & Exchange
                      </p>
                    </div> 
                    <div className="bankOffers">
                      <h2>Offers</h2>
                      <input
                        type="checkbox"
                        hidden
                        className="read-more-state"
                        id="read-more"
                      />
                      <div className="read-more-wrap">
                        <div className="offerDiscount">
                          <div className="discount">
                            <img src={`${window.IMG_BASE_URL}/emdpublic/store/discount.svg`} />
                          </div>
                          <div className="textPart">
                            <h3>Bank Offers</h3>
                            <p>
                              10% Instant Discount on SBI Credit Cards and
                              CreditCard EMI - Min Spend ₹3,999; Max Discount ₹
                              1,000.
                            </p>
                          </div>
                        </div>
                        <div className="read-more-target">
                          <div className="offerDiscount">
                            <div className="discount">
                              <img src={`${window.IMG_BASE_URL}/emdpublic/store/discount.svg`} />
                            </div>
                            <div className="textPart">
                              <h3>Bank Offers</h3>
                              <p>
                                10% Instant Discount on SBI Credit Cards and
                                CreditCard EMI - Min Spend ₹3,999; Max Discount
                                ₹ 1,000.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <label
                        for="read-more"
                        className="read-more-trigger_closed"
                      >
                        More Bank Offers
                      </label>
                      <label for="read-more" className="read-more-trigger_opened">Less Bank Offers</label>
                    </div>*/}
                    </div>
                  </div>
                  <div className="row mt-5">
                    {allData?.color && color.length > 0 ? (
                      <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                        <div className="color-circle">
                          <h5 style={{ margin: "10px" }}>Select Color</h5>
                          <div
                            className="ColorSize"
                            style={{ display: "flex", gap: "10px" }}
                          >
                            {/* For the green Color */}
                            <div
                              className="roundTick"
                              onClick={() => handleClickColor("green")}
                              style={{
                                backgroundColor:
                                  selectedColor === "green" ? "green" : "green",
                              }}
                            >
                              {selectedColor === "green" && (
                                <em className="fa fa-check"></em>
                              )}
                            </div>
                            {/* For the Orange*/}
                            <div
                              className="roundTick"
                              onClick={() => handleClickColor("Orange")}
                              style={{
                                backgroundColor:
                                  selectedColor === "Orange"
                                    ? "Orange"
                                    : "Orange",
                              }}
                            >
                              {selectedColor === "Orange" && (
                                <em className="fa fa-check"></em>
                              )}
                            </div>
                            {/*for the BLue Color*/}
                            <div
                              className="roundTick"
                              onClick={() => handleClickColor("Blue")}
                              style={{
                                backgroundColor:
                                  selectedColor === "Blue" ? "Blue" : "Blue",
                              }}
                            >
                              {selectedColor === "Blue" && (
                                <em className="fa fa-check"></em>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      " "
                    )}
                    {size && size.length > 0 ? (
                      <div className="col-12 col-sm-12 col-md-9 col-lg-9 radio__group">
                        <span>Size</span>
                        {size.map((result) => (
                          <div className="radio__button">
                            <span
                              style={{
                                backgroundColor:
                                  selectedType == result?.attribute_name
                                    ? "green"
                                    : "#fff",
                              }}
                              onClick={() =>
                                handleSelect(
                                  result?.attribute_name,
                                  result?.attribute_id
                                )
                              }
                            >
                              {result?.attribute_name}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="productDetailNew">
                        <div className="feature">
                          <h3>Product Description</h3>
                          <ul
                            dangerouslySetInnerHTML={{
                              __html: allData?.detail?.book_description,
                            }}
                          ></ul>
                        </div>
                        {ProductData && ProductData.length > 0 ? (
                          <div className="feature mt-4">
                            <h3 className="mb-3">Product Specifications</h3>
                            <div className="table-responsive">
                              <table className="table table-borderless bg-transparent m-0">
                                <tbody>
                                  {ProductData.map((result, index) => (
                                    <tr key={index}>
                                      <td className="p-2 fw-medium">
                                        {result?.product_feature_heading}
                                      </td>
                                      <td className="p-2">
                                        {result?.product_data}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      {/* <div className="similarBrands">
                      <h5>Similar Brands</h5>
                      <div className="image-gallery-container">
                        <button
                          className="scroll-btn left"
                          onClick={scrollLeft}
                        >
                          &#8592;
                        </button>
                        <div className="image-gallery" ref={scrollContainerRef}>
                          {imgAr.map((image, index) => (
                            <div className="colorChangeOfDiv">
                              <div
                                className="gallery-image"
                                style={{ position: "relative" }}
                              >
                                <div className="imgSec">
                                  <img src={image.img} />
                                </div>
                              </div>
                              <div className="textSec">
                                <p>
                                  STETHOSCOP DR.morepen stethoscope Deluxe ST-01
                                  Acoustic Stethoscope
                                </p>
                                <h3>
                                  <em className="fa fa-star"></em>
                                  <em className="fa fa-star"></em>
                                  <em className="fa fa-star"></em>
                                  <em className="fa fa-star"></em>
                                  <em className="fa fa-star non"></em>
                                </h3>
                                <h6>₹ 1,299</h6>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button
                          className="scroll-btn right"
                          onClick={scrollRight}
                        >
                          &#8594;
                        </button>
                      </div>
                    </div> */}
                      {/* <div className="RatingReviews">
                      <div className="reviewHeading">
                        <h2>Rating & Reviews</h2>
                        <button className="btn">Rate Product</button>
                      </div>
                      <div className="reviewStar">
                        <h2>
                          <em className="fa fa-star"></em>
                          <em className="fa fa-star"></em>
                          <em className="fa fa-star"></em>
                          <em className="fa fa-star"></em>
                          <em className="fa fa-star non"></em>
                          <span>2,451 rating | 145 reviews</span>
                        </h2>
                      </div>
                      <div className="saY">
                        <h3>Customers say</h3>
                        <p>
                          Customers like the quality, sound quality, educational
                          value, and value of the stethoscope. For example, they
                          mention it's a good product for medical students,
                          doctors, and medicos. Some appreciate the appearance.
                          That said, opinions are mixed on weight, comfort, and
                          material.
                        </p>
                      </div>
                      <div className="QuaLity">
                        <ul>
                          <li>
                            <img src={`${window.IMG_BASE_URL}/emdpublic/store/check.svg`} /> Quality
                          </li>
                          <li>
                            <img src={`${window.IMG_BASE_URL}/emdpublic/store/check.svg`} /> Sound quality
                          </li>
                          <li>
                            <img src={`${window.IMG_BASE_URL}/emdpublic/store/check.svg`} /> Value
                          </li>
                          <li>
                            <img src={`${window.IMG_BASE_URL}/emdpublic/store/check.svg`} /> Appearance
                          </li>
                          <li>
                            <img src={`${window.IMG_BASE_URL}/emdpublic/store/check.svg`} /> Educational value
                          </li>
                        </ul>
                      </div>
                      <div className="Weight">
                        <ul>
                          <li>Weight</li>
                          <li>Comfort</li>
                          <li>Material</li>
                        </ul>
                      </div>
                      <div className="ReviewsVideos">
                        <h5>Reviews with videos</h5>
                        <div className="image-gallery-container">
                          <button
                            className="scroll-btn left"
                            onClick={scrollLeft1}
                          >
                            &#8592;
                          </button>
                          <div
                            className="image-gallery"
                            ref={scrollContainerRef1}
                          >
                            {imgArr.map((image, index) => (
                              <div className="colorChangeOfDiv" key={index}>
                                <div
                                  className="gallery-image"
                                  style={{ position: "relative" }}
                                >
                                  <div className="imgSec">
                                    <iframe
                                      src="https://www.youtube.com/embed/ejVbO2aGTTo?si=uNw6iINZSDoDKJes"
                                      title="YouTube video player"
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                      referrerPolicy="strict-origin-when-cross-origin"
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button
                            className="scroll-btn right"
                            onClick={scrollRight1}
                          >
                            &#8594;
                          </button>
                        </div>
                      </div>
                      <div className="ReviewsImg">
                        <h2>Reviews with images</h2>
                        <img src={`${window.IMG_BASE_URL}/emdpublic/store/imgreview-a.svg`} />
                        <img src={`${window.IMG_BASE_URL}/emdpublic/store/imgreview-b.svg`} />
                      </div>
                      <div className="TopReview">
                        <h2>Top reviews</h2>
                        <div class="">
                          <input
                            type="checkbox"
                            hidden
                            className="read-more-state1"
                            id="read-more1"
                          />
                          <div className="read-more-wrap1">
                            <div className="reviewSec">
                              <div className="topSec">
                                <img src={`${window.IMG_BASE_URL}/emdpublic/store/review-icon.svg`} /> Limaakum
                                Jamir
                              </div>
                              <div className="midSec">
                                <h3>
                                  <em class="fa fa-star"></em>
                                  <em class="fa fa-star"></em>
                                  <em class="fa fa-star"></em>
                                  <em class="fa fa-star"></em>
                                  <em class="fa fa-star non"></em>
                                </h3>
                                <p>Best in budget with good quality</p>
                              </div>
                              <div className="botmSec">
                                <h4>Reviewed in India on 3 June 2024</h4>
                                <h3>
                                  Colour: Black <span>Verified Purchase</span>
                                </h3>
                              </div>
                              <div className="butnGrp">
                                <button className="btn">Helpful</button>
                                <button className="btn report">Report</button>
                              </div>
                            </div>
                            <div className="read-more-target1">
                              <div className="reviewSec">
                                <div className="topSec">
                                  <img src={`${window.IMG_BASE_URL}/emdpublic/store/review-icon.svg`} />{" "}
                                  Limaakum Jamir
                                </div>
                                <div className="midSec">
                                  <h3>
                                    <em class="fa fa-star"></em>
                                    <em class="fa fa-star"></em>
                                    <em class="fa fa-star"></em>
                                    <em class="fa fa-star"></em>
                                    <em class="fa fa-star non"></em>
                                  </h3>
                                  <p>Best in budget with good quality</p>
                                </div>
                                <div className="botmSec">
                                  <h4>Reviewed in India on 3 June 2024</h4>
                                  <h3>
                                    Colour: Black <span>Verified Purchase</span>
                                  </h3>
                                </div>
                                <div className="butnGrp">
                                  <button className="btn">Helpful</button>
                                  <button className="btn report">Report</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <label
                            for="read-more1"
                            className="read-more-trigger_closed1"
                          >
                            See more review
                          </label>
                          <label for="read-more1" className="read-more-trigger_opened1">Less</label>
                        </div>
                      </div>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row mt-5">
            {allData?.color && color.length > 0 ? (
              <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                <div className="ColorSize">
                  <h3>Select color</h3>
                  {allData?.color.map((result) => (
                    <div
                      className="roundTick"
                      style={{ backgroundColor: `${result.color_code}` }}
                    >
                      <em className="fa fa-check"></em>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
            {size && size.length > 0 ? (
              <div className="col-12 col-sm-12 col-md-9 col-lg-9 radio__group">
                <span>Size</span>
                {size.map((result) => (
                  <div className="radio__button">
                    <span
                      style={{
                        backgroundColor:
                          selectedType == result?.attribute_name
                            ? "green"
                            : "#fff",
                      }}
                      onClick={() =>
                        handleSelect(
                          result?.attribute_name,
                          result?.attribute_id
                        )
                      }
                    >
                      {result?.attribute_name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <div className="feature">
                <h3>Product Description :</h3>
                <ul
                  dangerouslySetInnerHTML={{
                    __html: allData?.detail?.book_description,
                  }}
                ></ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <div className="addition-detail">
                <h3>Additional Details</h3>
                <table className="table">
                  <tr>
                    <td>Brand</td>
                    <td>{allData?.detail?.brand_name}</td>
                  </tr>
                  <tr>
                    <td>Manufacturer/Importer</td>
                    <td>{allData?.detail?.brand_name}</td>
                  </tr>
                  <tr>
                    <td>SKU</td>
                    <td>{allData?.detail?.sku}</td>
                  </tr>
                  <tr>
                    <td>HSN</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Country of Origin</td>
                    <td>India</td>
                  </tr>
                  <tr>
                    <td>Seller</td>
                    <td>{allData?.detail?.brand_name}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div> */}
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                {/* <div className="add-cartbtn">
                <button type="button" className="add-cart" onClick={() => addcart(allData?.detail)}>
                  <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/cart.svg" alt="" />{" "}
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="buy-bg"
                  onClick={() => addcart(allData?.detail)}
                >
                  Buy Now
                </button>
              </div> */}
                {stock != 0 ? (
                  <div className="add-cartbtn">
                    <button
                      type="button"
                      className="add-cart"
                      onClick={() => addcart(allData?.detail)}
                    >
                      <img
                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/cart.svg"
                        alt=""
                      />{" "}
                      Add to Cart
                    </button>
                    {/* <button
                    type="button"
                    className="buy-bg"
                    onClick={() => addcart(allData?.detail)}
                  >
                    Buy Now
                  </button> */}
                    <button
                      type="button"
                      className="buy-bg"
                      onClick={handleBuyNow}
                      disabled={isBuying}
                    >
                      {isBuying ? <Spin /> : "Buy Now"}
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      type="button"
                      className="buy-bg"
                      style={{
                        backgroundColor: "#555",
                        color: "#fff",
                        cursor: "not-allowed",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        border: "none",
                      }}
                      disabled
                    >
                      Out of Stock
                    </button>
                  </div>
                )}
                {isSignInModalOpen && (
                  <Login
                    handlerClose={handlerClose}
                    setIsAuthenticated={setIsAuthenticated}
                    handleSignInSuccess={handleSignInSuccess}
                    setSignInModalOpen={setSignInModalOpen}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
export default Detail;
