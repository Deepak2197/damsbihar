import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import Registrationsuccess from '../header/Registrationsuccess';
import Selectstream from '../header/Selectstream';
import Educationdetails from '../header/Educationdetails';
import Exampreparation from './Exampreparation';
import Course from './Course';
import QuizDay from './QuizDay';
import Courses from './Courses';
import Tests from './Tests';
import Neetqbank from './Neetqbank';
import Neetanatomy from './Neetanatomy';
import Neetsubject from './Neetsubject';
import Neetpyt from './Neetpyt';
import Buyplan from './Buyplan';
const Personaldetails = () => {
    const navigate = useNavigate();
    const [formstate,setformstate]=useState(14);
    const handleClick = () => {
    navigate("/registration-success");
    };
    return (
        <div className=''>
            {formstate==1 &&
            <>
                <div className="page-content position-relative">
                    <div className="breadcrumb-row">
                        <div className="container">
                            <ul className="list-inline">
                                <li><a href="/">Home</a></li>
                                <li>Personal Detail</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='personalDetail'>
                        <div className='row'>
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                                <div className='reqDetails'>
                                    <h1>Personal Details</h1>
                                    <p>Please enter required details</p>
                                    <div class="fullLine">
                                        <div class="halfLine"></div>
                                    </div>
                                    <div className='fieldPart'>
                                        <form>
                                            <div className="form-group position-relative">
                                                <label for="num">Your phone number</label>
                                                <input type="number" className="form-control" id="num" name="num" placeholder='+91 9876543210' />
                                                <div className='selected'><img src={`${window.IMG_BASE_URL}/new_login/select.svg`} /></div>
                                            </div>
                                            <div className="form-group">
                                                <label for="name">Your name?</label>
                                                <input type="text" className="form-control" id="name" name="name"/>
                                            </div>
                                            <div className="form-group">
                                                <label for="mail">Your email?</label>
                                                <input type="email" className="form-control" id="mail" name="mail"/>
                                            </div>
                                            <div style={{display:'flex'}}>
                                            <button  class="btn btn-primary" onClick={()=>setformstate(1)}>Back</button>
                                            <button  class="btn btn-primary" onClick={()=>setformstate(2)}>Next</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
            {formstate==2 &&
            <Registrationsuccess setformstate={setformstate}/>
            }
            {formstate ==3 &&
            <Selectstream setformstate={setformstate}/>
            }
            {formstate ==4 &&
            < Educationdetails setformstate={setformstate}/>
            }
            {formstate ==5 &&
            < Exampreparation setformstate={setformstate}/>
            }
            {formstate ==6 &&
            < Course setformstate={setformstate}/>
            }
            {formstate ==7 &&
            < QuizDay setformstate={setformstate}/>
            }
            {formstate ==8 &&
            < Courses setformstate={setformstate}/>
            }
            {formstate ==9 &&
            < Tests setformstate={setformstate}/>
            }
            {formstate ==10 &&
            < Neetqbank setformstate={setformstate}/>
            }
            {formstate ==11 &&
            < Neetanatomy setformstate={setformstate}/>
            }
            {formstate ==12 &&
            < Neetsubject setformstate={setformstate}/>
            }
            {formstate ==13 &&
            < Neetpyt setformstate={setformstate}/>
            }
            {formstate ==14 &&
            < Buyplan setformstate={setformstate}/>
            }
        </div>
    )
    }
export default Personaldetails