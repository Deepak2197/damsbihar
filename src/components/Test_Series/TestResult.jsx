import React, { useState } from 'react';
import "./Testpanel.css";
import ResultTab from './ResultTab';
import LeaderTab from './LeaderTab';
import AnalysisTab from './AnalysisTab';
import { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import SolutionTabTest from '../../view/Mycourse/Component/SolutionTabCHO';
import SolutionTab from './SolutionTab';
import axiosInstance from '../../API/axiosConfig';
import SectionWise from '../../view/NursingTest/SectionWise';
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

const TestResult = () => {
  const { id } = useParams();
  const user_id = id.split("s")[0];
  const test_segment_id = id.split("s")[1];
  const [resulthome,setresulthome]=useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [testid,settestid]=useState(null);
  const [showsec,setsec]=useState(false);
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

    useEffect(()=>{
      const getSec = async()=>{
        const response = await axiosInstance.post(
          `/v2_data_model/get_testseries_subject_analysis`,
          { result_id: test_segment_id, user_id: user_id }
        );
       
      
        setsec(response?.data?.status);
     
      }
      getSec();
      },[])
  return (
  <div className="TestResult">
      {/* <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
          </div>
        </div>
      </div> */}
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
                  {showsec?(   <Tab
                    label="SectionWise Analysis"
                    isActive={activeTab === 4}
                    onClick={() => handleTabClick(4)}
                  />):(<></>)}
                  
                </div>
                <div className="tab-contents">
                  {activeTab === 0 && <ResultTab getdata={resulthome}/>}
                  {activeTab === 1 && <LeaderTab getdata={resulthome} test_series_id={testid}/>}
                  {activeTab === 2 && <AnalysisTab getdata={resulthome}/>}
                  {activeTab === 3 && <SolutionTab test_series_id={testid} user_id={user_id} getdata={resulthome} /> }
                {activeTab === 4 && <SectionWise user_id={user_id} result_id ={test_segment_id} />}
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>

  );
};

export default TestResult;
