import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../API/axiosConfig';
import { Link, useParams } from 'react-router-dom';

const SubjectWiseCard = () => {
    const user_id = sessionStorage.getItem("id");
    const {id}= useParams();

    const [carddata, setcarddata] = useState([]);
    useEffect(() => {
        const getdata = async () => {
            const res = await axiosInstance.post(
              "/v2_data_model/subject_wise_card_progress",
              { user_id: user_id }
            );
            console.log(res?.data?.data)
            setcarddata(res?.data?.data);
        }
        getdata()
    }, []);
    return (
        <div className="SubjwiseProgress">
            <div className="page-content position-relative">
                {/* <div className="breadcrumb-row">
                    <div className="container">
                        <ul className="list-inline">
                            <li><a href={'/'}>Home</a></li>
                            <li>Subject Wise</li>
                        </ul>
                    </div>
                </div> */}
            </div>
            <div className="container">
                    <h4><b>Readable Cards :</b>{carddata?.read_card}</h4>
                    <h4><b>Total Cards :</b>{carddata?.total_card}</h4>
                    {carddata?.decks?.map((item, i) => (
                        <div style={{ marginTop: '40px' }}>
                        {item?.subdeck.length>0 && 
                            <div className='tableArrunddata'>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th><h4>{item?.title}</h4></th>
                                                <th>Total Cards</th>
                                                <th>Studied Cards</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item?.subdeck?.map((subdata,i)=>(
                                            <tr>
                                                <td>{subdata?.title}</td>
                                                <td>{subdata?.total}</td>
                                                <td>{subdata?.read}</td>
                                            </tr>
                                            ))}
        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            }
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default SubjectWiseCard