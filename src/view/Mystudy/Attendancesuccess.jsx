import React from 'react'
import "../Mystudy/style.css";
import "../Mystudy/responsive.css";


const Attendancesuccess = () => {
  return (
    <div className='Attendancesuccess'>
        <div className="page-content position-relative">
            <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>Your mark attendance Successfully</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className='Markattendance-success'>
            <div className='container'>
                <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/success-img.svg' />
                <div className='succestext'>
                    <h2>Thank you!</h2>
                    <p>Your mark attendance successfully</p>
                </div>
                <div className='homebtn'>
                    <button type='button'><em className='fa fa-home'></em>Home</button>
                </div>
            </div>
        </div>


    </div>
  )
}

export default Attendancesuccess