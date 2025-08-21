import React, { useState } from "react";
import { Col, Row, Steps, Button, theme, Input, Modal } from "antd";
import { FaUpload, FaTimes, FaHome, FaPhoneAlt, FaPlus } from "react-icons/fa";
import "../../assets/css/publish-book/style.css";
import "../../assets/css/publish-book/responsive.css";
const AddProduct = () => {
  const steps = [
    {
      title: "First",
    },
    {
      title: "Second",
    },
    {
      title: "Last",
    },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item, index) => ({
    key: index,
    title: item.title,
  }));

  const [images, setImages] = useState([]);
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file), // Temporary ID
      src: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };
  const handleDeleteImage = (id) => {
    setImages((prevImages) => prevImages.filter((img) => img.id !== id));
  };

  const [videos, setVideos] = useState([]);
  const handleVideoChange = (event) => {
    const files = Array.from(event.target.files);
    const newVideos = files.map((file) => ({
      id: URL.createObjectURL(file), // Temporary ID
      src: URL.createObjectURL(file),
    }));
    setVideos((prevVideos) => [...prevVideos, ...newVideos]);
  };
  const handleDeleteVideo = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };

  const [selectedColors, setSelectedColors] = useState([]);
  const handleColorChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue !== "none" && !selectedColors.includes(selectedValue)) {
      setSelectedColors([...selectedColors, selectedValue]);
    }
  };
  const handleRemoveColor = (color) => {
    setSelectedColors(selectedColors.filter((c) => c !== color));
  };

  const [addresses, setAddresses] = useState([]);
  const addAddress = () => {
    const newAddress = {
      id: addresses.length,
      addressText:
        "A-101, Dams Sector 5, Near Paytm Office, Noida, Uttar Pradesh - 201301",
      contactText: "Amit Jain, +91 9876543210",
    };
    setAddresses([...addresses, newAddress]);
  };
  const updateAddress = (id, field, value) => {
    setAddresses(
      addresses.map((address) =>
        address.id === id ? { ...address, [field]: value } : address
      )
    );
  };
  const removeAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>Add Product</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="addProductSection">
          <Row>
            <Col xl={24}>
              <div>
                <Steps current={current} items={items} />
                <div className="allSteping">
                  <h2>Fill Product Details</h2>
                  {current === 0 && (
                    <div className="stepFirstData">
                      <Row>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <select className="form-control">
                              <option value="none" selected disabled hidden>
                                Select Category
                              </option>
                              <option>Category 1</option>
                              <option>Category 2</option>
                            </select>
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <select className="form-control">
                              <option value="none" selected disabled hidden>
                                Select Product Category
                              </option>
                              <option>Product Category 1</option>
                              <option>Product Category 2</option>
                            </select>
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <select className="form-control">
                              <option value="none" selected disabled hidden>
                                Select Product Sub Category
                              </option>
                              <option>Product Sub Category 1</option>
                              <option>Product Sub Category 2</option>
                            </select>
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Product Type"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Model Name"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Add New Tag"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Enter Price"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Enter Discount Value"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Enter Discount Price"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <select className="form-control">
                              <option value="none" selected disabled hidden>
                                Coupon
                              </option>
                              <option>Coupon 1</option>
                              <option>Coupon 2</option>
                            </select>
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <select className="form-control">
                              <option value="none" selected disabled hidden>
                                Select Vendor
                              </option>
                              <option>Select Vendor 1</option>
                              <option>Select Vendor 2</option>
                            </select>
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type="date"
                              name=""
                              placeholder="Publication Date"
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                  {current === 1 && (
                    <div className="stepFirstData stepSecondData">
                      <Row>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <select className="form-control">
                              <option value="none" selected disabled hidden>
                                Select Product Variant
                              </option>
                              <option>Product Variant 1</option>
                              <option>Product Variant 2</option>
                            </select>
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <select className="form-control">
                              <option value="none" selected disabled hidden>
                                Select Product Sub Variant
                              </option>
                              <option>Product Sub Variant 1</option>
                              <option>Product Sub Variant 2</option>
                            </select>
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Product Tag"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Search Tag"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Stock Keeping Unit (SKU)"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Quantity"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Weight"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Size"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Product Style"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Barcode"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="HS Code"
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                  {current === 2 && (
                    <div className="stepFirstData stepThirdData">
                      <Row>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <div className="upload__box">
                              <div className="upload__btn-box">
                                <label className="upload__btn">
                                  <p className="m-0">
                                    {" "}
                                    Upload Images{" "}
                                    <FaUpload className="downloadIcon" />{" "}
                                  </p>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="upload__inputfile mb-2"
                                  />
                                </label>
                              </div>
                              {/* Image Previews with Delete Button */}
                              <div className="upload__img-wrap d-flex flex-wrap mt-2">
                                {images.map((img) => (
                                  <div
                                    key={img.id}
                                    className="image-preview position-relative me-2 mb-2"
                                  >
                                    <img
                                      src={img.src}
                                      alt="Preview"
                                      className="setImage rounded-lg"
                                    />
                                    <button
                                      className="delete-btn"
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onClick={() => handleDeleteImage(img.id)}
                                    >
                                      <FaTimes size={12} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <div className="upload__box">
                              <div className="upload__btn-box">
                                <label className="upload__btn">
                                  <p className="m-0">
                                    Upload Video{" "}
                                    <FaUpload className="downloadIcon" />
                                  </p>
                                  <input
                                    type="file"
                                    accept="video/*"
                                    multiple
                                    onChange={handleVideoChange}
                                    className="upload__inputfile mb-2"
                                  />
                                </label>
                              </div>
                              {/* Video Previews with Delete Button */}
                              <div className="upload__video-wrap d-flex flex-wrap mt-2">
                                {videos.map((video) => (
                                  <div
                                    key={video.id}
                                    className="image-preview position-relative me-2 mb-2"
                                  >
                                    <video
                                      src={video.src}
                                      controls
                                      className="setVideo rounded-lg"
                                    />
                                    <button
                                      className="delete-btn"
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                        handleDeleteVideo(video.id)
                                      }
                                    >
                                      <FaTimes size={12} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <select
                              className="form-control"
                              onChange={handleColorChange}
                            >
                              <option value="none" hidden>
                                Select Color
                              </option>
                              <option value="Black">Black</option>
                              <option value="Org">Orange</option>
                              <option value="Brwn">Brown</option>
                            </select>

                            {/* Display Selected Colors */}
                            <div className="selected-colors mt-2">
                              {selectedColors.map((color) => (
                                <div
                                  key={color}
                                  className={`color-box ${color.toLowerCase()} p-2 d-inline-block me-2 rounded`}
                                >
                                  {color}
                                  <button
                                    className="delete-btn ms-2 bg-danger text-white border-0 rounded-circle"
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => handleRemoveColor(color)}
                                  >
                                    <FaTimes size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div>
                            <div className="form-group">
                              <div className="upload__box">
                                <div className="upload__btn-box">
                                  <label
                                    className="upload__btn"
                                    onClick={addAddress}
                                  >
                                    <p className="m-0">
                                      Add Address{" "}
                                      <FaPlus className="downloadIcon" />
                                    </p>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div>
                              {addresses.map((address) => (
                                <div
                                  className="addressAdd position-relative"
                                  key={address.id}
                                >
                                  <h2>
                                    <FaHome /> Select Pickup Address
                                  </h2>
                                  <textarea
                                    type="text"
                                    value={address.addressText}
                                    onChange={(e) =>
                                      updateAddress(
                                        address.id,
                                        "addressText",
                                        e.target.value
                                      )
                                    }
                                    className="address-input"
                                  ></textarea>
                                  <h3>
                                    <FaPhoneAlt />
                                    <input
                                      type="text"
                                      value={address.contactText}
                                      onChange={(e) =>
                                        updateAddress(
                                          address.id,
                                          "contactText",
                                          e.target.value
                                        )
                                      }
                                      className="contact-input"
                                    />
                                  </h3>
                                  <button
                                    className="remove-btn"
                                    onClick={() => removeAddress(address.id)}
                                  >
                                    X
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                          <div className="form-group">
                            <Input
                              id=""
                              className="form-control"
                              type=""
                              name=""
                              placeholder="Enter GST No."
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                </div>
                <div style={{ marginTop: 24 }}>
                  {current > 0 && (
                    <Button style={{ margin: "0 8px" }} onClick={prev}>
                      Back
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button type="primary" onClick={showModal}>
                      Submit
                    </Button>
                  )}
                  {current < steps.length - 1 && (
                    <Button type="primary" onClick={next}>
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </section>

        <>
          <Modal
            className="receiptModal"
            title=""
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={
              <div className="customModalFooter">
                <button className="btn sales">Back To My Product Sales</button>
              </div>
            }
          >
            <img
              src={`${window.IMG_BASE_URL}/emdpublic/podcast/success.svg`}
              alt="Success"
            />
            <h2>Congratulation!</h2>
            <h3>Your product has been successfully uploaded.</h3>
            <h4>Receipt ID: 0025325</h4>
            <p>
              Your content has been sent to our concerned department. Once
              reviewed, our team will contact you via phone/email for further
              details.
            </p>
          </Modal>
        </>
      </div>
    </>
  );
};

export default AddProduct;
