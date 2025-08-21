import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
const Buyplan = ({setformstate}) => {
    const [show,setshow]=useState(null);
    const handleshow  = (i)=>{
    setshow(i);
    }
  return (
    <div className=''>
        <div className="page-content position-relative">
            <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li><a href="/">Home</a></li>
                        <li>NEET PG NEXT / Buy Plan</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='neetBuyPlan'>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <div className='planSection'>
                            <div className='selectPlan'>
                                <div className='BoxUi'>
                                    <div className='regularLive'>
                                        <h2>Dental Regular Live</h2>
                                        <h3>₹ 40,000</h3>
                                    </div>
                                    <div className='regularLive'>
                                        <h4 style={{cursor:'pointer'}} onClick={()=>handleshow(0)}>View Inclusion {show==0?<FaAngleUp/>:<FaAngleDown/>}</h4>
                                        <h5>Buy Now</h5>
                                    </div>
                                    {  show==0 &&
                                        <div className='coursePart'>
                                            <ul>
                                                <li><em class="fa fa-check"></em>Test Series +</li>
                                                <li><em class="fa fa-check"></em>DQB - G.O.A.T with</li>
                                                <li><em class="fa fa-check"></em>Short Courses DVT - PYQ</li>
                                                <li><em class="fa fa-check"></em>Back To Basic (19 Subjects)</li>
                                                <li><em class="fa fa-check"></em>Ultimate Live Course</li>
                                            </ul>
                                        </div>
                                    }
                                </div>
                                <div className='BoxUi'>
                                    <div className='regularLive'>
                                        <h2>Back To Basics</h2>
                                        <h3>₹ 32,000</h3>
                                    </div>
                                    <div className='regularLive'>
                                        <h4 style={{cursor:'pointer'}} onClick={()=>handleshow(1)}>View Inclusion {show==1?<FaAngleUp/>:<FaAngleDown/>}</h4>
                                        <h5>Buy Now</h5>
                                    </div>
                                    {show ==1 &&
                                        <div className='coursePart'>
                                            <ul>
                                                <li><em class="fa fa-check"></em>Test Series +</li>
                                                <li><em class="fa fa-check"></em>DQB - G.O.A.T with</li>
                                                <li><em class="fa fa-check"></em>Short Courses DVT - PYQ</li>
                                                <li><em class="fa fa-check"></em>Back To Basic (19 Subjects)</li>
                                                <li><em class="fa fa-check"></em>Ultimate Live Course</li>
                                            </ul>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='selectPlan'>
                                <div className='BoxUi'>
                                    <div className='regularLive'>
                                        <h2>Deadly Combo</h2>
                                        <h3>₹ 24,000</h3>
                                    </div>
                                    <div className='regularLive'>
                                        <h4 style={{cursor:'pointer'}} onClick={()=>handleshow(2)}>View Inclusion {show==2?<FaAngleUp/>:<FaAngleDown/>}</h4>
                                        <h5>Buy Now</h5>
                                    </div>
                                    {show ==2 &&
                                        <div className='coursePart'>
                                            <ul>
                                                <li><em class="fa fa-check"></em>Test Series +</li>
                                                <li><em class="fa fa-check"></em>DQB - G.O.A.T with</li>
                                                <li><em class="fa fa-check"></em>Short Courses DVT - PYQ</li>
                                                <li><em class="fa fa-check"></em>Back To Basic (19 Subjects)</li>
                                                <li><em class="fa fa-check"></em>Ultimate Live Course</li>
                                            </ul>
                                        </div>
                                    }
                                </div>
                                <div className='BoxUi'>
                                    <div className='regularLive'>
                                        <h2>Basic Combo</h2>
                                        <h3>₹ 16,000</h3>
                                    </div>
                                    <div className='regularLive'>
                                        <h4 style={{cursor:'pointer'}} onClick={()=>handleshow(3)}>View Inclusion {show==3?<FaAngleUp/>:<FaAngleDown/>}</h4>
                                        <h5>Buy Now</h5>
                                    </div>
                                    {show ==3 &&
                                        <div className='coursePart'>
                                            <ul>
                                                <li><em class="fa fa-check"></em>Test Series +</li>
                                                <li><em class="fa fa-check"></em>DQB - G.O.A.T with</li>
                                                <li><em class="fa fa-check"></em>Short Courses DVT - PYQ</li>
                                                <li><em class="fa fa-check"></em>Back To Basic (19 Subjects)</li>
                                                <li><em class="fa fa-check"></em>Ultimate Live Course</li>
                                            </ul>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='selectPlan'>
                                <div className='BoxUi'>
                                    <div className='regularLive'>
                                        <h2>Test Series</h2>
                                        <h3>₹ 8,000</h3>
                                    </div>
                                    <div className='regularLive'>
                                        <h4 style={{cursor:'pointer'}} onClick={()=>handleshow(4)}>View Inclusion {show==4?<FaAngleUp/>:<FaAngleDown/>}</h4>
                                        <h5>Buy Now</h5>
                                    </div>
                                    {show ==4 &&
                                        <div className='coursePart'>
                                            <ul>
                                                <li><em class="fa fa-check"></em>Test Series +</li>
                                                <li><em class="fa fa-check"></em>DQB - G.O.A.T with</li>
                                                <li><em class="fa fa-check"></em>Short Courses DVT - PYQ</li>
                                                <li><em class="fa fa-check"></em>Back To Basic (19 Subjects)</li>
                                                <li><em class="fa fa-check"></em>Ultimate Live Course</li>
                                            </ul>
                                        </div>
                                    }
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
export default Buyplan