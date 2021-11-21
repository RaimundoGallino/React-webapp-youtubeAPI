import React from 'react';
import SearchBar from './Searchbar';
import VideoDetail from './VideoDetail';
import VideoList from './VideoList';
import { Link } from 'react-router-dom';
import '../style/videodetail.css';
import "../style/app.css"


const VideoPlayer = ({handleFormSubmit, handleVideoDetails, handleVideoSelect, video, videos, details}) => {
    return (
        <>
        <SearchBar handleFormSubmit={handleFormSubmit}/>
        <div className="videos">
            <div className="video-repro">
            {video ? (
                <VideoDetail video={video}  details={details}/>
                ) : (
                    <div>
                        <h1>Search any video...</h1>
                        <br></br>
                    </div>
                )}
                <div>
                    {videos.length === 0 ? <div></div> :
                    <Link to="/details" className="details" >
                        <button onClick={ () => handleVideoDetails()} className="details-button">Video details  </button>
                    </Link>}
                </div>
            </div>
            <VideoList handleVideoSelect={handleVideoSelect} videos={videos}/>
        </div>
        </>
    )
}
export default VideoPlayer;