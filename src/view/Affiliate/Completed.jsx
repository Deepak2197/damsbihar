import React from 'react'
import { FaGift } from "react-icons/fa";

function Completed() {
  // const users = JSON.parse(sessionStorage.getItem("userData"))
  // users?.profile_picture
  return (
    <div className='completepage'> 
        <div className='container'>
            <div className='updatePro'>
                {/* <img src="https://d2enu63wt1sf3u.cloudfront.net/profile_images/395017_1707224165639_image.jpg" loading="lazy" alt="My Profile" /> */}
                <FaGift style={{fontSize:"100px",color:"green"}} />
                <h3>Congratulation your profile is completed</h3>
                <p>You have won 5 reward points</p>
                {/* <button type="button">Continue</button> */}
            </div>
        </div>
    </div>
  )
}

export default Completed