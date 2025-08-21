import "../../../assets/css/address-page/style.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../apiConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../API/axiosConfig";
import { API_ENDPOINTS } from "../../../ulits/apiConstant";

const EditNewAddress = () => {
  const user_id = sessionStorage.getItem("id");
  const [addressData, setAddressData] = useState({});
  const [addressPinData, setAddressPinData] = useState(null);

  const [initialAddressData, setInitialAddressData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(API_ENDPOINTS.MY_ADDRESS.GET_ADDRESS, {
          user_id: user_id,
        });
        const address_id = JSON.parse(localStorage.getItem("address_id"));
        const filteredAddress = response.data.data.find(
          (address) => address.id == address_id
        );
        
        setAddressData(filteredAddress);
        getPincodeDetails(filteredAddress.pincode);
        setInitialAddressData(filteredAddress);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });

    if (e.target.name === "pincode") {
      if (e.target.value.length >= 6) {
       
        getPincodeDetails(e.target.value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      JSON.stringify(addressData) === JSON.stringify(initialAddressData)
    ) {
      toast.info("No changes made.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axiosInstance.post(API_ENDPOINTS.MY_ADDRESS.EDIT_ADDRESS, {
        name: addressData.name,
        phone: addressData.phone,
        pincode: addressData.pincode,
        address: addressData.address,
        city: addressPinData?.PostOffice[0]?.District,
        state: addressPinData?.PostOffice[0]?.State,
        country: addressData.country,
        is_default: addressData.is_default == 0 ? "0" : "1",
        latitude: 1111,
        longitude: 1111,
        address_2: addressData.address_2,
        address_id: addressData.id,
        user_id: user_id,
      });
      if (response.data.status === true) {
        navigate("/myaddress");
        toast.success("Address updated successfully.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };
  const getPincodeDetails = (pincode) => {
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((response) => response.json())
      .then((data) => {
        if (data[0].Status === "Success") {
          setAddressPinData(data[0]);
        } else {
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div className="profileUpdation">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>My Address</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="add-new-address">
        <div className="container">
          <div className="editAddress">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <h3>Edit Address</h3>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {Object.keys(addressData).length > 0 && (
                <>
                  <div className="form-group row">
                    <label
                      htmlFor="pincode"
                      className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-form-label"
                    >
                      Pin code
                    </label>
                    <div className="col-8 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        className="form-control"
                        placeholder="Pin code"
                        value={addressData.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-form-label"
                    >
                      Full Name
                    </label>
                    <div className="col-8 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Full Name"
                        value={addressData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="address"
                      className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-form-label"
                    >
                      Address
                    </label>
                    <div className="col-8 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                      <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        rows="3"
                        placeholder="Address"
                        value={addressData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="phone"
                      className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-form-label"
                    >
                      Phone
                    </label>
                    <div className="col-8 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        placeholder="Phone"
                        value={addressData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-form-label"
                      htmlFor="address"
                    >
                      Locality/Landmark
                    </label>
                    <div className="col-8 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                      <input
                        type="text"
                        name="address_2"
                        className="form-control"
                        placeholder="Eg Near fortis Hospital"
                        value={addressData.address_2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputState"
                      className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-form-label"
                    >
                      Country
                    </label>
                    <div className="col-8 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                      <input
                        type="text"
                        disabled
                        name="country"
                        defaultValue={addressPinData?.PostOffice[0]?.Country}
                        className="form-control"
                        placeholder="country"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="inputState"
                      className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-form-label"
                    >
                      State
                    </label>
                    <div className="col-8 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                      <input
                        type="text"
                        disabled
                        name="state"
                        defaultValue={addressPinData?.PostOffice[0]?.State}
                        className="form-control"
                        placeholder="state"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputState"
                      className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-form-label"
                    >
                      City
                    </label>
                    <div className="col-8 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                      <input
                        type="text"
                        disabled
                        name="city"
                        defaultValue={addressPinData?.PostOffice[0]?.District}
                        className="form-control"
                        placeholder="City"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mt-5">
                    <label
                      htmlFor="is_default"
                      className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-form-label"
                    />
                    <div className="col-8 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                      <div className="custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          name="is_default"
                          className="custom-control-input"
                          id="customCheck"
                          checked={addressData.is_default === "1" ? true : false}
                          onChange={(e) =>
                            handleChange({
                              target: {
                                name: e.target.name,
                                value: e.target.checked ? "1" : "0",
                              },
                            })
                          }
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck"
                        >
                          Set This my default address
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 offset-4 offset-sm-4 offset-md-3 offset-lg-2 offset-xl-2">
                      <button type="submit" className="savebtn">
                        Save
                      </button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditNewAddress;
