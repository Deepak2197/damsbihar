import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Toast } from "bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../API/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getcbtRegionId } from "../../network/cartSlice";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const SelectLocation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cbtCitytData, setCbtCityData] = useState([]);
  const Cbtid = JSON.parse(localStorage.getItem("Cbtid"));

  const is_cbt_type = JSON.parse(localStorage.getItem("is_cbt_type"));
  const [Search, setSearch] = useState("");
  const [filterlist, setfilterlist] = useState([]);
  const user_id = sessionStorage.getItem("id");

  useEffect(() => {
    axiosInstance
      .post(API_ENDPOINTS.CBT.GET_CBT_CITY, {
        cbt_id: Cbtid,
      })
      .then((response) => {
        setCbtCityData(response?.data?.data);
        setfilterlist(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching Cbt city data list:", error);
      });
  }, []);

  const filterData = () => {
    const data = cbtCitytData.filter((itm) =>
      itm.city_name.toLowerCase().includes(Search.toLowerCase())
    );
    setfilterlist(data);
  };

  useEffect(() => {
    filterData();
  }, [Search]);

  const handlecityClick = async (region_id) => {


    try {
      dispatch(getcbtRegionId(region_id));
      //localStorage.setItem("region_id", JSON.stringify(region_id));
      const res = await axiosInstance.post(API_ENDPOINTS.CBT.GET_CBT_USER, {
        user_id: user_id,
      });
      if (
        res?.data?.data?.reg_cbt === "0" ||
        res?.data?.data?.reg_cbt === null
      ) {
        navigate("/profile-update");
      } else {
        const response1 = await axiosInstance.post(API_ENDPOINTS.CBT.CLEAR_DATA, {
          user_id: user_id,
          course_id: Cbtid,
          facetofacecenter_id: "",
          is_cbt: is_cbt_type,
        });
        // dispatch(clearCart())
        if (response1.data.status === true) {
          const response = await axiosInstance.post(
            API_ENDPOINTS.CBT.ADD_COURSE_TO_CART,
            {
              user_id: user_id,
              course_id: Cbtid,
              facetofacecenter_id: "",
              is_cbt: 1,
            }
          );
          if (response.data.status === true) {
            toast.success(response.data.message);
            navigate("/addToCart", {
              state: {
                isCbtID: response.data.data?.is_cbt,
                isRegionID: region_id,
              },
            });
          } else if (response.data.status == false) {
            toast.error(response.data.message);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="select-location">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>Select Location</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="CbtSelectexam cbtLocate">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-12">
              <div className="search_btng position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for your city"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Link to="#">
                  <i className="fa fa-search"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="tab-content">
                <div id="new-delhi" className="tab-pane active">
                  <div className="show_data_city11">
                    <h2>Select City</h2>
                    <div className="row">
                      {filterlist ? (
                        filterlist.map((citylist, index) => (
                          <div
                            onClick={() => handlecityClick(citylist.id)}
                            className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 position-relative show_data_city"
                            key={index}
                          >
                            <Link>
                              <em className="fa fa-map-marker"></em>{" "}
                              {citylist.city_name}
                            </Link>
                          </div>
                        ))
                      ) : (
                        <div>No data available</div>
                      )}
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

export default SelectLocation;
