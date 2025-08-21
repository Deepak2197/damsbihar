import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MySelect from "../MySelect";
import axiosInstance from "../../API/axiosConfig";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Educationdetails = ({
  handlerBackInEducate,
  user_id,
  selectedStream,
}) => {
  // Track selected year
  const navigate = useNavigate();

  // abroad
  const [abroad, setAbroad] = useState([]);
  const [selectedOption, setSelectedOption] = useState("1");
  const [selectedAbroad, setSelectedAbroad] = useState(null);
  const [fetching, setFetching] = useState(false); // Loading state

  // abroad city
  const [abroadCity, setAbroadCity] = useState([]);
  const [selectedAbroadCity, setSelectedAbroadCity] = useState(null);
  const [fetchingCity, setFetchingCity] = useState(false); // Loading state

  const [yearData, setYearData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const [college, setCollege] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [fetchingCollege, setFetchingCollege] = useState(false); // Loading state

  const [collegeState, setCollegeState] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [fetchingState, setFetchingState] = useState(false); // Loading state

  const onChangeHandler = (value, option) => {
    setSelectedAbroad(option.children);
  };

  const handleClick = () => {
    navigate("/exam-preparation");
  };

  const searchHandler = async (value) => {
    if (!value) return;
    setFetching(true);
    setAbroad([]);

    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.NEW_REGISRATION.ABROADCOLLEGELIST,
        {
          search_key: value,
        }
      );

      const newOptions = data.data.map((item) => ({
        value: item.id,
        label: item.college_name,
      }));
      setAbroad(newOptions);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setFetching(false);
    }
  };

  const onChangeHandlerCity = (value, option) => {
    setSelectedAbroadCity(option.children);
  };

  const searchHandlerCity = async (value) => {
    if (!value) return;
    setFetchingCity(true);
    setSelectedAbroadCity([]);

    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.NEW_REGISRATION.STATE_LIST_SEARCH,
        {
          search_key: value,
        }
      );

      const newOptions = data.data.map((item) => ({
        value: item.id,
        label: item.city_name,
      }));
      setAbroadCity(newOptions);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setFetchingCity(false);
    }
  };

  const getFetchYear = async () => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.NEW_REGISRATION.GET_ACADEMICYEAR_YEAR,
      );

      const filter = data.data.map((item) => ({
        ...item,
        label: item.year,
        value: item.year,
      }));
      setYearData(filter);
    } catch (err) {
      toast.error(err);
    }
  };

  const onChangeHandlerYear = (value) => {
    setSelectedYear(value);
  };

  const [OtherCollegeField, setOtherCollegeField] = useState(false);
  const [OtherCollegeName, setOtherCollegeName] = useState("");

  const onChangeOtherHandlerCollage = (e) => {
    e.preventDefault();
    setOtherCollegeName(e.target.value);
  };

  const onChangeHandlerCollage = (value, option) => {
    if (value == "other") {
      setOtherCollegeField(true);
      setSelectedCollege(option.children);
    } else {
      setSelectedCollege(option.children);
      setOtherCollegeField(false);
    }
  };

  const searchHandlerState = async (value) => {
    if (!value) return;
    setFetchingState(true);
    setCollege([]);

    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.NEW_REGISRATION.STATE_LIST_SEARCH,
        {
          search_key: value,
        }
      );

      const newOptions = data.data.map((item) => ({
        value: item.id,
        label: item.state_name,
      }));
      setCollegeState(newOptions);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setFetchingState(false);
    }
  };
  const searchHandlerCollege = async (value) => {
    if (!value) return;
    setFetchingCollege(true);
    setCollege([]);

    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.NEW_REGISRATION.COLLEGE_LIST, {
        search_key: value,
      });

      const newOptions = data.data.map((item) => ({
        value: item.id,
        label: item.college_name,
      }));
      setCollege(newOptions);
      console.log(college);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setFetchingCollege(false);
    }
  };

  const onChangeHandlerState = (value, option) => {
    setSelectedState(option.children);
  };
  const [loading, setLoading] = useState(false);

  const handlerNextInEducate = async () => {
    console.log(selectedCollege);
    selectedOption === "1" ? finalSubmit(1) : finalSubmit(2);
  };
  const finalSubmit = async (num) => {
    // console.log(selectedState,selectedCollege,num)
    // console.log(selectedAbroadCity,selectedAbroad,num)
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.NEW_REGISRATION.CONTACT_REGISTRATION_COMPLETED_V4,
        {
          user_id: user_id,
          stream_id: "1",
          year: selectedYear,
          state_name:
            selectedOption === "1" ? selectedState : selectedAbroadCity,
          college_name:
            selectedOption === "2"
              ? selectedAbroad
              : selectedCollege === "Other"
              ? OtherCollegeName
              : selectedCollege,
          mbbs_from: selectedOption,
          UserReg_tab: "2",
        }
      );
      if (data.status === true) {
        // console.log("dsdsdsd", data);
        const resdata1 = sessionStorage.getItem("userData");
        //console.log("resdata1", resdata1);
        const userDataObj1 = JSON.parse(resdata1);
        //console.log("userDataObj1", resdata1);

        sessionStorage.setItem("jwt_token1", userDataObj1.jwt_token);
        sessionStorage.setItem("userData", JSON.stringify(data?.data));
        sessionStorage.setItem("is_course_register", "1");
        sessionStorage.setItem("id", data.data.id);
        localStorage.setItem("idTocredentials", "1");
        setLoading(false);
        navigate("/");
        // setStep("educate");
      } else {
        toast.error(res.data.message);
        setLoading(false);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleRadioChange = (event) => {
    setAbroad([]);
    setAbroadCity([]);
    setYearData([]);
    setCollegeState([]);
    setSelectedState(null);
    setCollege([]);
    setSelectedAbroad(null);
    setSelectedAbroadCity(null);
    setSelectedCollege(null);
    // console.log(event.target.value)
    setSelectedOption(event.target.value); // Update state with selected value
  };

  useEffect(() => {
    getFetchYear();
  }, [selectedOption]);


  return (
    <div className="educationDetails">
      <ToastContainer />
      <div className=" reqDetails">
        <div className="detailText">
          <p>
            To make your learning journey more personalised, please enter your
            details. It'll take than a min, we promise!
          </p>
        </div>
        <div className="inputSection">
          <p>
            <input
              type="radio"
              id="test1"
              name="radio-group"
              checked={selectedOption === "1"}
              value="1"
              onChange={handleRadioChange}
            />
            <label htmlFor="test1">For India</label>
          </p>
          <p>
            <input
              type="radio"
              id="test2"
              name="radio-group"
              checked={selectedOption === "2"}
              value="2"
              onChange={handleRadioChange}
            />
            <label htmlFor="test2">For Abroad</label>
          </p>
        </div>
        <div className="fieldPart">
          <form>
            {selectedOption === "2" ? (
              <>
                <MySelect
                  title="College Name"
                  onChangeHandler={onChangeHandler}
                  searchHandler={searchHandler}
                  abroad={abroad}
                  fetching={fetching}
                  value={selectedAbroad}
                  type="1"
                />
                <MySelect
                  onChangeHandler={onChangeHandlerCity}
                  title="College City"
                  searchHandler={searchHandlerCity}
                  abroad={abroadCity}
                  value={selectedAbroadCity}
                  fetching={fetchingCity}
                  type="1"
                />
              </>
            ) : (
              <>
                <MySelect
                  title="College Name"
                  onChangeHandler={onChangeHandlerCollage}
                  searchHandler={searchHandlerCollege}
                  abroad={college}
                  value={selectedCollege}
                  fetching={fetchingCollege}
                  type="1"
                />
                {OtherCollegeField && (
                  <div className="form-group">
                    <label className="clgname">Enter College Name</label>
                    <input
                      className="clginp"
                      type="text"
                      onChange={(e) => onChangeOtherHandlerCollage(e)}
                      value={OtherCollegeName}
                      placeholder="Enter College Name"
                    />
                  </div>
                )}

                <MySelect
                  title="College State"
                  onChangeHandler={onChangeHandlerState}
                  searchHandler={searchHandlerState}
                  abroad={collegeState}
                  fetching={fetchingState}
                  value={selectedState}
                  type="1"
                />
              </>
            )}

            <MySelect
              type="2"
              onChangeHandler={onChangeHandlerYear}
              title="Year"
              yearArr={yearData}
            />

            <div style={{ display: "flex" }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handlerBackInEducate}
              >
                Back
              </button>
              {(selectedOption === "1" &&
                selectedCollege &&
                selectedState &&
                selectedYear) ||
              (selectedOption === "2" &&
                selectedAbroadCity &&
                selectedAbroad) ? (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handlerNextInEducate} // Validate on click
                >
                  Next
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Educationdetails;
