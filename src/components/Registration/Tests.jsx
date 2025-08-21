import React from 'react'
import set from '../Registration/img/set.svg'
import lock from '../Registration/img/lock.svg'
const Tests = ({setformstate}) => {
  return (
    <div className=''>
        <div className="page-content position-relative">
            <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li><a href="/">Home</a></li>
                        <li>NEET PG NEXT / Tests</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='neetTest'>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <div className='pillSec scrolling'>
                            <ul className='nav nav-pills '>
                                <li className='nav-item'>
                                    <button className='nav-link active' data-bs-toggle='pill' data-bs-target='#test'>Grand Test</button>
                                </li>
                                <li className='nav-item'>
                                    <button className='nav-link' data-bs-toggle='pill' data-bs-target='#transform'>Transform 10X</button>
                                </li>
                                <li className='nav-item'>
                                    <button className='nav-link' data-bs-toggle='pill' data-bs-target='#neet'>CT NEETPG</button>
                                </li>
                                <li className='nav-item'>
                                    <button className='nav-link' data-bs-toggle='pill' data-bs-target='#fmge'>CT FMGE</button>
                                </li>
                                <li className='nav-item'>
                                    <button className='nav-link' data-bs-toggle='pill' data-bs-target='#swt'>SWT</button>
                                </li>
                            </ul>
                            <div className='tab-content'>
                                <div className='tab-pane fade show active' id='test'>
                                    <div className='setSection'>
                                        <div className='setPart'>
                                            <div className='picSec'>
                                                <img src={set}/>
                                            </div>
                                            <div className='textSec'>
                                                <h2>SWT - Orthopedics</h2>
                                                <h3>(Set B)<span><img src={lock}/>Pro</span></h3>
                                                <p>Ended on 18 July . 100 MCQs / 60 mins</p>
                                            </div>
                                        </div>
                                        <div className='setPart'>
                                            <div className='picSec'>
                                                <img src={set}/>
                                            </div>
                                            <div className='textSec'>
                                                <h2>SWT - Orthopedics</h2>
                                                <h3>(Set A)</h3>
                                                <p>Ended on 18 July . 100 MCQs / 60 mins</p>
                                            </div>
                                        </div>
                                        <div className='setPart' >
                                            <div className='picSec'>
                                                <img src={set}/>
                                            </div>
                                            <div className='textSec'>
                                                <h2>SWT - Orthopedics</h2>
                                                <h3>(Set C)<span><img src={lock}/>Pro</span></h3>
                                                <p>Ended on 18 July . 100 MCQs / 60 mins</p>
                                            </div>
                                        </div>
                                        <div className='setPart' >
                                            <div className='picSec'>
                                                <img src={set}/>
                                            </div>
                                            <div className='textSec'>
                                                <h2>SWT - Orthopedics</h2>
                                                <h3>(Set B)</h3>
                                                <p>Ended on 18 July . 100 MCQs / 60 mins</p>
                                            </div>
                                        </div>
                                        <div className='setPart' >
                                            <div className='picSec'>
                                                <img src={set}/>
                                            </div>
                                            <div className='textSec'>
                                                <h2>SWT - Orthopedics</h2>
                                                <h3>(Set A)</h3>
                                                <p>Ended on 18 July . 100 MCQs / 60 mins</p>
                                            </div>
                                        </div>
                                        <div className='setPart' >
                                            <div className='picSec'>
                                                <img src={set}/>
                                            </div>
                                            <div className='textSec'>
                                                <h2>SWT - Orthopedics</h2>
                                                <h3>(Set A)<span><img src={lock}/>Pro</span></h3>
                                                <p>Ended on 18 July . 100 MCQs / 60 mins</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='tab-pane fade' id='transform'>
                                    Transform 10X
                                </div>
                                <div className='tab-pane fade' id='neet'>
                                    NEET
                                </div>
                                <div className='tab-pane fade' id='fmge'>
                                    FMGE
                                </div>
                                <div className='tab-pane fade' id='swt'>
                                    SWT
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
export default Tests