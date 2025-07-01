import { useEffect, useRef, useState } from "react";
import { formatTime } from "../utils/utils";

const Transcript = ({ captions, videoRef }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const captionRefs = useRef([]);
  const containerRef = useRef();

  // check for active caption
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = videoRef.current?.currentTime || 0;
      const index = captions.findIndex(
        (cap, i) =>
          currentTime >= cap.start &&
          (i === captions.length - 1 || currentTime < captions[i + 1].start)
      );
      setActiveIndex(index);
    }, 200);

    return () => clearInterval(interval);
  }, [captions, videoRef]);

  // scroll to the active caption
  useEffect(() => {
    if (activeIndex !== -1 && captionRefs.current[activeIndex]) {
      captionRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeIndex]);

  const handleClick = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play();
    }
  };

  return (
    <div ref={containerRef} className="transcript-scroll-container">
      {captions.map((cap, i) => (
        <div
          key={cap.index}
          ref={(el) => (captionRefs.current[i] = el)}
          className={`caption-line ${i === activeIndex ? "active" : ""}`}
          onClick={() => handleClick(cap.start)}
        >
          <div className="caption-time">{formatTime(cap.start)}</div>
          <div>{cap.text}</div>
        </div>
      ))}
    </div>
  );
};

export default Transcript;
