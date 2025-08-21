import React, { useEffect, useState, useRef } from "react";
import { Room, RoomEvent, VideoPresets } from "livekit-client";
import "../Mycourse/styleNew.css";
// Configuration for the Heygen API
const API_CONFIG = {
  apiKey: "NTYwYmFhMjY2MGM0NDNiZTk3NWM2MzZmYmM2ZTJmNDAtMTc0NzY1ODc0MQ==",
  serverUrl: "https://api.heygen.com",
};

function AiStudy() {
  const [text, setText] = useState("");
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [aiResponses, setAiResponses] = useState([]); // State for AI responses
  const chatBoxRef = useRef(null);
  const aiResponseBoxRef = useRef(null);

  // Refs for session state and WebSocket
  const sessionInfoRef = useRef(null);
  const roomRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const webSocketRef = useRef(null);
  const sessionTokenRef = useRef(null);
  const mediaElementRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);

  // Add a new chat message
  const addChatMessage = (sender, message) => {
    const newMessage = { sender, message, timestamp: new Date().toISOString() };
    setChatMessages((prev) => [...prev, newMessage]);

    // Scroll to bottom after state update
    setTimeout(() => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    }, 0);
  };

  // Add a new AI response
  const addAiResponse = (response) => {
    setAiResponses((prev) => [...prev, response]);

    // Scroll to bottom after state update
    setTimeout(() => {
      if (aiResponseBoxRef.current) {
        aiResponseBoxRef.current.scrollTop =
          aiResponseBoxRef.current.scrollHeight;
      }
    }, 0);
  };

  // Get session token
  const getSessionToken = async () => {
    try {
      const response = await fetch(
        `${API_CONFIG.serverUrl}/v1/streaming.create_token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": API_CONFIG.apiKey,
          },
        }
      );
      const data = await response.json();
      if (data.data?.token) {
        sessionTokenRef.current = data.data.token;
        return data.data.token;
      } else {
        throw new Error("No session token in response");
      }
    } catch (err) {
      setError("Failed to get session token: " + err.message);
      console.error(err);
      throw err;
    }
  };

  // Connect WebSocket
  const connectWebSocket = (sessionId) => {
    const params = new URLSearchParams({
      session_id: sessionId,
      session_token: sessionTokenRef.current,
      silence_response: false,
      opening_text: "Hello I am Dams, how can I help you?",
      stt_language: "en",
    });

    const wsUrl = `wss://${
      new URL(API_CONFIG.serverUrl).hostname
    }/v1/ws/streaming.chat?${params}`;
    console.log("WebSocket URL:", wsUrl);

    webSocketRef.current = new WebSocket(wsUrl);

    webSocketRef.current.onopen = () => {
      console.log("WebSocket opened");
      setIsWebSocketOpen(true);
      setError(null);
    };

    webSocketRef.current.onmessage = (event) => {
      console.log("WebSocket message:", event.data);
      try {
        const eventData = JSON.parse(event.data);

        if (eventData.type === "chat_response" && eventData.text) {
          addChatMessage("Bot", eventData.text);
          addAiResponse(eventData.text); // Add to AI responses
          setIsSpeaking(true);
          setTimeout(() => setIsSpeaking(false), 3000);
        } else if (eventData.type === "task_response") {
          console.log("TTS Task response:", eventData);
          if (
            eventData.status !== "success" &&
            eventData.message !== "success"
          ) {
            setError(
              "TTS task failed: " + (eventData.error || "Unknown error")
            );
            setIsSpeaking(false);
          } else {
            console.log("TTS task succeeded");
          }
        } else if (eventData.type === "stt_response" && eventData.text) {
          console.log("STT response:", eventData.text);
          addChatMessage("User", eventData.text);
        } else if (eventData.type === "opening_response" && eventData.text) {
          addChatMessage("Bot", eventData.text);
          addAiResponse(eventData.text); // Add to AI responses
          setIsSpeaking(true);
          setTimeout(() => setIsSpeaking(false), 3000);
        } else {
          console.log("Unhandled message type:", eventData.type, eventData);
        }
      } catch (e) {
        console.error("Error parsing WebSocket message:", e);
      }
    };

    webSocketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsWebSocketOpen(false);
      setError("WebSocket error");
      attemptReconnect(sessionId);
    };

    webSocketRef.current.onclose = () => {
      console.log("WebSocket closed");
      setIsWebSocketOpen(false);
      setError("WebSocket closed");
      attemptReconnect(sessionId);
    };
  };

  // Reconnect WebSocket
  const attemptReconnect = (sessionId, retryCount = 0) => {
    if (retryCount >= 5) {
      setError("Max WebSocket reconnection attempts reached");
      return;
    }
    const delay = Math.min(1000 * 2 ** retryCount, 10000);
    console.log(`Reconnecting WebSocket in ${delay}ms...`);
    setTimeout(() => {
      if (sessionInfoRef.current) connectWebSocket(sessionId);
    }, delay);
  };

  // Create new session
  const createNewSession = async () => {
    try {
      if (!sessionTokenRef.current) await getSessionToken();
      if (!sessionTokenRef.current) throw new Error("No session token");

      const response = await fetch(`${API_CONFIG.serverUrl}/v1/streaming.new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionTokenRef.current}`,
        },
        body: JSON.stringify({
          quality: "high",
          avatar_name: "Ann_Therapist_public",
          voice: {
            voice_id: "c8e176c17f814004885fd590e03ff99f",
            rate: 1.0,
          },
          version: "v2",
          video_encoding: "H264",
        }),
      });

      const data = await response.json();
      console.log("Session creation response:", data);
      if (data.data) {
        sessionInfoRef.current = data.data;
        roomRef.current = new Room({
          adaptiveStream: true,
          dynacast: true,
          videoCaptureDefaults: {
            resolution: VideoPresets.h720.resolution,
          },
        });

        mediaStreamRef.current = new MediaStream();

        roomRef.current.on(RoomEvent.TrackSubscribed, (track) => {
          console.log("Track subscribed:", track.kind, track);
          if (track.kind === "video" || track.kind === "audio") {
            mediaStreamRef.current.addTrack(track.mediaStreamTrack);
            if (mediaElementRef.current) {
              mediaElementRef.current.srcObject = mediaStreamRef.current;
              mediaElementRef.current.play().catch((e) => {
                // console.error("Playback error:", e);
                setError("Failed to play video/audio: " + e.message);
              });
            }
          }
        });

        roomRef.current.on(RoomEvent.TrackUnsubscribed, (track) => {
          console.log("Track unsubscribed:", track.kind);
          mediaStreamRef.current.removeTrack(track.mediaStreamTrack);
        });

        roomRef.current.on(RoomEvent.Disconnected, (reason) => {
          console.log("Room disconnected:", reason);
          setError("Room disconnected: " + reason);
        });

        await roomRef.current.prepareConnection(
          sessionInfoRef.current.url,
          sessionInfoRef.current.access_token
        );
        connectWebSocket(sessionInfoRef.current.session_id);
      } else {
        throw new Error(
          "Session creation failed: " + (data.error || "Unknown")
        );
      }
    } catch (err) {
      setError("Failed to create session: " + err.message);
      console.error(err);
    }
  };

  // Start streaming session
  const startStreamingSession = async () => {
    try {
      if (!sessionInfoRef.current) throw new Error("No session");

      const response = await fetch(
        `${API_CONFIG.serverUrl}/v1/streaming.start`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionTokenRef.current}`,
          },
          body: JSON.stringify({
            session_id: sessionInfoRef.current.session_id,
          }),
        }
      );

      const data = await response.json();
      console.log("Streaming start response:", data);
      if (data.message !== "success") {
        throw new Error(
          "Failed to start streaming: " + (data.error || "Unknown")
        );
      }

      await roomRef.current.connect(
        sessionInfoRef.current.url,
        sessionInfoRef.current.access_token
      );
      console.log("Streaming session started");
    } catch (err) {
      setError("Failed to start streaming: " + err.message);
      console.error(err);
    }
  };

  // Send text for TTS with token refresh
  const sendText = async (text) => {
    try {
      if (!sessionInfoRef.current) throw new Error("No session");

      addChatMessage("User", text);
      let response = await fetch(`${API_CONFIG.serverUrl}/v1/streaming.task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionTokenRef.current}`,
        },
        body: JSON.stringify({
          session_id: sessionInfoRef.current.session_id,
          text: text,
          task_type: "talk",
        }),
      });

      let data = await response.json();
      console.log("TTS task response:", data);

      // Handle 401 Unauthorized by refreshing the token
      if (data.code === 400112 || data.message === "Unauthorized") {
        // console.log("Unauthorized error, refreshing session token...");
        await getSessionToken();
        response = await fetch(`${API_CONFIG.serverUrl}/v1/streaming.task`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionTokenRef.current}`,
          },
          body: JSON.stringify({
            session_id: sessionInfoRef.current.session_id,
            text: text,
            task_type: "talk",
          }),
        });
        data = await response.json();
        console.log("Retry TTS task response:", data);
      }

      if (data.message !== "success" && data.code !== 100) {
        throw new Error(
          "TTS task failed: " + (data.error || data.message || "Unknown")
        );
      }
    } catch (err) {
      setError("Failed to send TTS: " + err.message);
      console.error(err);
      setIsSpeaking(false);
    }
  };

  // Start speech recording for STT
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (
          event.data.size > 0 &&
          webSocketRef.current?.readyState === WebSocket.OPEN
        ) {
          console.log("Sending audio chunk:", event.data);
          webSocketRef.current.send(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        console.log("Recording stopped");
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
        audioStreamRef.current = null;
      };

      mediaRecorderRef.current.start(100);
      setIsRecording(true);
      console.log("Recording started");
    } catch (err) {
      setError("Failed to start recording: " + err.message);
      console.error(err);
    }
  };

  // Stop speech recording
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Handle text input submission
  const handleSendText = () => {
    const textValue = text.trim();
    if (!textValue) return;

    if (
      isWebSocketOpen &&
      webSocketRef.current?.readyState === WebSocket.OPEN
    ) {
      sendText(textValue);
      setText("");
    } else {
      setError("WebSocket not connected. Please wait or try again.");
    }
  };

  // Handle browser autoplay
  const handleUserInteraction = () => {
    if (mediaElementRef.current && mediaElementRef.current.paused) {
      mediaElementRef.current.play().catch((e) => {
        console.error("Autoplay error:", e);
        setError("Audio/Video playback blocked: " + e.message);
      });
    }
  };

  // Close session
  const closeSession = async () => {
    try {
      if (sessionInfoRef.current) {
        await fetch(`${API_CONFIG.serverUrl}/v1/streaming.stop`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionTokenRef.current}`,
          },
          body: JSON.stringify({
            session_id: sessionInfoRef.current.session_id,
          }),
        });
      }

      if (webSocketRef.current) webSocketRef.current.close();
      if (roomRef.current) roomRef.current.disconnect();
      if (mediaElementRef.current) mediaElementRef.current.srcObject = null;
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      sessionInfoRef.current = null;
      roomRef.current = null;
      mediaStreamRef.current = null;
      sessionTokenRef.current = null;
      mediaRecorderRef.current = null;
      audioStreamRef.current = null;
      setIsWebSocketOpen(false);
      setIsRecording(false);
      setIsSpeaking(false);
      setError(null);
      setChatMessages([]);
      setAiResponses([]);
    } catch (err) {
      setError("Failed to close session: " + err.message);
      console.error(err);
    }
  };

  // Start session on mount
  useEffect(() => {
    createNewSession().then(() => {
      if (sessionInfoRef.current) startStreamingSession();
    });

    return () => closeSession();
  }, []);

  return (
    <div
      className="App AIstudioSection"
      onClick={handleUserInteraction}
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        paddingBottom: "200px", // Ensure content is not hidden under fixed AI responses box
      }}
    >
      {/* <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>DSb Demo</h1> */}
      {/* {error && (
        <div
          style={{
            color: "red",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#ffe6e6",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )} */}
      {isSpeaking && (
        <div
          style={{
            color: "green",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#e6ffe6",
            borderRadius: "4px",
          }}
        >
          AI is speaking...
        </div>
      )}

      {/* Video Element */}
      <video id="mediaElement" ref={mediaElementRef} autoPlay playsInline />

      {/* Chat Box */}
      <div id="chatBox" ref={chatBoxRef}>
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] px-4 py-2 rounded-lg text-white text-sm ${
              msg.sender === "User"
                ? "bg-blue-600 self-end ml-auto text-right"
                : "bg-gray-600 self-start mr-auto"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      {/* Input and Buttons */}
      <div class="setOfDIvs">
        <textarea
          class="textAreaPart"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask anything"
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            class="sendBtn"
            onClick={handleSendText}
            disabled={!isWebSocketOpen}
            style={{
              backgroundColor: isWebSocketOpen ? "#007bff" : "#ccc",
              cursor: isWebSocketOpen ? "pointer" : "not-allowed",
            }}
          >
            <em class="fa fa-arrow-up"></em>
          </button>
          {/* <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={!isWebSocketOpen}
          style={{
            padding: "8px 16px",
            backgroundColor: isWebSocketOpen
              ? isRecording
                ? "#dc3545"
                : "#28a745"
              : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isWebSocketOpen ? "pointer" : "not-allowed",
          }}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button> */}
          {/* <button
          onClick={closeSession}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Close Session
        </button> */}
          {/* <button
          onClick={() => {
            if (mediaElementRef.current) {
              mediaElementRef.current.muted = !mediaElementRef.current.muted;
              console.log("Audio muted:", mediaElementRef.current.muted);
            }
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ffc107",
            color: "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Toggle Audio
        </button> */}
        </div>
      </div>

      {/* AI Responses Box - Fixed at Bottom */}
      {/* <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundColor: "#ffffff",
          borderTop: "1px solid #ccc",
          padding: "10px 20px",
          zIndex: 1000,
          maxHeight: "200px",
          overflowY: "auto",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            margin: "0 0 10px 0",
            color: "#333",
          }}
        >
          AI Responses:
        </h3>
        <div
          ref={aiResponseBoxRef}
          style={{
            maxHeight: "150px",
            overflowY: "auto",
            padding: "10px",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
          }}
        >
          {aiResponses.length === 0 ? (
            <div style={{ color: "#666" }}>No AI responses yet.</div>
          ) : (
            aiResponses.map((response, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "8px",
                  padding: "8px",
                  backgroundColor: "#e6e6e6",
                  borderRadius: "4px",
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                <strong>AI:</strong> {response}
              </div>
            ))
          )}
        </div>
      </div> */}
    </div>
  );
}

export default AiStudy;
