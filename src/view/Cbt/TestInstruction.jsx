import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../API/axiosConfig";
const TestInstruction = () => {
  const params = useParams();
  const user_id = sessionStorage.getItem("id");
  const [cbtListData, setCbtListData] = useState([]);
  const [selectedCbt, setSelectedCbt] = useState(null); // State to store the selected CBT data

  useEffect(() => {
    axiosInstance
      .post("v2_data_model/get_cbt_list", { user_id: user_id })
      .then((response) => {
        setCbtListData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching list data:", error);
      });
  }, []);

  // Filter the cbtListData array to find the CBT with id matching params.cbtid
  useEffect(() => {
    const selectedCbtData = cbtListData.find((cbt) => cbt.id === params.cbtid);
    setSelectedCbt(selectedCbtData);
  }, [cbtListData, params.cbtid]);

  const removeHTMLTags = (html) => {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <div className="profileUpdation">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>CBT TestInstruction</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="testInstructions ">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="featureSec main">
                {selectedCbt && (
                  <>
                  <ul>
                    <li> {removeHTMLTags(selectedCbt.description)}</li>
                  </ul>
                    {/* <p></p>

                    <p> {removeHTMLTags(selectedCbt.description)}</p>

                    <p></p> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestInstruction;
