import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import "./style.css";

const DamsDeck = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, []);
  const user_id = sessionStorage.getItem("id");
  const [TestSubjectList, setTestSubjectList] = useState([]);

  useEffect(() => {
    const getPredictiveTestSubjectList = async () => {
      try {
        const res = await axiosInstance.post(
          "/v2_data_model/getPredictiveTestSubjectList",
          {
            user_id: user_id,
          }
        );

        const TestSubject = res?.data?.data?.subject_list || [];
        setTestSubjectList(TestSubject);
      } catch (error) {
        console.error("Error fetching deck data:", error);
      }
    };
    getPredictiveTestSubjectList();
  }, [user_id]);

   const fullText =
     "Which 'Back to Basics' lecture would you like me to use for the AI Predictive Test?";
   const [displayedText, setDisplayedText] = useState("");
   const [index, setIndex] = useState(0);

   useEffect(() => {
     if (index < fullText.length) {
       const timeout = setTimeout(() => {
         setDisplayedText((prev) => prev + fullText.charAt(index));
         setIndex((prev) => prev + 1);
       }, 100); // Adjust speed here (ms per character)
       return () => clearTimeout(timeout);
     }
   }, [index]);
  
  
  return (
    <div className="Damsdeck">
      <div className="page-content position-relative"></div>
      <div className="container">
        <div className="bannersection">
          <div className="bnrPart">
            <p>
              {displayedText.includes("you like") ? (
                <>
                  {displayedText.split("you like")[0]}
                  <span>you like{displayedText.split("you like")[1]}</span>
                </>
              ) : (
                displayedText
              )}
            </p>
            <img src="/web/shifubnr.gif" alt="shifubnr" />
          </div>
        </div>
        <div className="subjectList">
          <div className="heading">
            <h3>Select Subject</h3>
          </div>
          <div className="suBBox">
            {TestSubjectList?.map((subjectlist) => (
              <Link
                key={subjectlist?.subject_id || subjectlist?.id} // Use a unique identifier
                to="/selectsubject"
                state={{ topicList: subjectlist?.topic_list }} // Pass topic_list as state
                className="inneRBox"
              >
                <div className="textPart">
                  <p>{subjectlist?.subject_name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DamsDeck;
