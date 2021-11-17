import React from 'react';
import SearchBar from './Searchbar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';



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
                <div className="details">
                    {videos.length === 0 ? <div></div> :
                    <button onClick={ () => handleVideoDetails()} className="details-button">Video details </button>}

                </div>
            </div>
            <VideoList handleVideoSelect={handleVideoSelect} videos={videos}/>
        </div>
        </>
    )
}
export default VideoPlayer;
