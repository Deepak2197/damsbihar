import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
const Recordpodcast = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [duration, setDuration] = useState('00:00:00');
  const [fileSize, setFileSize] = useState(0);

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setDuration(prev => {
          const [hours, minutes, seconds] = prev.split(':').map(Number);
          let newSeconds = seconds + 1;
          let newMinutes = minutes;
          let newHours = hours;

          if (newSeconds === 60) {
            newSeconds = 0;
            newMinutes += 1;
          }
          if (newMinutes === 60) {
            newMinutes = 0;
            newHours += 1;
          }

          return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setDuration('00:00:00');
    setFileSize(0);
    setAudioURL(null);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setFileSize(5.12); // Simulated file size in MB
    setAudioURL('path/to/simulated-audio.mp3');
  };

  const playAudio = () => {
    if (audioURL) {
      
    }
  };

  const saveAudio = () => {
    if (audioURL) {
   
    }
  };

  return (
    <div className="recordPodcast">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>Record Podcast</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="audio-recorder">
        <div className="recorder-circle">
          <img
            src={`${window.IMG_BASE_URL}/emdpublic/podcast/mike.svg`}
            loading="lazy"
            alt="podcast"
          />
          {/* <svg className="headphone-icon" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg> */}
          <div className="progress-ring">
            <div className="progress-ringtwo"></div>
          </div>
        </div>
        <div className="recording-info">
          <span>
            {" "}
            <img
              src={`${window.IMG_BASE_URL}/emdpublic/podcast/duration.svg`}
            />{" "}
            {duration}{" "}
          </span>{" "}
          |{" "}
          <span>
            <img src={`${window.IMG_BASE_URL}/emdpublic/podcast/fsize.svg`} />{" "}
            {fileSize.toFixed(2)} MB
          </span>
        </div>
        <div className="waveform">
          {/* Simulated waveform - you can replace with actual audio visualization */}
          {/* <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div> */}
          <img src={`${window.IMG_BASE_URL}/emdpublic/podcast/waves.png`} />
        </div>
        <div className="controls">
          <button
            className={`control-btn record-btn ${
              isRecording ? "recording" : ""
            }`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            <span className="refresh-icon">
              <em class="fa fa-repeat"></em>
            </span>
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>

          <button
            className="control-btn play-btn"
            onClick={playAudio}
            disabled={!audioURL}
          >
            <span className="play-icon">
              <em class="fa fa-play-circle"></em>
            </span>
            Play Audio
          </button>

          <button
            className="control-btn save-btn"
            onClick={saveAudio}
            disabled={!audioURL}
          >
            Save Audio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recordpodcast;
