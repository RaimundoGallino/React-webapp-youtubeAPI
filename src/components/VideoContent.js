import React from "react";
import '../style/videocontent.css';

const VideoContent = ({ video, details, handleVideosWached}) => {

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  /* handle the clicks inside the iframe in order to call the 
  videos watched handler*/
  window.focus()
  window.addEventListener("blur", () => {
    setTimeout(() => {
      if (document.activeElement.tagName === "IFRAME") {
        handleVideosWached();
        console.log("clicked");
      }
    });
  });

  return (
    <>
        { !details ? (
        <>
        <div className="video">
          <iframe src={videoSrc} allowFullScreen title="Video player" className="video-player" />
        </div>
        <h2 className="title">{video.snippet.title}</h2>
        </>
        ) : (
        <>
        <h2 className="title">{video.snippet.title}</h2>
        <div className="video">
          <iframe src={videoSrc} allowFullScreen title="Video player" className="video-player" />
        </div>
        <p className="description">{video.snippet.description}</p>
        </>
        )}
    </>
  );
};
export default VideoContent;
