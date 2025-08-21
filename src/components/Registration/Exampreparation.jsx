import React from 'react'
import {useNavigate } from "react-router-dom";
const Exampreparation = ({setformstate}) => {
    const navigate = useNavigate();
    const handleClick = () => {
    navigate("/course");
    };
  return (
    <div className=''>
        <div className="page-content position-relative">
            <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li><a href="/">Home</a></li>
                        <li>Exam preParation</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='personalDetail selectStream exampreParation'>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <div className='reqDetails'>
                            <h1>Exam Preparation</h1>
                            <p>please select your exam type</p>
                            <div class="fullLine">
                                <div class="halfLine"></div>
                            </div>
                            <div className='streamPart'>
                                <ul className="nav nav-pills flex-column">
                                    <li className="nav-item">
                                        <button className="nav-link" data-bs-toggle="pill">NEET PG</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" data-bs-toggle="pill">NEET MDS</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" data-bs-toggle="pill">NEET SS</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" data-bs-toggle="pill">NEET SS Surgery</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" data-bs-toggle="pill">MBBS 1st Year</button>
                                    </li>
                                </ul>
                            </div>
                            <div style={{display:'flex'}}>
                                <button class="btn btn-primary" onClick={()=>setformstate(4)}>Back</button>
                                <button class="btn btn-primary" onClick={()=>setformstate(6)}>Start Learning</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Exampreparation