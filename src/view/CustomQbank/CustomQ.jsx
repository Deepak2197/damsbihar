import React, { useEffect, useState } from 'react'
import CreateTest from './CreateTest';
import "../../assets/css/bookmark/style.css";
const CustomQ = () => {
    return(
        <div className='customQBank'>
            <div className='container-fluid'>
                <div>
                    <CreateTest/>
                </div>
            </div>
        </div>
    )
}
export default CustomQ