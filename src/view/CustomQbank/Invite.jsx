import React, { useEffect, useState } from 'react'
import axiosInstance from '../../API/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../ulits/apiConstant';
const Invite = () => {
    const user_id = sessionStorage.getItem("id");
    const [defaultuser,setdefaultuser]=useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
const getbydefault = async()=>{
    const res = await axiosInstance.post(
      API_ENDPOINTS.CUSTOM_QBANK.INVITE_CUSTOM_QBANK,
      { user_id: user_id }
    );
    setdefaultuser(res?.data?.data?.record);
}
getbydefault();

    },[]);


    const handleStartExam = (mode,test_series_id)=>{
        
        try {
            const width = screen.availWidth;
            const height = screen.availHeight;
            const left = 0;
            const top = 0;
            const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;
            // Open the new window
            if(mode ==1)
            {
                window.open(`/exam-mode/${user_id}t${test_series_id}`, "_blank", features);

            }else{
                window.open(`/reg-mode/${user_id}t${test_series_id}`, "_blank", features);
            }

          } catch (error) {
            console.log(error);
          }
}
    


const handleResume = (mode,test_series_id)=>{
 
    try {
        const width = screen.availWidth;
        const height = screen.availHeight;
        const left = 0;
        const top = 0;
        const features = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`;
        // Open the new window
        if(mode ==1)
        {
            window.open(`/paused-exam-mode/${user_id}t${test_series_id}`, "_blank", features);

        }else{
            window.open(`/paused-reg-mode/${user_id}t${test_series_id}`, "_blank", features);
        }

      } catch (error) {
        console.log(error);
      }
}
const handleReview = (id)=>{
    navigate(`/testresultcustom/${id}`)
}
  return (
    <div className='invitedQBank'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='inviteHead'>
                        <h3>Your Qbank Created</h3>
                    </div>
                </div>
                {defaultuser?.map((data,i)=>(
                <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4' key={i}>
                    <div className='inviteDivSet'>
                        <div className='qbankPart'>
                            <div className='boximg'>
                                <div className='namePart'>
                                    <h3>{data?.invite_users_name?.substring(0,2)}</h3>
                                </div>
                            </div>
                            <div className='qbankinvite position-relative'>
                                <h1>{data?.invite_users_name}</h1>
                                <h2><span class="examModetext">Regular</span> <em class="fa fa-circle"></em> 10 Questions</h2>
                                {/* <p>{data?.invite_users_name}<span className='inviteBlock'>Invited you for QBank MCQs</span></p> */}
                                <div className='btnGrp'>
                                    {!data?.status
                                    &&
                                    <button className='btn' onClick={()=>handleStartExam(data?.mode,data?.id)}>Receive</button>
                                    }
                                    {data?.status ==0
                                    &&
                                    <button className='btn' onClick={()=>handleReview(data?.id)}>Result</button>
                                    }
                                    {data?.status ==1
                                    &&
                                    <button className='btn' onClick = {()=>handleResume(data?.mode,data?.id)}>Resume</button>
                                    }
                                    <button className='btn send'>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            <div className='row'>
                <div className='col-md-12 mt-5'>
                    <div className='inviteHead'>
                        <h3>Your Qbank Challenges</h3>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div class="inviteDivSet">
                        <div class="qbankPart">
                            <div class="boximg">
                                <div class="namePart">
                                    <h3>Vh</h3>
                                </div>
                            </div>
                            <div class="qbankinvite position-relative">
                                <h1>Custom Qbank 545757</h1>
                                <h2><span class="examModetext">Exam Mode</span> <em class="fa fa-circle"></em> 10 Questions</h2>
                                <p>Invite by Sunil</p>
                                <div class="btnGrp btnGrpNew">
                                    <button class="btn">Review</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div class="inviteDivSet">
                        <div class="qbankPart">
                            <div class="boximg">
                                <div class="namePart">
                                    <h3>Vh</h3>
                                </div>
                            </div>
                            <div class="qbankinvite position-relative">
                                <h1>Custom Qbank 545757</h1>
                                <h2><span class="examModetext">Exam Mode</span> <em class="fa fa-circle"></em> 10 Questions</h2>
                                <p>Invite by Sunil</p>
                                <div class="btnGrp btnGrpNew">
                                    <button class="btn start">Start</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
export default Invite