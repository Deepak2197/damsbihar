import React, { useEffect, useState } from "react";
import axiosInstance from "../../API/axiosConfig";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Invoice = () => {
  const { id } = useParams();
  const oid = id.split("C")[0];
  const cid = id.split("C")[1];
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axiosInstance.post(
        API_ENDPOINTS.My_ORDER.GET_INVOICE_DISPLAYS,
        { oid: oid, cid: cid }
      );
     
      setData(res?.data?.data?.result);
    };

    getData();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(24);
    doc.text("INVOICE RECEIPT", 105, 20, null, null, "center");

    doc.addImage(
      "https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/login_logo.png",
      "PNG",
      80,
      30,
      50,
      50
    );

    doc.setFontSize(12);
    doc.text(
      "Delhi academy of medical sciences",
      105,
      90,
      null,
      null,
      "center"
    );
    doc.text("Delhi, India", 105, 100, null, null, "center");

    autoTable(doc, {
      startY: 110,
      head: [["Field", "Value"]],
      body: [
        ["Invoice number", data?.invoice_no],
        ["Buyer Name", data?.user_name],
        ["Course Name", data?.title],
        ["Course Price", `Rs. ${data?.total_cost}`],
        ["GST amount", `Rs. ${data?.total_gst_amount}`],
        ["Quantity", data?.quantity],
        ["Total", `Rs. ${data?.course_price}`],
      ],
    });

    doc.save("Invoice.pdf");
  };

  return (
    <div className="invoice-card">
      <div className="header1">
        <img
          src="https://emedicoz.com/src/components/header/login_logo.png"
          alt="Logo"
          className="logo1"
        />
        <div className="title1">Invoice Receipt</div>
      </div>
      <div className="body">
        <p className="par">
          <strong className="st">Invoice Number:</strong> {data?.invoice_no}
        </p>
        <p className="par">
          <strong className="st">Buyer Name:</strong> {data?.user_name}
        </p>
        <p className="par">
          <strong className="st">Course Name:</strong> {data?.title}
        </p>
        <p className="par">
          <strong className="st">Course Price:</strong> ₹{data?.total_cost}
        </p>
        <p className="par">
          <strong className="st">GST:</strong>₹{data?.total_gst_amount}
        </p>
        <p className="par">
          <strong className="st">Quantity:</strong> {data?.quantity}
        </p>
        <p className="par">
          <strong className="st">Total Billable Amount:</strong> ₹
          {data?.course_price}
        </p>
        <button onClick={generatePDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default Invoice;
