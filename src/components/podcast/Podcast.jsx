import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { toast } from "react-toastify";
import axiosInstance from "../../API/axiosConfig";
import "./Podcast.css";
import { API_ENDPOINTS } from "../../ulits/apiConstant";

const Podcast = ({ userId }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [podcastStates, setPodcastStates] = useState({});
  const [currentPlayingId, setCurrentPlayingId] = useState(null);

  const getPodcastData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
      API_ENDPOINTS.PODCAST.DATA,
        { user_id: userId }
      );
      const podcastData = response?.data?.data?.my_podcast || [];
      const uniquePodcasts = podcastData.filter(
        (podcast, index, self) =>
          index === self.findIndex((p) => p.id === podcast.id)
      );
      setPodcasts(uniquePodcasts);

      const initialStates = uniquePodcasts.reduce((acc, podcast) => {
        acc[podcast.id] = {
          isPlaying: false,
          currentTime: 0,
          duration: 0,
          playbackRate: 1.0,
          isWaveSurferReady: false,
          isMuted: false, // Add isMuted state
          waveSurferRef: React.createRef(),
          waveformRef: React.createRef(),
        };
        return acc;
      }, {});
      setPodcastStates(initialStates);
    } catch (err) {
      console.error("Error fetching podcast data:", err);
      toast.error("Failed to load podcasts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getPodcastData();
    } else {
      toast.error("User ID is missing. Please log in.");
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    podcasts.forEach((podcast) => {
      const waveformRef = podcastStates[podcast.id]?.waveformRef;
      const waveSurferRef = podcastStates[podcast.id]?.waveSurferRef;

      if (waveformRef?.current && waveSurferRef?.current === null) {
        try {
          waveSurferRef.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "#ccc",
            progressColor: "#007AFF",
            cursorColor: "transparent",
            barWidth: 2,
            barHeight: 1,
            barGap: 1,
            height: 40,
            responsive: true,
            hideScrollbar: true,
          });

          waveSurferRef.current.on("finish", () => {
            setPodcastStates((prev) => ({
              ...prev,
              [podcast.id]: { ...prev[podcast.id], isPlaying: false },
            }));
            setCurrentPlayingId(null);
          });

          waveSurferRef.current.on("audioprocess", () => {
            setPodcastStates((prev) => ({
              ...prev,
              [podcast.id]: {
                ...prev[podcast.id],
                currentTime: waveSurferRef.current.getCurrentTime(),
              },
            }));
          });

          waveSurferRef.current.on("ready", () => {
            setPodcastStates((prev) => ({
              ...prev,
              [podcast.id]: {
                ...prev[podcast.id],
                duration: waveSurferRef.current.getDuration(),
                isWaveSurferReady: true,
              },
            }));
          });

          waveSurferRef.current.on("error", (error) => {
            console.error("WaveSurfer error:", error);
            setPodcastStates((prev) => ({
              ...prev,
              [podcast.id]: {
                ...prev[podcast.id],
                isPlaying: false,
                isWaveSurferReady: false,
              },
            }));
            if (currentPlayingId === podcast.id) {
              setCurrentPlayingId(null);
            }
          });

          waveSurferRef.current.load(podcast.audio_url);
        } catch (error) {
          console.error("Error initializing WaveSurfer:", error);
          toast.error("Failed to initialize audio player.");
          setPodcastStates((prev) => ({
            ...prev,
            [podcast.id]: {
              ...prev[podcast.id],
              isWaveSurferReady: false,
            },
          }));
        }
      }
    });

    return () => {
      Object.entries(podcastStates).forEach(([id, state]) => {
        if (state.waveSurferRef?.current) {
          if (state.isPlaying) {
            state.waveSurferRef.current.pause();
          }
          state.waveSurferRef.current.destroy();
          state.waveSurferRef.current = null;
        }
      });
      setCurrentPlayingId(null);
    };
  }, [podcasts]);

  const stopAllPodcasts = () => {
    Object.entries(podcastStates).forEach(([id, state]) => {
      if (state.waveSurferRef?.current && state.isPlaying) {
        state.waveSurferRef.current.pause();
        setPodcastStates((prev) => ({
          ...prev,
          [id]: { ...prev[id], isPlaying: false },
        }));
      }
    });
    setCurrentPlayingId(null);
  };

  const togglePlayPause = (podcastId) => {
    const podcastState = podcastStates[podcastId];
    const waveSurferRef = podcastState?.waveSurferRef;

    if (!waveSurferRef?.current || !podcastState?.isWaveSurferReady) {
      toast.error("Audio player is not ready yet. Please wait.");
      return;
    }

    if (podcastState.isPlaying && currentPlayingId === podcastId) {
      waveSurferRef.current.pause();
      setPodcastStates((prev) => ({
        ...prev,
        [podcastId]: { ...prev[podcastId], isPlaying: false },
      }));
      setCurrentPlayingId(null);
    } else {
      stopAllPodcasts();
      waveSurferRef.current.play().catch((error) => {
        toast.error("Failed to play podcast.");
        console.error("Playback error:", error);
        return;
      });
      setPodcastStates((prev) => ({
        ...prev,
        [podcastId]: { ...prev[podcastId], isPlaying: true },
      }));
      setCurrentPlayingId(podcastId);
    }
  };

  const handleForward = (podcastId) => {
    const podcastState = podcastStates[podcastId];
    const waveSurferRef = podcastState?.waveSurferRef;

    if (!waveSurferRef?.current || !podcastState?.isWaveSurferReady) return;

    const newTime = Math.min(
      waveSurferRef.current.getCurrentTime() + 10,
      waveSurferRef.current.getDuration()
    );
    waveSurferRef.current.seekTo(newTime / waveSurferRef.current.getDuration());
    setPodcastStates((prev) => ({
      ...prev,
      [podcastId]: { ...prev[podcastId], currentTime: newTime },
    }));
  };

  const handleBackward = (podcastId) => {
    const podcastState = podcastStates[podcastId];
    const waveSurferRef = podcastState?.waveSurferRef;

    if (!waveSurferRef?.current || !podcastState?.isWaveSurferReady) return;

    const newTime = Math.max(waveSurferRef.current.getCurrentTime() - 10, 0);
    waveSurferRef.current.seekTo(newTime / waveSurferRef.current.getDuration());
    setPodcastStates((prev) => ({
      ...prev,
      [podcastId]: { ...prev[podcastId], currentTime: newTime },
    }));
  };

  const handleSpeedChange = (podcastId) => {
    const podcastState = podcastStates[podcastId];
    const waveSurferRef = podcastState?.waveSurferRef;

    if (!waveSurferRef?.current || !podcastState?.isWaveSurferReady) return;

    const newSpeed =
      podcastState.playbackRate === 1.0
        ? 1.5
        : podcastState.playbackRate === 1.5
        ? 2.0
        : 1.0;
    setPodcastStates((prev) => ({
      ...prev,
      [podcastId]: { ...prev[podcastId], playbackRate: newSpeed },
    }));
    waveSurferRef.current.setPlaybackRate(newSpeed);
  };

  // New: Handle mute/unmute toggle
  const handleMuteToggle = (podcastId) => {
    const podcastState = podcastStates[podcastId];
    const waveSurferRef = podcastState?.waveSurferRef;

    if (!waveSurferRef?.current || !podcastState?.isWaveSurferReady) {
      toast.error("Audio player is not ready yet. Please wait.");
      return;
    }

    const newMutedState = !podcastState.isMuted;
    waveSurferRef.current.setVolume(newMutedState ? 0 : 1); // Mute (0) or unmute (1)
    setPodcastStates((prev) => ({
      ...prev,
      [podcastId]: { ...prev[podcastId], isMuted: newMutedState },
    }));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div className="podcast-gallery">
      {loading ? (
        <p>Loading podcasts...</p>
      ) : podcasts.length === 0 ? (
        <p>No podcasts available.</p>
      ) : (
        podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-item">
            <div className="waveform-container">
              <div
                ref={podcastStates[podcast.id]?.waveformRef}
                className="waveform"
              />
              <div className="time-display">
                <span className="time start">
                  {formatTime(podcastStates[podcast.id]?.currentTime || 0)}
                </span>
                <span className="time end">
                  {formatTime(podcastStates[podcast.id]?.duration || 0)}
                </span>
              </div>
            </div>

            <div className="controls">
              <button
                className="speed-btn"
                onClick={() => handleSpeedChange(podcast.id)}
                disabled={!podcastStates[podcast.id]?.isWaveSurferReady}
              >
                {podcastStates[podcast.id]?.playbackRate.toFixed(1) || "1.0"}
              </button>
              <button
                className="control-btn"
                onClick={() => handleBackward(podcast.id)}
                disabled={!podcastStates[podcast.id]?.isWaveSurferReady}
              >
                <i className="fa fa-backward"></i> 10
              </button>
              <button
                className="play-pause-btn"
                onClick={() => togglePlayPause(podcast.id)}
                disabled={!podcastStates[podcast.id]?.isWaveSurferReady}
              >
                {podcastStates[podcast.id]?.isPlaying ? (
                  <i className="fa fa-pause"></i>
                ) : (
                  <i className="fa fa-play"></i>
                )}
              </button>
              <button
                className="control-btn"
                onClick={() => handleForward(podcast.id)}
                disabled={!podcastStates[podcast.id]?.isWaveSurferReady}
              >
                10 <i className="fa fa-forward"></i>
              </button>
              <button
                className="volume-btn"
                onClick={() => handleMuteToggle(podcast.id)} // Add onClick
                disabled={!podcastStates[podcast.id]?.isWaveSurferReady}
              >
                <i
                  className={
                    podcastStates[podcast.id]?.isMuted
                      ? "fa fa-volume-off"
                      : "fa fa-volume-up"
                  }
                ></i>
              </button>
            </div>

            <div className="podcast-info">
              <p>{podcast.title}</p>
              <div className="podcast-meta">
                <span>
                  <i className="fa fa-microphone"></i> {podcast.created_by}
                </span>
                <span>
                  <i className="fa fa-music"></i> Total Play {podcast.views}
                </span>
                <button className="share-btn"></button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Podcast;
