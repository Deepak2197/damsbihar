import React, { useState } from 'react';


import ResultTab from '../../../components/Test_Series/ResultTab';
import LeaderTab from '../../../components/Test_Series/LeaderTab';
import AnalysisTab from '../../../components/Test_Series/AnalysisTab';
import SolutionTab from '../../../components/Test_Series/SolutionTab';
import { useEffect } from 'react';
import axios from 'axios';
import '../style.css'
import '../../../components/DailyQuiz/TestPanel.css'
import { useParams } from 'react-router-dom';
import SolutionTabCHO from './SolutionTabCHO';
import axiosInstance from '../../../API/axiosConfig';
const Tab = ({ label, isActive, onClick }) => {
  return (
    <div
      className={`tab ${isActive ? 'active' : ''} tab-but`}
      onClick={onClick}
      style={{ backgroundColor: isActive ? '#0096ff' : 'white',color: isActive ? 'white' : '#0096ff' }}
    >
      {label}
    </div>
  );
};



const TestResultCHO = () => {


  const { id } = useParams();
  const user_id = id.split("s")[0];
  const test_segment_id = id.split("s")[1];
  const [resulthome,setresulthome]=useState(null);
  const [testid,settestid]=useState(null);
  console.log("testtttt segment id",test_segment_id);


  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(()=>{
    const getResult = async()=>{
        
      const response = await axiosInstance.post(
        `/v2_data_model/get_testseries_basic_result`,
        { testseries_report_id: test_segment_id, user_id: user_id }
      );
      setresulthome(response.data.data);
      settestid(response.data.data.test_series_id);
    }
    getResult();
    },[])

  return (
  <div className="TestResult">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
          
          </div>
        </div>
      </div>
      <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="tabs">
                <h3>{resulthome?.test_series_name}</h3>
                <h2 className='resulthead'>RESULT</h2>
                <div className="tab-list">
                  <Tab
                  
                    label="Result"
                    isActive={activeTab === 0}
                    onClick={() => handleTabClick(0)}
                  />
                  <Tab
                    label="View leaderboard"
                    isActive={activeTab === 1}
                    onClick={() => handleTabClick(1)}
                  />
                  <Tab
                    label="View Analysis"
                    isActive={activeTab === 2}
                    onClick={() => handleTabClick(2)}
                  />
                  <Tab
                    label="View Solution"
                    isActive={activeTab === 3}
                    onClick={() => handleTabClick(3)}
                  />
                </div>
                <div className="tab-contents">
                  {activeTab === 0 && <ResultTab getdata={resulthome}/>}
                  {activeTab === 1 && <LeaderTab getdata={resulthome} test_series_id={testid}/>}
                  {activeTab === 2 && <AnalysisTab getdata={resulthome}/>}
                  {activeTab === 3 && <SolutionTabCHO  test_series_id={testid} user_id={user_id} getdata={resulthome}/> }
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>

  );
};

export default TestResultCHO;
