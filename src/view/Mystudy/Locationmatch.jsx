import React from 'react'
import "../Mystudy/style.css";
import "../Mystudy/responsive.css";

const Locationmatch = () => {
  return (
    <div className='Locationmatch'>
        <div className="page-content position-relative">
            <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>Location</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='selfData'>
            <div className='container'>
                <div className='imgGroup'>
                    <h3>Attendance Mark Time: <span>11:00:15</span></h3>
                    <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/profilePic.svg' />
                    <div className='mapData' style={{ width: "100%", height: "300px"}}>
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4192.0701154416365!2d77.31919607604462!3d28.591518685941068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5910bbc16e3%3A0xc4b5b8c1ff0fe2e9!2seMedicoz%20(Delhi%20Academy%20of%20Medical%20Sciences%20Pvt%20Ltd.)!5e1!3m2!1sen!2sin!4v1733996466470!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: "0" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        >
                        </iframe>
                    </div>
                    <div className='textdata'>
                        <h3 className='text-suucess'>Your current location match with class location</h3>
                        {/* <h3 className='text-danger'>Your current location does not match with class location</h3> */}
                    </div>
                </div>
                <div className='btnshowdata'>
                    <button type="button"> <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/mark.svg' />Mark Attendance</button>
                    {/* <button type="button" className='disable'> <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/mark.svg' />Mark Attendance</button> */}
                </div>
            </div>
        </div>


    </div>
  )
}

export default Locationmatch