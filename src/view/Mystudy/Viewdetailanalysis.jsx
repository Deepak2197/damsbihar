import React, { useState } from 'react';
import "../Mystudy/style.css";
import "../Mystudy/responsive.css";
import { Flex, Progress, Slider } from 'antd';
import GraphBardata from '../../components/GraphBardata';
import { Bar } from 'react-chartjs-2';
import { RiFontFamily } from 'react-icons/ri';
import { TbBorderRadius } from 'react-icons/tb';
import Performancechart from '../../components/Performancechart';
import LeaderboardData from '../../components/LeaderboardData';
import TestreportData from '../../components/TestreportData';
import TestreportwiseAnalysis from '../../components/TestreportwiseAnalysis';



const Viewdetailanalysis = () => {
    const [selectedValue, setSelectedValue] = useState("");
    // Handle change event
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
     
    };
    const [selectedValue1, setSelectedValue1] = useState("");
    // Handle change event
    const handleChange1 = (event) => {
      setSelectedValue1(event.target.value);
     
    };

    // Bar graph
    const data = {
        labels: ['Subject Test', 'Grand Test', 'FMGE Test', 'Mock Test', 'Class Test'],
        datasets: [
          {
            label: 'Test Scores',
            data: [15, 20, 10, 12, 22],
            backgroundColor: [
              '#ED633D', // Subject Test
              '#3F5395', // Grand Test
              '#FF8F00', // FMGE Test
              '#FF1E1E', // Mock Test
              '#9235B3', // Class Test
            ],
            borderWidth: 2,
            borderRadius: 10,
            barThickness: window.innerWidth < 600 ? 30 : 70,
          },
        ],
    };
    
    const options = {
        responsive: true,
        scales: {
            x: {
              ticks: {
                font: {
                  size: window.innerWidth < 600 ? 10 : 14, // Responsive font size for X-axis
                },
              },
            },
            y: {
              ticks: {
                font: {
                  size: window.innerWidth < 600 ? 10 : 14, // Responsive font size for Y-axis
                },
              },
            },
        },
        plugins: {
          legend: {
            labels: {
              color: '#000', 
              font: {
                size: 16, 
                 weight: '500', 
                RiFontFamily:'Poppins !important'
              },
            },
          },
        },
       
    };

    //Tabbing
    const [activeTab, setActiveTab] = useState('Tab1');

    const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    };

  return (
    <div>
        <div className="page-content bg-white position-relative">
            <div className="breadcrumb-row custombread">
                <div className="container">
                    <ul className="list-inline">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>View Detailed Analysis</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='ViewDatailAnaysis'>
            <div className='container'>
                <div className='headingtext'>
                    <h1>Your Q-Bank Performance</h1>
                </div>
                <div className='progressGroup'>
                    <h2>Subject Wise Strongest to Weakest Accuracy</h2>
                    <Flex gap="small" vertical>
                        <div className='proData'>
                            <span>AIIMS (2014-2018)</span><Progress percent={40.5} />
                        </div>
                        <div className='proData'>
                            <span>UPSC CMS PYQs</span><Progress percent={40.5} />
                        </div>
                        <div className='proData'>
                            <span>AIIMS (2014-2018)</span><Progress percent={40.5} />
                        </div>
                        <div className='proData'>
                            <span>AIIMS (2014-2018)</span><Progress percent={50} />
                        </div>
                        <div className='proData'>
                            <span>UPSC CMS PYQs</span><Progress percent={30} />
                        </div>
                        <div className='proData'>
                            <span>AIIMS (2014-2018)</span><Progress percent={35} />
                        </div>
                    </Flex>
                </div>

                <div className='AccuracyMarker'>
                    <h2>Q-Bank Subject Wise Accuracy Maker</h2>
                    <GraphBardata />
                </div>
                <div className='Accuracydqb'>
                    <h2>Module Wise Accuracy In DQB</h2>
                    <h4>Select Subject</h4>
                    <select 
                        value={selectedValue} 
                        onChange={handleChange} 
                        >
                        <option value="">INICET PYQ</option>
                        <option value="option1">NEET PG</option>
                    </select>

                    <div className='accracyGroup'>
                        <div className='twoGroup'>
                            <div className='process'>
                                <div className='toptext'>
                                    <h3>Psychiatry</h3>
                                </div>
                                <div className='normal'></div>
                                <div className='positive-val'>
                                    <h4>0.0%</h4>
                                </div>
                            </div>
                            <div className='process'>
                                <div className='toptext'>
                                    <h3>(INICET PYQ)</h3>
                                </div>
                                <div className='normal negative'>
                                    <div className='red'></div>
                                </div>
                                <div className='negative-value'>
                                    <h4>-100.0%</h4>
                                </div>
                            </div>
                        </div>
                        <div className='twoGroup'>
                            <div className='process'>
                                <div className='toptext'>
                                    <h3>Anesthesia</h3>
                                </div>
                                <div className='normal'>
                                    <div className='red green'></div>
                                </div>
                                <div className='positive-val'>
                                    <h4>50.0%</h4>
                                </div>
                            </div>
                            <div className='process'>
                                <div className='toptext'>
                                    <h3>(INICET PYQ)</h3>
                                </div>
                                <div className='normal negative'>
                                    <div className='red'></div>
                                </div>
                                <div className='negative-value'>
                                    <h4>-50.0%</h4>
                                </div>
                            </div>
                        </div>
                        <div className='twoGroup'>
                            <div className='process'>
                                <div className='toptext'>
                                    <h3>Psychiatry</h3>
                                </div>
                                <div className='normal'></div>
                                <div className='positive-val'>
                                    <h4>0.0%</h4>
                                </div>
                            </div>
                            <div className='process'>
                                <div className='toptext'>
                                    <h3>(INICET PYQ)</h3>
                                </div>
                                <div className='normal negative'>
                                    <div className='red'></div>
                                </div>
                                <div className='negative-value'>
                                    <h4>-100.0%</h4>
                                </div>
                            </div>
                        </div>
                        <div className='twoGroup'>
                            <div className='process'>
                                <div className='toptext'>
                                    <h3>Anesthesia</h3>
                                </div>
                                <div className='normal'>
                                    <div className='red green'></div>
                                </div>
                                <div className='positive-val'>
                                    <h4>50.0%</h4>
                                </div>
                            </div>
                            <div className='process'>
                                <div className='toptext'>
                                    <h3>(INICET PYQ)</h3>
                                </div>
                                <div className='normal negative'>
                                    <div className='red'></div>
                                </div>
                                <div className='negative-value'>
                                    <h4>-50.0%</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='QbankModule'>
                    <h2>Q-Bank Module Wise Analysis</h2> 
                    <select 
                        value={selectedValue1} 
                        onChange={handleChange1} 
                        >
                        <option value="">INICET PYQ</option>
                        <option value="option1">NEET PG</option>
                    </select>
                    <div className='accuracyGroup'>
                        <h2>Psychiatry (INICET PYQ)</h2>
                        <div className='count'>
                            <div className='accuText'>
                                <h3>Accuracy</h3>
                            </div>
                            <div className='AccBar'></div>
                            <div className='coutText'>0</div>
                        </div>
                        <div className='total'>
                            <h2>Total Attempt : 2</h2>
                        </div>
                        <div className='totalCorect'>
                            <div className='correctText'>
                                <h3 style={{color:'#54B434'}}>Correct Answers: 0</h3>
                            </div>
                            <div className='correctText'>
                                <h3 style={{color:'#3F5395'}}>Total Questions: 54</h3>
                            </div>
                        </div>
                    </div>
                    <div className='accuracyGroup'>
                        <h2>Dermatology (INICET PYQ)</h2>
                        <div className='count'>
                            <div className='accuText'>
                                <h3>Accuracy</h3>
                            </div>
                            <div className='AccBar'>
                                <div className='activeBar'></div>
                            </div>
                            <div className='coutText'>50</div>
                        </div>
                        <div className='total'>
                            <h2>Total Attempt : 2</h2>
                        </div>
                        <div className='totalCorect'>
                            <div className='correctText'>
                                <h3 style={{color:'#54B434'}}>Correct Answers: 2</h3>
                            </div>
                            <div className='correctText'>
                                <h3 style={{color:'#3F5395'}}>Total Questions: 54</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='Testperformance'>
                    <h2>Your Test Performance</h2>
                    <div className='Testwisechart'>
                        <h3>Test Wise Percentile</h3>
                        <Bar data={data} options={options} />
                    </div>
                </div>
                <div className='comparisonOther'>
                    <h2>Your Test Performance Comparison With Others</h2>
                    <div className="rank-time-container">
                        <div className="rank-section">
                            <h2>Your Rank</h2>
                            <div className="rank-details">
                                <div className="rank-item">
                                    <span>All India</span>
                                    <span className="rank-number">3755</span> of 7985
                                </div>
                                <div className="rank-item">
                                    <div className="location-dropdown">
                                        <span className="location-label">Delhi</span>
                                        <select 
                                            value={selectedValue} 
                                            onChange={handleChange} 
                                            >
                                            <option value=""></option>
                                            <option value="option2"></option>
                                        </select>
                                    </div>
                                    <span className="rank-number">90</span> of 451
                                </div>
                            </div>
                        </div>
                        <div className="time-section">
                            <h2>Total Time Taken</h2>
                            <div className="time-box">
                            <span className="time-text">1:00:30</span>
                            </div>
                        </div>
                    </div>
                    <div className="rank-comparison">
                        <h2>Rank Comparison: You Vs Other</h2>
                        <Slider defaultValue={1} tooltip={{ open: true }} />
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>Compare</th>
                                    <th>Others</th>
                                    <th>You</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Rank</td>
                                    <td>1</td>
                                    <td>2662</td>
                                </tr>
                                <tr>
                                    <td>Marks</td>
                                    <td>200</td>
                                    <td>0.20</td>
                                </tr>
                                <tr>
                                    <td>Correct</td>
                                    <td>200</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>Incorrect</td>
                                    <td>0</td>
                                    <td>6</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='performanceYou'>
                        <h2>Performance You Vs Other</h2>

                        <div className="tabs-container">
                            <div
                                className={`tab-item ${activeTab === 'Tab1' ? 'active' : ''}`}
                                onClick={() => handleTabClick('Tab1')}
                            >
                                Score
                            </div>
                            <div
                                className={`tab-item ${activeTab === 'Tab2' ? 'active' : ''}`}
                                onClick={() => handleTabClick('Tab2')}
                            >
                                Accuracy
                            </div>
                            <div
                                className={`tab-item ${activeTab === 'Tab3' ? 'active' : ''}`}
                                onClick={() => handleTabClick('Tab3')}
                            >
                                Attempted
                            </div>
                            <div
                                className={`tab-item ${activeTab === 'Tab4' ? 'active' : ''}`}
                                onClick={() => handleTabClick('Tab4')}
                            >
                                Corret
                            </div>
                            <div
                                className={`tab-item ${activeTab === 'Tab5' ? 'active' : ''}`}
                                onClick={() => handleTabClick('Tab5')}
                            >
                               Incorrect
                            </div>
                            <div
                                className={`tab-item ${activeTab === 'Tab6' ? 'active' : ''}`}
                                onClick={() => handleTabClick('Tab6')}
                            >
                               Skipped
                            </div>
                            
                        </div>
                        <div className="tab-content">
                            {activeTab === 'Tab1' && 
                            <div className='barchartdata'>
                                <Performancechart/>
                            </div>
                            }
                            {activeTab === 'Tab2' && <div>Accuracy</div>}
                            {activeTab === 'Tab3' && <div>Attempted</div>}
                            {activeTab === 'Tab4' && <div>Corret</div>}
                            {activeTab === 'Tab5' && <div>Incorrect</div>}
                            {activeTab === 'Tab6' && <div>Skipped</div>}
                        </div>
                    </div>
                </div>
                <div className='LeaderBoardModule'>
                    <LeaderboardData/>
                </div>
                <div className='TestReportData'>
                    <TestreportData />
                </div>
                <div className='TestReportwiseAnalysis'>
                   <TestreportwiseAnalysis />
                </div>
                
            </div>
        </div>
        
    </div>
  )
}

export default Viewdetailanalysis