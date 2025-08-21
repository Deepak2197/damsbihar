import React from "react"
import "../../assets/newjs/style.css";
import "../../assets/new_design/css/style.css";
import "../../assets/css/home-page/responsive.css";
import "../../assets/css/shortcodes/shortcodes.css";
import "../../assets/css/mega-menu.css"

function EditProfile(){
  return (
    <>
      <div className="breadcrumb-row">
        <div className="container">
          <ul className="list-inline">
            <li>
              <a href="https://damsdelhi.com/">Home</a>
            </li>
            <li>Profile</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-12 m-b30 d-none d-sm-block">
        <div className="profile-bx text-center">
          <div className="user-profile-thumb">
            <a href="">
              <img
                src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                loading="lazy"
                alt="icon image"
              />
            </a>
          </div>
          <a href=""></a>
          <div className="profile-info">
            <a href=""></a>
            <a href="https://damsdelhi.com/experts/expert_profile/293356">
              <h4>Dummy Two</h4>
            </a>
            <span>damsdummytwo@gmail.com</span>
          </div>
          <div className="profile-social">
            <ul className="list-inline m-a0 follow">
              <li>
                <p>0</p>
                <h6>Followers</h6>
              </li>
              <li>
                <p>6</p>
                <h6>Following</h6>
              </li>
              <li>
                <p>0</p>
                <h6>Post</h6>
              </li>
            </ul>
          </div>
          <div className="profile-tabnav">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://damsdelhi.com/edit_profile"
                >
                  Edit Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditProfile