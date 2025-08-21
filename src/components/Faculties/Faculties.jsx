import { Button } from "antd";
import React, { useEffect, useState } from "react";
import "../../assets/css/home-page/style.css";
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Faculties = () => {
  const [specialist, setSpecialist] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [tabValue, setTabValue] = useState("");

  const getListHandler = async () => {
    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.HOMEPAGE_INDEX.GET_FACUTIES,);

      const filteredSpecialist = data?.data?.specialist?.filter(
        (item) => item.status !== "2"
      );

      setSpecialist(filteredSpecialist);

      if (filteredSpecialist.length > 0) {
        setTabValue(filteredSpecialist[0].faculties_type);
      }
    } catch (error) {
      // handle error
    }
  };

  const getFacultiesHandler = async () => {
    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.HOMEPAGE_INDEX.GET_FACUTIES, {
        faculties_type: tabValue,
      });

      const specialistList = data?.data?.specialist || [];

      // Find the current selected specialist based on tabValue
      const currentSpecialist = specialistList.find(
        (s) => s.faculties_type === tabValue
      );

      // If status is "2", do not show faculties
      if (currentSpecialist?.status === "2") {
        setFaculties([]); // clear faculties
        return;
      }

      // Otherwise, show sorted faculties
      const sortedFacultyData = data?.data?.faculties
        ?.filter((item) => item.status !== "2") // Optional: exclude inactive faculties
        .sort((a, b) => a.image_position - b.image_position);

      setFaculties(sortedFacultyData);
    } catch (error) {
      // handle error
    }
  };

  useEffect(() => {
    getListHandler();
  }, []);

  useEffect(() => {
    if (Object.keys(tabValue).length > 0) {
      getFacultiesHandler();
    }
  }, [tabValue]);

  return (
    <>
      <section className="Facsectiondata">
        <div className="container">
          <div className="tabData">
            {specialist.map((itm, i) => (
              <Button
                key={i}
                onClick={() => setTabValue(itm.faculties_type)}
                style={{
                  background:
                    itm.faculties_type === tabValue ? "#FFFFFF" : "#EEEEEE",
                  color:
                    itm.faculties_type === tabValue ? "#007AFF" : "#757575",
                }}
              >
                {itm.faculties_type}
              </Button>
            ))}
          </div>

          <div className="facltyData">
            {faculties.length < 1 && <p>No Data</p>}
            <div className="groupdata">
              {faculties?.map((itm, i) => (
                <div className="imgwidth" key={i}>
                  <img
                    src={itm?.image_url}
                    loading="lazy"
                    alt={itm?.faculties_name}
                  />
                  <div className="titleText">
                    <h3>{itm?.faculties_name}</h3>
                    <p>{itm?.specialist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faculties;
