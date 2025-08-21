import React from 'react'
import anatomy from '../Registration/img/anatomy.svg'
import lock from '../Registration/img/lock.svg'
const Neetpyt = ({setformstate}) => {
  return (
    <div className=''>
        <div className="page-content position-relative">
            <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li><a href="/">Home</a></li>
                        <li>NEET PG NEXT / INICET PYT</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='neetAnatomy neetPyt'>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <div className='setSectionNew'>
                            <div className='generalHeading'>
                                <h4>Anatomy</h4>
                            </div>
                            <div className='setPartNew'>
                                <div className='picSecNew'>
                                    <img src={anatomy}/>
                                </div>
                                <div className='textSecNew'>
                                    <h2>Anatomy</h2>
                                    <h3>04:10:51<span><img src={lock}/>Pro</span></h3>
                                    {/* <p>Ended on 18 July . 100 MCQs / 60 mins</p> */}
                                </div>
                            </div>
                        </div>
                        <div className='setSectionNew'>
                            <div className='generalHeading'>
                                <h4>Biochemistry</h4>
                            </div>
                            <div className='setPartNew'>
                                <div className='picSecNew'>
                                    <img src={anatomy}/>
                                </div>
                                <div className='textSecNew'>
                                    <h2>Biochemistry <span>By Dr. Poonam</span></h2>
                                    <h3>04:10:51</h3>
                                </div>
                            </div>
                            <div className='setPartNew'>
                                <div className='picSecNew'>
                                    <img src={anatomy}/>
                                </div>
                                <div className='textSecNew'>
                                    <h2>Biochemistry <span>By Dr. Sonam</span></h2>
                                    <h3>04:10:51<span><img src={lock}/>Pro</span></h3>
                                </div>
                            </div>
                            <div className='setPartNew'>
                                <div className='picSecNew'>
                                    <img src={anatomy}/>
                                </div>
                                <div className='textSecNew'>
                                    <h2>Biochemistry <span>By Dr. Deepak</span></h2>
                                    <h3>04:10:51<span><img src={lock}/>Pro</span></h3>
                                </div>
                            </div>
                        </div>
                        <div className='setSectionNew'>
                            <div className='generalHeading'>
                                <h4>Pathology</h4>
                            </div>
                            <div className='setPartNew'>
                                <div className='picSecNew'>
                                    <img src={anatomy}/>
                                </div>
                                <div className='textSecNew'>
                                    <h2>Pathology</h2>
                                    <h4>( Hemat & Sys-Path ) By Dr. Sanjeev</h4>
                                    <h3>04:10:51<span><img src={lock}/>Pro</span></h3>
                                </div>
                            </div>
                            <div className='setPartNew'>
                                <div className='picSecNew'>
                                    <img src={anatomy}/>
                                </div>
                                <div className='textSecNew'>
                                    <h2>Pathology</h2>
                                    <h4>( Gen-Pathology ) By Dr. Shagun</h4>
                                    <h3>04:10:51<span><img src={lock}/>Pro</span></h3>
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
export default Neetpyt