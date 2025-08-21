
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";

const Selectstream = ({
  setformstate,
  streamList,
  handlerStreamGetID,
  handlerNext,
  handlerPrevious,
  selectedStream,
}) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (id) => {
    setSelectedValue(id);
    handlerStreamGetID(id);
  };

  return (
    <div className="streamPart">
      <ul className="nav nav-pills flex-column">
        {streamList.map((itm, i) => (
          <li className="nav-item" key={itm.id} onClick={() => handleSelect(itm.id)}>
            <button className={`nav-link ${selectedValue === itm.id ? 'active' : ''}`} data-bs-toggle="pill">
              {itm.text}
            </button>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex" }}>
        {selectedValue && (
          <button className="btn btn-primary" onClick={handlerNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Selectstream;
