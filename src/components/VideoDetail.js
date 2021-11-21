import React from "react";
import '../style/videodetail.css';

const VideoDetail = ({ video, details}) => {

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
/*
  console.log("ENTRO A VIDEO DETAIL y le paso", video ,"el id", video.id, details)
  console.log(typeof video);
  console.log(details);
*/
  return (
    <>
        { !details ? (
        <>
        {/*<p>{video.snippet.description}</p>*/}
        <div className="video" onClick={console.log("clikee en el video")}>
          <iframe src={videoSrc} allowFullScreen title="Video player" className="video-player" />
        </div>
        
        <h2 className="title">{video.snippet.title}</h2>
        </>
        ) : (
        <>
        <h2 className="title">{video.snippet.title}</h2>
        <p className="description">{video.snippet.description}</p>
        <div className="video" onClick={console.log("clikee en el video")}>
          <iframe src={videoSrc} allowFullScreen title="Video player" className="video-player" />
        </div>
        </>
        )}
    </>
  );
};
export default VideoDetail;
