import React, { useEffect, useState } from "react";
import axiosInstance from "../../../API/axiosConfig";
import { Link, useParams } from "react-router-dom";

const SubjwiseProgress = () => {
  const user_id = sessionStorage.getItem("id");
  const { id } = useParams();

  const [carddata, setcarddata] = useState([]);
  const today = new Date();
  const currentDate = today.toISOString().split("T")[0];
  useEffect(() => {
    const getdata = async () => {
      const res = await axiosInstance.post("/v2_data_model/subject_forcast", {
        user_id: user_id,
        date: currentDate,
      });
      console.log(res?.data);
      setcarddata(res?.data?.data);
    };
    getdata();
  }, []);
  const groupByDeck = (data) => {
    return data.reduce((acc, item) => {
      const { deck, title, progress } = item;

      // Check if the deck already exists in the result array
      const deckIndex = acc.findIndex((d) => d.deck === deck);

      if (deckIndex !== -1) {
        // If deck exists, push the title and progress into the deckdata array
        acc[deckIndex].deckdata.push({ title, progress });
      } else {
        // If deck doesn't exist, create a new entry for this deck
        acc.push({
          deck,
          deckdata: [{ title, progress }],
        });
      }

      return acc;
    }, []);
  };
  const groupedData = groupByDeck(carddata);
  console.log(groupedData);


  const items = [];

  // Running a for loop 7 times
  for (let i = 0; i <= 7; i++) {
    items.push(<td  key={i}></td>);
  }
  return (
    <div className="SubjwiseProgress">
        <div className="page-content position-relative">
            {/* <div className="breadcrumb-row">
                  <div className="container">
                      <ul className="list-inline">
                          <li><a href={'/'}>Home</a></li>
                          <li>Subject Wise</li>
                      </ul>
                  </div>
              </div> */}
          </div>
        <div className="container">
            {groupedData?.map((item, _) => (
              <div style={{ marginTop: "40px" }}>
                <h1>{item?.deck}</h1>
                <div className='tableArrunddata'>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                      {items}
                        </tr>
                      </thead>
                      <tbody>
                        {item?.deckdata?.map((data)=>(
                          <tr>
                              <td>{data?.title}</td>
                              {data?.progress?.map((itmdata)=>(
                                  <td>{itmdata?.read_card}</td>
                              ))}
                            </tr>
                        ))}
                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
        </div>
    </div>
  );
};

export default SubjwiseProgress;
