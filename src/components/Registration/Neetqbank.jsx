import React from 'react'
const Neetqbank = ({setformstate}) => {
  return (
    <div className=''>
        <div className="page-content position-relative">
            <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li><a href="/">Home</a></li>
                        <li>NEET PG NEXT / QBank</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='NewcustomQbank neetQbank'>
            <div className='container'>
                <div className='row'>
                    <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                        <a href="javascriptvoid(0)">
                            <div className='boxSection'>
                                <div className='imgPart'>
                                    <img src={`${window.IMG_BASE_URL}/custom_qbank/bookmark.svg`}  />
                                </div>
                                <div className='textPart'>
                                    <h3 className=''>Bookmarks</h3>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                        <a href="javascriptvoid(0)">
                            <div className='boxSection'>
                                <div className='imgPart'>
                                    <img src={`${window.IMG_BASE_URL}/custom_qbank/custom-qbank.svg`}  />
                                </div>
                                <div className='textPart'>
                                    <h3>Customize QBank</h3>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                        <a href="javascriptvoid(0)">
                            <div className='boxSection'>
                                <div className='imgPart'>
                                    <img src={`${window.IMG_BASE_URL}/custom_qbank/dams-deck.svg`}  />
                                </div>
                                <div className='textPart'>
                                    <h3>Dams Deck</h3>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='mainHeading'>
                            <h1>Choose Subjects</h1>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <a href="javascriptvoid(0)">
                            <div className='anatomyBoxes'>
                                <div className='boximg'>
                                    <div className='boxenter'>
                                        <img src={`${window.IMG_BASE_URL}/custom_qbank/anatomy.svg`}  />
                                    </div>
                                </div>
                                <div className='textSec position-relative'>
                                    <p>Anatomy <span className='textBlock'>20/63 Topics</span></p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <a href="javascriptvoid(0)">
                            <div className='anatomyBoxes'>
                                <div className='boximg'>
                                    <div className='boxenter'>
                                        <img src={`${window.IMG_BASE_URL}/custom_qbank/physiology.svg`}  />
                                    </div>
                                </div>
                                <div className='textSec position-relative'>
                                    <p>Physiology <span className='textBlock'>31/63 Topics</span></p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <a href="javascriptvoid(0)">
                            <div className='anatomyBoxes'>
                                <div className='boximg'>
                                    <div className='boxenter'>
                                        <img src={`${window.IMG_BASE_URL}/custom_qbank/Biochemistryy.svg`}  />
                                    </div>
                                </div>
                                <div className='textSec position-relative'>
                                    <p>Biochemistry <span className='textBlock'>0/63 Topics</span></p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <a href="javascriptvoid(0)">
                            <div className='anatomyBoxes'>
                                <div className='boximg'>
                                    <div className='boxenter'>
                                        <img src={`${window.IMG_BASE_URL}/custom_qbank/Pathology.svg`}  />
                                    </div>
                                </div>
                                <div className='textSec position-relative'>
                                    <p>Pathology <span className='textBlock'>0/63 Topics</span></p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <a href="javascriptvoid(0)">
                            <div className='anatomyBoxes'>
                                <div className='boximg'>
                                    <div className='boxenter'>
                                        <img src={`${window.IMG_BASE_URL}/custom_qbank/Pharmacology.svg`}  />
                                    </div>
                                </div>
                                <div className='textSec position-relative'>
                                    <p>Pharmacology <span className='textBlock'>0/63 Topics</span></p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <a href="javascriptvoid(0)">
                            <div className='anatomyBoxes'>
                                <div className='boximg'>
                                    <div className='boxenter'>
                                        <img src={`${window.IMG_BASE_URL}/custom_qbank/Microbiology.svg`}  />
                                    </div>
                                </div>
                                <div className='textSec position-relative'>
                                    <p>Microbiology <span className='textBlock'>0/63 Topics</span></p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Neetqbank