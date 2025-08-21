import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../API/axiosConfig';
import { Button } from 'antd';
import Modal from "react-bootstrap/Modal";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "../Mycourse/style.css";
import { Spinner } from 'react-bootstrap';
import { clearCart } from '../../network/cartSlice';
import { useDispatch } from 'react-redux';

// import { clearCart } from "../../../network/cartSlice";
const UpgradePlan = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [planlist, setplanlist] = useState([]);
    const [show, setShow] = useState(false);
    const [tabledata, settabledata] = useState([]);
    const [inst, setinst] = useState([]);
    const [showinst, setshowinst] = useState(false);
    const [currentcid,setcurrentcid]= useState(null);
    const [showspiner,setshowspiner]=useState(false);
    const [showspiner1,setshowspiner1]=useState(false);
    const [caldata,setcaldata]=useState({old_course_id:"", course_id:"",course_old_price:""});
    const [toggleIndex, setToggleIndex] = useState(null); // Store index of toggled item
    const handleClose = () => {
        setShow(false);
        setshowinst(false);
        setToggleIndex(null);
        settabledata([]);
    };
    function millisecondsToDate(milliseconds) {
        const date = new Date(milliseconds);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    
    const { id } = useParams();
    const sdate = id.split("CP")[0];
    const course_price = id.split("CP")[1].split("CI")[0];
    const course_id = id.split("CP")[1].split("CI")[1].split("BP")[0];
    const course_base_price = id.split("BP")[1].split("TD")[0];
    const transaction_id = id.split("TD")[1];
    const user_id = sessionStorage.getItem("id");
  let course_start_date =  millisecondsToDate(Number(sdate));

    useEffect(() => {
        const getdata = async () => {
            setshowspiner(true);
            const res = await axiosInstance.post(
              "/v2_data_model/get_course_upgrade_plan",
              {
                course_start_date,
                course_price,
                course_id,
                course_base_price,
                user_id,
              }
            );
           
            setplanlist(res?.data?.data?.course_data);
            setshowspiner(false);
        };
        getdata();
    }, []);

    const HandleCont = async (old_course_id, course_id, instarr) => {
        const res = await axiosInstance.post(
          "/v2_data_model/get_course_module",
          {
            user_id,
            old_course_id,
            course_id,
          }
        );
       
    
       
        settabledata(res?.data?.data);
        setcurrentcid(course_id)
        setinst(instarr);
        setShow(true);
    };

    const HandleInst = () => {
        setshowinst(true);
    };

    const toggleItem = (index) => {
        setToggleIndex(toggleIndex === index ? null : index); // Toggle or close the item
    };




    const buynow = async (id,amount,baseprice) => {
        setshowspiner1(true);
        localStorage.setItem("subID",id)
        const requestData = {
          user_id: user_id,
          course_id: currentcid,
          subscription_id: id,
          facetofacecenter_id: "",
          course_start_date:course_start_date,
          is_part_payment: "3",
          course_registration_amount: amount,
          pending_amount: "",
          payment_id: "",
          id_fr_learning_center_detail: "",
          partner_member_id: "",
          booking_type: "",
          is_cbt: "",
          upgrade_course_price:baseprice,
          transaction_id:transaction_id
        };
    
        await axiosInstance
          .post("/v2_data_model/clearCart", requestData)
          .then((response) => {
            dispatch(clearCart());
            if (response.data.status == true) {
              addtocart(requestData, id);
            }
          })
          .catch((error) => {
            console.error("Error fetching Stream list data:", error);
          });
      };
    
      const addtocart = async (requestData, subid) => {
        localStorage.setItem("CbtType", JSON.stringify("0"));
        await axiosInstance
          .post("/v2_data_model/addCourseToCart", requestData)
          .then((response) => {
            if (response.data.status === true) {
              // dispatch(addItemToCart(response.data.data));
              navigate("/addToCart");
              // window.location.reload();
              toast.success("Course has been added to cart");
            }
            if (response.data.status === false) {
              // window.location.reload();
              toast.error("Course already purchased");
            }
            setshowspiner1(false);
          })
          .catch((error) => {
            console.error("Error fetching list data:", error);
          });
      };

      const handlecaldata = async(i,cp)=>{
         const res1 = await axiosInstance.post(
           "/v2_data_model/get_upgrade_course_price",
           {
             user_id,
             course_id: currentcid,
             old_course_id: course_id,
             course_price: cp,
             course_old_price: course_price,
             course_start_date,
             transaction_id,
           }
         );
         
         setcaldata(res1?.data?.data);
        toggleItem(i);
      }
    return (


        <div className="MainDIV">
            <div className="container">
                {showspiner?(<div style={{display:'flex',justifyContent:'center'}}><Spinner style={{height:'150px',width:'150px'}}/></div>):(<div className='row'>
                    {planlist?.map((data, i) => (
                        <div className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4'>
                            <div key={i} className="boxOutside courseData">
                                <div className="imagePart">
                                    <img src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/login_logo.png" alt="" className=""/> 
                                </div>
                                <div className="textPart">
                                    <h3>{data?.title}</h3>
                                    <h2>Course Type <span>{data.availability_course==2?"Face to Face":"Online"}</span></h2>
                                    <Button className="boxBtn" onClick={() => HandleCont(data?.old_course_id, data?.id, data?.installment,data?.old_course_price)}>Continue</Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Modal show={show} onHide={handleClose} className="ViewModel" style={{ marginTop: '10vh' }}>
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body className="content">
                            <div>
                                {!showinst ? (
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Current Plan</th>
                                                    <th style={{ color: '#f15a22' }}>Upgrade Plan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tabledata?.map((data, i) => (
                                                    <tr key={i}>
                                                        <td className="setTd">{data?.module_name}</td>
                                                        <td>{data?.old_course ? "✔" : "❌"}</td>
                                                        <td>{data?.current ? "✔" : "❌"}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {inst?.length > 0 ? (
                                            <Button className="contBtn" style={{   }} onClick={HandleInst}>Continue</Button>
                                        ) : (
                                            <Button className="NoSubscripBtn" style={{  }}>No Subscription</Button>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        {inst?.map((data, i) => (
                                            <div key={i}>
                                                <div onClick={() => handlecaldata(i,data?.amount_description?.loan_amt)} className='subscriptionPlan'>
                                                    <h5>{data?.name}</h5>
                                                    <h5>₹{data?.amount_description?.loan_amt}<span style={{ marginLeft: '5px', color: '#f15a22' }}>{toggleIndex === i ? "⬇" : "⬆"}</span></h5>
                                                </div>

                                                {toggleIndex === i && (
                                                    <div className="currentPlan">
                                                        <div className="setDataIco" >
                                                            <h6>Current Plan Price</h6>
                                                            <h6>₹{data?.amount_description?.loan_amt}</h6>
                                                        </div>

                                                        <div className="setDataIco" >
                                                            <h6 style={{ color: 'red' }}>Old Plan Price</h6>
                                                            <h6 style={{ color: 'red' }}>{caldata?.course_old_price}</h6>
                                                        </div>

                                                        <div className="setDataIco">
                                                            <h6 style={{ color: 'red' }}>Depreciate Value</h6>
                                                            <h6 style={{ color: 'red' }}>-{caldata?.depreciate_value}</h6>
                                                        </div>

                                                        <div className="setDataIco">
                                                            <h6>Discount</h6>
                                                            <h6>{caldata?.course_old_price_value}</h6>
                                                        </div>

                                                        <hr />
                                                        <div className="setDataIco">
                                                            <h6>Need to Pay</h6>
                                                            <h6>{caldata?.course_pay_price}</h6>
                                                        </div>
                                                        <Button style={{ width: '100%', marginTop: '20px', backgroundColor: '#071952', color: 'white', height: '44px', }} onClick={()=> buynow(data?.id,caldata?.course_pay_price,data?.amount_description?.loan_amt)}>{showspiner1?<Spinner/>:"Pay Now"}</Button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>)}
            </div>
        </div>
    );
};

export default UpgradePlan;
