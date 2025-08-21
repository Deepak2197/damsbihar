import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../API/axiosConfig";
import "../../assets/css/Profile/style.css";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [Cbtstream, setCbtstream] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [inputFields, setInputFields] = useState({
    fullname: sessionStorage.getItem("name") || "",
    mbbs_percentage: "",
    profile_img: "",
    stream: "",
    gender: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const user_id = sessionStorage.getItem("id");
  const mobile = sessionStorage.getItem("mobile");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data from session storage
        const resdata = sessionStorage.getItem("userData");
        if (resdata) {
          const userDataObj = JSON.parse(resdata);
          setUserData(userDataObj);
          sessionStorage.setItem("name", userDataObj.name);
          localStorage.setItem("email", JSON.stringify(userDataObj.email));

          // Set initial form values
          setInputFields((prev) => ({
            ...prev,
            fullname: userDataObj.name || "",
          }));
        }

        // Fetch CBT streams
        const streamResponse = await axiosInstance.post(
          "/v2_data_model/get_cbt_stream"
        );
        setCbtstream(streamResponse.data.data);

        // Set default stream if available
        if (streamResponse.data.data?.length > 0) {
          setInputFields((prev) => ({
            ...prev,
            stream: streamResponse.data.data[0].COURSE_ID,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image_path", "Profile");
    formData.append("franchise_img", file);

    axiosInstance
      .post("v2_data_model/upload_profile_image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImagePreviewUrl(response.data.data);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
      });
  };

  const handleUploadButtonClick = () => {
    document.getElementById("file-upload").click();
  };

  const validateValues = (inputValues) => {
    const newErrors = {};
    if (!inputValues.fullname.trim())
      newErrors.fullname = "Please enter full name";
    if (!inputValues.mbbs_percentage)
      newErrors.mbbs_percentage = "Please enter MBBS Percentage";
    if (!inputValues.gender) newErrors.gender = "Please select gender";
    if (!inputValues.dob) newErrors.dob = "Please select date of birth";
    if (!imagePreview) newErrors.profile_img = "Please upload profile image";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateValues(inputFields);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    setSubmitting(true);

    try {
      const is_cbt_type = JSON.parse(localStorage.getItem("is_cbt_type")) || 0;
      const Cbtid = JSON.parse(localStorage.getItem("Cbtid"));
      const email = JSON.parse(localStorage.getItem("email"));

      const profileResponse = await axiosInstance.post(
        "/v2_data_model/get_cbt_user_profile",
        {
          user_id,
          mobile,
          email,
          gender: inputFields.gender,
          name: inputFields.fullname,
          reg_cbt: 1,
          dob: inputFields.dob,
          stream: inputFields.stream,
          region_id: 1,
          percentage_cbt: inputFields.mbbs_percentage,
          profile_picture: imagePreviewUrl,
        }
      );

      if (
        profileResponse.data.data?.reg_cbt === "1" ||
        profileResponse.data.data?.reg_cbt === "0"
      ) {
        const cartResponse = await axiosInstance.post(
          API_ENDPOINTS.CBT.CLEAR_DATA,
          {
            user_id,
            course_id: Cbtid,
            facetofacecenter_id: 4,
            is_cbt: is_cbt_type,
          }
        );

        if (cartResponse.data.status) {
          const addCartResponse = await axiosInstance.post(
            API_ENDPOINTS.CBT.ADD_COURSE_TO_CART,
            {
              user_id,
              course_id: Cbtid,
              facetofacecenter_id: 4,
              is_cbt: is_cbt_type,
            }
          );

          if (addCartResponse.data.status) {
            navigate("/addToCart");
            toast.success("Profile updated successfully");
          }
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="profileUpdation">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>CBT Profile Update</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="profileNew mt-5">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-sm-4 col-md-3 col-lg-2 col-xl-2 detail-form">
                <div className="small-12 position-relative">
                  <div className="circle">
                    <img
                      className="profile-pic"
                      src={imagePreview || "https://i.ibb.co/Qj5Gxvn/avtar.png"}
                      loading="lazy"
                      alt="profile"
                      onClick={handleUploadButtonClick}
                    />
                  </div>
                  <div className="p-image">
                    <input
                      className="file-upload"
                      type="file"
                      accept="image/*"
                      id="file-upload"
                      name="profile_img"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <p>Upload Profile Picture</p>
                {errors.profile_img && (
                  <div className="text-danger text-left">
                    {errors.profile_img}
                  </div>
                )}
              </div>

              <div className="col-12 col-sm-8 col-md-9 col-lg-10 col-xl-10">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                      <label>Stream</label>
                      <select
                        className="form-control"
                        name="stream"
                        value={inputFields.stream}
                        onChange={handleChange}
                      >
                        {Cbtstream.map((option) => (
                          <option
                            key={option.COURSE_ID}
                            value={option.COURSE_ID}
                          >
                            {option.COURSE_NAME}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        className="form-control"
                        value={userData?.email || ""}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={userData?.mobile || ""}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                      <label>Full name</label>
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
                      <label>MBBS Percentage</label>
                      <input
                        type="text"
                        className="form-control"
                        name="mbbs_percentage"
                        value={inputFields.mbbs_percentage}
                        onChange={handleChange}
                      />
                      {errors.mbbs_percentage && (
                        <div className="text-danger text-left">
                          {errors.mbbs_percentage}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group mt-3">
                      <label>Gender</label>
                      <div className="row">
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="form-group position-relative">
                            <input
                              type="radio"
                              name="gender"
                              value="Male"
                              checked={inputFields.gender === "Male"}
                              onChange={handleChange}
                            />
                            <label className="sidelable">Male</label>
                          </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="form-group position-relative">
                            <input
                              type="radio"
                              name="gender"
                              value="Female"
                              checked={inputFields.gender === "Female"}
                              onChange={handleChange}
                            />
                            <label className="sidelable">Female</label>
                          </div>
                        </div>
                        {errors.gender && (
                          <div className="text-danger text-left">
                            {errors.gender}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={inputFields.dob}
                        onChange={handleChange}
                      />
                      {errors.dob && (
                        <div className="text-danger text-left">
                          {errors.dob}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12 text-center mb-5">
                    <button
                      type="submit"
                      className="btn submitBtn"
                      disabled={submitting}
                    >
                      {submitting ? "Processing..." : "Submit"}
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

export default ProfileUpdate;
