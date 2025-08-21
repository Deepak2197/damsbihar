import React, { useEffect, useState } from "react";
import axiosInstance from "../../API/axiosConfig";
const SolutionTab = ({ test_series_id, user_id, getdata }) => {
  const [sol, setsol] = useState(null);
  const [questions, setque] = useState(null);
  const [chosenOptions, setchos] = useState(null);

  useEffect(() => {
    const getSol = async () => {
      const response = await axiosInstance.post(
        `/v2_data_model/get_test_question_data/`,
        { user_id: user_id, test_series_id: test_series_id }
      );

      setsol(response?.data?.data);
      setque(response?.data?.data?.question_bank);
      setchos(getdata?.question_dump);
    };

    getSol();
  }, []);

  questions?.forEach((question) => {
    // Find the corresponding chosen option using question_id
    const chosenOption = chosenOptions.find(
      (option) => option.question_id == question.id
    );

    // If a corresponding chosen option is found, add its answer to the question object
    if (chosenOption) {
      question.choosed_option = chosenOption.answer;
    } else {
      // If no chosen option is found, you can set a default value or handle it as per your requirement
      question.choosed_option = null; // or any default value you prefer
    }
  });

  return (
    <section className="solutionTab">
      <div className="">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="questionHead">
              <h2>{sol?.basic_info?.test_series_name}</h2>
              <h3> Question Wise Report</h3>
            </div>

            {questions?.map((data, index) => (
              <div className="questionBox">
                <h4>
                  <b>Question:</b> {index + 1}
                  <div dangerouslySetInnerHTML={{ __html: data.question }} />
                </h4>
                <div className="questionMid">
                  <div className="list-group">
                    <a
                      href="javascriptvoid:(0)"
                      className="list-group-item list-group-item-action"
                      style={{
                        backgroundColor:
                          data.choosed_option == 1
                            ? "skyblue"
                            : data.answer == 1
                            ? "#90EE90"
                            : "white",
                      }}
                    >
                      <span className="qsnNumbr">A</span>
                      {data.option_1}
                    </a>
                    <a
                      href="javascriptvoid:(0)"
                      className="list-group-item list-group-item-action"
                      style={{
                        backgroundColor:
                          data.choosed_option == 2
                            ? "skyblue"
                            : data.answer == 2
                            ? "#90EE90"
                            : "white",
                      }}
                    >
                      <span className="qsnNumbr">B</span>
                      {data.option_2}
                    </a>
                    <a
                      href="javascriptvoid:(0)"
                      className={`list-group-item list-group-item-action`}
                      style={{
                        backgroundColor:
                          data.choosed_option == 3
                            ? "skyblue"
                            : data.answer == 3
                            ? "#90EE90"
                            : "white",
                      }}
                    >
                      <span className="qsnNumbr rigthqsn">C</span>
                      {data.option_3}
                    </a>
                    <a
                      href="javascriptvoid:(0)"
                      className="list-group-item list-group-item-action"
                      style={{
                        backgroundColor:
                          data.choosed_option == 4
                            ? "skyblue"
                            : data.answer == 4
                            ? "#90EE90"
                            : "white",
                      }}
                    >
                      <span className="qsnNumbr">D</span>
                      {data.option_4}
                    </a>
                  </div>
                  <h5>
                    {data.correct_attempt_percentage}% People got this right
                  </h5>
                  <h6>
                    <span className="fontExp">Explanation:</span>

                    <div
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionTab;
