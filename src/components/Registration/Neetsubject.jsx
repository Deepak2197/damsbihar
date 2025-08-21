import React from 'react'
import dvt from '../Registration/img/dvt.svg'
import pyq from '../Registration/img/pyq.svg'
import nursing from '../Registration/img/nursing.svg'
import { Link } from 'react-router-dom'
const Neetsubject = ({setformstate}) => {
  return (
    <div className=''>
        <div className="page-content position-relative">
            <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li><a href="/">Home</a></li>
                        <li>NEET PG NEXT / Subjects</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='neetSubject'>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <div className='mainHeading'>
                            <h1>Subjects</h1>
                        </div>
                        <div className='BoxSection'>
                            <Link to="">
                                <div className='boxPart'>
                                    <img src={dvt}/>
                                    <p>DAMS DVT 2023-24</p>
                                </div>
                            </Link>
                            <Link to="">
                                <div className='boxPart'>
                                    <img src={pyq}/>
                                    <p>PYQ ka Baap</p>
                                </div>
                            </Link>
                            <Link to="">
                                <div className='boxPart'>
                                    <img src={nursing}/>
                                    <p>Nursing</p>
                                </div>
                            </Link>
                            <Link to="">
                                <div className='boxPart'>
                                    <img src={dvt}/>
                                    <p>DVT 2022</p>
                                </div>
                            </Link>
                            <Link to="">
                                <div className='boxPart'>
                                    <img src={pyq}/>
                                    <p>INICET PYT</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Neetsubject
