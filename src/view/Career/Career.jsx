import React, { useState, useEffect } from "react";
import "../../assets/css/career/style.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../API/axiosConfig";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import validator from "validator";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Career = () => {
  const resdat = sessionStorage.getItem("id");
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };
  const [formValue, setFormValue] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevValues) => ({ ...prevValues, [name]: value }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors, [name]: "" };

      switch (name) {
        case "name":
          if (value.length < 3) {
            newErrors[name] = "Please enter a valid name.";
          }
          break;
        case "email":
          if (!validator.isEmail(value)) {
            newErrors[name] = "Invalid email format.";
          }
          break;
        case "phone":
          if (value.length !== 10) {
            newErrors[name] = "Enter a valid phone number.";
          }
          break;
        case "subject":
          if (!value.trim()) {
            newErrors[name] = "Enter the subject.";
          }
          break;
        case "message":
          if (value.length < 20 || value.split(" ").length < 5) {
            newErrors[name] = "Write at least 5 words.";
          }
          break;
        default:
          break;
      }

      return newErrors;
    });
  };

  const validateForm = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let newErrors = { ...initialValues };

    if (!value.name) {
      newErrors.name = "Please fill the name field.";
    } else if (value.name.length < 3) {
      newErrors.name = "Please enter a valid name.";
    }

    if (!value.email) {
      newErrors.email = "Please fill the email field.";
    } else if (!emailRegex.test(value.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!value.phone) {
      newErrors.phone = "Please fill the phone field.";
    } else if (value.phone.length !== 10) {
      newErrors.phone = "Phone number should be 10 digits.";
    }

    if (!value.subject) {
      newErrors.subject = "Please fill the subject field.";
    }

    if (!value.message) {
      newErrors.message = "Please fill the message field.";
    } else if (
      value.message.length < 20 ||
      value.message.split(" ").length < 5
    ) {
      newErrors.message = "Write at least 5 words.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formValue);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      return;
    } else {
      try {
        const res = await axiosInstance.post(API_ENDPOINTS.CAREER.QUERY, {
          name: formValue.name,
          email: formValue.email,
          mobile: formValue.phone,
          title: formValue.subject,
          description: formValue.message,
        });
        const response = await axiosInstance.post(
          API_ENDPOINTS.CAREER.ADD_CRM_LEAD,
          {
            lead_name: formValue.name,
            email: formValue.email,
            mobile: formValue.phone,
            title: formValue.subject,
            lead_source: 2,
          }
        );
        if (response.data.status === true) {
          toast.success("Form has been submitted!");
          setFormValue(initialValues); // Reset the form values
          setErrors(initialValues); // Clear errors
        } else {
          toast.error(response.data.error.email || response.data.error.mobile);
        }

        if (res.data.status === true) {
          toast.success("Form has been submitted.");
          setFormValue(initialValues); // Reset the form values
          setErrors(initialValues); // Clear errors
        } else {
          toast.error(res.data.error.email || res.data.error.mobile);
        }
      } catch (err) {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const handleApply = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setErrors(false);
    setFormValue(initialValues);
  };
  const handleShow = () => {
    setShow(true);
    setErrors(false);
    setFormValue(initialValues);
  };

  return (
    <div className="Career">
      <div className="page-content bg-white position-relative">
        <div className="breadcrumb-row custombread">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>Career</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bannerData">
        <div className="commanColor"></div>
        <div className="container">
          <div className="carrerData">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8 col-12">
                <h1>Career</h1>
                <h3>(If You Have The Passion to Teach and Excel)</h3>
                <p>
                  Since 1999 Delhi Academy of Medical Sciences (DAMS) has
                  nurtured and led hundreds of students to PG Medical Entrance
                  Success. At DAMS, we are working toward a future where
                  everyone's potential can be fulfilled and we're growing fast
                  through our impact.
                </p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                <div className="banner-img">
                  {/* <img
                    src={`${window.IMG_BASE_URL}/career-1.png`}
                    loading="lazy" alt="icon image"
                  /> */}
                  <img src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/revamp-web/etc/career.png"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-area pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="site-heading">
                <h2 className="sblue">Career at DAMS</h2>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-12">
              <p>
                For more than two decades Delhi Academy of Medical Sciences Pvt.
                Ltd. (DAMS) has nurtured and led hundreds of students to PG
                Medical Entrance Success. At DAMS, we are working toward a
                future where everyone's potential can be fulfilled and we're
                growing fast through our impact.
              </p>
              <p className="m-0">
                DAMS is committed to being a great place to work. We are
                committed to making a big difference in the world. If you want
                substantial difference through your work, and want to have fun
                in a challenging yet supportive environment, take a look at the
                positions we have currently available:
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="feature-container">
                <div className="Career-box text-center">
                  <img className="newmg" src="/web/position-head.svg" />
                  {/* <img
                    className="newmg"
                    src={`${window.IMG_BASE_URL}/icon2.svg`}
                    loading="lazy"
                    alt="icon image"
                  /> */}
                </div>
                <div className="icon-content">
                  <h5 className="text-center">Position Heading</h5>
                  <p className="text-center fixed-con">
                    Preferably well educated female for working with our medical
                    students and doctors. Explain our courses to them and
                    motivate them. Salary is no bar for deserving candidates.
                  </p>
                  <div className="text-center">
                    <Link to={"#"} className="btn-design" onClick={handleShow}>
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="feature-container">
                <div className="Career-box text-center">
                  <img className="newmg" src="/web/marketing-manager.svg" />
                  {/* <img
                    className="newmg"
                    src={`${window.IMG_BASE_URL}/icon1.svg`}
                    loading="lazy"
                    alt="icon image"
                  /> */}
                </div>
                <div className="icon-content">
                  <h5 className="text-center">Marketing Manager</h5>
                  <p className="text-center fixed-con">
                    Preferably well educated female for working with our medical
                    students and doctors. Explain our courses to them and
                    motivate them. Salary is no bar for deserving candidates.
                  </p>
                  <div className="text-center">
                    <Link to={"#"} className="btn-design" onClick={handleShow}>
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="feature-container trn">
                <div className="Career-box text-center">
                  <img className="newmg" src="/web/faculty-student.svg" />
                  {/* <img
                    className="newmg"
                    src={`${window.IMG_BASE_URL}/icon2.svg`}
                    loading="lazy"
                    alt="icon image"
                  /> */}
                </div>
                <div className="icon-content">
                  <h5 className="text-center">
                    Faculty to train students for PG Medical Entrance
                  </h5>
                  <p className="text-center fixed-con">
                    Preferably well educated female for working with our medical
                    students and doctors. Explain our courses to them and
                    motivate them. Salary is no bar for deserving candidates.
                  </p>
                  <div className="text-center">
                    <Link to={"#"} className="btn-design" onClick={handleShow}>
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="feature-container trn">
                <div className="Career-box text-center">
                  <img className="newmg" src="/web/admin-executive.svg" />
                  {/* <img
                    className="newmg"
                    src={`${window.IMG_BASE_URL}/icon3.svg`}
                    loading="lazy"
                    alt="icon image"
                  /> */}
                </div>
                <div className="icon-content">
                  <h5 className="text-center">Admin Executives</h5>
                  <p className="text-center fixed-con">
                    Preferably well educated female for working with our medical
                    students and doctors. Explain our courses to them and
                    motivate them. Salary is no bar for deserving candidates.
                  </p>
                  <div className="text-center">
                    <Link to={"#"} className="btn-design" onClick={handleShow}>
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-area sinceSec">
        <div className="container">
          <div className="row" style={{ background: "#fff" }}>
            <div className="col-lg-12 car">
              <div className="row align-center">
                {/* <div className="col-lg-3 col-md-3 col-sm-3 col-12 carthumb thumb">
                  <img
                    src={`${window.IMG_BASE_URL}/career.png`}
                    loading="lazy"
                    alt="Thumb"
                  />
                </div> */}
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 info">
                  <p class="set">
                    Since 1999 Delhi Academy of Medical Sciences (DAMS) has
                    nurtured and led hundreds of students to PG Medical Entrance
                    Success. At DAMS, we are working toward a future where
                    everyone's potential can be fulfilled and we're growing fast
                    through our impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-area formArea">
        <div className="container">
          {/* <h2>Get In Touch</h2> */}
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
              <form className="contact-bx ajax-form" onSubmit={handleSubmit}>
                <div className="ajax-message"></div>
                <div className="touch">
                  <h2>Get In Touch</h2>
                  <p>
                    Please take a moment to get in touch, we will get back to
                    you shortly.
                  </p>
                </div>
                <div className="setOfform">
                  <div className="column">
                    <div className="form-group">
                      <input
                        name="name"
                        value={formValue.name}
                        placeholder="Your Name"
                        type="text"
                        onChange={handleChange}
                        className={`form-control valid-character ${
                          errors.name ? "is-invalid" : ""
                        }`}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        name="email"
                        value={formValue.email}
                        onChange={handleChange}
                        placeholder="Your Email Address"
                        type="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        name="phone"
                        value={formValue.phone}
                        onChange={handleChange}
                        placeholder="Your Phone"
                        type="number"
                        className={`form-control int-value ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">{errors.phone}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        name="subject"
                        onChange={handleChange}
                        value={formValue.subject}
                        placeholder="Subject"
                        type="text"
                        className={`form-control ${
                          errors.subject ? "is-invalid" : ""
                        }`}
                      />
                      {errors.subject && (
                        <div className="invalid-feedback">{errors.subject}</div>
                      )}
                    </div>
                  </div>

                  <div className="column">
                    <div className="form-group">
                      <textarea
                        name="message"
                        onChange={handleChange}
                        value={formValue.message}
                        placeholder="Type Message"
                        rows="4"
                        className={`form-control ${
                          errors.message ? "is-invalid" : ""
                        }`}
                      ></textarea>
                      {errors.message && (
                        <div className="invalid-feedback">{errors.message}</div>
                      )}
                    </div>
                    <button
                      className="button-md contact_us_new sendbtn"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* <div className="col-12 col-md-6 col-lg-5 get-touch-img">
              <img
                src={`${window.IMG_BASE_URL}/get-in-touch.png`}
                loading="lazy"
                alt="Thumb"
              />
            </div> */}
          </div>
        </div>
      </div>

      <div className="container">
        <Modal show={show} onHide={handleClose} className="carrerModel">
          <Modal.Header closeButton>
            <Modal.Title>Position Apply</Modal.Title>
          </Modal.Header>
          <Modal.Body className="content">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                <form className="contact-bx" onSubmit={handleSubmit}>
                  <div className="ajax-message"></div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          name="name"
                          value={formValue.name}
                          placeholder="Your Name"
                          type="text"
                          onChange={handleChange}
                          className={`form-control valid-character ${
                            errors.name ? "is-invalid" : ""
                          }`}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          name="email"
                          value={formValue.email}
                          onChange={handleChange}
                          placeholder="Your Email Address"
                          type="email"
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          name="phone"
                          value={formValue.phone}
                          onChange={handleChange}
                          placeholder="Your Phone"
                          type="number"
                          className={`form-control int-value ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                        />
                        {errors.phone && (
                          <div className="invalid-feedback">{errors.phone}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          name="subject"
                          onChange={handleChange}
                          value={formValue.subject}
                          placeholder="Subject"
                          type="text"
                          className={`form-control ${
                            errors.subject ? "is-invalid" : ""
                          }`}
                        />
                        {errors.subject && (
                          <div className="invalid-feedback">
                            {errors.subject}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <textarea
                          name="message"
                          onChange={handleChange}
                          value={formValue.message}
                          placeholder="Type Message"
                          rows="4"
                          className={`form-control ${
                            errors.message ? "is-invalid" : ""
                          }`}
                        ></textarea>
                        {errors.message && (
                          <div className="invalid-feedback">
                            {errors.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 text-center mt-3">
                      <button className="sendbtn" type="submit">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Career;
