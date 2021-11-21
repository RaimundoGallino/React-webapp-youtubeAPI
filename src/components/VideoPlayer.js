import React from 'react';
import SearchBar from './Searchbar';
import VideoContent from './VideoContent';
import VideoList from './VideoList';
import { Link } from 'react-router-dom';
import "../style/app.css"
import "../style/videoplayer.css"


const VideoPlayer = ({handleFormSubmit, handleVideoDetails, handleVideoSelect, handleVideosWached, video, videos, details, videosWachedCounter}) => {
    return (
        <>
        <SearchBar handleFormSubmit={handleFormSubmit}/>
        <div className="videos">
            <div className="video-repro">
            {video ? (
                <VideoContent video={video} details={details} handleVideosWached={handleVideosWached}/>
                ) : (
                    <div>
                        <h1>Search any video...</h1>
                        <br></br>
                    </div>
                )}
                <div>
                    {videos.length === 0 ? <div></div> :
                    <Link to="/details" className="extra-content" >
                        <button onClick={ () => handleVideoDetails()} className="details-button">Video details  </button>
                        <p class="watched">Videos Watched {videosWachedCounter}</p>
                    </Link>}
                </div>
            </div>
            <VideoList handleVideoSelect={handleVideoSelect} videos={videos}/>
        </div>
        </>
    )
}
export default VideoPlayer;