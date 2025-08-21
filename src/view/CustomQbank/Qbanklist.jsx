import React from 'react'
const Qbanklist = () => {
  return (
    <div className='QbankList'>
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <div className='allQBankhead'>
                        <h1>QBank From All Qbank</h1>
                        <p>Created at 12:33 PM on <span className='textOrg'>01 February 2023</span></p>
                        <p>You solved this at 11:32 AM on  <span className='textOrg'>04 February 2023</span></p>
                    </div>
                    <div className='subJect'>
                        <p>Subject:<span className='textnewOrg'>56 Subject Select</span></p>
                        <p>Difficulty Level:<span className='textnewOrg'>All</span></p>
                        <p>Mode:<span className='textnewOrg'>Guide Mode</span></p>
                    </div>
                    <div className='QbankComplete'>
                        <img src={`${window.IMG_BASE_URL}/custom_qbank/qsnbank.svg`}  />
                        <h3>Question Bank</h3>
                        <h4>10 Questions</h4>
                        <h5>All completed</h5>
                    </div>
                    <div className='rewButton'>
                        <button className='btn'>Review</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Qbanklist