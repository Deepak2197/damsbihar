import React, { useState } from 'react';
import "../Mystudy/style.css";
import "../Mystudy/responsive.css";
//import { Link } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";

const Coursetitlepage = () => {

    // Begin: pop up code
  const [videoshowmodel, videoshowdelete] = useState(false);
  const handleClose = () => setShow(false);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  
  // End: pop up code

  return (
    <div className='Coursetitlepage'>
        <div className="page-content position-relative">
            <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>Pathology</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='LiveCourseVideos'>
            <div className='container'>
                <div className='courseVideo'>
                    <div className='innertext'>
                        <div className='livedata'>
                            <div className='video'>
                                <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/video-show.svg' />
                            </div>
                            <div className='showtext'>
                                <h3>Pathology (Hemat & Sys- Path) Dr. Sanjeev</h3>
                                <h4>56min <span><em className='fa fa-circle'></em>101 MB</span></h4>
                            </div>
                        </div>
                        <div className='btnLink'>
                             <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/dots.svg' onClick={() => videoshowdelete(true)}/>
                        </div>
                    </div>
                    <div className='innertext'>
                        <div className='livedata'>
                            <div className='video'>
                                <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/video-show.svg' />
                            </div>
                            <div className='showtext'>
                                <h3>Pathology (Hemat & Sys- Path) Dr. Sanjeev</h3>
                                <h4>56min <span><em className='fa fa-circle'></em>101 MB</span></h4>
                            </div>
                        </div>
                        <div className='btnLink'>
                            <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/dots.svg' onClick={() => videoshowdelete(true)}/>
                        </div>
                    </div>
                    <div className='innertext'>
                        <div className='livedata'>
                            <div className='video'>
                                <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/video-show.svg' />
                            </div>
                            <div className='showtext'>
                                <h3>Pathology (Hemat & Sys- Path) Dr. Sanjeev</h3>
                                <h4>56min <span><em className='fa fa-circle'></em>101 MB</span></h4>
                            </div>
                        </div>
                        <div className='btnLink'>
                            <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/dots.svg' onClick={() => videoshowdelete(true)}/>
                        </div>
                    </div>
                    <div className='innertext'>
                        <div className='livedata'>
                            <div className='video'>
                                <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/video-show.svg' />
                            </div>
                            <div className='showtext'>
                                <h3>Pathology (Hemat & Sys- Path) Dr. Sanjeev</h3>
                                <h4>56min <span><em className='fa fa-circle'></em>101 MB</span></h4>
                            </div>
                        </div>
                        <div className='btnLink'>
                            <img src='https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/study/dots.svg' onClick={() => videoshowdelete(true)}/>
                        </div>
                    </div>
                </div>

               {/* Begin: Model Code  */}
               <Modal
                  show={videoshowmodel}
                  onHide={() => videoshowdelete(false)}
                  className="videoshowModel"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Pathology (Hemat & Sys- Path)</Modal.Title>
                  </Modal.Header>

                    <Modal.Body className="content">
                        <div className='bodydata'>
                            <div className='setdata'>
                                <em className='fa fa-play'></em>
                                <h3>Watch Now</h3>
                            </div>
                            <div className='setdata'>
                                <em className='fa fa-trash'></em>
                                <h3>Delete Download</h3>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>

    </div>
  )
}

export default Coursetitlepage