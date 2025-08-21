import { Button } from "antd";
import React from "react";
import "../Helpsupport/joint.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const QueueTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleticket = () => {
    //const id = sessionStorage.getItem("id");
    navigate(`/raise-query/${id}T`);
  };
  return (
    <div className="RaiseQuery ticketPage">
      <section className="publish-receiptid">
        <div className="container">
          <a className="homebg" href="/">
            Home
          </a>
          <p>Dear, User</p>
          <div className="box-text">
            <h4>
              Your, ticket has been sent to our concern department. once
              reviewed our team will connect you on your phone/email for further
              details.
            </h4>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="reciept-id text-center">
                <h2>
                  Ticket Id :{" "}
                  <b style={{ color: "green" }}>{location?.state?.ticketId}</b>
                </h2>
                <Button
                  onClick={handleticket}
                  style={{ backgroundColor: "orange", margin: "10px" }}
                >
                  View your Ticket
                </Button>
                {/* {/ <a href="<?//php echo base_url().'ebooksales'?>">Return To My Book Sales</a> /} */}
              </div>
              {/* <div className="need-help text-center">
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
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QueueTicket;
