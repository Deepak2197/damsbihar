import "../../assets/css/publish-book/style.css";
import "../../assets/css/publish-book/responsive.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../API/axiosConfig";
const PublishbookForm = () => {

  const navigate = useNavigate();
  // setTimeout(() => {
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // }, 0);

  const initialValues = {
    author_name: "",
    email_id: "",
    phone_no: "",
    book_title: "",
    book_price: "",
    book_desc: "",
    eb_pdf_file: "",
  };
  const [formValue, setFormValue] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevValues) => ({ ...prevValues, [name]: value }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors, [name]: "" };

      switch (name) {
        case "author_name":
          if (value.length < 3) {
            newErrors[name] = "Please enter a valid name.";
          }
          break;
        case "email_id":
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(value)) {
            newErrors[name] = "Invalid email format.";
          }
          break;
        case "phone_no":
          if (value.length !== 10) {
            newErrors[name] = "Enter a valid phone number.";
          }
          break;
        case "book_title":
          if (!value.trim()) {
            newErrors[name] = "Enter the title of Book.";
          }
          break;
        case "book_price":
          if (!value.trim()) {
            newErrors[name] = "Enter the price of Book.";
          }
          break;
        case "book_desc":
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

    if (!value.author_name) {
      newErrors.author_name = "Please fill the name field.";
    } else if (value.author_name.length < 3) {
      newErrors.author_name = "Please enter a valid name.";
    }

    if (!value.email_id) {
      newErrors.email_id = "Please fill the email field.";
    } else if (!emailRegex.test(value.email_id)) {
      newErrors.email_id = "Email is invalid.";
    }

    if (!value.phone_no) {
      newErrors.phone_no = "Please fill the phone field.";
    } else if (value.phone_no.length !== 10) {
      newErrors.phone_no = "Phone number should be 10 digits.";
    }

    if (!value.book_title) {
      newErrors.book_title = "Please write the book title.";
    }

    if (!value.book_price) {
      newErrors.book_price = "Please enter the price.";
    }

    if (!value.book_desc) {
      newErrors.book_desc = "Please write description.";
    } else if (
      value.book_desc.length < 20 ||
      value.book_desc.split(" ").length < 5
    ) {
      newErrors.book_desc = "Write at least 5 words.";
    }

    if (!value.eb_pdf_file) {
      newErrors.eb_pdf_file = "Please upload any PDF or ePub.";
    } else {
      newErrors.eb_pdf_file = null;
    }
    return newErrors;
  };
  
  const user_id = sessionStorage.getItem("id");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let author_name = e.currentTarget[0].value;
    let email_id = e.currentTarget[1].value;
    let phone_no = e.currentTarget[2].value;
    let book_title = e.currentTarget[3].value;
    let book_price = e.currentTarget[4].value;
    let book_desc = e.currentTarget[5].value;

    const validationErrors = validateForm(formValue);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      return;
    } else {
      try {
        const response = await axiosInstance.post(
          `/ebook_sales_model/Ebooksales_upload_details`,
          {
            user_id: user_id,
            author_name: formValue.author_name,
            email_id: formValue.email_id,
            phone_no: formValue.phone_no,
            book_title: formValue.book_title,
            book_price: formValue.book_price,
            book_desc: formValue.book_desc,
            eb_pdf_file: formValue.eb_pdf_file,
            // "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          }
        );

        if (response.data.data) {
          localStorage.setItem("Reference_Id", response.data.data.reference_Id);
          localStorage.setItem("Author_Name", author_name);
          toast.success("Your book has been uploaded Successfully!");
          navigate("/reference-list");
          setFormValue(initialValues); // Reset the form values
          setErrors(initialValues); // Clear errors
        }
      } catch (err) {
       
      }
    }
  };

  return (
    <div className="PublishbookForm">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>
                <a href={"/publishbook"}>Publish Book</a>
              </li>
              <li>Fill Details</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="publish-book-detail">
        <div className="container">
          <h3>Want to publish your books ? Send us the content</h3>
          <form
            onSubmit={handleSubmit}
            method="POST"
            enctype="multipart/form-data"
            className="form-field"
            name="form"
          >
            <div className="row">
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label for="author">Author Name</label>
                  <input
                    value={formValue.author_name}
                    onChange={handleChange}
                    type="text"
                    className={`form-control valid-character ${errors.author_name ? "is-invalid" : ""
                      }`}
                    name="author_name"
                    placeholder="Author Name"
                  />
                  {errors.author_name && (
                    <div className="invalid-feedback">{errors.author_name}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    value={formValue.email_id}
                    onChange={handleChange}
                    type="email"
                    name="email_id"
                    className={`form-control ${errors.email_id ? "is-invalid" : ""
                      }`}
                    placeholder="Enter Email"
                  />
                  {errors.email_id && (
                    <div className="invalid-feedback">{errors.email_id}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label for="phone">Phone</label>
                  <input
                    value={formValue.phone_no}
                    onChange={handleChange}
                    type="number"
                    name="phone_no"
                    className={`form-control int-value ${errors.phone_no ? "is-invalid" : ""
                      }`}
                    placeholder="Phone Number"
                    onInput={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue < 0) {
                        e.target.value = ''; 
                      } else if (inputValue.length > 10) {
                        e.target.value = inputValue.slice(0, 10);
                      }
                    }}
                  />
                  {errors.phone_no && (
                    <div className="invalid-feedback">{errors.phone_no}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label for="title">Book Title</label>
                  <input
                    value={formValue.book_title}
                    onChange={handleChange}
                    type="text"
                    name="book_title"
                    className={`form-control int-value ${errors.book_title ? "is-invalid" : ""
                      }`}
                    placeholder="Book Title"
                  />
                  {errors.book_title && (
                    <div className="invalid-feedback">{errors.book_title}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label for="price">Book Estimate Price</label>
                  <input
                    value={formValue.book_price}
                    onChange={handleChange}
                    type="number"
                    name="book_price"
                    className={`form-control int-value ${errors.book_price ? "is-invalid" : ""
                      }`}
                    placeholder="Book Estimate Price"
                  />
                  {errors.book_price && (
                    <div className="invalid-feedback">{errors.book_price}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label for="comment">Book Description</label>
                  <textarea
                    value={formValue.book_desc}
                    onChange={handleChange}
                    className={`form-control ${errors.book_desc ? "is-invalid" : ""
                      }`}
                    minlength="15"
                    rows="5"
                    name="book_desc"
                    placeholder="Book Description"
                  ></textarea>
                  {errors.book_desc && (
                    <div className="invalid-feedback">{errors.book_desc}</div>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="form-group">
                  <label for="price">Upload your book</label>
                  <input
                    onChange={handleChange}
                    value={formValue.eb_pdf_file}
                    type="file"
                    accept=".pdf, .epub"
                    className={`form-control ${errors.eb_pdf_file ? "is-invalid" : ""
                      }`}
                    placeholder=" Upload your book"
                    name="eb_pdf_file"
                  />
                  <img
                    className="download"
                    src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/publish-book/download-icon.svg"
                  />
                  {errors.eb_pdf_file && (
                    <div className="invalid-feedback">{errors.eb_pdf_file}</div>
                  )}
                  <div className="files"></div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
                <div className="form-group">
                  <button
                    type="submit"
                    id="submit"
                    name="save"
                    className="btn btn-primary"
                  >
                    Send Request for Review
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

export default PublishbookForm;
