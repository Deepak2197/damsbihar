import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../API/axiosConfig';
import { AiFillWarning } from 'react-icons/ai';

const ResetTest = ({ user_id, test_series_id }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  const handleStart = async () => {
    await axiosInstance.post("v2_data_model/get_cbt_test_reset", {
      user_id: user_id,
      test_series_id: test_series_id,
    });
    navigate(`/test-home/nur/${user_id}t${test_series_id}`);
    
  };

  const handleCancel = () => {
    window.close();
  };

  return (
    <div style={{ height: '30vh', width: '100vw', display: 'flex',marginTop:'5vh', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
      {isVisible && (
        <>
        <div style={{textAlign:'center'}}>
          <AiFillWarning size={48} color='red' />
          <h1>WARNING!</h1>
        </div>
          <h2 style={{ width: '50%', textAlign: 'center',fontSize:'large' }}>
            Test already attempted In other device! If you wish to continue on this device your previous data will be reset and your test will resume from starting. You can still attempt from previous device if you want to resume your test from the point where you stopped.
          </h2>
          <div>
            <Button style={{ marginRight: '10px', backgroundColor: 'orange',paddingInline:'40px' }}  onClick={handleCancel}>No</Button>
            <Button onClick={handleStart} style={{paddingInline:'40px'}}>Yes</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResetTest;
