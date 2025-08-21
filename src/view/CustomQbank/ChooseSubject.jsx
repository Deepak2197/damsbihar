import React from 'react'
const ChooseSubject = ({setformstate}) => {
  return (
    <div className='chooseLevel chooseSubject'>
        <div className='container'>
            <div className='row'>
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
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='levelsBox'>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" checked />
                                                <label className="form-check-label" htmlFor="exampleCheck1">Pediatrics <span className='allTopic'>All Topics</span></label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck2" checked />
                                                <label className="form-check-label" htmlFor="exampleCheck2">Anatomy <span className='allTopic'>All Topics</span></label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck3" checked />
                                                <label className="form-check-label" htmlFor="exampleCheck3">Radiology <span className='allTopic'>All Topics</span></label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck4" checked />
                                                <label className="form-check-label" htmlFor="exampleCheck4">Microbiology <span className='allTopic'>All Topics</span></label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck5" checked />
                                                <label className="form-check-label" htmlFor="exampleCheck5">Medicine <span className='allTopic'>All Topics</span></label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck6" checked />
                                                <label className="form-check-label" htmlFor="exampleCheck6">Biochemistry <span className='allTopic'>All Topics</span></label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck7" checked />
                                                <label className="form-check-label" htmlFor="exampleCheck7">Surgery <span className='allTopic'>All Topics</span></label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck8" checked />
                                                <label className="form-check-label" htmlFor="exampleCheck8">Pharmacology <span className='allTopic'>All Topics</span></label>
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
                            <div className="tab-pane fade" id="chooseLevel">
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='levelsBox'>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck9" />
                                                <label className="form-check-label" htmlFor="exampleCheck9">Pediatrics <span className='allTopic'>All Topics</span></label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck10" />
                                                <label className="form-check-label" htmlFor="exampleCheck10">Anatomy <span className='allTopic'>All Topics</span></label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck11" />
                                                <label className="form-check-label" htmlFor="exampleCheck11">Radiology <span className='allTopic'>All Topics</span></label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck12" />
                                                <label className="form-check-label" htmlFor="exampleCheck12">Microbiology <span className='allTopic'>All Topics</span></label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck13" />
                                                <label className="form-check-label" htmlFor="exampleCheck13">Medicine <span className='allTopic'>All Topics</span></label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck14" />
                                                <label className="form-check-label" htmlFor="exampleCheck14">Biochemistry <span className='allTopic'>All Topics</span></label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck15" />
                                                <label className="form-check-label" htmlFor="exampleCheck15">Surgery <span className='allTopic'>All Topics</span></label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck16" />
                                                <label className="form-check-label" htmlFor="exampleCheck16">Pharmacology <span className='allTopic'>All Topics</span></label>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default ChooseSubject