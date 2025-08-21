import "../../assets/css/ecommerce/responsive.css";
import "../../assets/css/ecommerce/style.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubCategoryProduct from "./SubCategoryProductList";
import axiosInstance from "../../API/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import ProductListSkeleton from "./Component/ProductListSkeleton";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
const SubCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userid = sessionStorage.getItem("id") || "4";
  const [SubCategoryData, setSubCategory] = useState([]);
  const [ProductList, setProductList] = useState([]);

  const [catid, setcatid] = useState(null);
  const [subcatid, setsubcatid] = useState(null);
  const [typeid, settypeid] = useState(null);
  const { subId } = useSelector((state) => state.medimart);

  const handleSubSubCategory = (category_id, sub_category_id) => {
    if (sub_category_id) {
      var type = "sub_category";
      settypeid(type);
      setcatid(category_id);
      setsubcatid(sub_category_id);
    } else if (category_id) {
      var type = "category";
      settypeid(type);
      setcatid(category_id);
      setsubcatid(sub_category_id);
    }

    axiosInstance
      .post(API_ENDPOINTS.MEDIMART.GET_ECOMM_SEE_ALL_DETAIL, {
        user_id: userid,
        type: type,
        filterby: "",
        subject_id: "",
        category_id: category_id,
        sub_sub_category_id: "",
        sub_category_id: sub_category_id,
      })
      .then((response) => {
        setProductList(response?.data?.data);
        setSubCategory("");
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching Without Category data:", error);
      });
  };

  useEffect(() => {

    if (subId) {
      axiosInstance
        .post(API_ENDPOINTS.MEDIMART.GET_ECOMM_SUBCATEGORY_LIST, {
          user_id: userid,
          cat_id: subId,
        })
        .then((response) => {
          if (response.data.data.subcategory_list.length >= 2) {
            if (
              response.data.data.subcategory_list[0]["sub_category"] ==
              "Subject Book"
            ) {
              handleSubSubCategory(subId, "");
            } else {
              setSubCategory(response.data.data.subcategory_list);
              setLoading(false)
            }
          } else {
            handleSubSubCategory(subId, "");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  useEffect(() => {}, [SubCategoryData]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
  const [loading, setLoading]= useState(true)

  return (
    <div className="SubCategory">
      {SubCategoryData && SubCategoryData.length != 0 ? (
        <>
          <div className="page-content position-relative">
            <div className="breadcrumb-row">
              <div className="container">
                <ul className="list-inline">
                  <li>
                    <a href={"/"}>Home</a>
                  </li>
                  <li>Sub Category</li>
                </ul>
              </div>
            </div>
          </div>
          <section className="book-mod-page book-subcategory">
            {loading?(<ProductListSkeleton/>)
            :(<div className="container">
              <div className="search_br position-relative">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="input-group position-relative">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search for Products"
                      />
                      <button className="btn" type="button">
                        <img
                          src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/search-icon.svg"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="category_detail">
                <div className="row">
                  {SubCategoryData.map((result) => (
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
                      <a
                        href="#"
                        onClick={() => handleSubSubCategory("", result.id)}
                      >
                        <div className="img_bg">
                          <img src={result.subcat_img} alt="" />
                        </div>
                        <div className="link_bg">{result.sub_category}</div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          </section>
        </>
      ) : (
        <SubCategoryProduct
          productlist={ProductList}
          type={typeid}
          category_id={catid}
          sub_category_id={subcatid}
        />
      )}
    </div>
  );
};
export default SubCategory;
