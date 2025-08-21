
import "../../assets/css/ecommerce/responsive.css"
import "../../assets/css/ecommerce/style.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../apiConfig";
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const CategoryProductList = () => {
    const navigate = useNavigate();
    const handleProduct = (productId) => {
      localStorage.setItem("productId", productId);
      navigate("/product-detail");
    };
    
      const [ProductList, setProductList] = useState([]);

      const userid = sessionStorage.getItem("id");
      const category_id =  (localStorage.getItem("subId"))?localStorage.getItem("subId"):'';
      useEffect(() => {
        axiosInstance
          .post(API_ENDPOINTS.MEDIMART.GET_ECOMM_SEE_ALL_DETAIL, {
            user_id: userid,
            type: "category",
            filterby: "",
            subject_id: "",
            category_id: category_id,
            sub_sub_category_id: "",
            sub_category_id: "",
          })
          .then((response) => {
            setProductList(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching Without Category data:", error);
          });
      }, []);
  return(
    <div className="CategoryProductList">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li><a href={'/'}>Home</a></li>
              <li>Category product</li>
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
                  <input type="text" className="form-control" placeholder="Search for Products" id="search_category" fdprocessedid="9py130" />
                  <button className="btn" type="button" fdprocessedid="327h5f">
                    <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/search-icon.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="tabbing_data_oth short-filter">
            <div className="filter_data">
              <div className="row">
                <div className="col-5 col-md-3">
                  <a href="#" data-toggle="modal" data-target="#Sort-by">
                    <div className="row equal_img">
                      <div className="col-4 col-md-2">
                        <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/arrow.svg" alt="" />
                      </div>
                      <div className="col-8 col-md-10">
                        <h4>Sort by</h4>
                        <p>Popularity</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-12">
                <h3>Showing {ProductList.length} items for “DAMS”</h3>
              </div>
            </div>
            <div className="row" id="ajaxResponce">
            {ProductList.map((result) => (  
              <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3"  id="remove_category">
              
                <div className="item position-relative">
                <a href="#" onClick={() =>
                                                          handleProduct(result.id)
                                                        }>
                    <div className="back_bg">
                      <img src={result.featured_image} alt="" onerror="this.src=''" />
                    </div>
                    <h3>{result.title} <span className="d-block"></span>
                    </h3>
                  </a>
                  <p> {result.auther}</p>
                  {/* <div className="edition">
                    <a href="#">{result.publication_date.split("-")[0]} 
                                    &nbsp;Edition</a>
                  </div> */}
                  <div className="price-img position-relative">
                    <h4 className="price">
                      <em className="fa fa-rupee"></em>{result.discount_paper_price} <span>({result.discount_paper} % OFF)</span>
                    </h4>
                    <div className="row">
                      <div className="col-6 col-md-6 col-xl-6">
                        <del>
                          <em className="fa fa-rupee"></em>{result.paper_book_price} </del>
                      </div>
                      <div className="col-6 col-md-6 col-xl-6 text-right">
                        <div className="rating">
                          <em className="fa fa-star"></em>{result.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              ))}
            
              
            
            
            
            </div>
          </div>

          </div>
      </section>
     </div>
  );
}
export default CategoryProductList