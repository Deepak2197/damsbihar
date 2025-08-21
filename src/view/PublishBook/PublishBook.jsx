import React from "react";
import "../../assets/css/publish-book/style.css";
import "../../assets/css/publish-book/responsive.css";
import { Link } from "react-router-dom";
const PublishBook = () => {
  setTimeout(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, 0);
  return (

    <div className="PunlishBook">
      <div className="page-content position-relative">
          <div className="breadcrumb-row">
            <div className="container">
                <ul className="list-inline">
                    <li><a href={'/'}>Home</a></li>
                    <li>Publish Book</li>
                </ul>
            </div>
          </div>
      </div>
      <div className="container">
        <section className="publish-book">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <div className="img-publish">
                <img src={`${window.IMG_BASE_URL}/book-img.svg`} />
                <h3 className="m-0">Publish Book</h3>
                <Link to={"/publishbookform"}>
                    Want to be an author? Get your own book published
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default PublishBook;
