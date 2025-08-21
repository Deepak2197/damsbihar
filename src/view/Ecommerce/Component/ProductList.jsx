import "../../../assets/css/ecommerce/responsive.css";
import "../../../assets/css/ecommerce/style.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../API/axiosConfig";
import { useDispatch } from "react-redux";
import {
  addproductId,
  addproductSlug,
  addproductTitle,
} from "../../../network/medimartSlice";
import ProductListSkeleton from "./ProductListSkeleton";
import { API_ENDPOINTS } from "../../../ulits/apiConstant";

const ProductList = () => {
const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleProduct = (productId, title, slug) => {
    dispatch(addproductId(productId));
    dispatch(addproductTitle(title));
    dispatch(addproductSlug(slug));
    if (!title) {
      //  console.error("Error: title is undefined");
      return;
    }
    slug== null ? navigate(`/damspublication/h_${encodeURIComponent(title.trim()).replaceAll("%20", "-")}`) : navigate(`/damspublication/s_${slug}`);
  };

  const [withoutCategorylist, setwithoutCategory] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  const userid = sessionStorage.getItem("id");
  useEffect(() => {
    axiosInstance
      .post(API_ENDPOINTS.MEDIMART.GET_ECOMM_SEE_ALL_DETAIL, {
        user_id: userid,
        type: "without_category",
        filterby: "",
        subject_id: "",
        category_id: "",
        sub_sub_category_id: "",
        sub_category_id: "",
      })
      .then((response) => {
        setwithoutCategory(response.data.data);
        setLoadingState(false);
      })
      .catch((error) => {
        console.error("Error fetching Without Category data:", error);
      });
  }, []);

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "instant"
  //   });
  // }, []);

  const [filterlist, setfilterlist] = useState([]);
  const [Search, setsearch] = useState("");

  const handleSearchChange = (event) => {
    setsearch(event.target.value);
  };
  useEffect(() => {
    if (Search.trim() === "") {
      // If search is empty, show all books
      setfilterlist(withoutCategorylist);
    } else {
      // Filter books based on search term
      const filteredBooks = withoutCategorylist.filter((book) =>
        book?.title?.toLowerCase().includes(Search?.toLowerCase())
      );
      setfilterlist(filteredBooks);
    }
  }, [Search, withoutCategorylist]);

  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = async (event) => {
    setLoadingState(true);
    const filter = event.target.value;
    setSelectedFilter(filter);
    const res = await axiosInstance.post(
      API_ENDPOINTS.MEDIMART.GET_ECOMM_SEE_ALL_DETAIL,
      {
        user_id: userid,
        type: "without_category",
        filterby: filter,
        subject_id: "",
        category_id: "",
        sub_sub_category_id: "",
        sub_category_id: "",
      }
    );
      console.log(res?.data?.data)
    setfilterlist(res?.data?.data);
    setLoadingState(false);
  };

  return (
    <div className="ProductList">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>Product List</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="book-mod-page">
        <div className="container">
          <div className="search_br position-relative">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="input-group position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for Products"
                    id="search_category"
                    fdprocessedid="9py130"
                    onChange={handleSearchChange}
                  />
                  <button className="btn" type="button" fdprocessedid="327h5f">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/search-icon.svg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="tabbing_data_oth short-filter">
            <div className="filter_data">
              <div className="row">
                <div className="col-12 col-md-12">
                  <a href="#" data-toggle="modal" data-target="#Sort-by">
                    <div className="equal_img">
                      <div className="fliterDatabtn">
                        <div className="sortData">
                          <div style={{ display: "flex", marginRight: "10px" }}>
                            <img
                              src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/arrow.svg"
                              alt=""
                              style={{ marginRight: "10px" }}
                            />
                            <h4>Sort by </h4>
                          </div>

                          <button
                            className="sortingbtndata"
                            onClick={handleFilterChange}
                            style={{
                              backgroundColor:
                                selectedFilter === "ID_DESC"
                                  ? "#071952"
                                  : "#9e9b9b",
                            }}
                            value={"ID_DESC"}
                          >
                            Popularity
                          </button>

                          <button
                            className="sortingbtndata"
                            onClick={handleFilterChange}
                            value={"DISCOUNT_DESC"}
                            style={{
                              backgroundColor:
                                selectedFilter == "DISCOUNT_DESC"
                                  ? "#071952"
                                  : "#9e9b9b",
                            }}
                          >
                            Discount (High to Low)
                          </button>

                          <button
                            className="sortingbtndata"
                            onClick={handleFilterChange}
                            value={"MRP_ASC"}
                            style={{
                              backgroundColor:
                                selectedFilter == "MRP_ASC"
                                  ? "#071952"
                                  : "#9e9b9b",
                            }}
                          >
                            Price (Low to High)
                          </button>

                          <button
                            className="sortingbtndata"
                            onClick={handleFilterChange}
                            value={"MRP_DESC"}
                            style={{
                              backgroundColor:
                                selectedFilter == "MRP_DESC"
                                  ? "#071952"
                                  : "#9e9b9b",
                            }}
                          >
                            Price (High to Low)
                          </button>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-12">
                <h3>Showing {withoutCategorylist.length} items for “DAMS”</h3>
              </div>
            </div>
            {loadingState ? (
              <>
                <ProductListSkeleton />
              </>
            ) : (
              <div className="row" id="ajaxResponce">
                {filterlist?.map((result) => (
                  <div
                    className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3"
                    id="remove_category"
                  >
                    <div className="item position-relative">
                      <a
                        
                        onClick={(e) => {
                          e.preventDefault();
                          handleProduct(result.id, result.title, result.slug);
                        }}
                      >
                        <div className="back_bg">
                          <img src={result.featured_image} alt="" onerror=" " />
                        </div>
                        <h3>
                          {result.title} <span className="d-block"></span>
                        </h3>
                      </a>
                      <p> {result.auther}</p>
                      {/* <div className="edition">
                      <a href="#">
                        {result.publication_date.split("-")[0]} Edition
                      </a>
                    </div> */}
                      <div className="price-img position-relative">
                        <h4 className="price">
                          <em className="fa fa-rupee"></em>
                          {result.paper_display_price== null ?  result.discount_paper_price : result.paper_display_price}{" "}
                          {
                            result.discount_ebook =='0' ? "":<span>({result.discount_paper} % OFF)</span>
                          }
                        </h4>
                        <div className="row">
                          <div className="col-6 col-md-6 col-xl-6">
                            {result.discount_ebook == "0" ? 
                              "":<del>
                              <em className="fa fa-rupee"></em>
                              {result.paper_book_price}{" "}
                            </del>
                            }
                          </div>
                          <div className="col-6 col-md-6 col-xl-6 text-right">
                            <div className="rating">
                              <em className="fa fa-star"></em>
                              {result.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProductList;
