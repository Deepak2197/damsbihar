import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../../assets/css/event/style.css";
import ticket from "../img/ticket.svg";
import axiosInstance from "../../../API/axiosConfig";
import { Skeleton } from "antd";

const EventTicket = () => {
  const [ticketData, setTicketData] = useState([]);
  const user_id = sessionStorage.getItem("id");
  const location = useLocation();
  const { eventId } = location.state || {};
  const [spin, setspin] = useState(false);
  const getEventTicket = async () => {
    setspin(true);
    try {
      const response = await axiosInstance.post(
        `/v2_data_model/get_event_ticket_by_id`,
        { user_id: user_id, event_id: eventId }
      );
      setTicketData(response?.data?.data?.ticket_ditaile);
      setspin(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (eventId) {
      getEventTicket();
    }
  }, [eventId]);

  return (
    <div className="">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Tickets</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="eventTicket">
          <div className="row">
            <Skeleton active loading={spin} paragraph={{ rows: 4 }}>
              <div className="col-12">
                <div className="ticketPart">
                  <img className="head" src={ticket} alt="Locate" />
                  <h1>{ticketData?.title}</h1>
                  <p>{ticketData?.company_name}</p>
                  <div className="ticketRip">
                    <div className="circleLeft"></div>
                    <div className="ripLine"></div>
                    <div className="circleRight"></div>
                  </div>
                  <p>Location</p>
                  <h2>{ticketData?.event_vanue}</h2>

                  <div className="namePart">
                    <div className="nameSec">
                      <p>
                        Name<span>{ticketData?.name}</span>
                      </p>
                    </div>
                    <div className="nameSec right">
                      <p>
                        Seat<span>{ticketData?.total_seate} Seat</span>
                      </p>
                    </div>
                  </div>

                  <div className="namePart">
                    <div className="nameSec">
                      <p>
                        Date<span>{ticketData?.start_date}</span>
                      </p>
                    </div>
                    <div className="nameSec right">
                      <p>
                        Time<span>{ticketData?.event_start_time}</span>
                      </p>
                    </div>
                  </div>
                  <div className="ticketRip">
                    <div className="circleLeft"></div>
                    <div className="ripLine"></div>
                    <div className="circleRight"></div>
                  </div>
                  <img
                    className="barscan"
                    src={ticketData.qr_url}
                    alt="dams"
                  />
                  <button
                    className="btn"
                    onClick={() =>
                      window.open(ticketData?.ticket_url, "_blank")
                    }
                  >
                    <em className="fa fa-download"></em> &nbsp; Download Ticket
                  </button>
                </div>
              </div>
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTicket;
