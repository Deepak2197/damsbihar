import React, { useState, useEffect } from "react";
import "../../assets/css/course-plan/style.css"

function SubscriptionDate() {
   const closeSubcrictionInModal = () => {
      setShowPopupSubscription(false);
   };
   return (
      <>
         <div className="modal subscription show" id="buy_now968" style={{ display: 'block', paddingLeft: '0' }}>
            <div className="modal-dialog">
               <div className="modal-content">
                  <input type="hidden" name="allow_course_date_select" id="allow_course_date_select968" value="1" />
                  <div className="modal-header ">
                     <h4 className="modal-title Class_className__yAM1H">Select Plan Subscription</h4>
                     <button type="button" className="close" data-dismiss="modal">×</button>
                  </div>
                  <div className="modal-body" id="append_online_course968">
                     <h3>Validity: <span>1 Year</span></h3>
                     <section className="select-datebg">
                        <input type="hidden" name="start_date_set" id="start_date_set" />
                        <div className="container">
                           <div className="row">
                              <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mobile-pd">
                                 <div className="select-imgbg">
                                    <img src="https://dev.emedicoz.com/qa/emedicoz-partner/assets/images/face-to-face/selectd-img.svg" loading="lazy" alt="icon image" />
                                 </div>
                              </div>
                              <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mobile-pd">
                                 <h3 className="m-0 text-left">Choose your course start date</h3>
                                 <div className="row">
                                    <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 mobile-pd">
                                    <a href="#"onClick={(e) => {e.preventDefault();}}>
                                          <div className="date-group active position-relative">
                                             <h2>Today</h2>
                                             <em className="fa fa-check"></em>
                                          </div>
                                       </a>
                                    </div>
                                    <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 mobile-pd">
                                       <div className="or">
                                          <h2>OR</h2>
                                       </div>
                                    </div>
                                    <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 mobile-pd">
                                       <a href="#"onClick={(e) => {e.preventDefault();}}>
                                          <div className="date-group position-relative fechadate" id="datepicker">
                                             <div className="datepicker date input-group">
                                                <input type="text" placeholder="Select Date" className="form-control jey" id="fecha1" value="" data-date-format="dd-mm-yyyy" />
                                                <div className="input-group-append"></div>
                                             </div>
                                             <em className="fa fa-check"></em>
                                          </div>
                                       </a>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="col-12 col-sm-12 col-ms-12" id="appendcources968">
                                       <div className="validity">
                                          <ul>
                                             <input type="hidden" value="0" name="is_reg_amount_show" id="is_reg_amount_show" />
                                             <input type="hidden" value="100" name="course_registration_amount" id="course_registration_amount" />
                                             <li>Validity: <span><strong>10 Days</strong></span></li>
                                             <br />
                                             <li>Start Date: <span><strong>12-02-2024</strong></span></li>
                                             <li className="float-right">End Date: <span><strong>21-02-2024</strong></span></li>
                                          </ul>
                                       </div>
                                       <div className="pro-text">
                                          <h3>Validity as per your chosen subscription and start date.</h3>
                                          <a href="#" className="proceed" onClick={() => cart_add('2')}>PROCED TO PAY</a>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </section>

                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
export default SubscriptionDate