import "../../assets/css/publish-book/style.css";
import "../../assets/css/publish-book/responsive.css";
import React, { useState,useEffect } from 'react';
const ReferenceList = () => {
    const Reference_Id = localStorage.getItem("Reference_Id");
    const Author_Name = localStorage.getItem("Author_Name");
    
    

setTimeout(() => {
window.scroll({
top: 0,
left: 0,
behavior: "smooth",
});
}, 0);
  
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
            </ul>
          </div>
        </div>
      </div>
      <section className="publish-receiptid">
        <div className="container">
          <p>Dear, {Author_Name}</p>
          <div className="box-text">
            <h4>
              You, content has been sent to our concern department. once
              reviewed our team will connect you on your phone/email for further
              details.
            </h4>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="reciept-id text-center">
                <h2>Receipt Id : {Reference_Id}</h2>
                {/* <a href="<?//php echo base_url().'ebooksales'?>">Return To My Book Sales</a> */}
              </div>
              <div className="need-help text-center">
                <h3 className="m-0">Need Help?</h3>
                <ul className="m-0 link-btn">
                  <li>
                    <i className="fa fa-envelope"></i>
                    <a href="mailto:support@damsdelhi.com">
                      support@damsdelhi.com
                    </a>
                  </li>
                  <li>
                    <i className="fa fa-whatsapp"></i>
                    <a href="tel:9899664533">+91 9899664533</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ReferenceList;
