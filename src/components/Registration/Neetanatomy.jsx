import React from 'react'
import anatomy from '../Registration/img/anatomy.svg'
import lock from '../Registration/img/lock.svg'
const Neetanatomy = ({setformstate}) => {
  return (
    <div className=''>
        <div className="page-content position-relative">
            <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li><a href="/">Home</a></li>
                        <li>NEET PG NEXT / QBank / Anatomy</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='neetTest neetAnatomy'>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <div className='subTopic'>
                            <h3>Anatomy</h3>
                            <ul>
                                <li>25 Topics</li>
                                <li>123 Sub Topics</li>
                                <li>854 Questions</li>
                            </ul>
                        </div>
                        <div className='pillSec scrolling'>
                            <ul className='nav nav-pills '>
                                <li className='nav-item'>
                                    <button className='nav-link active' data-bs-toggle='pill' data-bs-target='#all'>All</button>
                                </li>
                                <li className='nav-item'>
                                    <button className='nav-link' data-bs-toggle='pill' data-bs-target='#paused'>Paused</button>
                                </li>
                                <li className='nav-item'>
                                    <button className='nav-link' data-bs-toggle='pill' data-bs-target='#completed'>Completed</button>
                                </li>
                                <li className='nav-item'>
                                    <button className='nav-link' data-bs-toggle='pill' data-bs-target='#nostarted'>Not Started</button>
                                </li>
                                <li className='nav-item'>
                                    <button className='nav-link' data-bs-toggle='pill' data-bs-target='#free'>Free</button>
                                </li>
                            </ul>
                            <div className='tab-content'>
                                <div className='tab-pane fade show active' id='all'>
                                    <div className='setSectionNew'>
                                        <div className='generalHeading'>
                                            <h4>1. General Embryology</h4>
                                        </div>
                                        <div className='setPartNew'>
                                            <div className='picSecNew'>
                                                <img src={anatomy}/>
                                            </div>
                                            <div className='textSecNew'>
                                                <h2>Head, Face, Neck & Brain</h2>
                                                <h3><em class="fa fa-star"></em> 4.6 | 11 MCQs<span><img src={lock}/>Pro</span></h3>
                                                {/* <p>Ended on 18 July . 100 MCQs / 60 mins</p> */}
                                            </div>
                                        </div>
                                        <div className='setPartNew'>
                                            <div className='picSecNew'>
                                                <img src={anatomy}/>
                                            </div>
                                            <div className='textSecNew'>
                                                <h2>General Anatomy & Embryology</h2>
                                                <h3><em class="fa fa-star"></em> 4.6 | 11 MCQs<span><img src={lock}/>Pro</span></h3>
                                            </div>
                                        </div>
                                        <div className='setPartNew'>
                                            <div className='picSecNew'>
                                                <img src={anatomy}/>
                                            </div>
                                            <div className='textSecNew'>
                                                <h2>Anatomy Clinical Vignettes</h2>
                                                <h3><em class="fa fa-star"></em> 4.6 | 11 MCQs</h3>
                                            </div>
                                        </div>
                                        <div className='setPartNew'>
                                            <div className='picSecNew'>
                                                <img src={anatomy}/>
                                            </div>
                                            <div className='textSecNew'>
                                                <h2>Abdomen & Pelvis</h2>
                                                <h3><em class="fa fa-star"></em> 4.6 | 11 MCQs<span><img src={lock}/>Pro</span></h3>
                                            </div>
                                        </div>
                                        <div className='setPartNew'>
                                            <div className='picSecNew'>
                                                <img src={anatomy}/>
                                            </div>
                                            <div className='textSecNew'>
                                                <h2>Head, Face, Neck & Brain</h2>
                                                <h3><em class="fa fa-star"></em> 4.6 | 11 MCQs</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='setSectionNew'>
                                        <div className='generalHeading'>
                                            <h4>2. Histology</h4>
                                        </div>
                                        <div className='setPartNew'>
                                            <div className='picSecNew'>
                                                <img src={anatomy}/>
                                            </div>
                                            <div className='textSecNew'>
                                                <h2>Upper Limb</h2>
                                                <h3><em class="fa fa-star"></em> 4.6 | 11 MCQs<span><img src={lock}/>Pro</span></h3>
                                            </div>
                                        </div>
                                        <div className='setPartNew'>
                                            <div className='picSecNew'>
                                                <img src={anatomy}/>
                                            </div>
                                            <div className='textSecNew'>
                                                <h2>Thoarx</h2>
                                                <h3><em class="fa fa-star"></em> 4.6 | 11 MCQs</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='tab-pane fade' id='paused'>
                                    Paused
                                </div>
                                <div className='tab-pane fade' id='completed'>
                                    Completed
                                </div>
                                <div className='tab-pane fade' id='nostarted'>
                                    Not Started
                                </div>
                                <div className='tab-pane fade' id='free'>
                                    <div className='setSectionNew'>
                                        <div className='generalHeading'>
                                            <h4>1. General Embryology</h4>
                                        </div>
                                        <div className='setPartNew'>
                                            <div className='picSecNew'>
                                                <img src={anatomy}/>
                                            </div>
                                            <div className='textSecNew'>
                                                <h2>General Anatomy & Embryology</h2>
                                                <h3><em class="fa fa-star"></em> 4.6 | 11 MCQs</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='setSectionNew'>
                                        <div className='generalHeading'>
                                            <h4>2. Histology</h4>
                                        </div>
                                        <div className='setPartNew'>
                                            <div className='picSecNew'>
                                                <img src={anatomy}/>
                                            </div>
                                            <div className='textSecNew'>
                                                <h2>Thoarx</h2>
                                                <h3><em class="fa fa-star"></em> 4.6 | 11 MCQs</h3>
                                            </div>
                                        </div>
                                    </div>
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
export default Neetanatomy