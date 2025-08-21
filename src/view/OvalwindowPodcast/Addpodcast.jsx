import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/podcast/style.css";
import "../../assets/css/podcast/responsive.css";
const Addpodcast = () => {
  // const [imageSrc, setImageSrc] = useState("podcast/addphoto.svg");
  const [imageSrc, setImageSrc] = useState(
    `${window.IMG_BASE_URL}/emdpublic/podcast/addphoto.svg`
  );

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImageSrc(e.target.result);
        reader.readAsDataURL(file);
      }
    };
  return (
    <div className="">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>Add Podcast</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="addPodcastneW">
        <div className="container">
          <form>
            <div className="row">
              <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <label for="">Add title</label>
                  <input type="email" className="form-control" id="" placeholder="Title"/>
                </div>
              </div>
              <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <label for="">Select Stream</label>
                  <select className="form-control" id="">
                    <option value="none" selected disabled hidden>Select Stream</option>
                    <option>Stream</option>
                    <option>Stream</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <label for="">Select Subject</label>
                  <select className="form-control" id="">
                  <option value="none" selected disabled hidden>Select Subject</option>
                    <option>Subject</option>
                    <option>Subject</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                <div className="form-group">
                  <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                    <img src={imageSrc} alt="Add podcast" />
                    <span>Add Photo</span>
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <textarea className="form-control" rows="2" placeholder="Description"></textarea>
                </div>
              </div>
              <div className="col-md-12">
                <div className='btnGroup'>
                  <button className='btn'><em class="fa fa-plus-circle"></em>Upload Podcast</button>
                  <button className='btn record'><em class="fa fa-microphone"></em>Record Podcast</button>
                </div>
              </div>
              <div className="col-md-12">
                <div className='btnGroup'>
                  <button className='btn sub'>Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Addpodcast

