import React, { useEffect, useRef, useState } from "react";
import Player from "./components/Player";
import Transcript from "./components/Transcript";
import { VIDEOS_JSON, CLIP_FILENAME, CAPTIONS_FILENAME } from "./constants";

import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [clip, setClip] = useState(null);
  const [captions, setCaptions] = useState([]);
  const videoRef = useRef(null);

  // Load available videos
  useEffect(() => {
    fetch(VIDEOS_JSON)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setClip(data[0]?.id || null);
      });
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [clip]);

  const handleClipChange = (e) => setClip(e.target.value);

  const videoPath = clip ? `/${clip}/${CLIP_FILENAME}` : "";
  const captionsPath = clip ? `/${clip}/${CAPTIONS_FILENAME}` : "";

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="video-section">
          {clip && (
            <React.Fragment>
              <Player
                videoRef={videoRef}
                videoPath={videoPath}
                captionsPath={captionsPath}
                setCaptions={setCaptions}
              />

              <div className="clip-selector">
                <label htmlFor="clip-select">Choose a clip: </label>
                <select
                  id="clip-select"
                  value={clip}
                  onChange={handleClipChange}
                >
                  {videos.map((video) => (
                    <option key={video.id} value={video.id}>
                      {video.title}
                    </option>
                  ))}
                </select>
              </div>
            </React.Fragment>
          )}
        </div>

        <div className="transcript-section">
          <div className="transcript-heading">Transcript</div>
          <Transcript captions={captions} videoRef={videoRef} />
        </div>
      </div>
    </div>
  );
}

export default App;
