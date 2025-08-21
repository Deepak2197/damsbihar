import "../../assets/css/address-page/style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import axiosInstance from "../../API/axiosConfig";
import { Modal } from "antd";
import { HomeOutlined, PhoneOutlined } from "@ant-design/icons";
import NewAddressModal from "./component/NewAddressModal"

const MyAddress = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userid = sessionStorage.getItem("id");
  const user_id = sessionStorage.getItem("id");
  const [data, setData] = useState([]);
  const [selectedid, setselectedid] = useState(null); 
  const [newAddressModal,setNewAddressModal] = useState(false)



  const handleNewAddress =()=>{
    setNewAddressModal(true);
  }


  const initialState = {
    pincode: "",
    name: "",
    address: "",
    phone: "",
    address_2: "",
    country: "",
    state: "",
    city: "",
    user_id,
    latitude: "11",
    longitude: "1111",
    default: 0,
    code: 0,
    area:""
  }

  const [formData, setFormData] = useState(initialState);


  const fetchData = async () => {
    try {
      const response = await axiosInstance.post("/v2_data_model/getAddress", {
        user_id: userid,
      });
      const allAddresses = response.data.data;
      setData(allAddresses);

      const defaultAddress = allAddresses.find(addr => addr.is_default == 1);
      if (defaultAddress) {
        setselectedid(defaultAddress.id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userid,newAddressModal]);

  const handleRemoveCourse = (address_id) => {
    setIsModalOpen(address_id);
  };

  const handleOk = async () => {
    try {
      await axiosInstance.post("v2_data_model/deleteAddress", {
        user_id: userid,
        address_id: isModalOpen,
      });

      setIsModalOpen(false);
      toast.success("Address Deleted Successfully");
      fetchData();
    } catch (error) {}
  };

  const handleEditAddress = (address_id) => {
    localStorage.setItem("address_id", address_id);
    navigate("/editaddress");
  };

  const handleSetdefault = async (address_id) => {
    if (selectedid == address_id) {
      return;
    }
    try {
      const res = await axiosInstance.post("/v2_data_model/setDefaultAddress", {
        user_id: userid,
        address_id: address_id,
      });
      setselectedid(address_id);
      toast.success("Default Addess Selected.");
      fetchData();
    } catch (error) {}
  };

  return (
    <>
      <div className="page-content  position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/addToCart">Add To Cart</a>
              </li>
              <li>My Address</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="address-form">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="address-front position-relative">
                <div className="setOfHeading">
                  <h3>My Addresses </h3>
                  
                    <span className="create-button" onClick={handleNewAddress} style={{cursor:"pointer"}} >Add new Address</span>
                 
                </div>

                <div className="row">
                  {data.length === 0 ? (
                    <p>No Address found</p>
                  ) : (
                    data.map((address, index) => (
                      <div
                        className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
                        key={index}
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className={`default-address ${
                            address.is_default == 1 ? "active" : ""
                          }`}
                        >
                          <a
                            onClick={() => {
                              handleSetdefault(address.id);
                            }}
                          >
                            <div className="position-relative">
                              <h5>{address.name}</h5>

                              {address.is_default == 1 ? (
                                <h4 className="default">Default</h4>
                              ) : null}
                            </div>

                            <p className="position-relative">
                              <HomeOutlined />
                              {address.address}{" "}
                            </p>
                            <p>
                              {address.state}, {address.city}, {address.country}
                            </p>
                            <p>
                              {address.city}: {address.pincode}
                            </p>

                            <p className="mrg-btm0 position-relative">
                              <PhoneOutlined />
                              Phone No. <strong>{address.phone}</strong>
                            </p>
                          </a>
                          <div className="row ">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <div className="edit-update">
                                <a
                                  href="#"
                                  onClick={() => {
                                    handleEditAddress(address.id);
                                  }}
                                >
                                  <i className="fa fa-pencil"></i> Edit
                                </a>

                                <a
                                  style={{ color: "red" }}
                                  onClick={() => {
                                    handleRemoveCourse(address.id);
                                  }}
                                >
                                  <i className="fa fa-trash"></i> Remove
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        title="Delete"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Are you sure want to delete this address</p>
      </Modal>
      <Modal
  title="New Address"
  open={newAddressModal}
  onCancel={() => {
    setNewAddressModal(false);
    setFormData(initialState);
  }}
  footer={null}
>
  <NewAddressModal setNewAddressModal={setNewAddressModal} setFormData={setFormData} formData={formData} />
</Modal>
    </>
  );
};

export default MyAddress;
