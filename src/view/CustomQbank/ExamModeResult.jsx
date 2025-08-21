import React, { useEffect, useState } from 'react';
import axiosInstance from '../../API/axiosConfig';
import { useParams } from 'react-router-dom';
import Leaderboard from './Leaderboard';
import { Button } from 'react-bootstrap';
import { FaTrophy } from 'react-icons/fa';

const ExamModeResult = () => {
  const [questions, setQuestions] = useState([]);
  const [chosenOptions, setChosenOptions] = useState([]);
  const [testResult, setTestResult] = useState(null);
  const [toggle,settoggle] =useState(0);
  const [leader,setleader]=useState([]);
  const user_id = sessionStorage.getItem('id');
  const { id } = useParams();

  useEffect(() => {
    const getSol = async () => {
      try {
        // Fetch solutions
        const response = await axiosInstance.post(
          "/v2_data_model/get_test_series_result_new",
          { user_id, test_id: id }
        );

        // Fetch test result
        const res = await axiosInstance.post("/v2_data_model/check_qbank_new", {
          user_id,
          test_id: id,
        });
        const res1 = await axiosInstance.post(
          "/v2_data_model/get_custom_qbank_leaderboard",
          { user_id, test_id: id }
        );

        setleader(res1?.data?.data);
        // console.log('Solutions:', response?.data?.data?.result);
        // console.log('Test Result:', res?.data?.data);

        setQuestions(response?.data?.data?.result || []);
        setChosenOptions(JSON.parse(res?.data?.data?.test_result?.question_dump) || []);
        setTestResult(res?.data?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getSol();
  }, [id, user_id]);

  // Assign chosen options to questions
  const enrichedQuestions = questions.map((question) => {
    const chosenOption = chosenOptions.find((option) => option?.question_id == question?.id);
    return {
      ...question,
      choosed_option: chosenOption ? chosenOption?.answer : null,
    };
  });

  // console.log(enrichedQuestions)

  return (
    <section className="solutionTab" style={{ padding: '1vw' }}>
      <Leaderboard data={testResult} />
      <div className='testQusTion'>
            <div className="container"> 
              <div style={{display:'flex',gap:30, marginBottom:'30px'}}>
                <button style={{backgroundColor:toggle==0?"#ED633D":'gray',color:'white',padding:'10px',borderRadius:'5px'}} onClick={()=>settoggle(0)} >Question Wise Report</button>
                <button style={{backgroundColor:toggle==1?"#ED633D":'gray',color:'white',padding:'10px',borderRadius:'5px'}}  onClick={()=>settoggle(1)}>LeaderBoard</button>
              </div>
            </div>
              {toggle==0 ?
          <div className="container">    
            <div className="row">
              <div className="col-12">   
                <div className="questionHead">
                  <h2>{testResult?.basic_info?.test_series_name}</h2>
                
                  <h3>Question Wise Report</h3>
                </div>

                {enrichedQuestions?.map((data, index) => (
                  <div className="questionBox" key={index}>
                    <h4>
                      <b>Question:</b> {index + 1}
                      <div dangerouslySetInnerHTML={{ __html: data?.question }} />
                    </h4>
                    <div className="questionMid">
                      <div className="list-group">
                        {[data?.option_1, data?.option_2, data?.option_3, data?.option_4].map(
                          (option, i) => (
                            <a
                              key={i}
                              href="#:void(0)"
                              className="list-group-item list-group-item-action"
                              style={{
                                backgroundColor:
                                  data?.choosed_option == i + 1
                                    ? 'skyblue'
                                    : data?.answer == i + 1
                                    ? '#90EE90'
                                    : 'white',
                              }}
                            >
                              <span className="qsnNumbr">{String.fromCharCode(65 + i)}</span>
                              {option}
                            </a>
                          )
                        )}
                      </div>
                      <h5>{data?.correct_attempt_percentage}% People got this right</h5>
                      <h6>
                        <span className="fontExp">Explanation:</span>
                        <div dangerouslySetInnerHTML={{ __html: data?.description }} />
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        :(
          <div style={{width:'100%',display:'flex',alignItems:'center',flexDirection:'column',gap:20}}>
            {leader?.map((data,i)=>(
            <div className='leaderBoxBoard' key={i}>
              <div style={{display:'flex',gap:20}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <FaTrophy color='#FFD016' size={32}/>
                  <p className='rankFont'>Rank {data?.rank}</p>
                </div>
              </div>
              <h4>{data?.name}</h4>
              <p>{Number(data?.correct_count)+Number(data?.incorrect_count)} attempted</p>
              <p>{data?.correct_count} correct</p>
              <p>{data?.incorrect_count} incorrect</p>
            </div>
            ))}
          </div>
        )
}
      </div>
    </section>
  );
};

export default ExamModeResult;
