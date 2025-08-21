import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosConfig";
import { Spinner } from "react-bootstrap";
import "../Contact/style.css";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Contactus = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };
  const [formValue, setFormValue] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  const [loading, setLoading] = useState(false);

  const [addressList, setAddressList] = useState([]);
  const addOne = addressList?.filter((itm) => itm.for_office === "1");
  const addto = addressList?.filter((itm) => itm.for_office === "2");

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
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(value)) {
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          API_ENDPOINTS.CONTACT_US.CORPORATE_OFFICE
        );
        setAddressList(response.data.data.footer_list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formValue);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      return;
    } else {
      try {
        setLoading(true);
        const res = await axiosInstance.post(API_ENDPOINTS.CONTACT_US.QUERY, {
          name: formValue.name,
          email: formValue.email,
          mobile: formValue.phone,
          title: formValue.subject,
          description: formValue.message,
        });
        if (res.data.status === true) {
          toast.success("Form has been submitted....");
          setFormValue(initialValues); // Reset the form values
          setErrors(initialValues); // Clear errors
          setLoading(false);
        } else {
          toast.error(res.data.error.email || res.data.error.mobile);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="Contactus position-relative">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="commanColor"></div>
      <div className="container">
        <div className="contactBanner">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
              <div className="contactForm">
                <div className="row">
                  <div className="col-12 col-lg-6 col-md-6">
                    <h2>Get in touch with us</h2>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            name="name"
                            value={formValue.name}
                            onChange={handleChange}
                            // onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            type="text"
                            className={`form-control valid-character ${
                              errors.name ? "is-invalid" : ""
                            }`}
                          />
                          {errors.name && (
                            <div className="invalid-feedback">
                              {errors.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            value={formValue.email}
                            onChange={handleChange}
                            name="email"
                            placeholder="Your Email Address"
                            type="email"
                            className={`form-control ${
                              errors.email ? "is-invalid" : ""
                            }`}
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
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
                            <div className="invalid-feedback">
                              {errors.phone}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            value={formValue.subject}
                            onChange={handleChange}
                            name="subject"
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
                            value={formValue.message}
                            onChange={handleChange}
                            name="message"
                            placeholder="Type Message"
                            rows="4"
                            className={`textareabg ${
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
                      <div className="col-lg-12">
                        <button
                          className="btn button-md sendMsg"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          {loading ? <Spinner size="sm" /> : "Send Message"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-6 col-md-6 col-lg-6">
                    <div className="leftImg">
                      <img
                        src={`${window.IMG_BASE_URL}/contact-img.png`}
                        alt="contact"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="contact-page">
          <div className="row">
            <div className="col-12 col-lg-7 col-md-12">
              <div className="contact-info-bx">
                <div className="ConIfo">
                  <h2 className="mb-2">Contact Information</h2>
                  <p className="mb-2">
                    We'd love to help you. You can also contact us on the
                    below-stated modes.
                  </p>
                </div>
                <div className="corporateOffice">
                  <h2>Corporate Office</h2>
                  {addOne?.map((itm, i) => (
                    <ul>
                      <li>
                        <em className="fa fa-map-marker"></em>
                        {itm.address}
                      </li>
                      <li>
                        <em className="fa fa-phone"></em>
                        {itm.phone}
                      </li>
                      <li>
                        <em className="fa fa-envelope"></em> {itm.email}
                      </li>
                    </ul>
                  ))}
                </div>

                <div className="classRoomCenter">
                  <h2 className="mb-2">Classroom Center</h2>
                  {addto.map((eventcat, i) => (
                    <div key={i} className="mb-4">
                      <ul>
                        <li>
                          <em className="fa fa-map-marker"></em>{" "}
                          {eventcat.address}
                        </li>
                        <li>
                          <em className="fa fa-phone"></em> {eventcat.phone}
                        </li>
                        {eventcat.email && eventcat.email.trim() !== "" && (
                          <li>
                            <em className="fa fa-envelope"></em>{" "}
                            {eventcat.email}
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>

                <ul className="contact-social">
                  <li>
                    <a href="https://www.facebook.com/damsdelhiho/">
                      <img
                        src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/Fb.png"
                        alt="fb"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/dams_delhi/">
                      <img
                        src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/Insta.png"
                        alt="insta"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/damsdelhi">
                      <img
                        src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/X.png"
                        alt="x"
                      />
                    </a>
                  </li>

                  <li>
                    <a href="https://www.linkedin.com/school/dams-emedicoz/">
                      <img
                        src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/Lin.png"
                        alt="lin"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-5 col-md-12 col-lg-5">
              <div className="mapBg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56069.7241538836!2d77.15950734659364!3d28.55901786900714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3162cfd3333%3A0x436e168c82259356!2sDelhi%20Academy%20of%20Medical%20Sciences%20(P)%20Ltd!5e0!3m2!1sen!2sin!4v1714049719437!5m2!1sen!2sin"
                  width="100%"
                  height="650"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Delhi Academy of Medical Sciences Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contactus;
