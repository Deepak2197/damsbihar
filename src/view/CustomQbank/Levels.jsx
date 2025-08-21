import React from 'react'
const Levels = () => {
  return (
    <div className='chooseLevel'>
        <div className='container'>
            <div className='row'>
                <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='numberHeading'>
                        <h1>No. of Question</h1>
                    </div>
                </div>
                <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div class="custome-select">
                        <select>
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                            <option>40</option>
                            <option>50</option>
                        </select>
                    </div> 
                </div>
                <div className='col-md-12'>
                    <div className='difLevel'>
                        <h2><img src={`${window.IMG_BASE_URL}/custom_qbank/level.svg`}  /> Difficulty Level</h2>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='levelTab'>
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <button className="nav-link active" data-bs-toggle="pill" data-bs-target="#all">All</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" data-bs-toggle="pill" data-bs-target="#chooseLevel">Choose Level</button>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="all">
                                <div className='workingBox'>
                                    <ul className="nav nav-pills">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="pill" data-bs-target="#easy"><img src={`${window.IMG_BASE_URL}/custom_qbank/easy.svg`}  />Easy</button>
                                        </li>
                                        <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#medium"><img src={`${window.IMG_BASE_URL}/custom_qbank/medium.svg`}  />Medium</button>
                                        </li>
                                        <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#hard"><img src={`${window.IMG_BASE_URL}/custom_qbank/hard.svg`}  />Hard</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id="easy">
                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <div className='levelsBox'>
                                                       <h3>Question Form</h3>
                                                        <div className="form-group form-check">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                            <label className="form-check-label" htmlFor="exampleCheck1">All QBank MCQs</label>
                                                        </div>
                                                        <div className="form-group form-check">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                                                            <label className="form-check-label" htmlFor="exampleCheck2">Bookmarked QBank MCQs</label>
                                                        </div>
                                                        <div className="form-group form-check">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck3" />
                                                            <label className="form-check-label" htmlFor="exampleCheck3">Incorrect QBank MCQs</label>
                                                        </div>
                                                        <div className="form-group form-check">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck4" />
                                                            <label className="form-check-label" htmlFor="exampleCheck4">Attempted QBank MCQs</label>
                                                        </div>
                                                        <div className="form-group form-check">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck5" />
                                                            <label className="form-check-label" htmlFor="exampleCheck5">Unattempted QBank MCQs</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className='buttons'>
                                                        <button className='btn'>Next</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="medium">
                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <div className='mcqPart'>
                                                        <p><img src={`${window.IMG_BASE_URL}/custom_qbank/mcq.svg`}  />All QBank MCQs</p>
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className='levelsBox'>
                                                       <h3>Question Form</h3>
                                                        <div className="form-group form-check">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" checked/>
                                                            <label className="form-check-label" htmlFor="exampleCheck1">All QBank MCQs</label>
                                                        </div>
                                                        <div className="form-group form-check">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                                                            <label className="form-check-label" htmlFor="exampleCheck2">Bookmarked QBank MCQs</label>
                                                        </div>
                                                        <div className="form-group form-check">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck3" />
                                                            <label className="form-check-label" htmlFor="exampleCheck3">Incorrect QBank MCQs</label>
                                                        </div>
                                                        <div className="form-group form-check">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck4" />
                                                            <label className="form-check-label" htmlFor="exampleCheck4">Attempted QBank MCQs</label>
                                                        </div>
                                                        <div className="form-group form-check">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck5" />
                                                            <label className="form-check-label" htmlFor="exampleCheck5">Unattempted QBank MCQs</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className='buttons'>
                                                        <button className='btn'>Next</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="hard">
                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <div className='levelsBox'>
                                                        Hard
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="chooseLevel">
                                <div className='workingBox'>
                                    Choose Level
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
export default Levels




