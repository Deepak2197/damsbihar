import "../../../assets/css/address-page/style.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../API/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spin } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Select } from "antd";
const { Option } = Select;


const AddNewAdressModal = ({ setNewAddressModal, setFormData, formData }) => {
  const user_id = sessionStorage.getItem("id");
  const [cityList, setCityList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pincode") {
      const onlyDigits = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, pincode: onlyDigits }));

      if (onlyDigits.length === 6) {
        getPincodeDetails(onlyDigits);
      } else {
        setFormData((prev) => ({
          ...prev,
          city: "",
          state: "",
          country: "",
          area: "",
        }));
        setAreaList([]);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, default: e.target.checked ? 1 : 0 });
  };

  const getPincodeDetails = async (pincode) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      const postOffices = data?.[0]?.PostOffice;

      if (data?.[0]?.Status === "Success" && postOffices && postOffices.length > 0) {
        const firstPO = postOffices[0];

        setFormData((prev) => ({
          ...prev,
          state: firstPO.State || "",
          city: firstPO.District || "",
          country: firstPO.Country || "",
          area: firstPO.Name || "",
        }));

        const poNames = postOffices.map((po) => po.Name);
        setAreaList(poNames);
      } else {
        toast.error("Invalid or unknown PIN code");
        setFormData((prev) => ({
          ...prev,
          city: "",
          state: "",
          country: "",
          area: "",
        }));
        setAreaList([]);
      }
    } catch (error) {
      toast.error("Failed to fetch PIN code details.");
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
        const { data } = await axiosInstance.post(
          "/v2_data_model/user_cart/UserCartAddress/addNewAddress",
          formData
        );
        if (data?.status) {
          navigate("/myaddress");
          toast.success("Address added successfully");
          setNewAddressModal(false);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to add address. Please try again.");
      }
    }
  };

  const handleCurrentLocationClick = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(showPosition, () => {
      toast.error("Failed to get current location.");
      setLoading(false);
    });
  };

  const showPosition = async ({ coords }) => {
    const latlon = `latlng=${coords.latitude},${coords.longitude}&key=AIzaSyCLbStEu7-F25Xw2B46ciyaagAPk-IpYkY`;
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${latlon}`);
      const data = await response.json();
      const components = data?.results?.[0]?.address_components || [];
      const formattedAddress = data?.results?.[0]?.formatted_address || "";

      let state = "", city = "", country = "", pincode = "";

      components.forEach((c) => {
        if (c.types.includes("administrative_area_level_1")) state = c.long_name;
        if (c.types.includes("locality") || c.types.includes("sublocality")) city = c.long_name;
        if (c.types.includes("country")) country = c.long_name;
        if (c.types.includes("postal_code")) pincode = c.long_name;
      });

      setFormData((prev) => ({
        ...prev,
        address: formattedAddress,
        state,
        city,
        country,
        pincode,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }));
      getPincodeDetails(pincode);
    } catch {
      toast.error("Failed to fetch address from coordinates.");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-outline-primary mb-2"
          onClick={handleCurrentLocationClick}
        >
          <EnvironmentOutlined style={{ marginRight: "6px" }} />
          Use Current Location
        </button>
        {loading && <Spin className="ml-2" />}
      </div>

      <form onSubmit={handleSubmit} className="mt-3" name="form">
        <div className="row">
        <InputField
            placeholder="Pin Code"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
          <InputField
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D/g, "");
              if (onlyDigits.length <= 10) {
                setFormData({ ...formData, phone: onlyDigits });
              }
            }}
          />
          
          <div className="row">
          {/* Area Dropdown */}
          <div className="col-md-6">
            <Select
              name="area"
              value={formData.area || "Area / Post Office"}
              onChange={(value) =>
                handleChange({ target: { name: "area", value } })
              }
              style={{ width: "100%",margin:"10px",height:"50%"}}
              placeholder="Area / Post Office"
              className=""
              
            >
              {areaList.map((areaName, idx) => (
                <Option key={idx} value={areaName}>
                  {areaName}
                </Option>
              ))}
            </Select>
            </div>

            <div className="col-md-6">
                <div className="form-group" style={{marginTop:"10px "}}>
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

         </div>
        

         <div className="col-md-12" >
            <input
              className="form-control"
              name="address"
              rows="3"
              placeholder="Flat, House No., Building..."
              value={formData.address}
              onChange={handleChange}
              style={{ width: "100%" }}
              required
            />
          </div>

          {/* City */}
          
            <InputField
              type="text"
              name="city"
              placeholder="City"
              disabled={true}
              className="form-control"
              value={formData.city}
              onChange={handleChange}
              required
            />
         

          {/* State */}
          <InputField
            className="from-control"
            placeholder="State"
            name="state"
            disabled={true}
            value={formData.state}
            onChange={handleChange}

          />

          {/* Country */}
          <InputField
            placeholder="Country"
            name="country"
            value={formData.country}
                disabled={true}
            onChange={handleChange}
          />

          {/* Address */}
          

          {/* Default Address */}
          <div className="col-md-12 mt-2">
            <input
              type="checkbox"
              id="customCheck"
              checked={formData.default === 1}
              onChange={handleCheckboxChange}
              style={{ margin: "10px" }}
            />
            <label htmlFor="customCheck" className="ml-2">
              Set as my default address
            </label>
          </div>

          <div className="col-md-12 text-center mt-3">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

// Reusable input field
const InputField = ({ label, name, value, onChange ,placeholder,disabled }) => (
  <div className="col-md-4">
    <label>{label}</label>
    <input type="text" name={name} className="form-control"  disabled={disabled} value={value} onChange={onChange} placeholder={placeholder} required />
  </div>
);

export default AddNewAdressModal;
