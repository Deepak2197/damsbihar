import "../../assets/css/ecommerce/responsive.css"
import "../../assets/css/ecommerce/style.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../apiConfig";
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

    const SubSubCategory = () => {
      

        const navigate = useNavigate();

      
        const userid = sessionStorage.getItem("id");
        const [SubSubCategoryData, setSubSubCategory] = useState([]);
      
        useEffect(() => {
          const subSubCategoryId = localStorage.getItem("subSubCategoryId");
      
          if (subSubCategoryId) {
            axiosInstance
              .post(API_ENDPOINTS.MEDIMART.GET_ECOMM_SUB_SUBCATEGORY_LIST, {
                user_id: userid,
                sub_cat_id: subSubCategoryId,
              })
              .then((response) => {
                localStorage.setItem(
                  "subSubCategoryId",
                  localStorage.getItem("subSubCategoryId")
                );
                navigate("/sub-category-product");
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
          }
        }, []);
      
        useEffect(() => {
          
        }, [SubSubCategoryData]);
  return(
    <div className="SubSubCategory">
      <div className="page-content position-relative">
          <div className="breadcrumb-row">
            <div className="container">
              <ul className="list-inline">
                <li><a href={'/'}>Home</a></li>
                <li>Sub SubCategory</li>
              </ul>
            </div>
          </div>
        </div>
        <section className="book-mod-page book-subcategory"> 
        <div className="container">
            <div className="search_br position-relative">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="input-group position-relative">
                            <input type="text" className="form-control" placeholder="Search for Products" />
                            <button className="btn" type="button">
                                <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/search-icon.svg" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category_detail">
                <div className="row">
                {SubSubCategoryData.map((result) => (  
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
                        <a href="#" onClick={() => handleSubSubCategory(result.id) }>
                            <div className="img_bg">
                                <img src={result.subcat_img} alt="" />
                            </div>
                            <div className="link_bg">
                            {result.sub_category}
                            </div>
                        </a>
                    </div>
                      ))}
                  
                  
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
export default SubSubCategory