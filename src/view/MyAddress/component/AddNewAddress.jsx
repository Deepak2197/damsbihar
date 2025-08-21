import "../../../assets/css/address-page/style.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../API/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select, Spin } from "antd";
import MyAddress from "../MyAddress";
import { API_ENDPOINTS } from "../../../ulits/apiConstant";

const AddNewAddress = () => {
  const user_id = sessionStorage.getItem("id");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const initialState = {
    pincode: "",
    name: "",
    address: "",
    phone: "",
    address_2: "",
    country: "",
    state: "",
    city: "",
    user_id: user_id,
    latitude: "11",
    longitude: "1111",
    default: 0,
    code: 0,
    area: ""
  }

  const [formData, setFormData] = useState(initialState);

  const [areaList, setAreaList] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "state") {
      fetchCities(value);
    }

    if (name === "pincode") {
      const onlyDigits = value.replace(/\D/g, "");
      if (onlyDigits.length <= 6) {
        setFormData((prev) => ({ ...prev, pincode: onlyDigits }));
        if (onlyDigits.length === 6) {
          getPincodeDetails(onlyDigits);
        } else {
          // Clear city, state, and country if PIN code is invalid
          setFormData((prev) => ({
            ...prev,
            city: "",
            state: "",
            country: "",
          }));
        }
      }
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, default: e.target.checked ? 1 : 0 });
  };

  const fetchCities = async (stateId) => {
    const requestDatacity = {
      user_id: user_id,
      state: stateId,
    };
    try {
      const response = await axiosInstance.post(
        "/v2_data_model/cities",
        requestDatacity
      );
      if (response.data && response.data.status === true) {
        setCityList(response.data.data);
      } else {
        setCityList([]);
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
      toast.error("Failed to fetch cities.");
    }
  };

  const getPincodeDetails = async (pincode) => {
    setAreaList([])
    if (!pincode || pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit PIN code");
      return;
    }

    try {
      const response = await fetch(
       `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();

      if (
        data &&
        data[0]?.Status === "Success" &&
        data[0].PostOffice?.length > 0
      ) {
        const postOffice = data[0].PostOffice[0];
        setFormData((prev) => ({
          ...prev,
          pincode: pincode,
          state: postOffice.State || "",
          city: postOffice.District || "",
          country: postOffice.Country || "",
          area: postOffice.Name || "",
        }));
        const poNames = data?.[0]?.PostOffice.map((po) => po.Name);
        setAreaList(poNames);
      } else {
        toast.error("Invalid or unknown PIN code");
        setFormData((prev) => ({
          ...prev,
          city: "",
          state: "",
          country: "",
        }));
      }
    } catch (error) {
      console.error("Failed to fetch PIN code details:", error);
      toast.error("Failed to fetch PIN code details. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedAddress = formData.address.trim();

    if (trimmedAddress.split(/\s+/).length < 5) {
      toast.error("Address must contain at least 5 words");
    } else if (formData.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
    } else if (formData.default === 0) {
      toast.warning("Please select this address as default");
    } else {
      try {
        const response = await axiosInstance.post(
          API_ENDPOINTS.MY_ADDRESS.ADD_NEW_ADDRESS,
          formData
        );
        if (response.data.status === true) {
          navigate("/myaddress");
          toast.success("Address added successfully.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error adding address:", error);
        toast.error("Failed to add address. Please try again.");
      }
    }
  };

  // useEffect(() => {
  //   if (user_id) {
  //     const requestData = { user_id: user_id };

  //     // Fetch countries
  //     axiosInstance
  //       .post("/v1_data_model/user/registration/countries", requestData)
  //       .then((response) => {
  //         if (response.data && response.data.status === true) {
  //           setCountryList(response.data.data);
  //         } else {
  //           setCountryList([]);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching countries:", error);
  //       });

  //     // Fetch states
  //     axiosInstance
  //       .post("/v2_data_model/states", requestData)
  //       .then((response) => {
  //         if (response.data && response.data.status === true) {
  //           setStateList(response.data.data);
  //         } else {
  //           setStateList([]);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching states:", error);
  //       });
  //   }
  // }, [user_id]);

  const handleCurrentLocationClick = () => {
      const userConsent = window.confirm(
    "We use your location to show the nearest landmark. Do you want to share it?"
  );

  if (!userConsent) {
    const manualLocation = prompt("Please enter your city or ZIP code:");
    if (manualLocation) {
      console.log("Using manual location:", manualLocation);
      // You can now call your API with this manual location
    }
    return;
  }
    setLoading(true);
    setFormData(initialState)
    navigator.geolocation.getCurrentPosition(showPosition, (error) => {
      console.error("Error getting location:", error);
      toast.error("Failed to get current location.");
      setLoading(false);
    });
  };

  const showPosition = async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const latlon = `latlng=${lat},${lon}&sensor=true&key=AIzaSyCLbStEu7-F25Xw2B46ciyaagAPk-IpYkY`;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?${latlon}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const locationDetails = data.results[0].address_components;
      const addressComponents = data.results[0].address_components;
      const formattedAddress = data.results[0].formatted_address;
      const state = data.results[2]?.address_components[3]?.long_name || "";
      const country = data.results[2]?.address_components[4]?.long_name || "";

      let pincode = "";
      let city = "";
      addressComponents.forEach((component) => {
        if (component.types.includes("postal_code")) {
          pincode = component.long_name;
        } else if (component.types.includes("locality")) {
          city = component.long_name;
        }
      });

      setFormData({
        ...formData,
        address: formattedAddress,
        pincode: locationDetails[8]?.long_name,
        country: locationDetails[7].long_name,
        state: locationDetails[6].long_name,
        city: locationDetails[4].long_name,
      });
      getPincodeDetails(pincode);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching geocode data:", error);
      toast.error("Failed to fetch address details.");
      setLoading(false);
    }
  };

  return (
    <div className="profileUpdation">
      <div className="page-content bg-white position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/addToCart">Add To Cart</Link>
              </li>
              <li>Add Address</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="add-new-address">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <h3>Add a New Address</h3>
              <div className="location" id="currentadd">
                <a onClick={handleCurrentLocationClick} style={{cursor:"pointer"}} >
                  {loading ? (
                    <Spin />
                  ) : (
                    <>
                      <img
                        src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/address-page/current-icon.png"
                        alt="Current Location"
                      />
                      Use My Current Location
                    </>
                  )}
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-3" name="form">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label htmlFor="inputpincode" className="col-form-label">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    className="form-control"
                    placeholder="Pin Code"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group"   >
                  <label htmlFor="inputState" className="col-form-label">
                    Area
                  </label>
                  <Select
                     style={{border:"none"}}
                    className="form-control"
                    placeholder="Area / postOffice"
                    readOnly
                    value={formData.area || "Area / Post Office"}
                    onChange={(value) =>
                      handleChange({ target: { name: "area", value } })
                    }
                  >
                    {areaList.map((areaName, idx) => (
                <Option key={idx} value={areaName} >
                  {areaName}
                </Option>
              ))}
                  </Select>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label htmlFor="inputFullname" className="col-form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label className="col-form-label" htmlFor="address_2">
                    Locality/Landmark
                  </label>
                  <input
                    type="text"
                    name="address_2"
                    className="form-control"
                    placeholder="E.g., Near Fortis Hospital"
                    value={formData.address_2}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label htmlFor="inputCity" className="col-form-label">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label htmlFor="inputState" className="col-form-label">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label htmlFor="inputCountry" className="col-form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label htmlFor="inputnumber" className="col-form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, "");
                      if (onlyDigits.length <= 10) {
                        setFormData({ ...formData, phone: onlyDigits });
                      }
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label className="col-form-label" htmlFor="address">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    rows="3"
                    placeholder="Flat, House No., Building, Company, Apartment"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      name="default"
                      className="custom-control-input"
                      id="customCheck"
                      checked={formData.default === 1}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck"
                    >
                      Set as my default address
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-center">
                <div className="form-group">
                  <button type="submit" name="save" className="savebtn">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddNewAddress;
