
import "../../../assets/css/ecommerce/responsive.css"
import "../../../assets/css/ecommerce/style.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../apiConfig";
import axiosInstance from "../../../API/axiosConfig";
import ProductListSkeleton from "./ProductListSkeleton";
import { API_ENDPOINTS } from "../../../ulits/apiConstant";
import { useDispatch } from "react-redux";
import {
  addproductId,
  addproductSlug,
  addproductTitle,
} from "../../../network/medimartSlice";


const BestSellingSell = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
    
      const [bestSellerlist, setbestSeller] = useState([]);
      
      const [loading, setLoading] = useState(true)
      const userid = sessionStorage.getItem("id") || "4";
      useEffect(() => {
        axiosInstance
          .post(API_ENDPOINTS.MEDIMART.GET_ECOMM_SEE_ALL_DETAIL, {
            user_id: userid,
            type: "best_seller",
            filterby: "",
            subject_id: "",
            category_id: "",
            sub_sub_category_id: "",
            sub_category_id: "",
          })
          .then((response) => {
            setbestSeller(response.data.data);
            setLoading(false)
          })
          .catch((error) => {
            console.error("Error fetching best seller  data:", error);
          });
      }, []);


      useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "instant" 
        });
      }, []);

  return(


  <div className="BestSelling">
    <div className="page-content position-relative">
        <div className="breadcrumb-row">
            <div className="container">
                <ul className="list-inline">
                    <li><a href={'/'}>Home</a></li>
                    <li>Best Selling</li>
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
          <div classNameName="row">
            <div classNameName="col-12 col-md-12">
              <h3>Showing {bestSellerlist.length} items for “DAMS”</h3>
            </div>
          </div>
          {loading?(<ProductListSkeleton/>):(
          <div className="row" id="ajaxResponce">
          {bestSellerlist.map((result) => (  
            <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3"  id="remove_category">
            
              <div className="item position-relative">
              <a href="#" onClick={() =>
                                                        handleProduct(result.id, result.title, result.slug)
                                                      }>
                  <div className="back_bg">
                    <img src={result.featured_image} alt="" onerror="'" />
                  </div>
                  <h3>{result.title} <span className="d-block"></span>
                  </h3>
                </a>
                <p> {result.auther}</p>
                {/* <div className="edition">
                  <a href="#">{result.publication_date.split('-')[0]} Edition</a>
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
          )}
        </div>

        </div>
    </section>
  </div>
  );
}
export default BestSellingSell