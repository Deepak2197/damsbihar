import "../../assets/css/shortcodes/shortcodes.css";
import "../../assets/css/my-order/style.css";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../API/axiosConfig";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Myorder = () => {
  const userid = sessionStorage.getItem("id");
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(6);

  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPage));
  };
  const handlePageClick = (PageNumber) => {
    setCurrentPage(PageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(
          API_ENDPOINTS.My_ORDER.OLDER_HISTORY,
          { user_id: userid, last_id: "" }
        );
        setData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [userid]);

  useEffect(() => {
    const filtered = data.filter((order) =>
      order.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, data]);

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItem = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPage = Math.ceil(filteredData.length / rowsPerPage);

  function formatSecondsToDate(seconds) {
    const dateObj = new Date(seconds);
    const day = dateObj.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;

    const formattedDate = `${formattedDay}/${monthName}/${year}`;
    return formattedDate;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Filter By");

  const options = [
    "Order",
    "Not Yet Shipped",
    "Cancelled",
    "Last 30 days",
    "Last 3 months",
    "2025",
    "2024",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    // You can add additional logic here to handle the sort action
  };

  const handleOrderClick = (order) => {
    navigate("/order-detail", { state: { order } });
  };

  return (
    <>
      <div className="Myorder">
        <div className="page-content position-relative">
          <div className="breadcrumb-row">
            <div className="container">
              <ul className="list-inline">
                <li>
                  <a href={"/"}>Home</a>
                </li>
                <li>My Order</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="content-block">
          <div className="section-area my-order section-sp1 p-t20">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="searchPart">
                    <div className="serchSec">
                      <div className="form-group has-search">
                        <span className="fa fa-search form-control-feedback"></span>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search your order here"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <div className="dropSec">
                      <div className="sort-container">
                        <div className="sort-header" onClick={toggleDropdown}>
                          <span>Sort by :</span> {selectedOption}
                        </div>
                        {isOpen && (
                          <div className="sort-options">
                            {options.map((option, index) => (
                              <div
                                key={index}
                                className="sort-option"
                                onClick={() => handleOptionClick(option)}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div> */}
                  </div>
                  <div className="ultimateLive">
                    {filteredData.length === 0 ? (
                      <p>No order found</p>
                    ) : (
                      currentItem.map((order, id) => (
                        <div
                          className="fullSec position-relative"
                          onClick={() => handleOrderClick(order)}
                        >
                          <a href="">
                            <div className="imgSec">
                              <img
                                src={(
                                  order.cover_image ||
                                  order.cover_image ||
                                  "https://d2enu63wt1sf3u.cloudfront.net/course_file_meta/b2cb5482ec838ddcd082749b3ad98f51"
                                )?.replace(/\\\//g, "/")}
                              />
                            </div>
                            <div className="textSec">
                              <h2>{order.title}</h2>
                              <h3>
                                Course Validity:{" "}
                                <span>
                                  {" "}
                                  {formatSecondsToDate(Number(order?.validity))}
                                </span>{" "}
                                <span className="angelErow">
                                  <em class="fa fa-angle-right"></em>
                                </span>
                              </h3>
                              <h4>Paid on {order.creation_time}</h4>
                              <ul className="order_summery">
                                <li className="float-left">
                                  Status :&nbsp;
                                  <span
                                    style={{
                                      color:
                                        order?.transaction_status == 1
                                          ? "#08D002"
                                          : order?.transaction_status == 2
                                          ? "#FF1E1E"
                                          : "blue",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {order?.transaction_status == 1
                                      ? "Successfull"
                                      : order?.transaction_status == 2
                                      ? "Failed"
                                      : "Refunded"}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </a>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="pagination">
              <button onClick={handlePrev} disabled={currentPage === 1}>
                Prev
              </button>
              {Array.from({ length: totalPage }, (_, index) => (
                <button
                  onClick={() => handlePageClick(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
              <button onClick={handleNext} disabled={currentPage === totalPage}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myorder;
