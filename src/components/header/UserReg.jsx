import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../../apiConfig";
import { Link } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import validator from 'validator';
import { API_ENDPOINTS } from "../../ulits/apiConstant";
const UserReg = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  const user_id = Number(sessionStorage.getItem("id"));
  const mobileData = sessionStorage.getItem("mobile");
  const emailData = sessionStorage.getItem("email");

  const [Profiledata, SetProfiledata] = useState([]);
  const resdata = sessionStorage.getItem("userData");
  useEffect(() => {
    const resdata = sessionStorage.getItem("userData");
    const userDataObj = JSON.parse(resdata);
    const device_tokken = userDataObj.device_tokken;
    localStorage.setItem("device_tokken", JSON.stringify(device_tokken));

    const userName = userDataObj.name;
    setUserData(userDataObj);
    sessionStorage.setItem("name", userDataObj.name);
    localStorage.setItem("email", JSON.stringify(userDataObj.email));
  }, []);

  // onchange image upload in react js script
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const username = sessionStorage.getItem("name");
  const [inputFields, setInputFields] = useState({
    fullname: "",
    mbbs_percentage: "",
    profile_img: "",
    mobile: mobileData,
    email: emailData,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const Profile = "Profile";

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image_path", Profile); // Assuming Profile contains the image path
      formData.append("franchise_img", file);

      axiosInstance
        .post(API_ENDPOINTS.PROFILE.PROFILE_IMAGE_UPDATE, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for FormData
          },
        })
        .then((response) => {
          setImagePreviewUrl(response.data.data);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleUploadButtonClick = () => {
    document.getElementById("file-upload").click();
  };

  const validateValues = (inputValues) => {
    let errors = {};
    if (!inputValues.fullname) {
      errors.fullname = "Please enter full name";
    }

    if (!inputValues.email) {
      errors.email = "Please enter email";
    }
    if (!inputValues.mobile) {
      errors.mobile = "Please enter mobile number";
    } else if (
      inputValues.mobile.length <= 9 ||
      inputValues.mobile.length >= 11
    ) {
      errors.mobile = "Please enter a valid mobile number";
    }

    return errors;
  };
  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });

    if (e.target.name == "fullname") {
      errors.fullname = "";
    }
    if (e.target.name == "email") {
      errors.email = "";
    }
    if (e.target.name == "mobile") {
      errors.mobile = "";
    }
  };

  const validateEmail = (email) => {
      return validator.isEmail(email);
    };
  const handleKeyPress = (event) => {
    if (event.target.name === "fullname") {
      const charCode = event.charCode;
      if (
        (charCode >= 65 && charCode <= 90)(charCode >= 97 && charCode <= 122) || // Lowercase letters
        charCode === 32 // Space
      ) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateValues(inputFields);
    setErrors(formErrors);
    setSubmitting(true);

    if (Object.keys(formErrors).length === 0) {
      const dams_tokens = JSON.parse(localStorage.getItem("device_tokken"));
      const profileurl = imagePreviewUrl;
      setLoading(true);
      try {
        setLoading(true);
        const res = await axiosInstance.post(
          API_ENDPOINTS.NEW_REGISRATION.CONTACT_REGISTRATION_V4,
          {
            user_id: user_id,
            mobile: inputFields.mobile,
            email: inputFields.email,
            name: inputFields.fullname,
            dams_tokken: dams_tokens,
            profile_picture: profileurl,
            c_code: "91",
          }
        );

        if (res.status === 200) {
          if (res.data.status === true) {
            toast.success("User Registration successful!");
            const resdata1 = sessionStorage.getItem("userData");
            const userDataObj1 = JSON.parse(resdata1);
            sessionStorage.setItem("jwt_token1", userDataObj1.jwt_token);
            sessionStorage.setItem("userData", JSON.stringify(res.data.data));
            sessionStorage.setItem("is_course_register", "1");
            sessionStorage.setItem("id", res.data.data.id);
            localStorage.setItem("idTocredentials", "1");
            setLoading(false);
            navigate("/");
          } else {
            toast.error(res.data.message);
            setLoading(false);
          }
          window.location.reload();
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="profileUpdation">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>User Contact Detail</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="profileNew">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-sm-4 col-md-3 col-lg-3 col-xl-2 detail-form">
                <div className="small-12 position-relative">
                  <div className="circle">
                    <img
                      className="profile-pic"
                      src={
                        imagePreview
                          ? imagePreview
                          : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                      }
                      loading="lazy"
                      alt="profile"
                    />
                  </div>

                  <div className="p-image">
                    <i
                      className="fa fa-camera upload-button"
                      onClick={handleUploadButtonClick}
                    ></i>
                    <input
                      className="file-upload"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      id="file-upload"
                      name="profile_img"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <p>Upload Profile Picture</p>

                {!imagePreview ? (
                  <div className="text-danger text-left">
                    {errors.profile_img}
                  </div>
                ) : null}
              </div>
              <div className="col-12 col-sm-8 col-md-9 col-lg-9 col-xl-10">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                      <label className="control-label">Full name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullname"
                        value={inputFields.fullname}
                        onChange={handleChange}
                      />
                      {errors.fullname && (
                        <div className="text-danger text-left">
                          {errors.fullname}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                      <label className="control-label">Email</label>

                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={inputFields.email}
                        onChange={handleChange}
                        disabled={emailData ? true : false}
                      />
                      {errors.email && (
                        <div className="text-danger text-left">
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                      <label className="control-label">Phone Number</label>
                      {/* {userData && ( */}
                      <input
                        type="number"
                        className="form-control"
                        name="mobile"
                        value={inputFields.mobile}
                        onChange={handleChange}
                        // disabled={inputFields.mobile.length >=10 && true}
                        disabled={mobileData ? true : false}
                        //readOnly={mobileData ? true : false}
                      />
                      {errors.mobile && (
                        <div className="text-danger text-left">
                          {errors.mobile}
                        </div>
                      )}
                      {/* )} */}
                    </div>
                  </div>

                  <div className="col-md-12 text-center">
                    <button
                      disabled={loading ? true : false}
                      type="submit"
                      className="btn submitBtn"
                      id="btnNext"
                    >
                      {loading ? "Please wait..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UserReg;
