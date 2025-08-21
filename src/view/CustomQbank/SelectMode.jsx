import React from 'react'
const SelectMode = () => {
  return (
    <div className='chooseLevel selectMode'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='difLevel'>
                        <h2><img src={`${window.IMG_BASE_URL}/custom_qbank/level.svg`}  /> Choose Your Preferences</h2>
                    </div>
                    <div className='headmain'>
                        <h2>Select Mode:</h2>
                    </div>
                </div>
                <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='modeOption'>
                        <div className='modeimg'>
                            <img src={`${window.IMG_BASE_URL}/custom_qbank/exam.svg`}  />
                        </div>
                        <div className='modetext'>
                            <h3>Exam Mode</h3>
                            <p>Solutions and References will be visible after completion of the QBank.</p>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='modeOption'>
                        <div className='modeimg'>
                            <img src={`${window.IMG_BASE_URL}/custom_qbank/guide.svg`}  />
                        </div>
                        <div className='modetext'>
                            <h3>Guide Mode</h3>
                            <p>Solutions and References will be visible while the question is being attempted.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default SelectMode