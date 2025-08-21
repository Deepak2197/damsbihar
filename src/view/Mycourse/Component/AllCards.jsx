import React, { useEffect, useState } from "react";
import axiosInstance from "../../../API/axiosConfig";
import { Link, useParams } from "react-router-dom";

const AllCards = () => {
  const user_id = sessionStorage.getItem("id");
  const { id } = useParams();

  const [carddata, setcarddata] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      const res = await axiosInstance.post("/v2_data_model/all_cards", {
        user_id: user_id,
        type: id,
        random: 1,
      });
      //console.log(res?.data?.data);
      setcarddata(res?.data?.data);
    };
    getdata();
  }, []);
  return (
    <div className="AllCards">
        <div className="page-content position-relative">
        {/* <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li><a href={'/'}>Home</a></li>
                        <li>All Card </li>
                    </ul>
                </div>
            </div> */}
      </div>
      <div className="container">
        <h2>
          {id == 1 ? "All Cards" : id == 2 ? "All Bookmarked" : "All Suspended"}
        </h2>
        {carddata?.map((item, i) => (
          <div className="allCardInner">
            <h4>{item?.title}</h4>
            <div className="allCardChild">
              {item?.subdeck?.map((subdata, index) => (
                <div className="cardChildData">
                  <div>
                    <h5>{subdata?.title}</h5>
                    <p>{subdata?.total_card} Cards</p>
                  </div>
                  {subdata?.total_card == 0 ? (
                    <button className="btnData"
                      style={{
                        backgroundColor: "gray",
                      }}
                    >
                      No Card
                    </button>
                  ) : (
                    <Link to={`/readcard/${id}S${subdata?.sd_id}`}>
                      <button className="btnData"
                        style={{
                          backgroundColor: "#071952",
                        }}
                      >
                        Read
                      </button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCards;
