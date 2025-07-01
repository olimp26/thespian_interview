import { useEffect, useState } from "react";
import { parseSRT } from "../utils/utils";

const Player = ({ videoRef, videoPath, captionsPath, setCaptions }) => {
  const [currentCaption, setCurrentCaption] = useState("");

  // Update captions when the clip changes
  useEffect(() => {
    const loadCaptions = async () => {
      try {
        const res = await fetch(captionsPath);
        const data = await res.text();
        const parsed = parseSRT(data);
        setCaptions(parsed);
      } catch (error) {
        console.error("Failed to load captions:", error);
      }
    };

    if (captionsPath) {
      loadCaptions();
    }
  }, [captionsPath, setCaptions]);

  // Update current caption as the video plays
  useEffect(() => {
    const interval = setInterval(() => {
      const time = videoRef.current?.currentTime;
      if (time == null) return;

      setCaptions((prevCaptions) => {
        const current = prevCaptions.find(
          (cap) => time >= cap.start && time <= cap.end
        );
        setCurrentCaption(current?.text || "");
        return prevCaptions;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [videoRef, setCaptions]);

  return (
    <div className="video-wrapper">
      <video ref={videoRef} controls src={videoPath} />
      {currentCaption && (
        <div className="caption-overlay">{currentCaption}</div>
      )}
    </div>
  );
};

export default Player;
