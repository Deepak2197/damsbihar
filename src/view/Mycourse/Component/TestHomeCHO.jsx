import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import axiosInstance from '../../API/axiosConfig';
import {FaInfoCircle} from 'react-icons/fa'
import '../../../components/Test_Series/Testpanel.css'

import axios from 'axios';
import axiosInstance from '../../../API/axiosConfig';
const TestHomeCHO = () => {
const {id} = useParams();
const user_id = id.split("t")[0];
const test_series_id = id.split("t")[1];
const [checkstatus,setcheckstatus] = useState(false);
const [ShowWarn,setShowWarn] = useState(false);

const navigate = useNavigate();
const [testdata,settestdata] = useState(null);
useEffect(()=>{
    console.log(user_id,test_series_id)
    const fetchdata = async()=>{
        const response = await axiosInstance.post(`/v2_data_model/test_instruction`,{"user_id":user_id,"test_id":test_series_id});
        console.log(response?.data?.data);
        settestdata(response?.data?.data);
    }
    fetchdata();
},[])

useEffect(() => {
    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    const preventInspect = (event) => {
      if ((event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl+Shift+I
          (event.ctrlKey && event.keyCode === 73)) { // Ctrl+I
        event.preventDefault();
      }
    };

    window.addEventListener('contextmenu', preventContextMenu);
    window.addEventListener('keydown', preventInspect);

    return () => {
      window.removeEventListener('contextmenu', preventContextMenu);
      window.removeEventListener('keydown', preventInspect);
    };
  }, []);

const handleStart = ()=>{
    if(checkstatus)
    {
       
        navigate(`/test-panel/${user_id}t${test_series_id}`)
    }
    else{
    setShowWarn(true);
    }
}

const TickCheck = ()=>{
if(checkstatus)
{
    setcheckstatus(false);
}
else{
    setcheckstatus(true);
}
}
console.log(checkstatus);
  return (
    <div className="TestHome">
       
        <div className="container">
            <div className='testSeriesdata'>
                <h1>{testdata?.basic_info?.test_series_name}</h1>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Test Code</th>
                              
                                <th>Total Questions</th>
                                <th>Total Time</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                                <td>{testdata?.test_series_name}</td>
                            
                                <td>{testdata?.total_questions}</td>
                                <td>{testdata?.time_in_mins} min</td>
                             
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='instruction'>
                    <h5 className='mb-3'>General Instructions:</h5>
                    <ol style={{marginLeft: "20px"}}>
                        <ul>
                            {
                        testdata?.instruction.map((data,index)=>(
                            <li className="li1 common" key={index}>{data}</li>
                         
                        ))
                        }
                          
                        </ul>
                    </ol>
                </div>

                <div className="startButton">
                    <p className="m-0"><input type="checkbox" id="checkboxStatus" checked={checkstatus} onChange={TickCheck} /> I have read and understood the instructions. I agree that in case of not adhering to the exam instructions.
                    I will be disqualified from giving the exam.
                    </p>
                    <span className="btn btn-primary" id="startest" onClick={handleStart}>START TEST</span>
                    <input type="hidden" name="" id="timer" value="1"/>
                </div>
                { ShowWarn &&

                    <span  style={{backgroundColor:'GrayText',color:'white',padding:'4px',borderRadius:'5px'}}><FaInfoCircle style={{marginRight:'5px'}}/>Tick on terms and condition checkbox</span>
                }
            </div>
        </div>
    </div>
  )
}

export default TestHomeCHO