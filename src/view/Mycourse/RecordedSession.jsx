import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/css/recorded-video/style.css";
import "../../assets/css/recorded-video/responsive.css";
import axiosInstance from "../../API/axiosConfig";

const RecordedSession = () => {
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("id");
  const [recordedSession, setRecordedSession] = useState([]);

  const getAllRecordedSubject = async () => {
    let courseId = JSON.parse(localStorage.getItem("course_Id"));
    try {
      const response = await axiosInstance.post(
        "/v2_data_model/get_recoded_video_subject",
        { user_id: user_id, course_id: courseId }
      );

      setRecordedSession(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllRecordedSubject();
  }, []);
  const handleSublectType = (recorded_course_id, recorded_subject_id) => {
    localStorage.setItem(
      "recorded_subject_id",
      JSON.stringify(recorded_subject_id)
    );

    navigate("/recorded-topic");
  };

  return (
    <div className="RecordedSession">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>{recordedSession.recoded_video_course?.title}</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="recorded-session">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 banner_back">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <img
                    src={
                      recordedSession.recoded_video_course?.desc_header_image
                    }
                    alt="Banner"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <div className="subject">
                <div className="row">
                  {recordedSession &&
                    recordedSession.subject_list?.map((subject, index) => (
                      <div
                        className="col-6 col-sm-4 col-md-3 col-lg-3"
                        key={index}
                      >
                        <a
                          href="#"
                          onClick={() =>
                            handleSublectType(
                              subject.course_id,
                              subject.id
                            )
                          }
                        >
                          <div className="sub-ico active text-center">
                            <img
                              src={subject.subject_icon}
                              alt={subject.subject_name}
                            />
                            <p className="m-0">{subject.subject_name}</p>

                            <input
                              type="hidden"
                              name="purchase"
                              className="opacityvalue"
                              value="1"
                            />
                          </div>
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecordedSession;
