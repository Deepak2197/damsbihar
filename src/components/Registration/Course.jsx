import React from 'react'
import {useNavigate } from "react-router-dom";
const Course = ({setformstate}) => {
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
                        <li>Course</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='personalDetail educationDetails coUrse'>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <div className='reqDetails'>
                            <h1>Course</h1>
                            <p>Please select your Course</p>
                            {/* <div class="fullLine">
                                <div class="halfLine"></div>
                            </div> */}
                            <div className='yourCourse'>
                                <div className='inputSection'>
                                    <p>
                                        <input type="radio" id="test1" name="radio-group"/>
                                        <label for="test1"><span>NEET PG NEXT</span></label>
                                    </p>
                                    <p>
                                        <input type="radio" id="test2" name="radio-group"/>
                                        <label for="test2"><span>TND Courses NEET PG INICET</span></label>
                                    </p>
                                    <p>
                                        <input type="radio" id="test3" name="radio-group"/>
                                        <label for="test3"><span>1st Year & 2nd Year MBBS</span></label>
                                    </p>
                                    <p>
                                        <input type="radio" id="test4" name="radio-group"/>
                                        <label for="test4"><span>FMGE</span></label>
                                    </p>
                                    <p>
                                        <input type="radio" id="test5" name="radio-group"/>
                                        <label for="test5"><span>USMLE, PLAB</span></label>
                                    </p>
                                    <p>
                                        <input type="radio" id="test6" name="radio-group"/>
                                        <label for="test6"><span>NEET MDS</span></label>
                                    </p>
                                    <p>
                                        <input type="radio" id="test7" name="radio-group"/>
                                        <label for="test7"><span>MEDICAL CME</span></label>
                                    </p>
                                    <p>
                                        <input type="radio" id="test8" name="radio-group"/>
                                        <label for="test8"><span>Resident Teaching NEET SS</span></label>
                                    </p>
                                    <p>
                                        <input type="radio" id="test9" name="radio-group"/>
                                        <label for="test9"><span>Nursing</span></label>
                                    </p>
                                </div>
                            </div>
                            <div style={{display:'flex'}}>
                                <button class="btn btn-primary" onClick={()=>setformstate(5)}>Back</button>
                                <button class="btn btn-primary" onClick={()=>setformstate(7)} >Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Course