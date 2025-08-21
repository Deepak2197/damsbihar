import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

function PaymentSucess() {
  const { id } = useParams();
  const [price, setPrice] = useState(null);
  const [tdate, setTdate] = useState(null);
  const [TI, setTI] = useState(null);
  const [OI, setOI] = useState(null);

  useEffect(() => {
    const ids = id.split("-")[0];
    const amount = id.split("-")[1];

    const is_paytm1 = id?.split("D")[0]?.split("T")[0];

    if (is_paytm1 === "P") {
      setPrice(id.split("D")[0].split("T")[1]);
      setTdate(id.split("D")[1].split("TI")[0]);
      setTI(id.split("TI")[1].split("OI")[0]);
      setOI(id.split("TI")[1].split("OI")[1]);
    }
  }, [id]);

  const isPaytm1 = id?.split("D")[0]?.split("T")[0];

  return (
    <section className="student-detailPage">
      <div className="container">
        <div className="success-register mt-4">
          <div className="row justify-content-center">
            <div className="col-3 text-center">
              <img
                style={{ width: "160px" }}
                src="https://i.ibb.co/v39pYLj/thanku.png"
                loading="lazy"
                alt="icon image"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h3>Thank you for your order</h3>
              <h5>Enrolled Successfully</h5>
            </div>
          </div>
        </div>
        <div className="table">
          {isPaytm1 === "P" ? (
            <table className="table-responsive">
              <tbody>
                <tr>
                  <th
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      backgroundColor: "#d9ebf6",
                    }}
                  >
                    Order Id:
                  </th>
                  <th
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      backgroundColor: "#d9ebf6",
                    }}
                  >
                    {OI}
                  </th>
                </tr>
                <tr>
                  <th
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      backgroundColor: "#d9ebf6",
                    }}
                  >
                    Transaction Id:
                  </th>
                  <th
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      backgroundColor: "#d9ebf6",
                    }}
                  >
                    {TI}
                  </th>
                </tr>
                <tr>
                  <th
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      backgroundColor: "#d9ebf6",
                    }}
                  >
                    Transaction Date:
                  </th>
                  <th
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      backgroundColor: "#d9ebf6",
                    }}
                  >
                    {tdate}
                  </th>
                </tr>
                <tr>
                  <th
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      backgroundColor: "#d9ebf6",
                    }}
                  >
                    Amount:
                  </th>
                  <th
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      backgroundColor: "#d9ebf6",
                    }}
                  >
                    {price} INR
                  </th>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="table-responsive">
              <tbody>
                <tr>
                  <th
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      backgroundColor: "#d9ebf6",
                    }}
                  >
                    Order Id:
                  </th>
                  <th
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      backgroundColor: "#d9ebf6",
                    }}
                  >
                    {id.split("-")[0]}
                  </th>
                </tr>
                <tr>
                  <th
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      backgroundColor: "#d9ebf6",
                    }}
                  >
                    Transaction Success:
                  </th>
                  <th
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      backgroundColor: "#d9ebf6",
                    }}
                  >
                    Success
                  </th>
                </tr>
                <tr>
                  <th
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      backgroundColor: "#d9ebf6",
                    }}
                  >
                    Amount:
                  </th>
                  <th
                    style={{
                      width: "100%",
                      fontSize: "15px",
                      backgroundColor: "#d9ebf6",
                    }}
                  >
                    {id.split("-")[1]} INR
                  </th>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        {/* <div
          className="needHelp"
          style={{
            width: "600px",
            margin: "50px auto 15px",
            padding: "30px 0px",
            borderTop: "1px solid #ccc",
            borderBottom: "1px solid #ccc",
          }}
        >
          <h3
            className="text-center"
            style={{ fontSize: "20px", fontWeight: "700", color: "#000" }}
          >
            Need Help?
          </h3>
          <div className="row mt-4">
            <div className="col-6 col-md-6 col-lg-6">
              <div
                className="LinkBtn"
                style={{
                  border: "1px solid #4595e7",
                  padding: "10px 10px",
                  textAlign: "center",
                  borderRadius: "5px",
                  background: "#d9ebf6",
                }}
              >
                <Link
                  to="mailto:support@damsdelhi.com"
                  style={{ color: "#000", fontSize: "15px", fontWeight: "500" }}
                >
                  <em
                    className="fa fa-envelope"
                    style={{ marginRight: "10px", color: "#4595e7" }}
                  ></em>
                  support@damsdelhi.com
                </Link>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-6">
              <div
                className="LinkBtn"
                style={{
                  border: "1px solid #4595e7",
                  padding: "10px 10px",
                  textAlign: "center",
                  borderRadius: "5px",
                  background: "#d9ebf6",
                }}
              >
                <Link
                  to="tel:9899664533"
                  style={{ color: "#000", fontSize: "15px", fontWeight: "500" }}
                >
                  <em
                    className="fa fa-whatsapp"
                    style={{
                      marginRight: "10px",
                      fontWeight: "600",
                      color: "#4595e7",
                    }}
                  ></em>
                  +91 9899664533
                </Link>
              </div>
            </div>
          </div>
        </div> */}
        <p
          className="text-center"
          style={{
            color: "#000",
            fontSize: "15px",
            width: "600px",
            margin: "0px auto 15px",
            fontWeight: "500",
          }}
        >
          If your payment Deducted, Please Wait for some time for a status
          update
        </p>

        <div className="go-home-btn mt-5" style={{ width: "13%" }}>
          <Link to={"/"}>Go to Home</Link>
        </div>
      </div>
    </section>
  );
}

export default PaymentSucess;
