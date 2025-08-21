import React, { useState } from 'react';
// import ResultTab from './ResultTab';
import ResultTab from '../../components/Test_Series/ResultTab';
import LeaderTab from '../../components/Test_Series/LeaderTab';
import AnalysisTab from '../../components/Test_Series/AnalysisTab';
import SolutionTab from '../../components/Test_Series/SolutionTab';
import { useEffect } from 'react';
import '../../components/DailyQuiz/TestPanel.css'

import axios from 'axios';
import { useParams } from 'react-router-dom';
import SectionWise from './SectionWise';
import { Spinner } from 'react-bootstrap';
import axiosInstance from '../../API/axiosConfig';
// import SolutionTab from './SolutionTab';
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


const NursingResult = () => {


  const { id } = useParams();
  const user_id = id.split("s")[0];
  const test_segment_id = id.split("s")[1];
  const [resulthome,setresulthome]=useState(null);
  const [showSpin,setSpin] = useState(false);
  


  const [activeTab, setActiveTab] = useState(0);
  const [testid,settestid]=useState(null);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(()=>{
    const getResult = async()=>{
      setSpin(true);
      const response = await axiosInstance.post(
        `/v2_data_model/get_testseries_basic_result`,
        { testseries_report_id: test_segment_id, user_id: user_id }
      );
      
      setSpin(false);
      setresulthome(response.data.data);
      settestid(response.data.data.test_series_id);
    }
    getResult();
    },[user_id])



  return (
    !showSpin?(
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
                  
                  label="SectionWise Analysis"
                  isActive={activeTab === 1}
                  onClick={() => handleTabClick(1)}
                  />
                  <Tab
                    label="View leaderboard"
                    isActive={activeTab === 2}
                    onClick={() => handleTabClick(2)}
                    />
                  <Tab
                    label="View Analysis"
                    isActive={activeTab === 3}
                    onClick={() => handleTabClick(3)}
                    />
                  <Tab
                    label="View Solution"
                    isActive={activeTab === 4}
                    onClick={() => handleTabClick(4)}
                    />
                </div>
                <div className="tab-contents">
                  {activeTab === 0 && <ResultTab getdata={resulthome}/>}
                  {activeTab === 1 && <SectionWise user_id={user_id} result_id ={test_segment_id} />}
                  {activeTab === 2 && <LeaderTab getdata={resulthome} test_series_id={testid}/>}
                  {activeTab === 3 && <AnalysisTab getdata={resulthome}/>}
                  {activeTab === 4 && <SolutionTab test_series_id={testid} user_id={user_id} getdata={resulthome} /> }
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>

):( <div
  style={{
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <h1>Your result is uploading...</h1>
  <Spinner
    animation="border"
    role="status"
    style={{ height: "100px", width: "100px" }}
  />
</div>)
);
};

export default NursingResult;
