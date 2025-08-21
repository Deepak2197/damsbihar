import { useEffect, useState } from "react";
import { Col, Row, Modal, Spin } from "antd";
import { FaUpload, FaTimes, FaHome } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import "../../assets/css/viewprofile/style.css";
import "../../assets/css/viewprofile/responsive.css";
import axiosInstance from "../../API/axiosConfig";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Viewprofile = () => {
  const [avatarImage, setAvatarImage] = useState();
  const [currentField, setCurrentField] = useState(null);
  const [formFields, setFormFields] = useState(null);
  const [images, setImages] = useState([]);
  const [fieldStatus, setFieldStatus] = useState({});
  const [kycForm, setKycForm] = useState({});
  const [editMode, setEditMode] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const user_id = userData.id;

  useEffect(() => {
    defaultUserData();
  }, []);

  // const greenTick =
  //   "https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/study-test/comp-icon.png";
  const greenTick = "{`${window.IMG_BASE_URL}/emdpublic/store/check.svg`}";

  const getFieldStatus = (status) => {
    switch (Number(status)) {
      case 0:
        return { locked: false, label: null };
      case 1:
        return { locked: true, label: "Pending" };
      case 2:
        return { locked: true, imageUrl: greenTick };
      default:
        return { locked: false, label: "Rejected" };
    }
  };

  const defaultUserData = async () => {
    const res = await axiosInstance.post(
      API_ENDPOINTS.PROFILE.PROFILE_INFO,
      {
        user_id,
      }
    );
    const data = res?.data?.data;
    setFormData({
      fullName: data?.name,
      email: data?.email,
      phone: data?.mobile,
      dob: data?.dob,
      gender: data?.gender,
      kycType: data?.document_type,
      image: data?.valid_document_image,
      email_verify_status: data?.email_verify_status,
    });
    setAvatarImage(data?.profile_picture);

    setFieldStatus({
      fullName: getFieldStatus(data?.name_update_status),
      email: getFieldStatus(data?.email_update_status),
      phone: getFieldStatus(data?.mobile_update_status),
      dob: getFieldStatus(data?.dob_update_status),
      gender: getFieldStatus(data?.gender_update_status),
    });

    setEditMode({
      fullName: false,
      email: false,
      phone: false,
      dob: false,
      gender: false,
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      return toast.error("Only JPG and PNG files are allowed");
    }
    const reader = new FileReader();
    reader.onloadend = () => setAvatarImage(reader.result);
    reader.readAsDataURL(file);
    const form = new FormData();
    form.append("franchise_img", file);
    form.append("image_path", user_id);
    form.append("user_id", user_id);
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.PROFILE.PROFILE_IMAGE,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const userProfile = res?.data?.data;
      if (userProfile) {
        setAvatarImage(userProfile);
        await axiosInstance.post(API_ENDPOINTS.PROFILE.PROFILE_IMAGE_UPDATE, {
          user_id,
          user_profile_image: userProfile,
        });
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldEdit = (field) =>
    setEditMode((prev) => ({ ...prev, [field]: true }));

  const handleFieldSave = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: false }));
    setCurrentField(field);
    setFormFields(field);
    setIsModalVisible(true);
  };

  const handleInputChange = (field, value) => {
    if(field === "phone" && value.length > 10) return toast.error("Phone number must be 10 digits");
    setFormData((prev) => ({ ...prev, [field]: value }));
    setCurrentField(field);
  };

  const handleKycImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (!files || !files[0]?.type.startsWith("image/")){
      return toast.error("Only JPG and PNG files are allowed");
    }

    // Store the File object (first one)
    const firstFile = files[0];

    // Set preview image(s)
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      src: URL.createObjectURL(file),
      file, // Keep file reference if needed later
    }));
    setImages((prev) => [...prev, ...newImages]);

    // Store actual file in form state
    setKycForm({
      franchise_img: firstFile, // store the File object here
      image_path: user_id,
      user_id: user_id,
    });
  };

  const handleDeleteImage = (id) =>
    setImages((prev) => prev.filter((img) => img.id !== id));

  const handleKycSave = () => {
    if(formData.kycType && images.length > 0){
        setIsModalVisible(false);
    setIsSecondModalVisible(true);  
    handleSaveProfile(formFields);
    }else{
    return toast.error("Please select ID proof type");
    }
  };

  const handleSaveProfile = async (field) => {
    const form = new FormData();
    form.append("franchise_img", kycForm.franchise_img); // real file
    form.append("image_path", kycForm.image_path);
    form.append("user_id", kycForm.user_id);
    const res = await axiosInstance.post(
     API_ENDPOINTS.PROFILE.PROFILE_IMAGE,
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    const payload = {
      user_id,
      update_name: field === "fullName" ? formData.fullName : "",
      update_email: field === "email" ? formData.email : "",
      update_mobile: field === "phone" ? formData.phone : "",
      update_dob: field === "dob" ? formData.dob : "",
      update_gender: field === "gender" ? formData.gender : "",
      document_type: formData.kycType || "",
      kycDocuments: res.data.data,
      valid_document_image: res.data.data,
    };
    axiosInstance
      .post(API_ENDPOINTS.PROFILE.USER_PROFILE_UPDATE_REQUEST, payload)
      .then(() => {
        setIsSecondModalVisible(false);
        defaultUserData();
        setImages([]);
      });
  };
  return (
    <div className="viewProFile">
      <div className="container">
        <Row>
          <Col span={24}>
            <div className="ProfilePart">
              <div className="avatar-upload">
                <div className="avatar-edit">
                  <input
                    name="profileimg"
                    type="file"
                    id="imageUpload"
                    accept=".png, .jpg, .svg, .jpeg"
                    onChange={handleAvatarChange}
                  />
                  <label htmlFor="imageUpload">
                    <img src="/editprofile/edit.svg" />
                  </label>
                </div>
                <div className="avatar-preview"  >{ loading ? <Spin size="large" style={{ marginTop: "50px" }} /> :
                  <div
                    id="imagePreview"
                    style={{ backgroundImage: `url(${avatarImage})` }}
                  ></div>
                  }
                </div>
                <h3>Edit Profile</h3>
              </div>
            </div>

            <div className="fieldPart">
              {["fullName", "email", "phone", "dob"].map((field) => (
                <div className="listPart position-relative" key={field}>
                  <label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={
                      field === "dob"
                        ? "date"
                        : field === "email"
                        ? "email"
                        : "text"
                    }
                    className={`form-control mb-3 ${
                      editMode[field] ? "editable-input" : ""
                    }`}
                    id={field}
                    value={
                      field === "dob" ? formData[field] : formData[field] || ""
                    }
                    readOnly={!editMode[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                  />
                  <div className="iconFont">
                    {fieldStatus[field]?.locked ? (
                      fieldStatus[field]?.imageUrl ? (
                        <img
                          src={fieldStatus[field].imageUrl}
                          alt="Approved"
                          // style={{ width: "20px", height: "20px" }}
                        />
                      ) : (
                        <span className="badge bg-warning text-dark">
                          {fieldStatus[field].label}
                        </span>
                      )
                    ) : editMode[field] ? (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleFieldSave(field)}
                      >
                        Update
                      </button>
                    ) : (
                      <FaPencil onClick={() => handleFieldEdit(field)} />
                    )}
                  </div>
                </div>
              ))}

              <div className="listPart position-relative">
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  {fieldStatus.gender?.locked ? (
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="form-control-plaintext">
                        {formData.gender || "Not specified"}
                      </span>
                      {fieldStatus.gender.imageUrl ? (
                        <img
                          src={fieldStatus.gender.imageUrl}
                          alt="Approved"
                          style={{ width: "20px", height: "20px" }}
                        />
                      ) : (
                        <span className="badge bg-warning text-dark  ">
                          {fieldStatus.gender.label}
                        </span>
                      )}
                    </div>
                  ) : (
                    <>
                      <select
                        className="form-control"
                        id="gender"
                        value={formData.gender || ""}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                      <div className="iconFont mt-2">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => {
                            setCurrentField("gender");
                            setFormFields("gender");
                            setIsModalVisible(true);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* Stream */}
              <div className="listPart">
                <label htmlFor="input1">Stream</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  id="input1"
                  placeholder="Medical"
                  disabled
                />
              </div>

              {/* College Name */}
              <div className="listPart">
                <div className="form-group">
                  <label htmlFor="collegeName">College Name</label>
                  <select className="form-control" id="collegeName" disabled>
                    <option>All India Institute of Medical Sciences</option>
                    <option>All India Institute</option>
                  </select>
                </div>
              </div>

              {/* College State */}
              <div className="listPart">
                <div className="form-group">
                  <label htmlFor="collegeState">College State</label>
                  <select className="form-control" id="collegeState" disabled>
                    <option>New Delhi</option>
                    <option>Mumbai</option>
                  </select>
                </div>
              </div>

              {/* Admission Year */}
              <div className="listPart">
                <div className="form-group">
                  <label htmlFor="admissionYear">Admission Year</label>
                  <select className="form-control" id="admissionYear" disabled>
                    <option>2024</option>
                    <option>2025</option>
                  </select>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <Modal
        className="updateKYCDetail"
        title={`Upload valid ID proof to update your ${currentField} KYC details.`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <h2>KYC Details</h2>
        <div className="form-group">
          <label htmlFor="kycType">Select Your ID Proof</label>
          <select
            className="form-control"
            id="kycType"
            value={formData.kycType || ""}
            onChange={(e) => handleInputChange("kycType", e.target.value)}
          >
            <option value="">Select</option>
            <option>Aadhar Card</option>
            <option>Voter ID</option>
            <option>PAN Card</option>
          </select>
        </div>
        <div className="form-group">
          <div className="upload__box">
            <div className="upload__btn-box">
              <label className="upload__btn">
                <p className="m-0">
                  Upload Images <FaUpload className="downloadIcon" />
                </p>
                {/* <label>Upload Images</label> */}
                <input
                  className="upload__inputfile"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleKycImageChange}
                />
              </label>
            </div>
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
                    onClick={() => handleDeleteImage(img.id)}
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="btnGrp">
          <button className="btn" onClick={() =>{
              setImages([]);
              setIsModalVisible(false);
          } }>
            Cancel
          </button>
          <button className="btn save" onClick={handleKycSave}>
            Save
          </button>
        </div>
      </Modal>

      <Modal
        className="successModaldetail"
        open={isSecondModalVisible}
        onCancel={() => setIsSecondModalVisible(false)}
        onOk={() => setIsSecondModalVisible(false)}
      >
        <img
          src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/emdpublic/profile/succesful.svg"
          alt="Success"
        />
        <h3>Successfully!</h3>
        <p>Your {currentField} has been updated successfully!</p>
        <button className="homeBtn">
          <FaHome /> Home
        </button>
      </Modal>
    </div>
  );
};

export default Viewprofile;
